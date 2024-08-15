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

  getUser() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
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

  editProfile(/*take name and about from here*/) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "7c40b814-e707-41cf-959d-91dbc11467c7",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        about: "Physicist and Chemist",
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  //Cards should be rendered after the user information is received
  //from the server. Create a function in Api.js and return the
  //Promise.all() method. Pass the array of functions for getting user
  //information and the list of cards to Promise.all() as a parameter

  //other methods for working with the API
  //   User routes

  // GET /users/me – Get the current user’s info
  // PATCH /users/me – Update your profile information
  // PATCH /users/me/avatar – Update avatar
  // Card routes

  // GET /cards – Get all cards
  // POST /cards – Create a card
  // DELETE /cards/:cardId – Delete a card
  // PUT /cards/:cardId/likes – Like a card
  // DELETE /cards/:cardId/likes – Dislike a card
}
