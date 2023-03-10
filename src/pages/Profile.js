import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getLocalStorage } from '../helpers/saveLocalStorage';

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
    <div>
      <Header
        title="Profile"
      />
      <p
        data-testid="profile-email"
      >
        {email && email.email }

      </p>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => userLogout() }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}
