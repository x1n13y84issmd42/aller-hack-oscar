import { VideoDesc, ClipDesc } from "./Types";

export interface IFramesExtractor<FT> {
	get(i: number): Promise<FT[]>;
}

export type VideoMap = {
	[k: string]: VideoDesc;
};

export type VideoClipMap = {
	[k: string]: ClipDesc[];
};

export namespace VideoClipMap {
	export function put(vcm: VideoClipMap, vID: string, clip: ClipDesc) {
		if (!vcm[vID]) {
			vcm[vID] = [];
		}

		vcm[vID].push(clip);
	}
}

export abstract class DecodingFlow {
	constructor(
		private videoMap: VideoMap,
		private clipMap: VideoClipMap,
	) {}


}

/**
 * A simpleton of decoding flows, it just starts a decoder process for each clip.
 */
export class NaiveDecodingFlow extends DecodingFlow {

}

/**
 * This one tries to avoid unnecessary hassle by merging together several clips
 * from the same video,the redistributing the frames.
 */
export class MergingDecodingFlow extends DecodingFlow {

}
