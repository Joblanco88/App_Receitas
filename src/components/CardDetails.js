import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/CardDetails.css';
import copy from 'clipboard-copy';
import { saveLocalStorage } from '../helpers/saveLocalStorage';
import iconFavorite from '../images/blackHeartIcon.svg';
import iconShare from '../images/shareIcon.svg';

export default function CardDetails(recipeId) {
  const { params: { title, thumb, category,
    ingredient, measure, instruction, video } } = recipeId;
  const [startedRecipe, setStartedRecipe] = useState(false);
  const [msgUrlCopied, setMsgUrlCopied] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = history;
  const SLICE_EIGHT = 8;
  const SLICE_SEVEN = 7;
  const DRINK_REGEX = /drinks/;
  const MEAL_REGEX = /meals/;
  const ID_DRINK = pathname.slice(SLICE_EIGHT);
  const ID_MEAL = pathname.slice(SLICE_SEVEN);
  const URL = window.location.href;

  const setRecipeStorage = () => {
    const object = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (DRINK_REGEX.test(pathname) && object) {
      object.drinks[ID_DRINK] = [...ingredient];
      saveLocalStorage('inProgressRecipes', object);
      history.push(`/drinks/${ID_DRINK}/in-progress`);
    } if (MEAL_REGEX.test(pathname) && object) {
      object.meals[ID_MEAL] = [...ingredient];
      saveLocalStorage('inProgressRecipes', object);
      history.push(`/meals/${ID_MEAL}/in-progress`);
    }
  };

  useEffect(() => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress && inProgress.drinks) {
      const keyDrinks = Object.keys(inProgress.drinks);
      if (keyDrinks.includes(ID_DRINK)) {
        setStartedRecipe(true);
      } else {
        setStartedRecipe(false);
      }
    }
    if (inProgress && inProgress.meals) {
      const keyMeals = Object.keys(inProgress.meals);
      if (keyMeals.includes(ID_MEAL)) {
        setStartedRecipe(true);
      } else {
        setStartedRecipe(false);
      }
    }
  }, [recipeId]);

  const onClickFavorite = () => {
    console.log('favoritar receita');
  };

  const onCLickShare = () => {
    const SECONDS_TIMEOUT = 2000;
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
          data-testid="favorite-btn"
          onClick={ () => onClickFavorite() }
        >
          <img
            className="icons"
            src={ iconFavorite }
            alt="iconFavorite"
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
