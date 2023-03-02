import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import iconProfile from '../images/profileIcon.svg';
import iconSearch from '../images/searchIcon.svg';

export default function Header({ title }) {
  const history = useHistory();
  const { pathname } = history.location;
  return (
    <div>
      <h1
        data-testid="page-title"
      >
        {title}
      </h1>

      { pathname === '/profile'
      || pathname === '/done-recipes'
      || pathname === '/favorite-recipes'
        ? (
          <input
            type="image"
            src={ iconProfile }
            data-testid="profile-top-btn"
            onClick={ () => history.push('/profile') }
            alt="profile-top-btn"
          />)
        : (
          <>
            <input
              type="image"
              src={ iconProfile }
              data-testid="profile-top-btn"
              onClick={ () => history.push('/profile') }
              alt="profile-top-btn"
            />
            <input
              type="image"
              src={ iconSearch }
              data-testid="search-top-btn"
              onClick={ () => console.log('clicou na pesquisa') }
              alt="search-top-btn"
            />
          </>)}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;
