import {RGB24Frame} from 'lib/ffmpeg';
import {FrameType} from 'fw/Frame';
import {TTransform} from 'fw/streams';
import * as FrameStream from 'fw/FrameStream';

/**
 * FrameWrapper expects a stream of binary RGB pixel data (likely coming from ffmpeg),
 * and emits a stream of RGB24 frames.
 */
export class Sink extends TTransform<Buffer, RGB24Frame>
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
