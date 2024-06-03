function toggleEditModal() {
  profileEditModal.classList.toggle("modal_open");
  return;
}

function toggleAddModal() {
  cardAddModal.classList.toggle("modal_open");
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.innerText = profileTitleInput.value;
  profileDesc.innerText = profileDescInput.value;
  toggleEditModal();
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
  cardAddTitleInput.value = "";
  cardImageInput.value = "";
  toggleAddModal();
  return;
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardImageEl.setAttribute("src", data.link);
  cardImageEl.setAttribute("alt", "Picture of " + data.name);
  cardTitleEl.textContent = data.name;
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });
  return cardElement;
}

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
//Cards
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
//Add Add Modal
const cardAddButton = document.querySelector("#profile-add-button");
const cardAddModal = document.querySelector("#profile-add-modal");
const cardAddModalClose = document.querySelector("#profile-add-modal-close");
const cardAddFormElement = document.forms["modal-add-form"];
const cardAddTitleInput = document.querySelector("#modal-add-title-input");
const cardImageInput = document.querySelector("#modal-image-input");

const cardLikeButton = document.querySelector(".card__like-button");

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.innerText;
  profileDescInput.value = profileDesc.innerText;
  toggleEditModal();
});

profileEditModalClose.addEventListener("click", () => {
  toggleEditModal();
});

profileEditFormElement.addEventListener("submit", handleEditProfileFormSubmit);

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardListEl.append(cardElement);
});

cardAddButton.addEventListener("click", () => {
  toggleAddModal();
});

cardAddModalClose.addEventListener("click", () => {
  toggleAddModal();
});

cardAddFormElement.addEventListener("submit", handleAddProfileFormSubmit);
