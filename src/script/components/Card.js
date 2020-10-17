export default class Card {                                                                 //класс для описания
    // свойств и методов элемента-карточки
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
        //Мой идентификатор
    }

    _getTemplate = () => {
        this._card = this._cardSelector.cloneNode(true);                        //клонированный template-тег карточки
        return this._card;
    };

    //удаление карточки со страницы
    handleDeleteCard = () => {
        this._delButton.parentElement.remove();
    };

    //Обновляем число лайков и состояние кнопки
    updateLikes = (isLiked, likes) => {
        if (isLiked) {
            this._likeButton.classList.add('element__like_clicked');
        } else {
            this._likeButton.classList.remove('element__like_clicked');
        }
        this._likeCount.textContent = likes.length;
    };

    //проверяем, стоит ли лайк
    isLiked = (likes, init) => {
        if (init) {
            return (likes.find((item) => item._id === this._userId));
        }
        return this._likeButton.classList.contains('element__like_clicked');
    };

    _handleLikeCard = item => {
        if (this.isLiked(item._likes, false)) {
            this._removeLike(item);
        } else {
            this._addLike(item);
        }
    };

    //Устанавливаем обработчики
    _setEventListeners() {

        this._delButton = this._card.querySelector('.element__delete-icon');        //кнопка удаления карточки
        this._likeButton = this._card.querySelector('.element__like');                //кнопка "лайк"
        this._image = this._card.querySelector('.element__image');                   //элемент картинки
        this._likeCount = this._card.querySelector('.element__like-number');                  //Число лайков

        this._delButton.addEventListener('click', () => this._deleteCard(this));
        this._likeButton.addEventListener('click', () => this._handleLikeCard(this));
        this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }

    //функция возвращает элемент для вставки в разметку
    createCard() {
        const card = this._getTemplate();
        const image = card.querySelector('.element__image');
        this._setEventListeners();


        //заполнение полей карточки
        image.src = this._link;
        image.alt = `${this._name}. Фото`;
        card.querySelector('.element').id = this._id;
        card.querySelector('.element__title').textContent = this._name;

        this.updateLikes(this.isLiked(this._likes, true), this._likes);
        if (this._ownerId === this._userId) {
            card.querySelector('.element__delete-icon').style.display = 'block';
        }

        return card;                                                             //возвращаем карточку
    }
}