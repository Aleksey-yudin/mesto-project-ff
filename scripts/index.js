const content = document.querySelector('.content');
const places = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

initialCards.forEach(function(item) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__title').textContent = item.name;

    places.append(cardElement);
});

const delButton = document.querySelectorAll('.card__delete-button');

delButton.forEach(button => {
  button.addEventListener('click', function(event) {
    const cardItem = event.target.closest('.places__item');
    if (cardItem) {
      cardItem.remove();
    }
  });
});