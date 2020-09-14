import initialCards from "./cards.js";
import {
    addButton,
    cardTemplate,
    editButton,
    formElement,
    formPlace,
    info,
    infoInput,
    name,
    nameInput,
    popup,
    popupClose,
    popupImage,
    popupImageClose,
    popupImg,
    popupImgClose,
    popupLink,
    popupName,
    sectionCards
} from "./constants.js";

import {cardFormValidator, editFormValidator} from "./FormValidator.js";


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
    closePopup(popupImage);
}

function deleteElement(e) {
    const element = e.target.closest(".element");
    element.remove();

}

function escHandler(evt) {
    if (evt.key === "Escape") {
        document.querySelector(".popup_is-opened")
            .classList.remove("popup_is-opened");
        document.removeEventListener("keydown", escHandler);
    }
}


function openPopup(elem) {
    elem.classList.add("popup_is-opened");
    document.addEventListener("keydown", escHandler);

}

function closePopup(elem) {
    elem.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", escHandler);

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

formElement.addEventListener("submit", formSubmitHandler);

editButton.addEventListener("click", () => {
    openPopup(popup);
    nameInput.value = name.textContent;
    infoInput.value = info.textContent;
    editFormValidator.enableValidation();


});

popupClose.addEventListener("click", () => closePopup(popup));

formPlace.addEventListener("submit", userCreateElement);

addButton.addEventListener("click", () => openPopup(popupImage));

popupImageClose.addEventListener("click", () => closePopup(popupImage));

popupImgClose.addEventListener("click", () => closePopup(popupImg));


cardFormValidator.enableValidation();
