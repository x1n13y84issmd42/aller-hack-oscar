import { IVideos } from "./IVideos";
import { VideoDesc } from "lib/render/Types";

export class MockVideos implements IVideos<VideoDesc> {
	put(v: VideoDesc) {
		throw new Error("Method not implemented.");
	}

	async get(id: string): Promise<VideoDesc> {
		return {
			id: id,
			name: 'THE FAKE TIMES.avi',
			path: '~/tft.avi',
			FPS: 24,
			width: 800,
			height: 600,
			length: 1234,
		};
	}

	async all(): Promise<VideoDesc[]> {
		return [
			await this.get('1'),
			await this.get('2'),
			await this.get('3'),
			await this.get('4'),
			await this.get('5'),
		];
	}
}
