import { VideoDesc } from "lib/render/Types";

export interface IVideos<V extends VideoDesc> {
	get(id: string): V
}
