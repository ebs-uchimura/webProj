$(function () {
    //セレクトボックスが切り替わったら発動
    $("#list-head-sort").change(function () {
        // 選択したURLを変数に格納
        const url = $(this).val();
        // 選択したURLに移動
        window.location.href = url;
    });
    $("#list-head-category").change(function () {
        // 選択したURLを変数に格納
        const url = $(this).val();
        // 選択したURLに移動
        window.location.href = url;
    });
});
