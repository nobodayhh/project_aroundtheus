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

// find the open&close buttons
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const profileEditButton = document.querySelector("#profile-edit-button");

// find the form fields in the DOM
const nameInput = profileFormElement.querySelector(".modal__input_type_name");
const jobInput = profileFormElement.querySelector(".modal__input_type_description");

// find the profile elements in the DOM
const profileName = document.querySelector("#profile__title");
const profileJob = document.querySelector("#profile__description");

// image cards
const cardListEl = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#cardTemplate").content;

//open&close the form
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


profileEditButton.addEventListener("click", () => {
    console.log("clickedEditProfile");
    openModal(profileEditModal);
    fillProfileInputs();
});


profileModalCloseButton.addEventListener("click", () => {
    console.log("closeProfileEdit");
    closeModal(profileEditModal);
});
  
function getCardElement(cardData) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTitleEl = cardElement.querySelector(".card__title");

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


  
