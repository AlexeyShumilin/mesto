
export default class Popup {
    constructor(selectorPopup) {
        this._popup = selectorPopup;
    }
    open() {
        this._popup.classList.add('popup_is-opened');
        document.addEventListener("keydown", this._escHandler);
    }
    close() {
        this._popup.classList.remove('popup_is-opened');
        document.removeEventListener("keydown", this._escHandler);
    }

   _escHandler(evt) {
        if (evt.key === "Escape") {
            this.close(document.querySelector('.popup_is-opened'));
        }
    };


    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup_is-opened')) {
                this.close();
            }
        });
    }
}
