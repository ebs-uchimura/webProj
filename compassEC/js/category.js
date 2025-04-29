/**
 * category.js
 *
 * function： cart functions
 **/

'use strict';

$(function() {
  // counter
  let counter = 0;

  // plusbutton
  $('.plusbutton1').on('click', function() {
    // or more 0
    if (counter >= 0) {
      counter++;
      // display-none
      $('#numarea1').val(counter);
    }
  });
  // minusbutton
  $('.minusbutton1').on('click', function() {
    // over 0
    if (counter > 0) {
      counter--;
      // display-none
      $('#numarea1').val(counter);
    }
  });
});
