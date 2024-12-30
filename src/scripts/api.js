
////CONFIG////
const CONFIG = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
  headers: {
    authorization: 'a761626e-fe6e-4c80-86db-dec4604f4b55',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
};

////ЗАГРУЗКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ////
const getInitalUsers = () => {
  return fetch(`${CONFIG.baseUrl}/users/me`, {
    headers: CONFIG.headers
  })
  .then(handleResponse)
};

////ЗАГРУЗКА КАРТОЧЕК////
const getInitialCards = () => {
  return fetch(`${CONFIG.baseUrl}/cards`, {
    headers: CONFIG.headers
  })
  .then(handleResponse)
};

////ОБНОВЛЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ////
const editUsers = (title, description) => {
  return fetch(`${CONFIG.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: CONFIG.headers,
    body: JSON.stringify({
      name: title,
      about: description
    })
  })
  .then(handleResponse)
};

////ДОБАВЛЕНИЕ КАРТОЧКИ////
const addCards = (postNewCard) => {
  return fetch(`${CONFIG.baseUrl}/cards`, {
    method: 'POST',
    headers: CONFIG.headers,
    body: JSON.stringify(postNewCard)
  })
  .then(handleResponse)
};

////УДАЛЕНИЕ КАРТОЧКИ////
const deleteCard = (cardId) => {
  return fetch(`${CONFIG.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: CONFIG.headers
  })
  .then(handleResponse)
};

////ЛАЙК////
const addLikeCard = (cardId) => {
  return fetch(`${CONFIG.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: CONFIG.headers
  })
  .then(handleResponse)
};

////АНЛАЙН////
const deleteLikesCard = (cardId) => {
  return fetch(`${CONFIG.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: CONFIG.headers
  })
  .then(handleResponse)
};

////ОБНОВЛЕНИЕ АВАТАРА////
const updateAvatar = (linkAvatar) => {
  return fetch(`${CONFIG.baseUrl}/users/me/avatar `, {
    method: 'PATCH',
    headers: CONFIG.headers,
    body: JSON.stringify({
      avatar: linkAvatar
    })
  })
  .then(handleResponse)
};

export { getInitalUsers, getInitialCards, editUsers, addCards, deleteCard, addLikeCard, deleteLikesCard, updateAvatar };