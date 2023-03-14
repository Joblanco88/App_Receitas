import React, { useState } from 'react';
import copy from 'clipboard-copy';
import iconShare from '../images/shareIcon.svg';
import '../styles/DoneRecipes.css';

export default function CardDoneRecipes(recipes) {
  const SECONDS_TIMEOUT = 2000;
  const URL = window.location.href;
  const [msgUrlCopied, setMsgUrlCopied] = useState(false);
  const { done } = recipes;

  const onCLickShare = (type, id) => {
    let urlInProgress = URL;
    if (type === 'meal') {
      urlInProgress = URL.replace('/done-recipes', `/meals/${id}`);
    } else if (type === 'drink') {
      urlInProgress = URL.replace('/done-recipes', `/drinks/${id}`);
    }
    copy(urlInProgress);
    setMsgUrlCopied(true);
    setTimeout(() => {
      setMsgUrlCopied(false);
    }, SECONDS_TIMEOUT);
  };
  return (
    <div className="donerecipes">
      {done?.map((recipe, index) => (
        <div
          className="carddonerecipes"
          key={ index }
        >
          <img
            data-testid={ `${index}-horizontal-image` }
            className="donerecipesimage"
            src={ recipe.image }
            alt={ index }
          />
          {recipe.nationality !== '' ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.category}`}
            </p>
          ) : (
            <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</p>
          )}
          {recipe.alcoholicOrNot !== '' && (
            <p data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</p>
          )}
          <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
          {recipe.tags?.map((tag) => (
            <p
              key={ index }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </p>
          ))}
          <button
            onClick={ () => onCLickShare(recipe.type, recipe.id) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              className="icons"
              src={ iconShare }
              alt="shareIcon"
            />
          </button>
          {msgUrlCopied && <p>Link copied!</p>}
        </div>
      ))}
    </div>
  );
}
