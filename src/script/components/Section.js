export default class Section {
    constructor({renderer}, sectionCards) {
        this._renderer = renderer;
        this._sectionCards = sectionCards;
    }

    //Добавление карточки в контейнер
    addItem(element) {
        this._sectionCards.prepend(element);
    }

    //Отрисовка  элементов
    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    }
}