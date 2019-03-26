import {Request, Response} from 'express';
import {metaDecoder} from 'streams';
import * as stream from 'stream';

const ctrler =  {
	index: (req: Request, resp: Response) => {
		return ctrler.index_mock(req, resp);
	},

	index_mock: (req: Request, resp: Response) => {
		let idBase = 1000;
	
		function mockVideo(title: string) {
			return {
				id: idBase++,
				title: title,
				length: Math.random() * 60 * 5,
			}
		};

		resp.status(200).json([
			mockVideo('VIDEO00001'),
			mockVideo('VIDEO00002'),
			mockVideo('VIDEO00003'),
			mockVideo('VIDEO00004'),
			mockVideo('DCIM-0004'),
			mockVideo('DCIM-0008'),
		]).end();
	},	

	upload: async function(req, resp: Response) {
		console.log('Uploaded file', req.files);

		if (req.files.video) {
			
			var videoFileStream = new stream.PassThrough();
			videoFileStream.end(req.files.video.data);
			let codecData = await metaDecoder(videoFileStream);
			resp.status(200).json(codecData).end();
		} else {
			resp.status(400).json({error: `Please provide a file as 'video'.`});
		}
	}
};

export default ctrler;
