const express = require('express');
const recipes = express.Router();
const Recipe = require('../models/recipe.js');

// new
recipes.get('/new', (req, res) => {
  res.render('recipes/new.ejs');
});

// show
recipes.get('/:id', (req, res) => {
  Recipe.findById(req.params.id, (err, foundRecipe) => {
    res.render('recipes/show.ejs', { recipe: foundRecipe });
  });
});

// edit
recipes.get('/:id/edit', (req, res) => {
  Recipe.findById(req.params.id, (err, foundRecipe) => {
    if (err) {
      console.log(err);
    } else {
      res.render('recipes/edit.ejs', {
        recipe: foundRecipe
      });
    }
  });
});

// create
recipes.post('/', (req, res) => {
  req.body.ingredients = req.body.ingredients.split(',');
  req.body.steps = req.body.steps.split('>>');
  req.body.tags = req.body.tags.split(',');
  Recipe.create(req.body, (err, newRecipe) => {
    if (err) {
      console.log(err);
    }
    console.log(newRecipe);
    res.redirect('/');
  });
});

// update
recipes.put('/:id', (req, res) => {
  Recipe.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        img: req.body.img,
        ingredients: req.body.ingredients.split(','),
        steps: req.body.steps.split('>>'),
        tags: req.body.tags.split(',')
      }
    },
    { new: true },
    (err, updatedRecipe) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    }
  );
});

// delete
recipes.delete('/:id', (req, res) => {
  Recipe.findByIdAndRemove(req.params.id, (err, deletedRecipe) => {
    if (err) {
      console.log(err);
    } else res.redirect('/');
  });
});

module.exports = recipes;
