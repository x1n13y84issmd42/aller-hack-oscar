import {Express} from 'express';
import * as debug from 'debug';
import * as fs from 'fs';
import * as path from 'path';
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
import { TimestampFramesRetriever } from 'lib/render/TimestampFramesRetriever';

const log = debug('rendertest');

export default function (app: Express) {
	return function() {
		return new Promise((resolve, reject) => {
			let videoFilePath = args[1];
			let op = args[2];
			let name = op + '/' + path.basename(videoFilePath);

			log(`Working with ${videoFilePath}, performing the ${op} operation.`, args);

			let theProject = undefined;
			let theRetriever = new TimestampFramesRetriever();
			let machine = new TheMachine(theProject, theRetriever);

			if (ops[op]) {
				ops[op](videoFilePath, name, machine);
			} else {
				log(`Operation "${op}" is not defined.`);
				process.exit(0);
			}

			resolve();
		});
	}
}

const ops: {[k:string]: (fn: string, name: string, machine: TheMachine) => void} = {
	pass: (vfp: string, name: string, machine: TheMachine) => {
		let frameN = (args[3] !== undefined) ? args[3] : 5;
		let frames = (args[4] !== undefined) ? args[4] : 1;
		log(`Rendering ${frames} frames from #${frameN}`);

		decoder(vfp, {
			from: frameN / 25,
			frames: frames,
		})
			.pipe(new RGB24toGL())
			.pipe(new Renderer(machine))
			.pipe(new GLtoRGB24())
			;
	}
};
