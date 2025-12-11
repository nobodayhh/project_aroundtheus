// Modal form validation logic
(function () {
  const validationSettings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal-input-error",
    errorClass: "modal-error-visible",
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
  window.validationSettings = validationSettings;
})();

// Function to reset validation state of a form
function resetValidation(formElement, settings) {
  const inputs = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const button = formElement.querySelector(settings.submitButtonSelector);

  inputs.forEach((input) => {
    input.classList.remove(settings.inputErrorClass);
    const errorEl = formElement.querySelector(`#${input.id}-error`);
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove(settings.errorClass);
    }
  });

  const hasInvalid = inputs.some((input) => !input.validity.valid);

  if (hasInvalid) {
    button.classList.add(settings.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
  }
}
