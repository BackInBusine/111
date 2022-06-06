const profileEdit = document.querySelector(".profile__edit");
const buttonAdd = document.querySelector(".profile__add");
const windowEdit = document.querySelector(".popup_edit");
const windowAdd = document.querySelector(".popup_add");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const fieldEditProfileName = document.querySelector(".popup__name_edit");
const fieldEditProfileJob = document.querySelector(".popup__job_edit");
const popups = document.querySelectorAll(".popup");
const nameInput = document.querySelector(".popup__name_add");
const linkInput = document.querySelector(".popup__link_add");
const popupTypeImage = document.querySelector(".popup_image");
const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__title-image");
const buttonFormAdd = document.querySelector('.popup__form_add');
const buttonFormEdit = document.querySelector('.popup__form_edit');
const elements = document.querySelector(".elements");
const cardElement = document.querySelector("#elements").content.querySelector(".element");

function closePopupElement(popupElement) {
  popupElement.classList.remove("popup_is-active");
  document.removeEventListener("keydown", closePopupEscape);
}

function openPopupElement(popupElement) {
  popupElement.classList.add("popup_is-active");
  document.addEventListener("keydown", closePopupEscape);
}

function closePopupOverlay(e) {
  const popupIsActive = e.currentTarget;
  if (e.target === e.currentTarget || e.target.classList.contains('popup__close')) {
    closePopupElement(popupIsActive);
  }
}

function closePopupEscape(e) {
  if (e.key === "Escape") {
    const popupIsActive = document.querySelector(".popup_is-active");
    closePopupElement(popupIsActive);
  }
}

function handleOpenEditProfileWindow() {
  fieldEditProfileName.value = profileName.textContent;
  fieldEditProfileJob.value = profileJob.textContent;
  openPopupElement(windowEdit);
}

function togglelike(e) {
  e.target.classList.toggle("element__like_active");
}

function deleteCard(element) {
  element.target.closest(".element").remove();
}

function openPopupImage(imagePopup, titleImagePopup, card) {
  imagePopup.src = card.link;
  imagePopup.alt = card.name;
  titleImagePopup.textContent = card.name;
  openPopupElement(popupTypeImage);
}

function generateElement(addCard) {
  const newElement = cardElement.cloneNode(true);
  const cardTitle = newElement.querySelector(".element__title");
  const cardImage = newElement.querySelector(".element__image");
  cardImage.src = addCard.link;
  cardImage.alt = addCard.name;
  cardTitle.textContent = addCard.name;

  const likeButton = newElement.querySelector(".element__like");
  likeButton.addEventListener("click", togglelike);

  const deleteButton = newElement.querySelector(".element__del");

  deleteButton.addEventListener("click", deleteCard);

  cardImage.addEventListener("click", () => {
    openPopupImage(popupImage, popupImageTitle, addCard);
  });

  return newElement;
}

profileEdit.addEventListener("click", handleOpenEditProfileWindow);

buttonAdd.addEventListener("click", () => {
  nameInput.value = '';
  linkInput.value = '';
  openPopupElement(windowAdd);
  const popupButtonAdd = document.querySelector('.popup__button_add');
  disableSubmitButton(popupButtonAdd, options);
});

buttonFormEdit.addEventListener('submit', (e) => {
  if (buttonFormEdit.checkValidity()) {
    e.preventDefault();
    profileName.textContent = fieldEditProfileName.value;
    profileJob.textContent = fieldEditProfileJob.value;
    closePopupElement(windowEdit);
  }
});

buttonFormAdd.addEventListener('submit', (e) => {

  e.preventDefault();
  elements.prepend(generateElement({ link: linkInput.value, name: nameInput.value }));
  closePopupElement(windowAdd);

});

popups.forEach((e) => {
  e.addEventListener("mousedown", closePopupOverlay);
});

initialCards.forEach((addCard) => {
  elements.append(generateElement(addCard));
});
