const books = new Map();
var lastId = 0;

function initializeBooks() {
  let startingBooks = [
    {id: 0, title: 'The Case of Charles Dexter Ward', author: 'H. P. Lovecraft', releaseDate: new Date(-903560400000)},
    {id: 1, title: 'Winds of Winter', author: 'George R. R. Martin', releaseDate: new Date(16736814000000)},
    {id: 2, title: 'The Dawn of Yangchen', author: 'F. C. Yee', releaseDate: new Date(1658199600000)},
    {id: 3, title: 'We', author: 'Yevgeny Zamyatin', releaseDate: new Date(-1425934800000)}
  ];

  startingBooks.forEach((book) => {
    books.set(book.id, book);
  });

  lastId = startingBooks.length - 1;
}

initializeBooks();

function getAllBooks() {
  return Array.from(books.values());
}

function getBook(bookId) {
  return books.get(bookId);
}

function deleteBook(bookId) {
  return books.delete(bookId);
}

function postBook(bookData) {
  lastId++;
  bookData.id = lastId;
  books.set(lastId, bookData);
  return bookData;
}

module.exports = {
  getAllBooks,
  getBook,
  deleteBook,
  postBook
};
