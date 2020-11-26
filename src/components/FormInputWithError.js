import React, { useState } from "react";

const FormInputWithError = React.memo(
  ({
    name,
    placeholder,
    type,
    minLength,
    maxLength,
    value,
    onChange,
    inputRef,
  }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const handleChange = (e) => {
      setErrorMessage(e.target.validationMessage);
      onChange(e);
    }
    return (
      <>
        <input
          className="popup__input popup__input_valid"
          name={name}
          placeholder={placeholder}
          type={type}
          minLength={minLength}
          maxLength={maxLength}
          required
          autoComplete="off"
          value={value}
          onChange={handleChange}
          ref={inputRef}
        />
        <span className={`popup__error popup__error_in_${name}`}>
          {errorMessage}
        </span>
      </>
    );
  }
);

export default FormInputWithError;
