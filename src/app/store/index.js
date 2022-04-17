import thunk from 'redux-thunk';
import appReducer from '../reducers';
import { applyMiddleware, compose, createStore } from 'redux';

const middlewares = [thunk];
const enhancer = (process.env.NODE_ENV === 'development' ? typeof window !== 'undefined' && (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose) : compose)(applyMiddleware(...middlewares));
const store = createStore(appReducer, enhancer);

export default store;
