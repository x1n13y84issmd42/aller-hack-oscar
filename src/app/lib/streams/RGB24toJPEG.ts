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
		this.log(`${rgbFrame.t.toFixed(2)}`);

		
		let jpg = jpeg.encode({
			data: rgbFrame.data,
			width: rgbFrame.width,
			height: rgbFrame.height,
		}, 100);
		
		this.push(new JPEGFrame(
			rgbFrame.width,
			rgbFrame.height,
			rgbFrame.t,
			FrameType.GL,
			jpg.data
			));
			
		callback();
	}
	
		
	rgb24torgba32(rgbFrame: RGB24Frame) {
		let data = Buffer.alloc(rgbFrame.width * rgbFrame.height * 4);
		
	}
}
