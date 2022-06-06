import { openPopupElement, popupImage } from './index.js';

class Card {
  constructor(data, templateSelector) {
    this._src = data.link;
    this._alt = data.name;
    this._templateSelector = templateSelector;
    this.popupImage = popupImage;
  }

  _togglelike() {
    this.buttonLike.classList.toggle('element__like_active');
  }

  _deleteCard() {
    this.buttonDelete.closest(this._templateSelector).remove();
  }

  _openPopupImage() {
    this.popupImageElement = document.querySelector('.popup__image');
    this.popupImageDescription = document.querySelector('.popup__title-image');
    this.popupImage = document.querySelector('.popup_img');

    this.popupImageElement.src = this._src;
    this.popupImageElement.alt = this._alt;
    this.popupImageDescription.textContent = this._alt;

    openPopupElement(this.popupImage);
  }

  _setEventListeners() {
    this.buttonLike = this.newElement.querySelector('.element__like');
    this.buttonDelete = this.newElement.querySelector('.element__del');

    this.buttonLike.addEventListener('click', () => {
      this._togglelike();
    });

    this.buttonDelete.addEventListener('click', () => {
      this._deleteCard();
    });

    this.cardImage.addEventListener('click', () => {
      this._openPopupImage();
    });
  }

  _generateElement() {
    this.cardTemplate = document.querySelector('.card-template').content;
    this.newElement = this.cardTemplate.querySelector(this._templateSelector).cloneNode(true);
    this.cardImage = this.newElement.querySelector('.element__image');

    this.cardImage.alt = this._alt;
    this.cardImage.src = this._src;
    this.newElement.querySelector('.element__title').textContent = this._alt;
  }

  renderCard() {
    this._generateElement();

    this._setEventListeners();
    return this.newElement;
  }
}

export default Card;
