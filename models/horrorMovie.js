const mongoose = require('mongoose');

const horrorSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  image: String,
})

const HorrorMovie = mongoose.model('HorrorMovie', horrorSchema);
module.exports = HorrorMovie