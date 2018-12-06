import axios from 'axios';
import {fetchHoldingsWithPriceByUserId} from './holding';
import {me} from './user';
const GET_TRADES = 'GET_TRADES';
const SET_ERROR = 'SET_ERROR';

const getTrades = trades => ({type: GET_TRADES, trades});
const setError = error => ({type: SET_ERROR, error});


export const fetchTradesByUserId = (userId) => async dispatch => {
  const {data} = await axios.get(`/api/trades/user/${userId}`);
  return dispatch(getTrades(data));
};

export const buy = function(userId, symbol, shares) {
  return async function(dispatch) {
    const {data} =
        await axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/price`);
    try {
      await axios.post(
          `/api/trades/user/${userId}`,
          {userId: userId, symbol: symbol, shares: shares, price: data});
      dispatch(setError(null));
    } catch (err) {
      return dispatch(setError(err));
    }
    dispatch(me());
    dispatch(fetchHoldingsWithPriceByUserId(userId));
  };
};

const initialState = {
  tradesByUserId: [],
  error: null
};

const tradeReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_TRADES:
      return {
        ...state,
        tradesByUserId: action.trades,
      };
    case SET_ERROR:
      return { ...state, error: action.error }
    default:
      return state;
  }
};

export default tradeReducer;