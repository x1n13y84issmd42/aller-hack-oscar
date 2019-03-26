import { FXDesc } from "lib/render/FX";

export type VideoDesc = {};

export type ClipDesc = {
	id: number,
	videoID: number,
	t1: number,
	t2: number,
	URL: string,
};

export type Timeline = Array<ClipDesc | FXDesc>;

export type Project = {
	timelines: Timeline[];
};
