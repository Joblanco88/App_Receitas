import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWith';
import App from '../App';

describe('Testando SearchBar', () => {
  beforeEach(() => {
    global.alert = jest.fn();
  });

  const SEARCH_BUTTON = 'exec-search-btn';
  const SEARCH_INPUT = 'search-input';
  const TOGGLE_SEARCH = 'search-top-btn';
  const RADIO_NAME = 'name-search-radio';
  const RADIO_LETTER = 'first-letter-search-radio';

  test('Testando pesquisa atraves de ingrediente na pagina meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const toggleSearch = screen.getByTestId(TOGGLE_SEARCH);
    userEvent.click(toggleSearch);

    const searchButton = screen.getByTestId(SEARCH_BUTTON);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioIngredient = screen.getByTestId('ingredient-search-radio');

    userEvent.type(searchInput, 'chicken');
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);

    await waitFor(() => {
      const result = screen.getByText(/brown stew chicken/i);
      expect(result).toBeInTheDocument();
    });
  });

  test('Testando pesquisa atraves de ingrediente na pagina drinks', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });

    const toggleSearch = screen.getByTestId(TOGGLE_SEARCH);
    userEvent.click(toggleSearch);

    const searchButton = screen.getByTestId(SEARCH_BUTTON);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioIngredient = screen.getByTestId('ingredient-search-radio');

    userEvent.type(searchInput, 'gin');
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);

    await waitFor(() => {
      const result = screen.getByText(/3-mile long island iced tea/i);
      expect(result).toBeInTheDocument();
    });
  });

  test('Testando se quando tem apenas um resultado na busca de drink, redireciona pra página de detalhes do resultado', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });

    const toggleSearch = screen.getByTestId(TOGGLE_SEARCH);
    userEvent.click(toggleSearch);

    const searchButton = screen.getByTestId(SEARCH_BUTTON);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioName = screen.getByTestId(RADIO_NAME);

    userEvent.type(searchInput, 'aquamarine');
    userEvent.click(radioName);
    userEvent.click(searchButton);
    await waitFor(() => {
      const { location: { pathname } } = history;

      expect(pathname).toBe('/drinks/178319');
    });
  });

  test('', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const toggleSearch = screen.getByTestId(TOGGLE_SEARCH);
    userEvent.click(toggleSearch);

    const searchButton = screen.getByTestId(SEARCH_BUTTON);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioName = screen.getByTestId(RADIO_NAME);

    userEvent.type(searchInput, 'arrabiata');
    userEvent.click(radioName);
    userEvent.click(searchButton);

    await waitFor(() => {
      const { location: { pathname } } = history;

      expect(pathname).toBe('/meals/52771');
    });
  });
  test('', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const toggleSearch = screen.getByTestId(TOGGLE_SEARCH);
    userEvent.click(toggleSearch);

    const searchButton = screen.getByTestId(SEARCH_BUTTON);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioName = screen.getByTestId(RADIO_NAME);

    userEvent.type(searchInput, 'fhdasuifasiud');
    userEvent.click(radioName);
    userEvent.click(searchButton);
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledTimes(1);
    });
  });
  test('', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });

    const toggleSearch = screen.getByTestId(TOGGLE_SEARCH);
    userEvent.click(toggleSearch);

    const searchButton = screen.getByTestId(SEARCH_BUTTON);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioName = screen.getByTestId(RADIO_NAME);

    userEvent.type(searchInput, 'fhdasuifasiud');
    userEvent.click(radioName);
    userEvent.click(searchButton);
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledTimes(1);
    });
  });

  test('', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const toggleSearch = screen.getByTestId(TOGGLE_SEARCH);
    userEvent.click(toggleSearch);

    const searchButton = screen.getByTestId(SEARCH_BUTTON);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioLetter = screen.getByTestId(RADIO_LETTER);

    userEvent.type(searchInput, 'aaa');
    userEvent.click(radioLetter);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledTimes(1);
    });
  });

  test('', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    const toggleSearch = screen.getByTestId(TOGGLE_SEARCH);
    userEvent.click(toggleSearch);

    const searchButton = screen.getByTestId(SEARCH_BUTTON);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioLetter = screen.getByTestId(RADIO_LETTER);

    userEvent.type(searchInput, 'aaa');
    userEvent.click(radioLetter);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledTimes(1);
    });
  });

  test('', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const toggleSearch = screen.getByTestId(TOGGLE_SEARCH);
    userEvent.click(toggleSearch);

    const searchButton = screen.getByTestId(SEARCH_BUTTON);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioLetter = screen.getByTestId(RADIO_LETTER);

    userEvent.type(searchInput, 'a');
    userEvent.click(radioLetter);
    userEvent.click(searchButton);

    await waitFor(() => {
      const filteredByLetter = screen.getByText(/apple frangipan tart/i);
      expect(filteredByLetter).toBeInTheDocument();
    });
  });
});
