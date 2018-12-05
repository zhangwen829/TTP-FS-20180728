import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import holdingReducer from './holding';
import tradeReducer from './trade';
import userReducer from './user';

const reducer = combineReducers(
    {user: userReducer, holdings: holdingReducer, trades: tradeReducer});
const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({collapsed: true})));
const store = createStore(reducer, middleware);

export default store;