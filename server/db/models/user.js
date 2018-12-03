const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  id: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1, primaryKey: true},
  email: {type: Sequelize.STRING, unique: true, allowNull: false},

  password: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return () => this.getDataValue('password');
    }
  }
});


User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd) === this.password();
};


module.exports = User;
