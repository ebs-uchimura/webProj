/**
 * index.js
 * function： auto scroll
 **/

'use strict';

$(function () {
  // isMobile
  let isMobile = /iPhone|Android/i.test(navigator.userAgent);
  // counter
  let globalCounter = 1;
  // num area doms
  const numareaClasses = document.getElementsByClassName('numarea');
  // サーバaddress
  //const UPDATE_SERVER_URL = 'https://ebisudo.f5.si';
  const UPDATE_SERVER_URL = 'http://localhost:3002';

  // load
  $(window).on('load', function () {
    // plusbutton
    $('.plusbutton').on('click', function () {
      // or more 0
      globalCounter++;
      // display-none
      $('.numarea').val(globalCounter);
    });

    // minusbutton
    $('.minusbutton').on('click', function () {
      // over 0
      if (globalCounter > 1) {
        globalCounter--;
        // display-none
        $('.numarea').val(globalCounter);
      }
    });
    // hearton
    $('.hearton').on('click', function (e) {
      // display-none
      $(this).next().removeClass('display-none');
      $(this).addClass('display-none');
      // product id
      const productId = $(this).children('span').html();
      console.log(productId);
      // set to local storage
      //ajaxAccess('update/goodoff', { id: productId });
      e.preventDefault();
    });

    // heartoff
    $('.heartoff').on('click', function (e) {
      // display-none
      $(this).prev().removeClass('display-none');
      $(this).addClass('display-none');
      // product id
      const productId = $(this).children('span').html();
      console.log(productId);
      // set to local storage
      ajaxAccess('update/goodon', { id: productId });
      e.preventDefault();
    });

    // Mobile only
    if (isMobile) {
      console.log('is mobile terminal');
      // inner window width
      const FIXEDWIDTH = window.innerWidth / 2 + 30;
      // counter
      let recommendCounter = 0;
      let newCounter = 0;
      let rankingCounter = 0;
      let checkedCounter = 0;
      // children length
      var recommendLen = $('#recommendarea').children().length;
      var newLen = $('#newarea').children().length;
      var rankingLen = $('#rankingarea').children().length;
      var checkedLen = $('#checkedarea').children().length;
      // hide all
      $('#recommendctrl .leftarrow').hide();
      $('#newctrl .leftarrow').hide();
      $('#rankingctrl .leftarrow').hide();
      $('#checkedctrl .leftarrow').hide();

      // right clicked
      $('#recommendctrl .rightarrow').click(function () {
        console.log('right arrow clicked');
        // increment
        recommendCounter++;
        // moveto next
        $('#recommendarea').animate({
          scrollLeft: FIXEDWIDTH * recommendCounter,
          duration: 'fast'
        });
        // if last one
        if (recommendCounter == recommendLen - 1) {
          $(this).hide();
          // show left arror
        } else if (recommendCounter > 0) {
          $('#recommendctrl .leftarrow').show();
        } else {
          console.log('error');
        }
      });

      // right clicked
      $('#newctrl .rightarrow').click(function () {
        console.log('right arrow clicked');
        // increment
        newCounter++;
        // moveto next
        $('#newarea').animate({
          scrollLeft: FIXEDWIDTH * newCounter,
          duration: 'fast'
        });
        // if last one
        if (newCounter == newLen - 1) {
          $(this).hide();
        } else if (newCounter > 0) {
          $('#newctrl .leftarrow').show();
        } else {
          console.log('error');
        }
      });

      // right clicked
      $('#rankingctrl .rightarrow').click(function () {
        console.log('right arrow clicked');
        // increment
        rankingCounter++;
        // moveto next
        $('#rankingarea').animate({
          scrollLeft: FIXEDWIDTH * rankingCounter,
          duration: 'fast'
        });
        // if last one
        if (rankingCounter == rankingLen - 1) {
          $(this).hide();
        } else if (rankingCounter > 0) {
          $('#rankingctrl .leftarrow').show();
        } else {
          console.log('error');
        }
      });

      // right clicked
      $('#checkedctrl .rightarrow').click(function () {
        console.log('right arrow clicked');
        // increment
        checkedCounter++;
        // moveto next
        $('#checkarea').animate({
          scrollLeft: FIXEDWIDTH * checkedCounter,
          duration: 'fast'
        });
        // if last one
        if (checkedCounter == checkedLen - 1) {
          $(this).hide();
        } else if (checkedCounter > 0) {
          $('#checkedctrl .leftarrow').show();
        } else {
          console.log('error');
        }
      });

      // left clicked
      $('#recommendctrl .leftarrow').click(function () {
        console.log('left arrow clicked');
        // decrement
        recommendCounter--;
        // moveto next
        $('#recommendarea').animate({
          scrollLeft: FIXEDWIDTH * recommendCounter,
          duration: 'fast'
        });
        // if last one
        if (recommendCounter == 0) {
          $(this).hide();
        } else if (recommendCounter > 0) {
          $('#recommendctrl .rightarrow').show();
        } else {
          console.log('error');
        }
      });

      // left clicked
      $('#newctrl .leftarrow').click(function () {
        console.log('left arrow clicked');
        // decrement
        newCounter--;
        // moveto next
        $('#newarea').animate({
          scrollLeft: FIXEDWIDTH * newCounter,
          duration: 'fast'
        });
        // if last one
        if (newCounter == 0) {
          $(this).hide();
        } else if (newCounter > 0) {
          $('#newctrl .rightarrow').show();
        } else {
          console.log('error');
        }
      });

      // left clicked
      $('#rankingctrl .leftarrow').click(function () {
        console.log('left arrow clicked');
        // decrement
        rankingCounter--;
        // moveto next
        $('#rankingarea').animate({
          scrollLeft: FIXEDWIDTH * rankingCounter,
          duration: 'fast'
        });
        // if last one
        if (rankingCounter == 0) {
          $(this).hide();
        } else if (rankingCounter > 0) {
          $('#rankingctrl .rightarrow').show();
        } else {
          console.log('error');
        }
      });

      // left clicked
      $('#checkedctrl .leftarrow').click(function () {
        console.log('left arrow clicked');
        // decrement
        checkedCounter--;
        // moveto next
        $('#checkarea').animate({
          scrollLeft: FIXEDWIDTH * checkedCounter,
          duration: 'fast'
        });
        // if last one
        if (checkedCounter == 0) {
          $(this).hide();
        } else if (checkedCounter > 0) {
          $('#checkedctrl .rightarrow').show();
        } else {
          console.log('error');
        }
      });
    } else {
      // onclick
      for (let i = 1; i < 17; i++) {
        // poparea
        $(`.quick${i}`).on('click', function () {
          globalCounter = 1;
          // target html elem
          const targetElement = numareaClasses[i - 1];
          // reset element
          targetElement.value = globalCounter;
          // display-none
          $(`.poparea${i}`).removeClass('display-none');
        });
      }
      // onclick
      for (let j = 1; j < 17; j++) {
        // poparea
        $(`.poparea${j} .batsu`).on('click', function () {
          // display-none
          $(`.poparea${j}`).addClass('display-none');
        });
      }
    }

    // 他の要素のクリックで閉じる
    $(document).click(function (event) {
      if (
        !$(event.target).closest('.view-btn').length &&
        !$(event.target).closest('.pop').length
      ) {
        // メニューを非表示
        $('.pop').addClass('display-none');
      }
    });
  });

  // postリクエスト
  const ajaxAccess = function (url, json) {
    // 同期処理用
    let defer = $.Deferred();
    
    // ajaxアクセス
    $.ajax(UPDATE_SERVER_URL + '/' + url, {
      type: 'post', // POST
      data: json, // 送付データ
      dataType: 'json', // JSON
      cache: false, // キャッシュなし
      async: true // 非同期
    })
      // 完了
      .done(function (data) {
        defer.resolve(data);
      })
      // エラー
      .fail(function () {
        window.alert('正しい結果を得られませんでした。');
      });
    // 実行結果を戻す
    return defer.promise();
  };
});
