import React, { useEffect, useState } from 'react';
import { allDrinksFetch, allMealsFetch } from '../helpers/services/fetchAPI';

export default function Recomendation(pathRecipes) {
  const { path } = pathRecipes;
  console.log(path);
  const [resultData, setResultData] = useState([]);

  const verifyingPath = async () => {
    if (path === '/meals/:id') {
      const dataDrink = await allDrinksFetch();
      setResultData(dataDrink);
    } else if (path === '/drinks/:id') {
      const dataMeal = await allMealsFetch();
      setResultData(dataMeal);
    }
  };

  useEffect(() => {
    verifyingPath();
  }, []);

  console.log(resultData);

  return (
    <div>
      <h1>
        Recomendação
      </h1>
    </div>
  );
}
