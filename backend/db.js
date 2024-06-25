const { Sequelize } = require('sequelize');
require('dotenv').config();  // Load environment variables from .env file

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',  // Specify the dialect of the database
});


module.exports = sequelize;
