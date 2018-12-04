import axios from 'axios';

const GET_HOLDINGS_WITH_PRICE = 'GET_HOLDINGS_WITH_PRICE';

const getHoldingsWithPrice = (holdingsWithPrice, portfolioTotal) =>
    ({type: GET_HOLDINGS_WITH_PRICE, holdingsWithPrice, portfolioTotal});

export const fetchHoldingsWithPriceByUserId = (userId) => async dispatch => {
  const {data} = await axios.get(`/api/holdings/user/${userId}`);

  if (data.length === 0) {
    return dispatch(getHoldingsWithPrice([], 0));
  }

  const symbols = data.map(holding => holding.symbol).join(',');

  const iexRets = await axios.get(
      `https://api.iextrading.com/1.0/stock/market/batch?symbols=${
          symbols}&types=price,ohlc`);
  const iexInfo = iexRets.data;

  // TODO(zhangwen829): check if holdings's size is equal to iexInfo'size
  // assume fetching data from IEX API worked as expected
  let combined = [];
  let portfolioTotal = 0;
  for (let i = 0; i < data.length; ++i) {
    const symbol = data[i].symbol;
    combined.push({
      symbol: symbol,
      shares: data[i].shares,
      price: iexInfo[symbol].price,
      open: iexInfo[symbol].ohlc.open.price,
      change: iexInfo[symbol].price - iexInfo[symbol].ohlc.open.price
    });
    portfolioTotal += data[i].shares * iexInfo[symbol].price;
  }
  return dispatch(getHoldingsWithPrice(combined, portfolioTotal));
};

const initialState = {
  holdingsWithPrice: [],
  portfolioTotal: 0
};

const holdingReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_HOLDINGS_WITH_PRICE:
      return {
        ...state,
        holdingsWithPrice: action.holdingsWithPrice,
        portfolioTotal: action.portfolioTotal
      };
    default:
      return state;
  }
};

export default holdingReducer;
