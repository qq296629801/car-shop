var baiduStat = {
    eventName: "_trackEvent",
    exec: function (event_args) {
        try {
            if (event_args && event_args.constructor === Array)
                _hmt.push(event_args);
        } catch (e) {
        }
    },
    home_search: function () { this.exec([this.eventName, '开始下单', '首页', '点击-搜索框', '']); },
    home_select: function () { this.exec([this.eventName, '开始下单', '首页', '点击-首页下方', '']); },
    cardetail_buy: function () { this.exec([this.eventName, '订单底价买车', '商品详情页', '点击-订单底价买车', '']); },
    order_submit: function () { this.exec([this.eventName, '订单填写详情', '订单提交页', '点击-订单填写详情', '']); },
    order_subSuc: function () { this.exec([this.eventName, '订单提交成功', '订单提交页', '成功-订单提交', '']); },
    navreg_reg: function () { this.exec([this.eventName, '导航注册', '注册', '点击-导航注册', '']); },
    navreg_reg_code: function () { this.exec([this.eventName, '导航注册确认码', '确认码', '点击-导航注册确认码', '']); },
    navreg_suc: function () { this.exec([this.eventName, '导航注册成功', '注册', '成功-导航注册', '']); },
    orderreg_reg: function () { this.exec([this.eventName, '订单注册', '注册', '点击-订单注册', '']); },
    orderreg_code: function () { this.exec([this.eventName, '订单注册确认码', '确认码', '点击-订单注册确认码', '']); },
    orderreg_suc: function () { this.exec([this.eventName, '订单注册成功', '注册', '成功-订单注册', '']); }
};

var hmc_global = {
    config: {
        syncDomain: "#", //异步域名
        cdnDomain: "#", //cdn域名
		hmc_product_item: "#", 
        hmc_product_trade: "#", 
        mall_product_item: "#", 
        cdnHtml: function () { return hmc_global.config.cdnDomain + "Html/"; },  //html片段域名
        cdnJs: function () { return hmc_global.config.cdnDomain + "Js/"; }, //js数据域名
        tpl: function () { return "/tpl/"; } //模板文件域名
    },
    utils: {
        //获取元素的纵坐标 
        getTop: function (e) {
            if (e) {
                var offset = e.offsetTop;
                if (e.offsetParent != null) offset += hmc_global.utils.getTop(e.offsetParent);
                return offset;
            } else return 0;
        },
        //获取当前主域名
        getDomain: function () {
            var arr_dps = document.domain.split(".");
            var str_domain = ".";
            if (arr_dps.length >= 2) {
                str_domain += arr_dps[arr_dps.length - 2] + "." + arr_dps[arr_dps.length - 1];
            }
            return str_domain;
        },
        //读取cookie  
        readcookie: function (name) {
            var cookieValue = "";
            var search = name + "=";
            if (document.cookie.length > 0) {
                offset = document.cookie.indexOf(search);
                if (offset != -1) {
                    offset += search.length;
                    end = document.cookie.indexOf(";", offset);
                    if (end == -1) end = document.cookie.length;
                    cookieValue = document.cookie.substring(offset, end);
                }
            }
            return cookieValue;
        },
        //设定Cookie值
        setCookie: function (name, value) {
            var expdate = new Date();
            var argv = hmc_global.utils.setCookie.arguments;
            var argc = hmc_global.utils.setCookie.arguments.length;
            var expires = (argc > 2) ? argv[2] : null;
            var path = (argc > 3) ? argv[3] : "/";
            var domain = (argc > 4) ? argv[4] : hmc_global.utils.getDomain();
            var secure = (argc > 5) ? argv[5] : false;
            if (expires != null) expdate.setTime(expdate.getTime() + (expires * 1000));
            document.cookie = name + "=" + value + ((expires == null) ? "" : ("; expires=" + expdate.toGMTString()))
+ ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain))
+ ((secure == true) ? "; secure" : "");
        },
        //获取当前登录用户名
        getUserName: function () {
            var content = decodeURIComponent(hmc_global.utils.readcookie("mccookie"));
            var userName;
            if (!content) return userName;
            var arr = content.split('&');
            if ((arr) && (arr.length == 6)) {
                userName = arr[1];
            }
            return userName;
        },
        /**
        *   Usage:  number_format(123456.789, 2, '.', ',');
        *   result: 123,456.79
        **/
        number_format: function (number, decimals, dec_point, thousands_sep) {
            number = (number + '').replace(/[^0-9+-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            if (s[0].length > 3) {
                s[0] = s[0].replace(/B(?=(?:d{3})+(?!d))/g, sep);
            }
            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        }
    },
    ui: {},
    events: {
        //阻止冒泡
        popStopCancel: function (e) {
            return e ? e.stopPropagation() : event.cancelBubble = true;
        }
    }
};
String.prototype.format = function (args) {
    if (arguments.length > 0) {
        var result = this;
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                var reg = new RegExp("({" + key + "})", "g");
                result = result.replace(reg, args[key]);
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] == undefined) {
                    return "";
                } else {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
        return result;
    } else {
        return this;
    }
}; 



























