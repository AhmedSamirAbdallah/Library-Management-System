const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  username: 'admin',            // Database username
  password: 'admin',            // Database password
  database: 'library',          // Database name
  host: 'localhost',            // Database host (e.g., 'localhost' or an IP address)
  dialect: 'postgres',          // Database dialect (e.g., 'postgres', 'mysql', etc.)
  port: 5432,                   // Port on which the database server is running (default for PostgreSQL is 5432)
  logging: false,               // Set to `true` to log SQL queries to the console
});

module.exports = sequelize;
