import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor(selectorPopup, {submitCallback}) {
        super(selectorPopup);
        this._submitCallback = submitCallback;
    }

    //переопределяем установщик слушателей, добавляем событие подтверждения формы
    setEventListeners() {
        this._popup.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submitCallback(this._element, this._classElement);
        });
        super.setEventListeners();
    }

    //переопределяем открытие попапа
    open(element, classElement) {
        this._classElement = classElement;
        this._element = element;
        super.open();
    }
}