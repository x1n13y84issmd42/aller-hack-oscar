import {TTransform} from 'fw/streams';
import {GLFrame} from 'lib/render/3';
import {FrameType} from 'fw/Frame';
import {RGBA32Frame} from 'lib/ffmpeg';

export class Renderer extends TTransform<GLFrame, RGBA32Frame> {
	constructor() {
		super({
			objectMode: true,
			writableObjectMode: true,
			readableObjectMode: true,
			highWaterMark: 1024 * 1024 * 10
		});
	}

	_transform(glFrame: GLFrame, encoding: string, callback: Function): void {
		this.log(`${glFrame.t.toFixed(2)} R E N D E R !`);

		this.push(new RGBA32Frame(
			glFrame.width,
			glFrame.height,
			glFrame.t,
			FrameType.pixels,
			undefined //	Three.renderFrame(glFrame)
		));

		callback();
	}
}
