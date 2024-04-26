
//открытие попапа
function openPopup(item) {
    item.classList.add('popup_is-animated', 'popup_is-opened');
    document.addEventListener('keydown', handleEscKey);
    item.addEventListener('mousedown', OverlayClick);
};
  
//закрытие попапа
function closePopup(item) {
    item.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscKey);
    item.removeEventListener('mousedown', OverlayClick);
};

// нажатие Esc
function handleEscKey(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    };
};

// клик по оверлею
function OverlayClick(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closePopup(evt.target);
    };
};
  
export { openPopup, closePopup, handleEscKey, OverlayClick };