// Handles requests from root
// Requests to the API will be passed to their respective routers, while othe requests will serve the client web page

const express = require('express');

const booksRouter = require('./books_router');
const clientController = require('../controllers/client_controller');

const baseRouter = express.Router();

baseRouter.use('/api/books', booksRouter);

// Handling requests to the web page:

// Requests to the main page:
baseRouter.get('/', clientController.sendIndex);
baseRouter.get('/index', clientController.sendIndex);
baseRouter.get('/index.html', clientController.sendIndex);
baseRouter.get('/home', clientController.sendIndex);
baseRouter.get('/home.html', clientController.sendIndex);

// Requests to other files:
baseRouter.get('/loadAll.js', clientController.sendLoadAll);
baseRouter.get('/post.js', clientController.sendPostJS);
baseRouter.get('/post.html', clientController.sendPostHTML);
baseRouter.get('/put.js', clientController.sendPutJS);
baseRouter.get('/put.html', clientController.sendPutHTML);
baseRouter.get('/delete.js', clientController.sendDeleteJS);
baseRouter.get('/delete.html', clientController.sendDeleteHTML);


module.exports = baseRouter;
