export type VideoDesc = {
	id?: string;
	name: string;
	path: string;
	FPS: number;
	width: number;
	height: number;
	length: number;
};

export type EffectSetting = {
	[k: string]: any
};

export type EffectDesc = {
	id: string,
	name: string,
	settings: EffectSetting[]
}

//	Potentially this can become more than a single number
export type FrameTimestamp = number;

export type Position = {
	start: FrameTimestamp,
	end: FrameTimestamp
}

export type ClipDesc = {
	videoId: string,
	timelinePosition: Position,
	clipping: Position,
	effects: EffectDesc[]
};

export type Timeline = {
	entities: ClipDesc[]
};

export type ProjectSettings = {
	title: string;
	FPS: number,
	width: number,
	height: number
	length: number,
};

export type Project = {
	timelines: Timeline[],
	settings: ProjectSettings
};
