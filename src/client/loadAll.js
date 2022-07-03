const book_list = document.getElementById('book_list');

async function loadBooks() {
  var response = await fetch('./api/books');
  var data = await response.json();

  for(let i = 0; i < data.length; i++) {
    let aux = document.createElement('span');
    aux.innerHTML = 'Book title: ' + data[i].title + '<br>Author name: ' + data[i].author + '<br>Book id: ' + data[i].id + '<br>Release date: ' + data[i].releaseDate + '<br>Rating: ' + data[i].rating + '<br><br>';
    document.body.appendChild(aux);
  }
}

loadBooks();
