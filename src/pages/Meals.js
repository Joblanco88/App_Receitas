import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';
import Filters from '../components/Filters';
import RecipesContext from '../context/RecipesContext';
import { allMealsFetch } from '../helpers/services/fetchAPI';

export default function Meals() {
  const { setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    const fetch = async () => {
      const recipes = await allMealsFetch();
      if (recipes) {
        setRecipes(recipes);
      } else {
        return global.alert(
          'Sorry, we haven\'t found any recipes for these filters.',
        );
      }
    };
    fetch();
  }, [setRecipes]);

  return (
    <div>
      <Header
        title="Meals"
      />
      <Filters title="Meals" />
      <Recipes />
      <Footer />
    </div>
  );
}
