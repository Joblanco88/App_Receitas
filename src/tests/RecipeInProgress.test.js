import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWith';
import App from '../App';

describe('Testando o Recipe In Progress', () => {
  test('Testando Recipe in progress de drinks no id 15997', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });

    await waitFor(() => {
      const drink = screen.getByTestId('0-recipe-card');
      userEvent.click(drink);
      expect(history.location.pathname).toBe('/drinks/15997');
    });

    const startRecipe = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipe);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');

    await waitFor(() => {
      const image = screen.getByTestId('recipe-photo');
      expect(image).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
    });

    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', 'blackHeartIcon.svg');

    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();

    const ingredients = screen.getAllByRole('checkbox');
    expect(ingredients).toHaveLength(3);
  });
  test('Testando Recipe in progress de meals no id 52977', async () => {
    const { history } = renderWithRouter(<App />);
    // const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // const setFavorites = jest.spyOn(window.localStorage, 'setItem');
    // const getFavorites = jest.spyOn(window.localStorage, 'getItem');
    act(() => {
      history.push('/meals');
    });

    await waitFor(() => {
      const meal = screen.getByTestId('0-recipe-card');
      userEvent.click(meal);
      expect(history.location.pathname).toBe('/meals/52977');
    });

    const startRecipe = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipe);
    expect(history.location.pathname).toBe('/meals/52977/in-progress');

    await waitFor(() => {
      const image = screen.getByTestId('recipe-photo');
      expect(image).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
    });

    // expect(getFavorites).toHaveBeenCalled();
    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton).toHaveAttribute('src', 'whiteHeartIcon.svg');
    // localStorage.setItem('favoriteRecipes', JSON.stringify(storage));
    userEvent.click(favoriteButton);
    // expect(favorites).toEqual(storage);
    expect(favoriteButton).toHaveAttribute('src', 'blackHeartIcon.svg');

    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();

    const ingredients = screen.getAllByRole('checkbox');
    expect(ingredients).toHaveLength(13);

    // const clipboard = screen.getByTestId('share-btn');
    // userEvent.click(clipboard);
    // expect(clipboardCopy).toHaveBeenCalledWith('http://localhost:3000/meals/52977');
    // const clipboardContent = await navigator.clipboard.readText();
    // expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
    // expect(clipboardContent).toBe('http://localhost:3000/meals/52977');
  });
});
