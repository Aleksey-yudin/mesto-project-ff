const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');


// Создание
const createCard = (data, deleteCardCallback, likeCardCallback, openPopupImgCallback) => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDelete = cardElement.querySelector('.card__delete-button');
    const imgCard = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
 
    imgCard.src = data.link;
    imgCard.alt = data.name;
    cardTitle.textContent = data.name;
 
    cardDelete.addEventListener("click", deleteCardCallback);
    likeButton.addEventListener("click", likeCardCallback);
    imgCard.addEventListener("click", openPopupImgCallback);
 
    return cardElement;
 };

 // Удаление
const deleteCard = (evnt) => {
    evnt.target.closest('.places__item').remove();
 };
 
 // Лайк
 const likeCard = (evnt) => {
    const likeButton = evnt.target;
    if (likeButton.classList.contains('card__like-button_is-active')) {
        likeButton.classList.remove('card__like-button_is-active');
    } else {
       likeButton.classList.add('card__like-button_is-active');
    }
 }; 
 
 
 export { createCard, deleteCard, likeCard };