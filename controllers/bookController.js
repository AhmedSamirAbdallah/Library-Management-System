const sequelize = require('../config/database');
const Book = require('../models/book')(sequelize, require('sequelize').DataTypes);

exports.createBook = async (req, res) => {
  try {
    
    const { title, isbn, author, publishedDate, quantity, location } = req.body;    
    const book = await Book.create({ title, isbn, author, publishedDate, quantity, location });

    res.status(201).json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};