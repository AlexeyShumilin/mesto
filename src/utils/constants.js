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
const popupavatarButton = document.querySelector('.profile__avatar');
const popupSubmit = document.querySelector('.submit-popup');

const popupavatar = document.querySelector('.avatar-popup');
const avatarInput = popupavatar.querySelector('.popup__Item_type_avatar');
const popupSubmitButtonAvatar = popupavatar.querySelector('.popup__save');

const validationConteiners = Array.from(document.querySelectorAll('.popup__container'));


const validationSetup = {
    formSelector: ".popup__container",
    inputSelector: ".popup__item",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_disabled",
    inputErrorClass: "popup__span-error",
    errorClass: 'popup__error_visible'
};

export {
    validationConteiners,
    formPlaceSubmitButton,
    popupSubmit,
    popupavatar,
    popupSubmitButtonAvatar,
    avatarInput,
    popupUserSaveButton,
    popupavatarButton,
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
