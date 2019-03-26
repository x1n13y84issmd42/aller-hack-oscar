import {Request, Response} from 'express';
import * as app from 'app';
import * as path from "path";

export default {
	index: function(req: Request, resp: Response) {
		resp.set('Content-Type', 'text/html')
			.status(200)
			.sendFile(path.join(app.root, 'out/dist/index.html'));
	},
};