import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputValues = [...document.querySelectorAll(".modal__input")];
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValue() {
    //collects data from all input fields and returns it as an
    //object. This data should then be passed to the submission
    //handler as an argument
    this._inputData = {};
    this._inputValues.forEach((input) => {
      this._inputData[input.name] = input.value;
    });
    return this._inputData;
  }

  setEventListeners() {
    //overrides parent method; should add a submit event listener
    //to the form and call the setEventListeners() method
    //of the parent class
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValue());
    });
  }
}

//create an instance of the PopupWithForm for each popup
//that contains a form and call their setEventListeners()
