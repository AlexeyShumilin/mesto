import './index.css';
import Section         from '../script/components/Section.js';
import Card            from '../script/components/Card.js';
import UserInfo        from '../script/components/UserInfo.js';
import PopupWithImage  from '../script/components/PopupWithImage.js';
import PopupWithForm   from '../script/components/PopupWithForm.js';
import FormValidator   from '../script/components/FormValidator.js';
import Api             from "../script/components/Api.js";
import PopupWithSubmit from "../script/components/PopupWithSubmit.js";

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
    popupAvatar,
    popupAvatarButton,
    popupImg,
    popupSubmit,
    popupSubmitButtonAvatar,
    popupUser,
    popupUserSaveButton,
    sectionCards,
    validationContainers,
    validationSetup
} from "../script/utils/constants.js";

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
const userEditForm = new PopupWithForm(popupUser, {
    submitCallback(userInfo) {
        renderLoading(true, popupUserSaveButton)
        api.editProfileInfo({name: userInfo.name, about: userInfo.about})
            .then((data) => {
                userData.setUserData({userName: data.name, userDescription: data.about})
                userEditForm.close();
            })
            .catch(err => console.log(err))
            .finally(() => renderLoading(false, popupUserSaveButton));
    }
});
const user = {
    nameInfoElement: name,
    aboutInfoElement: about,
}

const userData = new UserInfo(user);

// заполняем поля ввода формы редактирования профиля
const openUserInfoForm = () => {
    const userInfo = userData.getUserInfo();
    nameInput.value = userInfo.userName;
    infoInput.value = userInfo.userDescription;
    userEditForm.open();
}

//Создание попапа для аватара
const avatarEditForm = new PopupWithForm(popupAvatar, {
    submitCallback: () => {
        renderLoading(true, popupSubmitButtonAvatar);
        api.editAvatar(avatarInput.value)
            .then(data => {
                popupAvatarButton.style.backgroundImage = `url('${data.avatar}')`;
                avatarEditForm.close();
            })
            .catch(err => console.log(err))
            .finally(() => renderLoading(false, popupSubmitButtonAvatar));
    }
});

const popupWithImage = new PopupWithImage(popupImg);


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
const cardAddForm = new PopupWithForm(formPlace,
    {
        submitCallback: (imageInfo) => {
            renderLoading(true, formPlaceSubmitButton);
            api.createNewCard(imageInfo)
                .then((data) => {
                    section.addItem(createCard(data))
                    cardAddForm.close();
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
        const [userInfo, cards] = values;
        userData.setUserData({userName: userInfo.name, userDescription: userInfo.about});
        userId = userInfo._id;
        popupAvatarButton.style.backgroundImage = `url('${userInfo.avatar}')`;//записываем свой id в переменную
        section.renderItems(cards.reverse());
    })
    .catch(err => {
        console.log(err);
    });

validationContainers.forEach(formElement => {
    const newValidator = new FormValidator(validationSetup, formElement);
    newValidator.enableValidation();                                                                //включаем валидацию формы
});

avatarEditForm.setEventListeners();
userEditForm.setEventListeners();
popupWithImage.setEventListeners();
cardAddForm.setEventListeners();
cardDeleteSubmit.setEventListeners();

addButton.addEventListener('click', () => cardAddForm.open());
editButton.addEventListener('click', openUserInfoForm);
popupAvatarButton.addEventListener('click', () => avatarEditForm.open());
