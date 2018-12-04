const userData = [
  {email: 'wen@email.com', password: '12345'},
];

function holdingData(userId1) {
  return [
    {symbol: 'GOOG', shares: 1, userId: userId1},
    {symbol: 'BAC', shares: 5, userId: userId1},
    {symbol: 'TGT', shares: 2, userId: userId1},
    {symbol: 'MSFT', shares: 3, userId: userId1}
  ];
}


module.exports = {
  userData,
  holdingData
};
