import {Express} from 'express';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as debug from 'debug';

const log = debug('env');

export default function (app: Express) {
	return function() {
		return new Promise((resolve, reject) => {
			//	First, trying to load a boot sequence-specific env file.
			//	It's this way because dotenv won't overwrite already existing values in process.env,
			//	so you should overwrite them in reverse order.
			if (process.env.BOOT_SEQUENCE) {
				let bsEnvPath = `${process.env.BOOT_SEQUENCE}.env`;
				if (fs.existsSync(bsEnvPath)) {
					log(`Loading the ${bsEnvPath}`);
					dotenv.config({
						path: bsEnvPath,
					});
				} else {
					log(`Not loading the ${bsEnvPath}`);
				}
			}
	
			log(`Loading the .env`);
	
			//	Then loading the default one.
			dotenv.config({
				path: '.env',
			});

			resolve();
		});
	}
}
