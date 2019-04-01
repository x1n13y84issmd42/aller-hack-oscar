import {Express} from 'express';
import * as debug from 'debug';
import * as mongodb from 'mongodb';
import * as mongo from 'lib/mongo';

const log = debug('mongo');

export default function (app: Express) {
	return function() {
		return new Promise(async (resolve) => {
			await mongo.connect(process.env.MONGODB_URI);
			log('Connected');
			resolve();
		});
	}
}
