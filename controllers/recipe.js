const express = require('express');
const recipes = express.Router();
const Recipe = require('../models/recipe.js');

// new
recipes.get('/new', (req, res) => {
  res.render('recipes/new.ejs');
});
// create
recipes.post('/', (req, res) => {
  Recipe.create(req.body, (err, newRecipe) => {
    if (err) {
      console.log(err);
    }
    console.log(newRecipe);
    res.redirect('/');
  });
});

module.exports = recipes;
