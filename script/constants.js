const editButton = document.querySelector(".user-info__edit-button");
const popup = document.querySelector(".popup");
const popupUser = document.querySelector(".popup-user");
const popupClose = document.querySelector(".popup__close");
const formPlace = document.querySelector(".popup-image");
const nameInput = document.querySelector(".popup__item_name");
const infoInput = document.querySelector(".popup__item_job");
const name = document.querySelector(".user-info__name");
const info = document.querySelector(".user-info__job");
const formElement = document.querySelector("form");
const addButton = document.querySelector(".user-info__add-button");
const popupImage = document.querySelector(".popup-image");
const popupImageClose = document.querySelector(".popup__image-close");
const popupLink = document.querySelector(".popup__input_type_link-url");
const popupName = document.querySelector(".popup__input_type_name");
const popupImg = document.querySelector(".img-popup");
const popupImgClose = document.querySelector(".img-popup__close");
const sectionCards = document.querySelector(".elements");


const validationSetup = {
    formSelector: ".popup__container",
    inputSelector: ".popup__item",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_disabled",
    inputErrorClass: "popup__span-error",
    errorClass: 'popup__item-error'


};

export {
    sectionCards,
    validationSetup,
    editButton,
    popup,
    popupUser,
    popupClose,
    formPlace,
    nameInput,
    infoInput,
    name,
    info,
    formElement,
    addButton,
    popupImage,
    popupImageClose,
    popupLink,
    popupName,
    popupImg,
    popupImgClose,

};
