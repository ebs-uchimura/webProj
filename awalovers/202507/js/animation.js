/**
 * animation.js
 *
 * function： アニメーション用
 **/

"use strict";

jQuery('a[href^="#"]').click(function (e) {
  var speed = 400,
    href = $(this).attr("href"),
    target = $(href == "#" || href == "" ? 'html' : href),
    position = target.offset().top;
  $.when(
    $('html,body').animate({
      scrollTop: position
    }, speed, 'swing'),
    e.preventDefault(),
  ).done(function() {
    var diff = target.offset().top;
    if (diff === position) {
    } else {
      $('html, body').animate({
        scrollTop: diff
      }, 10, 'swing');
    }
  });
});