// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3003;

const bioController = require('./controllers/bioController');
const imageController = require('./controllers/imageController');

// CORS
const whitelist = [
  'http://localhost:3000',
  'https://fathomless-sierra-68956.herokuapp.com'
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors());

// MIDDLEWARE
app.use(express.json());
app.use('/bakery', bioController);
app.use('/bakery', imageController);

// MONGO
mongoose.connection.on('error', err =>
  console.log(err.message + ' is Mongod not running?')
);
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));

mongoose.connect('mongodb://localhost:27017/bakery', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to mongoose...');
});

// LISTENER
app.listen(PORT, () => {
  console.log('🎉🎊', 'celebrations happening on port', PORT, '🎉🎊');
});
