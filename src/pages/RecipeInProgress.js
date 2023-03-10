import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import iconShare from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { idDrinkFetch, idMealFetch } from '../helpers/services/fetchAPI';
import { getLocalStorage, saveLocalStorage } from '../helpers/saveLocalStorage';
import '../styles/RecipeInProgress.css';

export default function RecipeInProgress() {
  const [recipeInProgress, setRecipeInProgress] = useState({
    ingredients: [], measures: [] });
  const [msgUrlCopied, setMsgUrlCopied] = useState(false);
  const maxIngredients = {};
  const [checked, setChecked] = useState(maxIngredients);
  const [favorited, setFavorited] = useState(whiteHeartIcon);
  recipeInProgress.ingredients
    .forEach((ingredient, index) => { maxIngredients[index] = ''; });
  const history = useHistory();
  const { location: { pathname } } = history;
  // -> /drinks/id/in-progress -> ['', 'drinks', 'id', 'in-progress']
  const idSplit = pathname.split('/')[2];
  const page = pathname.split('/')[1];
  const PARAM_INGREDIENT = /strIngredient\d+/;
  const PARAM_MEASURE = /strMeasure\d+/;
  const SECONDS_TIMEOUT = 2000;
  const URL = window.location.href;

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

  const onChangeChecked = (target, index) => {
    const inProgressRecipes = getLocalStorage('inProgressRecipes');
    if (target.checked) {
      // target.parentElement.classList.add('checked');
      setChecked({
        ...checked,
        [index]: 'checked',
      });
    } else {
      // target.parentElement.classList.remove('checked');
      setChecked({
        ...checked,
        [index]: '',
      });
    }
    saveIngredients(inProgressRecipes, page, target.value);
  };

  useEffect(() => {
    const inProgress = getLocalStorage('inProgressRecipes');
    if (!inProgress) {
      saveLocalStorage('inProgressRecipes', { drinks: {}, meals: {} });
    }
    const isChecked = {};
    recipeInProgress.ingredients.forEach((ingredient, index) => {
      if (inProgress[page][idSplit]?.includes(ingredient)) {
        console.log(ingredient, index);
        console.log('Caí no IF');
        isChecked[index] = 'checked';
      }
    });
    setChecked({ ...checked, ...isChecked });
  }, [recipeInProgress]);

  const onClickFavorite = () => {
    favoriteRecipes = getLocalStorage('favoriteRecipes');
    const { name, image, instructions } = recipeInProgress;
    const objFavorites = [...favoriteRecipes, {
      id,
      type,
      nationality,
      category: recipeInProgress.category,
      alcoholicOrNot,
      name,
      image }];
    const includes = favoriteRecipes.filter((recipe) => (
      recipe.id.includes(idSplit)));
    if (includes.length === 0) {
      saveLocalStorage('favoriteRecipes', objFavorites);
      setFavorited(blackHeartIcon);
    } else {
      const array = favoriteRecipes.filter((recipe) => (!recipe.id.includes(id)));
      saveLocalStorage('favoriteRecipes', array);
      setFavorited(whiteHeartIcon);
    }
  };

  const onCLickShare = () => {
    const urlInProgress = URL.replace('/in-progress', '');
    copy(urlInProgress);
    setMsgUrlCopied(true);
    setTimeout(() => {
      setMsgUrlCopied(false);
    }, SECONDS_TIMEOUT);
  };

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
        onClick={ () => onCLickShare() }
      >
        <img
          className="icons"
          src={ iconShare }
          alt="shareIcon"
        />
      </button>
      {msgUrlCopied && <p>Link copied!</p>}
      <button
        data-testid="favorite-btn"
        onClick={ () => onClickFavorite() }
      >
        <img
          className="icons"
          src={ whiteHeartIcon }
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
          className={ checked[index] }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            value={ ingredient }
            onChange={ ({ target }) => onChangeChecked(target, index) }
            checked={ checked[index] === 'checked' }
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
