// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();
const PORT = process.env.PORT || 3003;
const secret = process.env.SECRET;

const bioController = require('./controllers/bioController');
const imageController = require('./controllers/imageController');
const usersController = require('./controllers/usersController');
const SessionsController = require('./controllers/sessionsController');

// CORS
const whitelist = [
  'http://localhost:3000',
  'http://localhost:3003',
  'https://migdalias-confections.herokuapp.com'
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
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(express.json());
app.use('/bakery', bioController);
app.use('/bakery', imageController);
app.use('/users', usersController);
app.use('/sessions', sessionsController);

app.get('/', (req, res) => {
  res.redirect('/bakery');
});

// MONGO
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/bakery';

mongoose.connection.on('error', err =>
  console.log(err.message + ' is Mongod not running?')
);
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to mongoose...');
});

// LISTENER
app.listen(PORT, () => {
  console.log('🎉🎊', 'celebrations happening on port', PORT, '🎉🎊');
});
