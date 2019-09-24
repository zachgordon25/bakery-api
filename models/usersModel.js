const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstame: String,
  lastname: String,
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
