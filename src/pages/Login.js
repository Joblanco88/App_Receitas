import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';
import logo from '../images/logo.svg';
import loginBackground from '../images/loginBackground.png';
import { saveLocalStorage } from '../helpers/saveLocalStorage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onChangeInput = ({ name, value }) => (
    name === 'password' ? setPassword(value) : setEmail(value));

  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const isEmailValid = emailRegex.test(email);
  const MAX_CARACTER = 7;
  const isPasswordValid = password.length >= MAX_CARACTER;
  const disable = (isEmailValid && isPasswordValid);

  return (
    <div className="login">
      <img
        src={ loginBackground }
        alt="loginBackground"
        className="loginBackground"
      />
      <img
        src={ logo }
        alt="logoApp"
        className="logoImage"
      />
      <h1>Login</h1>
      <input
        className="input-login"
        type="text"
        placeholder="Digite seu e-mail"
        value={ email }
        name="email"
        onChange={ ({ target }) => onChangeInput(target) }
        data-testid="email-input"
      />
      <input
        className="input-login"
        type="password"
        placeholder="Digite sua senha"
        value={ password }
        name="password"
        onChange={ ({ target }) => onChangeInput(target) }
        data-testid="password-input"
      />
      <button
        className="button"
        type="button"
        data-testid="login-submit-btn"
        onClick={ () => {
          history.push('/meals');
          saveLocalStorage('user', { email });
          saveLocalStorage('doneRecipes', []);
          saveLocalStorage('favoriteRecipes', []);
          saveLocalStorage('inProgressRecipes', { drinks: {}, meals: {} });
        } }
        disabled={ !disable }
      >
        Enter
      </button>
    </div>

  );
}
