const array1 = [];
const array2 = [];
for (let i = 0; i < recipe.ingredients.length; i++) {
  if (i % 2 === 0) {
    array1.push(recipe.ingredients[i]);
  } else {
    array2.push(recipe.ingredients[i]);
  }
}
