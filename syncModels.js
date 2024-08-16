const sequelize = require('./config/database');
const Book = require('./models/book')(sequelize, require('sequelize').DataTypes);

async function syncModels() {
  try {
    await sequelize.sync({ force: true }); // Use { force: true } to recreate the tables
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
}

module.exports = syncModels;
