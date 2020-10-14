export default class Card {
    constructor(data, cardSelector, {handleImageClick, handleDeleteCard, handleLikeIcon}, api, userId) {
        this._name = data.name;
        this._link = data.link;
        this._handleImageClick = handleImageClick;


        this._likesNumberArray = data.likes;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this._cardId = data._id;
        this._likesArray = data.likes;
        this._cardSelector = cardSelector;
        this._handleDeleteCard = handleDeleteCard;
        this._api = api;
        this._handleLikeIcon = handleLikeIcon;
    }


    _getTemplate() {
        const cardTemplate = document.querySelector('.template').content.querySelector('.element');
        return cardTemplate.cloneNode(true);
    }


    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        const cardImage = this._element.querySelector('.element__image');
        const cardTitle = this._element.querySelector('.element__title');

        cardImage.src = this._link;
        cardImage.alt = this._name;
        cardTitle.textContent = this._name;
        this.updateLikesCard(this._likesNumberArray);
        if (this._ownerId === this._userId) {
            this._element.querySelector('.element__delete-icon').style.display = 'block';
        }
        return this._element;
    }

    _handleLikeToggle = evt => {
        evt.target.classList.toggle('element__like_active');
    };

    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    };


    isLiked() {
        return this._cardLike.classList.contains('cards__like_clicked');
        ;
    }

    updateLikesCard(likesArray) {
        this._likeButton = this._element.querySelector('.element__like');
        this._likeNumber = this._element.querySelector('.element__like-number');
        //пробегаем по массиву переданных лайков и смотрим, есть ли там наш лайк, если есть, то закрашиваем сердце
        for (let i = 0; i < likesArray.length; i++) {
            if (likesArray[i]._id === this._userId) {
                this._likeButton.classList.add('cards__like_clicked');
                break;
            }
            {
                this._likeButton.classList.remove('cards__like_clicked');
            }
        }
        //смотрим длину массива лайков, если их нет, то цифры прячем, если есть, то показываем.
        if (likesArray.length > 0) {
            this._likeNumber.style.display = 'block';
            this._likeNumber.textContent = likesArray.length;
        } else {
            this._likeNumber.style.display = 'none';
            this._likeButton.classList.remove('cards__like_clicked');
        }
    }

    _setEventListeners() {
        const cardLikeButton = this._element.querySelector('.element__like');
        const cardDeleteButton = this._element.querySelector('.element__delete-icon');


        cardLikeButton.addEventListener('click', (evt) => this._handleLikeToggle(evt));
        cardDeleteButton.addEventListener('click', (evt) => this._handleDeleteCard(evt));
        this._element.querySelector('.element__image')
            .addEventListener('click', () => this._handleImageClick(this._name, this._link));
    }

}
