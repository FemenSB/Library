const id_input = document.getElementById('id_input');
const title_input = document.getElementById('title_input');
const author_input = document.getElementById('author_input');
const date_input = document.getElementById('date_input');
const send_button = document.getElementById('send_button');

function putBook() {
  let newBook = {
    title: title_input.value,
    author: author_input.value,
    releaseDate: date_input.value
  };
  fetch('./api/books/' + id_input.value, {
    method: 'PUT',
    body: JSON.stringify(newBook),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

send_button.addEventListener('click', (e) => {
  putBook();
});
