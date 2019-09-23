const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  header: String,
  src: String,
  caption: String
});

module.exports = mongoose.model('Image', imageSchema);
