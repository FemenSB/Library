const id_input = document.getElementById('id_input');
const send_button = document.getElementById('send_button');

send_button.addEventListener('click', (e) => {
  fetch('./api/books/' + id_input.value, {method: 'DELETE'});
});
