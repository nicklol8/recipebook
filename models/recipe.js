const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = Schema({
  name: { type: String, required: true },
  img: String,
  ingredients: [{ type: String }],
  steps: [{ type: String }],
  tags: [{ type: String }]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
