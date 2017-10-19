/* File Created: 三月 19, 2014 */
(function ($) {
    $.carSelector = {};
    $.extend($.carSelector, {
        btnSubmit: null,
        callback: null,
        csname: "",
        csid: 0,
        ccode: 0,
        datasource: {},
        init: function (options) {
            $.carSelector.btnSubmit = $("#carSelector");
            $.extend($.carSelector, options);
            $.carSelector.btnSubmit.click($.carSelector.submit);
        },
        //验证方法集合
        validateFn: {},
        validate: function () {
            var success = true;
            for (var f in this.validateFn) {
                if (this.validateFn.hasOwnProperty(f)) {
                    success = this.validateFn[f]() && success;
                }
            }
            return success;
        },
        submit: function () {
            if ($.carSelector.validate()) {
                $.jqmFrame.preShow("选择您中意的" + $.carSelector.csname, "fuc_w795");
                if ($.carSelector.datasource) {
                    $.carSelector.submitSuc($.carSelector.datasource);
                }
            }
        },
        submitSuc: function (data) {
            var obj = {};
            obj.CSName = $.carSelector.csname;
            obj.CarsInfo = data;
            $.jqmFrame.carSelect(obj, $.carSelector.showcb);
        }
    });
})(jQuery);