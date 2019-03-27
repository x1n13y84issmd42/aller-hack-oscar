import { IFramesExtractor } from "./IFramesExtractor";
import { GLFrame } from "./GL";
import { Project, VideoDesc, ClipDesc } from "./Types";
import { IVideos } from "storage/Video";
import { decoder, RGB24toGL } from "lib/streams";
import { Reflector } from "lib/streams/Reflector";
import * as debug from 'debug';

const _log = debug(`StreamFramesExtractor`);

type Frameline = Array<GLFrame>;

/**
 * Extracts frames right from video files on demand.
 * This one is meant for rendering of videos, so it starts few decoding streams
 * and accumulates frames, then serves frames at the specified time `t`.
 */
export class StreamFramesExtractor implements IFramesExtractor {
	private started: boolean = false;
	private timelines: Frameline[] = [];
	private requests: FrameRequest<GLFrame>[] = [];

	constructor(private project: Project, private videos: IVideos<VideoDesc>) {}

	/**
	 * Returns all the frames from all the timelines that happen to be at the given index.
	 * @param pfi A 0-based frame index of the entire project.
	 */
	async get(pfi: number): Promise<GLFrame[]> {

		_log(`Getting frames @ ${pfi}`);
		await this.start();

		/*
			Sooo, we want a frame...
			It may be already available on this.timelines, then go and get it.
			Otherwise create a FrameRequest for it, get a promise and await it.
		*/

		return new Promise<GLFrame[]>(async (resolve) => {
			let result: Promise<GLFrame>[] = [];
	
			for (let tI = 0; tI < this.timelines.length; tI++) {
				let tl = this.timelines[tI];
				let frame = tl[pfi];
				if (frame) {
					_log(`Found a ready frame #${pfi} on TL${tI}`);
					result.push(Promise.resolve(frame));
				} else {
					_log(`Creating a request for frame #${pfi} on TL${tI}`);
					let req = new FrameRequest<GLFrame>(tI, pfi);
					result.push(req.promise);
					this.requests.push(req);
				}
			}
	
			let frames = await Promise.all(result);
			resolve(frames);
		});
	}

	private async start() {
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
							this.decodeVideo(video, clip, tI, debug(`SFX TL:${tI} V:${video.id}`));
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

	private decodeVideo(video: VideoDesc, clip: ClipDesc, tI: number, log, frameCounter = 0) {
		log = ()=>{};
		log(`Starting decoding of ${video.name}`);

		let dec = decoder(video.path, {
			from: clip.clipping.start,
			frames: video.FPS * (clip.clipping.end - clip.clipping.start)
		});

		dec.pipe(new RGB24toGL).pipe(new Reflector<GLFrame>((frame: GLFrame) => {
			/*
				Sooo, we have a frame now...
				Someone may be waiting for it - means, there is a FrameRequest for that timestamp. Those must be served.
				Then putting the frame into `this.timelines` for future generations.
			*/
			log(`Got a frame #${frameCounter} @ ${frame.t.toFixed(2)}`);
			let frameReq = this.getRequest(tI, frameCounter);

			if (frameReq) {
				log(`Have a request for it, serving`);
				frameReq.serve(frame);
			} else {
				log(`No one is waiting for the frame #${frameCounter} @ ${frame.t.toFixed(2)} on TL${tI} (${this.requests.length} requests though)`);
			}

			this.timelines[tI].push(frame);

			frameCounter++;
		}));
	}

	private getRequest(ti: number, t: number) {
		for (let req of this.requests) {
			if (req.tI === ti && req.pfi === t) {
				return req;
			}
		}
	}
}

class FrameRequest<FT> {
	private resolver: (f: FT) => void;

	constructor(
		public tI: number,
		public pfi: number,
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
