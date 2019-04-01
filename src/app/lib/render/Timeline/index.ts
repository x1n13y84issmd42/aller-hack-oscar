import { VideoDesc, FrameTimestamp } from "lib/render/Types";
import { IVideos } from "../../../storage/Video";
import { Timeline } from "../Types";

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
	/* export async function selectFramesAt<VT extends VideoDesc>(tls: Timeline[], t: FrameTimestamp, videos: IVideos<VT>): Promise<VideoFrameRef[]> {
		let res: VideoFrameRef[] = [];

		for (let tl of tls) {
			for (let e of tl.entities) {
				if (e.clipping.start <= t && e.clipping.end >=t) {
					//TODO: retrieve the video object from repo, get its FPS
					let v = await videos.get(e.videoId);

					res.push({
						videoID: e.videoId,
						frameT: t * v.FPS / (e.clipping.start - e.clipping.end)
					});
				}
			}
		}

		return res;
	} */
}
