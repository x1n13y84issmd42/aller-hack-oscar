import {Express} from 'express';
import * as debug from 'debug';
import * as fs from 'fs';
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
import { TheMachine } from 'lib/render';
import { Project } from 'lib/render/Project';
import { RGB24Frame } from 'lib/ffmpeg';

const log = debug('rendertest');

export default function (app: Express) {
	return function() {
		return new Promise((resolve, reject) => {
			let videoFilePath = args[1];
			let op = args[2];
			let name = args[3] || op;

			log(`Working with ${videoFilePath}, performing the ${op} operation.`, args);

			if (ops[op]) {
				ops[op](videoFilePath, name);
			} else {
				log(`Operation "${op}" is not defined.`);
				process.exit(0);
			}
			resolve();
		});
	}
}

const ops = {
	pixels: (vfp: string, name: string) => {
		decoder(vfp)
			.pipe(new FrameUnwrapper<RGB24Frame>())
			.pipe(fs.createWriteStream(`storage/out/${name}.rgba`));
			;
	},

	frames: (vfp: string, name: string) => {
		let frameN = (args[4] !== undefined) ? args[4] : 5;
		let frames = (args[5] !== undefined) ? args[5] : 1;
		log(`Grabbing ${frames} frames from #${frameN}`);
		decoder(vfp, {
			from: frameN / 25,
			frames: frames,
		})
			.pipe(new RGB24toJPEG(`single_${frameN}`))
			;
	}
};
