import {Readable} from 'stream';
import * as FrameStream from 'fw/FrameStream';
import * as debug from 'debug';

export class TReadable<T> extends Readable {

	protected cfg: FrameStream.Config;
	private _log: any;

	constructor() {
		super({
			objectMode: true,
			highWaterMark: 1024 * 1024 * 10
		});

		this._log = debug(this.constructor.name);
	}

	protected log(msg: any) {
		this._log(msg);
	}

	push(chunk:T, encoding?:string) {
		return super.push(chunk, encoding);
	}

	pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean; }): T {
		super.pipe(destination, options);

		//TODO: rethink this
		if ((destination as any).configure && this.cfg) {
			(destination as any).configure(this.cfg);
		}

		return destination;
	}

	configure(cfg: FrameStream.Config) {
		this.log(`Configuring...`);
		FrameStream.configure.call(this, cfg);
	}
}
