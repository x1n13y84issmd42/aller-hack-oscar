import { IVideos } from "app/storage/Video/IVideos";
import { VideoDesc } from "lib/render/Types";

export class MongoVideos implements IVideos<VideoDesc> {
	get(id: string): VideoDesc {
		return {
			id: '1',
			name: 'THE FAKE TIMES.avi',
			path: '~/tft.avi',
			FPS: 24,
			width: 800,
			height: 600,
			length: 1234,
		};
	}
}
