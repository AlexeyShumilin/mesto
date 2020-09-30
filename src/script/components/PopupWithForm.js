import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submitCallback}) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup__container');
    }


    _getInputValues() {
        const _inputList = this._form.querySelectorAll('.popup__item');
        const _formValues = {};

        _inputList.forEach(input => {
            _formValues[input.name] = input.value;
        });

        return _formValues;
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners = () => {
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();

            this._submitCallback(this._getInputValues());
            this.close();
        })

        super.setEventListeners();
    };
}
