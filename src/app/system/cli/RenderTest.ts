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
				throw new Error(`Operation "${op}" is not defined.`);
			}
			resolve();
		});
	}
}

const ops = {
	srcframes: (vfp: string, name: string) => {
		let theProject: Project = {
			settings: {
				FPS: 30,
				width: 800,
				height: 600,
			},
	
			timelines: []
		};
	
		decoder(vfp)
			.pipe(new RGB24toJPEG(name))
			;
	},

	pixels: (vfp: string, name: string) => {
		decoder(vfp)
			.pipe(new FrameUnwrapper<RGB24Frame>())
			.pipe(fs.createWriteStream(`storage/out/${name}.rgba`));
			;
	},

	singleframe: (vfp: string, name: string) => {
		let frameN = (args[4] !== undefined) ? args[4] : 5;
		log(`Grabbing frame #${frameN}`);
		decoder(vfp, {
			from: frameN / 25,
			frames: 1,
		})
			.pipe(new RGB24toJPEG(`single_${frameN}`))
			;
	}
};
