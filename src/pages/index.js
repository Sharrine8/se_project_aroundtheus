import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Api from "../components/Api.js";
import "./index.css";
import jacquesCousteau from "../images/jacques-cousteau.jpg";
import logoImage from "../images/logo.svg";
import {
  settings,
  profileEditButton,
  cardAddButton,
  avatarEditButton,
} from "../utils/constants.js";

//Functions
function handleEditProfileFormSubmit(data) {
  profilePopupForm.setLoading(true);
  api
    .editProfile({ name: data.name, description: data.description })
    .then((res) => {
      userInfo.setUserInfo({ name: res.name, description: res.about });
    })
    .catch((err) => {
      console.error(err);
    });
  profilePopupForm.close();
  profilePopupForm.setLoading(false);
  return;
}

function handleAvatarFormSubmit(data) {
  console.log(data);
  avatarPopupForm.setLoading(true);
  api
    .updateAvatar(data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error("Error saving avatar:", err);
    })
    .finally(avatarPopupForm.setLoading(false));
  avatarPopupForm.close();
  userInfo.setAvatar(data);
  avatarPopupForm.reset();
}

function handleAddProfileFormSubmit(data) {
  addCardPopupForm.setLoading(true);
  api
    .addCard({
      name: data.name,
      link: data.image,
    })
    .then((res) => {
      layerSection.addItem(createCard(res));
    })
    .catch((err) => {
      console.error(err);
    });
  addCardPopupForm.close();
  addCardPopupForm.reset();
  addFormValidator.toggleButtonState();
  addCardPopupForm.setLoading(false);
  return;
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
    .catch((err) => {
      console.error("Failed to delete card:", err);
    });
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
      .catch((err) => {
        console.error("Error on liking card", err);
      });
  } else if (card._isLiked === true) {
    return api
      .removeLike(card._id)
      .then(() => {
        card._isLiked = false;
        card.removeLikeButton();
      })
      .catch((err) => {
        console.error("Error on unliking", err);
      });
  }
}

//Image srcs
const avatar = document.getElementById("profile-image");
avatar.src = jacquesCousteau;
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
  .then((result) => {
    userInfo.setUserInfo({ name: result.name, description: result.about });
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getInitialCards()
  .then((res) => {
    layerSection.setItems(res);
    layerSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });
