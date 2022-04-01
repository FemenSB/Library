// Handles requests from root
// Requests to the API will be passed to their respective routers, while othe requests will serve the client web page

const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const booksRouter = require('./books_router');
const baseRouter = express();

baseRouter.use(cors({ // Allow requests from any origin
    origin: '*'
}));

baseRouter.use(morgan('short')); // Log requests to console

baseRouter.use('/api/books', booksRouter);

// Handling requests to the web page:
baseRouter.use(express.static(path.join(__dirname, '..', 'client')));

function sendIndex(req, res) {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
}

//Requests to the main page:
baseRouter.get('/', sendIndex);
baseRouter.get('/index', sendIndex);
baseRouter.get('/home', sendIndex);

module.exports = baseRouter;
