export type ClipDesc = {
	id: number,
	videoID: string,
	timelineT: number;
	t1: number,
	t2: number,
	URL: string,
};

export type TimelineEntity = ClipDesc;

export type TimelineDesc = {
	z: number;
	entities: TimelineEntity[];
}

export type ProjectSettings = {
	FPS: number,
	width: number,
	height: number,
	length: number,
};

export type Project = {
	timelines: TimelineDesc[];
	settings: ProjectSettings;
}
