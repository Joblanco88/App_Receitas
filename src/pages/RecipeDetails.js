import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { idDrinkFetch, idMealFetch } from '../helpers/services/fetchAPI';
import CardDetails from '../components/CardDetails';
import Recomendation from '../components/Recomendation';

export default function RecipeDetails({ match }) {
  const { params: { id } } = match;
  const { path } = match;
  const stateDefault = {
    thumb: '',
    title: '',
    category: '',
    ingredient: [''],
    measure: [''],
    instruction: '',
    video: '',
  };
  const [recipeId, setRecipeId] = useState(stateDefault);
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
        const ingredients = filterKeys(objectApi, PARAM_INGREDIENT);
        const measures = filterKeys(objectApi, PARAM_MEASURE);
        const object = {
          thumb: objectApi.strMealThumb,
          title: objectApi.strMeal,
          category: objectApi.strCategory,
          ingredient: Object.values(ingredients).filter((value) => value !== ''),
          measure: Object.values(measures).filter((value) => value !== ''),
          instruction: objectApi.strInstructions,
          video: objectApi.strYoutube,
        };
        setRecipeId(object);
      } else if (path === '/drinks/:id') {
        const response = await idDrinkFetch(id);
        const objectApi = response.drinks[0];
        const ingredients = filterKeys(objectApi, PARAM_INGREDIENT);
        const measures = filterKeys(objectApi, PARAM_MEASURE);
        const object = {
          thumb: objectApi.strDrinkThumb,
          title: objectApi.strDrink,
          category: objectApi.strAlcoholic,
          ingredient: Object.values(ingredients).filter((value) => value !== ''),
          measure: Object.values(measures).filter((value) => value !== ''),
          instruction: objectApi.strInstructions,
          video: objectApi.strVideo,
        };
        setRecipeId(object);
      }
    };
    idFetchs();
  }, []);
  return (
    <div>
      <CardDetails params={ recipeId } />
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
