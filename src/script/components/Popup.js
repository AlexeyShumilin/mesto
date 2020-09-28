
export default class Popup {
    constructor(selectorPopup) {
        this._selectorPopup = selectorPopup;
    }
    open() {
        this._selectorPopup.classList.add('popup_is-opened');
        document.addEventListener("keydown", this._escHandler);
    }
    close() {
        this._selectorPopup.classList.remove('popup_is-opened');
        document.removeEventListener("keydown", this._escHandler);
    }

   _escHandler(evt) {
        if (evt.key === "Escape") {
            this.close(document.querySelector('.popup_is-opened'));
        }
    };


    setEventListeners() {
        this._selectorPopup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup_is-opened')) {
                this.close();
            }
        });
    }
}
