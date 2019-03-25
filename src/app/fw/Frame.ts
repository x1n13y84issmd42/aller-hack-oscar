export enum FrameType {
	pixels,
	GL
}

export class Frame<T> {

	constructor(
		public width: number,
		public height: number,
		public t: number,
		public type: FrameType,
		public data: T,
	) {
		//
	}
}

export type VideoCodecInfo = {

};

export type AudioCodecInfo = {
	
};
