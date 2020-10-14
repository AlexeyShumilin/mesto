export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getResponse(res) {
        if (!res.ok) {
            return Promise.reject(`ошибка ${res.status}`);
        }
        return res.json();
    }

    //запрос информации с сервера о данных пользователя
    getInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(this._getResponse);
    }

    //отправка новых данных о пользователе на сервер
    setInfo({inputValues}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: inputValues.name,
                about: inputValues.description
            })
        })
            .then(this._getResponse);
    }

    //Изменение аватарки на сервере
    changeAvatar(avatarLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PUT',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink,
            })
        })
            .then(this._getResponse);
    }

    //запрос данных с сервера для получения карточек
    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(this._getResponse);
    }

    //сбор всех данных для загрузки страницы
    getData() {
        return Promise.all([this.getInfo(), this.getCards()]);
    }

    //добавление карточки на сервер
    addCard({data}) {
        return fetch(`${this._baseUrl}/cards `, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._getResponse);
    }

    //удаление карточки с сервера
    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id} `, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._getResponse);
    }

    //Установка лайка
    addLike(Id) {
        return fetch(`${this._baseUrl}/cards/likes/${Id} `, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._getResponse);
    }

//удаление лайка с сервера
    removeLike(Id) {
        return fetch(`${this._baseUrl}/cards/likes/${Id} `, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._getResponse);
    }
}
