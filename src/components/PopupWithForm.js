import React, { useEffect } from "react";
import Form from './Form';
import Popup from "./Popup";

function PopupWithForm({
  title,
  onClose,
  name,
  onSubmit,
  submitTitle,
  submitLoadingTitle,
  isSubmitActive,
  children,
}) {

  return (
    <Popup
      name={name}
      title={title}
      onClose={onClose}
      isFormInside={true}
    >
      <Form
        formSelector="popup__form"
        submitTitle={submitTitle}
        submitLoadingTitle={submitLoadingTitle}
        isSubmitActive={isSubmitActive}
        onSubmit={onSubmit}
        name={name}
      >
        {children}
      </Form>
    </Popup>
  );
}

export default PopupWithForm;
