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

exports.getBooks = async (req,res) => {
    try{
        const books = await Book.findAll();
        if(books.length){
            res.status(200).json(books);
        }else {
            res.status(404).json("There is no Books!");
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"Error while fetching book"});

    }
};

exports.getBookById = async (req, res)=>{
    try{

        const book = await Book.findByPk(req.params.id);
        if(book){
            res.status(200).json(book);
        }
        else {
            res.status(404).json("Book not found");
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"Error while fetching books"});
    }
};

exports.updateBookById = async(req, res) => {
    try{
        const book = await Book.findByPk(req.params.id);
        if(book){
            await Book.update(req.body, {where: {id:req.params.id}});
            res.status(200).json(book);
        }
        else {
            res.status(404).json("Book not found");
        }
        
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Error while updating book"});
    }
};
