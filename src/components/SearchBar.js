import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ingredientMealsFetch, ingredientDrinksFetch,
  letterMealsFetch, letterDrinksFetch,
  nameMealsFetch, nameDrinksFetch,
} from '../helpers/services/fetchAPI';
import RecipesContext from '../context/RecipesContext';

export default function SearchBar(pageTitle) {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const { setRecipes } = useContext(RecipesContext);
  const history = useHistory();
  const ALERT = 'Your search must have only 1 (one) character';

  const apiMealHandler = async (apiConst) => {
    if (apiConst.meals?.length === 1) {
      history.push(`/meals/${apiConst.meals[0].idMeal}`);
    } else if (apiConst.meals === null) {
      global.alert(
        'Sorry, we haven\'t found any recipes for these filters.',
      );
    } else setRecipes(apiConst);
  };

  const apiDrinkHandler = async (apiConst) => {
    if (apiConst.drinks?.length === 1) {
      history.push(`/drinks/${apiConst.drinks[0].idDrink}`);
    } else if (apiConst.drinks === null) {
      global.alert(
        'Sorry, we haven\'t found any recipes for these filters.',
      );
    } else setRecipes(apiConst);
  };

  const filterMealHandler = async (inputFilter, inputSearch) => {
    if (inputFilter === 'letter') {
      if (search.length > 1) return global.alert(ALERT);
      const letterMeals = await letterMealsFetch(inputSearch);
      apiMealHandler(letterMeals);
    } else if (inputFilter === 'ingredient') {
      const ingredientMeals = await ingredientMealsFetch(inputSearch);
      apiMealHandler(ingredientMeals);
    } else {
      const nameMeals = await nameMealsFetch(inputSearch);
      apiMealHandler(nameMeals);
    }
  };

  const filterDrinkHandler = async (inputFilter, inputSearch) => {
    if (inputFilter === 'letter') {
      if (search.length > 1) return global.alert(ALERT);
      const letterDrinks = await letterDrinksFetch(inputSearch);
      apiDrinkHandler(letterDrinks);
    } else if (inputFilter === 'ingredient') {
      const ingredientDrinks = await ingredientDrinksFetch(inputSearch);
      apiDrinkHandler(ingredientDrinks);
    } else {
      const nameDrinks = await nameDrinksFetch(inputSearch);
      apiDrinkHandler(nameDrinks);
    }
  };

  const searchHandler = async (inputFilter, inputSearch, page) => {
    if (page.pageTitle === 'Meals') {
      filterMealHandler(inputFilter, inputSearch);
    } else if (page.pageTitle === 'Drinks') {
      filterDrinkHandler(inputFilter, inputSearch);
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Pesquise uma receita"
        value={ search }
        onChange={ ({ target }) => setSearch(target.value) }
      />

      <label
        htmlFor="ingredient-search-radio"
      >
        <input
          name="radio"
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient-search-radio"
          value="ingredient"
          onChange={ ({ target }) => setFilter(target.value) }
        />
        Ingredient
      </label>

      <label
        htmlFor="name-search-radio"
      >
        <input
          name="radio"
          type="radio"
          data-testid="name-search-radio"
          id="name-search-radio"
          value="name"
          onChange={ ({ target }) => setFilter(target.value) }
        />
        Name
      </label>

      <label
        htmlFor="first-letter-search-radio"
      >
        <input
          name="radio"
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter-search-radio"
          value="letter"
          onChange={ ({ target }) => setFilter(target.value) }
        />
        First letter
      </label>

      <input
        type="button"
        data-testid="exec-search-btn"
        value="Search"
        onClick={ () => searchHandler(filter, search, pageTitle) }
      />
    </div>
  );
}
