//FormValidator settings
export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//Cards Array
export const initialCards = [
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
export const profileEditButton = document.querySelector("#profile-edit-button");
//Profile
export const profileTitleInput = document.querySelector("#modal-title-input");
export const profileDescInput = document.querySelector(
  "#modal-description-input"
);
//Cards
export const cardListEl = document.querySelector(".cards__list");
//Add Modal
export const cardAddButton = document.querySelector("#profile-add-button");
export const cardAddModal = document.querySelector("#profile-add-modal");
export const cardAddTitleInput = document.querySelector(
  "#modal-add-title-input"
);
export const cardImageInput = document.querySelector("#modal-image-input");
//Image Modal
export const cardImageModalCaption = document.querySelector(".modal__caption");
export const cardImageModalLink = document.querySelector(".modal__image");
