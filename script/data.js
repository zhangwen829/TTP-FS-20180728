const userData = [{
  email: 'wen@email.com',
  password: '12345',
  name: 'Wen Zhang',
  cashBal: 3527.04
}];

function holdingData(userId1) {
  return [
    {symbol: 'GOOG', shares: 1, userId: userId1},
    {symbol: 'BAC', shares: 5, userId: userId1},
    {symbol: 'TGT', shares: 2, userId: userId1},
    {symbol: 'MSFT', shares: 3, userId: userId1}
  ];
}

function tradeData(userId1) {
  return [
    {
      symbol: 'GOOG',
      shares: 1,
      price: 890.16,
      tradeType: 'BUY',
      userId: userId1
    },
    {
      symbol: 'MSFT',
      shares: 1,
      price: 106.35,
      tradeType: 'BUY',
      userId: userId1
    },
    {symbol: 'BAC', shares: 5, price: 27.95, tradeType: 'BUY', userId: userId1},
    {symbol: 'TGT', shares: 2, price: 64.30, tradeType: 'BUY', userId: userId1},
    {
      symbol: 'MSFT',
      shares: 2,
      price: 104.05,
      tradeType: 'BUY',
      userId: userId1
    }
  ];
}

module.exports = {
  userData,
  holdingData,
  tradeData
};
