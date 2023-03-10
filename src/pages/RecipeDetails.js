import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { idDrinkFetch, idMealFetch } from '../helpers/services/fetchAPI';
import CardDetails from '../components/CardDetails';
import Recomendation from '../components/Recomendation';
import RecipesContext from '../context/RecipesContext';
import { createObjectDetails } from '../helpers/createObjectDetails';
import { objectRecipeId } from '../helpers/objectReturnedFromAPI';

export default function RecipeDetails({ match }) {
  const { setDataDetails, recipeId, setRecipeId } = useContext(RecipesContext);
  const { params: { id } } = match;
  const { path } = match;

  const PARAM_INGREDIENT = /strIngredient\d+/;
  const PARAM_MEASURE = /strMeasure\d+/;

  const filterKeys = (object, param) => {
    const chavesFiltradas = {};
    Object.keys(object).forEach((key) => {
      if (param.test(key)) {
        chavesFiltradas[key] = object[key];
      }
    });
    return chavesFiltradas;
  };

  useEffect(() => {
    const idFetchs = async () => {
      if (path === '/meals/:id') {
        const response = await idMealFetch(id);
        const objectApi = response.meals[0];
        setDataDetails(createObjectDetails(objectApi, true));
        const ingredients = filterKeys(objectApi, PARAM_INGREDIENT);
        const measures = filterKeys(objectApi, PARAM_MEASURE);
        setRecipeId(objectRecipeId(objectApi, path, ingredients, measures));
      } else if (path === '/drinks/:id') {
        const response = await idDrinkFetch(id);
        const objectApi = response.drinks[0];
        setDataDetails(createObjectDetails(objectApi, false));
        const ingredients = filterKeys(objectApi, PARAM_INGREDIENT);
        const measures = filterKeys(objectApi, PARAM_MEASURE);
        setRecipeId(objectRecipeId(objectApi, path, ingredients, measures));
      }
    };
    idFetchs();
  }, []);

  return (
    <div>
      <CardDetails
        params={ recipeId }
      />
      <Recomendation path={ path } />
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

// "strDrinkThumb", "strDrink", "strCategory", "strIngredient1", "strMeasure1", "strInstrunctions", "strVideo"
