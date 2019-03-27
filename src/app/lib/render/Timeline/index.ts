import { VideoDesc } from "lib/render/Types";
import { IVideos } from "../../../storage/Video";

//	Potentially this can become more than a single number
export type FrameTimestamp = number;

export type ClipDesc = {
	id: number,
	videoID: string,
	t1: FrameTimestamp,
	t2: FrameTimestamp,
	URL: string,
};

export type TimelineEntity = ClipDesc;

export type TimelineDesc = {
	z: number;
	entities: TimelineEntity[];
}

/**
 * A reference to the 
 */
export type VideoFrameRef = {
	videoID: string;
	frameT: FrameTimestamp;
};

export namespace Timeline {
	/**
	 * Calculates references to every single frame on a timeline that is on the given timestamp.
	 * 
	 * ★★★ IMPORTANT ★★★
	 * it assumes that `t` is a numeric timestamp ★ IN ★ CLIP ★ TIME ★ SPACE ★, and calculates exact frame timestamp
	 * from it and the referenced video FPS.
	 */
	export function selectFramesAt<VT extends VideoDesc>(tls: TimelineDesc[], t: FrameTimestamp, videos: IVideos<VT>): VideoFrameRef[] {
		let res: VideoFrameRef[] = [];

		for (let tl of tls) {
			for (let e of tl.entities) {
				if (e.t1 <= t && e.t2 >=t) {
					//TODO: retrieve the video object from repo, get its FPS
					let v = videos.get(e.videoID);

					res.push({
						videoID: e.videoID,
						frameT: t * v.FPS / (e.t1 - e.t2)
					});
				}
			}
		}

		return res;
	}
}
