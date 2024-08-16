export default class UserInfo {
  constructor(profileNameSelector, jobSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._description = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.innerText,
      description: this._description.innerText,
    };
  }

  setUserInfo(data) {
    //this._profileName.textContent = data.title;
    this._profileName.textContent = data.name;
    this._description.textContent = data.description;
  }
}
