import {TTransform} from 'fw/streams';
import {GLFrame} from 'lib/render/GL';
import {FrameType} from 'fw/Frame';
import {RGBA32Frame} from 'lib/ffmpeg';
import { TheMachine } from 'lib/render';

export class Renderer extends TTransform<GLFrame, RGBA32Frame> {
	constructor(private machine: TheMachine) {
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
			undefined, //this.machine.render(glFrame),
		));

		callback();
	}
}
