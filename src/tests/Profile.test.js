import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from '../helpers/renderWith';

describe('testando a pagina de Profile', () => {
  test('Testa se o botão de logout funciona', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });

    const logoutBtn = screen.getByRole('button', {
      name: /logout/i,
    });

    userEvent.click(logoutBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  test('Testa se o botão de favorites funciona', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });

    const favoriteBtn = screen.getByRole('button', {
      name: /favorite recipes/i,
    });

    userEvent.click(favoriteBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorite-recipes');
  });
  test('Testa se o botão de done recipes funciona', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });

    const doneBtn = screen.getByRole('button', {
      name: /done recipes/i,
    });

    userEvent.click(doneBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/done-recipes');
  });
  test('Testa se o email aparece na tela', () => {
    const { history } = renderWithRouter(<App />);

    const button = screen.getByTestId('login-submit-btn');
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');

    userEvent.click(button);

    act(() => {
      history.push('/profile');
    });

    const emailMsg = screen.getByText(/teste@teste\.com/i);

    expect(emailMsg).toBeInTheDocument();
  });
});
