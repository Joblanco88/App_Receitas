import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWith';
import App from '../App';

describe('Testando o Footer', () => {
  test('Testando se o ícone de comida leva para a página Meals', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    const iconMeal = screen.getByTestId('meals-bottom-btn');
    expect(iconMeal).toBeInTheDocument();

    userEvent.click(iconMeal);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');
  });

  test('Testando se o ícone de bebida leva para a página Drinks', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    const iconDrink = screen.getByTestId('drinks-bottom-btn');
    expect(iconDrink).toBeInTheDocument();

    userEvent.click(iconDrink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');
  });
});
