import { IVideos } from "app/storage/Video/IVideos";
import { VideoDesc } from "lib/render/Types";

export class MongoVideos implements IVideos<VideoDesc> {
	get(id: string): VideoDesc {
		return {} as VideoDesc;
	}
}
