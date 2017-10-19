if (typeof jQuery !== "undefined") {
    (function ($) {
        var loadscripts = function (filetype, cb) {
            $.getScript("https://img.huimaiche.cn/uimg/www/v20160505/js/loader.js", function () {
                //window.hmc_fileLoader.load(filetype);
                window.hmc_fileLoader.load();
                if (typeof (cb) !== "undefined") {
                    cb();
                }
            });
        };
        $.getScript("https://ajax.huimaiche.com/Navagation/NavagationContext4Custom.ashx?size=990&layer=2&sc=0&sbrand=0&slogin=1&toptype=TopFlow.htm&bottomtype=Bottom_NoIssue.htm&url=" + encodeURIComponent(window.location.href), function () {
            loadscripts("css", function () {
                $.ajaxSetup({ cache: false });
                var header = $("#hmc_top"), footer = $("#hmc_footer");
                var loadheader = function () {
                    header.replaceWith(hmc_topfoot.topfile);
                };

                if (hmc_topfoot) {
                    if (header != undefined) {
                        if (header.length > 0) {
                            header.replaceWith(hmc_topfoot.topfile);
                            loadheader();
                            //loadscripts();
                        } else {
                            var timerTop = setInterval(function () {
                                header = $("#hmc_top");
                                if (header.length > 0) {
                                    header.replaceWith(hmc_topfoot.topfile);
                                    loadheader();
                                    //loadscripts();
                                    clearInterval(timerTop);
                                }
                            }, 100);
                        }
                    }
                    if (footer != undefined) {
                        if (footer.length > 0) {
                            footer.replaceWith(hmc_topfoot.btmfile);
                        } else {
                            var timerBot = setInterval(function () {
                                footer = $("#hmc_footer");
                                if (footer.length > 0) {
                                    footer.replaceWith(hmc_topfoot.btmfile);
                                    clearInterval(timerBot);
                                }
                            }, 100);
                        }
                    }
                    if (hmc_topfoot.showbrand) {
			if($(".input-box")!=undefined) {$(".input-box").show();}
                    } else {
			if($(".input-box")!=undefined) {$(".input-box").hide();}
                    }
                    if ($("#hmc_top_leftnavagation") != undefined && $("#hmc_top_leftnavagation").length > 0) {
                        if (hmc_topfoot.showbrand) {
                            $("#hmc_top_leftnavagation").show();
                        } else {
                            $("#hmc_top_cardropbox").hover(function () {
                                $("#hmc_top_leftnavagation").toggle();
                            }, function () { $("#hmc_top_leftnavagation").toggle(); });
                        }
                    }
                }
            });
        });
    })(jQuery);
}