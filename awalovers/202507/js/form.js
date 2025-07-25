/**
 * form.js
 *
 * function： LP画面用
 **/

'use strict';

$(function() {
  console.log('is loaded');
  // 端末判定
  const isMobile = /iPhone|Android/i.test(navigator.userAgent);
  // ジャンプオフセット
  const offset = $(window).width() * 0.15;
  // ページ上部からの距離を取得
  let distance = 0;

  // lineボタンを半透明に
  $('#linemonitor').css('opacity', 0.5);
  // スマホだけ動作
  if (isMobile) {
    console.log('is mobile');
      // データレイヤー初期化
    window.dataLayer = window.dataLayer || [];

    // ラジオボタン変更
    $('input[name="q01[]"]:radio').change(function() {
      console.log('radio1 changed');
      // ラジオボタン変更
      const q2yPos = $('#q02').offset().top - offset;
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
      console.log('radio2 changed');
      // ラジオボタン変更
      const q3yPos = $('#q03').offset().top - offset;
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
      console.log('radio3 changed');
      // ラジオボタン変更
      const q4yPos = $('#q04').offset().top - offset;
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
      console.log('radio4 changed');
      // ラジオボタン変更
      const camPos = $('#campaign').offset().top;
      // アニメーション移動
      $('html, body').animate(
        {
          scrollTop: camPos
        },
        300
      );s
    });

    // スクロール処理
    $(document).scroll(function(){
      // スクロール終了処理
      const scrollEnd = $('#q04').offset().top;
      // スクロール距離
      distance = $(this).scrollTop();
      // スクロール距離が『.end_box』の位置を超えたら
      if (scrollEnd <= distance) { 
        // class『none』を追加
        $('.fixed_btn').addClass('display-none'); 
      } else{
        // class『none』を削除
        $('.fixed_btn').removeClass('display-none'); 
      }
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
