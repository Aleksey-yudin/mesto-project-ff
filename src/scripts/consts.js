export const placesList = document.querySelector('.places__list');

export const buttonAddProfile = document.querySelector('.profile__add-button');
export const buttonProfile = document.querySelector('.profile__edit-button');
export const imageButton = document.querySelector('.profile__image-button');
export const profileDescription = document.querySelector('.profile__description');
export const profileTitle = document.querySelector('.profile__title');
export const profileImage = document.querySelector('.profile__image');

export const popupEdit = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupAvatar = document.querySelector('.popup_avatar');
export const popupDelete = document.querySelector('.popup_delete');
export const popupTypeImg = document.querySelector('.popup_type_image');
export const popupImage = document.querySelector('.popup__image');
export const popupCaptionImg = document.querySelector('.popup__caption');
export const newCard = document.querySelector('.popup__form');

export const profileForm = document.forms['edit-profile'];
export const profileNameInput = profileForm.elements.name;
export const profileDescriptionInput = profileForm.elements.description;

export const cardForm = document.forms['new-place'];
export const cardNameInput = cardForm.elements['place-name'];
export const cardLinkInput = cardForm.elements.link;

export const formAvatar = document.forms['new-avatar'];
export const linkAvatarInput = formAvatar.elements.link;

export const formDelete = document.forms.delete;