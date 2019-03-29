import { Project } from "lib/render/Types";
import { GLFrame } from 'lib/render/GL';
import { IFramesExtractor } from 'lib/render/IFramesExtractor';
import { TReadable } from 'fw/TReadable';
import { RGBA32Frame } from 'lib/ffmpeg';
import { FrameType } from 'fw/Frame';
import { API } from './API/API';
import * as debug from 'debug';
import { EffectsRepo } from 'lib/render/EffectsRepo';
import { EffectSetting } from 'lib/render/Types';
import { Effect } from 'lib/render/effects/Effect';

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
		private api?: API<RGBA32Frame>,
		private effectsRepo?: EffectsRepo<RGBA32Frame>
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

		let effectsSettings = this.getEffectsSettingsByTimestamp(t);

		let effectsIds = this.getEffectsIdsByTimestamp(t);
		let effects = this.getEffectsByIds(effectsIds);

		this.api.setEffects(effects, effectsSettings);

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

	private getEffectsIdsByTimestamp(timestamp: number): string[][] {
		let effectsIds: string[][] = [];

		for (let timeline of this.project.timelines) {
			for (let clip of timeline.entities) {
				if (clip.timelinePosition.start <= timestamp &&
						clip.timelinePosition.end >= timestamp
				) {
					let currentClipEffectsIds: string[] = [];

					for (let effectDesc of clip.effects) {
						currentClipEffectsIds.push(effectDesc.id);
					}

					effectsIds.push(currentClipEffectsIds);
				}
			}
		}

		return effectsIds;
	}

	private getEffectsSettingsByTimestamp(timestamp: number): EffectSetting[][][] {
		let result: EffectSetting[][][] = [];

		for (let timeline of this.project.timelines) {
			for (let clip of timeline.entities) {
				if (clip.timelinePosition.start <= timestamp &&
						clip.timelinePosition.end >= timestamp
				) {
					let currentClipEffectsSettings: EffectSetting[][] = [];

					for (let effectDesc of clip.effects) {
						currentClipEffectsSettings.push(effectDesc.settings);
					}

					result.push(currentClipEffectsSettings);
				}
			}
		}

		return result;
	}

	private getEffectsByIds(effectsIds: string[][]): Effect<RGBA32Frame>[][] {
		let result: Effect<RGBA32Frame>[][] = [];

		for (let effectsIds_i of effectsIds) {
			let temp: Effect<RGBA32Frame>[] = [];

			for (let effectId of effectsIds_i) {
				temp.push(this.effectsRepo.getEffectById(effectId));
			}

			result.push(temp);
		}

		return result;
	}
}
