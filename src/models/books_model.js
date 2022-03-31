const books = new Map();
var lastId = 0;

function initializeBooks() {
  let startingBooks = [
    {id: 0, title: 'The Case of Charles Dexter Ward', author: 'H. P. Lovecraft'},
    {id: 1, title: 'Winds of Winter', author: 'George R. R. Martin'},
    {id: 2, title: 'The Dawn of Yangchen', author: 'F. C. Yee'},
    {id: 3, title: 'We', author: 'Yevgeny Zamyatin'}
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
