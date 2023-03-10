import React from 'react';
import Header from '../components/Header';

export default function DoneRecipes() {
  return (
    <div>
      <Header
        title="Done Recipes"
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
