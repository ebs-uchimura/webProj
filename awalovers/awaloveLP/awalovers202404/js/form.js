/**
 * form.js
 *
 * function： order form
 **/

"use strict";

$(function () {
  // height
  const q02height = $("#q02").offset().top;
  const q03height = $("#q03").offset().top;
  const q04height = $("#q04").offset().top;
  const questionheight = $("#questionaire").offset().top - 50;
  const policyheight = $("#policy").offset().top;

  // initialize datalayer
  window.dataLayer = window.dataLayer || [];

  // click questionnaire button
  $('.fiximg').click(function () {
    // animation
    $('html, body').animate({
      scrollTop: questionheight
    }, 300);
  });

  // click story button
  $('.hearing').click(function () {
    // animation
    $('html, body').animate({
      scrollTop: questionheight
    }, 300);
  });

  // checkbox changed
  $('input[name="privacypolicy"], input[name="information"]').change(function () {
    // privacypolicy button
    let $btn1 = $('.privacypolicy');
    // information button
    let $btn2 = $('.information');

    // checked
    if ($btn1.prop('checked') && $btn2.prop('checked')) {
        // show line button
        $(".visual").show();
        // hide line transparent button
        $(".trans").hide();

    } else {
        // hide line button
        $(".visual").hide();
        // show line transparent button
        $(".trans").show();
    }
});
});

// detect smartphone
function isSmartPhone() {
  if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
    return true;
  } else {
    return false;
  }
}