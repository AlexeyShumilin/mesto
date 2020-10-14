import './index.css';

import {initialCards} from "../script/utils/initialCards.js";
import Section from '../script/components/Section.js';
import Card from '../script/components/Card.js';
import UserInfo from '../script/components/UserInfo.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import FormValidator from '../script/components/FormValidator.js';
import Api from "../script/components/Api";
import PopupWithSubmit from "../script/components/PopupWithSubmit";

import {
    popupSubmitButtonAvatar,
    popupAvatar,
    avatarInput,
    popupSaveButton,
    popupAvatarButton,
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


//создание класса API
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
    headers: {
        authorization: ' 27419946-4fff-4784-a16e-1161591c67a2',
        'Content-Type': 'application/json'
    }
});

//функция  для указания загрузки с сервера
function renderLoading (isLoading, submitButton) {
    if(isLoading) {
        submitButton.textContent = 'Сохранение...';
    }
    else {
        submitButton.textContent= 'Сохранить';
    }
}
const popupWithImage = new PopupWithImage(popupImg);


//создание попапа для удаления карточек
const popupDeleteCard = new PopupWithSubmit(popupSaveButton, api);

//Создание  секции, для добавления карточек
const cardRenderer = new Section(sectionCards, api);

//создание  карточек
const createCard = (item, userID) => {
    //создание класса для открытия изображения
    const card = new Card(item,
        '.template',
        {
            //открытие увеличенного фото
            handleImageClick: ()=>{
                popupWithImage.open(item);
            },
            //удаление карточки
            handleDeleteCard: (item)=>{
                popupDeleteCard.open();
                // функция удаления карточки при подтверждении
                popupDeleteCard.handleSubmit({submitFunction: ()=> {
                        api.deleteCard(item._cardId)
                            .then(()=> {
                                popupDeleteCard.close();
                                item._handleDeleteCard();
                            })
                            .catch(err=>console.log(err));
                    }
                });
            },
            //лайк картоки
            handleLikeIcon: (item) => {
                // удаление лайка
                if(item.isLiked()) {
                    api.removeLike(item._cardId)
                        .then((res) => {
                            item.updateLikesCard(res.likes);
                        })
                        .catch(err => console.log(err));
                }
                else {
                    api.addLike(item._cardId)
                        .then((res) => {
                            item.updateLikesCard(res.likes);
                        })
                        .catch(err => console.log(err));
                }
            }},
        api, userID);
    const cardElement = card.generateCard();
    return cardElement;
}





//редактирование профиля
const editPopupWithForm = new PopupWithForm(popupUser, {submitCallback: (inputValues) =>{
        renderLoading(true, popupAvatarButton); //показать, что данные загружаются на сервер
        api.setInfo({inputValues})
            .then(data=> {
                user.setUserInfo(data);
                editPopupWithForm.close();
            })
            .catch(err => console.log(err))
            .finally(()=>renderLoading(false, popupSaveButton)); //убрать знак загрузки на сервер
    }
},api);

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



//Создание аватара
const popupAvatarForm = new PopupWithForm(popupAvatar, {submitFunction: ()=>{
        renderLoading(true, popupAvatarButton);
        api.changeAvatar(avatarInput.value)
            .then(data=> {
                popupSaveButton.style.backgroundImage = `url('${data.avatar}')`;
                popupAvatarForm.close();
            })
            .catch(err => console.log(err))
            .finally(()=>{renderLoading(false, popupSubmitButtonAvatar);
            });
    }},api);

//открытие попапа аватара при нажатии
popupAvatarButton.addEventListener('click', ()=>{
    popupAvatarForm.open();
    AvatarValidation._resetForm();
})
const editFormValidator = new FormValidator(validationSetup, popupUser);
const cardFormValidator = new FormValidator(validationSetup, formPlace);
const AvatarValidation = new FormValidator(validationSetup, popupAvatar);


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
