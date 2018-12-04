const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');
const Holding = require('./holding');
const Trade = db.define('trade', {
  id: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1, primaryKey: true},
  symbol: {type: Sequelize.STRING, allowNull: false},
  shares: {type: Sequelize.INTEGER, allowNull: false},
  price: {type: Sequelize.DOUBLE, allowNull: false},
  tradeType: {type: Sequelize.ENUM, values: ['UNSPECIFIED', 'BUY', 'SELL']}
});

Trade.listTradesByUserId = function(userId) {
  return this.findAll({where: {userId}});
};

Trade.buy = function(userId, symbol, shares, price) {
  return db.transaction(function(t) {
    return User.findByPk(userId, {transaction: t})
        .then(function(user) {
          const cashAmount = user.cashAmount;
          const needAmount = shares * price;
          if (cashAmount < needAmount) {
            const err = new Error('Not enough cash amount.');
            err.httpStatusCode = 412;  // TODO(zhangwen829, use CONSTANT)
            throw err;
          }
          return user.update(
              {cashAmount: cashAmount - needAmount}, {transaction: t});
        })
        .then(function(unusedUser) {
          return Trade.create(
              {
                symbol: symbol,
                shares: shares,
                price: price,
                tradeType: 'BUY',
                userId: userId
              },
              {transaction: t})
        })
        .then(function(unusedTrade) {
          return Holding.findOrBuild(
              {where: {userId: userId, symbol: symbol}, transaction: t})
        })
        .spread(function(originalHolding, initialized) {
          if (initialized) {
            return Holding.create(
                {symbol: symbol, shares: shares, userId: userId},
                {transaction: t});
          } else {
            return originalHolding.update(
                {shares: originalHolding.shares + shares}, {transaction: t});
          }
        });
  });
};

module.exports = Trade;