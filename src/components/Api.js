export default class Api {
  constructor(options) {
    //...
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "7c40b814-e707-41cf-959d-91dbc11467c7",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  //other methods for working with the API
}
