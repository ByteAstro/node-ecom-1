const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete',
    'root', '99plus.1sure', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;