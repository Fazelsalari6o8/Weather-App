"use strict";

const modal = document.getElementById("modal");
const modalText = modal.querySelector("p");
const body = document.querySelector("body");

const showModal = (text) => {
  body.style.userSelect = "none";
  modalText.innerText = text;
  modal.style.display = "flex";
};

const removeModal = () => {
  modal.style.display = "none";
  modalText.innerText = "";
  body.style.userSelect = "auto";
};

export { showModal, removeModal };
