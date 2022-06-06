import initialCards from './cards.js';
import Card from './classCard.js';
import FormValidator from './FormValidator.js';

const profileEdit = document.querySelector(".profile__edit");
const buttonAdd = document.querySelector(".profile__add");
const windowEdit = document.querySelector(".popup_edit");
const windowAdd = document.querySelector(".popup_add");
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector(".profile__job");
const fieldEditProfileName = document.querySelector(".popup__name_add");
const fieldEditProfileJob = document.querySelector(".popup__job_edit");
const popups = document.querySelectorAll('.popup');
const nameInput = document.querySelector(".popup__name_edit");
const linkInput = document.querySelector(".popup__link_add");
const popupImage = document.querySelector(".popup__image");
const buttonFormAdd = document.querySelector('.popup__form_add');
const buttonFormEdit = document.querySelector('.popup__form_edit');
const elements = document.querySelector(".elements");
const buttonElement = windowAdd.querySelector('.popup__button');
  
const validator = new FormValidator({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_valid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
}, '.popup__form');

function closePopupElement(popupElement) {
  popupElement.classList.remove("popup_is-active");
  document.removeEventListener("keydown", closePopupEscape);
}

function openPopupElement(popupElement) {
  popupElement.classList.add("popup_is-active");
  document.addEventListener("keydown", closePopupEscape);
}

function closePopupEscape(e) {
  if (e.key === "Escape") {
    const popupIsActive = document.querySelector(".popup_is-active");
    closePopupElement(popupIsActive);
  }
}

function handleOpenEditProfileWindow() {
  nameInput.value = profileName.textContent;
  fieldEditProfileJob.value = profileJob.textContent;
  openPopupElement(windowEdit);
  validator.enableButton(buttonElement, 'popup__button_valid');
}













function renderCard(parentSelector, card) {
  parentSelector.prepend(card);
}

initialCards.forEach((item) => {
  renderCard(elements, new Card(item, '.element').renderCard());
});

function clearAddCardForm() {
  fieldEditProfileName.value = '';
  linkInput.value = '';
}








function profileFormSubmitHandler(e) {
  e.preventDefault();

  const newName = nameInput.value,
    newJob = fieldEditProfileJob.value;

  profileName.textContent = newName;
  profileJob.textContent = newJob;

  closePopupElement(windowEdit);
}

function addCard(e) {
  e.preventDefault();

  const link = linkInput.value,
    name = fieldEditProfileName.value;

  const card = {
    name: name,
    link: link,
  };

  renderCard(elements, new Card(card, '.element').renderCard());
  closePopupElement(windowAdd);
}

profileEdit.addEventListener('click', () => {
  openPopupElement(windowEdit);
  handleOpenEditProfileWindow();
  validator.enableValidation();
});

buttonAdd.addEventListener('click', () => {
  openPopupElement(windowAdd);
  clearAddCardForm();
  validator.enableValidation();

  validator.disableButton(buttonElement, 'popup__button_valid');
});

popups.forEach((popupElement) => {
  const buttonClose = popupElement.querySelector('.popup__close');

  buttonClose.addEventListener('click', () => {
    closePopupElement(popupElement);
  });

  popupElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
      closePopupElement(popupElement);
    }
  });
});

buttonFormEdit.addEventListener('submit', profileFormSubmitHandler);

buttonFormAdd.addEventListener('submit', addCard);

export { openPopupElement, popupImage};
