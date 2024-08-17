const sequelize = require('../config/database');
const Borrowing = require('../models/borrowing')(sequelize, require('sequelize').DataTypes);
const Borrower = require('../models/borrower')(sequelize, require('sequelize').DataTypes);
const Book = require('../models/book')(sequelize, require('sequelize').DataTypes);

const { sendResponse } = require('../utils/responseHelper')


exports.createBorrowing = async (req, res) => {
    try{
        
        const {borrowerId, bookId, dateFrom , dateTo} = req.body;
        
        const book = await Book.findByPk(bookId);
        if(!book){
            return sendResponse(res, 404, null, 'Book not found');
        }

        const borrower = await Borrower.findByPk(borrowerId);
        if(!borrower){
            return sendResponse(res, 404, null, 'Borrower not found');
        }
        
        const borrowedCount  = await Borrowing.count({
            where : {
                book_id:bookId,
                active:true
            }
        });
        console.log(borrowedCount);
        if(book.quantity>borrowedCount){
            const borrowing = await Borrowing.create({
                borrower_id: borrowerId,
                book_id: bookId,
                date_from: dateFrom,
                date_to: dateTo,
                active: true
            });
            return sendResponse(res,201,borrowing,'Borrowing created successfully');
        }
        else {

            return sendResponse(res, 409 , null, 'No available books for this request');
        }    

    }catch(error){
        console.log(error);
        return sendResponse(res, 500, null, 'Internal Server Error');
    }
}