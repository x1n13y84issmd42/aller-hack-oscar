
import { Action, createAction } from 'redux-actions';

import { APIGet, APIPost } from 'front/service/API';
import Constants from 'front/constants';
import Store from 'front/stores/Main';

const getVideosAction: Action = createAction(Constants.GET_VIDEOS);
const getVideosErrorAction: Action = createAction(Constants.GET_VIDEOS_ERROR);

const getClipsAction: Action = createAction(Constants.GET_CLIPS);
const getClipsErrorAction: Action = createAction(Constants.GET_CLIPS_ERROR);

const getEffectsAction: Action = createAction(Constants.GET_EFFECTS);
const getEffectsErrorAction: Action = createAction(Constants.GET_EFFECTS_ERROR);

const selectProjectAction: Action = createAction(Constants.SELECT_PROJECT);
const selectProjectErrorAction: Action = createAction(Constants.SELECT_PROJECT_ERROR);

const addVideoAction: Action = createAction(Constants.ADD_VIDEO);
const addVideoErrorAction: Action = createAction(Constants.ADD_VIDEO_ERROR);

const addEffectAction: Action = createAction(Constants.ADD_EFFECT);
const addEffectErrorAction: Action = createAction(Constants.ADD_EFFECT_ERROR);

const addProjectAction: Action = createAction(Constants.ADD_PROJECT);
const addProjectErrorAction: Action = createAction(Constants.ADD_PROJECT_ERROR);

const addTimelineAction: Action = createAction(Constants.ADD_TIMELINE);
const addTimelineErrorAction: Action = createAction(Constants.ADD_TIMELINE_ERROR);

const getImageAction: Action = createAction(Constants.GET_IMAGE);
const getImageErrorAction: Action = createAction(Constants.GET_IMAGE_ERROR);

export const selectProject = (projectIndex) => {
	try {
		return Store.dispatch(selectProjectAction(projectIndex))
	} catch (err) {
		Store.dispatch(selectProjectErrorAction());
		throw err;
	}
};

export const addProject = (projectName: string) => {
	try {
		const options = {
			id: `${Date.now()}`,
			title: projectName,
			FPS: 25,
			width: 800,
			height: 600,
			length: 1,
			timelines: [],
		};
		return Store.dispatch(addProjectAction(options))
	} catch (err) {
		Store.dispatch(addProjectErrorAction());
		throw err;
	}
};

export const addEffect = (entityIndex, timelineIndex, effect) => {
	try {
		const payload = {
			entityIndex,
			timelineIndex,
			effect: {
				...effect,
				id: `${Date.now()}`
			}
		};
		return Store.dispatch(addEffectAction(payload))
	} catch (err) {
		Store.dispatch(addEffectErrorAction());
		throw err;
	}
};

export const addTimeline = async (rawVideo) => {
	try {
		const videoId = rawVideo._id || rawVideo.id;
		const payload = {
			entities: [{
				id: `${Date.now()}`,
				videoId,
				clipping: {
					start: 0,
					end: 1,
				},
				position: {
					start: 0,
				},
				effects: [],
			}],
		};
		return Store.dispatch(addTimelineAction(payload))
	} catch (err) {
		Store.dispatch(addTimelineErrorAction());
		throw err;
	}
};


export const getVideos = async () => {
	try {
		let { data } = await APIGet(`/api/lib/videos`);
		return Store.dispatch(getVideosAction(data))
	} catch (err) {
		Store.dispatch(getVideosErrorAction());
		throw err;
	}
};

export const getClips = async () => {
	try {
		let { data } = await APIGet(`/api/lib/clips`);
		return Store.dispatch(getClipsAction(data))
	} catch (err) {
		Store.dispatch(getClipsErrorAction());
		throw err;
	}
};

export const getEffects = async () => {
	try {
		let { data } = await APIGet(`/api/lib/effects`);
		Store.dispatch(getEffectsAction(data));
	} catch (err) {
		Store.dispatch(getEffectsErrorAction());
		throw err;
	}
};

export const addVideo = async (params) => {
	try {
		const { data } = await APIPost(`/api/upload/video`, params, { headers: { 'Content-Type': 'multipart/form-data' } });
		Store.dispatch(addVideoAction(data));
	} catch (err) {
		Store.dispatch(addVideoErrorAction());
	}
}

export const addClip = async (params) => {
	try {
		const { data } = await APIPost(`/api/lib/clip`, params);
		Store.dispatch(addVideoAction(data));
	} catch (err) {
		Store.dispatch(addVideoErrorAction());
	}
}


export const getCurrentImage = async (params) => {
	try {
		let { data } = await APIGet(`/api/frames`, params);
		while (data) {
			Store.dispatch(getImageAction(data));
			data  = await APIGet(`/api/frames`);
		}
	} catch (err) {
		Store.dispatch(getImageErrorAction());
		throw err;
	}
};