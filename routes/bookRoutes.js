const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/books',bookController.createBook)
router.get('/books/:id',bookController.getBookById)
router.get('/books', bookController.getBooks)
router.put('/books/:id', bookController.updateBookById)
router.delete('/books/:id', bookController.deleteBookById)

module.exports = router;
