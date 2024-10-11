$(function () {
  $(".product-button-image").hover(
    function () {
      console.log('hage');
      $(this).css('opacity', 0);
    },
    function () {
      console.log('hige');
      $(this).css('opacity', 1);
     }
  );
});