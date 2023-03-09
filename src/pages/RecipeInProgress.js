import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import iconShare from '../images/shareIcon.svg';
import iconFavorite from '../images/whiteHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';

export default function RecipeInProgress() {
  const { dataDetails, recipeId } = useContext(RecipesContext);
  const { name, image, category } = dataDetails;
  const { instruction } = recipeId;
  // pegar o usehistory
  // pegar o id
  //
  const history = useHistory();
  const { location: { pathname } } = history;
  // -> /drinks/id/in-progress -> ['', 'drinks', 'id', 'in-progress']
  const idSplit = pathname.split('/')[2];
  const page = pathname.split('/')[1];
  console.log(page, idSplit);

  const onClickbutton = () => {
    console.log('tste');
  };

  return (
    <div>
      <h1>Recipe in progress</h1>
      <h1
        data-testid="recipe-title"
      >
        { name }
      </h1>
      <img
        data-testid="recipe-photo"
        src={ image }
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
        { category }
      </p>
      <p
        data-testid="instructions"
      >
        Modo de preparo:
        <br />
        {`${instruction}`}
      </p>
      <button
        data-testid="finish-recipe-btn"
        onClick={ () => onClickbutton() }
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
