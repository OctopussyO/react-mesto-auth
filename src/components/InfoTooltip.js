import React from 'react';
import Popup from './Popup';
import okIcon from '../images/ok-icon.svg';
import notOkIcon from '../images/not-ok-icon.svg';

function InfoTooltip ({ onClose }) {
  const isResOk = true;
  return (
    <Popup
      isTooltipInside={true}
      onClose={onClose}
    >
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
    </Popup>
  )
}

export default InfoTooltip;
