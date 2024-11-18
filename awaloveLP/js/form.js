/**
 * form.js
 *
 * function： LP画面用
 **/

"use strict";

$(function () {
    // 高さ
    const q02height = $("#q02").offset().top + 50;
    const q03height = $("#q03").offset().top + 70;
    const q04height = $("#q04").offset().top + 100;
    const policyheight = $("#policy").offset().top - 200;
    // データレイヤー初期化
    window.dataLayer = window.dataLayer || [];

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
        // モバイル
        $('html, body').animate({
        scrollTop: policyheight
        }, 300);
    });
    
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
