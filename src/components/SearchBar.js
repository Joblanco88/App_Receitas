import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Pesquise uma receita"
      />
    </div>
  );
}
