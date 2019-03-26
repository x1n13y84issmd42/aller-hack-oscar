export type VideoDesc = {
	id: string;
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

export type Position = {
  start: number,
  end: number
}

export type ClipDesc = {
  videoId: string,
  timelinePosition: Position,
  videoPosition: Position,
  effects: EffectDesc[]
};

export type Timeline = {
  entities: ClipDesc[]
};

export type ProjectSettings = {
  FPS: number,
  width: number,
  height: number
};

export type Project = {
  timelines: Timeline[],
  settings: ProjectSettings
};
