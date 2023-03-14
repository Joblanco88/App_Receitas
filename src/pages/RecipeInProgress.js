import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import iconShare from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { idDrinkFetch, idMealFetch } from '../helpers/services/fetchAPI';
import { getLocalStorage, saveLocalStorage } from '../helpers/saveLocalStorage';
import '../styles/RecipeInProgress.css';
import RecipesContext from '../context/RecipesContext';
import { createObjectDetails } from '../helpers/createObjectDetails';
import { objectDoneRecipe, objectInProgress } from '../helpers/objectReturnedFromAPI';

export default function RecipeInProgress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const maxIngredients = {};
  // -> /drinks/id/in-progress -> ['', 'drinks', 'id', 'in-progress']
  const idSplit = pathname.split('/')[2];
  const page = pathname.split('/')[1];
  const PARAM_INGREDIENT = /strIngredient\d+/;
  const PARAM_MEASURE = /strMeasure\d+/;
  const SECONDS_TIMEOUT = 2000;
  const URL = window.location.href;

  const [recipeInProgress, setRecipeInProgress] = useState({
    ingredients: [], measures: [] });
  const [msgUrlCopied, setMsgUrlCopied] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [favorited, setFavorited] = useState(whiteHeartIcon);
  const [doneRecipe, setDoneRecipe] = useState([]);
  const { dataDetails, setDataDetails } = useContext(RecipesContext);

  recipeInProgress.ingredients
    .forEach((ingredient, index) => { maxIngredients[index] = ''; });
  const [checked, setChecked] = useState(maxIngredients);

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
        setDataDetails(createObjectDetails(objectApi, true));
        setDoneRecipe(objectApi);
        const ingredients = filterKeys(objectApi, PARAM_INGREDIENT);
        const measures = filterKeys(objectApi, PARAM_MEASURE);
        setRecipeInProgress(objectInProgress(objectApi, page, ingredients, measures));
      } else if (page === 'drinks') {
        const response = await idDrinkFetch(idSplit);
        const objectApi = response.drinks[0];
        setDataDetails(createObjectDetails(objectApi, false));
        setDoneRecipe(objectApi);
        const ingredients = filterKeys(objectApi, PARAM_INGREDIENT);
        const measures = filterKeys(objectApi, PARAM_MEASURE);
        setRecipeInProgress(objectInProgress(objectApi, page, ingredients, measures));
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
    let object = {};
    if (target.checked) {
      if (Object.keys(checked).length === 0) {
        object = { ...maxIngredients, [index]: 'checked' };
      } else {
        object = { ...checked, [index]: 'checked' };
      }
      setChecked(object);
    } else {
      if (Object.keys(checked).length === 0) {
        object = { ...maxIngredients, [index]: '' };
      } else {
        object = { ...checked, [index]: '' };
      }
      setChecked(object);
    }
    setDisabled(!Object.values(object).every((check) => check === 'checked'));
    saveIngredients(inProgressRecipes, page, target.value);
  };

  useEffect(() => {
    const favoriteStorage = getLocalStorage('favoriteRecipes');
    const inProgress = getLocalStorage('inProgressRecipes');
    const doneStorage = getLocalStorage('doneRecipes');
    const isChecked = {};

    if (!inProgress) saveLocalStorage('inProgressRecipes', { drinks: {}, meals: {} });
    if (!favoriteStorage) saveLocalStorage('favoriteRecipes', []);
    if (!doneStorage) saveLocalStorage('doneRecipes', []);

    const includes = favoriteStorage && favoriteStorage.filter((recipe) => (
      recipe.id.includes(idSplit)));
    setFavorited(includes && includes.length === 1 ? blackHeartIcon : whiteHeartIcon);

    recipeInProgress.ingredients.forEach((ingredient, index) => {
      if (inProgress[page][idSplit]?.includes(ingredient)) {
        isChecked[index] = 'checked';
      }
    });
    setChecked({ ...checked, ...isChecked });
  }, [recipeInProgress]);

  const onClickFavorite = () => {
    const favoriteRecipes = getLocalStorage('favoriteRecipes');
    const { id, type, nationality, alcoholicOrNot, name, image } = dataDetails;
    const objFavorites = [...favoriteRecipes, {
      id,
      type,
      nationality,
      category: dataDetails.category,
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

  const onClickbutton = () => {
    const doneStorage = getLocalStorage('doneRecipes');
    console.log(doneStorage);
    saveLocalStorage('doneRecipes', [...doneStorage, objectDoneRecipe(doneRecipe, page)]);
    history.push('/done-recipes');
  };

  return (
    <div className="inprogress">
      <h1>Recipe in progress</h1>
      <h1 data-testid="recipe-title">
        { recipeInProgress.name }
      </h1>
      <img
        data-testid="recipe-photo"
        src={ recipeInProgress.image }
        className="inprogressimg"
        alt="imageRecipe"
      />
      <div className="containerIcons">
        <button onClick={ () => onClickFavorite() }>
          <img
            className="inProgressIcons"
            data-testid="favorite-btn"
            src={ favorited }
            alt="iconFavorite"
          />
        </button>
        <button
          data-testid="share-btn"
          onClick={ () => onCLickShare() }
        >
          <img
            className="inProgressIcons"
            src={ iconShare }
            alt="shareIcon"
          />
        </button>
        {msgUrlCopied && <p>Link copied!</p>}
      </div>
      <p data-testid="recipe-category">
        { recipeInProgress.category }
      </p>
      <p
        className="inprogressinstructions"
        data-testid="instructions"
      >
        <strong>Modo de preparo:</strong>
        <br />
        {`${recipeInProgress.instructions}`}
      </p>
      <div className="ingredients-input">
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
      </div>
      <button
        data-testid="finish-recipe-btn"
        onClick={ () => onClickbutton() }
        className="finish-Recipe buttonFilters"
        disabled={ disabled }
      >
        Finalizar receita
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
