export default class Card {
    constructor({data, handleImageClick},) {
        this._name = data.name;
        this._link = data.link;
        this._handleImageClick = handleImageClick;
    }


    _getTemplate() {
        const cardTemplate = document.querySelector('.template').content.querySelector('.element');
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

    _handleLikeToggle = evt => {
        evt.target.classList.toggle('element__like_active');
    };

    _handleDeleteCard = evt => {
        evt.target.closest('.element').remove();
    };


    _setEventListeners() {
        const cardLikeButton = this._element.querySelector('.element__like');
        const cardDeleteButton = this._element.querySelector('.element__delete-icon');


        cardLikeButton.addEventListener('click', (evt) => this._handleLikeToggle(evt));
        cardDeleteButton.addEventListener('click', (evt) => this._handleDeleteCard(evt));
        this._element.querySelector('.element__image')
            .addEventListener('click', () => this._handleImageClick());
    }

}
