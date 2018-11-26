const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'root', 'node1234', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
