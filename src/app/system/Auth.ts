import { Express } from 'express';
import * as app from 'app';

import auth from 'lib/auth';

const log = app.log('auth');

export default function (app: Express) {
	return async function() {
		await auth.bootstrap();
		log('Auth is ready');
	}
}
