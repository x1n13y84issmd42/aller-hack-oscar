import {Express} from 'express';
import * as debug from 'debug';
import * as fs from 'fs';
import * as path from 'path';
import {GLFrame} from 'lib/render/GL'
import args from 'fw/args';

import {
	RGBA32toJPEG,
} from 'lib/streams';

import { TheMachine } from 'lib/render';
import { Project } from 'lib/render/Types';
import { RGB24Frame } from 'lib/ffmpeg';
import { StreamFramesExtractor } from 'lib/render/StreamFramesExtractor';
import { IVideos } from 'storage/Video/IVideos';
import { VideoDesc, ClipDesc } from 'lib/render/Types';
import { MongoVideos } from 'storage/Video/MongoVideos';
import { Reflector } from 'lib/streams/Reflector';
import { Three } from 'lib/render/API/3';
import { EffectsRepo } from 'lib/render/EffectsRepo';
import { RGBA32Frame } from 'lib/ffmpeg';
import { Effect } from 'lib/render/effects/Effect';
import { RotatingCube } from 'lib/render/effects/RotatingCube';

const log = debug('machinetest');

export default function (app: Express) {
	return function() {
		return new Promise(async (resolve, reject) => {
			let op = args[1];

			log(`Performing the ${op} operation.`);

			if (ops[op]) {
				await ops[op]();
			} else {
				log(`Operation "${op}" is not defined.`);
				process.exit(0);
			}

			resolve();
		});
	}
}

const ops = {
	project: async () => {
		let projectFile = args[2] || (log('Please specify a project file to use') || process.exit(-1));
		let project = JSON.parse(fs.readFileSync(projectFile, {encoding:'UTF-8'})) as Project;

		log(`Using this project settings`, project);

		let machine = new TheMachine(
			project,
			new StreamFramesExtractor(project, new MongoVideos),
			new Three(project),
			new TempEffectsRepo()
		);

		machine.stream.pipe(new RGBA32toJPEG(project.settings.title));
		await machine.render();
	},

	mongo: async () => {
		let videos = new MongoVideos;
		log(await videos.get('5c9b84e10479733facf2a181'))
	}
};

class TempEffectsRepo implements EffectsRepo<RGBA32Frame> {

	getEffectById(id: string): Effect<RGBA32Frame> {
		if (id === 'rotating_box') {
			return new RotatingCube();
		} else {
			throw "No effect with such id";
		}
	}
}
