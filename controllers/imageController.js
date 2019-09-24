const express = require('express');
const images = express.Router();
const Image = require('../models/imageModel');

// INDEX
images.get('/', (req, res) => {
  Image.find({}, (err, foundImage) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).send({ foundImage: foundImage });
  });
});

// SEED
// bio.get('/seed/newimg/viaseedfile', (req, res) => {
//   Images.insertMany(imgSeed, (err, img) => {
//    if (err) {
//      console.error(err);
//    } else {
//      res.send(img);
//     }
//   });
// });

// CREATE
images.post('/', (req, res) => {
  Image.create(req.body, (err, createdImage) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).send(createdImage);
  });
});

// DELETE
images.delete('/:id', (req, res) => {
  Image.findByIdAndRemove(req.params.id, (err, deletedImage) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedImage);
  });
});

// UPDATE
images.put('/:id', (req, res) => {
  Image.findByIdAndUpdate(req.params.id, req.body, (err, updatedImage) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).send({ updatedImage: updatedImage });
  });
});

module.exports = images;
