import { IVideos } from "./IVideos";
import { VideoDesc } from "lib/render/Types";
import * as mongo from 'lib/mongo';

export class MongoVideos implements IVideos<VideoDesc> {
	async put(v: VideoDesc) {
		//	Destruct it so insertOne() won't put an _id in v.
		let res = await mongo.db.collection('videos').insertOne({...v});
		v.id = res.insertedId.toString();
	}

	get(id: string): VideoDesc {
		return {} as VideoDesc;
	}
}
