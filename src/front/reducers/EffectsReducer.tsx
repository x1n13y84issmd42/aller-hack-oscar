import {handleActions} from 'redux-actions';
import * as Immutable from 'seamless-immutable';
import Constants from 'front/constants';

export const InitialState = Immutable.from({
	effects: [],
});

const EffectsReducer = handleActions({
	[Constants.GET_EFFECTS]: (state, action) =>
		state.set('effects', action.payload),
}, InitialState);

export default EffectsReducer;