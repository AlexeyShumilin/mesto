import './index.css';

import {initialCards} from "../script/utils/initialCards.js";
import Section from '../script/components/Section.js';
import Card from '../script/components/Card.js';
import UserInfo from '../script/components/UserInfo.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import FormValidator from '../script/components/FormValidator.js';

import {
    addButton,
    cardSelector,
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


const popupWithImage = new PopupWithImage(popupImg);

function generateCard(cardItem) {

    const card = new Card({
        data: cardItem,
        handleImageClick: function () {
            popupWithImage.open(cardItem);
            popupWithImage.setEventListeners();
        }
    }, cardSelector);
    return card.createCard();
}

const cardList = new Section({
    items: initialCards,
    renderer: function (cardItem) {
        const cardElement = generateCard(cardItem);
        this.addItem(cardElement, initialCards);
    }
}, sectionCards);
cardList.render();

const cardPopupWithForm = new PopupWithForm(formPlace, {
    submitCallback: function (formData) {

        const cardElement = generateCard(formData);
        cardList.addItem(cardElement);
        cardPopupWithForm.close();
    }
});

const user = new UserInfo({
    nameSelector: name,
    jobSelector: info
});


const editPopupWithForm = new PopupWithForm(popupUser, {
    submitCallback(data) {
        user.setUserInfo(data);
        editPopupWithForm.close();
    }
});

const editFormValidator = new FormValidator(validationSetup, popupUser);
const cardFormValidator = new FormValidator(validationSetup, formPlace);


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
