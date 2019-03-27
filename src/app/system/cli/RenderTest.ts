import {Express} from 'express';
import * as debug from 'debug';
import * as fs from 'fs';
import * as path from 'path';
import args from 'fw/args';

import {
	decoder,
	metaDecoder,
	RGB24toGL,
	RGBA32toGL,
	Renderer,
	GLtoRGB24,
	RGB24toJPEG,
	RGBA32toJPEG,
	Encoder,
	encoder,
	FrameUnwrapper,
} from 'lib/streams';

import { TheMachine } from 'lib/render';
import { Project } from 'lib/render/Project';
import { RGB24Frame } from 'lib/ffmpeg';

const log = debug('rendertest');

export default function (app: Express) {
	return function() {
		return new Promise((resolve, reject) => {
			let videoFilePath = args[1];
			let op = args[2];
			let name = op + '/' + path.basename(videoFilePath);

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
			.pipe(fs.createWriteStream(`storage/out/${'pixels'}.rgba`));
			;
	},

	frames: (vfp: string, name: string) => {
		let frameN = (args[3] !== undefined) ? args[3] : 5;
		let frames = (args[4] !== undefined) ? args[4] : 1;
		log(`Grabbing ${frames} frames from #${frameN}`);
		decoder(vfp, {
			from: frameN / 25,
			frames: frames,
		})
			.pipe(new RGB24toJPEG(name))
			;
	},

	meta: async (vfp: string, name: string) => {
		let cdata = await metaDecoder(vfp);
		log('Code Data From metaDecoder()', cdata);
	}
};
