import React, { useEffect, useState } from 'react';
import { allDrinksFetch, allMealsFetch } from '../helpers/services/fetchAPI';
import '../styles/Recomendation.css';

export default function Recomendation(pathRecipes) {
  const { path } = pathRecipes;
  const [resultData, setResultData] = useState([]);

  const MAX_RECIPES = 6;

  const dataSlice = resultData && resultData.slice(0, MAX_RECIPES);

  const verifyingPath = async () => {
    if (path === '/meals/:id') {
      const dataDrink = await allDrinksFetch();
      setResultData(dataDrink.drinks);
    } else if (path === '/drinks/:id') {
      const dataMeal = await allMealsFetch();
      setResultData(dataMeal.meals);
    }
  };

  useEffect(() => {
    verifyingPath();
  }, []);

  return (
    <div className="imageCarousel">
      {
        dataSlice.map((el, index) => (
          path === '/meals/:id' ? (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <p data-testid={ `${index}-recommendation-title` }>
                {el.strDrink}
              </p>
              <img
                src={ el.strDrinkThumb }
                alt={ el.strDrink }
              />
            </div>
          )
            : (
              <div
                key={ index }
                data-testid={ `${index}-recommendation-card` }
              >
                <p data-testid={ `${index}-recommendation-title` }>
                  {el.strMeal}
                </p>
                <img
                  src={ el.strMealThumb }
                  alt={ el.strMeal }
                />
              </div>
            )))
      }
    </div>
  );
}
