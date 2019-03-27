import { Request, Response } from 'express';

import * as app from 'app';

import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as savepixels from 'save-pixels';
import * as ndarray from 'ndarray';

import { decoder } from 'lib/streams';
import { Reflector } from 'lib/streams/Reflector';
import { RGB24Frame } from 'lib/ffmpeg';

const convertFramesToImages = async (videoId: string): Promise<any[]> => {
	return new Promise((resolve, reject) => {
		try {
			const framesTotal = 20;
			let frames = [];
			let counter = 0;

			const outDirName = `${app.root}/storage/out/frames/${videoId}`;
			const filePath = `${app.root}/storage/${videoId}`;

			const dec = decoder(filePath, {
				from: 0,
				frames: framesTotal,
			});

			dec.pipe(new Reflector<RGB24Frame>(async (frame: RGB24Frame) => {
				counter++;

				if (!fs.existsSync(outDirName)) {
					mkdirp.sync(outDirName);
				}

				const imageName = `frame_${counter}.jpg`;
				const fn = `${outDirName}/${imageName}`;

				let xpixels = new ndarray(frame.data, [frame.height, frame.width, 3]);
				xpixels = xpixels.transpose(1, 0);

				let fileSaveStream = fs.createWriteStream(fn);
				savepixels(xpixels, 'JPEG').pipe(fileSaveStream);

				await new Promise((innnerResolve, innerReject) => {
					try {
						fileSaveStream.on('finish', () => {
							frames.push(`/storage/frames/${videoId}/${imageName}`)
							innnerResolve();
						});
					} catch (error) {
						console.error(`_ConvertFramesToImages_FileStream_`, error);
						innerReject(error);
					}
				});
				if (counter === framesTotal) {
					return resolve(frames);
				}
			}));
		} catch (error) {
			console.error(`_ConvertFramesToImages_`, error);
			reject(error);
		}
	});
}

const FrameController = {
	getFramesByVideoId: async (req: Request, res: Response) => {
		try {
			if (!req.params || !req.params.videoId) {
				return res.status(400).send('The `videoId` param is empty.').end();
			}
			const { videoId } = req.params;
			const frames = await convertFramesToImages(videoId);
			res.status(200).json(frames).end();
		} catch (error) {
			console.error(`_FrameController_GetFramesByVideoId_`, error);
			return res.status(400).send('No files were uploaded.').end();
		}
	},
};

export default FrameController;
