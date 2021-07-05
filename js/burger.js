'use strict';

(function () {

const menuBurgerButton = document.querySelector(".main-header__open-menu-button");
const headerNavigation = document.querySelector(".main-header__navigation-list");

if (document.body.clientWidth <= 752) {
  headerNavigation.classList.add("hidden");
}

menuBurgerButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  headerNavigation.classList.toggle("hidden");
  menuBurgerButton.classList.toggle("is-opened");
})

})();