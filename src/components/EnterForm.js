import React from 'react';
import {Link} from 'react-router-dom';
import Form from './Form';

function EnterForm ({ isNewUser }) {
  return (
    <Form formSelector="enter-form">
      <h2 className="enter-form__heading">
        {isNewUser ? 'Регистрация': 'Вход'}
      </h2>
      <input
        className="enter-form__input"
        name="email"
        type="email"
        placeholder="Email"
      />
      <input
        className="enter-form__input"
        name="password"
        type="password"
        placeholder="Пароль"
      />
      <button className="enter-form__submit-btn">
        {isNewUser ? 'Зарегистрироваться' : 'Войти'}
      </button>
      {isNewUser && (
        <p className="enter-form__paragraph">
        Уже зарегистрированы?&nbsp;
          <Link to="/login" className="enter-form__link">
            Войти
          </Link>
        </p>
      )}
    </Form>
  )
}

export default EnterForm;