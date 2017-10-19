(function ($) {
    $.checkcode = {};
    $.extend($.checkcode, {
        // 验证码类型，参照 http://192.168.10.120/wiki/index.php?title=用户相关枚举#确认码类型
        codetype: 0,
        timerclass: "c-orange",
        oMobile: $("#mobile"),   // 手机号
        oVcode: $("#vcode"), // 图形验证码
        oBtnCode: $("#sendcode"), //发送确认码按钮
        errorTips: [],
        changeVCode: null,
        init: function (options) {
            $.extend($.checkcode, options);
            $.checkcode.oBtnCode.on("click", $.checkcode.sendCode);
        },
        sendCode: function () {
            if ($.checkcode.validator.validate()) {
                $.ajax({
                    dataType: 'jsonp',
                    url: hmc_global.config.passportApiDomain + "checkcode/get",
                    data: {
                        mobile: $.trim($.checkcode.oMobile.val()),
                        vcode: $.trim($.checkcode.oVcode.val()),
                        type: $.checkcode.codetype,
                        HMCWEBLOG_ID: typeof (HMCWEBLOG_ID) == 'undefined' ? "" : HMCWEBLOG_ID,
                        HMCWEBLOG_TRACKER: typeof (HMCWEBLOG_TRACKER) == 'undefined' ? "" : HMCWEBLOG_TRACKER
                    },
                    beforeSend: function () {
                        var sc = 60;
                        $.checkcode.oBtnCode.unbind("click").addClass($.checkcode.timerclass).text(sc + "秒后重发");
                        var wt = setInterval(function () {
                            if (parseInt(sc, 10) > 1) {
                                $.checkcode.oBtnCode.text(--sc + "秒后重发");
                            } else {
                                clearInterval(wt);
                                $.checkcode.oBtnCode.unbind("click").click($.checkcode.sendCode).removeClass($.checkcode.timerclass).text("重发确认码");
                            }
                        }, 1000);
                    },
                    success: function (data) {
                        if (!data.IsSuccess) {
                            var message = $.trim(data.ErrorMsg);
                            if (message == '') {
                                message = '发送失败，请稍后再试..'
                            }
                            $.checkcode.errorTips = [message];
                            $.checkcode.showError();
                            //$.checkcode.oBtnCode.unbind("click").click($.checkcode.sendCode)
                        } else {
                            $.checkcode.errorTips = ["发送成功"];
                            $.checkcode.showError();
                        }
                    },
                    complete: function () {
                        if (typeof ($.checkcode.changeVCode) == 'function') {
                            $.checkcode.changeVCode();
                        }
                    }
                });
            } else {
                $.checkcode.showError();
            }
        },
        showError: function () {
            $(".etzone").html($.checkcode.errorTips.join("<br/>")).addClass("errortips");
            setTimeout(function () {
                $(".etzone").empty().removeClass("errortips");
            }, 2000);
            $.checkcode.errorTips = [];
        },
        validator: {
            validateFn: {
                checkMobile: function () {
                    var mobile = $.trim($.checkcode.oMobile.val());
                    if (mobile == "") {
                        $.checkcode.errorTips.push("请输入手机号");
                        return false;
                    } else if (!(/^[0-9]{11}$/.test(mobile))) {
                        $.checkcode.errorTips.push("请输入正确的手机号码");
                        return false;
                    }
                    return true;
                },
                checkVCode: function () {
                    if ($.checkcode.oVcode.val() == "") {
                        $.checkcode.errorTips.push("请输入验证码");
                        return false;
                    }
                    return true;
                }
            },
            validate: function () {
                var success = true;
                $.checkcode.errorTips = [];
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