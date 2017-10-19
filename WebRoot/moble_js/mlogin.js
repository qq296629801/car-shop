(function ($) {
    $.mlogin = {};
    $.extend($.mlogin, {
        ccode: 201,
        redirectUrl: hmc_global.config.siteDomain + "search",
        oMobile: $("#mobile"),
        oMcode: $("#mcode"),
        oVcode: $("#vcode"),
        oHdType: $("#hd_type"),
        oHdParam: $("#hd_param"),
        oBtnSubmit: $("#mlogin-submit"),
        loginSuccessed: null,//登录成功回调函数
        errorTips: [],
        init: function (options) {
            $.extend($.mlogin, options);

            $.mlogin.initAuth();
            $(".changecode").on('click', $.mlogin.changeVCode);
            $.mlogin.oBtnSubmit.on('click', $.mlogin.loginSubmit);

            $.checkcode.init({
                codetype: 2,
                timerclass: "register-content-right-mensure-clicked",
                oMobile: $.mlogin.oMobile,
                oVcode: $.mlogin.oVcode,
                oBtnCode: $("#sendcode"),
                changeVCode: $.mlogin.changeVCode
            });
        },
        initAuth: function () {
            $.ajax({
                dataType: 'jsonp',
                url: hmc_global.config.syncDomain + "auth/sms",
                success: function (data) {
                    if (data.warning) {
                        $.mlogin.changeVCode();
                        $.mlogin.oVcode.parent().show();
                    }
                }
            });
        },
        changeVCode: function () {
            $('#vcode-img').attr("src", hmc_global.config.syncDomain + "checkcode/sms?v=" + Date.now());
        },
        loginSubmit: function () {
            if ($.mlogin.validator.validate()) {
                $.ajax({
                    dataType: 'jsonp',
                    url: hmc_global.config.passportApiDomain + "user/loginbymobile",
                    data: {
                        mobile: $.trim($.mlogin.oMobile.val()),
                        code: $.trim($.mlogin.oMcode.val()),
                        vcode: $.trim($.mlogin.oVcode.val()),
                        urlquery: window.location.href.split("?")[1] || "",
                        hdtype: $.trim($.mlogin.oHdType.val() || ""),
                        hdparam: $.trim($.mlogin.oHdParam.val() || ""),
                        HMCWEBLOG_ID: typeof (HMCWEBLOG_ID) == 'undefined' ? "" : HMCWEBLOG_ID,
                        HMCWEBLOG_TRACKER: typeof (HMCWEBLOG_TRACKER) == 'undefined' ? "" : HMCWEBLOG_TRACKER
                    },
                    beforeSend: function () {
                        $.mlogin.oBtnSubmit.unbind("click");
                        $("#div_loading").show();
                    },
                    success: function (response) {
                        if (response.IsSuccess) {
                            SSOHelper.invoke();
                            if (typeof ($.mlogin.loginSuccessed) == "function") {
                                $.mlogin.loginSuccessed(response.Data.LoginUserType);
                            } else {
                                window.location.href = $.mlogin.redirectUrl;
                            }
                        } else {
                            var message = $.trim(response.ErrorMsg);
                            if (message == '') {
                                message = '登录失败，请稍后再试..'
                            }
                            $.mlogin.errorTips = [message];
                            $.mlogin.showError();

                            if (response.Warnning) {
                                $.mlogin.changeVCode();
                                $.mlogin.oVcode.parent().show();
                            }
                        }
                    },
                    complete: function () {
                        $.mlogin.oBtnSubmit.on("click", $.mlogin.loginSubmit);
                        $("#div_loading").hide();
                    }
                });
            } else {
                $.mlogin.showError();
            }
        },
        showError: function () {
            $(".etzone").html($.mlogin.errorTips.join("<br/>")).addClass("errortips");
            setTimeout(function () {
                $(".etzone").empty().removeClass("errortips");
            }, 2000);

            $.mlogin.errorTips = [];
        },
        validator: {
            validateFn: {
                checkMobile: function () {
                    var mobile = $.trim($.mlogin.oMobile.val());
                    if (mobile == "") {
                        $.mlogin.errorTips.push("请输入手机号");
                        return false;
                    } else if (!(/^[0-9]{11}$/.test(mobile))) {
                        $.mlogin.errorTips.push("请输入正确的手机号码");
                        return false;
                    }
                    return true;
                },
                checkMcode: function () {
                    if ($.mlogin.oMcode.val() == "") {
                        $.mlogin.errorTips.push("输入手机收到的确认码");
                        return false;
                    }
                    return true;
                }
            },
            validate: function () {
                var success = true;
                $.mlogin.errorTips = [];
                for (var f in this.validateFn) {
                    if (this.validateFn.hasOwnProperty(f)) {
                        success = this.validateFn[f]() && success;
                    }
                }
                return success;
            }
        }
    });
})(jQuery);