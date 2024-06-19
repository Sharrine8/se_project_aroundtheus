const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(options);

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
    addInputError(form, input, options);
  }
}

function removeInputError(form, input, options) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = "";
}

function addInputError(form, input, options) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  const errorMessage = input.validationMessage;
  input.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
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

function resetValidation(form, options) {
  const inputList = [...form.querySelectorAll(options.inputSelector)];
  const buttonElement = form.querySelector(options.submitButtonSelector);
  inputList.forEach((input) => {
    removeInputError(form, input, options);
  });
  toggleButtonState(inputList, buttonElement, options);
}
