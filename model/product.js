const sequelize = require('../util/database');

const Sequelize = require('sequelize');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  cost: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
});

module.exports = Product;
