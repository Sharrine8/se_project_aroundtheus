class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._title = data.name;
    this._iamge = data.link;
    this._cardSelector = cardSelector;
  }
}
