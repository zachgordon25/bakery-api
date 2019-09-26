const express = require('express');
const bcrypt = require('bcrypt');
const users = express.Router();
const User = require('../models/usersModel');
const userSeed = require('../models/userSeed');

users.get('/all', (req, res) => {
  User.find({}, (err, foundUsers) => {
    if (err) {
      res.status(200).json({ error: err.message });
    }
    res.status(200).json({
      foundUsers: foundUsers,
      currentUser: req.session.currentUser
    });
  });
});

// SEED
bio.get('/user/seed/newuser/viaseedfile', (req, res) => {
  User.insertMany(userSeed, (err, user) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/users/all');
    }
  });
});

users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    if (err) {
      res.status(200).json({ error: err.message });
    }
    res.status(200).json(createdUser);
  });
});

module.exports = users;
