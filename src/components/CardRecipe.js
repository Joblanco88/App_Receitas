import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function CardRecipe() {
  const { recipes } = useContext(RecipesContext);
  console.log(recipes);
  return (
    <div>
      {
        recipes.map((recipe, index) => (
          <div key={ index }>
            {recipe.strMeal}
            <img
              src={ recipe.strMealThumb }
              alt={ index }
              data-testid={ `${index}-recipe-card` }
            />

          </div>
        ))
      }
    </div>
  );
}
