import { VideoDesc } from "lib/render/Types";

export interface IVideos<V extends VideoDesc> {
	get(id: string): V
}

export class MongoVideos implements IVideos<VideoDesc> {
	get(id: string): VideoDesc {
		return {
			id: '1',
			name: 'THE FAKE TIMES.avi',
			path: '',
			FPS: 24,
			length: 123,
		};
	}
}
