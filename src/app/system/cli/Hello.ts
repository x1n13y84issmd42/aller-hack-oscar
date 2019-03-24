import {Express} from 'express';
import * as debug from 'debug';

const log = debug('hello');

export default function (app: Express) {
	return function() {
		return new Promise((resolve, reject) => {
			log('H3110 W0R1D')
			resolve();
		});
	}
}
