import React from 'react';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const SECONDS_TIMEOUT = 2000;

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
    </div>
  );
}
