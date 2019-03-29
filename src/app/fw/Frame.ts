export enum FrameType {
	pixels,
	GL
}

export class FrameBase {
	constructor(
		public width: number,
		public height: number,
		public t: number,
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
		public type: FrameType,
		public data: T,
	) {
		super(width, height, t, type);
	}
}

export type VideoCodecInfo = {

};

export type AudioCodecInfo = {
	
};
