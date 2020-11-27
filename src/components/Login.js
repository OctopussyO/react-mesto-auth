import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import cn from 'classnames';
import Form from './Form';
import FormInputWithError from './FormInputWithError';

function Login ({ onSubmit }) {
  const themeModificator = "dark";
  const actModificator = "identification";

  const fieldsetClassName = cn(
    'form__fieldset',
    {[`form__fieldset_theme_${themeModificator}`]: themeModificator},
    {[`form__fieldset_act_${actModificator}`]: actModificator},
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Form
        themeModificator={themeModificator}
        actModificator={actModificator}
        children
        name="login"
        title="Вход"
        submitTitle="Войти"
        submitLoadingTitle="Вход..."
        isSubmitActive={false}
        onSubmit={onSubmit}
      >
        <fieldset className={fieldsetClassName}>
          <FormInputWithError
            themeModificator={themeModificator}
            actModificator={actModificator}
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <FormInputWithError
            themeModificator={themeModificator}
            actModificator={actModificator}
            name="password"
            type="password"
            placeholder="Пароль"
            minLength="6"
            maxLength="50"
            value={password}
            onChange={handlePasswordChange}
          />
        </fieldset>
      </Form>
    </>
  )
}

export default Login;
