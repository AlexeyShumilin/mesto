const editButton = document.querySelector(".user-info__edit-button");
const popup = document.querySelector(".popup");
const popupUser = document.querySelector(".popup-user");
const formPlace = document.querySelector(".popup-image");
const nameInput = document.querySelector(".popup__item_name");
const infoInput = document.querySelector(".popup__item_job");
const name = document.querySelector(".user-info__name");
const info = document.querySelector(".user-info__job");
const addButton = document.querySelector(".user-info__add-button");
const popupImg = document.querySelector(".img-popup");
const sectionCards = document.querySelector(".elements");
const cardSelector = document.querySelector(".template");
const popupAvatarButton = document.querySelector('.profile__avatar');
const popupSaveButton = document.querySelector('.popup__save');
const avatarInput = document.querySelector('.popup__text_type_avatar');
const popupSubmitButtonAvatar = document.querySelector('.popup__submit');
const popupAvatar = document.querySelector('.popup_type_avatar');



const validationSetup = {
    formSelector: ".popup__container",
    inputSelector: ".popup__item",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_disabled",
    inputErrorClass: "popup__span-error",
    errorClass: 'popup__item-error'


};

export {
    popupAvatar,
    popupSubmitButtonAvatar,
    avatarInput,
    popupSaveButton,
    popupAvatarButton,
    cardSelector,
    sectionCards,
    validationSetup,
    editButton,
    popup,
    popupUser,
    formPlace,
    nameInput,
    infoInput,
    name,
    info,
    addButton,
    popupImg,
};
