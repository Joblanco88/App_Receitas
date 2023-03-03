import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Pesquise uma receita"
      />
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        id="ingredient-search-radio"
      />
      <label
        htmlFor="ingredient-search-radio"
      >
        {' '}
        Busca de ingrediente
        {' '}

      </label>
    </div>
  );
}
