(function ($) {
    $.seriselector = {};
    $.extend($.seriselector, {
        ccode: 201,
        callback: null,
        cache: $("#datacache"),
        oCarSerial: $("#divchexing"),
        oBrand: $("#divpinpai"),
        init: function (options) {
            var _self = $.seriselector;
            $.extend(_self, options);
            //init brand ddl
            $.getScript(hmc_global.config.cdnJs() + "homeBrand_" + _self.ccode + ".js", function () {
                var json = { gmb: indexSelectBrand };
                //load brand list
                var content = new EJS({ url: hmc_global.config.tpl() + 'IndexSelectMB.html', cache: true }).render(json);
                $(".pinpai-list").html(content);
                $(".pinpai-list a").click(function (e) {
                    hmc_global.events.popStopCancel(e);
                    _self.uiEvents.divpinpai.selected($(this));
                });
                //load brand char index
                $(".pinpai-index").html(new EJS({ url: hmc_global.config.tpl() + 'IndexSelectMBChar.html', cache: false }).render(json));
            });
            //set char index event
            $(".pinpai-index").on("click", ".pinpai-index-top em", function (e) {
                hmc_global.events.popStopCancel(e);
                $(".pinpai-index").animate({ "margin-top": "-288px" }, 200).find("div").removeClass("crt");
                $(this).parent().parent().find("div").eq(1).addClass("crt");
            }).on("click", ".pinpai-index-bottom em", function (e) {
                hmc_global.events.popStopCancel(e);
                $(".pinpai-index").animate({ "margin-top": "0px" }, 200).find("div").removeClass("crt");
                $(this).parent().parent().find("div").eq(0).addClass("crt");
            }).on("click", "span", function (e) {
                hmc_global.events.popStopCancel(e);
                _self.uiEvents.divpinpai.pinpai_index($.trim($(this).html()));
            });
            $("body").on("keyup", _self.uiEvents.divpinpai.keyup);
            //load main brand
            _self.loadMasterBrand();
        },
        uiEvents: {
            speed: 200,
            divpinpai: {
                //brand selected event
                selected: function (obj) {
                    $(".pinpai a").removeClass("current");
                    obj.addClass("current");
                    //load serial data for selected brand
                    var mbspell = obj.attr("data-spell");
                    var loc = window.location;
                    loc.href = "//" + loc.host + "/" + mbspell;
                },
                //brand char index
                pinpai_index: function (str) {
                    var $list = $(".pinpai-list");
                    var $dt = $list.find("dt:contains('" + str + "')");
                    if ($dt.length > 0) {
                        var n_height = 0,
			            $dl = $dt.parent();
                        var $index = $list.find("dl").index($dl);
                        for (var i = 0; i < $index; i++) {
                            n_height = n_height + $list.find("dl").eq(i).height();
                        }
                        $list.animate({
                            scrollTop: n_height
                        }, 200);
                    }
                },
                //char index keyboard event
                keyup: function (e) {
                    if (e.keyCode > 64 && e.keyCode < 91) {
                        var chara = String.fromCharCode(e.keyCode);
                        $.seriselector.uiEvents.divpinpai.pinpai_index(chara);
                        var em = $(".pinpai-index em");
                        if (em.length > 1) {
                            var crt = $(".pinpai-index div.crt");
                            var index = em.index(crt.find("span:contains('" + chara + "')").parent().find("em"));
                            var other = $(".pinpai-index div").not(crt);
                            var oindex = em.index(other.find("span:contains('" + chara + "')").parent().find("em"));
                            if (index < 0 && oindex >= 0) {
                                crt.find("em").trigger("click");
                            }
                        }
                    }
                }
            }
        },
        //load hot brand method
        loadMasterBrand: function () {
            $.getScript(hmc_global.config.cdnJs() + "hotcb_" + $.seriselector.ccode + ".js", function () {
                var json = { MBrands: hotcb.slice(0, 10) };
                content = new EJS({ url: hmc_global.config.tpl() + 'IndexHMB.html', cache: true }).render(json);
                $(".pinpai-nav p").html(content);
                $(".pinpai-nav a").click(function (e) {
                    hmc_global.events.popStopCancel(e);
                    $(".pinpai-name").html($.trim($(this).text()));
                    $.seriselector.uiEvents.divpinpai.selected($(this));
                });
            });
        },
        //load serial data method
        loadSerial: function (p_mbid) {
            if (p_mbid && parseInt(p_mbid) > 0) {
                $("#divchexing").empty().html("<div class=\"loading\"><i></i>正在加载更多车型...</div>");
                $.getScript(hmc_global.config.cdnJs() + "homeSeriSelect_" + $.seriselector.ccode + "_" + p_mbid + ".js", function () {
                    if (indexSelectCs) {
                        $.seriselector.cache.data("mb_" + p_mbid + "_cid_" + $.seriselector.ccode, indexSelectCs);
                        $.seriselector.getSerilaSuccess(indexSelectCs);
                    }
                });
            }
        },
        //serial data load success event
        getSerilaSuccess: function (data) {
            var obj = data;
            var seriGroup = {};
            if (obj) {
                for (var i = 0; i < obj.length; i++) {
                    if (!(obj[i].brand in seriGroup)) {
                        seriGroup[obj[i].brand] = [];
                    }
                    seriGroup[obj[i].brand].push(obj[i]);
                }
                var divchexing = $("#divchexing");
                divchexing.empty().html(new EJS({ url: hmc_global.config.tpl() + 'CarSerial.html', cache: true }).render({ sg: seriGroup }));
                divchexing.on("click", ".csMark", function () {
                    if (typeof ($.seriselector.callback) === "function") {
                        $.seriselector.callback({
                            csid: $(this).attr("data-code"), csspell: $(this).attr("data-spell"), csname: $(this).find("img").attr("alt")
                        });
                    }
                });
            }
        },
        showBrand: function () {
            var _self = $.seriselector;
            _self.oCarSerial.hide();
            _self.oBrand.show();
            _self.isVisbile = true;
            $("body").on("keyup", _self.uiEvents.divpinpai.keyup);
            $("#divpinpai").slideDown(_self.uiEvents.speed);
        },
        closeBrand: function () {
            var _self = $.seriselector;
            _self.oBrand.hide();
            $("body").off("keyup");
        },
        closeSerial: function () {
            var _self = $.seriselector;
            _self.oCarSerial.hide();
        },
        showSerial: function (mbid) {
            var _self = $.seriselector;
            _self.oBrand.hide();
            _self.oCarSerial.show();
            _self.isVisbile = true;
            var cachedata = $.seriselector.cache.data("mb_" + mbid + "_cid_" + $.seriselector.ccode);
            if (cachedata) {
                $.seriselector.getSerilaSuccess(cachedata);
            } else {
                $.seriselector.loadSerial(mbid);
            }
            $("#divchexing").slideDown($.seriselector.uiEvents.speed);
        }
    });
})(jQuery);