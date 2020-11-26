import React, { useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import FormInputWithError from "./FormInputWithError";

function EditAvatarPopup({ onClose, onUpdateAvatar }) {
  const avatarRef = useRef();
  const [avatar, setAvatar] = useState("");

  const handleAvatarChange = () => {
    setAvatar(avatarRef.current.value);
  };

  const handleSubmit = () => {
    onUpdateAvatar({
      avatar: avatar,
    });
  };

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitTitle="Сохранить"
      submitLoadingTitle="Сохранение..."
      isSubmitActive={false}
    >
      <fieldset className="popup__fieldset">
        <FormInputWithError
          name="avatar"
          placeholder="Ссылка на аватар"
          type="url"
          value={avatar}
          inputRef={avatarRef}
          onChange={handleAvatarChange}
        />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
