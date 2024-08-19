import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Api from "../components/Api.js";
import "./index.css";
import logoImage from "../images/logo.svg";
import {
  settings,
  profileEditButton,
  cardAddButton,
  avatarEditButton,
} from "../utils/constants.js";

//Functions
function handleEditProfileFormSubmit(data) {
  profilePopupForm.renderLoading(true, loadingText);
  api
    .editProfile({ name: data.name, description: data.description })
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        description: res.about,
        avatar: res.avatar,
      });
      profilePopupForm.close();
    })
    .catch(console.error)
    .finally(() => profilePopupForm.renderLoading(false, loadingText));
}

function handleAvatarFormSubmit(data) {
  avatarPopupForm.renderLoading(true, loadingText);
  api
    .updateAvatar(data.image)
    .then(() => {
      avatarPopupForm.close();
      avatarPopupForm.reset();
      userInfo.setAvatar(data.image);
    })
    .catch(console.error)
    .finally(() => avatarPopupForm.renderLoading(false, loadingText));
}

function handleAddProfileFormSubmit(data) {
  addCardPopupForm.renderLoading(true, loadingText);
  api
    .addCard({
      name: data.name,
      link: data.image,
    })
    .then((res) => {
      layerSection.addItem(createCard(res));
      addCardPopupForm.close();
      addCardPopupForm.reset();
      addFormValidator.toggleButtonState();
    })
    .catch(console.error)
    .finally(() => addCardPopupForm.renderLoading(false, loadingText));
}

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleCardImageClick,
    handleCardDelete,
    handleLikeCard,
    handleDeleteModal
  );
  return card.renderCard();
}

function handleCardImageClick(name, link) {
  cardImagePopup.open({ name, link });
}

function handleCardDelete(card) {
  api
    .deleteCard(card._id)
    .then(() => {
      card._cardElement.remove();
      card._cardElement = null;
      deletePopup.close();
    })
    .catch(console.error);
}

function handleDeleteModal(card) {
  deletePopup.open(card);
}

function handleLikeCard(card) {
  if (card._isLiked === false) {
    return api
      .addLike(card._id)
      .then(() => {
        card._isLiked = true;
        card.addLikeButton();
      })
      .catch(console.error);
  } else if (card._isLiked === true) {
    return api
      .removeLike(card._id)
      .then(() => {
        card._isLiked = false;
        card.removeLikeButton();
      })
      .catch(console.error);
  }
}

//Image srcs
const logo = document.getElementById("logo");
logo.src = logoImage;

//Class Instances
const addFormValidator = new FormValidator(settings, "#modal-add-form");
const editFormValidator = new FormValidator(settings, "#modal-edit-form");
const avatarFormValidator = new FormValidator(settings, "#modal-avatar-form");
const layerSection = new Section(
  { items: [], renderer: createCard },
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
const userInfo = new UserInfo(
  "#profile-title",
  "#profile-description",
  "#profile-image"
);
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7c40b814-e707-41cf-959d-91dbc11467c7",
    "Content-Type": "application/json",
  },
});
const deletePopup = new PopupWithConfirm(
  "#delete-card-modal",
  handleCardDelete
);

const avatarPopupForm = new PopupWithForm(
  "#avatar-edit-modal",
  handleAvatarFormSubmit
);

//Eventlisteners
profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profilePopupForm.setInputValues({ name: name, description });
  editFormValidator.resetValidation();
  profilePopupForm.open();
});

cardAddButton.addEventListener("click", () => {
  addCardPopupForm.open();
});

avatarEditButton.addEventListener("click", () => {
  avatarPopupForm.open();
});

//Class calls
addFormValidator.enableValidation();
editFormValidator.enableValidation();
addCardPopupForm.setEventListeners();
profilePopupForm.setEventListeners();
cardImagePopup.setEventListeners();
deletePopup.setEventListeners();
avatarPopupForm.setEventListeners();
avatarFormValidator.enableValidation();

//API Calls
api
  .getUser()
  .then((res) => {
    userInfo.setUserInfo({
      name: res.name,
      description: res.about,
      avatar: res.avatar,
    });
  })
  .catch(console.error);

api
  .getInitialCards()
  .then((res) => {
    layerSection.setItems(res);
    layerSection.renderItems();
  })
  .catch(console.error);
