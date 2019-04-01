import {TTransform} from 'fw/streams';
import * as FrameStream from 'fw/FrameStream';
import { FrameBase } from 'fw/Frame';

/**
 * It's like /dev/null for frames.
 */
export class Sink<FT extends FrameBase> extends TTransform<FT, void>
{
	constructor() {
		super({
			objectMode: true,
			writableObjectMode: false,
			readableObjectMode: true,
			highWaterMark: 1024 * 1024 * 100
		});
	}

	configure(cfg: FrameStream.Config) {
		super.configure(cfg);
	}

	_transform(frame: FT, enc: string, callback: Function) {
		this.log(`${frame.vt.toFixed(2)}`);
		callback();
	}
}
