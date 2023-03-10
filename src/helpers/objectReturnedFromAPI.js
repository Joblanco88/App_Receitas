export const objectInProgress = (object, page, ingredients, measures) => {
  let objectReturn = {};
  if (page === 'meals') {
    objectReturn = {
      name: object.strMeal,
      image: object.strMealThumb,
      category: object.strCategory,
      instructions: object.strInstructions,
      ingredients: Object.values(ingredients)
        .filter((value) => value !== '' && value !== null),
      measures: Object.values(measures)
        .filter((value) => value !== '' && value !== null),
    };
  } else if (page === 'drinks') {
    objectReturn = {
      name: object.strDrink,
      image: object.strDrinkThumb,
      category: object.strAlcoholic,
      instructions: object.strInstructions,
      ingredients: Object.values(ingredients)
        .filter((value) => value !== '' && value !== null),
      measures: Object.values(measures)
        .filter((value) => value !== '' && value !== null),
    };
  }
  return objectReturn;
};

export const objectRecipeId = (object, page, ingredients, measures) => {
  let objectReturn = {};
  if (page === '/meals/:id') {
    objectReturn = {
      thumb: object.strMealThumb,
      title: object.strMeal,
      category: object.strCategory,
      ingredient: Object.values(ingredients)
        .filter((value) => value !== '' && value !== null),
      measure: Object.values(measures)
        .filter((value) => value !== '' && value !== null),
      instruction: object.strInstructions,
      video: object.strYoutube,
    };
  } else if (page === '/drinks/:id') {
    objectReturn = {
      thumb: object.strDrinkThumb,
      title: object.strDrink,
      category: object.strAlcoholic,
      ingredient: Object.values(ingredients)
        .filter((value) => value !== '' && value !== null),
      measure: Object.values(measures)
        .filter((value) => value !== '' && value !== null),
      instruction: object.strInstructions,
      video: object.strVideo,
    };
  }
  return objectReturn;
};

export const objectDoneRecipe = (object, page) => {
  let objectReturn = {};
  if (page === 'meals') {
    objectReturn = {
      id: object.idMeal,
      type: 'meal',
      nationality: object.strArea,
      alcoholicOrNot: '',
      name: object.strMeal,
      image: object.strMealThumb,
      category: object.strCategory,
      doneDate: new Date(),
      tags: (object.strTags ? object.strTags.split(',') : []),
    };
  } else if (page === 'drinks') {
    objectReturn = {
      id: object.idDrink,
      type: 'drink',
      nationality: '',
      alcoholicOrNot: object.strAlcoholic,
      name: object.strDrink,
      image: object.strDrinkThumb,
      category: object.strCategory,
      doneDate: new Date(),
      tags: (object.strTags ? object.strTags.split(',') : []),
    };
  }
  return objectReturn;
};
