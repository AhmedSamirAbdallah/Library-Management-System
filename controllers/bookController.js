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

        if(!book){

            return res.status(404).json("Book not found");       
        
        }
        
        if(req.body.isbn){

            const existingBook = await Book.findOne({where:{isbn:req.body.isbn}});
            
            if(existingBook && existingBook.id!=book.id){

                return res.status(400).json({"message":"ISBN already exists"});

            }
        }

        book.title = req.body.title || book.title
        book.author = req.body.author || book.author
        book.title = req.body.title || book.title
        book.isbn = req.body.isbn || book.isbn
        book.published_date = req.body.published_date || book.published_date
        book.quantity = req.body.quantity || book.quantity
        book.location = req.body.location || book.location

        await book.save();

        res.status(200).json(book);

        
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Error while updating book"});
    }
};
