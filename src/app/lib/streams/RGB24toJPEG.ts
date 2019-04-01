import {TTransform} from 'fw/TTransform';
import {RGB24Frame} from 'lib/ffmpeg';
import {FrameType, Frame} from 'fw/Frame';
import * as jpeg from 'jpeg-js';

export class JPEGFrame extends Frame<Buffer> {}

export class RGB24toJPEG extends TTransform<RGB24Frame, JPEGFrame> {

	private c = 0;

	constructor(
		private transpose = true
	) {
		super();
	}

	_transform(rgbFrame: RGB24Frame, encoding: string, callback: Function): void {
		this.log(`${rgbFrame.vt.toFixed(2)}`);

		let jpg = jpeg.encode({
			data: this.rgb24torgba32(rgbFrame),
			width: rgbFrame.width,
			height: rgbFrame.height,
		}, 100);
		
		this.push(new JPEGFrame(
			rgbFrame.width,
			rgbFrame.height,
			rgbFrame.vt,
			rgbFrame.vi,
			rgbFrame.ct,
			rgbFrame.ci,
			FrameType.GL,
			jpg.data
		));
			
		callback();
	}
	
	rgb24torgba32(rgbFrame: RGB24Frame) {
		let srcDepth = 3;
		let dstDepth = 4;
		let data = Buffer.alloc(rgbFrame.width * rgbFrame.height * dstDepth);

		for (let i = 0; i < rgbFrame.data.length; i += srcDepth) {
			data[i / srcDepth * dstDepth + 0] = rgbFrame.data[i + 0];
			data[i / srcDepth * dstDepth + 1] = rgbFrame.data[i + 1];
			data[i / srcDepth * dstDepth + 2] = rgbFrame.data[i + 2];
			data[i / srcDepth * dstDepth + 3] = 255;
		}

		return data;
	}
}
