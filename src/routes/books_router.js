const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const booksController = require('../controllers/books_controller.js');

const booksRouter = express.Router();

booksRouter.post('/', jsonParser, booksController.httpPostBook);
booksRouter.put('/:id', jsonParser, booksController.httpPutBook);
booksRouter.delete('/:id', booksController.httpDeleteBook);
booksRouter.get('/', booksController.httpGetAllBooks);
booksRouter.get('/:id', booksController.httpGetBook);

module.exports = booksRouter;
