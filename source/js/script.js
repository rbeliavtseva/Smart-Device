'use strict';

var acc = document.querySelectorAll('.button-show');
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    acc[i].classList.toggle('button-show--active');
    var panel = acc[i].nextElementSibling;
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }
  });
}
