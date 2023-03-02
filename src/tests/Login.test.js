import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from '../helpers/renderWith';

describe('Testando page Login', () => {
  test('Testa se exibe um título Login', () => {
    renderWithRouter(<App />);
    const title = screen.getByText(/login/i);
    expect(title).toBeInTheDocument();
  });

  test('Testa se o botão está desabilitado ao entrar na pagina', () => {
    const { history } = renderWithRouter(<App />);

    const button = screen.getByTestId('login-submit-btn');
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');

    expect(button).not.toBeDisabled();

    userEvent.click(button);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');
  });
});
