import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/CardDetails.css';
import copy from 'clipboard-copy';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import iconShare from '../images/shareIcon.svg';
import { saveLocalStorage } from '../helpers/saveLocalStorage';
import RecipesContext from '../context/RecipesContext';

export default function CardDetails(recipeId) {
  const { params: { title, thumb, category,
    ingredient, measure, instruction, video } } = recipeId;
  const { dataDetails } = useContext(RecipesContext);
  const [startedRecipe, setStartedRecipe] = useState(false);
  const [msgUrlCopied, setMsgUrlCopied] = useState(false);
  const [favorited, setFavorited] = useState(whiteHeartIcon);
  const history = useHistory();
  const { location: { pathname } } = history;
  const SECONDS_TIMEOUT = 2000;
  const idSplit = pathname.split('/').pop();
  const DRINK_REGEX = /drinks/;
  const MEAL_REGEX = /meals/;
  const URL = window.location.href;
  let favoriteRecipes = [];

  const setRecipeStorage = () => {
    const object = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (DRINK_REGEX.test(pathname) && object) {
      object.drinks[idSplit] = [...ingredient];
      // saveLocalStorage('inProgressRecipes', object);
      history.push(`/drinks/${idSplit}/in-progress`);
    } else if (MEAL_REGEX.test(pathname) && object) {
      object.meals[idSplit] = [...ingredient];
      // saveLocalStorage('inProgressRecipes', object);
      history.push(`/meals/${idSplit}/in-progress`);
    }
  };

  useEffect(() => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress && inProgress.drinks) {
      const keyDrinks = Object.keys(inProgress.drinks);
      if (keyDrinks.includes(idSplit)) {
        setStartedRecipe(true);
      } else {
        setStartedRecipe(false);
      }
    }
    if (inProgress && inProgress.meals) {
      const keyMeals = Object.keys(inProgress.meals);
      if (keyMeals.includes(idSplit)) {
        setStartedRecipe(true);
      } else {
        setStartedRecipe(false);
      }
    }
  }, [recipeId]);

  useEffect(() => {
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgress) {
      saveLocalStorage('inProgressRecipes', { drinks: {}, meals: {} });
      // saveLocalStorage('favoriteRecipes', []);
    }
    if (!favoriteStorage) {
      saveLocalStorage('favoriteRecipes', []);
    }
    favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favoriteRecipes, 'Favoritos');
    const includes = favoriteRecipes && favoriteRecipes.filter((recipe) => (
      recipe.id.includes(idSplit)));
    setFavorited(includes && includes.length === 1 ? blackHeartIcon : whiteHeartIcon);
  }, []);

  const onClickFavorite = () => {
    favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
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
    copy(URL);
    setMsgUrlCopied(true);
    setTimeout(() => {
      setMsgUrlCopied(false);
    }, SECONDS_TIMEOUT);
  };

  return (
    <div>
      <h1
        data-testid="recipe-title"
      >
        {title}
      </h1>
      <img
        data-testid="recipe-photo"
        src={ thumb }
        alt={ thumb }
        width="300px"
      />
      <div
        className="containerIcons"
      >
        <button
          onClick={ () => onClickFavorite() }
        >
          <img
            className="icons"
            src={ favorited }
            alt="iconFavorite"
            data-testid="favorite-btn"
          />

        </button>
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
      </div>
      {msgUrlCopied && <p>Link copied!</p>}
      <p
        data-testid="recipe-category"
      >
        {category}
      </p>
      <ul>
        {ingredient.map((el, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${el}-${measure[index]}`}
          </li>))}
      </ul>
      <p
        data-testid="instructions"
      >
        Modo de preparo:
        <br />
        {`${instruction}`}
      </p>
      <div>
        <iframe
          title="video"
          data-testid="video"
          width="420"
          height="345"
          src={ video }
        />
      </div>
      <button
        className="buttonStartRecipe"
        type="button"
        onClick={ () => {
          setRecipeStorage();
        } }
        data-testid="start-recipe-btn"
      >
        { startedRecipe ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </div>
  );
}
