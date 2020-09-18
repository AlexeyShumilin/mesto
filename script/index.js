import {
    popupUser,
    addButton,
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
    sectionCards,
} from "./constants.js";
import {Card} from "./Card.js";
import {cardFormValidator, editFormValidator,} from "./FormValidator.js";
import {initialCards} from "./initialCards.js";


function userCreateElement(evt) {
    evt.preventDefault();
    renderCard([{
        name: popupName.value,
        link: popupLink.value
    }]);
    closePopup(popupImage);
    popupName.value = '';
    popupLink.value = '';
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
    closePopup(popupUser);
}


document.addEventListener("click", function (evt) {
    if (!evt.target.classList.contains('popup_is-opened')) {
        return;
    }
    closePopup(evt.target);
    evt.stopPropagation();
});

formElement.addEventListener("submit", formSubmitHandler);

editButton.addEventListener("click", () => {
    const inputEvent = new CustomEvent('input');
    nameInput.value = name.textContent;
    nameInput.dispatchEvent(inputEvent);
    infoInput.value = info.textContent;
    infoInput.dispatchEvent(inputEvent);
    openPopup(popupUser);
});

function renderCard(card) {
    card.forEach((data) => {
        const card = new Card(data, '.template');
        const cardElement = card.createCard();
        sectionCards.prepend(cardElement);
    });
}

renderCard(initialCards);

popupClose.addEventListener("click", () => closePopup(popup));

formPlace.addEventListener("submit", userCreateElement);

addButton.addEventListener("click", () => openPopup(popupImage));

popupImageClose.addEventListener("click", () => closePopup(popupImage));

popupImgClose.addEventListener("click", () => closePopup(popupImg));

cardFormValidator.enableValidation();
editFormValidator.enableValidation();

export {openPopup};
