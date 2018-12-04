const User = require('./user');
const Holding = require('./holding');
const Trade = require('./trade');

User.hasMany(Holding);
Holding.belongsTo(User);

User.hasMany(Trade);
Trade.belongsTo(User);

module.exports = {User, Holding, Trade};