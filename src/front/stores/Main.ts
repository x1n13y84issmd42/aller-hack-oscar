import { createStore, applyMiddleware, Store, compose } from 'redux';
import { createBrowserHistory as createHistory } from 'history'

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import hookMiddleware from 'redux-hook-middleware';
import { routerMiddleware } from 'connected-react-router';
import promise from 'redux-promise-middleware'

import MainReducer from 'front/reducers/Main';

export const history:History = createHistory({
	basename: '/',
});

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const logger = createLogger({
	collapsed: true,
});


const middleware = [
	applyMiddleware(promise),
	applyMiddleware(routerMiddleware(history)),
	applyMiddleware(logger, thunk, hookMiddleware),
];

const Store:Store<any> = createStore(MainReducer(history), composeEnhancers(...middleware));

export default Store;