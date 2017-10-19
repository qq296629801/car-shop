/* File Created: 三月 19, 2014 */

(function ($) {
    $.ordernew = {};
    $.extend($.ordernew, {
        oColor: $("#ddcolor"), //外观颜色
        oUpColor: $("#ddpholstery"), //内饰颜色
        oBuyTime: $("#buytc"), //购车时间
        oBuyType: $("#ddtype"), //购车方式
        oLoc: $("#ddbrandloc"), //上牌城市
        oDealer: $("#dealers"), //4S店
        oName: $("#oName"), //姓名
        oPhone: $("#oPhone"), //手机号
        oChangeBrand: $("#changeBrand"), //品牌
        oChangeOldYear: $("#changeOldYear"), //首次上牌时间
        oChangeGift: $("#changeGift"), //置换车的礼品
        csSpell: "",
        carid: 0,
        btnSubmit: $("#next"), //提交按钮
        btnLoading: $("#before-next"), //loading
        callback: null,
        cityCache: $("#cuCity"), //上牌城市
        buyTarget: $("#buyTarget"), //购车指标
        isTestDrive: $("#isTestDrive"), //是否试驾
        hopeBareCarPrice: $("#hopeBareCarPrice"), //期望裸车价 
        maybeBudget: $("#maybeBudget"), //大致预算   
        otherNeed: $("#otherNeed"), //其他需求
        legalCity: null, //在当前城市提车允许的可以上牌城市列表
        carSaleCity: null, //获取车款售卖城市
        giftId: 0, //购车礼包
        giftType: 0, //购车礼包类型
        isGift: false, //是否选了购车礼包
        isLogin: "", //是否登录，默认"",1=登录，0=未登录 
        localCityName: "",
        localCityCode: 0,
        isBuy: false,
        cityList: null,
        checkFlag: false,
        init: function (options) {
            $.extend($.ordernew, options);
            $.ordernew.ccode = $.ordernew.lc;
            $.ordernew.initCityList();
            //初始化可上牌城市
            $.ordernew.legalCityInit();
            //初始化车款售卖城市
            $.ordernew.carSaleCityInit();

            //初始化地区
            $.ordernew.initProvinceList();
            //从cookie中读取用户记录
            $.ordernew.utils.recoverInput();
            //内饰颜色
            var curClass = 'current';
            $("a", $("#ddpholstery")).click(function () {
                $.ordernew.oUpColor.attr("data-code", $(this).children().attr("data-code"));
                $(this).addClass(curClass).siblings().removeClass(curClass);
            });

            // 购车时间
            $("div", $("#buytc")).click(function () {
                var that = $(this);
                that.parent().attr("data-code", that.attr("data-code"))
                    .children().removeClass(curClass);
                that.addClass(curClass);
            });

            // 是否试驾
            $("#isTestDrive").on("click", "div", function () {
                $.ordernew.isTestDrive.attr("data-code", $(this).attr("data-code"));
                $(this).addClass("current").siblings().removeClass("current");
            });

            //购车指标 buyTarget
            $("#buyTarget").on("click", "div", function () {
                $.ordernew.buyTarget.attr("data-code", $(this).attr("data-code"));
                $(this).addClass("current").siblings().removeClass("current");
            });

            //外观颜色
            var $lenscolor = $(".lenscolor");
            $lenscolor.find("a").click(function () {
                $(this).addClass("current").siblings().removeClass("current");
                $.ordernew.oColor.attr("data-code", $(this).attr("data-code"));
                $.ordernew.oColor.attr("data-text", $(this).attr("data-text"));
            }).bind("select", function () { $(this).trigger("click"); });

            //购车方式-置换全款-选品牌
            $(".selectbox").on("click", "li", function () {
                var sCode = $(this).attr("data-code");
                var sText = $.trim($(this).text() || $(this).html());
                var box = $(this).parent().parent();
                box.hide().prev().attr("data-code", sCode).html(sText);
                return false;
            }).on({
                click: function (e) {
                    hmc_global.events.popStopCancel(e);
                    $(".seler_layer").hide();
                    $(this).find(".seler_layer").show();
                }
            });


            //上牌地区（省份点击事件）
            $(".selectbox_new_province").on("click", "li", function () { //上牌城市li点击事件(省份)
                var sCode = $(this).attr("data-code"); //获取li的城市id
                var sText = $.trim($(this).text() || $(this).html()); //获取li的城市名称
                var box = $(this).parent().parent(); //获取城市列表div
                box.hide().prev().prev().attr("data-code", sCode).html(sText); //隐藏列表div，把值赋给显示的span
                return false;
            }).on({
                click: function (e) {
                    hmc_global.events.popStopCancel(e);
                    $(".seler_layer_new").hide();
                    $(this).find(".seler_layer_new").show();
                }
            });

            //上牌地区(城市点击事件)
            $(".selectbox_new_city").on("click", "li", function () { //上牌城市li点击事件(城市)
                var sCode = $(this).attr("data-code"); //获取li的城市id
                var sText = $.trim($(this).text() || $(this).html()); //获取li的城市名称
                var box = $(this).parent().parent(); //获取城市列表div
                box.hide().prev().prev().attr("data-code", sCode).html(sText); //隐藏列表div，把值赋给显示的span
                CheckBoardCity();
                return false;
            }).on({
                click: function (e) {
                    hmc_global.events.popStopCancel(e);
                    $(".seler_layer_new").hide();
                    $(this).find(".seler_layer_new").show();
                }
            });




            //绑定下一步按钮
            $.ordernew.btnSubmit.click($.ordernew.submitOrderFlow.startSubmit);
            $("#btnlogout").click($.ordernew.logOut);
            //点击空白处下拉隐藏
            $(document).click(function () {
                $('.seler_layer').hide();
                $('.seler_layer_new').hide();
                $('.seler_layer_brand').hide();
            });

            //设置礼包默认值
            if (giftArr.length > 0) {
                var idn = "#" + giftArr[0];
                $.ordernew.giftId = $(idn).attr("data-id");
                $.ordernew.giftType = $(idn).attr("data-type");
                $(idn).addClass("current");
            }

            //选择4s店信息
            $.dealerSelector.init({
                ccode: $("#cuCity").attr("data-code"),
                carid: $("#carSelector").attr("data-code"),
                ccname: $.trim($("#cuCity").text()),
                callback: function (data) {
                    if (data) {
                        $.ordernew.oDealer.html(data.length + "家");
                        if (data.length == 0) {
                            $.ordernew.btnSubmit.unbind("click").parent().prev().addClass("button_grno");
                        }
                        var ids = [];
                        for (var i = 0; i < data.length; i++) {
                            ids.push(data[i].Dealer.DealerId);
                        }
                        $.ordernew.oDealer.attr("data-code", ids.join(","));
                        if (ids.length > 0) {
                            //初始化距离
                            $.dealerdis.init({
                                ccode: $("#cuCity").attr("data-code"),
                                carid: $("#carSelector").attr("data-code"),
                                callback: function (dis) {
                                    if (dis) {
                                        var dealers = $(".jxs_box li .sel span");
                                        if (dealers.length == 0) {
                                            $.dealerSelector.distance = dis;
                                            return;
                                        }
                                        for (var i = 0; i < dis.length; i++) {
                                            dealers.each(function () {
                                                if ($(this).attr("data-code") == dis[i].DealerID) {
                                                    $(this).parent().parent().children().find(".jl").html(dis[i].Distance);
                                                }
                                            });
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
            });
            $.ordernew.oDealer.click(function () {
                $.dealerSelector.submitSuc();
            });

            //同意服务协议
            $("#chb_contract").click(function () {
                if (!$(this).hasClass("selected")) { //被选中
                    $(this).addClass("selected");
                    $.ordernew.btnSubmit.removeClass("disabled").click($.ordernew.submitOrderFlow.startSubmit);
                } else {
                    $(this).removeClass("selected");
                    $.ordernew.btnSubmit.addClass("disabled").unbind("click");
                }
            });

            //礼包点击事件
            $(".new-order-gift-ra").on("click", function () {
                $(".new-order-gift-ra").removeClass("current");
                $(this).addClass("current");
                $.ordernew.giftId = $(this).attr("data-id");
                $.ordernew.giftType = $(this).attr("data-type");
            });

            $.ordernew.phoneModifier.init();

            var timer_0 = setInterval(function () {
                if (typeof $.hmc_frame !== "undefined") {
                    if (hmc_topfoot && hmc_topfoot.warning) {
                        $.ordernew.phoneModifier.oImg.trigger("click");
                        $(".vcode").show();
                    }
                    $.hmc_frame.reset({
                        login_callback: function () {
                            $.ordernew.utils.saveInput();
                            if (!$.hmc_frame.noreload) {
                                window.location.reload(true);
                            }
                        },
                        logout_callback: function () { //退出状态下不清空用户痕迹了（原本清空的）
                            //hmc_global.utils.setCookie("order", "");
                        }
                    });
                    clearInterval(timer_0);
                }
            }, 200);

            var showFlag = 0;
            for (var idx = 0; idx < $.ordernew.cityList.length; idx++) {//判断天天拍车城市是否显示
                if ($.ordernew.ccode == $.ordernew.cityList[idx]) {
                    //初始化车辆购置信息
                    $.ordernew.changeCar.checkOrder(1);
                    showFlag = 1;
                }
            }
            if (showFlag == 0) {
                $.ordernew.changeCar.checkOrder(0);
            }

            //检查登录状态
            $.ordernew.submitOrderFlow.orderLoginChecker.getLogStatus();

            //头部流程
            $(".dind_nob_hx2").find("span").css("width", "33%");
            $(".dind_nob2 li").eq(0).addClass("green");
        },
        utils: {
            saveInput: function () {
                var changebrandVal = "";
                var changeoldyearVal = "";
                if ($.ordernew.oChangeBrand.attr("data-code") !== "undefined") {
                    changebrandVal = $.ordernew.oChangeBrand.attr("data-code");
                }
                if ($.ordernew.oChangeOldYear.attr("data-code") !== "undefined") {
                    changeoldyearVal = $.ordernew.oChangeOldYear.attr("data-code");
                }
                var saveValue = {
                    "color": $.ordernew.oColor.attr("data-code"),
                    "colName": encodeURI($.ordernew.oColor.attr("data-text")),
                    "type": $.ordernew.oBuyType.attr("data-code"),
                    "time": $.ordernew.oBuyTime.attr("data-code"),
                    "mname": "",
                    "upcolor": encodeURI($.ordernew.oUpColor.attr("data-code")),
                    "bandloc": $.ordernew.oLoc.find("span").eq(0).attr("data-code") + "," + $.ordernew.oLoc.find("span").eq(1).attr("data-code"),
                    "changebrand": encodeURI(changebrandVal), //品牌编码
                    "brandname": encodeURI($.ordernew.oChangeBrand.text()), //品牌名称
                    "changeoldyear": encodeURI(changeoldyearVal), //年编码
                    "yeartext": encodeURI($.ordernew.oChangeOldYear.text()), //年名称
                    "changegift": $.ordernew.oChangeGift.is(":checked"),
                    "buytarget": $.ordernew.buyTarget.attr("data-code"),
                    "istestdrive": $.ordernew.isTestDrive.attr("data-code"),
                    "hopebarecarprice": encodeURI($.ordernew.hopeBareCarPrice.val()),
                    "maybebudget": encodeURI($.ordernew.maybeBudget.val()),
                    "otherneed": encodeURI($.ordernew.otherNeed.val())
                };
                hmc_global.utils.setCookie("order", JSON.stringify(saveValue), null, "/");
            },
            recoverInput: function () {
                if (hmc_global.utils.readcookie("order") != "") { //cookie存有记录，cookie中读取记录
                    try {
                        var cb = $.parseJSON(hmc_global.utils.readcookie("order"));

                        if ($.ordernew.oColor.children("a.new-order-tr-color[data-code=" + cb.color + "]").size()) {
                            $.ordernew.oColor.attr("data-code", cb.color);
                            $.ordernew.oColor.attr("data-text", decodeURI(cb.colName));
                            $.ordernew.oColor.children("a.new-order-tr-color[data-code=" + cb.color + "]").addClass("current");
                        }

                        $.ordernew.oBuyType.attr("data-code", cb.type);
                        $.ordernew.oBuyType.children("div.new-order-buycar-way[data-code=" + cb.type + "]").addClass("current");
                        if (cb.type == "1") { //新车贷款
                            $("#detail-lend-mask").show();
                        }

                        $.ordernew.oBuyTime.attr("data-code", cb.time);
                        $.ordernew.oBuyTime.children("div.new-order-buycar-time[data-code=" + cb.time + "]").addClass("current");

                        $.ordernew.oUpColor.attr("data-code", decodeURI(cb.upcolor)); //内饰颜色
                        $.ordernew.oUpColor.children().children("span[data-code=" + decodeURI(cb.upcolor) + "]").parent().addClass("current");

                        $.ordernew.oChangeBrand.attr("data-code", decodeURI(cb.changebrand)); //品牌
                        $.ordernew.oChangeBrand.text(decodeURI(cb.brandname));
                        $.ordernew.oChangeOldYear.attr("data-code", decodeURI(cb.changeoldyear)); //年份
                        $.ordernew.oChangeOldYear.text(decodeURI(cb.yeartext));
                        $.ordernew.buyTarget.attr("data-code", cb.buytarget);
                        $.ordernew.buyTarget.children("div.new-order-buycar-amount[data-code=" + cb.buytarget + "]").addClass("current");

                        $.ordernew.isTestDrive.attr("data-code", cb.istestdrive);
                        $.ordernew.isTestDrive.children("div.new-order-detail-bwrtry[data-code=" + cb.istestdrive + "]").addClass("current");


                        $.ordernew.hopeBareCarPrice.val(decodeURI(cb.hopebarecarprice));
                        $.ordernew.maybeBudget.val(decodeURI(cb.maybebudget));
                        $.ordernew.otherNeed.val(decodeURI(cb.otherneed));

                        for (var i = 0; i < $.ordernew.cityList.length; i++) { //遍历活动城市，查看当前城市是否在列表中
                            if ($.ordernew.ccode == $.ordernew.cityList[i]) {
                                if (cb.changegift) {
                                    $("#changeGift").attr("checked", "checked");
                                    $(".replacement .mycar-info").show();
                                } else {
                                    $(".replacement .mycar-info").hide();
                                }
                            }
                        }
                        var brandLoc = cb.bandloc.split(",");
                        if (brandLoc.length > 1 && brandLoc[0] != "undefined") {
                            $.ordernew.lp = brandLoc[0];
                        }
                        if (brandLoc.length > 1 && brandLoc[1] != "undefined") {
                            $.ordernew.lc = brandLoc[1];
                        }
                    } catch (e) {
                    }
                } else {
                    //$("#ddtype").find("span").eq(1).addClass("current");
                }
            }
        },
        //验证方法集合
        validateFn: {
            checkUserName: function () {
                return $.validator.validate({
                    el: $.ordernew.oName,
                    failCallback: function (err) {
                        if (err) {
                            var errObj = $("<div  class=\"new-order-error\"><i></i><span>" + err + "</span></div>");
                            $.ordernew.oName.parent().parent().after(errObj);
                        }
                    },
                    customCheck: function () {
                        var vr = $.validator.createResult();
                        if ($.trim($.ordernew.oName.val()).length === 0) {
                            vr.errMsg = "请输入姓名";
                            vr.success = false;
                        } else if ($.trim($.ordernew.oName.val()).length < 2) {
                            vr.errMsg = "请输入2-6个汉字";
                            vr.success = false;
                        } else if (!$.ordernew.checkNameStr($.ordernew.oName.val())) {
                            vr.errMsg = "请输入2-6个汉字";
                            vr.success = false;
                        } else {
                            vr.success = true;
                        }
                        return vr;
                    }
                }).IsPass();
            },
            checkPhone: function () {
                return $.validator.validate("phone", {
                    el: $.ordernew.oPhone,
                    allowEmpty: false,
                    failCallback: function (err) {
                        if (err) {
                            var errObj = $("<div  class=\"new-order-error\"><i></i><span>" + err + "</span></div>");
                            $.ordernew.oPhone.parent().parent().append(errObj);
                        }
                    }
                }).IsPass();
            },
            checkDealer: function () {
                return $.validator.validate({
                    el: $.ordernew.oDealer,
                    customCheck: function () {
                        var vr = $.validator.createResult();
                        var value = $.ordernew.oDealer.attr("data-code");
                        vr.errMsg = "请选择至少1家4S店";
                        if (value && value.split(',').length >= 1) {
                            vr.success = true;
                        }
                        return vr;
                    }
                }).IsPass();
            },
            checkGift: function () {
                return $.validator.validate({
                    el: $("#div_gifterror"),
                    customCheck: function () {
                        var vr = $.validator.createResult();
                        vr.errMsg = "请选择礼品";
                        if ($.ordernew.isGift) {
                            if ($.ordernew.giftId > 0) {
                                vr.success = true;
                            } else {
                                vr.success = false;
                            }
                        } else {
                            vr.success = true;
                        }
                        return vr;
                    }
                }).IsPass();
            },
            //检查参数
            checkChangeParam: function () {
                var sucess = true;
                if ($.ordernew.oBuyType.attr("data-cdoe") < 2) {
                    $.ordernew.oChangeGift.removeAttr("checked");
                }
                var flag = $.ordernew.oChangeGift.is(":checked");
                var type = $.ordernew.oBuyType.attr("data-code");
                var error = $("#replacecot-error");
                var flag2 = (type == "2" || type == "3");
                if (flag && flag2 && !$.ordernew.isBuy) {
                    if ($.ordernew.oChangeBrand.attr("data-code") == "" || $.ordernew.oChangeBrand.attr("data-code") == null || $.ordernew.oChangeBrand.attr("data-code") == "undefined") {
                        var errObj = $("<div  class=\"new-order-error\"><i></i><span>请选择品牌</span></div>");
                        error.html(errObj);
                        sucess = false;
                    } else if ($.ordernew.oChangeOldYear.attr("data-code") == "" || $.ordernew.oChangeOldYear.attr("data-code") == null || $.ordernew.oChangeOldYear.attr("data-code") == "undefined") {
                        var errObj = $("<div  class=\"new-order-error\"><i></i><span>请选择购买年份</span></div>");
                        error.html(errObj);
                        sucess = false;
                    }
                }
                return sucess;
            }
        },
        validate: function () {
            var success = true;
            for (var f in this.validateFn) {
                if (this.validateFn.hasOwnProperty(f)) {
                    success = this.validateFn[f]() && success;
                }
            }
            if (!success) {
                if ($("div.new-order-error").eq(0).parent()) {
                    var firstPosition = $("div.new-order-error").eq(0).parent();
                    if (firstPosition.size()) {
                        var scrollToppostion = firstPosition.offset().top;
                        $("html,body").animate({ scrollTop: (scrollToppostion - 10) + "px" }, 500);
                    }
                }
            }
            return success;
        },
        phoneModifier: {
            oNewPhone: $("#oPhone"),
            oCheckCode: $("#oCode"),
            oSendBtn: $("a[name='btnOSendcc']"),
            oBtnModi: $("#btn_modi"),
            oVCode: $("#ovcode"),
            oImg: $("#img_ovcode"),
            oVCodeContainer: null,
            oPhoneContainer: null,
            oCheckCodeContainer: null,
            init: function (options) {
                $.extend($.ordernew, options);
                var _self = $.ordernew.phoneModifier;
                _self.oPhoneContainer = _self.oNewPhone.parent();
                _self.oVCodeContainer = _self.oVCode.parent();
                if (_self.oCheckCode.length > 0)
                    _self.oCheckCodeContainer = _self.oCheckCode.parent();
                //修改按钮
                _self.oBtnModi.click(_self.show);
                _self.oSendBtn.click(_self.sendcc);
                _self.initUI();
            },
            reset: function (option) {
                $.extend($.ordernew.phoneModifier, option);
            },
            initUI: function () {
                var _self = $.ordernew.phoneModifier;
                _self.oNewPhone.bind("blur", function () {
                    if ($(this).val() == '') {
                        $(this).val($(this).attr("data-tip")).css("color", "#999");
                    }
                }).bind("focus", function () {
                    if ($(this).val() == $(this).attr("data-tip")) {
                        $(this).val("");
                    }
                    $(this).css("color", "#333");
                }).click(function () {
                    $(this).trigger("focus");
                }).bind("keypress", function () {
                    $(this).trigger("focus");
                });
                if (!_self.oNewPhone.val()) {
                    _self.oNewPhone.val(_self.oNewPhone.attr("data-tip"));
                }
                _self.oCheckCode.bind("blur", function () {
                    if ($(this).val() == '') {
                        $(this).val($(this).attr("data-tip")).css("color", "#999");
                    }
                }).bind("focus", function () {
                    if ($(this).val() == $(this).attr("data-tip")) {
                        $(this).val("");
                    }
                    $(this).css("color", "#333");
                }).val(_self.oCheckCode.attr("data-tip"));

                _self.oVCode.bind("blur", function () {
                    if ($(this).val() == '') {
                        $(this).val($(this).attr("data-tip")).css("color", "#999");
                    }
                }).bind("focus", function () {
                    if ($(this).val() == $(this).attr("data-tip")) {
                        $(this).val("");
                    }
                    $(this).css("color", "#333");
                }).val(_self.oVCode.attr("data-tip"));
                $(".changecode").click(function () {
                    _self.oImg.attr("src", $.hmc_frame.config.syncDomain + "checkcode/order?v=" + (new Date()).getTime());
                });

            },
            validateFn: {
                checkCode: function () {
                    var _self = $.ordernew.phoneModifier;
                    return $.validator.validate("checkcode", {
                        el: _self.oCheckCode,
                        allowEmpty: false,
                        emptyTip: _self.oCheckCode.attr("data-tip"),
                        failCallback: function (err) {
                            if (err) {
                                var errObj = $("<div  class=\"new-order-error\"><i></i><span>" + err + "</span></div>");
                                _self.oCheckCodeContainer.parent().parent().after(errObj);
                            }
                        }
                    }).IsPass();
                },
                checkNewPhone: function () {
                    var _self = $.ordernew.phoneModifier;
                    return $.validator.validate("phone", {
                        el: _self.oNewPhone,
                        allowEmpty: false,
                        failCallback: function (err) {
                            if (err) {
                                var errObj = $("<div  class=\"new-order-error\"><i></i><span>" + err + "</span></div>");
                                _self.oPhoneContainer.parent().append(errObj);
                            }
                        }
                    }).IsPass();
                }
            },
            __remoteCPCallBack: function (err) {
                $.ordernew.submitOrderFlow.completed();
                var _self = $.ordernew.phoneModifier;
                if (err) {
                    var tip = "";
                    if (err.indexOf("已存在") > -1) {
                        if (!$("#jqmframe").is(":visible")) {
                            tip = ",<a data-hmclog=\"{pageid: 4, eventid: 27}\" style=\"cursor: pointer;\" herf=\"javascript:\">请登录</a>";
                            _self.oCheckCodeContainer.find(".new-order-error").remove();
                        }
                    }
                    var errObj = $("<div  class=\"new-order-error\"><i></i><span>" + err + tip + "</span></div>");
                    errObj.find("a").click(function () {
                        $.hmc_jqmFrame.orderLogin({ phone: $.ordernew.oPhone.val(), name: $.trim($.ordernew.oName.val()) }, "/tpl/OrderLogin.html");
                        $.hmc_frame.login();
                        $("#a_fm").click(function () {
                            window.open($(this).attr("data-href"), 'new_win', ' left=0,top=0,width=' + (screen.availWidth - 10) + ',height=' + (screen.availHeight - 50) + ',toolbar,menubar,scrollbars,resizable,location,status = yes');

                        });
                        $("#pwd").trigger("focus");
                        $("#phone").val($("#phone").attr("data-dv"));
                    });
                    _self.oPhoneContainer.append(errObj);
                }
            },
            sendcc: function () {
                $(".new-order-error").remove();
                var _self = $.ordernew.phoneModifier;
                if (_self.validateFn.checkNewPhone()) {
                    if ($.ordernew.submitOrderFlow._isLogined) {
                        if (typeof baiduStat !== "undefined") {
                            baiduStat.orderreg_code();
                        }
                        $.ajax({
                            type: "GET",
                            url: $.hmc_frame.config.passportDomain + "checkcode/get",
                            timeout: 2000,
                            data: { ElementName: "Register", type: 2, vcodeType: 5, mobile: $.trim($.ordernew.phoneModifier.oNewPhone.val()), action: "get", vcode: $.trim(_self.oVCode.val()).replace(_self.oVCode.attr("data-tip"), "") },
                            dataType: 'jsonp',
                            jsonp: "callback",
                            jsonpCallback: "$.ordernew.phoneModifier.sendccSuc"
                        });
                    } else {
                        if (typeof baiduStat !== "undefined") {
                            baiduStat.orderreg_code();
                        }
                        $.ajax({
                            type: "GET",
                            url: $.hmc_frame.config.passportDomain + "checkcode/get",
                            timeout: 2000,
                            data: { type: 2, mobile: $.trim($.ordernew.phoneModifier.oNewPhone.val()), vcodeType: 5, vcode: $.trim(_self.oVCode.val()).replace(_self.oVCode.attr("data-tip"), "") },
                            dataType: 'jsonp',
                            jsonp: "callback",
                            jsonpCallback: "$.ordernew.phoneModifier.sendccSuc"
                        });
                    }
                }
            },
            sendccSuc: function (data) {
                $(".new-order-error").remove();
                var _self = $.ordernew.phoneModifier;
                if (data && data != "") {
                    if (data.IsSuccess) {
                        var sc = 60;
                        _self.oSendBtn.unbind("click").text(sc + "秒后重发");
                        var wt = setInterval(function () {
                            if (parseInt(sc, 10) > 1) {
                                sc -= 1;
                                _self.oSendBtn.addClass("disabled").unbind("click").text(sc + "秒后重发");
                            } else {
                                if ($("#jqmframe").is(":visible") && $(".vcode").length > 1) {
                                    $.jqmFrame.hide();
                                }
                                clearInterval(wt);
                                _self.oSendBtn.removeClass("disabled").click(_self.sendcc).text("重发确认码");
                            }
                        }, 1000);
                        if ($("#jqmframe").is(":visible")) {
                            return;
                        }
                        var phoneNo = $.trim(_self.oNewPhone.val());
                        $.jqmFrame.hide();
                        $.jqmFrame.showCodeSend({ phone: phoneNo.replace(phoneNo.substr(3, 4), "****") });
                        _self.oSendBtn = $("a[name='btnOSendcc']");
                    } else {
                        if (data.ErrorType == 0 || data.ErrorType == 4 || data.ErrorType == 5) {
                            $.validator.validate({
                                el: $.ordernew.oPhone,
                                customCheck: function () {
                                    return $.validator.createResult(data.ErrorMsg);
                                }
                            });
                        } else if (data.ErrorType == 3) {
                            $.validator.validate({
                                el: _self.oVCode,
                                customCheck: function () {
                                    return $.validator.createResult(data.ErrorMsg);
                                },
                                failCallback: function (err) {
                                    if (err) {
                                        var errObj = $("<div  class=\"new-order-error\"><i></i><span>" + err + "</span></div>");
                                        _self.oVCodeContainer.parent().after(errObj);
                                    }
                                }
                            });
                            _self.oImg.trigger("click");
                        }
                        if (data.Warnning) {
                            _self.oImg.trigger("click");
                            $(".vcode").show();
                        }
                    }
                }
            },
            show: function () {
                $.jqmFrame.showModifyPhone({ phone: $.trim($.ordernew.oPhone.val()) });
                var _self = $.ordernew.phoneModifier;
                _self.reset({
                    oNewPhone: $("#phone"),
                    oCheckCode: $("#oCode"),
                    oSendBtn: $("a[name='btnOSendcc']"),
                    oBtnModi: $("#btn_modiPhone"),
                    oPhoneContainer: $("#phone").parent().parent(),
                    oCheckCodeContainer: $("#oCode").parent().parent(),
                    oVCode: $("#ovcode"),
                    oImg: $("#img_ovcode"),
                    oVCodeContainer: $("#ovcode").parent().parent()
                });
                if (hmc_topfoot && hmc_topfoot.warning) {
                    _self.oImg.trigger("click");
                    $(".vcode").show();
                }
                _self.oSendBtn.click(_self.sendcc);
                _self.initUI();
                $("#btn_modiPhone").click(function () {
                    if (_self.validate()) {
                        _self.modify(_self.oNewPhone.val(), _self.oCheckCode.val(), function () {
                            $.jqmFrame.hide();
                            $.ordernew.oPhone.val(_self.oNewPhone.val());
                            _self.oCheckCode.val("");
                        });
                    }
                });
            },
            modify: function (phone, code, cb) {
                $.ajax({
                    type: "POST",
                    url: "/order/ajax/ModifyPhone.ashx",
                    data: { mobile: phone, code: code },
                    success: function (data) {
                        if (data) {
                            if (data.IsSuccess) {
                                if (typeof cb === "function") {
                                    cb();
                                }
                            } else {
                                var _self = $.ordernew.phoneModifier;
                                var el = data.ErrorType == 2 ? _self.oCheckCode : _self.oNewPhone;
                                var container = data.ErrorType == 2 ? _self.oCheckCodeContainer : _self.oPhoneContainer;
                                $.validator.validate({
                                    el: el,
                                    customCheck: function () {
                                        return $.validator.createResult(data.ErrorMsg);
                                    },
                                    failCallback: function (err) {
                                        if (err) {
                                            var errObj = $("<div  class=\"new-order-error\"><i></i><span>" + err + "</span></div>");
                                            container.parent().append(errObj);
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            }
        },
        __formData: {},
        submitOrderFlow: {
            _isLogined: false,
            _mobile: "",
            completed: function () {
                $.ordernew.btnSubmit.off("click").click($.ordernew.submitOrderFlow.startSubmit);
            },
            checkRemote: function () { //登录状态下判断是否是异地订单
                var checkresult = false;
                $.ajax({
                    type: "GET",
                    url: "/order/Ajax/GetSaleCarLimitPermissionForNologin.ashx",
                    cache: false,
                    async: false,
                    data: { carId: $.ordernew.carid, brandloc: $.ordernew.cityCache.attr("data-code"), cityId: $.ordernew.ccode, mobile: $.ordernew.oPhone.val(), localCityName: $.ordernew.localCityName },
                    success: function (data) {
                        if (data.IsSuccess && data.ErrorMsg && data.ErrorCode == 1000825) { //检查到有推荐的异地订单的错误信息
                            $.ordernew.btnLoading.hide();
                            $.ordernew.btnSubmit.show();
                            checkresult = true;
                            $.jqmFrame.showErrorNew(data);
                        } else if (data.IsSuccess && data.ErrorMsg) { //检查到无推荐的异地订单的错误信息
                            $.ordernew.btnLoading.hide();
                            $.ordernew.btnSubmit.show();
                            checkresult = true;
                            $.jqmFrame.showErrorNew2(data);
                        }
                    }
                });
                return checkresult;
            },
            startSubmit: function () {
                $(".new-order-error").remove();
                if (!CheckForSubmitButton()) {
                    return false;
                }
                $.ordernew.btnLoading.show();
                $.ordernew.btnSubmit.hide();
                var _self = $.ordernew.submitOrderFlow;
                if ($.ordernew.validate()) {
                    if (!$.ordernew.isLogin == "1") { //未登录情况
                        if ($.ordernew.submitOrderFlow.checkRemote()) { //是异地订单，不往下走了
                            return false;
                        }
                    }
                    $.ordernew.btnSubmit.off("click");
                    _self.orderLoginChecker.checkLogin();
                } else {
                    $.ordernew.btnLoading.hide();
                    $.ordernew.btnSubmit.show();
                    return false;
                }
            },
            orderLoginChecker: {
                checkLogin: function () {
                    $.ajax({
                        url: $.hmc_frame.config.syncDomain + "LoginCheck.ashx",
                        type: "POST",
                        dataType: 'jsonp',
                        data: { callback: "$.ordernew.submitOrderFlow.orderLoginChecker.__checkLoginCallback" },
                        timeout: 2000
                    });
                },
                __checkLoginCallback: function (data) {
                    $.ordernew.submitOrderFlow._isLogined = data.IsSuccess;
                    if (data.IsSuccess) {
                        $.ordernew.submitOrderFlow._mobile = data.Mobile;
                        if (!$.trim($.ordernew.oPhone.val())) {
                            //手机号不存在提示错误,修改手机号
                            $.ordernew.validateFn.checkPhone();
                            $.ordernew.submitOrderFlow.completed();
                        } else {
                            //手机号已经存在，提交订单
                            $.ordernew.submitOrderFlow.submitor.submit();
                        }
                    } else {
                        //未登录走注册流程
                        $.ordernew.submitOrderFlow.orderRegister.registerUser();
                    }
                },
                getLogStatus: function () {
                    $.ajax({
                        url: hmc_global.config.syncDomain + "LoginCheck.ashx",
                        type: "POST",
                        dataType: 'jsonp',
                        data: { callback: "$.ordernew.submitOrderFlow.orderLoginChecker._loginStatusCallBack" },
                        timeout: 2000
                    });
                },
                _loginStatusCallBack: function (data) {
                    if (data.IsSuccess) {
                        $.ordernew.submitOrderFlow._isLogined = data.IsSuccess;
                    }
                }
            },
            orderRegister: {
                registerUser: function () {
                    var formData = {
                        mobile: $.trim($.ordernew.oPhone.val()),
                        name: $.trim($.ordernew.oName.val()),
                        code: $.trim($.ordernew.phoneModifier.oCheckCode.val())
                    };
                    if (typeof (HMCWEBLOG_ID) !== "undefined")
                        formData.HMCWEBLOG_ID = HMCWEBLOG_ID;
                    if (typeof (HMCWEBLOG_TRACKER) !== "undefined")
                        formData.HMCWEBLOG_TRACKER = HMCWEBLOG_TRACKER;
                    if (typeof baiduStat !== "undefined") {
                        baiduStat.orderreg_reg();
                    }
                    $.ajax({
                        url: $.hmc_frame.config.passportDomain + "user/loginbymobile",
                        type: "GET",
                        dataType: 'jsonp',
                        data: formData,
                        timeout: 2000,
                        jsonp: "callback",
                        jsonpCallback: "$.ordernew.submitOrderFlow.orderRegister.__registerCallback"
                    });
                },
                __registerCallback: function (data) {
                    if (data.IsSuccess) {
                        $.hmc_frame.reset({ noreload: true, showGift: false });
                        $("#log_order_regsuccess").trigger("click");
                        if (typeof ($.hmc_frame.callbackTriggers.cb_regSuccess) === "function") {
                            $.hmc_frame.callbackTriggers.cb_regSuccess(data);
                        }
                        if (typeof baiduStat !== "undefined") {
                            baiduStat.orderreg_suc();
                        }
                        SSOHelper.invoke();
                        data.Code = 0;
                        //注册成功之后提交订单
                        if (data.Code == 1) {
                            $.ordernew.submitOrderFlow.submitor.submit(1);
                        } else {
                            $.ordernew.submitOrderFlow.submitor.submit();
                        }
                    } else {
                        $.ordernew.submitOrderFlow.completed();
                        if (data.ErrorType == 0) {
                            $.ordernew.oCheckCode = $("#oCode");
                            var errObj = $("<div  class=\"new-order-error\"><i></i><span>" + data.ErrorMsg + "</span></div>");
                            $.ordernew.oCheckCode.parent().parent().parent().append(errObj);
                            $.ordernew.btnLoading.hide();
                            $.ordernew.btnSubmit.show();
                        }
                        if (data.ErrorType == 1) {
                            $.validator.validate({
                                el: $.ordernew.oPhone,
                                customCheck: function () {
                                    return $.validator.createResult(data.ErrorMsg);
                                },
                                failCallback: $.ordernew.phoneModifier.__remoteCPCallBack
                            });
                            $.ordernew.btnLoading.hide();
                            $.ordernew.btnSubmit.show();
                        }
                        if (data.ErrorType == 3 || data.ErrorType == 2) {
                            $.validator.validate({
                                el: $.ordernew.oPhone,
                                customCheck: function () {
                                    return $.validator.createResult(data.ErrorMsg);
                                },
                                failCallback: $.ordernew.phoneModifier.__remoteCPCallBack
                            });
                            $.ordernew.btnLoading.hide();
                            $.ordernew.btnSubmit.show();
                        }
                        if (data.ErrorType == 5) {
                            $.validator.validate({
                                el: $.ordernew.oCheckCode,
                                customCheck: function () {
                                    return $.validator.createResult(data.ErrorMsg);
                                },
                                failCallback: function (err) {
                                    if (err) {
                                        $.ordernew.oCheckCode = $("#oCode");
                                        var errObj = $("<div  class=\"new-order-error\"><i></i><span>" + data.ErrorMsg + "</span></div>");
                                        $.ordernew.oCheckCode.parent().parent().parent().append(errObj);
                                    }
                                }
                            });
                            $.ordernew.btnLoading.hide();
                            $.ordernew.btnSubmit.show();
                        }
                        if(data.ErrorType == 3) {
                            var errObj = $("<div  class=\"new-order-error\"><i></i><span>" + data.ErrorMsg + "</span></div>");
                            $.ordernew.phoneModifier.oVCodeContainer.parent().after(errObj);
                            $.ordernew.btnLoading.hide();
                            $.ordernew.btnSubmit.show();
                        }
                        if ($("div.new-order-error").eq(0).parent()) {
                            var firstPosition = $("div.new-order-error").eq(0).parent();
                            if (firstPosition.size()) {
                                var scrollToppostion = firstPosition.offset().top;
                                $("html,body").animate({ scrollTop: (scrollToppostion - 10) + "px" }, 500);
                            }
                        }
                    }
                }
            },
            submitor: {
                submit: function (osms) {
                    $.ajax({
                        type: "POST",
                        url: "/order/Ajax/CheckGift.ashx",
                        data: {
                            cityId: $.ordernew.ccode,
                            giftId: $.ordernew.giftId,
                            giftType: $.ordernew.giftType
                        },
                        success: function (data) {
                            if (data == "1") {
                                $("#wrapdiv_gifterror").hide();
                                $.ordernew.submitOrderFlow.submitor.psubmit(osms);
                            } else {
                                $("#gift" + $.ordernew.giftType + $.ordernew.giftId).hide();
                                $("#div_gifterror").html("所选礼品活动已停止，请重新选择");
                                $("#wrapdiv_gifterror").show();
                                $.ordernew.giftId = 0;
                                $.ordernew.giftType = 0;
                                $.ordernew.btnSubmit.click($.ordernew.submitOrderFlow.startSubmit);
                            }
                        }
                    });
                },
                psubmit: function (osms) {
                    if ($.ordernew.validate()) {
                        if ($.trim($.ordernew.oPhone.val()) != $.ordernew.submitOrderFlow._mobile && $.ordernew.submitOrderFlow._isLogined) {
                            //新添加的手机号需要先修改成功
                            var modifier = $.ordernew.phoneModifier;
                            if (modifier.validate()) {
                                modifier.modify(modifier.oNewPhone.val(), modifier.oCheckCode.val(), function () {
                                    $.ordernew.submitOrderFlow.submitor._submitOrder();
                                });
                            } else {
                                $.ordernew.submitOrderFlow.completed();
                            }
                        } else {
                            //新创建用户
                            $.ordernew.submitOrderFlow.submitor._submitOrder(osms);
                        }
                    } else {
                        $.ordernew.submitOrderFlow.completed();
                    }
                },
                _submitOrder: function (osms) {
                    if (typeof baiduStat !== "undefined") {
                        baiduStat.order_submit();
                    }
                    $.ordernew.__formData = {
                        carid: $("#carSelector").attr("data-code"),
                        color: $.ordernew.oColor.attr("data-code"),
                        colName: decodeURI($.ordernew.oColor.attr("data-text")),
                        time: $.ordernew.oBuyTime.attr("data-code"),
                        type: $.ordernew.oBuyType.attr("data-code"),
                        dealers: $.ordernew.oDealer.attr("data-code"),
                        upcolor: decodeURI($.ordernew.oUpColor.attr("data-code")),
                        brandloc: $.ordernew.oLoc.find("span").eq(1).attr("data-code"),
                        city: $.ordernew.ccode,
                        url: window.location.href,
                        mname: "",
                        name: $.ordernew.oName.val(),
                        giftId: $.ordernew.giftId,
                        giftType: $.ordernew.giftType,
                        brandId: $.ordernew.oChangeBrand.attr("data-code"),
                        brandname: decodeURI($.ordernew.oChangeBrand.text()),
                        oldyear: decodeURI($.ordernew.oChangeOldYear.attr("data-code")),
                        changegift: $.ordernew.oChangeGift.is(":checked"),
                        buytarget: $.ordernew.buyTarget.attr("data-code"),
                        isTestDrive: $.ordernew.isTestDrive.attr("data-code"),
                        hopeBareCarPrice: decodeURI($.ordernew.hopeBareCarPrice.val()),
                        maybeBudget: decodeURI($.ordernew.maybeBudget.val()),
                        otherNeed: decodeURI($.ordernew.otherNeed.val()),
                        localCityName: decodeURI($.ordernew.localCityName)
                    };
                    if (osms)
                        $.ordernew.__formData.osms = osms;
                    if (typeof (HMCWEBLOG_ID) !== "undefined")
                        $.ordernew.__formData.HMCWEBLOG_ID = HMCWEBLOG_ID;
                    if (typeof (HMCWEBLOG_TRACKER) !== "undefined")
                        $.ordernew.__formData.HMCWEBLOG_TRACKER = HMCWEBLOG_TRACKER;
                    $.ajax({
                        type: "POST",
                        url: "/order/Ajax/SubmitNew.ashx",
                        data: $.ordernew.__formData,
                        beforeSend: function () { },
                        success: function (data) {
                            if (data) {
                                if (typeof ($.ordernew.callback) === "function") {
                                    hmc_global.utils.setCookie("order", ""); //提交订单还是要清空的
                                    $.ordernew.callback(data);
                                }
                            }
                        },
                        complete: function () {
                            $.ordernew.submitOrderFlow.completed();
                        }
                    });
                }
            }
        },
        initProvinceList: function () { //初始化省份数据
            $.ajax({
                type: "POST",
                url: "/order/Ajax/AllCitySelector.ashx",
                data: { provinceId: 0 },
                cache: false,
                beforeSend: function () { },
                success: function (data) {
                    if (data) {
                        var ul = $("#ddbrandloc .seler_layer_new ul").eq(0); //省份列表ul
                        var liHtml = "";
                        for (i = 0; i < data.length; i++) {
                            liHtml += "<li data-code='" + data[i].locationId + "'>" + data[i].locationName + "</li>";
                        }
                        ul.append(liHtml);
                        if ($.ordernew.lp) {//设置上牌城市为买车城市
                            ul.find("li").filter("[data-code='" + $.ordernew.lp + "']").trigger("click"); //省份点击事件
                            $.ordernew.provinceSelect($.ordernew.lp, function () {
                                if ($.ordernew.lc) {//默认城市
                                    $("#ddbrandloc .seler_layer_new ul").eq(1).find("li").filter("[data-code='" + $.ordernew.lc + "']").trigger("click"); //城市点击事件
                                }
                            });
                        }
                        ul.find("li").on("click", function () {//绑定省份点击事件
                            $.ordernew.provinceSelect($(this).attr("data-code"), function () {
                                var $firstLi = $("#ddbrandloc .seler_layer_new ul").eq(1).children().first();
                                var $span = $("#ddbrandloc .selectbox_new_city span");
                                $span.attr("data-code", $firstLi.attr("data-code"));
                                $span.html($.trim($firstLi.html()));
                                CheckBoardCity();
                            });
                        });
                    }
                },
                complete: function () {

                }
            });
        },
        provinceSelect: function (id, cb) { //初始化城市数据
            $.ajax({
                type: "POST",
                url: "/order/Ajax/AllCitySelector.ashx",
                data: { provinceId: id },
                cache: false,
                beforeSend: function () {
                    var cacheData = $.ordernew.cityCache.data("cid_" + id);
                    if (cacheData) {
                        $("#ddbrandloc .seler_layer_new ul").eq(1).empty().append(cacheData);
                        if (typeof cb === "function") {
                            cb();
                        }
                        return false;
                    }
                },
                success: function (data) {
                    if (data) {
                        var ul = $("#ddbrandloc .seler_layer_new ul").eq(1);

                        var liHtml = "";
                        for (i = 0; i < data.length; i++) {
                            liHtml += "<li data-code='" + data[i].locationId + "'>" + data[i].locationName + "</li>";
                        }
                        $.ordernew.cityCache.data("cid_" + id, liHtml);
                        ul.empty().append(liHtml);
                        if (typeof cb === "function") {
                            cb();
                        }
                    }
                },
                complete: function () {

                }
            });
        },
        legalCityInit: function () { //初始化可上牌城市
            $.ajax({
                type: "POST",
                url: "/order/Ajax/GetSaleCarLimitRule.ashx",
                data: { carId: $.ordernew.carid, cityId: $.ordernew.ccode },
                cache: false,
                async: false,
                success: function (data) {
                    if (data) {
                        $.ordernew.legalCity = data;
                    }
                }
            });
        },
        carSaleCityInit: function () { //获取车款售卖城市
            $.ajax({
                type: "POST",
                url: "/order/Ajax/GetCarSaleCity.ashx",
                data: { carId: $.ordernew.carid },
                cache: false,
                async: false,
                success: function (data) {
                    if (data) {
                        $.ordernew.carSaleCity = data;
                    }
                }
            });
        },
        logOut: function () {
            $.ajax({
                url: $.hmc_frame.config.syncDomain + "Login.ashx?v=" + (+new Date()),
                type: "POST",
                dataType: 'jsonp',
                data: { action: "out" },
                success: function () {
                    SSOHelper.invoke();
                    //hmc_global.utils.setCookie("order", "");
                    window.location.reload();
                },
                timeout: 2000
            });
        },
        changeCar: {
            panel: $("#ddtype"),
            init: function (flag) {
                if (flag == 1) {
                    if ($.ordernew.oChangeGift.is(":checked") && $.ordernew.oBuyType.attr("data-code") > 1) {
                        $(".replacement").show();
                        $(".replacearrow").css("left", $.ordernew.oBuyType.children("div.new-order-buycar-way[data-code=" + $.ordernew.oBuyType.attr("data-code") + "]").attr("data-site") + "px");
                        //初始化旧车购车日期
                        $.ordernew.changeCar.oldCarYearInit();
                        var penelcon = $(".replacement .mycar-info");
                        if ($.ordernew.oChangeGift.is(":checked") && $.ordernew.oBuyType.attr("data-code") > 1) {
                            penelcon.show();
                        } else {
                            penelcon.hide();
                        }
                    }
                    $.ordernew.changeCar.panel.find(".new-order-buycar-way").click(function () {
                        $("#ddtype").attr("data-code", $(this).attr("data-code"));
                        if ($(this).attr("data-site")) { //置换全款和置换贷款
                            $(".replacement").show();
                            $(".detail-lend-mask").hide();
                            $(".replacearrow").css("left", $(this).attr("data-site") + "px");
                            $.ordernew.buyTarget.attr("data-code", "1");
                            $("#buyTarget div.new-order-buycar-amount").removeClass("current");
                            $("#buyTarget div.new-order-buycar-amount").eq(0).addClass("current");
                        } else if ($(this).attr("data-lend")) { //新车贷款
                            $(".detail-lend-mask").show();
                            $(".replacement").hide();
                            $.ordernew.buyTarget.attr("data-code", "");
                            $("#buyTarget div.new-order-buycar-amount").removeClass("current");
                        } else { //新车全款
                            $('.detail-lend-mask').hide();
                            $(".replacement").hide();
                            $.ordernew.buyTarget.attr("data-code", "");
                            $("#buyTarget div.new-order-buycar-amount").removeClass("current");
                        }
                        $("#ddtype .new-order-buycar-way").removeClass("current");
                        $(this).addClass("current");
                        //绑定点击“爱车信息”-“品牌”事件
                        var span = $(".replacecot .selectbox span").eq(0);
                        var obj = $(".replacecot .selectbox ul").eq(0);
                        obj.find("li").on("click", function () {
                            span.attr("data-code", $(this).attr("data-code"));
                            // $(".replacecot .error").empty();
                        });
                        $.ordernew.oChangeGift.prop("checked", true);
                        var flag = !$.ordernew.isBuy && $.ordernew.oChangeGift.is(":checked");
                        var flag2 = !$.ordernew.checkFlag && hmc_global.utils.readcookie("order") == "";
                        if (flag || flag2) {
                            $.ordernew.oChangeGift.prop("checked", true);
                            $.ordernew.checkFlag = true;
                        }

                        var penelcon = $(".replacement .mycar-info");
                        if ($.ordernew.oChangeGift.is(":checked") && $.ordernew.oBuyType.attr("data-code") > 1) {
                            penelcon.show();
                        } else {
                            penelcon.hide();
                        }

                        $.ordernew.oChangeBrand.removeAttr("data-code");
                        $.ordernew.oChangeOldYear.removeAttr("data-code");
                        $.ordernew.oChangeBrand.text("品牌");
                        $.ordernew.oChangeOldYear.text("首次上牌时间");
                        //初始化旧车购车日期
                        $.ordernew.changeCar.oldCarYearInit();
                    });
                    var penel = $(".replacement .mycar-info");
                    $.ordernew.oChangeGift.click(function () {
                        var giftflag = $(this).is(":checked");
                        if (giftflag) {
                            penel.show();
                        } else {
                            penel.hide();
                        }
                    });
                } else {
                    $.ordernew.changeCar.panel.find(".new-order-buycar-way").click(function () {
                        $("#ddtype").attr("data-code", $(this).attr("data-code"));
                        if ($(this).attr("data-site")) { //置换全款和置换贷款
                            $(".detail-lend-mask").hide();
                            $.ordernew.buyTarget.attr("data-code", "1");
                            $("#buyTarget div.new-order-buycar-amount").removeClass("current");
                            $("#buyTarget div.new-order-buycar-amount").eq(0).addClass("current");
                        } else if ($(this).attr("data-lend")) { //新车贷款
                            $(".detail-lend-mask").show();
                            $.ordernew.buyTarget.attr("data-code", "");
                            $("#buyTarget div.new-order-buycar-amount").removeClass("current");
                        } else { //新车全款
                            $('.detail-lend-mask').hide();
                            $.ordernew.buyTarget.attr("data-code", "");
                            $("#buyTarget div.new-order-buycar-amount").removeClass("current");
                        }
                        $("#ddtype .new-order-buycar-way").removeClass("current");
                        $(this).addClass("current");
                    });

                }

                $.ordernew.changeCar.initSelectBox();
            },
            initSelectBox: function () {
                $(".selectbox .select-con").on("click", "a", function (e) {
                    hmc_global.events.popStopCancel(e);
                    var box = $(this).parent().parent().parent().parent();
                    var span = box.parent().find("span");
                    var txt = $(this).text();
                    var code = $(this).attr("data-code");
                    span.attr("data-code", code);
                    span.text(txt);
                    box.hide();
                });
                // 选择品牌下拉框
                var _height = $("#quick-select-brand").find("li").length * 21 - 278;
                $("#brand-more-bottom").css("bottom", _height).click(function (ev) {
                    var ev = ev || event;
                    ev.stopPropagation();
                    $(this).siblings("ul").animate({ "margin-top": -227 }, 300).end().hide().siblings(".active-more-top").show();
                });
                $("#brand-more-top").click(function (ev) {
                    var ev = ev || event;
                    ev.stopPropagation();
                    $(this).siblings("ul").animate({ "margin-top": 0 }, 300).end().hide().siblings(".active-more").show();
                });
                $("#quick-select-brand").find("a").click(function (ev) {
                    var ev = ev || event;
                    ev.stopPropagation();
                    $.ordernew.changeCar.quickSelectBrand($(this).html());
                });

            },
            quickSelectBrand: function (str) {
                var $list = $("#brand-detail");
                var $i = $list.find("i:contains('" + str + "')");
                if ($i.length > 0) {
                    var n_height = 0,
                        $section = $i.parent();
                    var $index = $list.find("p").index($section);
                    for (var i = 0; i < $index; i++) {
                        n_height = n_height + $list.find("p").eq(i).height();
                    }
                    $list.animate({
                        scrollTop: n_height
                    }, 200);
                }
            },
            //旧车日期初始化
            oldCarYearInit: function () {
                var obj = $(".replacecot .selectbox ul").eq(1);
                var span = $(".replacecot .selectbox span").eq(1);
                obj.find("li").on("click", function () {
                    span.attr("data-code", $(this).text());
                    // $(".replacecot .error").empty();
                });
            },
            checkOrder: function (flag) { //检查是否已经报名过了
                var mobileNum = $.ordernew.oPhone.val();
                $.ordernew.changeCar.init(flag);
                if (mobileNum != "") {
                    $.ajax({
                        type: "POST",
                        url: "/order/Ajax/CheckReplacement.ashx",
                        data: { mobile: $.ordernew.oPhone.val() },
                        success: function (data) {
                            if (data.IsExists) {
                                $(".replacement").remove();
                                $.ordernew.oChangeGift.removeAttr("checked");
                                $.ordernew.isBuy = true;
                            }
                        }
                    });
                }
            }
        },
        initCityList: function () {
            $.ordernew.cityList = new Array();
        },
        checkNameStr: function (userName) {
            var rule = /^[\u4e00-\u9fa5\\]+$/;
            var reg = RegExp(rule);
            return reg.test(userName) && userName.length <= 6;
        }
    });
})(jQuery);