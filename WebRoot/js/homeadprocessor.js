/*惠买车pc广告插件*/
$(function () {
    $.fn.adProcess = function (opts) {
        var defaults = {
            titCell: ".bd",
            mainCell: ".hd",
            effect: "topLoop",
            easing: "swing",
            autoPlay: true,
            autoPage: true,
            trigger: "click",
            interTime: 3000,
            delayTime: "300"
        };

        var options = $.extend(defaults, opts);
        return this.each(function () {
            var _self = $(this), _container = _self.parents(".ad-box");
            var adcode = _self.data("adcode"), adlist = adgrouplist[adcode];
            if (typeof (adlist) !== "undefined") {
                switch (adcode) {
                    case 38://首页焦点图
                        if (adlist.length > 0) {
                            var html = "", tpl = "<div class=\"scroll-img-item\" id=\"scrollItem{0}\" style=\"{1};\"><a href=\"{2}\" target=\"_blank\"><img src=\"{3}\"></a></div>";
                            var navHtml = "", tpl2 = "<a href=\"javascript:void(0)\" class=\"{1}\" data-rel=\"scrollItem{0}\"></a>";
                            for (var i = 0; i < adlist.length; i++) {
                                html += tpl.replace("{0}", i + 1).replace("{1}", i == 0 ? "z-index:1" : "none").replace("{2}", adlist[i].adHref).replace("{3}", adlist[i].adSrc);
                                navHtml += tpl2.replace("{0}", i + 1).replace("{1}", i == 0 ? "current" : "");
                            }
                            _self.replaceWith(html);
                            $("#main-scroll").append(navHtml);
                            (function () {
                                var wrapper = $("#scrollBox");
                                wrapper.slide({
                                    titCell:'.scroll-pointer a',
                                    mainCell:'.scroll-img-box-content',
                                    effect:'fold',
                                    interTime:5000,
                                    autoPlay:true,
                                    delayTime:1500,
                                    titOnClassName:'current'
                                });
                            })();
                        }
                        break;
                    case 27: //右侧浮层
                        if (adlist.length > 0) {
                            var html = "<a class=\"d11-2016-logo\" href=\"{0}\" target=\"_blank\"> <img src=\"{1}\" alt=\"\"><strong>{2}</strong></a>";
                            html = html.replace("{0}", adlist[0].adHref).replace("{1}", adlist[0].adSrc).replace("{2}", adlist[0].adName);
                            _self.replaceWith(html);
                        } else {
                            _container.hide();
                        }
                        break;
                    case 39:
                    case 40:
                    case 41:
                        if (adlist.length > 0) {
                            var html = "";
                            var tpl = "<li class=\"scroll-img-item\"><a href=\"{0}\" target=\"_blank\"><img src=\"{1}\" alt=\"\" height=\"{2}\"></a></li>";
                            for (var i = 0; i < adlist.length; i++) {
                                html += tpl.replace("{0}", adlist[i].adHref).replace("{1}", adlist[i].adSrc).replace("{2}", adlist[i].height);
                            }
                            _self.replaceWith(html);
                            if (adlist.length > 1)
                                _container.find(".ad-scroll").slide(options);
                        }
                        else {
                            _container.hide();
                        }
                        break;
                    case 48://测试环境是60
                        if (adlist.length > 0) {
                            //文字链广告
                            var html = "";
                            html += "<div class=\"evaluation-ad\"><div class=\"new-all-advertisement\"></div></div><div class=\"evaluation-title\">热门活动</div><div class=\"evaluation-acts\">";
                            var tpl = "<a href=\"{0}\" target=\"_blank\"><i></i>{1}</a>";
                            for (var i = 0; i < adlist.length; i++) {
                                html += tpl.replace("{0}", adlist[i].adHref).replace("{1}", adlist[i].adText);
                            }
                            html += "</div>";
                            _self.replaceWith(html);
                        } else {
                            _container.hide();
                        }
                        break;
                    default:
                        if (adlist.length > 0) {
                            //文字链广告
                            var html = "";
                            if (adlist[0].adType === "3") {
                                var tpl = "<a href=\"{0}\" target=\"_blank\">{1}</a>";
                                for (var i = 0; i < adlist.length; i++) {
                                    html += tpl.replace("{0}", adlist[i].adHref).replace("{1}", adlist[i].adText);
                                }
                                _self.replaceWith(html);
                            }
                            else {
                                var tpl = "<a href=\"{0}\" target=\"_blank\"><img src=\"{1}\" alt=\"{2}\"></a>";
                                html = tpl.replace("{0}", adlist[0].adHref).replace("{1}", adlist[0].adSrc).replace("{2}", adlist[0].adName);
                                _self.replaceWith(html);
                            }
                        } else {
                            _container.hide();
                        }
                }
            }
        });
    };
    $("[data-adcode]").adProcess();
});