import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  categoriesDrinksFetch,
  categoriesMealsFetch,
  categoryDrinksFetch,
  categoryMealsFetch,
  allMealsFetch,
  allDrinksFetch,
} from '../helpers/services/fetchAPI';
import RecipesContext from '../context/RecipesContext';

export default function Filters({ title }) {
  const [fetchCategories, setFetchCategories] = useState([]);
  const [toggleCategory, setToggleCategory] = useState(false);
  const { setRecipes } = useContext(RecipesContext);
  const MAX_FILTERS = 5;

  const categoriesMap = async () => {
    // fetch pra pegar o nome das 5 primeiras categorias e renderizar o botão
    if (title === 'Meals') {
      const response = await categoriesMealsFetch();
      const data = response.slice(0, MAX_FILTERS);
      setFetchCategories(data);
    } else if (title === 'Drinks') {
      const response = await categoriesDrinksFetch();
      const data = response.slice(0, MAX_FILTERS);
      setFetchCategories(data);
    }
  };

  useEffect(() => {
    categoriesMap();
  }, []);

  const clearAllFilters = async (pageTitle) => {
    // seta o estado recipe com o resultado do fetch que traz todas as receitas
    if (pageTitle === 'Meals') {
      const responseMeal = await allMealsFetch();
      setRecipes(responseMeal);
      return true;
    }
    if (pageTitle === 'Drinks') {
      const responseDrink = await allDrinksFetch();
      setRecipes(responseDrink);
      return true;
    }
  };

  const filterByCategory = async (param, pageTitle) => {
    setToggleCategory(param);
    // recebe o title como props (meals/drinks)
    if (pageTitle === 'Meals') {
      const responseMeal = await categoryMealsFetch(param);
      setRecipes(responseMeal);
      return true;
    }
    if (pageTitle === 'Drinks') {
      const responseDrink = await categoryDrinksFetch(param);
      setRecipes(responseDrink);
      return true;
    }
  };

  const filterResultAPI = (param, pageTitle) => {
    const typeToggle = typeof toggleCategory;
    if (toggleCategory === false) {
      filterByCategory(param, pageTitle);
    } else if (toggleCategory === param) {
      setToggleCategory(false);
      clearAllFilters(pageTitle);
    } else if (typeToggle === 'string' && toggleCategory !== param) {
      filterByCategory(param, pageTitle);
    }
  };

  return (
    <div>
      <button
        data-testid="All-category-filter"
        onClick={ () => {
          setToggleCategory(false);
          clearAllFilters(title);
        } }
      >
        All
      </button>

      {fetchCategories.map((category) => (
        // devem ser exibidas apenas as 5 primeiras categorias retornadas da API.
        <button
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ () => filterResultAPI(category.strCategory, title) }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

Filters.propTypes = {
  title: PropTypes.string,
}.isRequired;
