/**
 * index.js
 *
 * function： LP画面用
 **/

"use strict";

$(function () {
    // 書き換え
    $("#magiccode").html("魔法" + getQuery().toString());
    // トグル用フラグ
    let menuOpenFlg = false;
    // トグル用フラグ
    let menuFlg = false;
    // 体験モニターボタン非表示
    $(".visual").hide();
    // 透明体験モニターボタン表示
    $(".trans").show();

    // ハンバーガークリック時
    $(".hamburger").on("click", function () {
        // トグル
        menuFlg = !menuFlg;
        menuOpenFlg = !menuOpenFlg;

        // 画面最上部に位置をずらす
        $(".menu-base").scrollTop($(window).scrollTop());

        // フラグON
        if (menuFlg) {
            // メニューを非表示
            $(".menuarea").removeClass("display-none");
        } else {
            // メニューを表示
            $(".menuarea").addClass("display-none");
        }
    });

    // メニュークリック時
    $(".menu-text li a").on("click", function () {
        // トグル
        menuFlg = !menuFlg;

        // フラグON
        if (menuFlg) {
            // メニューを表示
            $(".menuarea").removeClass("display-none");
        } else {
            // メニューを表示
            $(".menuarea").addClass("display-none");
        }
    });

    // メニュー×ボタンクリック時
    $(".menuarea .batsu").on("click", function () {
        // トグル
        //menuFlg = !menuFlg;

        // メニューを非表示
        $(".menuarea").addClass("display-none");
    });

    // ポップアップクリック時
    $(".intro_button").on("click", function () {
        // メニューを非表示
        $(".poparea").removeClass("display-none");
    });

    // ポップアップ×ボタンクリック時
    $(".poparea .batsu").on("click", function () {
        // メニューを非表示
        $(".poparea").addClass("display-none");
    });

    // 他の要素のクリックで閉じる
    $(document).click(function(event) {
        if (!$(event.target).closest('.menu-text li a').length && !$(event.target).closest('.hamburger').length && !$(event.target).closest('.check_lb').length && !$(event.target).closest('.header-logo').length && !$(event.target).closest('.button_area').length && !$(event.target).closest('.footer-column').length && !$(event.target).closest('.annotation').length && !$(event.target).closest('.head_button').length){
           // トグル
            menuFlg = !menuFlg;

            // フラグON
            if (menuFlg && menuOpenFlg) {
                // メニューを表示
                $(".menuarea").removeClass("display-none");
            } else {
                // メニューを表示
                $(".menuarea").addClass("display-none");
            }
        }
    });
});

// クエリ取得
function getQuery() {
    const url = new URL(window.location.href);
    return url.searchParams.get('code');
}
