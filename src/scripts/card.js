import { addLikeCard, deleteLikesCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

const createCard = (card, openImages, likeCallback, userId, handleDelete) => {
  const placesItem = cardTemplate.querySelector('.card').cloneNode(true);
  const likeLength = placesItem.querySelector('.card__like-quantity');
  placesItem.querySelector('.card__image').src = card.link;
  placesItem.querySelector('.card__image').alt = card.name;
  placesItem.querySelector('.card__title').textContent = card.name;
  likeLength.textContent = card.likes.length;
  if(card.likes.some(like=> like._id === userId)){
    placesItem.querySelector('.card__like-button').classList.add('card__like-button_is-active');
  };
  if (card.owner._id !== userId) {
    placesItem.querySelector('.card__delete-button').classList.add('card__delete-button-invisible')
  };
  placesItem.querySelector('.card__image').addEventListener('click', () => openImages(card));
  placesItem.querySelector('.card__like-button').addEventListener('click', (evt) => likeCallback(evt, card._id, likeLength, placesItem));
  placesItem.querySelector('.card__delete-button').addEventListener('click', (evt) => handleDelete(card._id, evt));
  return placesItem;
};

////УДАЛИТЬ КАРТОЧКУ////
const deleteButton = (evt) => {
  const event = evt.target;
  const deleteCard = event.closest('.places__item');
  deleteCard.remove();
};

////КОЛБЕК ЛАЙКА////
const likeCallback = (likeButton, cardId, likeLength, card) => {
  const likeMethod = card.querySelector('.card__like-button').classList.contains('card__like-button_is-active') ? deleteLikesCard : addLikeCard;
  likeMethod(cardId).then((likesCard) => {
      likeCard(likeButton); 
      likeLength.textContent = likesCard.likes.length; 
    }).catch((err) => console.log(err));
};

////ЛАЙК////
const likeCard = (evt) => {
  const heart = evt.target;
  heart.classList.toggle('card__like-button_is-active')
};

export { createCard, deleteButton, likeCallback, likeCard};