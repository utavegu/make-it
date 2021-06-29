'use strict';

/* ---------- ANCHOR SCRIPT ---------- */

const anchor = document.querySelector('.main-footer__anchor');

const go = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

anchor.addEventListener('click', go);



/* BURGER-MENU OPEN-CLOSE SCRIPT */

const menuBurgerButton = document.querySelector(".main-header__open-menu-button");
const headerNavigation = document.querySelector(".main-header__navigation-list");

if (document.body.clientWidth <= 768) {
  headerNavigation.classList.add("hidden");
}

menuBurgerButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  headerNavigation.classList.toggle("hidden");
  menuBurgerButton.classList.toggle("is-opened");
})