'use strict';

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
