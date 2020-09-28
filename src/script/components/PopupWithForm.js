import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submitForm}) {
        super(popupSelector);
        const _submitForm = submitForm;
        const _form = this._popup.querySelector('.popup__container');
    }


    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__item');

        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    close(){
        this._form.reset();
        super.close();
    }

    setEventListeners() {
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();

            this._submitForm(this._getInputValues());
            this.close();
        })

        super.setEventListeners();
    }
}