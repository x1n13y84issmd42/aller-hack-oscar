import {Express} from 'express';
import * as debug from 'debug';
import * as fs from 'fs';
import * as path from 'path';
import {GLFrame} from 'lib/render/GL'
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
import { IFramesExtractor } from 'lib/render/IFramesExtractor';

const log = debug('machinetest');

export default function (app: Express) {
	return function() {
		return new Promise((resolve, reject) => {
			let op = args[1];
			let videoFilePath = args[2];
			let name = op + '/' + path.basename(videoFilePath);

			log(`Working with ${videoFilePath}, performing the ${op} operation.`);

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
	pass: (f: string, name: string) => {
		let projectFile = args[3] || (log('Please specify a project file to use') || process.exit(-1));
		let project = JSON.parse(fs.readFileSync(projectFile, {encoding:'string'})) as Project;

		let machine = new TheMachine(project, new StreamFramesExtractor());
	}
};

/**
 * Extracts frames right from video files on demand.
 * This one is meant for rendering of videos, so it starts few decoding streams
 * and accumulates frames, then serves frames at the specified time `t`.
 */
class StreamFramesExtractor implements IFramesExtractor {
	private started: boolean = false;

	private start(project: Project) {
		if (! this.started) {
			//TODO: start streams
		}
	}

	async get(project: Project, t: number): Promise<GLFrame[]> {
		return [];
	}
}
