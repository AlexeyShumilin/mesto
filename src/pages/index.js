<<<<<<< HEAD
import './index.css';

import {initialCards} from "../script/utils/initialCards.js";
import Section from '../script/components/Section.js';
import Card from '../script/components/Card.js';
import UserInfo from '../script/components/UserInfo.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import FormValidator from '../script/components/FormValidator.js';
=======
//import './index.css';
import Section         from '../script/components/Section.js';
import Card            from '../script/components/Card.js';
import UserInfo        from '../script/components/UserInfo.js';
import PopupWithImage  from '../script/components/PopupWithImage.js';
import PopupWithForm   from '../script/components/PopupWithForm.js';
import FormValidator   from '../script/components/FormValidator.js';
import Api             from "../script/components/Api.js";
import PopupWithSubmit from "../script/components/PopupWithSubmit.js";
>>>>>>> parent of 7405a3a... finish work 9 first rewiew

import {
    addButton,
    cardSelector,
    editButton,
    formPlace,
    info,
    infoInput,
    name,
    nameInput,
<<<<<<< HEAD
=======
    popupavatar,
    popupavatarButton,
>>>>>>> parent of 7405a3a... finish work 9 first rewiew
    popupImg,
    popupUser,
    sectionCards,
<<<<<<< HEAD
=======
    validationConteiners,
>>>>>>> parent of 7405a3a... finish work 9 first rewiew
    validationSetup
} from "../script/utils/constants.js";


const popupWithImage = new PopupWithImage(popupImg);

function generateCard(cardItem) {

<<<<<<< HEAD
    const card = new Card({
        data: cardItem,
        handleImageClick: function () {
            popupWithImage.open(cardItem);
            popupWithImage.setEventListeners();
        }
    }, cardSelector);
    return card.createCard();
=======

// экземпляр класса PopupWithForm для  редактирования профиля
const userDataForm = new PopupWithForm(popupUser, {
    submitCallback(userInfo) {
        renderLoading(true, popupUserSaveButton)
        api.editProfileInfo({name: userInfo.name, about: userInfo.about})
            .then((data) => {
                userData.setUserInfo({userName: data.name, userDescription: data.about})
                userDataForm.close();
            })
            .catch(err => console.log(err))
            .finally(() => renderLoading(false, popupUserSaveButton));
    }
});
const user = {
    nameInfoElement: name,
    aboutInfoElement: about,
>>>>>>> parent of 7405a3a... finish work 9 first rewiew
}

const cardList = new Section({
    items: initialCards,
    renderer: function (cardItem) {
        const cardElement = generateCard(cardItem);
        this.addItem(cardElement, initialCards);
    }
}, sectionCards);
cardList.render();

<<<<<<< HEAD
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
=======
//при открытии формы редактирования пользователя читаем данные со страницы, заполняем поля ввода формы
const openUserInfoForm = () => {
    const userInfo = userData.getUserInfo();
    nameInput.value = userInfo.userName;
    infoInput.value = userInfo.userDescription;
    userDataForm.open();
}

//Создание попапа для аватара
const avatarEditForm = new PopupWithForm(popupavatar, {
    submitCallback: () => {
        renderLoading(true, popupSubmitButtonAvatar);
        api.editAvatar(avatarInput.value)
            .then(data => {
                popupavatarButton.style.backgroundImage = `url('${data.avatar}')`;
                avatarEditForm.close();
            })
            .catch(err => console.log(err))
            .finally(() => renderLoading(false, popupSubmitButtonAvatar));
    }
});

const popupWithImage = new PopupWithImage(popupImg);
//создаем экземпляр класса PopupWithImage


//создаем экземпляр класса Section
const section = new Section(
    {
        renderer: item => {
            section.addItem(createCard(item));
        }
    },
    sectionCards
);

//функция создания новой карточки
const createCard = item => {
    const newCard = new Card(
        {
            data: item,
            handleCardClick: () => popupWithImage.open(item)
        },
        userId,
        cardSelector,

        (item) => {
            api.setLike(item._id)
                .then((res) => {
                    item.updateLikes(true, res.likes)
                })
                .catch((err) => console.log(err));
        },
        (item) => {
            api.removeLike(item._id)
                .then((res) => {
                    item.updateLikes(false, res.likes)
                })
                .catch((err) => console.log(err))
        },
        (item) => cardDeleteSubmit.open(item))

    return newCard.createCard();
}

//создаем экземпляр класса PopupWithForm для формы добавления карточки

const imageAddForm = new PopupWithForm(formPlace,
    {
        submitCallback: (imageInfo) => {
            renderLoading(true, formPlaceSubmitButton);
            api.createNewCard(imageInfo)
                .then((data) => {
                    section.addItem(createCard(data))
                    imageAddForm.close();
                })
                .catch(err => console.log(err))
                .finally(() => renderLoading(false, formPlaceSubmitButton));
        }
    }
);


//Создаем экземпляр класса для подтверждения удаления карточки

const cardDeleteSubmit = new PopupWithSubmit(popupSubmit, {
    submitCallback: (item) =>
        api.deleteCard(item._id)
            .then(() => {
                item.handleDeleteCard();
                cardDeleteSubmit.close();
            })
            .catch((err) => console.log(err))
>>>>>>> parent of 7405a3a... finish work 9 first rewiew
});

const editFormValidator = new FormValidator(validationSetup, popupUser);
const cardFormValidator = new FormValidator(validationSetup, formPlace);

<<<<<<< HEAD

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
=======
Promise.all([
    api.getProfileInfo(),
    api.getInitialCards()
])
    .then(values => {
        const [userInfo, cards] = values;
        userData.setUserInfo({userName: userInfo.name, userDescription: userInfo.about});
        userId = userInfo._id;
        popupavatarButton.style.backgroundImage = `url('${userInfo.avatar}')`;//записываем свой id в переменную
        section.renderItems(cards.reverse());
    })
    .catch(err => {
        console.log(err);
    });

validationConteiners.forEach(formElement => {
    const newValidator = new FormValidator(validationSetup, formElement);
    newValidator.enableValidation();                                                                //включаем валидацию формы
});

avatarEditForm.setEventListeners();
userDataForm.setEventListeners();
popupWithImage.setEventListeners();
imageAddForm.setEventListeners();
cardDeleteSubmit.setEventListeners();

addButton.addEventListener('click', () => imageAddForm.open());
editButton.addEventListener('click', openUserInfoForm);
popupavatarButton.addEventListener('click', () => avatarEditForm.open());
>>>>>>> parent of 7405a3a... finish work 9 first rewiew
