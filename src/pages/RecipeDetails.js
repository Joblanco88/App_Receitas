import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { idDrinkFetch, idMealFetch } from '../helpers/services/fetchAPI';
import CardDetails from '../components/CardDetails';
import Recomendation from '../components/Recomendation';
import RecipesContext from '../context/RecipesContext';

export default function RecipeDetails({ match }) {
  const { setDataDetails } = useContext(RecipesContext);
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

  const createObjectDetails = (object, param) => {
    if (param) {
      const { strMeal, strArea, idMeal, strCategory, strMealThumb } = object;
      const filteredObject = {
        name: strMeal,
        nationality: strArea,
        id: idMeal,
        category: strCategory,
        image: strMealThumb,
        type: 'meal',
        alcoholicOrNot: '',
      };
      const result = { ...filteredObject };
      return result;
    }
    const { strDrink, idDrink,
      strCategory, strDrinkThumb, strAlcoholic } = object;
    const filteredObject = {
      name: strDrink,
      nationality: '',
      id: idDrink,
      category: strCategory,
      image: strDrinkThumb,
      type: 'drink',
      alcoholicOrNot: strAlcoholic,
    };
    const result = { ...filteredObject };
    return result;
  };

  useEffect(() => {
    const idFetchs = async () => {
      if (path === '/meals/:id') {
        const response = await idMealFetch(id);
        const objectApi = response.meals[0];
        console.log(objectApi);
        setDataDetails(createObjectDetails(objectApi, true));
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
        console.log(objectApi);
        setDataDetails(createObjectDetails(objectApi, false));
        const ingredients = filterKeys(objectApi, PARAM_INGREDIENT);
        const measures = filterKeys(objectApi, PARAM_MEASURE);
        const object = {
          thumb: objectApi.strDrinkThumb,
          title: objectApi.strDrink,
          category: objectApi.strAlcoholic,
          ingredient: Object.values(ingredients)
            .filter((value) => value !== '' && value !== null),
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
