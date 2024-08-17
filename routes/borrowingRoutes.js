const express = require('express');
const router = express.Router();
const borrowingController = require('../controllers/borrowingController');
const borrowing = require('../models/borrowing');

router.post('/borrowings', borrowingController.createBorrowing)
// router.get('/borrowings', borrowerController.getBorrowers)
// router.get('/borrowings/:id', borrowerController.getBorrowerById)
// router.put('/borrowings/:id', borrowerController.updateBorrowerById)
// router.delete('/borrowings/:id', borrowerController.deleteBorrowerById)

module.exports = router;
