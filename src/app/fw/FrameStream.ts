
export type Config = {
	frameSize: number;
	FPS: number;
	frameT: number;
	width: number;
	height: number;
	encodingStart: number;
};

export class FrameStream {
	protected frameSize: number;
	protected frameT: number;
	protected width: number;
	protected height: number;
}

export function configure(cfg: Config) {
	this.cfg = cfg;
	this.emit('config', cfg);
}
