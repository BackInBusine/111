function showInputError(formElement, inputElement, errorMessage, options) {
    const { inputErrorClass, errorClass } = options;

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, options) {
    const { inputErrorClass, errorClass } = options;

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, popupButton, options) {

    if (hasInvalidInput(inputList)) {
        disableSubmitButton(popupButton, options);
    } else {
        enableSubmitButton(popupButton, options);
    }
}

function disableSubmitButton(popupButton, options) {
    const { validButtonClass } = options;
    popupButton.classList.add(validButtonClass);
    popupButton.disabled = 'disabled';
}

function enableSubmitButton(popupButton, options) {
    const { validButtonClass } = options;
    popupButton.classList.remove(validButtonClass);
    popupButton.disabled = '';
}

function isValid(formElement, inputElement, options) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, options);
    } else {
        hideInputError(formElement, inputElement, options);
    }
}

function setEventListener(formElement, options) {
    const { inputSelector, submitButtonSelector } = options;

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const popupButton = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, popupButton, options);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            isValid(formElement, inputElement, options);
            toggleButtonState(inputList, popupButton, options);
        });
    });
}

function enableValidation(options) {
    const { formSelector } = options;

    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (e) => {
            e.preventDefault();
        });
        setEventListener(formElement, options);
    });
}

const options = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    validButtonClass: "popup__button_valid",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error",
};

enableValidation(options);
