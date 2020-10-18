
export default class UserInfo {

    constructor(userInfo) {
        this._nameInfoElement = userInfo.nameInfoElement;
        this._aboutInfoElement = userInfo.aboutInfoElement;
        this._userAvatar = userInfo.userAvatar;

    }


    getUserInfo() {
        return {
            userName: this._nameInfoElement.textContent,
            userDescription: this._aboutInfoElement.textContent,
            userAvatar: this._userAvatar.style.backgroundImage,
        }
    }

    setUserInfo({userName, userDescription}) {
        if (userName) this._nameInfoElement.textContent = userName;
        if (userDescription) this._aboutInfoElement.textContent = userDescription;

    }
    setUserAvatar(data) {
        this._userAvatar.style.backgroundImage = `url('${data.avatar}')`;
    }


}