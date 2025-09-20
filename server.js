const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// Initializing the app
const app = express();

// connecting the database
// let mongodb_url = 'mongodb://localhost:27017/';
// let dbName = 'darkroom';
// // mongoose.connect(`${mongodb_url}${dbName}`,{ useNewUrlParser: true , useUnifiedTopology: true }, (err)=>{
// //     if (err) console.log(err)
// // });
// const env = process.env.NODE_ENV || 'development';
// const dbURI = config.mongoURI[env];

// console.log(`NODE_ENV = ${env}`);
// console.log(`Connecting to: ${dbURI}`);

// mongoose.connect(dbURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log(`Database connected successfully [${env}]`))
// .catch(err => console.error('MongoDB connection error:', err));

// // test if the database has connected successfully
// // let db = mongoose.connection;
// // db.once('open', ()=>{
// //     console.log('Database connected successfully')
// // })

// Build MongoDB URI from .env
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_CLUSTER,
  MONGO_DB_DEV
} = process.env;

const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DB_DEV}?retryWrites=true&w=majority`;


// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Database connected successfully!!'))
  .catch(err => console.error('MongoDB connection error:', err));


// View Engine
app.set('view engine', 'ejs');

// Set up the public folder;
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(express.json())


app.use('/', index);
app.use('/image', image);



 
const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`Server is listening at http://localhost:${PORT}`)
});


module.exports = app;