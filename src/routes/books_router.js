const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const booksController = require('../controllers/books_controller.js');

const booksRouter = express.Router();

booksRouter.post('/', jsonParser, booksController.postBook);
booksRouter.put('/:id', jsonParser, booksController.putBook);
booksRouter.delete('/:id', booksController.deleteBook);
booksRouter.get('/', booksController.getAllBooks);
booksRouter.get('/:id', booksController.getBookById);

module.exports = booksRouter;
