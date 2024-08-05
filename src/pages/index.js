import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import "./index.css";
import jacquesCousteau from "../images/jacques-cousteau.jpg";
import logoImage from "../images/logo.svg";
import {
  settings,
  initialCards,
  profileEditButton,
  cardAddButton,
} from "../utils/constants.js";

//Functions
function handleEditProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  profilePopupForm.close();
  return;
}

function handleAddProfileFormSubmit(data) {
  const name = data.name;
  const link = data.image;
  const cardElement = createCard({ name, link });
  layerSection.addItem(cardElement);
  addCardPopupForm.close();
  addCardPopupForm.reset();
  addFormValidator.toggleButtonState();
  return;
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleCardImageClick);
  return card.renderCard();
}

function handleCardImageClick(name, link) {
  cardImagePopup.open({ name, link });
}

//Image srcs
const avatar = document.getElementById("profile-image");
avatar.src = jacquesCousteau;
const logo = document.getElementById("logo");
logo.src = logoImage;
//Class Instances
const addFormValidator = new FormValidator(settings, "#modal-add-form");
const editFormValidator = new FormValidator(settings, "#modal-edit-form");
const layerSection = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);
const profilePopupForm = new PopupWithForm(
  "#profile-edit-modal",
  handleEditProfileFormSubmit
);
const addCardPopupForm = new PopupWithForm(
  "#profile-add-modal",
  handleAddProfileFormSubmit
);
const cardImagePopup = new PopupWithImage("#modal-image-popup");
const userInfo = new UserInfo("#profile-title", "#profile-description");

profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profilePopupForm.setInputValues({ title: name, description });
  editFormValidator.resetValidation();
  profilePopupForm.open();
});

cardAddButton.addEventListener("click", () => {
  addCardPopupForm.open();
});

addFormValidator.enableValidation();
editFormValidator.enableValidation();
addCardPopupForm.setEventListeners();
profilePopupForm.setEventListeners();
cardImagePopup.setEventListeners();
layerSection.renderItems();
