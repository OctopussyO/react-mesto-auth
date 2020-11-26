import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ deletedCard, onConfirmDelete, onClose }) {
  const handleSubmit = () => {
    onConfirmDelete(deletedCard);
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitTitle="Да"
      submitLoadingTitle="Удаление..."
      isSubmitActive={true}
    />
  );
}

export default ConfirmPopup;
