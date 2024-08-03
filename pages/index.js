import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

//FormValidator object
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//Functions
// function openPopup(popup) {
//   popup.classList.add("modal_open");
//   document.addEventListener("keydown", handleEscape);
// }

// function closePopup(popup) {
//   popup.classList.remove("modal_open");
//   document.removeEventListener("keydown", handleEscape);
// }

// function handleEscape(evt) {
//   if (evt.key === "Escape") {
//     const openModal = document.querySelector(".modal_open");
//     closePopup(openModal);
//   }
// }

function handleEditProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  profilePopupForm.close();
  return;
}

function handleAddProfileFormSubmit() {
  const name = cardAddTitleInput.value;
  const link = cardImageInput.value;
  const cardElement = createCard({ name, link });
  cardListEl.prepend(cardElement);
  addCardPopupForm.close();
  addFormValidator.toggleButtonState();
  return;
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleCardImageClick);
  return card.renderCard();
}

function handleCardImageClick(name, link) {
  cardImageModalCaption.textContent = name;
  cardImageModalLink.setAttribute("src", link);
  cardImageModalLink.setAttribute("alt", "Picture of " + name);
  cardImagePopup.open({ name, link });
}

//Cards Array
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//Profile Edit Modal
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditFormElement = document.forms["modal-edit-form"];
//Profile
const profileTitle = document.querySelector("#profile-title");
const profileDesc = document.querySelector("#profile-description");
//Modal
const profileTitleInput = document.querySelector("#modal-title-input");
const profileDescInput = document.querySelector("#modal-description-input");
const closeButtons = document.querySelectorAll(".modal__close-button");
const modalList = document.querySelectorAll(".modal");
//Cards
const cardListEl = document.querySelector(".cards__list");
//Add Modal
const cardAddButton = document.querySelector("#profile-add-button");
const cardAddModal = document.querySelector("#profile-add-modal");
const cardAddFormElement = document.forms["modal-add-form"];
const cardAddTitleInput = document.querySelector("#modal-add-title-input");
const cardImageInput = document.querySelector("#modal-image-input");
const cardAddModalSubmitButton = cardAddModal.querySelector(".modal__button");
//Image Modal
const cardImageModal = document.querySelector("#modal-image-popup");
const cardImageModalCaption = document.querySelector(".modal__caption");
const cardImageModalLink = document.querySelector(".modal__image");
//FormValidator Instances
const addFormValidator = new FormValidator(settings, "#modal-add-form");
const editFormValidator = new FormValidator(settings, "#modal-edit-form");
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
console.log(userInfo._description);

// closeButtons.forEach((button) => {
//   const popup = button.closest(".modal");
//   // button.addEventListener("click", () => {
//   //   closePopup(popup);
//   // });
// });

profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescInput.value = description;
  editFormValidator.resetValidation();
  profilePopupForm.open();
});

// profileEditFormElement.addEventListener("submit", handleEditProfileFormSubmit);

initialCards.forEach((data) => {
  const cardElement = createCard(data);
  cardListEl.append(cardElement);
});

cardAddButton.addEventListener("click", () => {
  addCardPopupForm.open();
});

// cardAddFormElement.addEventListener("submit", handleAddProfileFormSubmit);

// modalList.forEach((modal) => {
//   // modal.addEventListener("mousedown", (e) => {
//   //   if (e.target.classList.contains("modal")) {
//   //     closePopup(modal);
//   //   }
//   // });
// });

addFormValidator.enableValidation();
editFormValidator.enableValidation();
addCardPopupForm.setEventListeners();
profilePopupForm.setEventListeners();
cardImagePopup.setEventListeners();
