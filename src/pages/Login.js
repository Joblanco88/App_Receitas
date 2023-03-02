import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeInput = ({ name, value }) => (
    name === 'password' ? setPassword(value) : setEmail(value));

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Digite seu e-mail"
        value={ email }
        name="email"
        onChange={ ({ target }) => onChangeInput(target) }
        data-testid="email-input"
      />
      <input
        type="password"
        placeholder="Digite sua senha"
        value={ password }
        name="password"
        onChange={ ({ target }) => onChangeInput(target) }
        data-testid="password-input"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ () => console.log('cliquei') }
      >
        Enter
      </button>
    </div>
  );
}
