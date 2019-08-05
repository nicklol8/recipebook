// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const recipeController = require('./controllers/recipe.js');
const Recipes = require('./models/recipe.js');
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
app.use('/recipes', recipeController);

// Routes
//localhost:3000
app.get('/', (req, res) => {
  Recipes.find({}, (err, allRecipes) => {
    res.render('index.ejs', { recipes: allRecipes });
  });
});

//Listen
app.listen(PORT, () => console.log('Listening on port:', PORT));
