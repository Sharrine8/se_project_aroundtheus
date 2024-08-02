export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
  }
  //the open method should be called in the preexisting
  //event handlers in INDEX.JS
  open() {
    //open popup
    console.log("popup open method called");
    this._popupElement.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    //close popup
    console.log("popup close method called");
    this._popupElement.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    //handles logic for closing pop up with esc
    console.log("handleescclose method called");
    evt.preventDefault();
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    //adds a click event listener to the close icon
    //of the popup. Modal window should also close
    //when users click on the shaded area around the
    //form
    console.log("seteventlisteners method called");
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    this._popupElement.addEventListener("click", (e) => {
      e.preventDefault;
      if (e.target === this._popupElement) {
        this.close();
      }
    });
    console.log("event listeners set");
  }
}

//won't instantiate Popup class directly in index.js;
//instead you'll instantiate its children classes
//PopupWithImage and PopupWithForm
