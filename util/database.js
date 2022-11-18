const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
