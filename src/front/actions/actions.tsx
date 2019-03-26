import {Action, createAction} from 'redux-actions';
import Store from '../stores/Main';
import {APIGet, APIPost} from '../service/API';
import Constants from '../constants';

const getFramesAction: Action = createAction(Constants.GET_FRAMES);
const getFramesErrorAction: Action = createAction(Constants.GET_FRAMES_ERROR);
const sendVideoAction: Action = createAction(Constants.SEND_VIDEO);
const sendVideoErrorAction: Action = createAction(Constants.SEND_VIDEO_ERROR);

/**
 * @param getTickets : function, request user credit cards
 */
export const getFrames = async () => {
	try {
		let {data} = await APIGet(`/frames`);
		return Store.dispatch(getFramesAction(data))
	} catch (err) {
		Store.dispatch(getFramesErrorAction());
		throw err;
	}
};

/**
 * @param addTicket : Why not POST? Additing process was delegated to third party api,
 * Mediaconnect client makes POST inside, creates transactiondID and redirect
 * That's why we need to call minside-api without any body
 */
export const sendVideo = async (data) => {
	try {
		await APIPost(`/api/lib/videos`, data, { headers: {'Content-Type': 'multipart/form-data'} });
		Store.dispatch(sendVideoAction());
	} catch (err) {
		Store.dispatch(sendVideoErrorAction());
		throw err;
	}
};