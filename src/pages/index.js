import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import "./index.css";
import jacquesCousteau from "../images/jacques-cousteau.jpg";
import logoImage from "../images/logo.svg";
import {
  settings,
  profileEditButton,
  cardAddButton,
} from "../utils/constants.js";

//Functions
function handleEditProfileFormSubmit(data) {
  api
    .editProfile({ name: data.name, description: data.description })
    .then((res) => {
      userInfo.setUserInfo({ name: res.name, description: res.about });
    })
    .catch((err) => {
      console.error(err);
    });
  profilePopupForm.close();
  return;
}

function handleAddProfileFormSubmit(data) {
  api
    .addCard({
      name: data.name,
      link: data.image,
    })
    .then((res) => {
      console.log(res);
      layerSection.addItem(createCard(res));
    })
    .catch((err) => {
      console.error(err);
    });
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
const userInfo = new UserInfo("#profile-title", "#profile-description");
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7c40b814-e707-41cf-959d-91dbc11467c7",
    "Content-Type": "application/json",
  },
});

profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profilePopupForm.setInputValues({ name: name, description });
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

// api
//   .deleteCard()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

//delete card modal test
function handleCardDelete(cardId, container) {
  if (confirm("Are you sure you want to delete this card?")) {
    api
      .deleteCard(cardId)
      .then(() => {
        container.remove();
        container = null;
      })
      .catch((err) => {
        console.error("Failed to delete card:", err);
      });
  }
}
