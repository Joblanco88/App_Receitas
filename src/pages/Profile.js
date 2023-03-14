import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getLocalStorage } from '../helpers/saveLocalStorage';
import '../styles/Profile.css';

export default function Profile() {
  const history = useHistory();
  const email = getLocalStorage('user');

  const userLogout = () => {
    history.push('/');
    localStorage.clear('user');
  };
  // useEffect(() => {
  //   const emailLoc = getLocalStorage('user');
  //   if (emailLoc) {
  //     setEmail(emailLoc);
  //   }
  // }, []);
  return (
    <div className="profile">
      <Header
        title="Profile"
      />
      <p
        className="profileuser"
        data-testid="profile-email"
      >
        {email && email.email }

      </p>
      <div className="profilebuttons">
        <button
          className="buttonFilters"
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          className="buttonFilters"
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          className="buttonFilters"
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => userLogout() }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
