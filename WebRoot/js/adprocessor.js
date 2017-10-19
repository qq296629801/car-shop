/*惠买车pc广告插件*/
$(function () {
    $.fn.adProcess = function (opts) {
        var defaults = {
            auto: 2000, //指定多少秒内容定期自动滚动。默认为空(null),是不滚动,如果设定的,单位为毫秒,如1秒为1000
            scroll: 1, //每次滚动的li数量
            speed: 1000, //滑动的速度,可以尝试800 1000 1500,设置成0将删除效果
            visible: 1,
            vertical: true //是否垂直滚动
        };
        var _arr2dict = function (arr) {
            var dict = {};
            if (typeof (arr) !== "undefined") {
                if (arr instanceof Array) {
                    for (var i = 0; i < arr.length; i++) {
                        dict[arr[i].csId] = arr[i].isShow;
                    }
                }
            }
            return dict;
        };
        var canShow = function (dict, csids) {
            var show = dict!==undefined ?(dict.length > 0 ? !dict[0].isShow : true ):true;
            dict = _arr2dict(dict);
            if (csids != undefined) {
                csids = csids.toString();
            }
            if (typeof (csids) !== "undefined" && csids.length > 0) {
                csids = csids.split(',');
                for (var i = 0, l = csids.length; i < l; i++) {
                    if (typeof (dict[csids[i]]) !== "undefined") {
                        show = dict[csids[i]];
                        break;
                    } else continue;
                }
            } else {
                show = true;
            }
            return show;
        };
        var options = $.extend(defaults, opts);
        return this.each(function () {
            var _self = $(this), _container = _self.parent().parent();
            var adcode = _self.data("adcode"), adlist = adgrouplist[adcode], csids = _self.data("adrelacsids");
            if (typeof (adlist) !== "undefined") {
                switch (adcode) {
                    case 1: //首页焦点图
                        if (adlist.length > 0) {
                            var html = "", tpl = " <div id=\"bannerItem{0}\" class=\"banner-item\" style=\"display: {1}; opacity: 1;background:{4}\"><a href=\"{2}\" target=\"_blank\"><img src=\"{3}\" alt=\"\"></a></div>";
                            var navHtml = "", tpl2 = "<a href=\"javascript:void(0)\" data-rel=\"bannerItem{0}\"></a>";
                            for (var i = 0; i < adlist.length; i++) {
                                html += tpl.replace("{0}", i + 1).replace("{1}", i == 0 ? "block" : "none").replace("{2}", adlist[i].adHref).replace("{3}", adlist[i].adSrc).replace("{4}", adlist[i].bgColor);
                                navHtml += tpl2.replace("{0}", i + 1);
                            }
                            _self.replaceWith(html);
                            $(".banner-pointer").append(navHtml);
                        }
                        // 头图轮播
                        $('.banner-pointer a').powerSwitch({
                            classAdd: "current",
                            animation: "fade",
                            autoTime: 4000,
                            duration: 750
                        }).eq(0).trigger("click");
                        break;
                    case 27: //右侧浮层
                        if (adlist.length > 0) {
                            var html = "<div class=\"sidebaradv\"><a href=\"{0}\" target=\"_blank\"> <img src=\"{1}\" alt=\"\"></a></div>";
                            html = html.replace("{0}", adlist[0].adHref).replace("{1}", adlist[0].adSrc).replace("{2}", adlist[0].adName);
                            _self.replaceWith(html);
                        }
                        break;
                    default:
                        if (adlist.length > 0) {
                            var html = "", asshowCount = 0; tpl = "<li><a href=\"{0}\" target=\"_blank\"><img src=\"{1}\" alt=\"\" height=\"{2}\"></a></li>";
                                                            
                            for (var i = 0; i < adlist.length; i++) {
                                if (canShow(adlist[i].csIds, csids)) {
                                    html += tpl.replace("{0}", adlist[i].adHref).replace("{1}", adlist[i].adSrc).replace("{2}", adlist[i].height);
                                    asshowCount++;
                                }
                            }
                            _self.replaceWith(html);
                            if (asshowCount > 1) {
                                _container.jCarouselLite(options);
                            }
                        }
                }
            }
        });
    };
    $("div[data-adcode]").adProcess();
});