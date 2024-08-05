import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputValues = [...this._popupForm.querySelectorAll(".modal__input")];
    this._popup = document.querySelector(popupSelector);
  }

  _getInputValue() {
    this._inputData = {};
    this._inputValues.forEach((input) => {
      this._inputData[input.name] = input.value;
    });
    return this._inputData;
  }

  setInputValues(data) {
    this._inputValues.forEach((input) => {
      input.value = data[input.name];
    });
  }

  reset() {
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValue());
    });
  }
}
