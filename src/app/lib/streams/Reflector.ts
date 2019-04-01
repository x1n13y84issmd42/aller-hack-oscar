import {TTransform} from 'fw/streams';

/**
 * This thing passes received frames to a callback, thus making them available for non-stream clients.
 */
export class Reflector<FT> extends TTransform<FT, void>
{
	constructor(private cb: (v: FT) => void) {
		super({
			objectMode: true,
			writableObjectMode: false,
			readableObjectMode: true,
			highWaterMark: 1024 * 1024 * 100
		});
	}

	_transform(frame: FT, enc: string, callback: Function) {
		this.cb(frame);
		callback();
	}
}
