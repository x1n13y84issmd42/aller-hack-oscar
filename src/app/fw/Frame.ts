export enum FrameType {
	pixels,
	GL
}

export class FrameBase {
	constructor(
		public width: number,
		public height: number,
		public t: number,
		public i: number,
		public type: FrameType,
	) {
		//
	}
}

export class Frame<T> extends FrameBase {

	constructor(
		public width: number,
		public height: number,
		public t: number,
		public i: number,
		public type: FrameType,
		public data: T,
	) {
		super(width, height, t, i, type);
	}
}

export type VideoCodecInfo = {

};

export type AudioCodecInfo = {
	
};
