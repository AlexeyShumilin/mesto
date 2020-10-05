import './index.css';

import {initialCards} from "../script/utils/initialCards.js";
import Section from '../script/components/Section.js';
import Card from '../script/components/Card.js';
import UserInfo from '../script/components/UserInfo.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import FormValidator from '../script/components/FormValidator.js';

import {
    cardSelector,
    addButton,
    editButton,
    formPlace,
    info,
    infoInput,
    name,
    nameInput,
    popupImg,
    popupUser,
    sectionCards,
    validationSetup
} from "../script/utils/constants.js";



const cardList = new Section({
        items: initialCards,
        renderer: (cardItem) => {
            const card = new Card({
                data: cardItem,
                handleImageClick: () => {
                    const popupWithImage = new PopupWithImage(popupImg);
                    popupWithImage.open(cardItem);
                    popupWithImage.setEventListeners();
                }
            }, cardSelector);

            const cardElement = card.createCard();
            cardList.addItem(cardElement);
        },
    },
    sectionCards
);

const cardPopupWithForm = new PopupWithForm(formPlace, {
    submitCallback: function (formData) {
        const card = new Card({
            data: formData,
            handleImageClick: () => {
                const popupWithImage = new PopupWithImage(popupImg);
                popupWithImage.open(formData);
                popupWithImage.setEventListeners();
            }
        }, cardSelector);

        const cardElement = card.createCard();
        cardList.addItem(cardElement);
        cardPopupWithForm.close();
    }
});

const user = new UserInfo({
    nameSelector: name,
    jobSelector: info
});


const editPopupWithForm = new PopupWithForm(popupUser, {
    submitCallback(formData) {
        user.setUserInfo(formData);
        editPopupWithForm.close();
    }
});

const editFormValidator = new FormValidator(validationSetup, popupUser);
const cardFormValidator = new FormValidator(validationSetup, formPlace);


cardList.render(initialCards);
cardPopupWithForm.setEventListeners();
editPopupWithForm.setEventListeners();


addButton.addEventListener('click', () => {
    cardFormValidator.enableValidation();
    cardPopupWithForm.open();
});

editButton.addEventListener('click', () => {
    const userInfo = user.getUserInfo();
    nameInput.value = userInfo.name;
    infoInput.value = userInfo.job;
    editFormValidator.enableValidation();
    editPopupWithForm.open();
});