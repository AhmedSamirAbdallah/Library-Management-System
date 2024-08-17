const sequelize = require('../config/database');
const Book = require('../models/book')(sequelize, require('sequelize').DataTypes);
const { sendResponse } = require('../utils/responseHelper')

exports.createBook = async (req, res) => {
  try {
    
    const { title, isbn, author, publishedDate, quantity, location } = req.body;
    
    const existingBook = await Book.findOne({where : {isbn:isbn}});
    
    if(existingBook){
        
        return sendResponse(res,400,null,"ISBN already exists");
    }

    const book = await Book.create({ title, isbn, author, publishedDate, quantity, location });

    return sendResponse(res,201,book,'Book created successfully');
  
} catch (error) {

    console.error('Error creating book:', error);
    return sendResponse(res,500,null,'Internal Server Error');
    
    }

};

exports.getBooks = async (req,res) => {
    try{

        const books = await Book.findAll();
        
        if(books.length){
        
            return sendResponse(res,200,books,"Books retrieved successfully");
        }

        return sendResponse(res,404,null,"No books found");
        
    }
    catch(error){
        
        console.log(error)
        return sendResponse(res,500,null,'Error while fetching book');

    }
};

exports.getBookById = async (req, res)=>{
    try{

        const book = await Book.findByPk(req.params.id);
        
        if(book){
        
            return sendResponse(res, 200, book, 'Book retrieved successfully');
        }
        
        return sendResponse(res, 404, null, 'Book not found');
    }
    catch(error){
        
        console.log(error)
        sendResponse(res, 500, null, 'Error while fetching book');
    
    }
};

exports.updateBookById = async(req, res) => {
    try{
        const book = await Book.findByPk(req.params.id);

        if(!book){

            return sendResponse(res, 404, null, 'Book not found');
        
        }
        
        if(req.body.isbn){

            const existingBook = await Book.findOne({where:{isbn:req.body.isbn}});
            
            if(existingBook && existingBook.id!=book.id){

                return sendResponse(res, 400, null, 'ISBN already exists');

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

        sendResponse(res, 200, book, 'Book updated successfully');

        
    }catch(error){
        console.log(error)
        sendResponse(res, 500, null, 'Error while updating book');
    }
};

exports.deleteBookById = async (req, res) =>{

    try {

        const result = await Book.destroy({where:{id:req.params.id}});

        if(result){

            return sendResponse(res, 200, null, 'Book deleted successfully!');
        }
         
        return sendResponse(res, 404, null, 'Book not found');
        
    }
    catch(error){
        
        console.log(error)
        sendResponse(res, 500, null, 'Error while deleting book');

    }
};
