import React from 'react';
import okIcon from '../images/ok-icon.svg';
import notOkIcon from '../images/not-ok-icon.svg';

function InfoTooltip () {
  const isResOk = true;
  return (
    <div className="popup popup_active popup_with_tooltip">
      <div className="popup__container">
        <div className="popup__tooltip-icon"
        style={isResOk
          ? {backgroundImage: `url(${okIcon})`}
          : {backgroundImage: `url(${notOkIcon})`
        }}
        />
        <p className="popup__tooltip-paragraph">
          {isResOk
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'
          }
        </p>
        <button
          className="popup__close-button page__button"
          type="button"
          aria-label="Закрыть"
        />
      </div>
    </div>
  )
}

export default InfoTooltip;
