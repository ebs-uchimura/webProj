/**
 * index.js
 *
 * function： main js
 **/

"use strict";

$(function () {
    // menu open flg
    let menuOpenFlg = false;
    // toggle flg
    let menuFlg = false;
    // hide line button
    $(".visual").hide();
    // show transparent line button
    $(".trans").show();

    // hamburger click
    $(".hamburger").on("click", function () {
        // toggle
        menuFlg = !menuFlg;
        menuOpenFlg = !menuOpenFlg;

        // slide to top
        $(".menu-base").scrollTop($(window).scrollTop());

        // menu open flg
        if (menuFlg) {
            // show menu
            $(".menuarea").removeClass("display-none");
        } else {
            // hide menu
            $(".menuarea").addClass("display-none");
        }
    });

    // menu txt click
    $(".menu-text li a").on("click", function () {
        // toggle flg
        menuFlg = !menuFlg;

        // menu open flg
        if (menuFlg) {
            // show menu
            $(".menuarea").removeClass("display-none");
        } else {
            // hide menu
            $(".menuarea").addClass("display-none");
        }
    });

    // menu × txt click
    $(".menuarea .batsu").on("click", function () {
        // hide menu
        $(".menuarea").addClass("display-none");
    });

    // popup click
    $(".intro_button").on("click", function () {
        // show popup
        $(".poparea").removeClass("display-none");
    });

    // popup × txt click
    $(".poparea .batsu").on("click", function () {
        // hide popup
        $(".poparea").addClass("display-none");
    });

    // click when on others
    $(document).click(function(event) {
        if (!$(event.target).closest('.menu-text li a').length && !$(event.target).closest('.hamburger').length && !$(event.target).closest('.check_lb').length && !$(event.target).closest('.header-logo').length && !$(event.target).closest('.button_area').length && !$(event.target).closest('.footer-column').length && !$(event.target).closest('.annotation').length && !$(event.target).closest('.head_button').length){
            // toggle
            menuFlg = !menuFlg;

            // flg on
            if (menuFlg && menuOpenFlg) {
                // show menu
                $(".menuarea").removeClass("display-none");
            } else {
                // hide menu
                $(".menuarea").addClass("display-none");
            }
        }
    });
});
