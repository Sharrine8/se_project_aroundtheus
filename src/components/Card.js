export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleCardDelete,
    handleLikeCard
  ) {
    this._name = data.name;
    this._link = data.link;
    this._card = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeCard = handleLikeCard;
    this._data = data;
    this._id = data._id;
    this._isLiked = data.isLiked;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard(this);
    });
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", this.handleDeleteCard);
    this._imageElement.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  handleDeleteCard = () => {
    this._handleCardDelete(this._data._id, this._cardElement);
  };

  addLikeButton() {
    this._likeButton.classList.add("card__like-button_active");
  }

  removeLikeButton() {
    this._likeButton.classList.remove("card__like-button_active");
  }

  setLikeButtonState() {
    if (this._isLiked) {
      this.addLikeButton();
    }
  }

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
    this.setLikeButtonState();
    return this._cardElement;
  }
}
