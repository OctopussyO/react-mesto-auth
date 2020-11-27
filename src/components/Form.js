import React, { useState, useRef } from 'react';
import cn from 'classnames';
import useFormValidation from '../hooks/useFormValidation';
import FormSubmit from "./FormSubmit";

function Form ({
  themeModificator,
  actModificator,
  children,
  name,
  title,
  submitTitle,
  submitLoadingTitle,
  isSubmitActive,
  onSubmit,
}) {
  const formClassName = cn(
    'form',
    {[`form_theme_${themeModificator}`]: themeModificator},
    {[`form_act_${actModificator}`]: actModificator},
  );

  const headingClassName = cn(
    'form__heading',
    {[`form__heading_theme_${themeModificator}`]: themeModificator},
    {[`form__heading_act_${actModificator}`]: actModificator},
  );

  console.log(actModificator)

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
      className={formClassName}
      name={name}
      method="GET"
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
    >
      {title && <h2 className={headingClassName}>{title}</h2>}
      {children}
      <FormSubmit
        themeModificator={themeModificator}
        actModificator={actModificator}
        submitTitle={submitTitle}
        loadingTitle={submitLoadingTitle}
        isActive={isSubmitValid}
        isClicked={isSubmitted}
      />
    </form>
  )
}

export default Form;
