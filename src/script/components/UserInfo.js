export default class UserInfo {
    constructor({nameSelector, jobSelector}) {
        this._userName = nameSelector;
        this._userJob = jobSelector;
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            job: this._userJob.textContent
        };
    }

<<<<<<< HEAD
    setUserInfo({name, job}) {
        this._userName.textContent = name;
        this._userJob.textContent = job;
=======
    setUserInfo({userName, userDescription}) {
        if (userName) this._nameInfoElement.textContent = userName;
        if (userDescription) this._aboutInfoElement.textContent = userDescription;

>>>>>>> parent of 7405a3a... finish work 9 first rewiew
    }
}