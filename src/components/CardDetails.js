import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/CardDetails.css';

export default function CardDetails(recipeId) {
  const { params: { title, thumb, category,
    ingredient, measure, instruction, video } } = recipeId;
  const history = useHistory();
  const { location: { pathname } } = history;
  const SLICE_EIGHT = 8;
  const SLICE_SEVEN = 7;

  const setRecipeStorage = () => {
    const object = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(object);
    const drinkRegex = /drinks/;
    const mealRegex = /meals/;
    if (drinkRegex.test(pathname)) {
      const id = pathname.slice(SLICE_EIGHT);
      object.drinks[id] = [...ingredient];
      console.log(object);
    } if (mealRegex.test(pathname)) {
      const id = pathname.slice(SLICE_SEVEN);
      object.meals[id] = [...ingredient];
      console.log(object);
    }
    localStorage.setItem('drinks', object);
  };

  return (
    <div>
      {/* titulo */}
      <h1
        data-testid="recipe-title"
      >
        {title}
      </h1>
      {/* foto */}
      <img
        data-testid="recipe-photo"
        src={ thumb }
        alt={ thumb }
        width="300px"
      />
      {/* texto da categoria */}
      <p
        data-testid="recipe-category"
      >
        {category}
      </p>
      {/* // ingredientes */}
      <ul>
        {ingredient.map((el, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${el}-${measure[index]}`}
          </li>))}
      </ul>
      {/* texto de instruções */}
      <p
        data-testid="instructions"
      >
        Modo de preparo:
        <br />
        {`${instruction}`}
      </p>
      <div>
        {/* vídeo presente somente na tela de comidas */}
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
        onClick={ () => setRecipeStorage() }
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
    </div>
  );
}

// "strDrinkThumb", "strDrink", "strCategory", "strIngredient1", "strMeasure1", "strInstrunctions", "strVideo"
