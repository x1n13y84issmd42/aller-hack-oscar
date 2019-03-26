import { IVideos } from "./IVideos";
import { VideoDesc } from "lib/render/Types";
import * as mongo from 'lib/mongo';
import * as debug from 'debug';

const log = debug('MongoVideos');

export class MongoVideos implements IVideos<VideoDesc> {
	async put(v: VideoDesc) {
		//	Destruct it so insertOne() won't put an _id in v.
		let res = await mongo.db.collection('videos').insertOne({...v});
		v.id = res.insertedId.toString();
	}

	get(id: string): VideoDesc {
		return {} as VideoDesc;
	}

	async all(): Promise<VideoDesc[]> {
		let res: VideoDesc[] = [];
		let cursor = await mongo.db.collection('videos').find({});

		await cursor.forEach((v) => {
			res.push(v);
		});

		return res;
	}
}
