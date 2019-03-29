import {TTransform} from 'fw/TTransform';
import {RGBA32Frame} from 'lib/ffmpeg';
import {FrameType} from 'fw/Frame';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as savepixels from 'save-pixels';
import * as ndarray from 'ndarray';

export class RGBA32toJPEG extends TTransform<RGBA32Frame, Buffer> {

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

	_transform(rgbFrame: RGBA32Frame, encoding: string, callback: Function): void {
		this.c++;
    // let fn = `storage/out/${this.name}/${this.c}.jpg`;
		let fn = `assets/images/${this.name}/${this.c}.jpg`;

    let dirName = `assets/images/${this.name}`;

    if (! fs.existsSync(dirName)) {
      mkdirp.sync(dirName);
    }

		this.log(`${rgbFrame.t.toFixed(2)} => ${fn}`);

		let xpixels = new ndarray(rgbFrame.data, [rgbFrame.height, rgbFrame.width, 4]);

		if (this.transpose) {
			xpixels = xpixels.transpose(1, 0);
		}

		savepixels(xpixels, 'JPEG').pipe(fs.createWriteStream(fn));

		callback();
	}
}
