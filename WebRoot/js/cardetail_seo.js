(function ($) {
    $.cardetail_seo = {};
    $.extend($.cardetail_seo, {
        cityId: 0, //城市ID
        carId: 0, //车款ID
        csId: 0, //车型ID
        yearType: 0, //年款
        brandId: 0, //品牌id
        mbId: 0,
        navLoc: 0,
        usenation: 0,
        imgTitle: '',
        giftCount: 0, //礼品数量
        isSerialPage: "", //是否是车型页（是=1，否=0）
        carLevel: 0,
        minPrice: 0,
        maxPrice: 0,
        cityName: "",
        logined: false,
        showWelcomeHead: 0,
        navText: "",
        citySpell: "",
        colorImg: null,
        imgHeight: 0,
        imgWidth: 0,
        showMore: 0,
        init: function (options) {
            $.extend($.cardetail_seo, options);
            //初始化UI交互
            this.uiInit();
            this.loadBasicInfo();
            //获取定金
            this.getPayMoney(this.cityId);
            //焦点图
            this.navFocus();
            //加载图片预览
            this.picLoad();

            this.initTimer();

            this.drawChart();
            this.carImgLoader.init({ initImgs: $.cardetail_seo.initImgs });
            this.carParmLoader.init();
            this.carListLoader.init();

            //加载团购信息
            this.loadGroup();

            //加载导购信息
            this.loadLastNews();

            //加载买顾信息
            //this.loadCounselor();

            //加载当前品牌下的热门车型 
            //this.loadHotSerial();

            //加载热门车型
            //this.loadHotSerialAll();

            this.getFavCarList();

            //记录用户浏览车型和车款
            this._recordSerial();
            this._recordCar();

            //购车分享
            this.getShare();
        },
        //页面交互
        uiInit: function () {
            $(".newcar-detail1-ccright .drop-down-menu").on("click", function (e) {//买车城市
                var dropBox = $("#citySelectPanel");
                if (dropBox.hasClass("hidden")) {
                    dropBox.removeClass("hidden");
                    if ($(this).parent().find("span").attr("id") == "citySelected") {
                        $(".type-content-right-col").parent().hide(); //把选择车款面板隐藏掉
                    }
                    if (typeof HMC_LOG !== "undefined" && typeof HMC_LOG.SentClickStat === "function") {
                        try {
                            HMC_LOG.SentClickStat(this);
                        } catch (e) { }
                    }
                } else {
                    dropBox.addClass("hidden");
                };
                e.stopPropagation();
            });
            $(document).click(function () {//空白处点击事件，弹窗隐藏
                $("#citySelectPanel").addClass("hidden");
            });

            $("#carYearSelect").find("a").click(function () {
                var id = $(this).attr("data-year");
                $(this).addClass("selected").siblings("a").removeClass("selected"); ;
                $("#carListSelect .newcar-detail1-ctright").hide();
                $("#carListSelect div[data-year=" + id + "]").show();

                //年款切换处理开始
                var caryeartmp = id;
                $("#carListSelect .newcar-detail1-ctright").hide();
                $("#carListSelect div[data-year=" + caryeartmp + "]").show();
                $("#carYearSelect a[data-year=" + caryeartmp + "]").addClass("selected");
                var targetCarId = $.cardetail_seo.getHotCar(caryeartmp);
                var urlextend = $.cardetail_seo.showMore == 1 ? "&coll=1" : "";
                var urlextend2 = window.location.search.indexOf("coll=1") != -1 ? "&coll=1" : "";
                window.location = "//" + $.cardetail_seo.citySpell + ".huimaiche.com/" + $.cardetail_seo.spell + "/" + targetCarId + "/?h=1" + urlextend + urlextend2;
                var showMoreBtn = $("#carListSelect").find(".newcar-detail1-ctright[data-year=" + id + "]").find("a[class=newcar-detail1-ctmore]");
                var countwitdh1 = 0;
                var coun1 = $("#carListSelect").find(".newcar-detail1-ctright[data-year=" + caryeartmp + "]").find("a[class=newcar-detail1-cta]");
                $.each(coun1, function () {
                    countwitdh1 += $(this).width() + 55;
                });
                if (countwitdh1 < 430 || window.location.search.indexOf("coll=1") > -1 || $(showMoreBtn).length <= 0) {
                    $("#carListSelect").find("a[class=newcar-detail1-cta]").each(function () {
                        var url = $(this).attr("data-url");
                        if (url.indexOf("?coll=1") == -1) {
                            $(this).attr("data-url", $(this).attr("data-url") + "?coll=1");
                        }
                        $("#citySelectPanel a").each(function () {
                            var url = $(this).attr("href");
                            if (url.indexOf("?coll=1") == -1) {
                                $(this).attr("href", $(this).attr("href") + "?coll=1");
                            }
                        });
                        $(this).show();
                    });
                    $('.newcar-detail1-ctright').removeClass('newcar-detail1-ctoneline');
                    $(".newcar-detail1-ctmore").hide();
                } else {
                    var countwitdh = 0;
                    var coun = $("#carListSelect").find(".newcar-detail1-ctright[data-year=" + caryeartmp + "]").find("a[class!=newcar-detail1-ctmore]");
                    $.each(coun, function () {
                        countwitdh += $(this).width() + 55;
                        if (countwitdh >= 430) {
                            $(this).hide();
                        }
                    });
                    $(".newcar-detail1-ctmore").show();
                }
                //年款切换处理结束
            });

            //加载处理开始
            if (!$.cardetail_seo.isSerialPage) {
                $("#citySelectPanel a").each(function () {
                    var url = $(this).attr("href");
                    if (url.indexOf("?coll=1") == -1) {
                        $(this).attr("href", $(this).attr("href") + "?coll=1");
                    }
                });
            }

            var carli = $("#carListSelect a[data-code=" + $.cardetail_seo.carId + "]");
            var caryeartmp = $(carli).attr("data-year");
            var firstObj = $("#carListSelect .newcar-detail1-ctright[data-year=" + caryeartmp + "] a[class!=newcar-detail1-ctmore]").eq(0);

            if ($.cardetail_seo.isSerialPage || window.location.search.indexOf("h=1") != -1) {
                $(carli).insertBefore(firstObj);
                $(carli).append("<b></b>");
            }
            $("#carListSelect .newcar-detail1-ctright").hide();
            $("#carListSelect div[data-year=" + caryeartmp + "]").show();
            $("#carYearSelect a[data-year=" + caryeartmp + "]").addClass("selected");

            var countwitdh1 = 0;
            var coun1 = $("#carListSelect").find(".newcar-detail1-ctright[data-year=" + caryeartmp + "]").find("a[class=newcar-detail1-cta]");
            $.each(coun1, function () {
                countwitdh1 += $(this).width() + 55;
            });

            carli.addClass("selected");
            if (countwitdh1 < 430 || window.location.search.indexOf("coll=1") > -1) {
                $("#carListSelect").find("a[class=newcar-detail1-cta]").each(function () {
                    var url = $(this).attr("data-url");
                    if (url.indexOf("?coll=1") == -1) {
                        $(this).attr("data-url", $(this).attr("data-url") + "?coll=1");
                    }
                    $(this).show();
                });
                $('.newcar-detail1-ctright').removeClass('newcar-detail1-ctoneline');
                $(".newcar-detail1-ctmore").hide();
            } else {
                var countwitdh = 0;
                var coun = $("#carListSelect").find(".newcar-detail1-ctright[data-year=" + caryeartmp + "]").find("a[class!=newcar-detail1-ctmore]");
                $.each(coun, function () {
                    countwitdh += $(this).width() + 55;
                    if (countwitdh >= 430) {
                        $(this).hide();
                    }
                });
                $(".newcar-detail1-ctmore").show();
            }
            //加载处理结束

            //车款点击事件
            $("#carListSelect .newcar-detail1-ctright").find("a[class!=newcar-detail1-ctmore]").click(function () {
                window.location.href = $(this).attr("data-url");
            });

            $(".ul-lay").find("li").mouseover(function () {
                var path = $(this).find("img").attr("src");
                $(this).parent().find("li").removeClass("current");
                $(this).addClass("current");
                $("#mainPic").attr("src", path.replace("_2.", "_3."));
                $("#mainPic").attr("data-code", $(this).attr("data-code"));
                $.cardetail_seo.navLoc = $(this).attr("id").split('-')[1];
                var cnt = $(this).parent().find("li").length;
                if (parseInt($.cardetail_seo.navLoc) == 0) {
                    $(".pre-btn").addClass("disabled");
                } else {
                    $(".pre-btn").removeClass("disabled");
                }
                if ($.cardetail_seo.navLoc == parseInt(cnt) - 1) {
                    $(".next-btn").addClass("disabled");
                } else {
                    $(".next-btn").removeClass("disabled");
                }
            });
			var qrcodeurl = window.location.href.indexOf("https") > 0 ? window.location.href : window.location.href.replace("http:","");
            $("#qrcodeImg").attr("src", "/Ajax/CarSource/QRCode.ashx?url=" + qrcodeurl);

            //展开点击处理开始
            var $morebtn = $('.newcar-detail1-ctmore');
            $morebtn.click(function (e) {
                //车款点击事件
                $(this).parent().parent().find("a[class!=newcar-detail1-ctmore]").each(function () {
                    if ($(this).attr("data-url").indexOf("?coll=1") == -1) {
                        $(this).attr("data-url", $(this).attr("data-url") + "?coll=1");
                    }
                    $(this).show();
                    $.cardetail_seo.showMore = 1;
                });
                $(this).parent().parent().find(".newcar-detail1-ctright").removeClass('newcar-detail1-ctoneline');
                $(this).hide();
                $(this).parent().parent().find(".newcar-detail1-ctmore").remove();
                return false;
            });
            //展开点击处理结束
            $(".ul-lay").find("li").eq(0).addClass("current");
            var boxTop = $(".car-steps-box").offset().top;
            $(window).on("scroll", function () {
                var scrollTop = $(document).scrollTop();
                if (scrollTop > boxTop) {
                    $(".quick-nav").show();
                } else {
                    $(".quick-nav").hide();
                    $(".quick-nav ul li").removeClass("current");
                }
                for (var i = 1; i < 7; i++) {
                    if ($("#t" + i).length > 0) {
                        var height = $("#t" + i).offset().top;
                        if (height - 90 < scrollTop) {
                            var idx = parseInt($("#t" + i).attr("data-code"));
                            $(".quick-nav-content li").removeClass("current");
                            $(".quick-nav-content li[data-code=" + idx + "]").addClass("current");
                        }
                        if ($("#t6").length > 0) {
                            if ($("#t6").offset().top + 440 < scrollTop) {
                                $(".quick-nav-content li").removeClass("current");
                            }
                        }
                    }
                }
            });

            $(".quick-nav ul li").find("a").click(function () {
                $(".quick-nav ul li").removeClass("current");
                $(this).parent().addClass("current");
                var idx = $(this).parent().attr("data-code");
                var loc = $("#t" + idx).offset().top - 80;
                $('body,html').animate({ scrollTop: loc }, 0); //点击按钮让其回到页面顶部
            });

            if ($.seriselector) {
                $.seriselector.init({
                    ccode: $.cardetail_seo.cityId,
                    callback: function (data) {
                        var loc = window.location;
                        loc.href = "//" + loc.host + "/" + data.csspell + "/";
                    }
                });

                $("#a_allbrand").hover(function () {
                    $.seriselector.showBrand();
                }, function () {
                    setTimeout(function () {
                        if (!$.seriselector.brandfocused)
                            $.seriselector.closeBrand();
                    }, 500);
                });

                $("#a_allserial").hover(function () {
                    $.seriselector.showSerial($.cardetail_seo.mbId);
                }, function () {
                    setTimeout(function () {
                        if (!$.seriselector.csfocused)
                            $.seriselector.closeSerial();
                    }, 500);
                });

                $.seriselector.oBrand.bind("mouseleave", function () {
                    $.seriselector.closeBrand();
                    $.seriselector.brandfocused = false;
                }).bind("mouseenter", function () {
                    $.seriselector.brandfocused = true;
                });

                $.seriselector.oCarSerial.bind("mouseleave", function () {
                    $.seriselector.closeSerial();
                    $.seriselector.csfocused = false;
                }).bind("mouseenter", function () {
                    $.seriselector.csfocused = true;
                });
            }

            $(".table-scroll-inner table tbody tr").each(function () {
                $(this).find("td:eq(1)").addClass("bg");
            });
            $("#tb_Paramhead tr").each(function () {
                $(this).find("th:eq(1)").addClass("mark");
            });

            if ($("#t4").length <= 0) {
                $(".quick-nav ul li[data-code=4]").remove();
            }

            //无商家初始化
            $.cardetail_seo.oos.init({
                dealerNotify: $.cardetail_seo.dealerNotify,
                callback: function () {
                    $("#btn_oos,#btn_oos1").off("click").addClass("disabled");
                }
            });

            var timer_0 = setInterval(function () {
                if (typeof $.hmc_frame !== "undefined") {
                    $.hmc_frame.reset({
                        login_callback: function () {
                            if (!$.hmc_frame.noreload) {
                                window.location.reload(true);
                            }
                        }
                    });
                    clearInterval(timer_0);
                }
            }, 200);
			
			$.fn.extend({
				hoverZoom: function (settings) {
					var defaults = {
						zoom: 15,
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
        },

        //获取定金
        getPayMoney: function (cityid) {
            $.ajax({
                url: hmc_global.config.syncDomain + "GetPayMoney.ashx",
                type: "POST",
                dataType: 'jsonp',
                data: { cityId: cityid, callback: "$.cardetail_seo.getPayMoneyHandller" },
                timeout: 2000
            });
        },
        getPayMoneyHandller: function (data) {
            if (data) {
                if (data.Money > 0) {
                    $(".deposit-price").text("￥" + data.Money);
                }
            }
        },
        //加载页面基本信息
        loadBasicInfo: function () {
            $.ajax({
                type: "GET",
                url: "/Ajax/CarSource/GetBasicInfo.ashx",
                data: { cityId: $.cardetail_seo.cityId, carId: $.cardetail_seo.carId },
                success: function (data) {
                    if (data) {
                        if (data.DealerCount > 3) {
                            $("#buyDealer").append("预付订金享" + data.DealerCount + "家4S店在线报价");
                        } else if (data.DealerCount === 0) {
                            $("#buyCarYear").hide();
                            $("#carListSelect").hide();
                            $("#buyDealer").remove();
                        } else {
                            $("#buyDealer").append("预付订金享多家4S店在线报价");
                        }
                        if (data.Min != "") {
                            $("#buyMin").append("（约" + data.Min + "获得）");
                        } else {
                            $("#buyMin").remove();
                        }
                        if (data.SaleCount > 0) {
                            $("#buyCount").append(data.SaleCount + "人正在购买");
                        } else {
                            $("#buyCount").remove();
                        }
                        if (data.Promoise > 0) {
                            $("#pricePromoisePanel").prepend("<span class='warn'>承诺成交价不高于" + data.Promoise + "万</span><br/>");
                            $("#priceShowArea").append("<em class='icon'>&#xe901;</em><span>承诺成交价不高于" + data.Promoise + "万</span>");
                            $("#priceShowArea").append("<div class='guide-price-d-tips'><i></i><span>只要惠买车用户在平台正常购车，最终成交价格高于承诺价，一经核实满足保障条件，惠买车将返还高出的车款差价！</span><a href='//help.huimaiche.com/issue/servicecontract' target='_blank'>具体细则</a></div>");
                        } else {
                            if (data.SaveMoney > 0) {
                                $("#priceShowArea").append("惠买车平均节省" + data.SaveMoney + "万").addClass("guide-price-discount1");
                            }
                            $("#pricePromoisePanel").find("span").addClass("mid");
                        }
                        if (data.DealerCount > 0) {
                            $("#buyArea").find("p").eq(1).remove();
                            $("#buyArea").find("a").eq(1).remove();
                            $("#buyArea").find("a").eq(0).show();
                            $("#buyAreable").show();
                            $("#buyAreaNone").remove();
                        } else {
                            $("#buyArea").find("a").eq(0).remove();
                            $("#buyArea").find("a").show();
                            $("#buyArea").find("p").show();
                            $("#buyAreaNone").show();
                            $("#buyAreable").remove();
                        }
                    }
                }
            });
        },
        //导航焦点图切换
        navFocus: function () {
            var count = $(".ul-lay").find("li").length;
            $(".next-btn").click(function () {
                if ($.cardetail_seo.navLoc < count - 1) {
                    $.cardetail_seo.navLoc = parseInt($.cardetail_seo.navLoc) + 1;
                }

                if ($.cardetail_seo.navLoc <= count - 1) {
                    if (parseInt($.cardetail_seo.navLoc) == count - 1) {
                        $(this).addClass("disabled");
                    }
                    $(".pre-btn").removeClass("disabled");
                    var path = $("#navImg-" + $.cardetail_seo.navLoc).attr("data-code").split('|')[1];
                    $("#navImg-" + $.cardetail_seo.navLoc).parent().find("li").removeClass("current");
                    $("#navImg-" + $.cardetail_seo.navLoc).addClass("current");
                    $("#mainPic").attr("src", path.replace('{0}', 3));
                    if (parseInt($.cardetail_seo.navLoc) > 3) {
                        for (var i = 0; i < 4; i++) {
                            var tmpObj1 = $(".ul-lay").find("li").eq(i);
                            if ($(tmpObj1).length > 0) {
                                $(tmpObj1).hide();
                            }
                        }
                        for (var i = 4; i < 8; i++) {
                            var tmpObj2 = $(".ul-lay").find("li").eq(i);
                            if ($(tmpObj2).length > 0) {
                                $(tmpObj2).show();
                            }
                        }
                    } else {
                        for (var i = 0; i < 4; i++) {
                            var tmpObj3 = $(".ul-lay").find("li").eq(i);
                            if ($(tmpObj3).length > 0) {
                                $(tmpObj3).show();
                            }
                        }
                        for (var i = 4; i < 8; i++) {
                            var tmpObj4 = $(".ul-lay").find("li").eq(i);
                            if ($(tmpObj4).length > 0) {
                                $(tmpObj4).hide();
                            }
                        }
                    }
                }
            });
            $(".pre-btn").click(function () {
                if ($.cardetail_seo.navLoc > 0) {
                    $.cardetail_seo.navLoc = parseInt($.cardetail_seo.navLoc) - 1;
                }

                if ($.cardetail_seo.navLoc >= 0) {
                    if (parseInt($.cardetail_seo.navLoc) == 0) {
                        $(this).addClass("disabled");
                        $.cardetail_seo.navLoc = 0;
                    }
                    $(".next-btn").removeClass("disabled");
                    var path = $("#navImg-" + $.cardetail_seo.navLoc).attr("data-code").split('|')[1];
                    $("#navImg-" + $.cardetail_seo.navLoc).parent().find("li").removeClass("current");
                    $("#navImg-" + $.cardetail_seo.navLoc).addClass("current");
                    $("#mainPic").attr("src", path.replace('{0}', 3));
                    if (parseInt($.cardetail_seo.navLoc) > 3) {
                        for (var i = 0; i < 4; i++) {
                            var tmpObj1 = $(".ul-lay").find("li").eq(i);
                            if ($(tmpObj1).length > 0) {
                                $(tmpObj1).hide();
                            }
                        }
                        for (var i = 4; i < 8; i++) {
                            var tmpObj2 = $(".ul-lay").find("li").eq(i);
                            if ($(tmpObj2).length > 0) {
                                $(tmpObj2).show();
                            }
                        }
                    } else {
                        for (var i = 0; i < 4; i++) {
                            var tmpObj3 = $(".ul-lay").find("li").eq(i);
                            if ($(tmpObj3).length > 0) {
                                $(tmpObj3).show();
                            }
                        }
                        for (var i = 4; i < 8; i++) {
                            var tmpObj4 = $(".ul-lay").find("li").eq(i);
                            if ($(tmpObj4).length > 0) {
                                $(tmpObj4).hide();
                            }
                        }
                    }
                }
            });
        },
        //载入图片查看器
        picLoad: function () {
            $("#mainPic,#showMoreImg").click(function () {
                if ($.cardetail_seo.navText.length > 0) {
                    var id = 0;
                    id = $("#mainPic").attr("data-code");
                    var obj = { csid: $.cardetail_seo.csId, carId: $.cardetail_seo.carId, Images: $.cardetail_seo.colorImg, navTxt: $.cardetail_seo.navText, Order: id };
                    $.jqmFrame.PicViewer(obj);
                    $(".jqmClose").click(function () {
                        $(".jqmWindow").remove();
                    });
                }
            });
        },
        //初始化礼品定时器
        initTimer: function () {
            $.getJSON("//ajax.huimaiche.com/gettime.ashx?callback=?", function (data) {
                $(".car-activities-countdown").attr("data-curtime", data).CountdownClock({
                    fmtFull: "限时抢 剩余<span>{d}</span>天<span>{h}</span>小时<span>{m}</span>分",
                    fmtShort: "限时抢 剩余<span>{h}</span>小时<span>{m}</span>分<span>{s}</span>秒",
                    callback: function (container) {
                        window.location.reload();
                    }
                });
            });
        },
        //绘制走势图
        drawChart: function () {
            try {
                checkShowCurve($.cardetail_seo.carId, $.cardetail_seo.cityId, function (candraw) {
                    if (candraw) {
                        if (typeof (drawPriceCurve) === "function") {
                            drawPriceCurve({
                                "carId": $.cardetail_seo.carId,
                                "cityId": $.cardetail_seo.cityId,
                                "useNation": $.cardetail_seo.usenation,
                                "w": 900,
                                "h": 300,
                                "holderId": "price-svg"
                            });
                            setTimeout(function () {
                                if ($("#price-svg rect").length > 1 || $("#price-svg .rvml").length > 1) {
                                    $("[name='ptrend']").show();
                                    if ($.cardetail_seo.usenation) {
                                        $("#price-svg").append("<div style='font-size:14px;color:#999;text-indent:62px'>（注：本统计来源于全国数据，仅供参考）</div>");
                                    }
                                } else {
                                    $("#price-svg").remove();
                                    $(".quick-nav-content ul li").eq(0).remove();
                                    $("#t1").remove();
                                }
                            }, 200);
                        }
                    } else {
                        $(".trend-price").remove();
                        $(".quick-nav-content ul li").eq(0).remove();
                        $("#t1").remove();
                    }
                });
            } catch (e) { }
        },
        //加载车型图片
        carImgLoader: {
            container: $("#div_imgbox"),
            imggroup: $("#t3"),
            cacheul: $("#cacheul"),
            showul: $("#showul"),
            init: function (options) {
                var _self = $.cardetail_seo.carImgLoader;
                $.extend(_self, options);
                _self.imggroup.on("click", "span", function () {
                    var _that = $(this);
                    _that.parent().children().removeClass("current");
                    _that.addClass("current");
                    _self.load(_that.attr("data-code"));
                });
                if (picScroll) {
                    picScroll.init();
                }
                var $tltSpan = _self.imggroup.find("span");
                if ($tltSpan.length > 0) {
                    $tltSpan.first().addClass("nobd current");
                    if (_self.initImgs) {
                        _self._refresh(_self.initImgs);
                    }
                } else {
                    _self.container.hide();
                    _self.imggroup.hide();
                }
            },
            load: function (gid) {
                $.ajax({
                    type: "GET",
                    url: "/ajax/carsource/CarImages.ashx",
                    data: { gid: gid, carid: $.cardetail_seo.carId },
                    success: function (data) {
                        $.cardetail_seo.carImgLoader._refresh(data);
                    }
                });
            },
            _refresh: function (data) {
                var _self = $.cardetail_seo.carImgLoader;
                if (data && data.Imgs && data.Imgs.length > 0) {
                    var lis = [];
                    var liTpl = " <li><a href=\"javascript:\"><img alt=\"{alt}\" data-url=\"{url}\" /><em></em></a></li>";
                    for (var i = 0; i < data.Imgs.length; i++) {
                        lis.push(liTpl.replace("{alt}", data.Imgs[i].ImgName).replace("{url}", data.Imgs[i].ImgUrl));
                    }
                    _self.cacheul.empty().html(lis.join(""));
                    _self.showul.empty();
                    picScroll.refresh();
                }
            }
        },
        //加载参数配置
        carParmLoader: {
            container: $("#tb_Params"),
            tbhead: $("#tb_Paramhead"),
            allcarid: $("#span_cshead").attr("data-code").split(","),
            hashcarids: {},
            dataCache: $("#paraCache"),
            btnprev: $("#btn_prev"),
            btnnext: $("#btn_next"),
            init: function (options) {
                var _self = $.cardetail_seo.carParmLoader;
                $.extend(_self, options);
                for (var i = 0, l = _self.allcarid.length; i < l; i++) {
                    _self.hashcarids[_self.allcarid[i]] = i;
                }
                _self.btnprev.click(_self.prevMove);
                _self.btnnext.click(_self.nextMove);
                //first load init
                var initIds = _self.allcarid.slice(0, 3);
                initIds.push($.cardetail_seo.carId);
                _self.load(initIds.join(","), function (data) {
                    var index = -1;
                    for (var j = 0; j < data.length; j++) {
                        index = data[j].CarID === $.cardetail_seo.carId ? -1 : _self.hashcarids[data[j].CarID];
                        _self._setTdText(index, _self._getParaObj(data[j]));
                    }
                });
            },
            load: function (carids, callback) {
                $.ajax({
                    type: "GET",
                    url: "/ajax/carsource/CarParams.ashx",
                    data: { carid: carids },
                    cache: false,
                    beforeSend: function () {
                        if (carids.indexOf(",") > -1)
                            return true;
                        else {
                            var cacheData = $.cardetail_seo.carParmLoader.dataCache.data("carid_" + carids);
                            if (cacheData) {
                                if (typeof callback === "function") {
                                    callback([cacheData]);
                                }
                                return false;
                            }
                        }
                    },
                    success: function (data) {
                        if (data && data.length > 0) {
                            for (var i = 0; i < data.length; i++) {
                                $.cardetail_seo.carParmLoader.dataCache.data("carid_" + data[i].CarID, data[i]);
                            }
                            if (typeof (callback) === "function") {
                                callback(data);
                            }
                        }
                    }
                });
            },
            _getParaObj: function (paraData) {
                var kvCollection = { carid: paraData.CarID, carname: paraData.CarName };
                for (var p in paraData.Params) {
                    if (paraData.Params.hasOwnProperty(p)) {
                        var k = paraData.Params[p];
                        kvCollection[k.Code] = (k.ParamValue ? k.ParamValue : "-");
                        if ($.trim(kvCollection[k.Code]) == "有" || $.trim(kvCollection[k.Code]) == "标配") {
                            kvCollection[k.Code] = "●";
                        }
                        if ($.trim(kvCollection[k.Code]) == "无" || $.trim(kvCollection[k.Code]) == "选配") {
                            kvCollection[k.Code] = "○";
                        }
                    }
                }
                $("tr[data-fmt]", $.cardetail_seo.carParmLoader.container).each(function () {
                    var key = $(this).attr("data-code");
                    kvCollection[key] = $(this).attr("data-fmt");
                    var ids = key.split(",");
                    for (var i = 0, l = ids.length; i < l; i++) {
                        if (typeof kvCollection[ids[i]] !== "undefined") {
                            kvCollection[key] = kvCollection[key].replace("{" + ids[i] + "}", kvCollection[ids[i]]);
                        } else {
                            kvCollection[key] = "--";
                        }
                    }
                });
                return kvCollection;
            },
            _setTdText: function (index, kv) {
                //head
                var _self = $.cardetail_seo.carParmLoader;
                var $th = $("th", _self.tbhead).eq(index + 2);
                var href = $("th", _self.tbhead).eq(index + 2).find("a").attr("href");
                $th.find("span").attr("data-code", kv.carid).html("<a href='" + href + "'>" + kv.carname + "</a>");
                //body
                $("tr[data-code]", _self.container).each(function () {
                    var text = "--";
                    if (kv[$(this).attr("data-code")]) {
                        text = kv[$(this).attr("data-code")];
                    }
                    $(this).find("td").eq(index + 2).find("span").html(text);
                });
            },
            prevMove: function () {
                //move right
                var _self = $.cardetail_seo.carParmLoader;
                var $ths = $("th", _self.tbhead);
                for (var i = $ths.length - 1, l = $ths.length - 2; i >= l; i--) {
                    _self._stepMove(i - 1, i);
                }
                //moved load prev car param
                var lastcarid = $ths.last().find("span").attr("data-code");
                if (_self.hashcarids[lastcarid] == 0) {
                    return;
                } else {
                    _self.load(_self.allcarid[_self.hashcarids[lastcarid] - 1], function (data) {
                        _self._setTdText(0, _self._getParaObj(data[0]));
                    });
                    if (_self.hashcarids[lastcarid] - 1 == 0) {
                        _self.btnprev.hide();
                    }
                    _self.btnnext.show();
                }
            },
            nextMove: function () {
                //move left
                var _self = $.cardetail_seo.carParmLoader;
                var $ths = $("th", _self.tbhead);
                for (var i = 2, l = $ths.length - 1; i < l; i++) {
                    _self._stepMove(i + 1, i);
                }
                //moved load next car param
                var lastcarid = $ths.last().find("span").attr("data-code");
                if (_self.hashcarids[lastcarid] == _self.allcarid.length - 1) {
                    return;
                } else {
                    _self.load(_self.allcarid[_self.hashcarids[lastcarid] + 1], function (data) {
                        _self._setTdText(2, _self._getParaObj(data[0]));
                    });
                    if (_self.hashcarids[lastcarid] + 1 == _self.allcarid.length - 1) {
                        _self.btnnext.hide();
                    }
                    _self.btnprev.show();
                }
            },
            _stepMove: function (sindex, tindex) {
                var _self = $.cardetail_seo.carParmLoader;
                //move head
                var $htds = $("th", _self.tbhead);
                $htds.eq(tindex).find("span").html($.trim($htds.eq(sindex).find("span").html()));
                $htds.eq(tindex).find("span").attr("data-code", $htds.eq(sindex).find("span").attr("data-code"));
                //move content
                $("tr[data-code]", _self.container).each(function () {
                    var tds = $(this).find("td");
                    tds.eq(tindex).find("span").html(tds.eq(sindex).find("span").html());
                });
            }
        },
        //加载其他车款
        carListLoader: {
            container: $("#div_carList"),
            loaded: false,
            init: function (options) {
                $.extend($.cardetail_seo.carListLoader, options);
                $.cardetail_seo.carListLoader.load();
                $.cardetail_seo.carListLoader.loaded = true;
            },
            load: function () {
                if (!$.cardetail_seo.carListLoader.loaded) {
                    if ($.cardetail_seo.carsource && $.cardetail_seo.carsource.length > 0) {
                        $(".choose-year a").click(function () {
                            $(this).parent().parent().find("a").removeClass("current");
                            $(this).addClass("current");
                            $("#div_blockcars table").hide();
                            var tb = $("#div_blockcars #t" + $(this).attr("data-year"));
                            tb.show();
                            if ($("tr", tb).not(":visible").length > 0) {
                                $("#cy-more-handle").show();
                            } else {
                                $("#cy-more-handle").hide();
                            }
                        });
                        $("#cy-more-handle").click(function () {
                            $("tbody,tr", "#div_carList").show();
                            $(this).hide();
                        });
                        $(".choose-year a.current").trigger("click");
                    } else {
                        $.cardetail_seo.carListLoader.container.hide();
                    }

                }
            }
        },
        //加载改车型下的正在进行的团购
        loadGroup: function () {
            $.ajax({
                type: "GET",
                url: "/Ajax/CarSource/GetGroupInfo.ashx",
                data: { csId: $.cardetail_seo.csId, cityId: $.cardetail_seo.cityId },
                success: function (data) {
                    if (data && data.length > 0) {
                        var html = "";
                        $.each(data, function () {
                            html += "<a target='_blank' href='//" + this.GroupPurchaseUrl + "/' class='car-list-ga'><span class='car-list-gas' style='height: 116px; width: 206px; margin-left: 0px; margin-top: 0px;'><img src='" + this.ImagesPath + "' alt='" + this.GroupPurchaseName + "'></span></a>";
                            html += "<div class='car-list-t'>" + this.GroupPurchaseName + "</div>";
                            html += "<div class='car-list-amount'><span>" + this.InitialCount + "</span>人已报名</div>";
                            html += "<a target='_blank' href='//" + this.GroupPurchaseUrl + "' class='car-list-btn common-link'>立即参加</a>";
                        });
                        $("#groupPanel").append(html);
                    } else {
                        $("#groupPanel").hide();
                    }
                    //加载当前城市正在进行的团购
                    $.cardetail_seo.loadCityGroup();
                }
            });
        },
        //当前城市正在进行的团购
        loadCityGroup: function () {
            $.ajax({
                type: "GET",
                url: "/Ajax/CarSource/GetGroupInfo.ashx",
                data: { cityId: $.cardetail_seo.cityId },
                success: function (data) {
                    if (data && data.length > 0) {
                        var html = "";
                        $.each(data, function () {
                            html += "<a target='_blank' href='//" + this.GroupPurchaseUrl + "/' class='car-list-local common-link'><span class='car-list-lot'>" + this.GroupPurchaseName.replace("【", "").replace("】", "") + "</span><span class='car-list-los common-color1'>看车时间" + this.LookCarDateTime + "</span></a>";
                        });
                        $("#LocalGroupPanel").append(html);
                    } else {
                        $("#LocalGroupPanel").parents(".car-list-all").hide();
                    }
                }
            });
        },
        //获取最新的导购新闻数据--
        loadLastNews: function () {
            $.ajax({
                type: "GET",
                url: "https://platform-api.huimaiche.com/cms/v1/news/GetSerialNewsByCategoryParentId",
                dataType: "jsonp",
                data: { pageIndex: 1, pageSize: 3, newsCategoryParentId: 595, serialId: $.cardetail_seo.csId },
                success: function (data) {
                    if (data != null) {
                        if (data && data.length > 0) {
                            var html = "";
                            for (var i = 0; i < data.length; i++) {
                                html += "<a target='_blank' href='" + data[i].Url + "' class='car-list-la common-link'><span class='car-list-lal'><span class='car-list-lai'><img src='" + data[i].PicCover.replace(".com", ".com/wapimg-120-120") + "' alt=''></span></span>";
                                html += "<span class='car-list-lar'><span class='title'>" + data[i].Title + "</span><span class='date'>" + data[i].PublishTime.substring(0,10) + "</span></span></a>";
                            }
                            $("#NewsPanel").append(html);
							var $lal = $('.car-list-lead .car-list-lal');
							$lal.each(function () {
								var $img = $(this).find('img');
								var img = new Image();
								img.src = $img.attr('src');
								if (img.complete) {
									var h = img.height;
									var w = img.width;
									if (w < h) {
										$img.css({ 'width': '100%', 'height': 'auto' });
									}
								} else {
									img.onload = function () {
										var h = img.height;
										var w = img.width;
										if (w < h) {
											$img.css({ 'width': '100%', 'height': 'auto' });
										}
									};
								}
							});
							var $carlist_la = $('.car-list-la');
							$carlist_la.hoverZoom({
								width: 60,
								height: 60
							});
							/* ie7左侧跳转图片地址控制 */
							var $iejump = function ($_this) {
								var $img = $_this.find('img');
								var $src = $_this.attr('href');
								$img.on('click', function () {
									window.open($src);
								});
							};
							var $mca = $('.car-list-la');
							if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/7./i) == "7.") {
								$mca.each(function () {
									$iejump($(this));
								});
							}
							/* ie7左侧跳转图片地址控制end */
                        } else {
                            $("#NewsPanel").parents(".car-list-all").hide();
                        }
                    }
                }
            });
        },
        //加载买车顾问信息
        loadCounselor: function () {
            $.ajax({
                type: "GET",
                cache: true,
                url: "/Ajax/CarSource/GetCounselorInfo.ashx?v=" + new Date().getDate(),
                data: { brandId: $.cardetail_seo.brandId, cityId: $.cardetail_seo.cityId },
                success: function (data) {
                    if (data && data.Id > 0) {
                        var html = "";
                        html += "<div class='adviser'>";
                        html += "<a href='//guwen.huimaiche.com/" + data.Id + "/' target='_blank'><img src='" + data.Images + "' alt='" + data.ShowName + "'></a>";
                        html += "<p>" + data.ShowName + "<br/>";
                        if (data.CommentCount > 0) {
                            html += "<span>" + data.CommentCount + "</span>条评论";
                        }
                        html += "</p>";
                        html += "<a href='//guwen.huimaiche.com/" + data.Id + "/' target='_blank'' class='adviser-btn'>找TA买车</a>";
                        html += "</div>";
                        $("#counselorPanel").append(html);
                    } else {
                        $("#counselorPanel").hide();
                    }
                }
            });
        },
        //加载当前品牌下的热门车型
        loadHotSerial: function () {
            $.ajax({
                type: "GET",
                url: "/Ajax/CarSource/RecomdCarNew.ashx",
                data: { cityId: $.cardetail_seo.cityId, csId: $.cardetail_seo.csId },
                success: function (data) {
                    if (data && data.length > 0 && $.cardetail_seo.isSerialPage) {
                        var html = "";
                        html += "<ul class='car-list-ul'>";
                        $.each(data, function () {
                            html += "<li>";
                            html += "<a href='//" + $.cardetail_seo.citySpell + ".huimaiche.com/" + this.allSpell + "/?page=sku_hot' target='_blank'>";
                            if (this.haveGroup > 0 || this.havePromise > 0 || this.haveFinance > 0) {
                                html += "<div class='car-label'>";
                                if (this.havegroup > 0) {
                                    html += "<i title='该车型有团购优惠活动' class='tuan'></i></i>";
                                }
                                if (this.havePromise > 0) {
                                    html += "<i class='cheng' title='该车型部分车款有最低承诺价'></i>";
                                }
                                if (this.haveFinance > 0) {
                                    html += "<i class='dai' title='由易鑫车贷提供支持，极速审批，方案灵活。'></i>";
                                }
                                html += "</div>";
                            }
                            html += "<img src='" + this.ImgUrl + "' alt='" + this.serialShowName + "' title='" + this.serialShowName + "'>";
                            html += "<p class='car-name'>" + this.serialShowName + "</p>";
                            if (this.avgsavemoney > 0) {
                                html += "<p class='car-discount'>平均节省<span class='num'>" + this.avgsavemoney.toFixed(2) + "</span><span class='metric'>万</span></p>";
                            }
                            html += "</a>";
                            html += "</li>";
                        });
                        html += "</ul>";
                        $("#hotSerialPanel").append(html);
                    } else {
                        $("#hotSerialPanel").hide();
                    }
                }
            });
        },
        //加载当前品牌下的热门车型
        loadHotSerialAll: function () {
            $.ajax({
                type: "GET",
                url: "/Ajax/CarSource/GetSerials.ashx",
                data: { brandId: $.cardetail_seo.mbId, cityId: $.cardetail_seo.cityId, csId: $.cardetail_seo.csId },
                success: function (data) {
                    if (data && data.Data.length > 0) {
                        var html = "";
                        html += "<ul class='car-list-ul'>";
                        $.each(data.Data, function () {
                            html += "<li>";
                            html += "<a href='//" + $.cardetail_seo.citySpell + ".huimaiche.com/" + this.allSpell + "/?page=sku_samebrand' target='_blank'>";
                            if (this.haveGroup > 0 || this.havePromise > 0 || this.haveFinance > 0) {
                                html += "<div class='car-label'>";
                                if (this.havegroup > 0) {
                                    html += "<i title='该车型有团购优惠活动' class='tuan'></i></i>";
                                }
                                if (this.havePromise > 0) {
                                    html += "<i class='cheng' title='该车型部分车款有最低承诺价'></i>";

                                }
                                if (this.haveFinance > 0) {
                                    html += "<i class='dai' title='由易鑫车贷提供支持，极速审批，方案灵活。'></i>";
                                }
                                html += "</div>";
                            }
                            html += "<img src='" + this.ImgUrl + "' alt='" + this.serialShowName + "' title='" + this.serialShowName + "'>";
                            html += "<p class='car-name'>" + this.serialShowName + "</p>";
                            if (this.avgsavemoney > 0) {
                                html += "<p class='car-discount'>平均节省<span class='num'>" + this.avgsavemoney.toFixed(2) + "</span><span class='metric'>万</span></p>";
                            }
                            html += "</a>";
                            html += "</li>";
                        });
                        html += "</ul>";
                        $("#serialPanel").find("h2").text(data.BrandName + "其他热门车型");
                        $("#serialPanel").append(html);
                    } else {
                        $("#serialPanel").hide();
                    }
                }
            });
        },
        oos: {
            btnoos: $("#btn_oos,#btn_oos1"),
            oPhone: null,
            oName: null,
            oossubmit: null,
            dealerNotify: 1,
            init: function (options) {
                var _self = $.cardetail_seo.oos;
                $.extend(_self, options);
                hmc_global.events.logincb = _self._logincb;
                hmc_global.events.logoutcb = _self._logoutcb;
                if ($.cardetail_seo.logined) {
                    _self.btnoos.click(_self.submit);
                } else {
                    _self.btnoos.click(_self._noLoginSubmit);
                }
                if (!_self.dealerNotify) {
                    _self.callback();
                }
            },
            _logincb: function () {
                $.cardetail_seo.logined = true;
                var _self = $.cardetail_seo.oos;
                _self.btnoos.unbind("click").click(_self.submit);
            },
            _logoutcb: function () {
                $.cardetail_seo.logined = false;
                var _self = $.cardetail_seo.oos;
                _self.btnoos.unbind("click").click(_self._noLoginSubmit);
            },
            _noLoginSubmit: function () {
                $.jqmFrame.oosReg();
                var _self = $.cardetail_seo.oos;
                _self.oPhone = $("#oosphone");
                _self.oName = $("#oosname");
                _self.oossubmit = $("#oossubmit");
                _self.oossubmit.unbind("click").click(_self.submit);
                _self.oPhone.bind("blur", function () {
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
                }).bind("keydown", function () {
                    $(this).trigger("focus");
                }).val(_self.oPhone.attr("data-tip"));
            },
            validateFn: {
                checkPhone: function () {
                    return $.validator.validate("phone", { el: $.cardetail_seo.oos.oPhone, allowEmpty: false }).IsPass();
                },
                checkName: function () {
                    return $.validator.validate("name", { el: $.cardetail_seo.oos.oName, allowEmpty: false }).IsPass();
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
            },
            submit: function () {
                if (!$.cardetail_seo.logined && !$.cardetail_seo.oos.validate()) {
                    return;
                }
                var formData = {
                    carid: $.cardetail_seo.carId,
                    ccode: $.cardetail_seo.cityId
                };
                if ($.cardetail_seo.oos.oPhone) {
                    formData.tel = $.trim($.cardetail_seo.oos.oPhone.val());
                }
                if ($.cardetail_seo.oos.oName) {
                    formData.name = $.trim($.cardetail_seo.oos.oName.val());
                }
                $.ajax({
                    type: "POST",
                    url: "/Ajax/OOS.ashx",
                    data: formData,
                    success: function (data) {
                        if (data) {
                            $.cardetail_seo.oos.submitSuc(data);
                        }
                    },
                    error: function (err) { }
                });
            },
            submitSuc: function (data) {
                if (data.IsSuccess) {
                    if ($.jqmFrame.oFrame && $.jqmFrame.oFrame.is(":visible")) {
                        $.jqmFrame.oosRegSucess(true);
                        $("#oosRegSuccessLink").attr("href", "//" + $.cardetail_seo.citySpell + ".huimaiche.com/search");
                    } else {
                        $.jqmFrame.oosRegSucess(false);
                        $("#oosRegSuccessLink").attr("href", "//" + $.cardetail_seo.citySpell + ".huimaiche.com/search");
                    }
                    if (typeof ($.cardetail_seo.oos.callback) === "function") {
                        $.cardetail_seo.oos.callback(data);
                    }
                } else {
                    $.validator.validate({ el: $("#oosname"), customCheck: function () {
                        var errObj = $("<div  class=\"error\">" + data.Msg + "</div>");
                        $("#oosname").parent().parent().append(errObj);
                    }
                    });
                }
            }
        },
        //获取猜你喜欢数据
        getFavCarList: function () {
            $.ajax({
                type: "GET",
                url: "/Ajax/CarSource/GetFavorite.ashx",
                data: { cityId: $.cardetail_seo.cityId },
                success: function (data) {
                    if (data && data.length > 0) {
                        var html = "";
                        var serialid = "";
                        $.each(data, function () {
                            html += "<a target='_blank' href='" + "/" + this.Spell + "' class='car-list-a'><span class='car-list-img'><span class='car-list-i' style='overflow: hidden; height: 100px; width: 150px; margin-left: 0px; margin-top: 0px;'><img src='" + ((this.ImageUrl == "") ? "//img.huimaiche.cn/uimg/www/v20160927/images/zw300x200.png" : this.ImageUrl) + "' alt=''></span></span>";
                            html += "<span class='car-list-title'>" + this.SerialName + "</span>";
                            html += "<span class='car-list-price'>" + this.PriceRange + "</span>";
                            if (this.BuyCount > 0) {
                                html += "<span class='car-list-amount'><span>" + this.BuyCount + "</span>人正在购买</span></a>";
                            }
                            serialid += this.SerialId + ",";
                        });
                        $("#favSerialPanel").append(html);
                        $.cardetail_seo.getBothPriceCar(serialid);
                    } else {
                        $("#favSerialPanel").parents(".car-list-all").hide();
                    }
                }
            });
        },
        //记录用户浏览车型
        _recordSerial: function () {
            var favcsids = hmc_global.utils.readcookie("hmc_favcs");
            var str_new = "" + $.cardetail_seo.csId;
            if (favcsids) {
                var arr_csids = favcsids.split(",");
                for (var i = 0; i < arr_csids.length; i++) {
                    if (arr_csids[i] != $.cardetail_seo.csId) {
                        str_new += "," + arr_csids[i];
                    }
                    if (str_new.split(",").length >= 3) {
                        break;
                    }
                }
            }
            hmc_global.utils.setCookie("hmc_favcs", str_new, 60 * 60 * 24 * 30);
        },
        //记录用户浏览车款
        _recordCar: function () {
            var favcsids = hmc_global.utils.readcookie("hmc_favcar");
            var str_new = "" + $.cardetail_seo.carId;
            if (favcsids) {
                var arr_csids = favcsids.split(",");
                for (var i = 0; i < arr_csids.length; i++) {
                    if (arr_csids[i] != $.cardetail_seo.carId) {
                        str_new += "," + arr_csids[i];
                    }
                    if (str_new.split(",").length >= 5) {
                        break;
                    }
                }
            }
            hmc_global.utils.setCookie("hmc_favcar", str_new, 60 * 60 * 24 * 30);
        },
        //获取购车分享
        getShare: function () {
            $.ajax({
                type: "GET",
                cache: true,
                url: "/Ajax/ShareCar.ashx?v=" + new Date().getDate(),
                data: { csid: $.cardetail_seo.csId, ccode: $.cardetail_seo.cityId },
                success: function (data) {
                    if (data && data.length > 0) {
                        var html = "";
                        $.each(data, function () {
                            html += "<li><div class='share-left'><a target='_blank' href='//hd.huimaiche.com/share/detail/" + this.ID + "/'>";
                            html += "<img src='" + this.Img.replace("/sense", "/wapimg-" + $.cardetail_seo.imgWidth + "-" + $.cardetail_seo.imgHeight + "/sense") + "' alt='" + this.CarName + "'></a></div>";
                            html += "<div class='share-right'><h3><a target='_blank' href='//hd.huimaiche.com/share/detail/" + this.ID + "/'>" + this.Title + "</a></h3>";
                            html += "<address><span>车主：" + this.Name + "</span><span>车款：" + this.CarFullName + "</span></address><p>" + this.Content + "</p>";
                            if (this.SaveMoney > 0) {
                                html += "<p class='save-money-orange'>省<em>" + this.SaveMoney.toFixed(2) + "</em>万</p>";
                            }
                            html += "</div></li>";
                        });
                        $(".share-list").append(html);
                    } else {
                        $("#t6").remove();
                        $(".share-list").remove();
                        $("#shareMore").remove();
                        $(".quick-nav-content li[data-code=6]").remove();
                    }
                }
            });
        },
        //获取最热车款
        getHotCar: function (caryear) {
            var obj = $(".newcar-detail1-ctright[data-year=" + caryear + "]").find("a[class!=newcar-detail1-ctmore]");
            if (obj.length > 0) {
                var tmpArr = new Array();
                var tmpArr2 = new Array();
                $.each(obj, function () {
                    var val = $(this).attr("data-pv");
                    var val2 = $(this).attr("data-pro");
                    var carid = $(this).attr("data-code");
                    tmpArr.push({ cid: carid, pv: val, pro: val2 });
                });
                $.each(tmpArr, function () {
                    if (this.pro == 1) {
                        tmpArr2.push(this);
                    }
                });
                var list = tmpArr;
                if (tmpArr2.length > 0) {
                    list = tmpArr2;
                }
                var result = $.cardetail_seo.sortList(list);
                return result[0].cid;
            }
            return 0;
        },
        //排序列表
        sortList: function (arr) {
            var i = arr.length, j;
            var tempExchangVal;
            while (i > 0) {
                for (j = 0; j < i - 1; j++) {
                    if (parseInt(arr[j].pv) < parseInt(arr[j + 1].pv)) {
                        tempExchangVal = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = tempExchangVal;
                    }
                }
                i--;
            }
            return arr;
        },
        //获取同价位车款
        getBothPriceCar: function (ids) {
            $.ajax({
                type: "GET",
                url: "/Ajax/GetBothPriceCar.ashx",
                dataType: "json",
                data: { carId: $.cardetail_seo.carId, cityId: $.cardetail_seo.cityId, serialIdList: ids },
                success: function (data) {
                    if (data && data.length > 0) {
                        var html = "";
                        $.each(data, function () {
                            html += "<a target='_blank' href='" + "/" + this.Spell + "' class='car-list-a'><span class='car-list-img'><span class='car-list-i' style='overflow: hidden; height: 100px; width: 150px; margin-left: 0px; margin-top: 0px;'><img src='" + ((this.ImageUrl == "") ? "//img.huimaiche.cn/uimg/www/v20160927/images/zw300x200.png" : this.ImageUrl) + "' alt=''></span></span>";
                            html += "<span class='car-list-title'>" + this.SerialName + "</span>";
                            html += "<span class='car-list-price'>指导价<span>" + this.PriceRange + "</span></span>";
                            if (this.BuyCount > 0) {
                                html += "<span class='car-list-amount'>" + this.BuyCount + "人正在购买</span>";
                            }
                            html += "</a>";
                        });
                        $("#bothCarPanel").append(html);
                    } else {
                        $("#bothCarPanel").parents(".car-list-all").hide();
                    }
                    var $ahover = $('.car-list-a');
                    var $ga = $('.car-list-ga');
                    var $carlist_la = $('.car-list-la');
                    $ahover.hoverZoom({
                        width: 150,
                        height: 100
                    });
                    $ga.hoverZoom({
                        width: 206,
                        height: 116
                    });
                    $carlist_la.hoverZoom({
                        width: 60,
                        height: 60
                    });
                    /* ie7左侧跳转图片地址控制 */
                    var $iejump = function ($_this) {
                        var $img = $_this.find('img');
                        var $src = $_this.attr('href');
                        $img.on('click', function () {
                            window.open($src);
                        });
                    };
                    var $mca = $('.car-list-ga,.car-list-a,.car-list-la');
                    if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/7./i) == "7.") {
                        $mca.each(function () {
                            $iejump($(this));
                        });
                    }
                    /* ie7左侧跳转图片地址控制end */
                }
            });
        }
    });
})(jQuery);    