const booksModel = require('../models/books_model');

function hasFields(obj, fields) { // Checks if the given object has the specified fields as properties
  for(let i = 0; i < fields.length; i++) {
    if(!obj[fields[i]]) {return false;}
  }
  return true;
}

function httpPostBook(req, res) {

  if(!hasFields(req.body, ['title', 'author', 'releaseDate'])) { // Check for missing fields in the request
    res.status(400).send({error: 'Data missing!'});
    return;
  }

  releaseDate = new Date(req.body.releaseDate);
  if(isNaN(releaseDate.valueOf())) { // Check if a valid date was received
    res.status(400).send({error: 'Invalid release date!'});
    return;
  }

  let newBook = {
    title: req.body.title,
    author: req.body.author,
    releaseDate: releaseDate
  };
  res.status(201).send(booksModel.postBook(newBook));
}

function httpPutBook(req, res) {
  let requestedId = parseInt(req.params.id);
  let book = booksModel.getBook(requestedId); // Ask the model for the specified id

  if(book !== undefined) { // If the book was found, edit it

    editableProps = ['author', 'title']; // Properties the client is allowed to edit directly

    for(prop in req.body) { // For every property in the request
      if(editableProps.includes(prop)) { // Check if it's one of the properties allowed for editing
        if(req.body[prop] != '') { // Check if the input is not blank
          book[prop] = req.body[prop]; // If the request has valid input, edit the property
        }
      }
    }

    if(req.body.releaseDate) { // Check if a new release date was set
      releaseDate = new Date(req.body.releaseDate);
      if(isNaN(releaseDate.valueOf())) { // Check if it is a valid date
        res.status(400).send({error: 'Invalid release date!'});
        return;
      }
      book.releaseDate = releaseDate; // If a date was received and it is valid, update the stored date
    }

    res.send(book); // Send as a status 200 response the edited book
    return;
  }

  res.status(404).send({error: 'Id not found!'}); // If execution didn't stop, the book wasn't found

}

function httpDeleteBook(req, res) {
  let requestedId = parseInt(req.params.id); // Parse the requested id
  if(booksModel.deleteBook(requestedId) == true) {
    res.status(200).send('Book deleted!');
    return;
  }
  res.status(404).send({error: 'Id not found!'}); // If function execution didn't stop, the book was not found
}

function httpGetAllBooks(req, res) { // No id specified
  res.send(booksModel.getAllBooks()); // Send all books registered
}

function httpGetBook(req, res) { // Specific id requested
  let requestedId = parseInt(req.params.id); // Parse the requested id
  let bookFound = booksModel.getBook(requestedId); // Ask the model for this id
  if(bookFound !== undefined) { // The model will return undefined if the book wasn't found
    res.send(bookFound);
    return;
  }
  res.status(404).send({error: 'Id not found!'}); // If function execution didn't stop, the book was not found
}

module.exports = {
  httpPostBook,
  httpPutBook,
  httpDeleteBook,
  httpGetAllBooks,
  httpGetBook
};
