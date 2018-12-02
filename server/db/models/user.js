const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  id: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1, primaryKey: true},
  email: {type: Sequelize.STRING, unique: true, allowNull: false},
});

module.exports = User;