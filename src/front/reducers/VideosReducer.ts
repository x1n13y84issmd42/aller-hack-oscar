import {handleActions} from 'redux-actions';
//import mergers from 'seamless-immutable-mergers';
import * as Immutable from 'seamless-immutable';
import Constants from 'front/constants';

/*const mergeConfig = {
	merger: mergers.updatingByIdArrayMerger,
	mergerObjectIdentifier: 'id',
	deep: true,
};*/

export const InitialState = Immutable.from({
	videos: [],
});

const VideosReducer = handleActions({
	[Constants.GET_VIDEOS]: (state, action) =>
		state.set('videos', action.payload),

	[Constants.ADD_VIDEO]: (state, action) => {
		const video = action.payload;
		console.log(action.payload)
		const videos = state.getIn(['videos']);
		return state.set('videos', [video, ...videos]);
	},
	/*[UsersConstants.DELETE_USER]: (state, action) => {
		let users = state.getIn(['users']);
		const userId = action.payload;
		const newUsers = users.flatMap((value) => {
			if (value.id === userId) {
				return [];
			} else {
				return value;
			}
		});
		return state.set('users', newUsers);
	},
	[UsersConstants.UPDATE_USER]: (state, action) => {
		return state.merge({users: [action.payload]}, mergeConfig);
	}*/
}, InitialState);

export default VideosReducer;