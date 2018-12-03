import axios from 'axios';

const GET_HOLDINGS_WITH_PRICE = 'GET_HOLDINGS_WITH_PRICE';

const getHoldingsWithPrice = holdingsWithPrice =>
    ({type: GET_HOLDINGS_WITH_PRICE, holdingsWithPrice});

export const fetchHoldingsWithPriceByUserId = (userId) => async dispatch => {
  const {data} = await axios.get(`/api/holdings/user/${userId}`);

  const symbols = data.map(holding => holding.symbol).join(',');

  const iexRets = await axios.get(
      `https://api.iextrading.com/1.0/stock/market/batch?symbols=${
          symbols}&types=price,ohlc`);
  const iexInfo = iexRets.data;

  // TODO(zhangwen829), check if holdings's size is equal to iexInfo'size

  let combined = [];
  for (let i = 0; i < data.length; ++i) {
    const symbol = data[i].symbol;
    combined.push({
      symbol: symbol,
      shares: data[i].shares,
      price: iexInfo[symbol].price,
      open: iexInfo[symbol].ohlc.open.price
    });
  }
  return dispatch(getHoldingsWithPrice(combined));
};

const initialState = {
  holdingsWithPrice: []
};

const holdingReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_HOLDINGS_WITH_PRICE:
      return {...state, holdingsWithPrice: action.holdingsWithPrice};
    default:
      return state;
  }
};

export default holdingReducer;
