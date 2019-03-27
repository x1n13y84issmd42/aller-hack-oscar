import { Project } from "lib/render/Types";
import { GLFrame } from 'lib/render/GL';
import { IFramesExtractor } from 'lib/render/IFramesExtractor';
import { TReadable } from 'fw/TReadable';
import { RGBA32Frame } from 'lib/ffmpeg';
import { FrameType } from 'fw/Frame';
import { API } from './API/API';
import * as debug from 'debug';

const log = debug('TheMachine');

/**
 * The Render Machine
 * Renders Projects.
 */
export class TheMachine {
	private theStream: TReadable<RGBA32Frame> = new TReadable<RGBA32Frame>();
	private frameStash: RGBA32Frame[] = [];

	constructor(
		private project: Project,
		private frames: IFramesExtractor,
		private api?: API<RGBA32Frame>
	) {
		let that = this;

		this.stream._read = function (s?) {	}
	}

	async render(timestamp?: number) {

		if (timestamp) {
			this.renderFrame(0, timestamp);
		} else {
			let frameFrom = 0;
			let frameTo = this.project.settings.length * this.project.settings.FPS;

			for (let i = frameFrom; i<frameTo; i++) {
				let t = i / this.project.settings.FPS;

				//	Potentially this can be parallelized like crazy
				await this.renderFrame(i, t);
			}
		}
	}

	async renderFrame(i: number, t: number) {
		let inputFrames = await this.frames.get(i);

		//TODO: render the shit
		this.api.renderFrames(inputFrames);

		log(`Emitting a frame ${i} @ ${t}`);

		this.theStream.push(new RGBA32Frame(
			this.project.settings.width,
			this.project.settings.height,
			t,
			FrameType.pixels,
			this.api.getFramePixels(),
		));
	}

	getFramesFromAllTheTimelines(frameIndex: number): GLFrame[] {
		return [];
	}

	get stream() {
		return this.theStream;
	}
}
