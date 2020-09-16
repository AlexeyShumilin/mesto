import {openPopup,} from "./index.js";
import {popupImg} from "./constants.js";


// noinspection ChainedFunctionCallJS
class Card {
    constructor(data, cardSelector) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
    }


    _setEventListeners() {
        const cardLikeButton = this._element.querySelector('.element__like');
        const cardDeleteButton = this._element.querySelector('.element__delete-icon');
        const cardImage = this._element.querySelector('.element__image');

        cardLikeButton.addEventListener('click', (evt) => {
            this._handleLikeToggle(evt)
        });
        cardDeleteButton.addEventListener('click', (evt) => {
            this._handleDeleteCard(evt)
        });
        cardImage.addEventListener('click', (evt) => {
            this._handleImageClick(evt)
        });
    }


    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.element');
        return cardTemplate.cloneNode(true);
    }


    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        const cardImage = this._element.querySelector('.element__image');
        const cardTitle = this._element.querySelector('.element__title');

        cardImage.src = this._link;
        cardImage.alt = this._name;
        cardTitle.textContent = this._name;

        return this._element;
    }

    _handleLikeToggle(evt) {
        evt.target.classList.toggle('element__like_active');
    };

    _handleDeleteCard(evt) {
        evt.target.closest('.element').remove();
    };

    _handleImageClick(evt) {
        const photo = evt.target;
        popupImg.querySelector(".img-popup__place").src = photo.src;
        popupImg.querySelector(".img-popup__caption").textContent = photo.alt;
        popupImg.querySelector(".img-popup__place").alt = photo.alt;
        openPopup(popupImg);
    };
}

export {Card};
