import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function CardRecipe() {
  const { recipes } = useContext(RecipesContext);
  const MAX_RECIPES = 12;

  const mealsSlice = recipes.meals && recipes.meals.slice(0, MAX_RECIPES);
  const drinksSlice = recipes.drinks && recipes.drinks.slice(0, MAX_RECIPES);
  return (
    <div>
      {Object.keys(recipes)[0] === 'meals'
        ? mealsSlice?.map((recipe, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            className="card"
            key={ index }
          >
            <span data-testid={ `${index}-card-name` }>{recipe.strMeal}</span>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strMealThumb }
              alt={ index }
            />
          </div>))
        : drinksSlice?.map((recipe, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            className="card"
            key={ index }
          >
            <span data-testid={ `${index}-card-name` }>{recipe.strDrink}</span>
            <img
              src={ recipe.strDrinkThumb }
              alt={ index }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))}
    </div>
  );
}
