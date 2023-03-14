import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getLocalStorage } from '../helpers/saveLocalStorage';
import CardDoneRecipes from '../components/CardDoneRecipes';

export default function DoneRecipes() {
  const [recipes, setRecipes] = useState([{}]);

  useEffect(() => {
    const doneRecipes = getLocalStorage('doneRecipes');
    setRecipes(doneRecipes);
  }, []);

  const filterRecipe = (type) => {
    const doneRecipes = getLocalStorage('doneRecipes');
    if (type === 'meal') {
      const filtered = doneRecipes.filter((recipe) => recipe.type === 'meal');
      setRecipes(filtered);
    } else if (type === 'drink') {
      const filtered = doneRecipes.filter((recipe) => recipe.type === 'drink');
      setRecipes(filtered);
    }
  };

  return (
    <div>
      <Header
        title="Done Recipes"
      />
      <div className="donerecipesbuttons">
        <button
          type="button"
          className="buttonFilters"
          data-testid="filter-by-all-btn"
          onClick={ () => {
            const doneRecipes = getLocalStorage('doneRecipes');
            setRecipes(doneRecipes);
          } }
        >
          All
        </button>
        <button
          type="button"
          className="buttonFilters"
          data-testid="filter-by-meal-btn"
          onClick={ () => filterRecipe('meal') }
        >
          Meals
        </button>
        <button
          type="button"
          className="buttonFilters"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipe('drink') }
        >
          Drinks
        </button>
      </div>
      <CardDoneRecipes done={ recipes } />
    </div>
  );
}
