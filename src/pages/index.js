
import {
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
    popupUser,
    sectionCards,
} from "../script/constants.js";
import {Card} from "../script/components/Card.js";
import {cardFormValidator, editFormValidator,} from "../script/components/FormValidator.js";
import {initialCards} from "../script/initialCards.js";


function userCreateElement(evt) {
    evt.preventDefault();
    renderCard({
        name: popupName.value,
        link: popupLink.value
    });
    closePopup(popupImage);

}


function escHandler(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector('.popup_is-opened'));
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

function renderCard(data) {

    const card = new Card(data, '.template');
    const cardElement = card.createCard();
    sectionCards.prepend(cardElement);

}

initialCards.forEach(renderCard);


popupClose.addEventListener("click", () => closePopup(popup));

formPlace.addEventListener("submit", userCreateElement);

addButton.addEventListener("click", () => openPopup(popupImage));

popupImageClose.addEventListener("click", () => closePopup(popupImage));

popupImgClose.addEventListener("click", () => closePopup(popupImg));

cardFormValidator.enableValidation();
editFormValidator.enableValidation();

export {openPopup};