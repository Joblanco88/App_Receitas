import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import iconProfile from '../images/profileIcon.svg';
import iconSearch from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';
import iconeRecipes from '../images/íconeRecipes.svg';

export default function Header({ title }) {
  const history = useHistory();
  const [searchRender, setSearchRender] = useState(false);
  const { pathname } = history.location;
  return (
    <div>
      <div className="header">
        <img
          className="iconeRecipes"
          src={ iconeRecipes }
          alt="iconeRecipes"
        />
        <h1
          data-testid="page-title"
          className="titleFoodType"
        >
          {title}
        </h1>

        { pathname === '/profile'
      || pathname === '/done-recipes'
      || pathname === '/favorite-recipes'
          ? (
            <input
              className="inputProfile"
              type="image"
              src={ iconProfile }
              data-testid="profile-top-btn"
              onClick={ () => history.push('/profile') }
              alt="profile"
            />)
          : (
            <div
              className="containerInputs"
            >
              <input
                className="inputProfile"
                type="image"
                src={ iconProfile }
                data-testid="profile-top-btn"
                onClick={ () => history.push('/profile') }
                alt="profile-top-btn"
              />
              <input
                className="inputSearch"
                type="image"
                src={ iconSearch }
                data-testid="search-top-btn"
                onClick={ () => (
                  searchRender ? setSearchRender(false) : setSearchRender(true)
                ) }
                alt="search-top-btn"
              />
            </div>)}
      </div>
      {
        searchRender && <SearchBar pageTitle={ title } />
      }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;
