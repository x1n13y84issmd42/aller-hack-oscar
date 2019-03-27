import { VideoDesc } from "lib/render/Types";

export interface IVideos<V extends VideoDesc> {
	put(v: V);
	get(id: string): Promise<V>;
	all(): Promise<V[]>;
}
