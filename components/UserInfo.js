export default class UserInfo {
  constructor(profileNameSelector, jobSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._description = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.title;
    this._description.textContent = data.description;
  }
}

//create and instance of the UserInfo class in index.js and use
//its methods as described
