type FXDesc = any;

export type VideoDesc = {

};

export type ClipDesc = {
	id?: number,
	videoID: number,
	t1: number,
	t2: number,
	effects: FXDesc[];
};

export type Timeline = {
	zindex: number;
	entities: Array<ClipDesc | FXDesc>;
};

export type Project = {
	timelines: Timeline[];
};

let project: Project = {
	timelines: [
		{
			zindex: 1,
			entities: [
				{
					videoID: 0,
					t1: 9346,
					t2: 5876,
					effects: [],
				} as ClipDesc,

				{
					
				} as FXDesc,

				{
					videoID: 0,
					t1: 346,
					t2: 876,
					effects: [],
				} as ClipDesc,
			]
		}
	]
};