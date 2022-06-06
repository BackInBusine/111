class FormValidator {
  constructor(options, formSelector) {
    this.formSelector = formSelector;
    this.inputSelector = options.inputSelector;
    this.submitButtonSelector = options.submitButtonSelector;
    this.inactiveButtonClass = options.inactiveButtonClass;
    this.inputErrorClass = options.inputErrorClass;
    this.errorClass = options.errorClass;
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  }

  hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this.hideInputError(formElement, inputElement);
    }
  }

  _setEventListeners(buttonFormEdit) {
    const inputList = Array.from(
      buttonFormEdit.querySelectorAll(this.inputSelector)
    );
    const buttonElement = buttonFormEdit.querySelector(this.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, this.inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(buttonFormEdit, inputElement);
        this._toggleButtonState(
          inputList,
          buttonElement,
          this.inactiveButtonClass
        );
      });
    });
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (e) {
        e.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  disableButton(buttonElement) {
    buttonElement.classList.add(this.inactiveButtonClass);
    buttonElement.disabled = true;
  }

  enableButton(buttonElement) {
    buttonElement.classList.remove(this.inactiveButtonClass);
    buttonElement.disabled = false;
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this.disableButton(buttonElement, this.inactiveButtonClass);
    } else {
      this.enableButton(buttonElement, this.inactiveButtonClass);
    }
  }
}

export default FormValidator;
