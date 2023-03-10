import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import iconShare from '../images/shareIcon.svg';
import iconFavorite from '../images/whiteHeartIcon.svg';
import { idDrinkFetch, idMealFetch } from '../helpers/services/fetchAPI';
import '../styles/RecipeInProgress.css';
import { getLocalStorage, saveLocalStorage } from '../helpers/saveLocalStorage';

export default function RecipeInProgress() {
  const [recipeInProgress, setRecipeInProgress] = useState({
    ingredients: [], measures: [] });
  // const [checked, setChecked] = useState({});
  // const [className, setClassName] = useState({});
  const history = useHistory();
  const { location: { pathname } } = history;
  // -> /drinks/id/in-progress -> ['', 'drinks', 'id', 'in-progress']
  const idSplit = pathname.split('/')[2];
  const page = pathname.split('/')[1];
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
    const fetchAPI = async () => {
      if (page === 'meals') {
        const response = await idMealFetch(idSplit);
        const objectApi = response.meals[0];
        const { strMealThumb, strMeal, strInstructions, strCategory } = objectApi;
        const ingredients = filterKeys(objectApi, PARAM_INGREDIENT);
        const measures = filterKeys(objectApi, PARAM_MEASURE);
        setRecipeInProgress({
          name: strMeal,
          image: strMealThumb,
          category: strCategory,
          instructions: strInstructions,
          ingredients: Object.values(ingredients)
            .filter((value) => value !== '' && value !== null),
          measures: Object.values(measures)
            .filter((value) => value !== '' && value !== null),
        });
      } else if (page === 'drinks') {
        const response = await idDrinkFetch(idSplit);
        const objectApi = response.drinks[0];
        console.log(objectApi);
        const { strDrinkThumb, strDrink, strInstructions, strAlcoholic } = objectApi;
        const ingredients = filterKeys(objectApi, PARAM_INGREDIENT);
        const measures = filterKeys(objectApi, PARAM_MEASURE);
        setRecipeInProgress({
          name: strDrink,
          image: strDrinkThumb,
          category: strAlcoholic,
          instructions: strInstructions,
          ingredients: Object.values(ingredients)
            .filter((value) => value !== '' && value !== null),
          measures: Object.values(measures)
            .filter((value) => value !== '' && value !== null),
        });
      }
    };
    fetchAPI();
  }, []);

  const onClickbutton = () => {
    console.log('tste');
  };

  const saveIngredients = (object, actualPage, value) => {
    if (object[actualPage][idSplit]) {
      object[actualPage][idSplit].push(value);
    } else {
      object[actualPage][idSplit] = [value];
    }
    saveLocalStorage('inProgressRecipes', {
      ...object,
    });
  };

  const onChangeChecked = (target) => {
    const inProgressRecipes = getLocalStorage('inProgressRecipes');
    if (target.checked) {
      target.parentElement.classList.add('checked');
    } else {
      target.parentElement.classList.remove('checked');
    }
    saveIngredients(inProgressRecipes, page, target.value);
  };

  useEffect(() => {
    const inProgress = getLocalStorage('inProgressRecipes');
    if (!inProgress) {
      saveLocalStorage('inProgressRecipes', { drinks: {}, meals: {} });
    }
  }, []);

  return (
    <div>
      <h1>Recipe in progress</h1>
      <h1
        data-testid="recipe-title"
      >
        { recipeInProgress.name }
      </h1>
      <img
        data-testid="recipe-photo"
        src={ recipeInProgress.image }
        alt="imageRecipe"
      />
      <button
        data-testid="share-btn"
        onClick={ () => console.log('botao compartilhar') }
      >
        <img
          className="icons"
          src={ iconShare }
          alt="shareIcon"
        />
      </button>
      <button
        data-testid="favorite-btn"
        onClick={ () => console.log('botão favoritar') }
      >
        <img
          className="icons"
          src={ iconFavorite }
          alt="iconFavorite"
        />
      </button>
      <p
        data-testid="recipe-category"
      >
        { recipeInProgress.category }
      </p>
      <p
        data-testid="instructions"
      >
        Modo de preparo:
        <br />
        {`${recipeInProgress.instructions}`}
      </p>
      {recipeInProgress.ingredients.map((ingredient, index) => (
        <label
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            value={ ingredient }
            onChange={ ({ target }) => onChangeChecked(target) }
            // checked={ checked[index] }
            // className={ className[index] }
          />
          {`${ingredient} ${recipeInProgress.measures[index]
            ? recipeInProgress.measures[index] : ''}`}
        </label>
      ))}
      <button
        data-testid="finish-recipe-btn"
        onClick={ () => onClickbutton() }
        className="finish-Recipe"
      >
        Finalizar receita
        {' '}

      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
