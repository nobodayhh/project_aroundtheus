// Modal form validation logic
(function () {
  const validationSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

  // show error
  const showInputError = (formElement, inputElement, errorMessage, settings) => {
    // assuming each input has an id and the span has id="<input-id>-error"
    const errorElement = formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(settings.inputErrorClass);
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add(settings.errorClass);
    }
  };

  // hide error
  const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(settings.inputErrorClass);
    if (errorElement) {
      errorElement.classList.remove(settings.errorClass);
      errorElement.textContent = "";
    }
  };

  const setCustomErrorMessage = (inputElement) => {
    inputElement.setCustomValidity("");
    if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity("This field is required.");
    } else if (inputElement.type === "url" && !inputElement.validity.valid) {
      inputElement.setCustomValidity(
        "Please enter a valid URL (e.g., https://example.com)."
      );
    }
  };

  const checkInputValidity = (formElement, inputElement, settings) => {
    setCustomErrorMessage(inputElement);
    if (!inputElement.validity.valid) {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        settings
      );
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };

  const toggleButtonState = (inputList, buttonElement, settings) => {
    if (!buttonElement) return;
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };

  const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      settings.submitButtonSelector
    );

    toggleButtonState(inputList, buttonElement, settings);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
  };

  const enableValidation = (settings) => {
    // select the forms, not the inputs
    const formList = Array.from(
      document.querySelectorAll(settings.formSelector)
    );

    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      // pass the actual form element, not a string
      setEventListeners(formElement, settings);
    });
  };

  enableValidation(validationSettings);
})();
