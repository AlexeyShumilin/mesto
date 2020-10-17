export default class UserInfo {

    constructor(userInfo) {
        this._nameInfoElement = userInfo.nameInfoElement;
        this._aboutInfoElement = userInfo.aboutInfoElement;

    }


    getUserInfo() {
        return {
            userName: this._nameInfoElement.textContent,
            userDescription: this._aboutInfoElement.textContent,

        }
    }

    setUserData = ({userName, userDescription}) => {
        if (userName) this._nameInfoElement.textContent = userName;
        if (userDescription) this._aboutInfoElement.textContent = userDescription;
    };
}