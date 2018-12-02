const Sequelize = require('sequelize');
const db = require('../db');

const Holding = db.define('holding', {
  symbol: {type: Sequelize.STRING, allowNull: false},
  shares: {type: Sequelize.INTEGER, allowNull: false}
});

Holding.listHoldingsByUserId = function(userId) {
  return this.findAll({where: {userId}});
};

module.exports = Holding;