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
  formValidators,
} from "../utils/constants.js";

//Validation
const enableValidation = (config) => {
  const formList = [...document.querySelectorAll(config.formSelector)];
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, `#${formElement.id}`);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);

//Functions
function handleSubmit(request, popupInstance, loadingText = "Saving...") {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch(console.error)
    .finally(() => {
      popupInstance.renderLoading(false, loadingText);
    });
}

function handleEditProfileFormSubmit(data) {
  function makeRequest() {
    return api
      .editProfile({ name: data.name, description: data.description })
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          description: res.about,
          avatar: res.avatar,
        });
      });
  }
  handleSubmit(makeRequest, profilePopupForm);
}

function handleAvatarFormSubmit(data) {
  function makeRequest() {
    return api.updateAvatar(data.image).then(() => {
      userInfo.setAvatar(data.image);
      avatarPopupForm.reset();
      formValidators["avatarPopupForm"].toggleButtonState();
    });
  }
  handleSubmit(makeRequest, avatarPopupForm);
}

function handleAddProfileFormSubmit(data) {
  function makeRequest() {
    return api.addCard({ name: data.name, link: data.image }).then((res) => {
      layerSection.addItem(createCard(res));
      addCardPopupForm.reset();
      formValidators["addCardPopupForm"].toggleButtonState();
    });
  }
  handleSubmit(makeRequest, addCardPopupForm);
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
    .deleteCard(card.id)
    .then(() => {
      card.cardElement.remove();
      card.cardElement = null;
      deletePopup.close();
    })
    .catch(console.error);
}

function handleDeleteModal(card) {
  deletePopup.open(card);
}

function handleLikeCard(card) {
  if (card.isLiked === false) {
    return api
      .addLike(card.id)
      .then(() => {
        card.isLiked = true;
        card.addLikeButton();
      })
      .catch(console.error);
  } else if (card.isLiked === true) {
    return api
      .removeLike(card.id)
      .then(() => {
        card.isLiked = false;
        card.removeLikeButton();
      })
      .catch(console.error);
  }
}

//Image srcs
const logo = document.getElementById("logo");
logo.src = logoImage;

//Class Instances
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
  formValidators["profilePopupForm"].resetValidation();
  profilePopupForm.open();
});

cardAddButton.addEventListener("click", () => {
  addCardPopupForm.open();
});

avatarEditButton.addEventListener("click", () => {
  avatarPopupForm.open();
});

//Class calls
addCardPopupForm.setEventListeners();
profilePopupForm.setEventListeners();
cardImagePopup.setEventListeners();
deletePopup.setEventListeners();
avatarPopupForm.setEventListeners();

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
