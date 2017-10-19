//Í¼Æ¬ÂÖ²¥
var picScroll = {
    pic_pageSize: 18,
    pic_current: 1,
    pic_page: 1,
    refresh: function () {
        this.pic_current = 1;
        this.pic_page = Math.ceil($('#cacheul li').length / this.pic_pageSize);
        $("#cacheul li").click(function () {
            $(this).parent().children().removeClass("current");
            $(this).addClass("current");
            $(".chex_bigpic img").attr("src", $(this).find("img").attr("data-url").replace("{0}", "3")).attr("alt", $(this).find("img").attr("alt"));
        });
        $("#cacheul li").each(function (i) {
            $(this).attr("data-page", Math.floor(i / picScroll.pic_pageSize) + 1);
        });
        this.seekTo(this.pic_current);
        $("#showul li").eq(0).click();

        if ($("#cacheul li").length < this.pic_pageSize) {
            $(".minpic_top").first().addClass("min_nopic");
        }
        if ($("#cacheul li").length == 0) {
            $(".minpic_down").addClass("min_nopic");
        }
    },
    init: function () {
        $('#arrowDown').click(function () {
            picScroll.goNextPage();
        });
        $("#arrowUp").click(function () {
            picScroll.goPrePage();
        });
        $('.chex_rightpic').click(function () {
            picScroll.goNextPic();
            picScroll.showArrow();
        });
        $(".chex_leftpic").click(function () {
            picScroll.goPrePic();
            picScroll.showArrow();
        });
        $(".chex_bigpic").hover(function () {
            picScroll.showArrow();
        }, function () {
            $(".chex_bigpic div").hide();
        });
        this.refresh();
    },
    seekTo: function (i) {
        $('#cacheul').append($('#showul li'));
        var imgs = $("#cacheul li[data-page=" + i + "]");
        imgs.each(function () {
            var img = $(this).find("img");
            img.attr("src", img.attr("data-url").replace("{0}", "2"));
        });
        $('#showul').append(imgs);
        if (this.pic_page == 1) {
            $(".minpic_top").addClass("min_nopic");
        }
        else if (i == 1) {
            $(".chex_minpic div").removeClass("min_nopic").eq(0).addClass("min_nopic");
        }
        else if (i == this.pic_page) {
            $(".chex_minpic div").removeClass("min_nopic").eq(1).addClass("min_nopic");
        } else {
            $(".chex_minpic div").removeClass("min_nopic");
        }
    },
    goNextPage: function () {
        if (picScroll.pic_page == picScroll.pic_current) { return; }
        picScroll.pic_current++;
        $('#showul li').removeClass("current");
        picScroll.seekTo(picScroll.pic_current);
        $('#showul li').first().addClass("current").click();
    },
    goPrePage: function () {
        if (picScroll.pic_current == 1) { return; }
        picScroll.pic_current--;
        $('#showul li').removeClass("current");
        picScroll.seekTo(picScroll.pic_current);
        $('#showul li').first().addClass("current").click();
    },
    goNextPic: function () {
        var li = $("#showul li").eq($("#showul .current").index() + 1);
        if (li.length > 0) {
            li.click();
        } else {
            picScroll.goNextPage();
            $("#showul li").eq(0).click();
        }
    },
    goPrePic: function () {
        var index = $("#showul .current").index();
        if (index > 0) {
            $("#showul li").eq(index - 1).click();
        } else {
            picScroll.goPrePage();
            $("#showul li").eq($("#showul li").length - 1).click();
        }
    },
    showArrow: function () {
        var index = $("#showul .current").index();
        if (index == 0 && picScroll.pic_current == 1) {
            $(".chex_leftpic").hide();
            $('.chex_rightpic').show();
        }
        else if (picScroll.pic_current == picScroll.pic_page && index == $("#showul li").length - 1) {
            $(".chex_leftpic").show();
            $('.chex_rightpic').hide();
        } else {
            $(".chex_leftpic").show();
            $('.chex_rightpic').show();
        }
    }
};


 
 
 
 
 

	 
 