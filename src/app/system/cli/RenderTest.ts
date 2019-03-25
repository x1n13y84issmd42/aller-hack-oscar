import {Express} from 'express';
import * as debug from 'debug';
import args from 'fw/args';

import {
	decoder,
	RGB24toGL,
	RGBA32toGL,
	Renderer,
	GLtoRGB24,
	RGB24toJPEG,
	RGBA32toJPEG,
	Encoder,
	encoder,
	FrameUnwrapper,
} from 'streams';

const log = debug('rendertest');

export default function (app: Express) {
	return function() {
		return new Promise((resolve, reject) => {
			let videoFilePath = args[1];
			let op = args[2];

			log(`Working with ${videoFilePath}, performing the ${op} operation.`);

			if (this[op]) {
				this[op](videoFilePath);
			} else {
				throw new Error(`Operation "${op}" is not defined.`);
			}
			resolve();
		});
	}
}

function frames(vfp: string) {
	let s = decoder(vfp);
}