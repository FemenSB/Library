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

async function httpPutBook(req, res) {
  let requestedId = parseInt(req.params.id);
  let book = await booksModel.getBook(requestedId); // Get from the model an object with the current data for this id

  if(book == null) { // If the specified id is not found, respond with 404 error
    res.status(404).send({error: 'Id not found!'});
    return;
  }

  // Update the object with the new data received in the request:

  let editableProps = ['author', 'title']; // Properties the client is allowed to edit directly, with no specific validation

  for(prop in req.body) { // For every property in the request
    if(editableProps.includes(prop)) { // Check if it's one of the properties allowed for editing
      if(req.body[prop] != '') { // Check if the input is not blank
        book[prop] = req.body[prop]; // If the request has valid input, edit the property
      }
    }
  }

  // Properties that require more validation:

  if(req.body.releaseDate) { // Check if a new release date was set
    releaseDate = new Date(req.body.releaseDate);
    if(isNaN(releaseDate.valueOf())) { // Check if it is a valid date
      res.status(400).send({error: 'Invalid release date!'});
      return;
    }
    book.releaseDate = releaseDate; // If a date was received and it is valid, update the stored date
  }

  // Send the updated object to be stored by the model
  booksModel.updateBook(book);

  res.send(book); // Send as a status 200 response the edited book
}

async function httpDeleteBook(req, res) {
  let requestedId = parseInt(req.params.id); // Parse the requested id
  if(await booksModel.deleteBook(requestedId)) {
    res.status(200).send({message: 'Book deleted!'});
    return;
  }
  res.status(404).send({error: 'Id not found!'}); // If function execution didn't stop, the book was not found
}

async function httpGetAllBooks(req, res) { // No id specified
  res.status(200).send(await booksModel.getAllBooks()); // Send all books registered
}

async function httpGetBook(req, res) { // Specific id requested
  let requestedId = parseInt(req.params.id); // Parse the requested id
  let bookFound = await booksModel.getBook(requestedId); // Ask the model for this id
  if(bookFound !== null) { // The model will return null if the book wasn't found
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
