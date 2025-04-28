/**
 * detail.js
 *
 * function： cart functions
 **/

'use strict';

$(function() {
  // counter
  let counter = 0;

  // plusbutton
  $('.plusbutton').on('click', function() {
    // or more 0
    if (counter >= 0) {
      counter++;
      // display-none
      $('#numarea').val(counter);
    }
  });
  // minusbutton
  $('.minusbutton').on('click', function() {
    // over 0
    if (counter > 0) {
      counter--;
      // display-none
      $('#numarea').val(counter);
    }
  });
});
