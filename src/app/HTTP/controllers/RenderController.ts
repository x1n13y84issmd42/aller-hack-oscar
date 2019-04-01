import {Request, Response} from 'express';
import {metaDecoder} from 'lib/streams';
import * as stream from 'stream';
import { VideoDesc } from 'lib/render/Types';
import { MongoVideos } from 'storage/Video/MongoVideos';
import { StreamFramesExtractor, StreamFramesExtractorJPEG } from 'lib/render/StreamFramesExtractor';

const ctrler =  {
	preview: async (req: Request, resp: Response) => {
		let { project, i} = req.body;
		let sfx = new StreamFramesExtractorJPEG(project, new MongoVideos, true);
		let jpgframes = await sfx.get(i);
		let b64frames = jpgframes.map(jpg => {
			return {
				vt: jpg.vt,
				vi: jpg.vi,
				ct: jpg.ct,
				ci: jpg.ci,
				data: 'data:image/jpeg;base64,' + jpg.data.toString('base64')
			};
		});
		return resp.status(200).json(b64frames).end();
	}
};

export default ctrler;
