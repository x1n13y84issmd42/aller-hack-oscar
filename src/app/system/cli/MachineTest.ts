import {Express} from 'express';
import * as debug from 'debug';
import * as fs from 'fs';
import * as path from 'path';
import {GLFrame} from 'lib/render/GL'
import args from 'fw/args';

import {
	decoder,
	metaDecoder,
	RGB24toGL,
	RGBA32toGL,
	Renderer,
	GLtoRGB24,
	RGB24toJPEG,
	RGBA32toJPEG,
	Encoder,
	encoder,
	FrameUnwrapper,
} from 'lib/streams';

import { TheMachine } from 'lib/render';
import { Project } from 'lib/render/Project';
import { RGB24Frame } from 'lib/ffmpeg';
import { IFramesExtractor } from 'lib/render/IFramesExtractor';
import { IVideos } from 'storage/Video/IVideos';
import { VideoDesc } from 'lib/render/Types';
import { MongoVideos } from 'storage/Video/MongoVideos';
import { Reflector } from 'lib/streams/Reflector';

const log = debug('machinetest');

export default function (app: Express) {
	return function() {
		return new Promise((resolve, reject) => {
			let op = args[1];
			let videoFilePath = args[2];
			let name = op + '/' + path.basename(videoFilePath);

			log(`Working with ${videoFilePath}, performing the ${op} operation.`);

			if (ops[op]) {
				ops[op](videoFilePath, name);
			} else {
				log(`Operation "${op}" is not defined.`);
				process.exit(0);
			}

			resolve();
		});
	}
}

const ops = {
	project: (f: string, name: string) => {
		let projectFile = args[3] || (log('Please specify a project file to use') || process.exit(-1));
		let project = JSON.parse(fs.readFileSync(projectFile, {encoding:'string'})) as Project;

		let machine = new TheMachine(project, new StreamFramesExtractor(project, new MongoVideos));
		machine.stream.pipe(new RGBA32toJPEG('name'));
		machine.render();
	}
};



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const _log = debug(`StreamFramesExtractor`);

/**
 * Extracts frames right from video files on demand.
 * This one is meant for rendering of videos, so it starts few decoding streams
 * and accumulates frames, then serves frames at the specified time `t`.
 */
class StreamFramesExtractor implements IFramesExtractor {
	private started: boolean = false;
	private timelines: Array<GLFrame>[] = [];
	private requests: FrameRequest<GLFrame>[] = [];

	constructor(private project: Project, private videos: IVideos<VideoDesc>) {}

	private async start() {
		if (! this.started) {
			//	Looping through all the clips in all the timelines,
			//	collecting referenced videos, starting decoding streams for all of them at once.
			//	Then just waiting for the wanted frames to appear.

			let videoIDs = {};	//	For duplicate checks

			for (let tI = 0; tI < this.project.timelines.length; tI++) {
				let tl = this.project.timelines[tI];
				for (let clip of tl.entities) {
					if (! videoIDs[clip.videoID]) {
						let video = await this.videos.get(clip.videoID);
						let dec = decoder(video.path, {
							from: clip.t1,
							frames: video.FPS * (clip.t2 - clip.t1)
						});

						dec.pipe(new Reflector<RGB24Frame>((frame: RGB24Frame) => {
							/*
								Sooo, we have a frame now...
								Someone may be waiting for it - means, there is a FrameRequest for that timestamp. Those must be resolved.
								Then putting the frame into `this.timelines` for future generations.
							*/

							let frameReq = this.getRequest(tI, frame.t);
							if (frameReq) {
								frameReq.resolve(frame);
							}

							this.timelines[tI].push(frame);
						}));

						videoIDs[clip.videoID] = true;
					}
				}
			}
		}
	}

	getRequest(ti: number, t: number) {
		for (let req of this.requests) {
			if (req.t === t) {
				return req;
			}
		}
	}

	async get(t: number): Promise<GLFrame[]> {
		/*
			Sooo, we need a frame...
			It may be already available on this.timelines, then go and get it.
			Otherwise create a FrameRequest for it, get a promise and await it.
		*/

		let result: Promise<GLFrame>[] = [];

		for (let tI = 0; tI < this.timelines.length; tI++) {
			let tl = this.timelines[tI];
			let frame = this.getFrame(tl, t)
			if (frame) {
				result.push(Promise.resolve(frame));
			} else {
				let req = new FrameRequest<GLFrame>(tI, t);
				result.push(req.promise);
				this.requests.push(req);
			}
		}

		return Promise.all(result);
	}

	/**
	 * Checks if a Timeline has a frame ready to be consumed.
	 * @param t The timestamp of the needed frame.
	 */
	getFrame(tl: Array<GLFrame>, t: number) {
		let i = this.project.settings.FPS * this.project.settings.length
		//TODO: figure out the difference in framerates between project/clips/timelines. Geeeez...
		return tl[i];
	}
}

export namespace StreamFramesExtractor {
	export type TimelineWithFrames = Array<GLFrame>;
}

export class FrameRequest<FT> {
	private resolver: (f: FT) => void;

	constructor(
		public tI: number,
		public t: number,
		) {}

	get promise(): Promise<FT> {
		return new Promise<FT>((resolve) => {
			this.resolver = resolve;
		});
	}

	resolve(frame: FT) {
		this.resolver(frame);
	}
};
