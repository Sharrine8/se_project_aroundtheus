function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.innerText = profileTitleInput.value;
  profileDesc.innerText = profileDescInput.value;
  profileEditModal.classList.remove("modal__open");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  cardImageEl.setAttribute("src", data.link);
  cardTitleEl.textContent = data.name;
  console.log(cardElement);
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

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalClose = document.querySelector("#profile-modal-close");
const profileTitle = document.querySelector("#profile-title");
const profileDesc = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#modal-title-input");
const profileDescInput = document.querySelector("#modal-description-input");
const profileFormElement = document.querySelector("#modal-form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.innerText;
  profileDescInput.value = profileDesc.innerText;
  profileEditModal.classList.add("modal__open");
});

profileModalClose.addEventListener("click", () => {
  profileEditModal.classList.remove("modal__open");
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardListEl.append(cardElement);
});
