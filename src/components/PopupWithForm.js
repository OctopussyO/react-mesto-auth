import React from "react";
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
  themeModificator,
  actModificator,
}) {
  return (
    <Popup
      name={name}
      onClose={onClose}
      isFormInside={true}
    >
      <Form
        themeModificator={themeModificator}
        actModificator={actModificator}
        submitTitle={submitTitle}
        submitLoadingTitle={submitLoadingTitle}
        isSubmitActive={isSubmitActive}
        onSubmit={onSubmit}
        name={name}
        title={title}
      >
        {children}
      </Form>
    </Popup>
  );
}

export default PopupWithForm;
