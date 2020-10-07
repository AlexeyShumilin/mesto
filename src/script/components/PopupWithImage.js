import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
        this.popupImage = this._popup.querySelector('.img-popup__place');
        this.popupCaption = this._popup.querySelector('.img-popup__caption')
    }

    open(data) {

        this.popupImage.src = data.link;
        this.popupImage.alt = `${data.link}`;
        this.popupCaption.textContent = data.name;
        super.open();
    }

}
