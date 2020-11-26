import React, { useEffect } from "react";

function ImagePopup({ place, onClose }) {
  // Обработчик клика по оверлею
  const handleOverlayPopupClick = (evt) => {
    if (!evt.target.closest(".popup__container")) {
      onClose();
    }
  };

  // Обработчик нажатия клавиши "Escape"
  const handleEscape = (evt) => {
    if (evt.key === "Escape") {
      onClose();
    }
  };

  // Используем хук эффекта для закрытия модалки по нажатию клавиши "Escape"
  useEffect(() => {
    document.body.addEventListener("keydown", handleEscape);
    return () => {
      document.body.removeEventListener("keydown", handleEscape);
    };
  });

  return (
    <div
      className="popup popup_act_enlarge-image popup_active"
      onMouseDown={handleOverlayPopupClick}
    >
      <figure className="popup__container">
        <img
          className="popup__image"
          src={place.link}
          alt={`${place.name}, фотография`}
        />
        <figcaption>
          <p className="popup__image-caption">{`${place.name}, фотография`}</p>
          <button
            className="popup__close-button page__button"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          />
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
