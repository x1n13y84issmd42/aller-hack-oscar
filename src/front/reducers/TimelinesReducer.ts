import { handleActions } from 'redux-actions';
import * as Immutable from 'seamless-immutable';

import Constants from 'front/constants';

export const InitialState = Immutable.from({
	timelines: [],
});

const TimelinesReducer = handleActions({
	[Constants.ADD_TIMELINE]: (state, action) => {
		const timelines = state.getIn(['timelines']);
		const timeline = action.payload;
		return state.set('timelines', [...timelines, timeline]);
	},
}, InitialState);

export default TimelinesReducer;
