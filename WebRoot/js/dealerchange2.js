/* File Created: 三月 19, 2014 */
(function ($) {
    $.dealerSelector = {};
    $.extend($.dealerSelector, {
        callback: null,
        carid: 0,
        ccname: "",
        ccode: 0,
        data: {},
        distance: [],
        init: function (options) {
            $.extend($.dealerSelector, options);
            $.dealerSelector.submit();
        },
        submit: function () {
            var formData = { ccode: $.dealerSelector.ccode, carid: $.dealerSelector.carid };
            $.ajax({
                type: "GET",
                url: "/order/Ajax/dealerSelector.ashx",
                data: formData,
                success: function (data) {
                    if (data) {
                        $.dealerSelector.data = data;
                        if (typeof ($.dealerSelector.callback) == "function") {
                            $.dealerSelector.callback(data);
                        }
                    }
                }
            });
        },
        submitSuc: function () {
            //距离的不要了
            //            if ($.dealerSelector.distance.length > 0) {
            //                debugger;
            //                for (var i = 0; i < $.dealerSelector.distance.length; i++) {
            //                    for (var j = 0; j < $.dealerSelector.data.length; j++) {
            //                        if ($.dealerSelector.data[j].Dealer.DealerId == $.dealerSelector.distance[i].DealerID) {
            //                            $.dealerSelector.data[j].Dealer.Distance = $.dealerSelector.distance[i].Distance;
            //                            break;
            //                        }
            //                    }
            //                }
            //            }
            var obj = { cityName: $.dealerSelector.ccname, dealerCount: $.dealerSelector.data.length, dealers: $.dealerSelector.data };
            $.jqmFrame.deaerSelect2(obj);
        }
    });
})(jQuery);