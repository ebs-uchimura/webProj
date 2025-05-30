/**
 * index.js
 * function： auto scroll
 **/

'use strict';

// isMobile
let isMobile = /iPhone|Android/i.test(navigator.userAgent);
// counter
let globalCounter = 1;
// check limit
const checkMax = 3;

window.onload = function () {
  // except for moible terminal
  if (!isMobile) {
    const formDom = document.getElementById("regform");
    // num area doms
    const numareaClasses1 = document.getElementsByClassName('checkbox1');
    const numareaClasses2 = document.getElementsByClassName('checkbox2');

    // check count
    function checkCount1() {
      let checkCount = 0;
      Array.from(numareaClasses1).forEach(checkBox => {
        if (checkBox.checked) {
          checkCount++;
        }
      });
      if (checkCount == 0) {
        alert('最低一つは選択してください');
        return false;
      }
      if (checkCount > checkMax) {
        alert('最大3つまで');
        return false;
      } else {
        return true;
      }
    }
    // check count
    function checkCount2() {
      let checkCount = 0;
      Array.from(numareaClasses2).forEach(checkBox => {
        if (checkBox.checked) {
          checkCount++;
        }
      });
      if (checkCount == 0) {
        alert('最低一つは選択してください');
        return false;
      }
      if (checkCount > checkMax) {
        alert('最大3つまで');
        return false;
      } else {
        return true;
      }

    }

    formDom.addEventListener("submit", function (e) {
      e.preventDefault();
      const result1 = checkCount1();
      const result2 = checkCount2();
      if (result1 && result2) {
        formDom.submit();
      }
    });
  }
}