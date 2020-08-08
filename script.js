let popup = document.querySelector(".popup");
let popupOpenButton = document.querySelector(".user-info__edit-button");
let popupCloseButton = popup.querySelector(".popup__close");
let nameInfo = document.querySelector(".user-info__name");
let jobInfo = document.querySelector(".user-info__job");
let nameInput = document.querySelector(".popup__item_name");
let jobInput = document.querySelector(".popup__item_job");
let formElement = document.querySelector(".popup__container");
let profileUserElement = document.querySelector(".user-info__name");
let profileUserExplorerElement = document.querySelector(".user-info__job");


let popupToggle = function () {
    if (popup.classList.toggle("popup_opened")) {
        nameInput.value = nameInfo.textContent;
        jobInput.value = jobInfo.textContent;
    }
};

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    profileUserElement.textContent = nameInput.value;
    profileUserExplorerElement.textContent = jobInput.value;
    popup.classList.toggle("popup_opened");
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);

popupOpenButton.addEventListener("click", popupToggle);
popupCloseButton.addEventListener("click", popupToggle);
