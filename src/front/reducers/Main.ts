import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import VideosReducer from 'front/reducers/VideosReducer'
import EffectsReducer from 'front/reducers/EffectsReducer'
import ClipsReducer from 'front/reducers/ClipsReducer'
import TimelinesReducer from 'front/reducers/TimelinesReducer'
import ProjectsReducer from 'front/reducers/ProjectsReducer'

const MainReducer = history => combineReducers({
	router: connectRouter(history),
	videos: VideosReducer,
	effects: EffectsReducer,
	clips: ClipsReducer,
	timelines: TimelinesReducer,
	projects: ProjectsReducer,
});

export default MainReducer;
