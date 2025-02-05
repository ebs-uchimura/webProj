/**
 * form.js
 *
 * function： LP form
 **/

"use strict";

$(function () {
    // height
    const q02height = $("#q02").offset().top + 50;
    const q03height = $("#q03").offset().top + 70;
    const q04height = $("#q04").offset().top + 100;
    const policyheight = $("#policy").offset().top - 200;
    // initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    $(".visual").hide();
    
    // change check
    $('input[name="privacypolicy"], input[name="information"]').change(function () {
        let $btn1 = $('.privacypolicy');
        let $btn2 = $('.information');

        // button 1 checked
        if ($btn1.prop('checked') && $btn2.prop('checked')) {
            // show line button
            $(".visual").show();
            // hide transparent line button
            $(".trans").hide();

        } else {
            // hide line button
            $(".visual").hide();
            //  show transparent line button
            $(".trans").show();
        }
    });
});
