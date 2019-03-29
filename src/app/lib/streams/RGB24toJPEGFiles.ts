import {TTransform} from 'fw/TTransform';
import {RGB24Frame} from 'lib/ffmpeg';
import {FrameType} from 'fw/Frame';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as savepixels from 'save-pixels';
import * as ndarray from 'ndarray';

export class RGB24toJPEGFiles extends TTransform<RGB24Frame, Buffer> {

	private c = 0;

	constructor(
		private name: string,
		private transpose = true
	) {
		super();

		let dirName = `storage/out/${this.name}`;

		if (! fs.existsSync(dirName)) {
			mkdirp.sync(dirName);
		}
	}

	_transform(rgbFrame: RGB24Frame, encoding: string, callback: Function): void {
		this.c++;
		let fn = `storage/out/${this.name}/${this.c}.jpg`;

		this.log(`${rgbFrame.t.toFixed(2)} => ${fn}`);

		let xpixels = new ndarray(rgbFrame.data, [rgbFrame.height, rgbFrame.width, 3]);

		if (this.transpose) {
			xpixels = xpixels.transpose(1, 0);
		}
		
		savepixels(xpixels, 'JPEG').pipe(fs.createWriteStream(fn));

		callback();
	}
}