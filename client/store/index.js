import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import holdingReducer from './holding';

const reducer = combineReducers({holdings: holdingReducer});
const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({collapsed: true})));
const store = createStore(reducer, middleware);

export default store;