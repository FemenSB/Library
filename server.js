const express = require('express');
const server = express();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const cors = require('cors');
const fs = require('fs');

const port = 3000;
server.listen(port, () => console.log('Server open!'));

server.use(cors({
    origin: '*'
}));

var books = [
  {id: 0, title: 'Wool', author: 'Hugh Howey'},
  {id: 1, title: 'Order', author: 'Hugh Howey'},
  {id: 2, title: 'Winds of Winter', author: 'George R. R. Martin'}
];

var lastId = 2;

function sendIndex(req, res) {
  res.sendFile(__dirname + '/index.html');
}

server.get('/', sendIndex);
server.get('/index.html', sendIndex);
server.get('/home', sendIndex);
server.get('/index', sendIndex);

server.get('/loadAll.js', (req, res) => {
  res.sendFile(__dirname + '/loadAll.js');
});

server.get('/post.js', (req, res) => {
  res.sendFile(__dirname + '/post.js');
});

server.get('/post.html', (req, res) => {
  res.sendFile(__dirname + '/post.html');
});

server.get('/put.js', (req, res) => {
  res.sendFile(__dirname + '/put.js');
});

server.get('/put.html', (req, res) => {
  res.sendFile(__dirname + '/put.html');
});

server.get('/delete.js', (req, res) => {
  res.sendFile(__dirname + '/delete.js');
});

server.get('/delete.html', (req, res) => {
  res.sendFile(__dirname + '/delete.html');
});

server.get('/api/books', (req, res) => { // No id specified
  res.send(books); // Send all books registered
});

server.get('/api/books/:id', (req, res) => { // Specific id requested
  let requestedId = parseInt(req.params.id);
  for(let i = 0; i < books.length; i++) { // Search through all books
    if(books[i].id == requestedId) { // If the requested id is found
      res.send(books[i]); // Send the respective book
      return; // End function
    }
  }
  res.status(404).send('Id not found!'); // If function execution didn't stop, the book was not found
});

server.post('/api/books', jsonParser, (req, res) => {
  lastId++;
  let newBook = {
    id: lastId,
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  res.send(newBook);
});

server.put('/api/books/:id', jsonParser, (req, res) => {
  let i;
  let requestedId = parseInt(req.params.id);
  for(i = 0; i < books.length; i++) { // Search through all books
    if(books[i].id == requestedId) { // If the requested id is found
      break; // Exit loop
    }
  }
  if(i == books.length) { // If the book was not found
    res.status(404).send('Id not found!');
    return; // Exit function
  }

  books[i].title = req.body.title;
  books[i].author = req.body.author;

  res.send(books[i]);
});

server.delete('/api/books/:id', (req, res) => {
  let requestedId = parseInt(req.params.id);
  for(let i = 0; i < books.length; i++) { // Search through all books
    if(books[i].id == requestedId) { // If the requested id is found
      res.send(books[i]);
      books.splice(i, 1);
      return; // End function
    }
  }
  res.status(404).send('Id not found!'); // If function execution didn't stop, the book was not found
});
