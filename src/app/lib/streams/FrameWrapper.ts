import {RGB24Frame} from 'lib/ffmpeg';
import {FrameType} from 'fw/Frame';
import {TTransform} from 'fw/streams';
import * as FrameStream from 'fw/FrameStream';

/**
 * FrameWrapper expects a stream of binary RGB pixel data (likely coming from ffmpeg),
 * and emits a stream of RGB24 frames.
 */
export class FrameWrapper extends TTransform<Buffer, RGB24Frame>
{
	private totalBytes = 0;
	private buffer: Buffer;
	private bufOffset = 0;
	private vt = 0;
	private ct = 0;
	private ci = 0;

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
		this.vt = this.cfg.encodingStart;
		this.buffer = Buffer.alloc(this.cfg.frameSize);
	}

	_transform(chunk: Buffer, enc: string, callback: Function) {
		let copied = chunk.copy(this.buffer, this.bufOffset, 0, this.cfg.frameSize - this.bufOffset);
		
		this.bufOffset += copied;
		this.totalBytes += copied;
		
		if (this.totalBytes >= this.cfg.frameSize) {
			this.totalBytes -= this.cfg.frameSize;
			this.bufOffset = 0;
			let vi = Math.round(this.vt * this.cfg.FPS);

			this.log(`Emitting a frame C#${this.ci} (V#${vi}) C@${this.vt.toFixed(2)}`);

			this.push(new RGB24Frame(
				this.cfg.width,
				this.cfg.height,
				this.vt,
				vi,
				this.ct,
				this.ci,
				FrameType.pixels,
				Buffer.from(this.buffer)
			));

			this.vt += this.cfg.frameT;
			this.ct += this.cfg.frameT;
			this.ci++;

			if (copied != chunk.length) {
				copied = chunk.copy(this.buffer, this.bufOffset, copied);
				this.bufOffset += copied;
				this.totalBytes += copied;
			}
		}

		callback();
	}
}
