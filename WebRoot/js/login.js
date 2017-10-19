(function ($) {
    $.login = {};
    $.extend($.login, {
        ccode: 201,
        redirectUrl: hmc_global.config.siteDomain + "search",
        oName: $("#login-name"),
        oPwd: $("#pwd"),
        oVcode: $("#vcode"),
        oBtnSubmit: $("#login-submit"),
        oErrors: {
            name: $("#errName"),
            password: $("#errPwd"),
            vcode: $("#errVcode"),
            system: $("#errSystem")
        },
        init: function (options) {
            $.extend($.login, options);

            $.login.initAuth();
            $.login.oBtnSubmit.on('click', $.login.loginSubmit);
            $("body").keydown(function (event) {
                if (event.keyCode == "13") { //回车
                    $.login.loginSubmit();
                }
            });
            $(".changecode").on('click', $.login.changeVCode);
        },
        initAuth: function () {
            $.ajax({
                dataType: 'jsonp',
                url: hmc_global.config.syncDomain + "auth/login",
                success: function (data) {
                    if (data.warning) {
                        $.login.changeVCode();
                        $.login.oVcode.parent().parent().show();
                    }
                }
            });
        },
        changeVCode: function () {
            $('#vcode-img').attr("src", hmc_global.config.syncDomain + "checkcode/login?v=" + Date.now());
        },
        loginSubmit: function () {
            // 隐藏所有错误提示
            for (var e in $.login.oErrors) {
                $.login.oErrors[e].hide();
            }
            if ($.login.validator.validate()) {
                $.ajax({
                    dataType: 'jsonp',
                    url: hmc_global.config.passportApiDomain + "user/login",
                    data: {
                        phone: $.trim($.login.oName.val()),
                        pwd: $.login.oPwd.val(),
                        vcode: $.trim($.login.oVcode.val()),
                        HMCWEBLOG_ID: typeof (HMCWEBLOG_ID) == 'undefined' ? "" : HMCWEBLOG_ID,
                        HMCWEBLOG_TRACKER: typeof (HMCWEBLOG_TRACKER) == 'undefined' ? "" : HMCWEBLOG_TRACKER
                    },
                    beforeSend: function () {
                        $.login.oBtnSubmit.unbind("click").html("登录中...");
                    },
                    success: function (data) {
                        if (data.IsSuccess) {
                            SSOHelper.invoke();
                            window.location.href = $.login.redirectUrl;
                        } else {
                            $.login.showError(data);
                            if (data.Warnning) {
                                $.login.changeVCode();
                                $.login.oVcode.parent().parent().show();
                            }
                        }
                    },
                    complete: function () {
                        $.login.oBtnSubmit.on('click', $.login.loginSubmit).html("登录，开始买车");
                    }
                });
            }
        },
        showError: function (data) {
            switch (data.ErrorType) {
                case 1:
                    $.login.oErrors.phone.html(data.ErrorMsg).show();
                    break;
                case 2:
                    $.login.oErrors.password.html(data.ErrorMsg).show();
                    break;
                case 3:
                    $.login.oErrors.vcode.html(data.ErrorMsg).show();
                    break;
                case 4:
                    $.login.oErrors.mobile.html(data.ErrorMsg).show();
                    break;
                case 5:
                    $.login.oErrors.mcode.html(data.ErrorMsg).show();
                    break;
                default:
                    $.login.oErrors.system.html(data.ErrorMsg).show();
                    break;
            }
        },
        validator: {
            validateFn: {
                checkPhone: function () {
                    if ($.login.oName.val() == "") {
                        $.login.oErrors.name.html("请输入账号").show();
                        return false;
                    }
                    return true;
                },
                checkPwd: function () {
                    if ($.login.oPwd.val() == "") {
                        $.login.oErrors.password.html("请输入密码").show();
                        return false;
                    }
                    return true;
                },
                checkValidCode: function () {
                    if ($.login.oVcode.parent().parent().is(":visible") && $.login.oVcode.val() == "") {
                        $.login.oErrors.vcode.html("请输入验证码").show();
                        return false;
                    }
                    return true;
                }
            },
            validate: function () {
                var success = true;
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