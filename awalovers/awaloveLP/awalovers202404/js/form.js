/**
 * form.js
 *
 * function： 注文フォーム用
 **/

"use strict";

$(function () {
  // 高さ
  const q02height = $("#q02").offset().top;
  const q03height = $("#q03").offset().top;
  const q04height = $("#q04").offset().top;
  const questionheight = $("#questionaire").offset().top - 50;
  const policyheight = $("#policy").offset().top;

  // データレイヤー初期化
  window.dataLayer = window.dataLayer || [];

  // アンケートボタンクリック
  $('.fiximg').click(function () {
    // モバイル
    $('html, body').animate({
      scrollTop: questionheight
    }, 300);
  });

  // アンケートボタンクリック
  $('.hearing').click(function () {
    // モバイル
    $('html, body').animate({
      scrollTop: questionheight
    }, 300);
  });

  /*
  // ラジオボタン変更
  $('input[name="q01[]"]:radio').change(function () {
    // モバイル
    $('html, body').animate({
      scrollTop: q02height
    }, 300);
  });

  // ラジオボタン変更
  $('input[name="q02[]"]:radio').change(function () {
    // モバイル
    $('html, body').animate({
      scrollTop: q03height
    }, 300);
  });

  // ラジオボタン変更
  $('input[name="q03[]"]:radio').change(function () {
    // モバイル
    $('html, body').animate({
      scrollTop: q04height
    }, 300);
  });

  // ラジオボタン変更
  $('input[name="q04[]"]:radio').change(function () {
    $('html, body').animate({
      scrollTop: policyheight
    }, 300);
  });
  */

  // チェック変更
  $('input[name="privacypolicy"], input[name="information"]').change(function () {
    let $btn1 = $('.privacypolicy');
    let $btn2 = $('.information');

    // チェック時
    if ($btn1.prop('checked') && $btn2.prop('checked')) {
        // 体験モニターボタン表示
        $(".visual").show();
        // 透明体験モニターボタン非表示
        $(".trans").hide();

    } else {
        // 体験モニターボタン表示
        $(".visual").hide();
        // 透明体験モニターボタン非表示
        $(".trans").show();
    }
});
});

// スマホ判定
function isSmartPhone() {
  if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
    return true;
  } else {
    return false;
  }
}