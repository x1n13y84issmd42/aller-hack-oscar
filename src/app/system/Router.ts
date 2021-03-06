import router from 'HTTP/router';
import {Router, Request, Response } from 'express';
import * as app from 'app';

const log = app.log('router');

export default function (app) {

	return () => {
		return new Promise((resolve) => {
			app.use(router);
			app.use((err, req: Request, resp: Response, next) => {
				log('Error handler');
				log(err.name);
				log(err.code);
				log(err.message);

				//TODO: important point to monitor
				//		think Slack error reporting & stuff
				resp.status(~~err.code || 500).json({
					error: err.name,
					message: err.message,
					stack: (err.stack ? err.stack.split('\n'): null)
				}).end();

				next && next();
			});

			router.get('/*', defaultHandler);
			resolve();
		});
	};
}

function defaultHandler(req: Request, resp: Response) {
	return resp.status(404).send('Here be dragons').end();
}
