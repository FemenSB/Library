const title_input = document.getElementById('title_input');
const author_input = document.getElementById('author_input');
const date_input = document.getElementById('date_input');
const rating_input = document.getElementById('rating_input');
const send_button = document.getElementById('send_button');

function postBook() {
  let newBook = {
    title: title_input.value,
    author: author_input.value,
    releaseDate: date_input.value,
    rating: rating_input.value
  };
  fetch('./api/books', {
    method: 'POST',
    body: JSON.stringify(newBook),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

send_button.addEventListener('click', (e) => {
  postBook();
});
