const express = require('express');

const booksController = require('../controllers/books_controller.js');

const booksRouter = express.Router();

booksRouter.use(express.json());

booksRouter.post('/', booksController.httpPostBook);
booksRouter.put('/:id', booksController.httpPutBook);
booksRouter.delete('/:id', booksController.httpDeleteBook);
booksRouter.get('/', booksController.httpGetAllBooks);
booksRouter.get('/:id', booksController.httpGetBook);

module.exports = booksRouter;
