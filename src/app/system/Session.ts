import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as redis from 'connect-redis';
import * as app from 'app';
import { Express } from 'express';

const log = app.log('session');

export default function (app: Express) {
	return async function() {
		let ctor = redis(session);
		app.use(cookieParser(process.env.SESSION_SECRET));
		app.enable('trust proxy');

		app.use(session({
			store: new ctor({
				url: process.env.SESSION_REDIS_URL,
				db: ~~process.env.SESSION_REDIS_DB,
				logErrors: true,
			}),
			secret: process.env.SESSION_SECRET,
			saveUninitialized: false, // Don't create session until something stored
			resave: false, // Don't save session if unmodified
		}));

		log('Session is ready');
	}
}