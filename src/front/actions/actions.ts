import { Action, createAction } from 'redux-actions';

import { APIGet, APIPost } from '../service/API';
import Constants from '../constants';
import Store from '../stores/Main';

const getTimelineAction: Action = createAction(Constants.GET_TIMELINE);
const getTimelineErrorAction: Action = createAction(Constants.GET_TIMELINE_ERROR);

const getVideosAction: Action = createAction(Constants.GET_VIDEOS);
const getVideosErrorAction: Action = createAction(Constants.GET_VIDEOS_ERROR);

const getClipsAction: Action = createAction(Constants.GET_CLIPS);
const getClipsErrorAction: Action = createAction(Constants.GET_CLIPS_ERROR);

const getEffectsAction: Action = createAction(Constants.GET_EFFECTS);
const getEffectsErrorAction: Action = createAction(Constants.GET_EFFECTS_ERROR);

const addVideoAction: Action = createAction(Constants.ADD_VIDEO);
const addVideoErrorAction: Action = createAction(Constants.ADD_VIDEO_ERROR);
const addClipAction: Action = createAction(Constants.ADD_CLIP);
const addClipErrorAction: Action = createAction(Constants.ADD_CLIP_ERROR);

export const getTimeline = async (rawVideo) => {
	try {
		const { data } = await APIGet(`/api/lib/frames/${rawVideo._id || rawVideo.id }`);
		const timeline = {
			frames: data,
			video: rawVideo,
		};
		return Store.dispatch(getTimelineAction(timeline))
	} catch (err) {
		Store.dispatch(getTimelineErrorAction());
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
		return Store.dispatch(getEffectsAction(data))
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
		const {data} = await APIPost(`/api/lib/clip`, params);
		Store.dispatch(addVideoAction(data));
	} catch (err) {
		Store.dispatch(addVideoErrorAction());
	}
}