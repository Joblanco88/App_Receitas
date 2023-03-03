import React, { useState } from 'react';
import {
  ingredientMealsFetch, ingredientDrinksFetch,
  letterMealsFetch, letterDrinksFetch,
  nameMealsFetch, nameDrinksFetch,
} from '../helpers/services/fetchAPI';

export default function SearchBar(pageTitle) {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  const searchHandler = async (inputFilter, inputSearch, page) => {
    if (page.pageTitle === 'Meals') {
      if (inputFilter === 'letter') {
        await letterMealsFetch(inputSearch);
      } else if (inputFilter === 'ingredient') {
        await ingredientMealsFetch(inputSearch);
      } else await nameMealsFetch(inputSearch);
    } else if (page.pageTitle === 'Drinks') {
      if (inputFilter === 'letter') {
        await letterDrinksFetch(inputSearch);
      } else if (inputFilter === 'ingredient') {
        await ingredientDrinksFetch(inputSearch);
      } else await nameDrinksFetch(inputSearch);
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
