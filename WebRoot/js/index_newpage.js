/* File Created: 三月 19, 2014 */
(function ($) {
    $.index_newpage = {};
    $.extend($.index_newpage, {
        ccode: 201,
        SiteDomain: "",
        cache: null,
        callback: null,
        init: function (options) {
            $.extend($.index_newpage, options);
            $.index_newpage.GetHotCar();


            var timer_0 = setInterval(function () {
                if (typeof $.hmc_frame !== "undefined") {
                    $.index_newpage.showAdvAppDownload();
                    clearInterval(timer_0);
                }
            }, 200);
        },
        GetHotCar: function () {
            $.ajax({
                type: "GET",
                url: "/Ajax/SearchRecomdCar.ashx?v=" + (+new Date()),
                data: { ccode: $.index_newpage.ccode },
                success: function (data) {
                    var TempLate = '<li id="RecCarTemplate" class="li-car">' +
                            '<a  target="_blank" href="{LinkUrl}">' +
                                '<h3 class="car-name mb0">{CarName}</h3>' +
                                '<p class="car-status">有<b class="num">{BuyCarNum}</b>人正在买</p>' +

                                '<img {Src} alt="">' +
                            '</a>' +
                        '</li>';
                    var html = "";
                    for (var i = 0; i < data.length; i++) {
                        html += TempLate.replace(/{LinkUrl}/g, data[i].LinkUrl)
                        .replace(/{CarName}/g, data[i].SerialName)
                        .replace(/{BuyCarNum}/g, data[i].FinishOrderCountshow)
                        .replace(/{Src}/g, "src=\"" + data[i].ImageUrl + "\"");
                    }
                    $("#ReplaceHotCar").replaceWith(html);
                },
                error: function () { }
            });
        },
        showAdvAppDownload: function() {
//            if($.hmc_frame.utils.readcookie("HomePageAppDownload") !="false")
//            {
//                $(".index-bottom-fixed").show();
//            } else {
//                $(".index-bottom-fixed").hide();
//            }
//            $(".index-bottom-fixed-close").click(function() {
//                $.hmc_frame.utils.setCookie("HomePageAppDownload", "false", 24 * 60 * 60);
//                $(".index-bottom-fixed").hide();
//            });
        }
    });
})(jQuery);