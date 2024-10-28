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


const profileEditModal = document.querySelector("#edit-modal");
const profileEditForm = profileEditModal.querySelector("#edit-profile-form");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const profileEditButton = document.querySelector("#profile-edit-button");

profileEditButton.addEventListener("click", () => {
    console.log("clickedEditProfile");
    profileEditModal.classList.add("modal_opened");
});


profileModalCloseButton.addEventListener("click", () => {
    console.log("closeProfileEdit");
    profileEditModal.classList.remove("modal_opened");
});
