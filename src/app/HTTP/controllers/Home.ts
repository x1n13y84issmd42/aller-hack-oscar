import {Request, Response} from 'express';
import * as app from 'app';

export default {
	index: function(req: Request, resp: Response) {
		resp.set('Content-Type', 'text/html')
			.status(200)
			.send('<h1 style="text-align:center;">Aller Hack 2019</h1>')
			.end();
	},
};
