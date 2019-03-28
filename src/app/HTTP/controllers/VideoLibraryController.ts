import {Request, Response} from 'express';
import {metaDecoder} from 'lib/streams';
import * as stream from 'stream';
import { VideoDesc } from 'lib/render/Types';
import { MongoVideos } from 'storage/Video/MongoVideos';

const ctrler =  {
	index: async (req: Request, resp: Response) => {
		let videos = new MongoVideos();
		let vids = await videos.all();
		return resp.status(200).json(vids).end();
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

	upload: async function(req: Request, resp: Response) {
		console.log('Uploaded file', req.files);
		let video = req.files.video;

		if (video) {
			let videoFileStream = new stream.PassThrough();
			videoFileStream.end(video.data);
			let codecData = await metaDecoder(videoFileStream);

			let vd: VideoDesc = {
				FPS: codecData.FPS,
				width: codecData.width,
				height: codecData.height,
				length: codecData.duration,
				path: '',
				name: video.name,
			};

			let videos = new MongoVideos();
			//	First save to get the ID
			await videos.put(vd);
			let path = `storage/${vd.id}`;
			
			video.mv(path, (err) => { //videos ?????
				if (err) {
					//	Resaving to update the path.
					videos.put(vd).then(() => {
						resp.status(500).json(err).end();
					});
				} else {
					resp.status(200).json(vd).end();
				}
			});

		} else {
			resp.status(400).json({error: `Please provide a file as 'video'.`});
		}
	}
};

export default ctrler;
