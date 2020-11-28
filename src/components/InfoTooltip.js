import React from 'react';
import Popup from './Popup';
import okIcon from '../images/ok-icon.svg';
import notOkIcon from '../images/not-ok-icon.svg';

function InfoTooltip ({ isSuccess, message, onClose }) {
  const backgroundImageStyles = isSuccess
    ? {backgroundImage: `url(${okIcon})`}
    : {backgroundImage: `url(${notOkIcon})`}

  const notOkMessage = message ? message : 'Что-то пошло не так! Попробуйте ещё раз.';
  return (
    <Popup
      isTooltipInside={true}
      onClose={onClose}
    >
      <div className="popup__tooltip-icon"
      style={backgroundImageStyles}
      />
      <p className="popup__tooltip-paragraph">
        {isSuccess
          ? 'Вы успешно зарегистрировались!'
          : `${notOkMessage}`
        }
      </p>
    </Popup>
  )
}

export default InfoTooltip;
