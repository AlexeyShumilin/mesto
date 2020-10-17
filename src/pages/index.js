import './index.css';
import Section         from '../components/Section.js';
import Card            from '../components/Card.js';
import UserInfo        from '../components/UserInfo.js';
import PopupWithImage  from '../components/PopupWithImage.js';
import PopupWithForm   from '../components/PopupWithForm.js';
import FormValidator   from '../components/FormValidator.js';
import Api             from "../components/Api.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";

import {
    about,
    addButton,
    avatarInput,
    cardSelector,
    editButton,
    formPlace,
    formPlaceSubmitButton,
    infoInput,
    name,
    nameInput,
    popupavatar,
    popupavatarButton,
    popupImg,
    popupSubmit,
    popupSubmitButtonAvatar,
    popupUser,
    popupUserSaveButton,
    sectionCards,
    validationConteiners,
    validationSetup
} from "../utils/constants.js";

let userId = '';

//создание класса API
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
    headers: {
        authorization: '27419946-4fff-4784-a16e-1161591c67a2',
        'Content-Type': 'application/json'
    }
});

//функция  для указания загрузки с сервера
function renderLoading(isLoading, submitButton) {
    submitButton.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}


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
    userAvatar: popupavatarButton
}

const userData = new UserInfo(user);

//при открытии формы редактирования пользователя читаем данные со страницы, заполняем поля ввода формы
const openUserInfoForm = () => {
    const userInfo = userData.getUserInfo();
    nameInput.value = userInfo.userName;
    infoInput.value = userInfo.userDescription;
    userDataForm.open();
}

//Создание попапа для аватара
const avatarEditForm = new PopupWithForm(popupavatar, {
    submitCallback() {
        renderLoading(true, popupSubmitButtonAvatar,);
        api
            .editAvatar(avatarInput.value)
            .then(data=> {
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
});


Promise.all([
    api.getProfileInfo(),
    api.getInitialCards()
])
    .then(values => {
        const [userInfo, cards ] = values;
        userData.setUserInfo({userName: userInfo.name, userDescription: userInfo.about,});
        userId = userInfo._id;
        popupavatarButton.style.backgroundImage = `url('${userInfo.avatar}')`;
        section.renderItems(cards.reverse());
    })
    .catch(err => {
        console.log(err);
    });

//включаем валидацию формы
validationConteiners.forEach(formElement => {
    const newValidator = new FormValidator(validationSetup, formElement);
    newValidator.enableValidation();
});

avatarEditForm.setEventListeners();
userDataForm.setEventListeners();
popupWithImage.setEventListeners();
imageAddForm.setEventListeners();
cardDeleteSubmit.setEventListeners();

addButton.addEventListener('click', () => imageAddForm.open());
editButton.addEventListener('click', openUserInfoForm);
popupavatarButton.addEventListener('click', () => avatarEditForm.open());
