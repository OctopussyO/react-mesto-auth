import React from "react";

const FormSubmit = React.memo(
  ({ submitTitle, loadingTitle, isActive, isClicked }) => {
    return (
      <button
        className={`popup__save-button ${
          isActive
            ? "popup__save-button_unblocked"
            : "popup__save-button_blocked"
        }`}
        disabled={!isActive}
        type="submit"
      >
        {isClicked ? loadingTitle : submitTitle}
      </button>
    );
  }
);

export default FormSubmit;
