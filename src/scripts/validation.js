
const showInputError = ({formElement, inputElement, errorMessage, errorClass, inputErrorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = ({formElement, inputElement, inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const isValid = ({formElement, inputElement, inputErrorClass, errorClass}) => {
  if (inputElement.validity.patternMismatch) {
      // данные атрибута доступны у элемента инпута через ключевое слово dataset.
      // обратите внимание, что в js имя атрибута пишется в camelCase
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
  inputElement.setCustomValidity("");
}
  if (!inputElement.validity.valid) {
    showInputError({formElement, inputElement, errorMessage: inputElement.validationMessage, errorClass, inputErrorClass});
  } else {
    hideInputError({formElement, inputElement, errorClass, inputErrorClass});
  }
};

const hasInvalidInput = (inputList) => 
  inputList.some((input) => !input.validity.valid);

const toggleButtonState = ({inputList, submitButtonElement, inactiveButtonClass}) => {
  if (hasInvalidInput(inputList)) {
    submitButtonElement.disabled = true;
    submitButtonElement.classList.add(inactiveButtonClass);
  } else {
    submitButtonElement.disabled = false;
    submitButtonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = ({formElement, inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass, errorClass}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButtonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState({
    inputList,
    submitButtonElement,
    inactiveButtonClass,
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid({formElement, inputElement, inputErrorClass, errorClass});
      toggleButtonState({inputList, submitButtonElement, inactiveButtonClass});
    });
  });
};

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    setEventListeners({formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass});
  });
};

const clearValidation = (formElement, {submitButtonSelector, inactiveButtonClass, inputSelector, inputErrorClass, errorClass}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButtonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError({ formElement, inputElement, inputErrorClass, errorClass});
    inputElement.setCustomValidity("");
  });

  toggleButtonState({inputList, submitButtonElement, inactiveButtonClass});
};

export { enableValidation, clearValidation };

