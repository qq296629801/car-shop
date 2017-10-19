(function ($) {
    $.brandlistnew = {};
    $.extend($.brandlistnew, {
        param: null,
        domain: null,
        itemdomain: "/",
        tradedomain: "/",
        cityId: null,
        searchp: null,
        hotBrandListPanel: $("#hotBrandListPanel"),
        brandListPanel: $("#brandListPanel"),
        brandListNavPanel: $("#brandListNavPanel"),
        searchLabel: $(".car-list-right-selected-label"),
        labelArr: new Array("品牌", "价格", "级别", "国别", "能源", "排量", "变速箱", "座位数", "驱动", "配置"),
        brandParamList: null,
        haveGroup: null,
        havePromise: null,
        haveFinance: null,
        citySpell: null,
        confParamVal: 0,
        init: function (options) {
            $.extend($.brandlistnew, options);
            if ($.trim(this.param) == "-") {
                this.param = "0-0-0-0-0-0-0-0-0-0-0";
            }
            if (!Array.prototype.indexOf) {
                Array.prototype.indexOf = function (elt /*, from*/) {
                    var len = this.length >>> 0;
                    var from = Number(arguments[1]) || 0;
                    from = (from < 0) ? Math.ceil(from) : Math.floor(from);
                    if (from < 0)
                        from += len;
                    for (; from < len; from++) {
                        if (from in this && this[from] === elt)
                            return from;
                    }
                    return -1;
                };
            }
            
            this.uiInitialize();
            $.brandlistnew.brandParamList = this.getUrlParam();
            $.brandlistnew.carRecomdLoader.init();
            this.configureSelect();
            this.driveSelect();
            this.seatingSelect();
            this.transmissionsSelect();
            this.outputVolumeSelect();
            this.energySelect();
            this.countrySelect();
            this.levelSelect();
            this.priceSelect();
            this.brandSelect();
            this.deleteAllLabel();
            this.hotFirst();
            this.priceFirst();
            this.deleteClsLabel();
        },
        //初始化UI显示
        uiInitialize: function () {
            var $topmore = $('.carlist-t1-more');
            var $carlist = $('.carlist-t5');
            $topmore.on('mouseover', function () {
                $carlist.show();
            });
            $carlist.on('mouseover', function () {
                $(this).show();
            });
            $carlist.on('mouseout', function () {
                $(this).hide();
            });
            /* 改变级别 */
            var $ra = $('.carlist-t4-ra');
            $ra.each(function () {
                $(this).hover(function () {
                    var $ra1 = $('.carlist-t4-ra1', $(this));
                    var $ra2 = $('.carlist-t4-ra2', $(this));
                    var $ra3 = $('.carlist-t4-ra3', $(this));
                    $ra1.css({ 'border-bottom': '1px solid #ffffff' });
                    $ra2.show();
                    $ra3.show();
                }, function () {
                    var $ra1 = $('.carlist-t4-ra1', $(this));
                    var $ra2 = $('.carlist-t4-ra2', $(this));
                    var $ra3 = $('.carlist-t4-ra3', $(this));
                    $ra1.css({ 'border-bottom': '1px solid #d7dce4' });
                    $ra2.hide();
                    $ra3.hide();
                });
            });
            var $raall = $('.carlist-t4-ra3').not('.carlist-t4-extra');
            var $extra = $('.carlist-t4-extra');
            $raall.each(function () {
                var $list = $(this).find('.carlist-t4-ra3-a');
                var $span = $(this).siblings('.carlist-t4-ra1').find('.carlist-t4-text');
                var $that = $(this);
                $list.on('click', function () {
                    if ($(this).hasClass('current')) {
                        $(this).removeClass('current');
                        $span.text($span.attr('title')).removeClass('red');
                        $that.hide();
                    } else {
                        $list.removeClass('current');
                        $(this).addClass('current');
                        $span.text($(this).text()).addClass('red');
                        $that.hide();
                    }
                });
            });
            $extra.each(function () {
                var $list = $(this).find('.carlist-t4-ra2-a');
                var $span = $(this).siblings('.carlist-t4-ra1').find('.carlist-t4-text1');
                var $that = $(this);
                var $ensure = $('.carlist-t4-ensure', $(this));
                var $cancel = $('.carlist-t4-cancel', $(this));
                $list.on('click', function () {
                    if ($(this).hasClass('current')) {
                        $(this).removeClass('current');
                    } else {
                        $(this).addClass('current');
                    }
                });
                $ensure.on('click', function () {
                    var html = '';
                    $list.each(function () {
                        if ($(this).hasClass('current')) {
                            if (html == '') {
                                html = $(this).text();
                            } else {
                                html += ',' + $(this).text();
                            }
                        }
                    });
                    if (html != '') {
                        $span.text(html).addClass('red');
                    } else {
                        $span.text($span.attr('title')).removeClass('red');
                    }
                    $that.hide();
                });
                $cancel.on('click', function () {
                    $that.hide();
                });
            });
            $("#ctrlbrandshrink").click(function () {
                $(this).parent().hide();
            });
            /* 点击指导价 热度 */
            var $price = $('.carlist-mtr-price');
            var $heat = $('.carlist-mtr-heat');
            $price.click(function () {
                if ($(this).hasClass('current')) {
                    var $i = $(this).find('i');
                    if ($i.hasClass('top')) {
                        $(this).attr('title', '指导价从高到低');
                        $i.addClass('top').removeClass('bottom');
                    } else {
                        $(this).attr('title', '指导价从低到高');
                        $i.removeClass('top').addClass('bottom');
                    }
                } else {
                    var $i = $(this).find('i');
                    $i.addClass('top').removeClass('bottom');
                    $heat.removeClass('current');
                    $(this).addClass('current top');
                }
            });
            $heat.click(function () {
                $price.removeClass('current');
                $price.find('i').removeClass('top bottom');
                $price.attr('title', '指导价从低到高');
                $(this).addClass('current');
            });
            /* hover效果 */
            var $mca = $('.carlist-mc-a');
            var $bll = $('.carlist-bl-l');
            var $iejump = function ($_this) {
                var $img = $_this.find('img');
                var $src = $_this.attr('href');
                $img.on('click', function () {
                    window.open($src);
                });
            }
            $.fn.extend({
                hoverZoom: function (settings) {
                    var defaults = {
                        zoom: 25,
                        speed: 300,
                        width: 220,
                        height: 147
                    };
                    var settings = $.extend(defaults, settings);

                    return this.each(function () {
                        var s = settings;
                        var hz = $(this);
                        var image = $('img', hz).parent();
                        var $allwidth = settings.width;
                        var $allheight = settings.height;
                        hz.hover(function () {
                            image.stop().animate({
                                height: $allheight + s.zoom,
                                width: $allwidth + s.zoom,
                                marginLeft: -(s.zoom) / 2,
                                marginTop: -(s.zoom) / 2
                            }, s.speed);
                        }, function () {
                            image.stop().animate({
                                height: $allheight,
                                width: $allwidth,
                                marginLeft: 0,
                                marginTop: 0
                            }, s.speed);
                        });
                    });
                }
            });
            $mca.hoverZoom({
                width: 225,
                height: 150
            });
            $bll.hoverZoom({
                width: 225,
                height: 150
            });
            if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/7./i) == "7.") {
                $mca.each(function () {
                    $iejump($(this));
                });
                $bll.each(function () {
                    $iejump($(this));
                });
            }
        },
        //品牌选择
        brandSelect: function () {
          //  $.brandlistnew.commonSelect2("#ctrlbrand,#ctrlbrandall", 0, true);
        },
        //价格选择
        priceSelect: function () {
           // $.brandlistnew.commonSelect2("#ctrlprice", 1, false);
        },
        //级别选择
        levelSelect: function () {
           // $.brandlistnew.commonSelect2("#ctrllevel", 2, false);
        },
        //国别选择
        countrySelect: function () {
          //  $.brandlistnew.commonSelect("#ctrlcountry", 3);
        },
        //能源选择
        energySelect: function () {
          //  $.brandlistnew.commonSelect("#ctrlenergy", 4);
        },
        //排量选择
        outputVolumeSelect: function () {
           // $.brandlistnew.commonSelect("#ctrloutputvolume", 5);
        },
        //变速箱选择
        transmissionsSelect: function () {
           // $.brandlistnew.commonSelect("#ctrltransmissions", 6);
        },
        //座位数选择
        seatingSelect: function () {
          //  $.brandlistnew.commonSelect("#ctrlseating", 7);
        },
        //驱动选择
        driveSelect: function () {
           // $.brandlistnew.commonSelect("#ctrldrive", 8);
        },
        //配置选择
        configureSelect: function () {
            var param = $.brandlistnew.getUrlParam();
            var conf = param[9];
            var confSpan = "";
            var confVal = "";
            $.brandlistnew.confParamVal = parseInt(conf);
            var panel = $("#ctrlconfigpanel").find("a");
            $.each(panel, function () {
                var code = $(this).attr("data-code");
                if (code & conf) {
                    $(this).addClass("current");
                    confSpan += $(this).text() + ",";
                    confVal += code + ",";
                }
            });
            if (confSpan != "") {
                $("#ctrlconfigspan").text(confSpan);
                $("#ctrlconfigspan").addClass("red");
                var txtarr = confSpan.split(',');
                var valarr = confVal.split(',');
                for (var i = txtarr.length - 1; i >= 0; i--) {
                    if (txtarr[i] != "") {
                        var txt = "<div class='carlist-tar-all'><span>配置：" + txtarr[i] + "</span><i data-code='" + valarr[i] + "' data-type='1'></i></div>";
                        $("#ctrlparambar").prepend(txt);
                    }
                }
                $("#ctrlparambar").find("i[data-type=1]").click(function () {
                    window.location = $.brandlistnew.setUrlParam(9, $(this).attr("data-code"), 0);
                });
                $("#ctrlconfigspan").addClass("current");
            }
            $("#ctrlconfigpanel").find("a").click(function () {
                var code = $(this).attr("data-code");
                if (code & $.brandlistnew.confParamVal) {
                    $(this).removeClass("current");
                    $.brandlistnew.confParamVal -= parseInt(code);
                } else {
                    $(this).addClass("current");
                    $.brandlistnew.confParamVal += parseInt(code);
                }
            });
            $(".carlist-t4-extra1").find("a").unbind("click");
           
        },
        //通用选择
        commonSelect: function (cls, loc) {
            var currentValue = $.brandlistnew.brandParamList[loc];
            var span = $(cls).find("span");
            var obj = $(cls).find(".carlist-t4-ra3").find("a[data-code=" + currentValue + "]");
            $(obj).addClass("current");
            var txt = $(obj).text();
            var labTxt = $.brandlistnew.labelArr[loc];
            if (txt == "" || txt == "不限") {
                $(span).text(labTxt);
            }
            else {
                $(span).text(txt);
                $(span).addClass("red");
                var searchLabTxt = "<div class='carlist-tar-all'><span>" + labTxt + "：" + txt + "</span><i data-code='" + loc + "'></i></div>";
                $("#ctrlparambar").prepend(searchLabTxt);
                $.brandlistnew.deleteClsLabel();
            }
            //绑定操作
            $(cls).find("a").click(function () {
                var url = $.brandlistnew.setUrlParam(loc, $(this).attr("data-code"), -1);
                window.location = url + "/";
                return false;
            });
        },
        //通用选择2
        commonSelect2: function (cls, loc, isbrand) {
            var currentValue = $.brandlistnew.brandParamList[loc];
            var labTxt = $.brandlistnew.labelArr[loc];
            $(cls).find("a").removeClass("current");
            var tmp = $(cls).find("a[data-code=" + currentValue + "]");
            var obj;
            if (tmp.length > 1) {
                obj = $(tmp).eq(0);
            } else {
                obj = tmp;
            }
            $(tmp).addClass("current");
            var txt = $(obj).text();
            if (txt != "不限" && txt != "") {
                var searchLabTxt = "<div class='carlist-tar-all'><span>" + labTxt + "：" + txt + "</span><i data-code='" + loc + "'></i></div>";
                $("#ctrlparambar").prepend(searchLabTxt);
            }
            if (isbrand) {
                var ids = cls.split(',');
                var curr = $(ids[1]).find("a[data-code=" + currentValue + "]");
                var b2 = $(ids[0]).find("a[data-code=" + currentValue + "]");
                if ($(b2).length == 0 && $(curr).text() != "") {
                    $(ids[0]).find(".carlist-t1-r").append("<a class='carlist-t1-ra common-link current' data-code='" + $(curr).attr("data-code") + "'>" + $(curr).text() + "</a>");
                }
            }
            //绑定操作
            $(cls).find("a").click(function () {
                var url = $.brandlistnew.setUrlParam(loc, $(this).attr("data-code"), -1);
                window.location = url + "/";
                return false;
            });
        },
        //获取Url参数
        getUrlParam: function () {
            return $.brandlistnew.param.split('-');
        },
        //设定Url参数
        setUrlParam: function (loc, value, flag) {
            var resultUrl = "";
            var currentValue = $.brandlistnew.brandParamList[loc];
            var paramList = this.getUrlParam();
            if (flag == 1) {
                paramList[loc] = parseInt(value) + parseInt(currentValue);
            } else if (flag == -1) {
                paramList[loc] = parseInt(value);
            } else {
                paramList[loc] = parseInt(currentValue) - parseInt(value);
            }
            var tmpUrl = paramList.join("-");
            resultUrl += "//" + $.brandlistnew.domain + "/search/" + tmpUrl;
            return resultUrl;
        },
        //设定Url参数
        setUrlParam2: function (loc, value, flag) {
            var resultUrl = "";
            var currentValue = $.brandlistnew.brandParamList[loc];
            var paramList = this.getUrlParam();
            if (flag == 1) {
                paramList[loc] = value + currentValue;
            } else if (flag == -1) {
                paramList[loc] = value;
            } else {
                paramList[loc] = currentValue.replace(value, "");
            }
            var tmpUrl = paramList.join("-");
            resultUrl += "//" + $.brandlistnew.domain + "/search/" + tmpUrl;
            return resultUrl;
        },
        //删除所有条件
        deleteAllLabel: function () {
            $("#ctrlclearall").click(function () {
                window.location = "/list";
            });
        },
        //删除分类条件
        deleteClsLabel: function () {
            $("#ctrlparambar").find("i[data-type!=1]").click(function () {
                window.location = $.brandlistnew.setUrlParam($(this).attr("data-code"), 0, -1);
            });
        },
        //热度排序
        hotFirst: function () {
            var param = $.brandlistnew.getUrlParam();
            if (1 & param[10] || param[10] == "0") {
                $("#ctrlsortprice").find("i").removeClass("current").removeClass("top").removeClass("bottom");
                $("#ctrlsorthot").addClass("current");
            }
            $("#ctrlsorthot").click(function () {
               // window.location = $.brandlistnew.setUrlParam(10, 1, -1);
            });
        },
        //指导价排序
        priceFirst: function () {
            var param = $.brandlistnew.getUrlParam();
            var targetObj = $("#ctrlsortprice").find("i");
            if (4 & param[10]) {
                $("#ctrlsorthot").removeClass("current");
                targetObj.parent().addClass("current");
                targetObj.addClass("top");
                $("#ctrlsortprice").attr("title", "指导价从低到高");
            }
            else if (2 & param[10]) {
                $("#ctrlsorthot").removeClass("current");
                targetObj.parent().addClass("current");
                targetObj.addClass("bottom");
                $("#ctrlsortprice").attr("title", "指导价从高到低");
            }
            $("#ctrlsortprice").click(function () {
                var param = $.brandlistnew.getUrlParam();
                if (param[10] == "4") {
                    window.location = $.brandlistnew.setUrlParam(10, 2, -1);
                } else {
                    window.location = $.brandlistnew.setUrlParam(10, 4, -1);
                }
            });
        },
        //获取猜你喜欢数据
        carRecomdLoader: {
            init: function (options) {
                $.extend($.brandlistnew.carRecomdLoader, options);
                $.brandlistnew.carRecomdLoader.load();
            },
            load: function () {
                $.ajax({
                    type: "GET",
                    url: "/search/Ajax/SearchRecomdCar.ashx?v=" + (+new Date()),
                    data: { ccode: $.brandlistnew.cityId },
                    success: function (data) {
                        var loader = $.brandlistnew.carRecomdLoader;
                        loader._render(data);
                    },
                    error: function () { }
                });
            },
            _render: function (data) {
                var str = "";
                $.each(data, function () {
                    str += "<li><a target='_blank' href='//" + $.brandlistnew.itemdomain + "/" + this.Spell + "/?page=search_like' class='carlist-bl-l'><span class='carlist-bl-img'><span class='carlist-bl-i'><img src='" + ((this.ImageUrl == "") ? "//img.huimaiche.cn/uimg/www/v20160927/images/zw300x200.png" : this.ImageUrl) + "' alt=''/></span></span>";
                    str += "<span class='carlist-bl-title'>" + this.SerialName + "</span>";
                    str += "<span class='carlist-bl-price'>" + this.PriceRange + "</span>";
                    str += "<span class='carlist-bl-bottom'><span>" + this.BuyCount + "</span>人正在购买</span>";
                    str += "</a></li>";
                });
                $("#favSerialPanel").append(str);
                /* hover效果 */
                var $mca = $('#favSerialPanel .carlist-mc-a');
                var $bll = $('#favSerialPanel .carlist-bl-l');
				var $iejump = function ($_this) {
					var $img = $_this.find('img');
					var $src = $_this.attr('href');
					$img.on('click', function () {
						window.open($src);
					});
				}
                $.fn.extend({
                    hoverZoom: function (settings) {
                        var defaults = {
                            zoom: 25,
                            speed: 300,
                            width: 220,
                            height: 147
                        };
                        var settings = $.extend(defaults, settings);

                        return this.each(function () {
                            var s = settings;
                            var hz = $(this);
                            var image = $('img', hz).parent();
                            var $allwidth = settings.width;
                            var $allheight = settings.height;
                            hz.hover(function () {
                                image.stop().animate({
                                    height: $allheight + s.zoom,
                                    width: $allwidth + s.zoom,
                                    marginLeft: -(s.zoom) / 2,
                                    marginTop: -(s.zoom) / 2
                                }, s.speed);
                            }, function () {
                                image.stop().animate({
                                    height: $allheight,
                                    width: $allwidth,
                                    marginLeft: 0,
                                    marginTop: 0
                                }, s.speed);
                            });
                        });
                    }
                });
                $mca.hoverZoom({
                    width: 225,
                    height: 150
                });
                $bll.hoverZoom({
                    width: 225,
                    height: 150
                });
				if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/7./i) == "7.") {
					$mca.each(function () {
						$iejump($(this));
					});
					$bll.each(function () {
						$iejump($(this));
					});
				}
            }
        },
        //根据车型Id获取车款列表
        getCarListBySerialId: function (ul, showBox, btn, serialid, carType, params) {
            $.ajax({
                type: "GET",
                url: "/search/Ajax/GetCarListBySerialId.ashx?v=" + (+new Date()),
                data: { param: params, serialId: serialid, cityId: $.brandlistnew.cityId, carType: carType },
                success: function (data) {
                    var str = "";
                    $.each(data, function () {
                        var currentLinkUrl = '';
                        var currentProductUrl = '';
                        if (this.BusinessType == 1) {
                            //商城商品
                            currentLinkUrl = hmc_global.config.mall_product_item + "p_" + this.MallProductID + ".html";
                            currentProductUrl = hmc_global.config.mall_product_item + "p_" + this.MallProductID + ".html";
                        } else {
                            //惠买车商品
                            currentLinkUrl = "//" + $.brandlistnew.citySpell + hmc_global.config.hmc_product_item + $(btn).attr("data-url") + "/" + this.CarID + "/?page=search_style";
                            currentProductUrl = hmc_global.config.hmc_product_trade + "order/" + $.brandlistnew.cityId + "/" + this.CarID + "/?page=search_order";
                        }
                        str += "<li>";
                        str += "<a target='_blank' href='" + currentLinkUrl + "' class='li-details-ul-name'>" + this.yeartype + "款 " + this.SerialShowName + " " + this.carname;
                        if (this.PromisedPrice > 0) {
                            str += "<span>承诺价</span>";
                        }
                        if (this.IsSupportFinance > 0) {
                            str += "<em>贷款</em>";
                        }
                        str += "</a>";
                        str += "<div class='li-details-ul-precent-wrapper'>";
                        str += "<div class='li-details-ul-precent-bar'><p style='width: " + this.pv + "%'></p></div>";
                        str += "</div>";
                        if (this.referprice > 0) {
                            str += "<span class='li-details-ul-price'>" + this.referprice.toFixed(2) + "万</span>";
                        } else {
                            str += "<span class='li-details-ul-price'>--</span>";
                        }
                        if (this.savemoney > 0) {
                            str += "<span class='li-details-ul-discount'>" + this.savemoney.toFixed(2) + "万</span>";
                        } else {
                            str += "<span class='li-details-ul-discount'>--</span>";
                        }
                        str += "<a href='" + currentProductUrl + "' class='li-details-ul-buy'>底价买车</a>";
                        str += "</li>";
                    });
                    ul.append(str);
                    ul.clone().appendTo(showBox);
                    showBox.find("ul").css("display", "block");
                    $(btn).addClass("clickable");
                    showBox.show();
                },
                error: function () { }
            });
        }
    });
})(jQuery); 