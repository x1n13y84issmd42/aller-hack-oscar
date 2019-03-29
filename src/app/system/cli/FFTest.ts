import {Express} from 'express';
import * as debug from 'debug';
import * as fs from 'fs';
import * as path from 'path';
import args from 'fw/args';

import {
	decoder,
	metaDecoder,
	RGB24toJPEG,
	RGB24toJPEGFiles,
	FrameUnwrapper,
	RGB24toGL,
	GLtoRGB24,
	Sink,
} from 'lib/streams';

import { TheMachine } from 'lib/render';
import { Project } from 'lib/render/Types';
import { RGB24Frame } from 'lib/ffmpeg';
import { GLFrame } from 'lib/render/GL';
import { Files } from 'lib/streams/Files';
import { JPEGFrame } from 'lib/streams/RGB24toJPEG';

const log = debug('rendertest');

export default function (app: Express) {
	return function() {
		return new Promise((resolve, reject) => {
			let op = args[1];
			let videoFilePath = args[2];
			let name = op + '/' + path.basename(videoFilePath);

			log(`Working with ${videoFilePath}, performing the '${op}' operation.`, args);

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
		//	.pipe(new RGB24toJPEGFiles(path.basename(vfp)))
			.pipe(new RGB24toJPEG())
			.pipe(new Files<JPEGFrame>(path.basename(vfp) + '_2step', 'jpg'))
			;
	},

	meta: async (vfp: string, name: string) => {
		let cdata = await metaDecoder(vfp);
		log('Code Data From metaDecoder()', cdata);
	}
};
