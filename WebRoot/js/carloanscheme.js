/* File Created: 2016年6月28日12:01:54 */
(function ($) {
    $.carLoanScheme = {};
    $.extend($.carLoanScheme, {
        btnSubmit: null,
        callback: null,
        carId: null,
        cityId: null,
        price: null,
        data: null,
        DownPaymentArray: null,
        RepaymentPeriodArray: null,
        url: null,
        pagetype: null,
        init: function (options) {
            $.carLoanScheme.btnSubmit = $("#ShowLoanScheme");
            $.extend($.carLoanScheme, options);
            $.ajax({
                type: "GET",
                url: $.carLoanScheme.url,
                dataType: 'jsonp',
                jsonp: 'callback',
                data: { carId: $.carLoanScheme.carId, type: "jsonp", cityId: $.carLoanScheme.cityId, price: $.carLoanScheme.price },
                success: function (result) {
                    if (result.IsSupport && result.Result != null) {//有数据
                        $.carLoanScheme.data = result.Result;
                        $.carLoanScheme.DownPaymentArray = result.DownPaymentArray;
                        $.carLoanScheme.RepaymentPeriodArray = result.RepaymentPeriodArray;
                        $.carLoanScheme.btnSubmit.click($.carLoanScheme.submit);
                        if ($.carLoanScheme.pagetype != "neworder") {
                            $("#detail-lend-mask").show();
                        }  

                    }
                    else {
                        $("#detail-lend-mask").remove();
                    }
                }
            });
        },
        submit: function () {
            var obj = {};
            obj.carId = $.carLoanScheme.carId;
            obj.cityId = $.carLoanScheme.cityId;

            obj.result = $.carLoanScheme.data;
            obj.price = $.carLoanScheme.price;
            obj.DownPaymentArray = $.carLoanScheme.DownPaymentArray;
            obj.RepaymentPeriodArray = $.carLoanScheme.RepaymentPeriodArray;
            $.jqmFrame.loanSchemeSelect(obj);

        }
    });
})(jQuery);