import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import { allDrinksFetch } from '../helpers/services/fetchAPI';

export default function Drinks() {
  const { setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    const fetch = async () => {
      const recipes = await allDrinksFetch();
      if (recipes) {
        setRecipes(recipes);
      }
    };
    fetch();
  }, [setRecipes]);
  return (
    <div>
      <Header
        title="Drinks"
      />
      <Recipes />
      <Footer />
    </div>
  );
}
