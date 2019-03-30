import { Project, VideoDesc, ClipDesc } from "./Types";
import { IFramesExtractor } from "./IFramesExtractor";
import { Reflector } from "lib/streams/Reflector";
import { decoder, RGB24toGL, FrameWrapper, RGB24toJPEG } from "lib/streams";
import { IVideos } from "storage/Video";
import { GLFrame } from "./GL";
import * as debug from 'debug';
import { FrameBase } from "fw/Frame";
import { TReadable, TTransform } from "fw/streams";
import { RGB24Frame } from "lib/ffmpeg";
import { JPEGFrame } from "lib/streams/RGB24toJPEG";

const _log = debug(`StreamFramesExtractor`);

/**
 * Extracts frames right from video files on demand.
 * This one is meant for rendering of videos, so it starts few decoding streams
 * and accumulates frames, then serves frames at the specified time `t`.
 */
export abstract class StreamFramesExtractor<FT extends FrameBase> implements IFramesExtractor<FT> {
	private started: boolean = false;
	private timelines: Array<FT>[] = [];
	private requests: FrameRequest<FT>[] = [];

	constructor(private project: Project, private videos: IVideos<VideoDesc>, private singleFrameMode=false) {}

	/**
	 * Returns all the frames from all the timelines that happen to be at the given index.
	 * @param tlfi A 0-based frame index on the timeline.
	 */
	async get(tlfi: number): Promise<FT[]> {

		_log(`Getting frames @ ${tlfi}`);
		await this.start(tlfi);

		/*
			Sooo, we want a frame...
			It may be already available on this.timelines, then go and get it.
			Otherwise create a FrameRequest for it, get a promise and await it.
		*/

		return new Promise<FT[]>(async (resolve) => {
			let result: Promise<FT>[] = [];
	
			for (let tI = 0; tI < this.timelines.length; tI++) {
				let tl = this.timelines[tI];
				let frame = tl[tlfi];
				if (frame) {
					_log(`Found a ready frame #${tlfi} on TL${tI}`);
					result.push(Promise.resolve(frame));
				} else {
					_log(`Creating a request for frame #${tlfi} on TL${tI}`);
					let req = new FrameRequest<FT>(tI, tlfi);
					result.push(req.promise);
					this.requests.push(req);
				}
			}
	
			let frames = await Promise.all(result);
			resolve(frames);
		});
	}

	private async start(tlfi: number) {
		if (! this.started) {
			this.started = true;

			_log(`Starting the background decoding`);
			_log(`The project contains ${this.project.timelines.length} timelines`);

			for (let i=0; i<this.project.timelines.length; i++) {
				this.timelines.push([]);
			}

			//	Looping through all the clips in all the timelines,
			//	collecting referenced videos, starting decoding streams for all of them at once.
			//	Then just waiting for the wanted frames to appear.

			//TODO: merge different clips referencing the same video and figure out
			//	how to skip extra frames and put the needed ones at correct place on the TL

			let videoIDs = {};	//	For duplicate checks

			for (let tI = 0; tI < this.project.timelines.length; tI++) {
				let tl = this.project.timelines[tI];
				for (let clip of tl.entities) {
					if (! videoIDs[clip.videoId]) {
						let video = await this.videos.get(clip.videoId);

						if (video) {
							this.decodeVideo(video, clip, tI, tlfi, debug(`SFX TL:${tI} V:${video.id}`));
							videoIDs[clip.videoId] = true;
						} else {
							_log(`Video ${clip.videoId} not found`);
							process.exit(-1);
						}
					}
				}
			}
		}
	}

	private decodeVideo(video: VideoDesc, clip: ClipDesc, tI: number, tlfi: number, log, frameCounter = 0) {
		log(`Starting decoding of ${video.name} referenced by a clip`, clip);

		let from = clip.clipping.start
		let frames = video.FPS * (clip.clipping.end - clip.clipping.start)

		if (this.singleFrameMode) {
			from += tlfi / this.project.settings.FPS
			frames = 1
		}

		let dec = decoder(video.path, {
			from,
			frames 
		});

		this.convertFrameStream(dec).pipe(new Reflector<FT>((frame: FT) => {
			/*
				Sooo, we have a frame now...
				Someone may be waiting for it - means, there is a FrameRequest for that timestamp. Those must be served.
				Then putting the frame into `this.timelines` for future generations.
			*/
			let TLt = frame.t + clip.timelinePosition.start;
			let TLi = TLt / this.project.settings.FPS;
			log(`Got a frame #${frame.i} @ ${frame.t.toFixed(2)} (TL: #${TLi} @ ${TLt})`);
			let frameReq = this.getRequest(tI, frame.i);

			if (frameReq) {
				log(`Have a request for it, serving`);
				frameReq.serve(frame);
			} else {
				log(`No one is waiting for the frame #${frame.i} @ ${frame.t.toFixed(2)} on TL${tI} (${this.requests.length} requests though)`);
			}

			this.timelines[tI].push(frame);

			frameCounter++;
		}));
	}

	abstract convertFrameStream(decoder: FrameWrapper): TTransform<RGB24Frame, FT>;

	private getRequest(ti: number, t: number) {
		for (let req of this.requests) {
			if (req.tI === ti && req.tlfi === t) {
				return req;
			}
		}
	}
}

class FrameRequest<FT> {
	private resolver: (f: FT) => void;

	constructor(
		public tI: number,
		public tlfi: number,
		) {}

	get promise(): Promise<FT> {
		return new Promise<FT>((resolve) => {
			this.resolver = resolve;
		});
	}

	serve(frame: FT) {
		this.resolver(frame);
	}
};

export class StreamFramesExtractorGL extends StreamFramesExtractor<GLFrame> {
	convertFrameStream(decoder: FrameWrapper): RGB24toGL {
		return decoder.pipe(new RGB24toGL)
	}
}

export class StreamFramesExtractorJPEG extends StreamFramesExtractor<JPEGFrame> {
	convertFrameStream(decoder: FrameWrapper): RGB24toJPEG {
		return decoder.pipe(new RGB24toJPEG)
	}
}
