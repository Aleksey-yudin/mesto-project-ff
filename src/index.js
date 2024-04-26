import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { openPopup, closePopup } from './scripts/modal.js';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { buttonAddProfile, buttonProfile, cardName, cardUrl, editDescription, editName, newCard, profileEdit, placesList, popupButtonClose, popupTypeImg, popupImage, popupCaptionImg, popupNewCard, popupEdit, profileDescription, profileTitle } from './scripts/consts.js';

// Новая карточка
function openPopupButton() {
  openPopup(popupNewCard);
};

// Профиль
function openProfile () {
  openPopup(popupEdit);

  const nameValue = profileTitle.textContent;
  const descriptionValue = profileDescription.textContent;

  editName.value = nameValue;
  editDescription.value = descriptionValue;
};

// Открытие изображения
function openImg (event) {
  const cardElement  = event.target.closest('.card');
  openPopup(popupTypeImg);

  const img = cardElement.querySelector('.card__image');
  const text = cardElement.querySelector('.card__title');

  if (img && text) {
     popupImage.src = img.src;
     popupImage.alt = text.textContent;
     popupCaptionImg.textContent = text.textContent;
  };
};

// Отправка формы
function formSubmit(evt) {
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  evt.preventDefault();

  const name = editName.value;
  const description = editDescription.value;

  profileTitle.textContent = name;
  profileDescription.textContent = description;
  closePopup(popupEdit);
};

// Сохранение попапа
newCard.addEventListener("submit", (cardItem) => {
  cardItem.preventDefault();
  const cardData = {
     link: cardUrl.value,
     name: cardName.value,
  };
  const cardElement = createCard(cardData, deleteCard, likeCard, openImg);
  placesList.prepend(cardElement);
  newCard.reset();
  closePopup(popupNewCard);
});

initialCards.forEach(function(cardItem) {
  const cardElement = createCard(cardItem, deleteCard, likeCard, openImg);
  placesList.append(cardElement);
  
});

buttonProfile.addEventListener('click', openProfile);
buttonAddProfile.addEventListener('click', openPopupButton);

profileEdit.addEventListener('submit', formSubmit);

if (popupButtonClose.length > 0) {
  popupButtonClose.forEach(button => {
     button.addEventListener('click', function() {
        const popup = button.closest('.popup');
        closePopup(popup);
     });
  });
}