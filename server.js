// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const recipeController = require('./controllers/recipe.js');
const usersController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js');
const methodOverride = require('method-override');

//Database
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/recipebook';
// Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, () => {
  console.log('connected to mongo database');
});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(
  session({
    secret: 'feedmeseymour', //a random string do not copy this value or your stuff will get hacked
    resave: false,
    saveUninitialized: false
  })
);
app.use(express.static(__dirname + '/public'));
app.use('/recipes', recipeController);
app.use('/users', usersController);
app.use('/session', sessionsController);

// Routes
//localhost:3000
app.get('/', (req, res) => {
  res.render('splash.ejs');
});

// SEED
const seed = require('./models/seed.js');
const Recipe = require('./models/recipe.js');
app.get('/seed', (req, res) => {
  Recipe.create(seed, (err, createdRecipe) => {
    console.log(createdRecipe);
    res.redirect('/');
  });
});

//Listen
app.listen(PORT, () => console.log('Listening on port:', PORT));
