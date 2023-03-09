import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const stateDefault = {
    thumb: '',
    title: '',
    category: '',
    ingredient: [''],
    measure: [''],
    instruction: '',
    video: '',
  };
  const [recipes, setRecipes] = useState([]);
  const [dataDetails, setDataDetails] = useState({});
  const [recipeId, setRecipeId] = useState(stateDefault);

  const context = useMemo(() => ({
    recipeId,
    setRecipeId,
    dataDetails,
    setDataDetails,
    recipes,
    setRecipes,
  }), [recipes, dataDetails, recipeId]);

  return (
    <RecipesContext.Provider value={ context }>
      <div>
        { children }
      </div>
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
