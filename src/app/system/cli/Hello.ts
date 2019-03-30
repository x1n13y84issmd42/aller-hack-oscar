import {Express} from 'express';
import * as debug from 'debug';
import args from 'fw/args';

const log = debug('hello');

export default function (app: Express) {
	return function() {
		return new Promise((resolve, reject) => {
			let name = args[1];
			let uses = args[2];
			let plant = args[3];

			log(`${name} ${uses} ${plant} too much.`);

			resolve();
		});
	}
}
