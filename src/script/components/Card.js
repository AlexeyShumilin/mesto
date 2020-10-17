export default class Card {
    likes;
    owner;

    constructor({data, handleCardClick}, userId, cardSelector, setLike, removeLike, deleteCard) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._userId = userId;
        this._ownerId = data.owner._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._likes = data.likes;
        this._removeLike = removeLike;
        this._addLike = setLike;
        this._deleteCard = deleteCard;

    }

    _getTemplate = () => {
        this._card = this._cardSelector.cloneNode(true);
        return this._card;
    };

    //удаление карточки со страницы
    handleDeleteCard = () => {
        this._delButton.parentElement.remove();
    };

    // число лайков и состояние кнопки
    updateLikes = (isLiked, likes) => {
        if (isLiked) {
            this._likeButton.classList.add('element__like_active');
        } else {
            this._likeButton.classList.remove('element__like_active');
        }
        this._likeCount.textContent = likes.length;
    };

    //проверяем лайк
    isLiked = (likes, init) => {
        if (init) {
            return (likes.find((item) => item._id === this._userId));
        }
        return this._likeButton.classList.contains('element__like_active');
    };

    _handleLikeCard = item => {
        if (this.isLiked(item._likes, false)) {
            this._removeLike(item);
        } else {
            this._addLike(item);
        }
    };

    // обработчики
    _setEventListeners() {

        this._delButton = this._card.querySelector('.element__delete-icon');
        this._image = this._card.querySelector('.element__image');
        this._likeButton = this._card.querySelector('.element__like');
        this._likeCount = this._card.querySelector('.element__like-number');

        this._delButton.addEventListener('click', () => this._deleteCard(this));
        this._likeButton.addEventListener('click', () => this._handleLikeCard(this));
        this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }

    // возвращает элемент для вставки в разметку
    createCard() {
        const card = this._getTemplate();
        const image = card.querySelector('.element__image');
        this._setEventListeners();


        //заполнение  карточки
        image.src = this._link;
        image.alt = `${this._name}. Фото`;
        card.querySelector('.element').id = this._id;
        card.querySelector('.element__title').textContent = this._name;

        this.updateLikes(this.isLiked(this._likes, true), this._likes);
        if (this._ownerId === this._userId) {
            card.querySelector('.element__delete-icon').style.display = 'block';
        }

        return card;
    }
}