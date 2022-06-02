const books = require('./books_mongo');

async function getLatestId() {
  const latestBook = await books.findOne().sort('-id');

  if(!latestBook) {
    return 0;
  }

  return latestBook.id;
}

async function getAllBooks() {
  return await books.find({}, {'_id': 0, '__v': 0});
}

async function getBook(bookId) {
  return await books.findOne({id: bookId}, {'_id': 0, '__v': 0});
}

async function deleteBook(bookId) {
  return await books.deleteOne({id: bookId});
}

async function postBook(bookData) {
  bookData.id = await getLatestId() + 1;
  books.create(bookData);
  return bookData;
}

async function updateBook(bookData) {
  await books.updateOne({id: bookData.id}, bookData);
  return bookData;
}

module.exports = {
  getAllBooks,
  getBook,
  deleteBook,
  postBook,
  updateBook
};
