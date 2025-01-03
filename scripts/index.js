const initialCard0 ={
    name: "Yosemite Valley",
    link: new URL("https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"),
};

const initialCard1 ={
    name: "Lake Louise",
    link: new URL("https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"),
};

const initialCard2 ={
    name: "Bald Mountains",
    link: new URL("https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"),
};

const initialCard3 ={
    name: "Latemar",
    link: new URL("https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"),
};

const initialCard4 ={
    name: "Vanoise National Park",
    link: new URL("https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"),
};

const initialCard5 ={
    name: "Lago di Braies",
    link: new URL("https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"),
};


const initialCards = [initialCard0, initialCard1, initialCard2, initialCard3, initialCard4, initialCard5];



// find the form in the DOM
const profileEditModal = document.querySelector("#edit-modal");
const profileFormElement = profileEditModal.querySelector("#edit-profile-form");
const cardEditModal = document.querySelector("#edit-card-modal");
const cardFormElement = cardEditModal.querySelector("#add-new-card-form");

// find the open&close buttons
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const profileEditButton = document.querySelector("#profile-edit-button");
const cardEditButton = document.querySelector("#profile-add-button");
const cardModalCloseButton = cardEditModal.querySelector(".modal__close");

// find the form fields in the DOM
const nameInput = profileFormElement.querySelector(".modal__input_type_name");
const jobInput = profileFormElement.querySelector(".modal__input_type_description");
const placeNameInput = cardFormElement.querySelector(".modal__input_type_name");
const urlInput = cardFormElement.querySelector(".modal__input_type_description");

// find the profile elements in the DOM
const profileName = document.querySelector("#profile__title");
const profileJob = document.querySelector("#profile__description");

// image cards
const cardListEl = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#cardTemplate").content;
const imageModal = document.querySelector("#image-modal");
const imageModalImgEl = imageModal.querySelector(".modal__image");
const imageModalText = document.querySelector(".modal__text");
const imageModalCloseButton = imageModal.querySelector(".modal__close");

//open&close the forms
function openModal(modal) {
    modal.classList.add("modal_opened");
}
function closeModal(modal) {
    modal.classList.remove("modal_opened");
}

//initalize the form
function fillProfileInputs() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

// the form submission handler. Note that its name 
// starts with a verb and concisely describes what it does
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(profileEditModal);
}

// connect the handler to the form:
// it will watch the submit event
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// open and close the profile form
profileEditButton.addEventListener("click", () => {
    console.log("clickedEditProfile");
    openModal(profileEditModal);
    fillProfileInputs();
});

profileModalCloseButton.addEventListener("click", () => {
    console.log("closeProfileEdit");
    closeModal(profileEditModal);
});

// open and close the card form
cardEditButton.addEventListener("click", () => {
    console.log("clickedCardAdd");
    openModal(cardEditModal);
    fillProfileInputs();
});

cardModalCloseButton.addEventListener("click", () => {
    console.log("closeCardEdit");
    closeModal(cardEditModal);
});

// the card form submission handler.
function handleCardFormSubmit(evt) {
    evt.preventDefault(); 
    console.log(placeNameInput.value);
    console.log(urlInput.value);
    const newCard ={
        name: placeNameInput.value,
        link: new URL(urlInput.value),
    };
    renderCard(newCard, cardListEl);
    closeModal(cardEditModal);
  }

// connect the handler to the form:
// it will watch the submit event
cardFormElement.addEventListener('submit', handleCardFormSubmit);


  
function getCardElement(cardData) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTitleEl = cardElement.querySelector(".card__title");
    const cardLikeButton = cardElement.querySelector("#card-like-button");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");

    // active the like button
    cardLikeButton.addEventListener('click', () => {
        console.log("likeClicked");
        cardLikeButton.classList.toggle("card__like-button-active");
    })

    // delect card
    cardDeleteButton.addEventListener("click", () => {
        cardElement.remove(".card");
    });

    cardImageEl.addEventListener("click", () => {
        imageModalImgEl.src = cardData.link;
        imageModalImgEl.alt = cardData.name;
        imageModalText.textContent = cardData.name;
        openModal(imageModal);
    });

    imageModalCloseButton.addEventListener("click", () => {
        closeModal(imageModal);
    })

    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;
    cardTitleEl.textContent = cardData.name;

    return cardElement;
}

function renderCard(cardData) {
    const cardElement = getCardElement(cardData);
    cardListEl.prepend(cardElement);
}

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));


  
