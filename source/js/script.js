var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

var link = document.querySelector(".add-to-cart");
var popup = document.querySelector(".modal");
var overlay = document.querySelector(".modal__overlay");
//var close = document.querySelector(".modal-close");

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

link.addEventListener("click", function (evt) {
    evt.preventDefault();
//    overlay.classList.add("modal-show-overlay");
    popup.classList.add("modal--show");
    overlay.classList.add("modal__overlay--show");
});

overlay.addEventListener("click", function (evt) {
  evt.preventDefault ();
  if (popup.classList.contains("modal--show")) {
            popup.classList.remove("modal--show");
            overlay.classList.remove("modal__overlay--show");
  }
});

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
        evt.preventDefault ();
        if (popup.classList.contains("modal--show")) {
            popup.classList.remove("modal--show");
            overlay.classList.remove("modal__overlay--show");
        }
    }
});
