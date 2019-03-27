import {TTransform} from 'fw/streams';
import * as FrameStream from 'fw/FrameStream';

/**
 * It's like /dev/null for frames.
 */
export class Sink extends TTransform<Buffer, void>
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

	_transform(chunk: Buffer, enc: string, callback: Function) {
		callback();
	}
}
