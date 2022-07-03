const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true},
    rating: {
      type: Number,
      required: true,
    }
});

module.exports = mongoose.model('Book', bookSchema);
