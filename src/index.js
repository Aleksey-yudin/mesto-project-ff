///////////////
// РАБОТАЕТ! //
///////////////

import './pages/index.css';
import { openPopup, closePopup } from './scripts/modal.js';
import { createCard, deleteButton, likeCallback } from './scripts/card.js';
import { placesList, buttonAddProfile, buttonProfile, imageButton, popupEdit, popupNewCard, popupAvatar, 
popupDelete, popupTypeImg, popupImage, popupCaptionImg, profileImage, profileTitle, profileDescription, 
newCard, profileForm, profileNameInput, profileDescriptionInput, cardForm, cardNameInput,cardLinkInput,
formAvatar, linkAvatarInput, formDelete } from './scripts/consts.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getInitalUsers, getInitialCards, editUsers, addCards, updateAvatar, deleteCard  } from './scripts/api.js';
let userId = null;
let idCardForDelete = null;
let evtCardDelete = null;


////ВАЛИДАЦИЯ////
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const openImages = (card) => {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaptionImg.textContent = card.name;
  openPopup(popupTypeImg);
};

////ЗАГРУЗКА С СЕРВЕРА////
Promise.all([getInitalUsers(), getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id
    document.querySelector('.profile__title').textContent = user.name;
    document.querySelector('.profile__description').textContent = user.about;
    document.querySelector('.profile__image').style.backgroundImage = `url(${user.avatar})`;

    cards.forEach((card) => {
      renderCard(card, userId);
    });
  return userId;
})
  .catch(({errUser, errCard}) => {
    console.log(errUser);
    console.log(errCard);
});

const setSubmitButtonText = (evt, textButton) => {
  evt.target.querySelector('.popup__button').textContent = textButton;
};

function handleFormProfileEdit(evt) {
  evt.preventDefault(); 
  setSubmitButtonText(evt, 'Сохранение...');

  editUsers(profileNameInput.value, profileDescriptionInput.value)
  .then((users) => {
    profileTitle.textContent = users.name;
    profileDescription.textContent = users.about;
    users.name,
    users.about
    closePopup(popupEdit);
  })
  .catch((err) => console.log(err))
  .finally(() => setSubmitButtonText(evt, 'Сохранить'));
};

profileForm.addEventListener('submit', handleFormProfileEdit);

////НОВАЯ КАРТОЧКА////
const addCardPage = (evt, userId) => {
  evt.preventDefault();
  setSubmitButtonText(evt, 'Сохранение...');
  const newCardData= {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  addCards(newCardData)
  .then((card) => {
    renderCard(card, userId);
    cardForm.reset();
    closePopup(popupNewCard);
  })
  .catch((err) => console.log(err))
  .finally(() => setSubmitButtonText(evt, 'Сохранить'));
};

cardForm.addEventListener('submit', (evt) => addCardPage(evt, userId));

////АВАТАР////
const handleFormAvatar = (evt) => {
  evt.preventDefault();
  setSubmitButtonText(evt, 'Сохранение...');
  
  updateAvatar(linkAvatarInput.value)
  .then((link) => {
    profileImage.style.backgroundImage = `url(${link.avatar})`;
    link.avatar
    formAvatar.reset();
    closePopup(popupAvatar);
  })
  .catch((err) => console.log(err))
  .finally(() => setSubmitButtonText(evt, 'Сохранить'));
};

formAvatar.addEventListener('submit', handleFormAvatar);

////ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ////
const handleCardDelete = (evt) => {
  evt.preventDefault();

  deleteCard(idCardForDelete)
  .then(() => {
    deleteButton(evtCardDelete);
    closePopup(popupDelete);
  })
  .catch((err) => console.log(err));
};

formDelete.addEventListener('submit', handleCardDelete);

////РЕНДЕР КАРТОЧЕК////
const renderCard = (card, userId) => { 
  const handleDelete = (id, cardDelete) => {
    openPopup(document.querySelector('.popup_delete'));
    idCardForDelete = id;
    evtCardDelete = cardDelete;
  }
  const newCard = createCard(card, openImages, likeCallback, userId, handleDelete);
  placesList.append(newCard);
};


////СЛУШАТЕЛИ////
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      closePopup(popup);
    };
  });
});

buttonProfile.addEventListener('click', () => {
  openPopup(popupEdit);
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  clearValidation(popupEdit, validationConfig)
});

buttonAddProfile.addEventListener('click', () => {
  openPopup(popupNewCard);
  cardForm.reset();
  clearValidation(cardForm, validationConfig)
});

imageButton.addEventListener('click', () => {
  openPopup(popupAvatar);
  formAvatar.reset();
  clearValidation(popupAvatar, validationConfig)
})

enableValidation(validationConfig);
//newCard.forEach((formElement) => clearValidation(formElement, validationConfig));
