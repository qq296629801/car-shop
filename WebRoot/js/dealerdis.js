/* File Created: 三月 19, 2014 */
(function ($) {
    $.dealerdis = {};
    $.extend($.dealerdis, {
        callback: null,
        init: function (options) {
            $.extend($.dealerdis, options);
            $.dealerdis.submit();
        },
        submit: function () {
            $.dealerdis.setData();
        },
        setData: function () {
            var formData = { ccode: $.dealerdis.ccode, carid: $.dealerdis.carid };
            $.ajax({
                type: "GET",
                url: "/order/Ajax/CalDealerDistance.ashx",
                data: formData,
                success: function (data) {
                    if (data) {
                        if (typeof ($.dealerdis.callback) == "function") {
                            $.dealerdis.callback(data);
                        }
                    }
                }
            });

        }
    });
})(jQuery);