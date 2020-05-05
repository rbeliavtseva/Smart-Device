'use strict';

/*
Реализует аккордеон
*/
var acc = document.querySelectorAll('.button-show');
var lastOpenAccPanel = null;
var lastClickedButton = null;

for (var item = 0; item < acc.length; item++) {
  acc[item].addEventListener('click', function (evt) {
    var button = evt.target;
    button.classList.toggle('button-show--active');
    var panel = button.nextElementSibling;

    if (lastOpenAccPanel && lastOpenAccPanel !== panel) {
      lastOpenAccPanel.style.display = 'none';
    }
    if (lastClickedButton && lastClickedButton !== button && lastClickedButton.classList.contains('button-show--active')) {
      lastClickedButton.classList.toggle('button-show--active');
    }
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }

    lastOpenAccPanel = panel;
    lastClickedButton = button;
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

initSmoothScrolling();

function initSmoothScrolling() {
  if (isCssSmoothSCrollSupported()) {
    console.log('scroll');
    return;
  }

  var duration = 400;

  var pageUrl = location.hash
    ? stripHash(location.href)
    : location.href
  ;

  delegatedLinkHijacking();

  function delegatedLinkHijacking() {
    document.body.addEventListener('click', onClick, false);

    function onClick(e) {
      if (!isInPageLink(e.target)) {
        return;
      }

      e.stopPropagation();
      e.preventDefault();

      jump(e.target.hash, {
        duration: duration,
        callback: function () {
          setFocus(e.target.hash);
        }
      });
    }
  }

  function isInPageLink(n) {
    return n.tagName.toLowerCase() === 'a'
          && n.hash.length > 0
          && stripHash(n.href) === pageUrl
    ;
  }

  function stripHash(url) {
    return url.slice(0, url.lastIndexOf('#'));
  }

  function isCssSmoothSCrollSupported() {
    return 'scrollBehavior' in document.documentElement.style;
  }

  // Adapted from:
  // https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
  function setFocus(hash) {
    var element = document.getElementById(hash.substring(1));

    if (element) {
      if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
        element.tabIndex = -1;
      }

      element.focus();
    }
  }
}

function jump(target, options) {
  // eslint-disable-next-line one-var
  var
    start = window.pageYOffset,
    opt = {
      duration: options.duration,
      offset: options.offset || 0,
      callback: options.callback,
      easing: options.easing || easeInOutQuad
    },
    distance = typeof target === 'string' ?
      opt.offset + document.querySelector(target).getBoundingClientRect().top :
      target,
    duration = typeof opt.duration === 'function' ?
      opt.duration(distance) :
      opt.duration,
    timeStart, timeElapsed;

  requestAnimationFrame(function (time) {
    timeStart = time;
    loop(time);
  });

  function loop(time) {
    timeElapsed = time - timeStart;

    window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

    if (timeElapsed < duration) {
      requestAnimationFrame(loop);
    } else {
      end();
    }
  }

  function end() {
    window.scrollTo(0, start + distance);

    if (typeof opt.callback === 'function') {
      opt.callback();
    }
  }

  // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) {
      return c / 2 * t * t + b;
    }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
}
