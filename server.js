const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ quiet: true, inject: {} });

const index = require('./routes/index');
const image = require('./routes/image');

const app = express();

// Build MongoDB URI from .env
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_CLUSTER,
  MONGO_DB_DEV
} = process.env;

const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DB_DEV}?retryWrites=true&w=majority`;

// Connect to MongoDB (Mongoose 6+ defaults are used; no warnings)
mongoose.connect(MONGO_URI)
  .then(() => console.log('Database connected successfully!!'))
  .catch(err => console.error('MongoDB connection error:', err));

// View Engine
app.set('view engine', 'ejs');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());

// Routes
app.use('/', index);
app.use('/image', image);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});

module.exports = app;
