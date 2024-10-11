$(function () {
  $(".pbbottle").hover(
    function () {
      $(this).css('opacity', 0);
    },
    function () {
      $(this).css('opacity', 1);
     }
  );
});