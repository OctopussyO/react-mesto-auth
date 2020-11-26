import React from 'react';
import {Link} from 'react-router-dom';

function EnterForm ({ isNewUser }) {
  return (
    <form className="enter-form">
      <h2 className="enter-form__heading">
        {isNewUser ? 'Регистрация': 'Вход'}
      </h2>
      <input
        className="enter-form__input"
        name="email"
        placeholder="Email"
      />
      <input
        className="enter-form__input"
        name="password"
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
    </form>
  )
}

export default EnterForm;