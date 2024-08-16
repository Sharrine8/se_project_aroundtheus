export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._card = cardSelector;
    this._handleImageClick = handleImageClick;
    this._id = data._id;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", this._handleLikeIcon);
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", this.handleDeleteCard);
    this._imageElement.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  handleDeleteCard = () => {
    // this._deleteButton = this._cardElement.querySelector(
    //   ".card__delete-button"
    // );
    // this._popup = document.getElementById("delete-card-modal");
    // this._popup.classList.add("modal_open");
    this._cardElement.remove();
    this._cardElement = null;
  };

  _handleLikeIcon = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  renderCard() {
    this._cardElement = document
      .querySelector(this._card)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._imageElement = this._cardElement.querySelector(".card__image");
    this._imageElement.setAttribute("src", this._link);
    this._imageElement.setAttribute("alt", "Picture of " + this._name);
    this._setEventListeners();
    return this._cardElement;
  }
}
