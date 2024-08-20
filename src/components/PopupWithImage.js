import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePreview = this._popupElement.querySelector(".modal__image");
    this._imageCaption = this._popupElement.querySelector(".modal__caption");
  }

  open({ name, link }) {
    this._imagePreview.src = link;
    this._imagePreview.alt = `Picture of ${name}`;
    this._imageCaption.textContent = name;
    super.open();
  }
}
