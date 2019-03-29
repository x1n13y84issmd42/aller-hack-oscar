
import * as debug from 'debug';
import { ObjectId } from "mongodb";

import { VideoDesc } from "lib/render/Types";
import * as mongo from 'lib/mongo';

import { IVideos } from "./IVideos";

const log = debug('MongoVideos');

export class MongoVideos implements IVideos<VideoDesc> {
	async put(v: VideoDesc) {
		if (v.id) {
			log(`Updating the ${v.id} with `, {$set: {...v, id: undefined}});
			log(`Query `, {_id: v.id});

			await mongo.videos.updateOne(
				{ _id: new ObjectId(v.id) },
				{ $set: {...v, id: undefined} },
				{ upsert: true }
			);
		} else {
			log(`Inserting`);
			//	Destructuring it so insertOne() won't put an _id in v.
			let res = await mongo.videos.insertOne({...v});
			v.id = res.insertedId.toString();
		}
	}

	async get(id: string): Promise<VideoDesc> {
		return {path: 'storage/in/25.mp4'} as VideoDesc;
		return await mongo.videos.findOne({_id: new ObjectId(id)});
	}

	async all(): Promise<VideoDesc[]> {
		let res: VideoDesc[] = [];
		let cursor = await mongo.videos.find({});

		await cursor.forEach((v) => {
			res.push(v);
		});

		return res;
	}
}
