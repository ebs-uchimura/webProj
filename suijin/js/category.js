$(function () {
    //セレクトボックスが切り替わったら発動
    $("#list-head-sort").change(function () {
        // 選択したURLを変数に格納
        const url = $(this).val();
        console.log(url);
        // 選択したURLに移動
        window.location.href = url;
    });
    $("#list-head-category2").change(function () {
        // 選択したURLを変数に格納
        console.log($(this));
        const url = $(this).val();
        console.log(url);
        // 選択したURLに移動
        window.location.href = url;
    });
});
