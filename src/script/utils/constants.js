const editButton = document.querySelector(".user-info__edit-button");
const popup = document.querySelector(".popup");
const popupUser = document.querySelector(".popup-user");
const popupUserSaveButton = popupUser.querySelector('.popup__save');
const formPlace = document.querySelector(".popup-image");
const formPlaceSubmitButton = formPlace.querySelector(".popup__save");
const nameInput = document.querySelector(".popup__item_name");
const infoInput = document.querySelector(".popup__item_job");
const name = document.querySelector(".user-info__name");
const about = document.querySelector(".user-info__about");
const addButton = document.querySelector(".user-info__add-button");
const popupImg = document.querySelector(".img-popup");
const sectionCards = document.querySelector(".elements");
const cardSelector = document.querySelector('#place-card').content;
const popupAvatarButton = document.querySelector('.profile__avatar');
const popupSubmit = document.querySelector('.submit-popup');

const popupAvatar = document.querySelector('.avatar-popup');
const avatarInput = popupAvatar.querySelector('.popup__Item_type_avatar');
const popupSubmitButtonAvatar = popupAvatar.querySelector('.popup__save');

const validationContainers = Array.from(document.querySelectorAll('.popup__container'));


const validationSetup = {
    formSelector: ".popup__container",
    inputSelector: ".popup__item",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_disabled",
    inputErrorClass: "popup__span-error",
    errorClass: 'popup__error_visible'
};

export {
    validationContainers,
    formPlaceSubmitButton,
    popupSubmit,
    popupAvatar,
    popupSubmitButtonAvatar,
    avatarInput,
    popupUserSaveButton,
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
    about,
    addButton,
    popupImg,
};
