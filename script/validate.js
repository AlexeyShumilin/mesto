const validationSetup = {
  formSelector: ".popup__container",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input-error",
};

const openInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
};

const closeInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const isValid = (formElement, inputElement, classElement) => {
  if (!inputElement.validity.valid) {
    openInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      classElement
    );
  } else {
    closeInputError(formElement, inputElement, classElement);
  }
};

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inputErrorClass,
  inactiveButtonClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, inputErrorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(
      formElement,
      options.inputSelector,
      options.submitButtonSelector,
      options.inputErrorClass,
      options.inactiveButtonClass
    );
  });
};

enableValidation(validationSetup);
