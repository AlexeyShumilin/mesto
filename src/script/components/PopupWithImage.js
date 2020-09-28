import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

    open(data) {
        this._popup.querySelector('.img-popup__caption').textContent = data.name;

        const popupImage = this._popup.querySelector('.img-popup__place');
        popupImage.src = data.link;
        popupImage.alt = `${data.link}`;
        super.open();
    }

}