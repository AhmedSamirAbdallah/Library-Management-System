const sequelize = require('./config/database');
const Book = require('./models/book')(sequelize, require('sequelize').DataTypes);

async function syncModels() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
}

module.exports = syncModels;
