var ShareList = ShareList || {};
ShareList.EventBind = function () {
    $('#btnSearch').click(function () {
        var kw = $('#txtKw').val();
        var kwStr = ""
        if (kw != '') {
            kwStr = "kw=" + kw + "&";
        }
        var link = window.AppPath + "/list?" + kwStr + "p=1";
        location.href = link;
    });
    $('#btnJump').click(function () {
        var page = $('#txtGo2Page').val();
        var kw = $.getUrlParam('kw');
        var bd = $.getUrlParam('bd');
        if (page != '') {
            var kwStr = ""
            if (kw != '') {
                kwStr = "kw=" + kw + "&";
            }
            var bdStr = ""
            if (bd != '') {
                bdStr = "bd=" + bd + "&";
            }
            var link = window.AppPath + "/list?" + kwStr + bdStr + "p=" + page;
            location.href = link;
        }
    });
};
$(function () {
    ShareList.EventBind();
    var kw = $.getUrlParam('kw');
    $('#txtKw').val(kw);
});