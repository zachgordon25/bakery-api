const express = require('express');
const bio = express.Router();
const Bio = require('../models/bioModel');
const bioSeed = require('../models/bioSeed');

// INDEX
bio.get('/about', (req, res) => {
  Bio.find({}, (err, foundBio) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).send({ foundBio: foundBio });
  });
});

// SEED
bio.get('/about/seed/newbio/viaseedfile', (req, res) => {
  Bio.insertMany(bioSeed, (err, bio) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/bakery/about');
    }
  });
});

// CREATE
bio.post('/about', (req, res) => {
  Bio.create(req.body, (err, createdBio) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).send(createdBio);
  });
});

// DELETE
bio.delete('/about/:id', (req, res) => {
  Bio.findByIdAndRemove(req.params.id, (err, deletedBio) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedBio);
  });
});

// UPDATE
bio.put('/about/:id', (req, res) => {
  Bio.findByIdAndUpdate(req.params.id, req.body, (err, updatedBio) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).send({ updatedBio: updatedBio });
  });
});

module.exports = bio;
