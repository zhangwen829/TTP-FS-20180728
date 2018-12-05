import axios from 'axios';

const GET_TRADES = 'GET_TRADES';

const getTrades = trades => ({type: GET_TRADES, trades});

export const fetchTradesByUserId = (userId) => async dispatch => {
  const {data} = await axios.get(`/api/trades/user/${userId}`);
  return dispatch(getTrades(data));
};

const initialState = {
  tradesByUserId: []
};

const tradeReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_TRADES:
      return {
        ...state,
        tradesByUserId: action.trades,
      };
    default:
      return state;
  }
};

export default tradeReducer;