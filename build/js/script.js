'use strict';

/*
Реализует аккордеон
*/
var acc = document.querySelectorAll('.button-show');

for (var item = 0; item < acc.length; item++) {
  acc[item].addEventListener('click', function (evt) {
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
var body = document.querySelector('body');

// Блокировка скролла при открытии модального окна
function existVerticalScroll() {
  return document.body.offsetHeight > window.innerHeight;
}

function getBodyScrollTop() {
  return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
}

// Закрытие по нажатию ESC
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var focusMethod = function getFocus() {
  textInputs[0].focus();
};

var openPopup = function (evt) {
  evt.preventDefault();
  body.dataset.scrollY = getBodyScrollTop();
  popup.classList.remove('popup--closed');
  popup.classList.add('popup--open');
  overlay.style.display = 'block';
  focusMethod();
  document.addEventListener('keydown', onPopupEscPress);
  overlay.addEventListener('click', closePopup);

  if (existVerticalScroll()) {
    body.classList.add('body-lock');
    body.style.top = '-${body.dataset.scrollY}px';
  }
};

headerBtn.addEventListener('click', openPopup);

var closePopup = function () {
  popup.classList.remove('popup--open');
  popup.classList.add('popup--closed');
  overlay.style.display = 'none';
  document.removeEventListener('keydown', onPopupEscPress);

  if (existVerticalScroll()) {
    body.classList.remove('body-lock');
    window.scrollTo(0, body.dataset.scrollY);
  }
};

closeBtn.addEventListener('click', closePopup);

/*
Валидация поля input с помощью imaskjs
*/
var mask = {
  mask: '+{7}(000)-000-00-00'
};

window.iMaskJS(document.getElementById('tel-id'), mask);
window.iMaskJS(document.getElementById('tel-id-popup'), mask);

/*
Добавление в local storage
*/
if (window.localStorage) {
  var elements = document.querySelectorAll('.input-field--popup');

  for (var i = 0, length = elements.length; i < length; i++) {
    (function (element) {
      var name = element.getAttribute('name');

      element.value = localStorage.getItem(name) || element.value;

      element.onkeyup = function () {
        localStorage.setItem(name, element.value);
      };
    })(elements[i]);
  }
}

/*
Реализует плавный скролл
*/
var opt = {
  behavior: 'smooth'
};

document.querySelector('.main-screen__button-rotate').addEventListener('click', function () {
  document.querySelector('.advantages').scrollIntoView(opt);
});

document.querySelector('.main-screen__button').addEventListener('click', function () {
  document.querySelector('.write-us').scrollIntoView(opt);
});
