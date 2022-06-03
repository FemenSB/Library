const books = require('./books_mongo');

async function getLatestBook() {
  return await books.findOne({}, {'_id': 0, '__v': 0}).sort('-id');
}

async function getLatestId() {
  const latestBook = await getLatestBook();

  if(!latestBook) {
    return 0;
  }

  return latestBook.id;
}

async function getAllBooks(skip, limit) {
  return await books.find({}, {'_id': 0, '__v': 0})
    .skip(skip)
    .limit(limit);
}

async function getBook(bookId) {
  return await books.findOne({id: bookId}, {'_id': 0, '__v': 0});
}

async function deleteBook(bookId) {
  const metaData = await books.deleteOne({id: bookId});
  return metaData.deletedCount;
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
  updateBook,
  getLatestBook
};
