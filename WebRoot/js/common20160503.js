$(document).ready(function (e) {
    /*轮播*/
    var serveTimer = setTimeout(function () {
        var nIn = $(".slider-menu-1 .current").index();
        var len = $(".slider_img a").length;
        if (nIn < len - 1) {
            nIn++;
        } else {
            nIn = 0;
        }
        $(".slider-menu-1 li").removeClass("current").eq(nIn).addClass("current");
        $(".slider_img a").eq(nIn).fadeIn().siblings().hide();
        serveTimer = setTimeout(arguments.callee, 5000);
    }, 5000);
    $(".prev1").click(function () {
        clearTimeout(serveTimer);
        var nIn = $(".slider-menu-1 .current").index();
        var len = $(".slider_img a").length;
        if (nIn < len && nIn > 0) {
            nIn--;
        } else {
            nIn = len - 1;
        }


        $(".slider-menu-1 li").removeClass("current").eq(nIn).addClass("current");
        $(".slider_img a").eq(nIn).fadeIn().siblings().hide();
    });

    $(".next1").click(function () {
        clearTimeout(serveTimer);
        var nIn = $(".slider-menu-1 .current").index();
        var len = $(".slider_img a").length;
        if (nIn < len - 1) {
            nIn++;
        } else {
            nIn = 0;
        }
        $(".slider-menu-1 li").removeClass("current").eq(nIn).addClass("current");
        $(".slider_img a").eq(nIn).fadeIn().siblings().hide();
    });
    $(".slider-menu-1 li").click(function () {
        clearTimeout(serveTimer);
        var nIn = $(this).index();
        $(this).addClass("current").siblings().removeClass("current");
        $(".slider_img a").eq(nIn).fadeIn().siblings().hide();
    });
    $(".slider_box").hover(function () {
        $(this).find("span").show();
    }, function () {
        $(this).find("span").hide();
    });
    /*列表*/
    $(".list_box").hover(function () {
        $(this).addClass("cur");
    }, function () {
        $(this).removeClass("cur");
    });

    /*模拟表单*/
    $(".simulate_select").click(function () {
        var $this = $(this);
        var cmb=$this.siblings("div.simulate_option");
        if (cmb.children().length >0) {
            cmb.slideDown();
        }
    });
    //    $(".simulate_option a").click(function () {
    //        var $this = $(this);
    //        var $this_txt = $this.text();
    //        $this.parent().siblings("div.simulate_select").html($this_txt + "<i></i>").addClass("cur");
    //        $this.parent().hide();
    //    });
    //    $(".form_box ").hover(function () {

    //    }, function () {
    //        var $this = $(this);
    //        $this.find(".simulate_option").slideUp();
    //    });

    /*input*/
    $(".form_box input").focus(function () {
        $(this).siblings("p").hide();
    });
    $(".form_box p").click(function () {
        $(this).hide();
    });
    $(".form_box input").blur(function () {
        var $this = $(this);
        $this.siblings("p").show();
        if (!$this.val() == "") {
            $this.siblings("p").hide();
        };
    });
});