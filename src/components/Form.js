import React, { useState, useRef } from 'react';
import useFormValidation from '../hooks/useFormValidation';
import FormSubmit from "./FormSubmit";

function Form ({
  formSelector,
  children,
  name,
  submitTitle,
  submitLoadingTitle,
  isSubmitActive,
  onSubmit,
}) {
  // Определяем, нажата ли кнопка отправки формы для подстановки загрузочного текста
  const [isSubmitted, setSubmitState] = useState(false);

  // Определяем форму для валидации
  const formRef = useRef();

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitState(true);
    onSubmit();
  };

  // Используем пользовательский хук валидации формы
  let { isSubmitValid } = useFormValidation({ formRef, isSubmitActive });

  return (
    <form
      action="#"
      className={formSelector}
      name={name}
      method="GET"
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
    >
      {children}
      <FormSubmit
        submitTitle={submitTitle}
        loadingTitle={submitLoadingTitle}
        isActive={isSubmitValid}
        isClicked={isSubmitted}
      />
    </form>
  )
}

export default Form;
