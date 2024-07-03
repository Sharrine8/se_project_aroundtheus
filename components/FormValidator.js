export default class FormValidator {
  constructor(settings, formSelector) {
    this._settings = settings;
    this._form = document.querySelector(formSelector);
    this._inputList = [...this._form.querySelectorAll(settings.inputSelector)];
    this._buttonElement = this._form.querySelector(
      settings.submitButtonSelector
    );
  }

  _checkInputvalidity(input) {
    if (input.validity.valid) {
      this._removeInputError(input);
    } else {
      this._addInputError(input);
    }
  }

  _removeInputError(input) {
    this._errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._settings.inputErrorClass);
    this._errorElement.classList.remove(this._settings.errorClass);
    this._errorElement.textContent = "";
  }

  _addInputError(input) {
    this._errorElement = this._form.querySelector(`.${input.id}-error`);
    this._errorMessage = input.validationMessage;
    input.classList.add(this._settings.inputErrorClass);
    this._errorElement.textContent = this._errorMessage;
    this._errorElement.classList.add(this._settings.errorClass);
  }

  _toggleButtonState() {
    if (this._hasValidInput()) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _hasValidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", (evt) => {
        this._checkInputvalidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((input) => {
      this._removeInputError(input);
    });
    this._toggleButtonState();
  }
}
