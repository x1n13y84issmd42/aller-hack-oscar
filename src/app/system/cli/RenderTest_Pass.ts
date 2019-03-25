import {Express} from 'express';
import * as debug from 'debug';
import args from 'fw/args';

const log = debug('rtpass');

export default function (app: Express) {
	return function() {
		return new Promise((resolve, reject) => {
			let videoFilePath = args[1];
			let op = args[2] || 'frames'
			log(`Working with ${videoFilePath} in the '${op}' mode.`);

			if (this[op]) {
				this[op](videoFilePath);
			}

			resolve();
		});
	}
}

function frames(videoFilePath: string) {
	
}
