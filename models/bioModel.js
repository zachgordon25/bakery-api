const mongoose = require('mongoose');

const bioSchema = mongoose.Schema({
  header: String,
  body: String
});

module.exports = mongoose.model('Bio', bioSchema);
