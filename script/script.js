const editButton = document.querySelector(".user-info__edit-button");
const popup = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__close");
const nameInput = document.querySelector(".popup__item_name");
const infoInput = document.querySelector(".popup__item_job");
const name = document.querySelector(".user-info__name");
const info = document.querySelector(".user-info__job");
const formElement = document.querySelector("form");
const cards = document.querySelector(".elements");
const addButton = document.querySelector(".user-info__add-button");
const popupImage = document.querySelector(".popup-image");
const popupImageClose = document.querySelector(".popup__image-close");
const popupLink = document.querySelector(".popup__input_type_link-url");
const popupName = document.querySelector(".popup__input_type_name");
const formPlace = document.querySelector(".popup-add__place");
const popupImg = document.querySelector(".img-popup");
const popupImgClose = document.querySelector(".img-popup__close");
const template = document.querySelector("#template").content;

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createElement(item) {
  const cardsItem = template.cloneNode(true);
  const cardDelete = cardsItem.querySelector(".element__delete-icon");
  const likeButton = cardsItem.querySelector(".element__like");
  const cardImg = cardsItem.querySelector(".element__image");
  const cardTitle = cardsItem.querySelector(".element__title");

  cardImg.src = item.link;
  cardImg.alt = item.name;
  cardTitle.textContent = item.name;

  cardImg.addEventListener("click", function openPhoto(evt) {
    const photo = evt.target;
    popupImg.querySelector(".img-popup__place").src = photo.src;
    popupImg.querySelector(".img-popup__caption").textContent = photo.alt;
    togglePopup(popupImg);
  });

  cardDelete.addEventListener("click", function (evt) {
    evt.target.parentElement.remove();
  });

  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like_active");
  });

  cards.prepend(cardsItem);
}

initialCards.forEach(createElement);

function userCreateElement(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = popupName.value;
  newCard.link = popupLink.value;
  createElement(newCard);
  togglePopup(popupImage);
}

function togglePopup(elem) {
  elem.classList.toggle("popup_is-opened");
  nameInput.value = name.textContent;
  infoInput.value = info.textContent;
  document.addEventListener("keydown", escHandler);
  document.removeEventListener("keydown", escHandler);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  info.textContent = infoInput.value;
  togglePopup(popup);
}

function escHandler(evt) {
  if (evt.key === "Escape") {
    document
      .querySelector(".popup_is-opened")
      .classList.remove("popup_is-opened");
  }
}

document.addEventListener("click", function (evt) {
  evt.target.classList.remove("popup_is-opened");
  evt.stopPropagation();
});

formElement.addEventListener("submit", formSubmitHandler);

editButton.addEventListener("click", () => togglePopup(popup));

popupClose.addEventListener("click", () => togglePopup(popup));

formPlace.addEventListener("submit", userCreateElement);

addButton.addEventListener("click", () => togglePopup(popupImage));

popupImageClose.addEventListener("click", () => togglePopup(popupImage));

popupImgClose.addEventListener("click", () => togglePopup(popupImg));
