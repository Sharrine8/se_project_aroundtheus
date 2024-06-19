enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
});

function enableValidation(options) {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((form) => {
    setEventListeners(form, options);
  });
}

function setEventListeners(form, options) {
  const inputList = Array.from(form.querySelectorAll(options.inputSelector));
  const buttonElement = form.querySelector(options.submitButtonSelector);
  inputList.forEach((input) => {
    input.addEventListener("input", (evt) => {
      checkInputValidity(form, input, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
}

function checkInputValidity(form, input, options) {
  if (input.validity.valid) {
    removeInputError(form, input, options);
  } else {
    addInputError(form, input, input.validationMessage, options);
  }
}

function removeInputError(form, input, options) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = "";
  const buttonElement = form.querySelector(options.submitButtonSelector);
  buttonElement.disabled = false;
}

function addInputError(form, input, errorMessage, options) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
  const buttonElement = form.querySelector(options.submitButtonSelector);
  buttonElement.disabled = true;
}

function toggleButtonState(inputList, buttonElement, options) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(options.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
