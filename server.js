// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Routes
//localhost:3000
app.get('/', (req, res) => {
  res.send('app is running!');
});

//Database
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/recipebook';
// Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, () => {
  console.log('connected to mongo database');
});

//Listen
app.listen(PORT, () => console.log('Listening on port:', PORT));
