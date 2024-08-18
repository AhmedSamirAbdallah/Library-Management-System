const sequelize = require('../config/database');
const Borrowing = require('../models/borrowing')(sequelize, require('sequelize').DataTypes);
const Borrower = require('../models/borrower')(sequelize, require('sequelize').DataTypes);
const Book = require('../models/book')(sequelize, require('sequelize').DataTypes);
const { Op } = require('sequelize');
const { sendResponse } = require('../utils/responseHelper')
const ExcelJS = require('exceljs');


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
};

exports.getBorrowedBooksByBorrower = async(req, res)=>{
    try{
        const borrowerId=req.params.id
        const borrowedBooks  = await Borrowing.findAll({
            where : {
                borrower_id:borrowerId,
                active:true
            }
        });

        if (!borrowedBooks.length) {
            return sendResponse(res, 404, null, 'No active borrowed books found for this borrower');
        }

        return sendResponse(res, 200, borrowedBooks, 'Books of the borrower retrieved successfully');
    }
    catch(error){
        console.log(error);
        return sendResponse(res, 500, null, 'Internal Server Error');

    }
}

exports.returnBook = async (req, res) => {
    try {
        const borrowingId  = req.params.id;

        const borrowing = await Borrowing.findByPk(borrowingId);

        if (!borrowing || !borrowing.active) {
            return sendResponse(res, 404, null, 'Borrowing record not found or already returned');
        }

        borrowing.active = false;
        await borrowing.save();

        return sendResponse(res, 200, borrowing, 'Book returned successfully');
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, null, 'Internal Server Error');
    }
};

exports.getOverdueBooks = async (req, res) => {
    try {
        const today = new Date();
        console.log(today)
        const overdueBooks = await Borrowing.findAll({
            where: {
                date_to: { [Op.lt]: today },
                active: true
            }
        });

        if (overdueBooks.length === 0) {
            return sendResponse(res, 404, null, 'No overdue books');
        }

        return sendResponse(res, 200, overdueBooks, 'Overdue books retrieved successfully');
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, null, 'Internal Server Error');
    }
};


exports.exportOverdueBorrowings = async (req, res) => {
    try {
      const today = new Date();
      const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
      
      const overdueBorrowings = await Borrowing.findAll({
        where: {
          date_to: { [Op.lt]: lastMonth },
          active: true
        }
      });
  
      if (overdueBorrowings.length === 0) {
        return sendResponse(res, 404, null, 'No overdue borrowings found');
      }
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Overdue Borrowings');
  
      worksheet.columns = [
        { header: 'ID', key: 'id' },
        { header: 'Book ID', key: 'book_id' },
        { header: 'Borrower ID', key: 'borrower_id' },
        { header: 'Date From', key: 'date_from', width: 20 },
        { header: 'Date To', key: 'date_to', width: 20 },
        { header: 'Active', key: 'active' }
      ];
  
      overdueBorrowings.forEach(borrowing => {
        worksheet.addRow(borrowing.toJSON());
      });
  
      res.setHeader('Content-Disposition', 'attachment; filename=overdue_borrowings.xlsx');
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, null, 'Internal Server Error');
    }
  };
  
  exports.exportBorrowingProcesses = async (req, res) => {
    try {
      const today = new Date();
      const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
  
      const borrowingProcesses = await Borrowing.findAll({
        where: {
          create_at: { [Op.gt]: lastMonth }
        }
      });
  
      if (borrowingProcesses.length === 0) {
        return sendResponse(res, 404, null, 'No borrowing processes found');
      }
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Borrowing Processes');
  
      worksheet.columns = [
        { header: 'ID', key: 'id' },
        { header: 'Book ID', key: 'book_id' },
        { header: 'Borrower ID', key: 'borrower_id' },
        { header: 'Date From', key: 'date_from', width: 20 },
        { header: 'Date To', key: 'date_to', width: 20 },
        { header: 'Active', key: 'active' }
      ];
  
      borrowingProcesses.forEach(process => {
        worksheet.addRow(process.toJSON());
      });
  
      res.setHeader('Content-Disposition', 'attachment; filename=borrowing_processes.xlsx');
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, null, 'Internal Server Error');
    }
  };
  