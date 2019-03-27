import { VideoDesc } from "lib/render/Types";

export interface IVideos<V> {
	get(id: string): V
}
