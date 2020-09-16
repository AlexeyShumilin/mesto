import {formPlace, popupUser, validationSetup,} from './constants.js'

class FormValidator {
    constructor(defaultFormConfig, formElement) {
        this._inputSelector = defaultFormConfig.inputSelector;
        this._submitButtonSelector = defaultFormConfig.submitButtonSelector;
        this._inactiveButtonClass = defaultFormConfig.inactiveButtonClass;
        this._inputErrorClass = defaultFormConfig.inputErrorClass;
        this._errorClass = defaultFormConfig.errorClass;
        this.formElement = formElement;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        inputElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        inputElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }


    _isValid(inputElement) {

        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput(inputs) {
        return inputs.some((inputElement) => !inputElement.validity.valid);
    }

    _popupButtonDisabled(submitButtons) {
        submitButtons.classList.add(this._inactiveButtonClass);
        submitButtons.disabled = true;
    }

    _popupButtonActive(submitButtons) {
        submitButtons.classList.remove(this._inactiveButtonClass);
        submitButtons.disabled = false;
    }


    _toggleButtonState(inputs, submitButtons) {
        if (this._hasInvalidInput(inputs)) {
            this._popupButtonDisabled(submitButtons);
        } else {
            this._popupButtonActive(submitButtons);
        }
    }

    _setEventListeners() {
        const inputs = Array.from(this.formElement.querySelectorAll(this._inputSelector));
        const submitButtons = this.formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputs, submitButtons);

        inputs.forEach((inputElement,) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState(inputs, submitButtons);
            });
        });
    }

    enableValidation() {

        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

}

const editFormValidator = new FormValidator(validationSetup, popupUser);
const cardFormValidator = new FormValidator(validationSetup, formPlace);


export {
    FormValidator,
    editFormValidator,
    cardFormValidator
};






