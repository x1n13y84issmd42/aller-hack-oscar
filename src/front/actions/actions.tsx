import {Action, createAction} from 'redux-actions';
import Store from '../stores/Main';
import {APIGet, APIPost} from '../service/API';
import Constants from '../constants';

const getVideosAction: Action = createAction(Constants.GET_VIDEOS);
const getClipsAction: Action = createAction(Constants.GET_CLIPS);
const getEffectsAction: Action = createAction(Constants.GET_EFFECTS);
const getVideosErrorAction: Action = createAction(Constants.GET_VIDEOS_ERROR);
const getClipsErrorAction: Action = createAction(Constants.GET_CLIPS_ERROR);
const getEffectsErrorAction: Action = createAction(Constants.GET_EFFECTS_ERROR);
const addVideoAction: Action = createAction(Constants.ADD_VIDEO);
const addVideoErrorAction: Action = createAction(Constants.ADD_VIDEO_ERROR);


export const getVideos = async () => {
	try {
		let {data} = await APIGet(`/api/lib/videos`);
		return Store.dispatch(getVideosAction(data))
	} catch (err) {
		Store.dispatch(getVideosErrorAction());
		throw err;
	}
};

export const getClips = async () => {
	try {
		let {data} = await APIGet(`/api/lib/clips`);
		return Store.dispatch(getClipsAction(data))
	} catch (err) {
		Store.dispatch(getClipsErrorAction());
		throw err;
	}
};

export const getEffects = async () => {
	try {
		let {data} = await APIGet(`/api/lib/effects`);
		return Store.dispatch(getEffectsAction(data))
	} catch (err) {
		Store.dispatch(getEffectsErrorAction());
		throw err;
	}
};

export const addVideo = async (params) => {
	try {
		const {data} = await APIPost(`/api/upload/video`, params, {headers: {'Content-Type': 'multipart/form-data'}});
		Store.dispatch(addVideoAction(data));
	} catch (err) {
		Store.dispatch(addVideoErrorAction());
	}
}