import Popup from "./Popup";

export default class PopupWithSubmit extends Popup{
  constructor(selectorPopup,api) {
    super(selectorPopup);
    this._api = api;
  }

  handleSubmit({submitFunction}) {
    this._submitCallback = submitFunction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitCallback();
    });
  }
}
