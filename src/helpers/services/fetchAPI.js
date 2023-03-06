// Fetch para COMIDAS
export const ingredientMealsFetch = async (ingredient) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`).then((d) => d.json()).then((r) => r).catch(() => global.alert(''));

export const nameMealsFetch = async (name) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`).then((d) => d.json()).then((r) => r).catch(() => global.alert(''));

export const letterMealsFetch = async (letter) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`).then((d) => d.json()).then((r) => r).catch(() => global.alert('Your search must have only 1 (one) character'));

export const allMealsFetch = async () => fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=').then((d) => d.json()).then((r) => r).catch(() => global.alert(''));
// Fetch para BEBIDAS
export const ingredientDrinksFetch = async (ingredient) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`).then((d) => d.json()).then((r) => r).catch(() => global.alert(''));

export const nameDrinksFetch = async (name) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`).then((d) => d.json()).then((r) => r).catch(() => global.alert(''));

export const letterDrinksFetch = async (letter) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`).then((d) => d.json()).then((r) => r).catch(() => global.alert('Your search must have only 1 (one) character'));

export const allDrinksFetch = async () => fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then((d) => d.json()).then((r) => r).catch(() => global.alert(''));
// const fetch async () =>{
//   const response = await fetch('url');
//   const data = await response.json()
//   return data
// }
