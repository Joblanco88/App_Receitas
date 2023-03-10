export const createObjectDetails = (object, param) => {
  if (param) {
    const { strMeal, strArea, idMeal, strCategory, strMealThumb } = object;
    const filteredObject = {
      name: strMeal,
      nationality: strArea,
      id: idMeal,
      category: strCategory,
      image: strMealThumb,
      type: 'meal',
      alcoholicOrNot: '',
    };
    const result = { ...filteredObject };
    return result;
  }
  const { strDrink, idDrink,
    strCategory, strDrinkThumb, strAlcoholic } = object;
  const filteredObject = {
    name: strDrink,
    nationality: '',
    id: idDrink,
    category: strCategory,
    image: strDrinkThumb,
    type: 'drink',
    alcoholicOrNot: strAlcoholic,
  };
  const result = { ...filteredObject };
  return result;
};
