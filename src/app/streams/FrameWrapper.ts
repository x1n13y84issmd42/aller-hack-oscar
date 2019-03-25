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
	private framesEmitted = 0;
	private buffer: Buffer;
	private bufOffset = 0;
	private T = 0;

	constructor() {
		super({
			objectMode: true,
			writableObjectMode: false,
			readableObjectMode: true,
			highWaterMark: 1024 * 1024 * 10
		});
	}

	configure(cfg: FrameStream.Config) {
		super.configure(cfg);
		this.buffer = Buffer.alloc(this.cfg.frameSize);
	}

	_transform(chunk: Buffer, enc: string, callback: Function) {

		let bytes = chunk.copy(this.buffer, this.bufOffset, 0, this.cfg.frameSize - this.bufOffset);
		
		this.bufOffset += bytes;
		this.totalBytes += bytes;
		
		if (this.totalBytes >= this.cfg.frameSize) {
			this.totalBytes -= this.cfg.frameSize;
			this.bufOffset = 0;

			this.framesEmitted++;

			this.log(`${this.T.toFixed(2)} Emitting a frame #${this.framesEmitted}`);

			this.push(new RGB24Frame(
				this.cfg.width,
				this.cfg.height,
				this.T,
				FrameType.pixels,
				Buffer.from(this.buffer)
			));

			this.T += this.cfg.frameT;

			if (bytes != chunk.length) {
				bytes = chunk.copy(this.buffer, this.bufOffset, bytes, chunk.length - bytes);
				this.bufOffset += bytes;
				this.totalBytes += bytes;
			}
		}

		callback();
	}
}