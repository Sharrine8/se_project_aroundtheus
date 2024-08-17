import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._confirmBtn = this._popup.querySelector(".modal__button");
    this._handleFormSubmit = handleFormSubmit;
  }

  open(card) {
    this.card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmBtn.addEventListener("click", (e) => {
      this._handleFormSubmit(this.card);
    });
  }
}
