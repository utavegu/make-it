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
/*
const menuBurgerButton = document.querySelector(".main-header__menu");
const headerNavigation = document.querySelector(".main-header__navigation");

menuBurgerButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  headerNavigation.classList.toggle("hidden");
})
*/