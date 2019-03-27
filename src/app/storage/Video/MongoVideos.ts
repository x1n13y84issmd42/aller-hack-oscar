
import * as debug from 'debug';
import { ObjectId } from "mongodb";

import { VideoDesc } from "lib/render/Types";
import * as mongo from 'lib/mongo';

import { IVideos } from "./IVideos";

const log = debug('MongoVideos');

export class MongoVideos implements IVideos<VideoDesc> {
	async put(v: VideoDesc) {
		//	Destructing it so insertOne() won't put an _id in v.
		let res = await mongo.db.collection('videos').insertOne({ ...v });
		v.id = res.insertedId.toString();
	}

	async get(id: string): Promise<VideoDesc> {
		try {
			const video = await mongo.db.collection('videos').findOne({ _id: new ObjectId(id) }) as VideoDesc
			return video;
		} catch (error) {
			console.error(`_MongoVideos_Get_`, error);
			throw error;
		}
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
