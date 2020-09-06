import initialCards from "./cards.js";

const editButton = document.querySelector(".user-info__edit-button");
const popup = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__close");
const formPlace = document.querySelector(".popup-add__place");
const nameInput = document.querySelector(".popup__item_name");
const infoInput = document.querySelector(".popup__item_job");
const name = document.querySelector(".user-info__name");
const info = document.querySelector(".user-info__job");
const formElement = document.querySelector("form");
const sectionCards = document.querySelector(".elements");
const addButton = document.querySelector(".user-info__add-button");
const popupImage = document.querySelector(".popup-image");
const popupImageClose = document.querySelector(".popup__image-close");
const popupLink = document.querySelector(".popup__input_type_link-url");
const popupName = document.querySelector(".popup__input_type_name");
const popupImg = document.querySelector(".img-popup");
const popupImgClose = document.querySelector(".img-popup__close");
const cardTemplate = document.querySelector("#template").content;


const getCard = (item) => {
    const cardsItem = cardTemplate.cloneNode(true);
    const cardTitle = cardsItem.querySelector(".element__title");
    const cardImg = cardsItem.querySelector(".element__image");
    cardTitle.textContent = item.name;
    cardImg.src = item.link;
    cardImg.alt = item.name;

    cardsItem
        .querySelector(".element__delete-icon")
        .addEventListener("click", deleteElement);
    cardsItem
        .querySelector(".element__like")
        .addEventListener("click", handleLikeIcon);

    cardImg.addEventListener("click", openPhoto);


    return cardsItem;
};

function openPhoto(evt) {
    const photo = evt.target;
    popupImg.querySelector(".img-popup__place").src = photo.src;
    popupImg.querySelector(".img-popup__caption").textContent = photo.alt;
    popupImg.querySelector(".img-popup__place").alt = photo.alt;
    openPopup(popupImg);
}

function renderCard(item) {
    const element = getCard(item);
    sectionCards.prepend(element);
}

function handleLikeIcon(evt) {
    evt.target.classList.toggle("element__like_active");
}

initialCards.forEach((item) => {
    renderCard(item);
});

function userCreateElement(evt) {
    evt.preventDefault();
    const element = {};
    element.name = popupName.value;
    element.link = popupLink.value;
    renderCard(element);
    openPopup(popupImage);
}

function deleteElement(e) {
    const element = e.target.closest(".element");
    element.remove();

}
<<<<<<< HEAD

function escHandler(evt) {
    if (evt.key === "Escape") {
        document
            .querySelector(".popup_is-opened")
            .classList.remove("popup_is-opened");
    }
}

=======
function escHandler(evt) {
  if (evt.key === "Escape") {
    document
        .querySelector(".popup_is-opened")
        .classList.remove("popup_is-opened");
  }
}
>>>>>>> parent of 2919f70... esc handler

function openPopup(elem) {
    elem.classList.add("popup_is-opened");
    document.addEventListener("keydown", escHandler);
}

<<<<<<< HEAD
function closePopup(elem) {
    elem.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", escHandler);

=======
function togglePopup(elem) {
  elem.classList.toggle("popup_is-opened");
  nameInput.value = name.textContent;
  infoInput.value = info.textContent;
  document.addEventListener("keydown", escHandler);
  document.removeEventListener("keydown", escHandler);
>>>>>>> parent of 2919f70... esc handler
}


function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    info.textContent = infoInput.value;
    closePopup(popup);
}


document.addEventListener("click", function (evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closePopup(evt.target);
        evt.stopPropagation();
    }
});

document.addEventListener("click", function (evt) {
  evt.target.classList.remove("popup_is-opened");
  evt.stopPropagation();
});

formElement.addEventListener("submit", formSubmitHandler);

editButton.addEventListener("click", () => {
    openPopup(popup);
    nameInput.value = name.textContent;
    infoInput.value = info.textContent;
});

popupClose.addEventListener("click", () => closePopup(popup));

formPlace.addEventListener("submit", userCreateElement);

addButton.addEventListener("click", () => openPopup(popupImage));

popupImageClose.addEventListener("click", () => closePopup(popupImage));

popupImgClose.addEventListener("click", () => closePopup(popupImg));
