import { Request, Response } from 'express';

import * as app from 'app';
import FacebookAPI from 'lib/facebook';

export default {
	uploadVideo: async function (req: Request, res: Response) {
		try {
			const files = (req as any).files;

			if (!files || Object.keys(files).length === 0) {
				return res.status(400).send('No files were uploaded.');
			}

			const facebookAPI = new FacebookAPI(req.session.user);

			for (const key in files) {
				if (files.hasOwnProperty(key)) {
					const file = files[key];
					const mvFilePath = `${app.root}/temp/${file.name}`;
					file.mv(mvFilePath, (error) => {
						if (error) {
							return res.status(500).send(error);
						}
						facebookAPI.publishVideo(mvFilePath, file.name)
							.then(() => {
								return res.status(200).send('File uploaded!').end();
							})
							.catch((error) => {
								return res.status(500).send(error);
							});
					});
				}
			}
		} catch (error) {
			console.error(`_UploadVideo_`, error);
			res.status(500).send(error);
		}
	},
};
