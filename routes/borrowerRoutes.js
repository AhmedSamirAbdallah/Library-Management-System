const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowerController');
const borrower = require('../models/borrower');

router.post('/borrowers', borrowerController.createBorrower)
router.get('/borrowers', borrowerController.getBorrowers)
router.get('/borrowers/:id', borrowerController.getBorrowerById)
router.put('/borrowers/:id', borrowerController.updateBorrowerById)
router.delete('/borrowers/:id', borrowerController.deleteBorrowerById)

module.exports = router;
