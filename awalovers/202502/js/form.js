/**
 * form.js
 *
 * function： LP画面用
 **/

'use strict';

$(function() {
  // 端末判定
  const isMobile = /iPhone|Android/i.test(navigator.userAgent);
  // 高さ
  const q2yPos = $('#q02').offset().top;
  const q3yPos = $('#q03').offset().top;
  const q4yPos = $('#q04').offset().top;
  const camPos = $('#campaign').offset().top;

  // lineボタンを半透明に
  $('#linemonitor').css('opacity', 0.5);

  // データレイヤー初期化
  window.dataLayer = window.dataLayer || [];

  // スマホだけ動作
  if (isMobile) {
    // ラジオボタン変更
    $('input[name="q01[]"]:radio').change(function() {
      // アニメーション移動
      $('html, body').animate(
        {
          scrollTop: q2yPos
        },
        300
      );
    });

    // ラジオボタン変更
    $('input[name="q02[]"]:radio').change(function() {
      // アニメーション移動
      $('html, body').animate(
        {
          scrollTop: q3yPos
        },
        300
      );
    });

    // ラジオボタン変更
    $('input[name="q03[]"]:radio').change(function() {
      // アニメーション移動
      $('html, body').animate(
        {
          scrollTop: q4yPos
        },
        300
      );
    });

    // ラジオボタン変更
    $('input[name="q04[]"]:radio').change(function() {
      // アニメーション移動
      $('html, body').animate(
        {
          scrollTop: camPos
        },
        300
      );
    });
  }

  // チェック時
  $(
    'input[name="privacypolicy"], input[name="information"]'
  ).change(function() {
    // プライバシーポリシー同意
    let $btn1 = $('.privacypolicy');
    // 情報提供同意
    let $btn2 = $('.information');

    // 両方チェック時
    if ($btn1.prop('checked') && $btn2.prop('checked')) {
      // 透明度を戻す
      $('#linemonitor').css('opacity', 1);
    } else {
      // 半透明にする
      $('#linemonitor').css('opacity', 0.5);
    }
  });
});
