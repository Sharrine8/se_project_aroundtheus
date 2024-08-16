import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
}
