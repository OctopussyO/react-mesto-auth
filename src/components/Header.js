import React from "react";
import { Switch, Route, Link } from 'react-router-dom';
import logoPath from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logoPath}
        alt="Логотип проекта 'Место'"
      />
      <Switch>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link page__link">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link page__link">
            Вход
          </Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
