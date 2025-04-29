/**
 * index.js
 *
 * function： auto scroll
 **/

'use strict';

$(function() {
  // detect mobile
  const isMobile = /iPhone|Android/i.test(navigator.userAgent);

  // poparea
  $('.heartsolid').on('click', function() {
    // display-none
    $(this).next().removeClass('display-none');
    $(this).addClass('display-none');
  });

  // poparea
  $('.heartbutton').on('click', function() {
    // display-none
    $(this).prev().removeClass('display-none');
    $(this).addClass('display-none');
  });

  // Mobile only
  if (isMobile) {
    // inner window width
    const FIXEDWIDTH = window.innerWidth / 2 + 30;
    // counter
    let recommendCounter = 0;
    let newCounter = 0;
    let rankingCounter = 0;
    let checkedCounter = 0;
    // children length
    var recommendLen = $('#recommendarea').children().length;
    var newLen = $('#newarea').children().length;
    var rankingLen = $('#rankingarea').children().length;
    var checkedLen = $('#checkedarea').children().length;

    // hide all
    $('#recommendctrl .leftarrow').hide();
    $('#newctrl .leftarrow').hide();
    $('#rankingctrl .leftarrow').hide();
    $('#checkedctrl .leftarrow').hide();

    // right clicked
    $('#recommendctrl .rightarrow').click(function() {
      // increment
      recommendCounter++;
      // moveto next
      $('#recommendarea').animate({
        scrollLeft: FIXEDWIDTH * recommendCounter,
        duration: 'fast'
      });
      // if last one
      if (recommendCounter == recommendLen - 1) {
        $(this).hide();
        // show left arror
      } else if (recommendCounter > 0) {
        $('#recommendctrl .leftarrow').show();
      } else {
        console.log('error');
      }
    });

    // right clicked
    $('#newctrl .rightarrow').click(function() {
      // increment
      newCounter++;
      // moveto next
      $('#newarea').animate({
        scrollLeft: FIXEDWIDTH * newCounter,
        duration: 'fast'
      });
      // if last one
      if (newCounter == newLen - 1) {
        $(this).hide();
      } else if (newCounter > 0) {
        $('#newctrl .leftarrow').show();
      } else {
        console.log('error');
      }
    });

    // right clicked
    $('#rankingctrl .rightarrow').click(function() {
      // increment
      rankingCounter++;
      // moveto next
      $('#rankingarea').animate({
        scrollLeft: FIXEDWIDTH * rankingCounter,
        duration: 'fast'
      });
      // if last one
      if (rankingCounter == rankingLen - 1) {
        $(this).hide();
      } else if (rankingCounter > 0) {
        $('#rankingctrl .leftarrow').show();
      } else {
        console.log('error');
      }
    });

    // right clicked
    $('#checkedctrl .rightarrow').click(function() {
      // increment
      checkedCounter++;
      // moveto next
      $('#checkarea').animate({
        scrollLeft: FIXEDWIDTH * checkedCounter,
        duration: 'fast'
      });
      // if last one
      if (checkedCounter == checkedLen - 1) {
        $(this).hide();
      } else if (checkedCounter > 0) {
        $('#checkedctrl .leftarrow').show();
      } else {
        console.log('error');
      }
    });

    // left clicked
    $('#recommendctrl .leftarrow').click(function() {
      // decrement
      recommendCounter--;
      // moveto next
      $('#recommendarea').animate({
        scrollLeft: FIXEDWIDTH * recommendCounter,
        duration: 'fast'
      });
      // if last one
      if (recommendCounter == 0) {
        $(this).hide();
      } else if (recommendCounter > 0) {
        $('#recommendctrl .rightarrow').show();
      } else {
        console.log('error');
      }
    });

    // left clicked
    $('#newctrl .leftarrow').click(function() {
      // decrement
      newCounter--;
      // moveto next
      $('#newarea').animate({
        scrollLeft: FIXEDWIDTH * newCounter,
        duration: 'fast'
      });
      // if last one
      if (newCounter == 0) {
        $(this).hide();
      } else if (newCounter > 0) {
        $('#newctrl .rightarrow').show();
      } else {
        console.log('error');
      }
    });

    // left clicked
    $('#rankingctrl .leftarrow').click(function() {
      // decrement
      rankingCounter--;
      // moveto next
      $('#rankingarea').animate({
        scrollLeft: FIXEDWIDTH * rankingCounter,
        duration: 'fast'
      });
      // if last one
      if (rankingCounter == 0) {
        $(this).hide();
      } else if (rankingCounter > 0) {
        $('#rankingctrl .rightarrow').show();
      } else {
        console.log('error');
      }
    });

    // left clicked
    $('#checkedctrl .leftarrow').click(function() {
      // decrement
      checkedCounter--;
      // moveto next
      $('#checkarea').animate({
        scrollLeft: FIXEDWIDTH * checkedCounter,
        duration: 'fast'
      });
      // if last one
      if (checkedCounter == 0) {
        $(this).hide();
      } else if (checkedCounter > 0) {
        $('#checkedctrl .rightarrow').show();
      } else {
        console.log('error');
      }
    });
  } else {
    // poparea
    $('.quick1').on('click', function() {
      console.log('quick1');
      // display-none
      $('.poparea1').removeClass('display-none');
    });
    // poparea
    $('.quick2').on('click', function() {
      console.log('quick2');
      // display-none
      $('.poparea2').removeClass('display-none');
    });
    // poparea
    $('.quick3').on('click', function() {
      console.log('quick3');
      // display-none
      $('.poparea3').removeClass('display-none');
    });

    // close poparea
    $('.poparea1 .batsu').on('click', function() {
      // hide poparea
      $('.poparea1').addClass('display-none');
    });
    // close poparea
    $('.poparea2 .batsu').on('click', function() {
      // hide poparea
      $('.poparea2').addClass('display-none');
    });
    // close poparea
    $('.poparea3 .batsu').on('click', function() {
      // hide poparea
      $('.poparea3').addClass('display-none');
    });
  }
});
