import {handleActions} from 'redux-actions';
import * as Immutable from 'seamless-immutable';
import Constants from 'front/constants';

export const InitialState = Immutable.from({
	clips: [],
});

const ClipsReducer = handleActions({
	[Constants.GET_CLIPS]: (state, action) =>
		state.set('clips', action.payload),
}, InitialState);

export default ClipsReducer;