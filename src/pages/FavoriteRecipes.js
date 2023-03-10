import React, { useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import iconShare from '../images/shareIcon.svg';

export default function FavoriteRecipes() {
  const SECONDS_TIMEOUT = 2000;
  const URL = window.location.href;
  const [msgUrlCopied, setMsgUrlCopied] = useState(false);

  const onCLickShare = () => {
    const urlInProgress = URL.replace('/favorite-recipes', '');
    copy(urlInProgress);
    setMsgUrlCopied(true);
    setTimeout(() => {
      setMsgUrlCopied(false);
    }, SECONDS_TIMEOUT);
  };

  return (
    <div>
      <Header
        title="Favorite Recipes"
      />

      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
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
      {msgUrlCopied && <p>Link copied!</p>}
    </div>
  );
}
