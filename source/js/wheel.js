'use strict';

(function () {

const ANIMATION_SPEED = 500;

const parentContainer = document.querySelector(".wheel-menu__parent-container");
const menuActivator = parentContainer.querySelector(".wheel-menu__open-button");
const menu = parentContainer.querySelector(".wheel-menu__menu");

menuActivator.addEventListener("click", (evt) => {
  evt.preventDefault();
  menuActivator.classList.toggle("activated");
  if (menu.classList.contains("appeared")) {
    menu.classList.toggle("appeared");
    setTimeout(() => {
      parentContainer.classList.remove("opened");
    }, ANIMATION_SPEED);
  } else {
    parentContainer.classList.add("opened");
    setTimeout(() => {
      menu.classList.toggle("appeared");
    }, ANIMATION_SPEED);
  }
})

})();