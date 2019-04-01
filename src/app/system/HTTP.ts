import * as http from 'http';
import * as app from 'app';
import * as colors from 'ansicolors';

declare global {
	export namespace Express {
		export type UploadedFile = {
			name: string;
			mimetype: string;
			data: Buffer;
			mv: (fn: string, cb: (err) => void) => void;
		};

		export interface Request {
			files: {[k: string]: UploadedFile};
		}
	}
}

const log = app.log('http');

export default function (app) {
	return () => {
		return new Promise((resolve, reject) => {
			
			let port = process.env.PORT || 4000;

			let server = http.createServer(app);
			
			server.on('error', HTTPErrorHandler(reject));

			server.listen(port, () => {
				const p = colors.brightGreen(`${port}`);
				log(`The app is up & running on port ${p}`);
				resolve();
			});
		});
	};
}

function HTTPErrorHandler(reject) {
	return function (err) {
		log(colors.white(colors.bgRed('HTTP Error handler')));
		reject(err);
	};
}