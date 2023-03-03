import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);

  const context = useMemo(() => ({
    recipes,
    setRecipes,
  }), [recipes]);

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
