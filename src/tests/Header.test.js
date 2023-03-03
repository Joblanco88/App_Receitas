import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Profile from '../pages/Profile';
import Meals from '../pages/Meals';
// import Header from '../components/Header';
import { renderWithRouter } from '../helpers/renderWith';
import App from '../App';

describe('Testando o component Header', () => {
  const SEARCH_BUTTON = 'search-top-btn';
  test('Renderiza a palavra Profile', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const searchButton = screen.getByTestId(SEARCH_BUTTON);
    act(() => {
      history.push('/profile');
    });
    const title = screen.getByTestId('page-title');
    expect(searchButton).not.toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('Se o botão do profile envia o usuario para a pag profile ', () => {
    const { history } = renderWithRouter(<Meals />);

    const button = screen.getByTestId('profile-top-btn');
    const searchButton = screen.getByTestId(SEARCH_BUTTON);
    expect(button).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    userEvent.click(button);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  });

  // test('Quando entra na page Meals nao tem o input de busca', () => {
  //   renderWithRouter(<Meals />);

  //   const searchButton = screen.getByTestId('search-input');
  //   const inputSearch = screen.getByRole('textbox');
  //   expect(inputSearch).not.toBeInTheDocument();

  //   userEvent.click(searchButton);
  //   expect(SEARCH_BAR).toBeInTheDocument();
  // });
});
