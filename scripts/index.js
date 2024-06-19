//Functions
function openPopup(popup) {
  popup.classList.add("modal_open");
  document.addEventListener("keydown", handleEscape);
}

function closePopup(popup) {
  popup.classList.remove("modal_open");
  document.removeEventListener("keydown", handleEscape);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_open");
    closePopup(openModal);
  }
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.innerText = profileTitleInput.value;
  profileDesc.innerText = profileDescInput.value;
  closePopup(profileEditModal);
  return;
}

function handleAddProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = cardAddTitleInput.value;
  const link = cardImageInput.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  cardListEl.prepend(cardElement);
  evt.target.reset();
  closePopup(cardAddModal);
  cardAddModalSubmitButton.disabled = true;
  cardAddModalSubmitButton.classList.add("modal__button_disabled");
  return;
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardImageEl.setAttribute("src", data.link);
  cardImageEl.setAttribute("alt", "Picture of " + data.name);
  cardTitleEl.textContent = data.name;
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.addEventListener("click", () => {
    cardImageModalCaption.textContent = data.name;
    cardImageModalLink.setAttribute("src", data.link);
    cardImageModalLink.setAttribute("alt", "Picture of " + data.name);
    openPopup(cardImageModal);
  });
  return cardElement;
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
const profileEditModalClose = document.querySelector(
  "#profile-edit-modal-close"
);
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
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
//Add Modal
const cardAddButton = document.querySelector("#profile-add-button");
const cardAddModal = document.querySelector("#profile-add-modal");
const cardAddModalClose = document.querySelector("#profile-add-modal-close");
const cardAddFormElement = document.forms["modal-add-form"];
const cardAddTitleInput = document.querySelector("#modal-add-title-input");
const cardImageInput = document.querySelector("#modal-image-input");
const cardAddModalSubmitButton = cardAddModal.querySelector(".modal__button");
//Image Modal
const cardLikeButton = document.querySelector(".card__like-button");
const cardImageModal = document.querySelector("#modal-image-popup");
const cardImageModalClose = document.querySelector("#modal-image-close");
const cardImageModalCaption = document.querySelector(".modal__caption");
const cardImageModalLink = document.querySelector(".modal__image");

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.innerText;
  profileDescInput.value = profileDesc.innerText;
  resetValidation(profileEditFormElement, options);
  openPopup(profileEditModal);
});

profileEditFormElement.addEventListener("submit", handleEditProfileFormSubmit);

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardListEl.append(cardElement);
});

cardAddButton.addEventListener("click", () => {
  openPopup(cardAddModal);
});

cardAddFormElement.addEventListener("submit", handleAddProfileFormSubmit);

modalList.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("modal")) {
      closePopup(modal);
    }
  });
});
