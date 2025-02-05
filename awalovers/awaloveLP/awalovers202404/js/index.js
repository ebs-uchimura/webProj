/**
 * index.js
 *
 * function： main js
 **/

"use strict";

(function ($) {

  $(function () {
    // menu open flg
    let menuOpenFlg = false;
    // toggle flg
    let menuFlg = false;
    // hide line button
    $(".visual").hide();
    // show transparent line button
    $(".trans").show();

    // when sp
    if (device() == 'mobile') {
      $(".fixed_btn").show();

    } else {
      $(".fixed_btn").hide();
    }

    // hamburger click
    $(".hamburger").on("click", function () {
      // toggle
      menuFlg = !menuFlg;
      menuOpenFlg = !menuOpenFlg;

      // scroll to top
      $(".menu-base").scrollTop($(window).scrollTop());

      // toggle
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
      // copy to clipboard
      copyTextToClipboard('https://ebisu.love/202404/');
    });

    // popup × txt click
    $(".poparea .batsu").on("click", function () {
      // hide popup
      $(".poparea").addClass("display-none");
    });

    // click when on others
    $(document).click(function(event) {
      if (!$(event.target).closest('.menu-text li a').length && !$(event.target).closest('.hamburger').length && !$(event.target).closest('.check_lb').length && !$(event.target).closest('.header-logo').length && !$(event.target).closest('.button_area').length){
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

})(window.jQuery);

// detect terminal
function device() {
  const ua = navigator.userAgent;
  if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
    return 'mobile';
  } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

// copy to clipboard
function copyTextToClipboard(textToCopy) {
  if (navigator?.clipboard?.writeText) {
    return navigator.clipboard.writeText(textToCopy);
  }
  return Promise.reject('The Clipboard API is not available.');
}
