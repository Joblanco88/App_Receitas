import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { categoryDrinksFetch, categoryMealsFetch } from '../helpers/services/fetchAPI';

export default function Filters({ title }) {
  const [fetchCategories, setFetchCategories] = useState([]);
  const MAX_FILTERS = 5;

  useEffect(() => {
    const fetch = async () => {
      console.log(title);
      if (title === 'Meals') {
        const response = await categoryMealsFetch();
        const data = response.slice(0, MAX_FILTERS);
        setFetchCategories(data);
      } else if (title === 'Drinks') {
        const response = await categoryDrinksFetch();
        const data = response.slice(0, MAX_FILTERS);
        setFetchCategories(data);
      }
    };
    fetch();
  }, [title]);

  return (
    <div>
      {fetchCategories.map((category) => (
        // devem ser exibidas apenas as 5 primeiras categorias retornadas da API.
        <button
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ () => console.log('TESTE') }
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
