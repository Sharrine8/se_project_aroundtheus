import FormValidator from "../components/FormValidator.js";

//Settings object
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//Call validation function
enableValidation(settings);

//TEMP
console.log(FormValidator);
const formValidator = new FormValidator(settings, "#modal-edit-form");
console.log(formValidator);

//Other Functions
// function enableValidation(settings) {
//   const formList = Array.from(document.querySelectorAll(settings.formSelector));
//   formList.forEach((form) => {
//     setEventListeners(form, settings);
//   });
// }

// function setEventListeners(form, settings) {
//   const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
//   const buttonElement = form.querySelector(settings.submitButtonSelector);
//   inputList.forEach((input) => {
//     input.addEventListener("input", (evt) => {
//       checkInputValidity(form, input, settings);
//       toggleButtonState(inputList, buttonElement, settings);
//     });
//   });
// }

// function checkInputValidity(form, input, settings) {
//   if (input.validity.valid) {
//     removeInputError(form, input, settings);
//   } else {
//     addInputError(form, input, settings);
//   }
// }

// function removeInputError(form, input, settings) {
//   const errorElement = form.querySelector(`.${input.id}-error`);
//   input.classList.remove(settings.inputErrorClass);
//   errorElement.classList.remove(settings.errorClass);
//   errorElement.textContent = "";
// }

// function addInputError(form, input, settings) {
//   const errorElement = form.querySelector(`.${input.id}-error`);
//   const errorMessage = input.validationMessage;
//   input.classList.add(settings.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(settings.errorClass);
// }

// function toggleButtonState(inputList, buttonElement, settings) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(settings.inactiveButtonClass);
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(settings.inactiveButtonClass);
//     buttonElement.disabled = false;
//   }
// }

// function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// }

// function resetValidation(form, settings) {
//   const inputList = [...form.querySelectorAll(settings.inputSelector)];
//   const buttonElement = form.querySelector(settings.submitButtonSelector);
//   inputList.forEach((input) => {
//     removeInputError(form, input, settings);
//   });
//   toggleButtonState(inputList, buttonElement, settings);
// }
