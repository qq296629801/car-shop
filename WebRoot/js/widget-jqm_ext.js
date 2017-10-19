(function ($) {
    $.jqmFrame = {};
    $.extend($.jqmFrame, {
        oFrame: null,
        oBox: null,
        oTitle: null,
        oContent: null,
        oCache: {},
        initFrame: function () {
            var frameStr = "<div class=\"jqmWindow\" id=\"jqmframe\"><div class=\"fuc_box\"><div class=\"fuc_close jqmClose\"><a href=\"#\"></a></div><h2 class=\"fuc_tit lay_tit\"></h2><div class=\"lay_cont\"></div></div></div>";
            if ($("#jqmframe").length == 0) {
                $("body").prepend(frameStr);
            }
            $.jqmFrame.oFrame = $("#jqmframe");
            $.jqmFrame.oBox = $("#jqmframe .fuc_box");
            $.jqmFrame.oTitle = $("#jqmframe h2");
            $.jqmFrame.oContent = $("#jqmframe .lay_cont");
            $.jqmFrame.oFrame.hide().jqm({ overlay: 50 });

        },
        preShow: function (title, cssclass) {
            if (typeof hmc_global !== "undefined") {
                $.jqmFrame.show(title, new EJS({ url: hmc_global.config.tpl() + 'loading.html', cache: false }).render(), cssclass, "");
            }
        },
        show: function (title, content, boxClass,  style) {
            if ($("#jqmframe").is(":visible")) {
                return;
            }
            $.jqmFrame.initFrame();
            $.jqmFrame.oBox.attr("class", "fuc_box " + boxClass);
            $.jqmFrame.oBox.attr("style", style);
            $.jqmFrame.setContent(title, content);
            $.jqmFrame.oFrame.jqmShow();
        },
        setContent: function (title, content) {
            $.jqmFrame.oContent = $("#jqmframe .lay_cont");
            $.jqmFrame.oTitle.html(title);
            $.jqmFrame.oContent.replaceWith(content);
            //高度居中设置
            var wintop = parseInt(($(window).height() - $(".jqmWindow").height()) / 2);
            $(".jqmWindow").css("top", wintop < 0 ? 0 : wintop);
        },
        hide: function () {
            try { $.jqmFrame.oFrame.jqmHide(); }
            catch (e)
            { }
        },
        allCitySelect: function () {
            $.jqmFrame.show("更换城市", new EJS({ url: hmc_global.config.tpl() + 'AllCitySelector.html', cache: false }).render(), "func_change_city", "");
        },
		borkerError: function (data) {
            $.jqmFrame.show("预约您的买车顾问失败", new EJS({ url: hmc_global.config.tpl() + 'borkerError.html', cache: false }).render(data), "", "");
        },
        getAgent: function (data) {
            $.jqmFrame.show("预约买车顾问帮您买车", new EJS({ url: hmc_global.config.tpl() + 'Agent.html', cache: false }).render(data), "fuc_w795", "");
        },
        deaerSelect: function (data) {
            var title = data.cityName + "有" + data.dealerCount + "家4S店将为您出底价";
            $.jqmFrame.show(title, new EJS({ url: hmc_global.config.tpl() + 'VendorSelector.html', cache: false }).render(data), "", "");
        },
        deaerSelect2: function (data) {
            var title = data.cityName + "有" + data.dealerCount + "家4S店将为您出底价";
            $.jqmFrame.show(title, new EJS({ url: hmc_global.config.tpl() + 'VendorSelector2.html', cache: false }).render(data), "", "");
        },
        carSelect: function (data, cb) {
            $.jqmFrame.setContent("选择您中意的" + data.CSName, new EJS({ url: hmc_global.config.tpl() + 'CarSelector.html', cache: false }).render(data));
            $.jqmFrame.oBox.addClass("fuc_w795");
            if (typeof cb === "function") {
                cb();
            }
        },
        showError: function (data) {
            $.jqmFrame.show("错误提示", new EJS({ url: hmc_global.config.tpl() + 'errTip.html', cache: false }).render(data), "", "");
            $("#jqmframe .fuc_close a").click(function () {
                window.location.reload(true);
            });
           
        },
        showError2: function (title, data) {
            $.jqmFrame.show(title, new EJS({ url: hmc_global.config.tpl() + 'errTip2.html', cache: false }).render(data), "", "");
        },
        showError3: function (data) {
            $.jqmFrame.show("错误提示", new EJS({ url: hmc_global.config.tpl() + 'errTip3.html', cache: false }).render(data), "", "");
        },
        showError4: function (data) {
            $.jqmFrame.show("错误提示", new EJS({ url: hmc_global.config.tpl() + 'errTip4.html', cache: false }).render(data), "", "");
        },
        showFeed: function () {
            $.jqmFrame.show("提建议", new EJS({ url: hmc_global.config.tpl() + 'Feedback.html', cache: false }).render(), "fuc_w520","");
        },
        showFeed2: function (data) {
            $.jqmFrame.show("提建议", new EJS({ url: hmc_global.config.tpl() + 'Feedback2.html', cache: false }).render(data), "", "");
        },
        showCommError: function (data) {
            $.jqmFrame.show("错误提示", new EJS({ url: hmc_global.config.tpl() + 'commonerrTip.html', cache: false }).render(data), "", "");
        },
        showCodeSend: function (data) {
            $.jqmFrame.show("确认码已发送", new EJS({ url: hmc_global.config.tpl() + 'SendCC.html', cache: false }).render(data), "", "");
        },
        oosReg: function () {
            $.jqmFrame.show("缺货登记", new EJS({ url: hmc_global.config.tpl() + 'OOS.html', cache: false }).render(), "fuc_w520", "");
        },
        oosRegSucess: function (isset) {
            if (isset)
                $.jqmFrame.setContent("缺货登记", new EJS({ url: hmc_global.config.tpl() + 'OOSSuccess.html', cache: false }).render());
            else $.jqmFrame.show("缺货登记", new EJS({ url: hmc_global.config.tpl() + 'OOSSuccess.html', cache: false }).render(), "", "");
        },
        showModifyPhone: function (data) {
            $.jqmFrame.show("修改手机号", new EJS({ url: hmc_global.config.tpl() + 'ModifyPhone.html', cache: false }).render(data), "");
        },
        showLocTip: function (data) {
            $.jqmFrame.show("购车提醒", new EJS({ url: hmc_global.config.tpl() + 'LocationTip.html', cache: false }).render(data), "fuc_w400", "");
        },
        RapidTip: function (data) {
            $.jqmFrame.show("开抢提醒", new EJS({ url: hmc_global.config.tpl() + 'RapidTip.html', cache: false }).render(data), "fuc_w515", "");
        },
        SuccessInfo: function () {
            $.jqmFrame.show("卖车信息", new EJS({ url: hmc_global.config.tpl() + 'SaleInfo.html', cache: false }).render(), "fuc_box", "");
        },
        SubSuccess: function () {
            $.jqmFrame.show("预约成功", new EJS({ url: hmc_global.config.tpl() + 'SubSucess.html', cache: false }).render(), "fuc_box", "");
        },
        SubRepeat: function () {
            $.jqmFrame.show("预约卖车", new EJS({ url: hmc_global.config.tpl() + 'SubRepeat.html', cache: false }).render(), "fuc_box","");
        },
        ShowDealerAdress: function (data) {
            $.jqmFrame.show(data.data.DealerShortName, new EJS({ url: hmc_global.config.tpl() + 'Map.html', cache: false }).render(data), "fuc_box","width:600px;height:442px");
        },
        PicViewer:function(data) {
            $.jqmFrame.show("车型图片预览", new EJS({ url: hmc_global.config.tpl() + '/CarSource/PicViewer.html', cache: false }).render(data), "fuc_box","width:736px");
        },
        isIE6: function (data) {
            $.jqmFrame.initFrame = function () {
                var frameStr = "<div class=\"jqmWindow\" id=\"jqmframe\"><div><div><a href=\"#\"></a></div><div class=\"lay_cont\"></div></div></div>";
                if ($("#jqmframe").length == 0) {
                    $("body").prepend(frameStr);
                }
                $.jqmFrame.oFrame = $("#jqmframe");
                $.jqmFrame.oBox = $("#jqmframe .fuc_box");
                $.jqmFrame.oTitle = $("#jqmframe h2");
                $.jqmFrame.oContent = $("#jqmframe .lay_cont");
                $.jqmFrame.oFrame.hide().jqm({ overlay: 50 });
                $.jqmFrame.initFrame = function () {
                };
            };
            $.jqmFrame.show("", new EJS({ url: hmc_global.config.tpl() + 'IE6.html', cache: false }).render(data));
        }
    });
})(jQuery);