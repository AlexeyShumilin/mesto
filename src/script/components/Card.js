<<<<<<< HEAD
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

=======
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
>>>>>>> parent of 7405a3a... finish work 9 first rewiew

    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

<<<<<<< HEAD
        const cardImage = this._element.querySelector('.element__image');
        const cardTitle = this._element.querySelector('.element__title');

        cardImage.src = this._link;
        cardImage.alt = this._name;
        cardTitle.textContent = this._name;
=======
    //Устанавливаем обработчики
    _setEventListeners() {

        this._delButton = this._card.querySelector('.element__delete-icon');        //кнопка удаления карточки
        this._likeButton = this._card.querySelector('.element__like');                //кнопка "лайк"
        this._image = this._card.querySelector('.element__image');                   //элемент картинки
        this._likeCount = this._card.querySelector('.element__like-number');                  //Число лайков
>>>>>>> parent of 7405a3a... finish work 9 first rewiew

        return this._element;
    }

<<<<<<< HEAD
    _handleLikeToggle = evt => {
        evt.target.classList.toggle('element__like_active');
    };
=======
    //функция возвращает элемент для вставки в разметку
    createCard() {
        const card = this._getTemplate();
        const image = card.querySelector('.element__image');
        this._setEventListeners();
>>>>>>> parent of 7405a3a... finish work 9 first rewiew

    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    };

<<<<<<< HEAD
    _setEventListeners() {
        const cardLikeButton = this._element.querySelector('.element__like');
        const cardDeleteButton = this._element.querySelector('.element__delete-icon');
=======
        //заполнение полей карточки
        image.src = this._link;
        image.alt = `${this._name}. Фото`;
        card.querySelector('.element').id = this._id;
        card.querySelector('.element__title').textContent = this._name;
>>>>>>> parent of 7405a3a... finish work 9 first rewiew


<<<<<<< HEAD
        cardLikeButton.addEventListener('click', (evt) => this._handleLikeToggle(evt));
        cardDeleteButton.addEventListener('click', (evt) => this._handleDeleteCard(evt));
        this._element.querySelector('.element__image')
            .addEventListener('click', () => this._handleImageClick(this._name, this._link));
=======
        return card;                                                             //возвращаем карточку
>>>>>>> parent of 7405a3a... finish work 9 first rewiew
    }

}
