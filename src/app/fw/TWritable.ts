import {Writable, WritableOptions} from 'stream';
import * as FrameStream from 'fw/FrameStream';
import * as debug from 'debug';

export abstract class TWritable<T> extends Writable {

	protected cfg: FrameStream.Config;
	private _log: any;
	
	constructor() {
		super({
			objectMode: true,
			highWaterMark: 1024 * 1024 * 10
		});

		this._log = debug(this.constructor.name);

		this.on('pipe', (src) => {
			src.on('config', (cfg) => {
				this.configure(cfg);
			});
		});
	}

	protected log(msg: any) {
		this._log(msg);
	}

	abstract write(chunk: T, cb?: Function): boolean;
	abstract write(chunk: T, encoding?: string, cb?: Function): boolean;

	configure(cfg: FrameStream.Config) {
		this.log(`Configuring...`);
		FrameStream.configure.call(this, cfg);
	}
}
