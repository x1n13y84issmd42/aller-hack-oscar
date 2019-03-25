import {Transform, TransformOptions} from 'stream';
import * as FrameStream from 'fw/FrameStream';
import * as debug from 'debug';

export abstract class TTransform<WT, RT> extends Transform {

	protected cfg: FrameStream.Config;
	private _log: any;

	constructor(opts?: TransformOptions) {
		super(opts || {
			objectMode: true,
			readableObjectMode: true,
			writableObjectMode: true,
			highWaterMark: 1024 * 1024 * 10
		});

		this._log = debug(this.constructor.name);

		this.on('pipe', (src) => {
			src.on('config', (cfg) => {
				this.configure(cfg);
			});
		});
	}

	abstract _transform(chunk: WT, encoding: string, callback: Function): void;

	push(chunk: RT, encoding?: any): boolean {
		return super.push(chunk, encoding);
	}

	configure(cfg: FrameStream.Config) {
		this.log(`Configuring...`);
		FrameStream.configure.call(this, cfg);
	}

//	pipe<DT extends TTransform<PWT, PRT>, PWT, PRT>(destination: DT, options?: { end?: boolean; }): DT {
	pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean; }): T {
		super.pipe(destination, options);

		//TODO: rethink this
		if ((destination as any).configure && this.cfg) {
			(destination as any).configure(this.cfg);
		}

		return destination;
	}

	protected log(msg: any) {
		this._log(msg);
	}
}
