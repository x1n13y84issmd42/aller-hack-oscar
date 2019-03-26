import {connectRouter} from 'connected-react-router';
import { combineReducers } from 'redux';

const MainReducer = history => combineReducers({
	router: connectRouter(history),
});
export default MainReducer;