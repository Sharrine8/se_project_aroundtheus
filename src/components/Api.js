export default class Api {
  constructor(options) {
    //this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  async getInitialCards() {
    const res = await fetch(
      "https://around-api.en.tripleten-services.com/v1/cards",
      {
        headers: {
          authorization: this._authorization,
        },
      }
    );
    return await (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  async getUser() {
    const res = await fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me",
      {
        headers: {
          authorization: this._authorization,
        },
      }
    );
    return await (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  async editProfile(data) {
    const res = await fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me",
      {
        method: "PATCH",
        headers: {
          authorization: this._authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          about: data.description,
        }),
      }
    );
    return await (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  async addCard(data) {
    const res = await fetch(
      "https://around-api.en.tripleten-services.com/v1/cards",
      {
        method: "POST",
        headers: {
          authorization: this._authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      }
    );
    return await (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  async deleteCard(cardId) {
    const res = await fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._authorization,
          "Content-Type": "application/json",
        },
      }
    );
    return await (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  async addLike(cardId) {
    const res = await fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: this._authorization,
          "Content-Type": "application/json",
        },
      }
    );
    return await (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }

  removeLike(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: this._authorization,
          "Content-Type": "application/json",
        },
      }
    );
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  async updateAvatar(avatarUrl) {
    const res = await fetch(
      `https://around-api.en.tripleten-services.com/v1/users/me/avatar`,
      {
        method: "PATCH",
        headers: {
          authorization: this._authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: avatarUrl,
        }),
      }
    );
    return await (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
  }
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
