export enum FrameType {
	null,
	pixels,
	GL
}

export class FrameBase {
	constructor(
		public width: number,
		public height: number,
		public vt: number,	//	Frame time relative to source video
		public vi: number,	//	Frame index relative to source video
		public ct: number,	//	Frame time relative to clip
		public ci: number,	//	Frame index relative to clip
		public type: FrameType = FrameType.null,
	) {
		//
	}
}

export class Frame<T> extends FrameBase {

	constructor(
		public width: number,
		public height: number,
		public vt: number,
		public vi: number,
		public ct: number,
		public ci: number,
		public type: FrameType,
		public data: T,
	) {
		super(width, height, vt, vi, ct, ci, type);
	}
}

export type VideoCodecInfo = {

};

export type AudioCodecInfo = {
	
};
