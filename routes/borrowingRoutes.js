const express = require('express');
const router = express.Router();
const borrowingController = require('../controllers/borrowingController');
const borrowing = require('../models/borrowing');


router.post('/borrowings', borrowingController.createBorrowing);

router.get('/borrowings/borrower/:id', borrowingController.getBorrowedBooksByBorrower);

router.put('/borrowings/:id/return', borrowingController.returnBook);

router.get('/borrowings/overdue', borrowingController.getOverdueBooks);

module.exports = router;
