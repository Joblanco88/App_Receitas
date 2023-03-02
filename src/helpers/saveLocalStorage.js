export const saveLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
