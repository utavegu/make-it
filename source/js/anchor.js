'use strict';

(function () {

const anchor = document.querySelector('.main-footer__anchor');

const go = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

anchor.addEventListener('click', go);

})();