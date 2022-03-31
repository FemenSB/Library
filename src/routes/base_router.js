// Handles requests from root
// Requests to the API will be passed to their respective routers, while othe requests will serve the client web page

const express = require('express');
const cors = require('cors');
const path = require('path');

const booksRouter = require('./books_router');
const baseRouter = express.Router();

baseRouter.use(cors({
    origin: '*'
}));

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
