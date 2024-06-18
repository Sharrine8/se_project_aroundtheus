enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
});

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((form) => {
    setEventListeners(form, settings);
  });
}

function setEventListeners(form, settings) {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const buttonElement = form.querySelector(".modal__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((input) => {
    input.addEventListener("input", (evt) => {
      checkInputValidity(form, input);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function checkInputValidity(form, input) {
  if (input.validity.valid) {
    removeInputError(form, input);
  } else {
    addInputError(form, input, input.validationMessage);
  }
}

function removeInputError(form, input) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove("modal__input_type_error");
  errorElement.classList.remove("modal__error_visible");
  errorElement.textContent = "";
}

function addInputError(form, input, errorMessage) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add("modal__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__error_visible");
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("modal__button_disabled");
  } else {
    buttonElement.classList.remove("modal__button_disabled");
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
