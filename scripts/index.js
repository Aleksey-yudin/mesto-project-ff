const places = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


function createCard(name, link, deleteCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;

    const delButton = cardElement.querySelector('.card__delete-button');
    delButton.addEventListener('click', deleteCard);

    return cardElement;
}

function deleteCard(event) {
    const cardItem = event.target.closest('.places__item');
    if (cardItem) {
        cardItem.remove();
    }
}

initialCards.forEach(function(item) {
    const cardElement = createCard(item.name, item.link, deleteCard);
    places.append(cardElement);
})

