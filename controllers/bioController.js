const express = require('express');
const bio = express.Router();

// INDEX
bio.get('/bio', (req, res) => {
  res.send('index');
});

module.exports = bio;
