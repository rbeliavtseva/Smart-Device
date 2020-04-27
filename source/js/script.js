'use strict';
/*
Реализует аккордеон
*/
var acc = document.querySelectorAll('.button-show');
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function (evt) {
    var button = evt.target;
    button.classList.toggle('button-show--active');
    var panel = button.nextElementSibling;
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }
  });
}

/*
Реализует открытие/закрытие попапа
*/
var ESC_KEYCODE = 27;
var headerBtn = document.querySelector('.header__button');
var closeBtn = document.querySelector('.popup__button-close');
var popup = document.querySelector('.popup');
var overlay = document.querySelector('.overlay');
var textInputs = document.querySelectorAll('.input-field--popup');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var focusMethod = function getFocus() {
  textInputs[0].focus();
};

var openPopup = function () {
  popup.classList.remove('popup--closed');
  popup.classList.add('popup--open');
  overlay.style.display = 'block';
  focusMethod();
  document.addEventListener('keydown', onPopupEscPress);
  overlay.addEventListener('click', closePopup);
};

headerBtn.addEventListener('click', openPopup);

var closePopup = function () {
  popup.classList.remove('popup--open');
  popup.classList.add('popup--closed');
  overlay.style.display = 'none';
  document.removeEventListener('keydown', onPopupEscPress);
};

closeBtn.addEventListener('click', closePopup);
