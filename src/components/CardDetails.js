import React from 'react';

export default function CardDetails(recipeId) {
  const { params: { title, thumb, category,
    ingredient, measure, instruction, video } } = recipeId;
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
    </div>
  );
}

// "strDrinkThumb", "strDrink", "strCategory", "strIngredient1", "strMeasure1", "strInstrunctions", "strVideo"
