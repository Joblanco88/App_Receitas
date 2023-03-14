import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

export default function Footer() {
  const history = useHistory();
  return (
    <div>
      <footer data-testid="footer" className="footer">
        <input
          className="drinkIcon"
          type="image"
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
          onClick={ () => history.push('/drinks') }
          alt="drinks"
        />

        <input
          className="mealIcon"
          type="image"
          src={ mealIcon }
          data-testid="meals-bottom-btn"
          onClick={ () => history.push('/meals') }
          alt="meals"
        />
      </footer>
    </div>
  );
}
