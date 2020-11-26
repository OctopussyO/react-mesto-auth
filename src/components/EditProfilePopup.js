import React, { useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import FormInputWithError from "./FormInputWithError";

function EditProfilePopup({ onClose, onUpdateUser }) {
  // Используем контекст для установки начальных значений стейт-переменных для управляемых компонентов
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [info, setInfo] = useState(currentUser.about);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleInfoChange = (e) => {
    setInfo(e.target.value);
  };

  const handleSubmit = () => {
    onUpdateUser({
      name,
      about: info,
    });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitTitle="Сохранить"
      submitLoadingTitle="Сохранение..."
      isSubmitActive={true}
    >
      <fieldset className="popup__fieldset">
        <FormInputWithError
          name="name"
          placeholder="Имя"
          type="text"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <FormInputWithError
          name="info"
          placeholder="Профессия"
          type="text"
          minLength="2"
          maxLength="200"
          value={info}
          onChange={handleInfoChange}
        />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
