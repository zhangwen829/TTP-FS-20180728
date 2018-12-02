const User = require('./user');
const Holding = require('./holding');

User.hasMany(Holding);
Holding.belongsTo(User);

module.exports = {User, Holding};