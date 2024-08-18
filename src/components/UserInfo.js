export default class UserInfo {
  constructor(profileNameSelector, jobSelector, avatarSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._description = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
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

  setAvatar(url) {
    this._avatar.src = url;
  }
}
