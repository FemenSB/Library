const booksModel = require('../models/books_model');

function postBook(req, res) {
  booksModel.lastId++;
  let newBook = {
    id: booksModel.lastId,
    title: req.body.title,
    author: req.body.author
  };
  booksModel.books.push(newBook);
  res.send(newBook);
}

function putBook(req, res) {
  let i;
  let requestedId = parseInt(req.params.id);
  for(i = 0; i < booksModel.books.length; i++) { // Search through all books
    if(booksModel.books[i].id == requestedId) { // If the requested id is found
      break; // Exit loop
    }
  }
  if(i == booksModel.books.length) { // If the book was not found
    res.status(404).send('Id not found!');
    return; // Exit function
  }

  booksModel.books[i].title = req.body.title;
  booksModel.books[i].author = req.body.author;

  res.send(booksModel.books[i]);
}

function deleteBook(req, res) {
  let requestedId = parseInt(req.params.id);
  for(let i = 0; i < booksModel.books.length; i++) { // Search through all books
    if(booksModel.books[i].id == requestedId) { // If the requested id is found
      res.send(booksModel.books[i]);
      booksModel.books.splice(i, 1);
      return; // End function
    }
  }
  res.status(404).send('Id not found!'); // If function execution didn't stop, the book was not found
}

function getAllBooks(req, res) { // No id specified
  res.send(booksModel.books); // Send all books registered
}

function getBookById(req, res) { // Specific id requested
  let requestedId = parseInt(req.params.id);
  for(let i = 0; i < booksModel.books.length; i++) { // Search through all books
    if(booksModel.books[i].id == requestedId) { // If the requested id is found
      res.send(booksModel.books[i]); // Send the respective book
      return; // End function
    }
  }
  res.status(404).send('Id not found!'); // If function execution didn't stop, the book was not found
}

module.exports = {
  postBook,
  putBook,
  deleteBook,
  getAllBooks,
  getBookById
};
