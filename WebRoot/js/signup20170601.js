$(function () {




    initStatus();
    getActivityCars();
    getAreas();
    loadAdvantages();
    loadTpContent();
    getSignupList();

    $("#cmbArea").on("click", "a", choseAreaCity);
    //$("#cmbCmd").on("click", "a", choseCmd);
    $("#reason").hover(function () {
        $("#reason_box").show();
    },
    function () {
        $("#reason_box").hide();
    });



    $(".simulate_select").click(function () {
        var $this = $(this);
        $this.siblings("div.simulate_option").slideDown();
        var p = $this.parents(".form_box").removeClass("error");
        p.find(".hint_s").hide();
    });

    $(".form_box ").hover(function () {

    }, function () {
        var $this = $(this);
        $this.find(".simulate_option").slideUp();
    });
    $("#txtSignupName,#txtSignupPhone").focus(function () {
        var self = $(this);
        var val = self.val();
        self.siblings("p").hide();

        var p = self.parents(".form_box").removeClass("error");
        p.find(".hint_s").hide();
    });
    $("#txtSignupName,#txtSignupPhone").blur(function () {

        var self = $(this);
        var val = self.val();
        var holder = self.attr("holder");

        if (val == "") {
            self.parents(".form_box").removeClass("error").removeClass("focus");
            //self.removeClass("focus_color");
            self.siblings("p").show();
        } else {
            self.parents(".form_box").addClass("focus").removeClass("error");
            self.parent().siblings(".hint_s").hide();
            self.addClass("focus_color");
        }
    });




    $('.confirm_btn').click(function () {
        $("#txtSignupName").val("");
        $("#txtSignupPhone").val("");

        $(this).parent().fadeOut(200);
        $('.mask').fadeOut(200);

    });
});
////////////////

function loadAdvantages() {
    $.ajax({
        url: '/Signup/Ajax/SignupAjax.ashx/GetAdvantages',
        type: "post",
        data: { tpId: tpId },
        dataType: "json",
        success: function (data) {
            var divAdvantages = $("#divAdvantages");
            $.each(data, function (idx, obj) {
                var p = $("<p />").append($("<i class='style_2' />")).append(obj);
                divAdvantages.append(p)
            })
        }
    });
}

function loadTpContent() {
    $.ajax({ url: "/Signup/Ajax/SignupAjax.ashx/GetProjectContent",
        data: { tpId: tpId },
        type: "get",
        dataType: "text",
        success: function (data) {

            var html = HtmlUtil.htmlDecodeByRegExp(data);
            $("#divContent").html(html);
        }
    })
}

function getSignupList() {
    $.ajax({
        url: "/Ajax/CommonAjax.ashx/GetTopSignupCacheModel50",
        type: "get",
        dataType: "json",
        success: function (data) {
            if (data == null) return;
            var tb = $("#tbSignup");

            $.each(data, function (index, obj) {
                var tr = $("<tr />");
                var td1 = $("<td />").attr("width", 64).text(obj.SignupUserName);
                var td2 = $("<td />").attr("width", 94).text(obj.SignupPhone);
                var td3 = $("<td />").addClass("last_td").text(obj.CmdName);
                tb.append(tr.append(td1).append(td2).append(td3));
            });
            new Marquee("price_scroll", 0, 10, 238, 380, 20, 3000, 300)
        }
    });
}


function initStatus() {

    if (signupStatus == 1) {
        $("#btnSignup").text("立即报名").click(signup);
        timedown();
        $(".form_con p").click(function () {
            var $this = $(this);
            $this.hide();
            $this.siblings("input").focus();
            $this.parents(".form_box ").addClass("focus");
        });
    } else {
        $("#btnSignup").text("活动未开始").addClass("over_btn").click(function () {
            if ($fixedBox.hasClass("fixed")) {
                $("body,html").animate({ scrollTop: 0 }, 500);
                return;
            }
        });
        $("#txtSignupName,#txtSignupPhone").attr("readonly", "readonly");
        $("#divTime2").show();
        $("#divTime1").hide();
        $("#lblSignupStartTime").text(startTime);
    }
}

function timedown() {
    var countBox = $("#countdownBox");
    window.setInterval(function () {
        serverTime++;
        var result = getTime(endTime);
        //                var html = "剩余：";
        //                if (signupStatus == 0) {
        //                    html = "距离报名开始时间:";
        //                }
        var html = ""
        if (result.day > 0) {
            html += '<b>' + result.day + '</b>天';
        }
        if (result.hour > 0) {
            html += '<b>' + result.hour + '</b>小时';
        }
        if (result.minute > 0) {
            html += '<b>' + result.minute + '</b>分钟';
        }
        if (result.second > 0) {
            html += '<b>' + result.second + '</b>秒';
        }
        countBox.html(html);
        //剩余：<span class="day">00</span>天<span class="hour">00</span>小时<span class="minute">00</span>分钟<span class="second">00</span>秒
    }, 1000);
}

function getTime(intTime) {
    var totalsecond = (intTime - serverTime);
    if (totalsecond <= 0) {
        return { isOver: true };
    }
    var getFormatInt = function (d, l) {
        l = l == undefined ? 2 : l;
        var r = d.toString();
        if (r.length < l) {
            var sl = l - r.length;
            for (var i = 0; i < sl; i++) {
                r = "0" + r;
            }
        }
        return r;
    }
    return { isOver: false,
        day: getFormatInt(Math.floor((totalsecond / 3600) / 24)),
        hour: getFormatInt(Math.floor((totalsecond / 3600) % 24)),
        minute: getFormatInt(Math.floor((totalsecond / 60) % 60)),
        second: getFormatInt(Math.floor(totalsecond % 60))
    };

}



function getActivityCars() {

    if (hasCar == false) {
        $("#formbox2").remove();
        return;
    }
    $.ajax({
        url: "/Signup/Ajax/SignupAjax.ashx/GetActivityCar",
        type: "get",
        data: { taId: taId },
        dataType: "json",
        success: function (data) {
            var cmb = $("#cmbCmd");
            $.each(data, function (index, obj) {

                cmb.append($("<a />").text(obj.CmdName).attr("cmdId", obj.CmdId)
                .attr("cmkId", obj.CmkId).attr("cmkName", obj.CmkName).attr("href", "/Activity/" + taId + "/" + obj.CmdId+queryString));
            });
            $("span[lblCmk]").append($("<a />").text(data[0].CmkName).attr("href", "/Activity/" + taId+queryString));
            $("span[lblCmk1]").text(data[0].CmkName);
            var currentCmd = cmb.find("a[cmdId=" + signInfo.cmdId + "]");
            if (currentCmd.length > 0) {
                choseCmd.call(currentCmd);
            }
        }
    });



}

function getAreas() {
    var orderArea = BitAutoBigAreas.orderArea;
    $.ajax({
        url: "/Signup/Ajax/SignupAjax.ashx/GetProjectActivityAreaInfoByTpId_New",
        type: "get",
        data: { tpId: tpId },
        dataType: "json",
        success: function (data) {
            var cmb = $("#cmbArea>dl");
            var areaList = getCityListData(data);
            $.each(orderArea, function (i, a) {
                if (areaList[a] == undefined) return;
                var dt = $("<dt />").text(a);
                var dd = $("<dd />");
                $.each(areaList[a], function (index, obj) {
                    var a = $("<a />").text(obj.CityShortName)
                    .attr("cityId", obj.CityId)
                    .attr("cityName", obj.CityName)
                    .attr("proId", obj.ProId)
                    .attr("proName", obj.ProName)
                    .attr("taId", obj.P_ID);
                    dd.append(a);
                });
                cmb.append(dt).append(dd);

            })
            var currentC = cmb.find("a[cityId=" + signInfo.cityId + "]");
            if (currentC.length > 0) {
                choseAreaCity.call(currentC);
            }
        }
    });

}



function choseAreaCity() {
    var self = $(this);
    var divArea = $("#divArea");
    if (self.attr("cityId") == signInfo.cityId) {
        divArea.html(self.text() + "<i></i>")
        .attr("cityId", self.attr("cityId"))
        .attr("proId", self.attr("proId"))
        .attr("proName", self.attr("proName"));
        self.parents(".form_box").addClass("focus");
    } else {
        var _taId = self.attr("taid");
        var path = "/Activity/" + _taId;

        //        var cityId = self.attr("cityId")
        //        var url = $.url()
        //        var path = url.attr("path") + "?";
        //        var params = url.param();

        //        setQueryString(params, { TaId: _taId, cityId: cityId });

        //        for (var key in params) {
        //            path += key + "=" + params[key] + "&"
        //        }
        window.location = path;


    }
    $("#cmbArea").slideUp();

}



function getCityListData(area) {
    var result = {};
    var bigAreas = BitAutoBigAreas.bigArea;
    $.each(area, function (index, obj) {
        //插一步

        if (obj.CityId == signInfo.cityId) {
            $("#lblCity").text(obj.CityShortName).parent().attr("href", "/" + BitautoCityPinyin[signInfo.cityId]["pinyin"]);
        }
        $.each(bigAreas, function (i, a) {
            if (obj.ProId == a.proId) {
                if (result[a.bigAreaName] == undefined) {
                    result[a.bigAreaName] = [];
                }
                result[a.bigAreaName].push(obj);
                return false;
            }
        })
    });
    return result;
}

function choseCmd() {

    var self = $(this);
    var divCmd = $("#divCmd");
    //if (self.attr("cmdId") == signInfo.cmdId) {
    var cmdName = self.text();
    divCmd.html(cmdName + "<i></i>")
        .attr("cmdId", self.attr("cmdId"))
        .attr("cmkId", self.attr("cmkId"))
        .attr("cmkName", self.attr("cmkName"));
    $("#lblCmd").text(" > " + cmdName);
    $("#lblCmd1").text(" " + cmdName);
    self.parents(".form_box").addClass("focus");
    $("#cmbCmd").slideUp();
    //    } else {
    //        var cmdId = self.attr("cmdId");
    //        var url = $.url()
    //        var path = url.attr("path") + "?";
    //        var params = url.param();

    //        setQueryString(params, { cmdId: cmdId });

    //        for (var key in params) {
    //            path += key + "=" + params[key] + "&"
    //        }
    //        window.location = path;
    //    }


}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function setQueryString(oldParams, newParams) {
    for (var nKey in newParams) {
        var has = false;
        for (var oKey in oldParams) {
            if (oKey.toLowerCase() == nKey.toLowerCase()) {
                oldParams[oKey] = newParams[nKey];
                has = true;
                break;
            }
        }
        if (!has) {
            oldParams[nKey] = newParams[nKey]
        }
    }
    return oldParams;
}
///




///
function signup() {

    if ($fixedBox.hasClass("fixed")) {
        $("body,html").animate({ scrollTop: 0 }, 500);
        return;
    }
    if (!dataVerify()) {
        return;
    }
    var data = {
        TaId: taId,
        SignupUserName: $.trim($('#txtSignupName').val()),
        SignupPhone: $.trim($('#txtSignupPhone').val()),
        CmdId: $('#divCmd').attr("cmdId"),

        taName: taName,
        offlineTime: offlineTime,
        offlineAddress: offlineAddress,

        cityName: $("#lblCity").text(),
        cmkName: $("span[lblcmk1]").text(),
        cmdName: $('#divCmd').text(),
        tracker:tracker
    };

    $.ajax({
        url: "/Signup/Ajax/SignupAjax.ashx/Signup",
        type: "post",
        data: data,
        dataType: "json",
        success: function (data) {

            if (data.code == 1 || data.code == -1) {
                $("#tip_ok").show();
                $('.mask').show();
                $("#lblCount").text(1 + parseInt($("#lblCount").text()));
            } else if (data.code == 10) {
                $("#tip_exists").show();
                //$("#tip_ok").show();
                $('.mask').show();
            }
        }
    })

}


/**
* 表单验证
* @returns {boolean}
*/
function dataVerify() {
    var result = true;
    var signupName = $.trim($('#txtSignupName').val());
    var signupPhone = $.trim($('#txtSignupPhone').val());

    var chexing = $.trim($('#divCmd').attr("cmdId"));
    var cityId = $.trim($('#divArea').attr("cityId"));
    var pro = $.trim($('#divArea').attr("proId"));
    var brand = $('#divCmd').attr("cmdId");

    if (cityId == "" || cityId < 0) {

        $("#formbox1").addClass("error");
        $("#city_empty").show();
        result = false;
    }
    if (hasCar) {
        if (chexing == "" || chexing < 0) {

            $("#formbox2").addClass("error");
            $("#cmd_empty").show();
            result = false;
        }
    }

    if (signupName == "") {
        //alert('请填写姓名');
        $("#formbox3").addClass("error");
        $("#name_empty").show();
        result = false;
    }


    if (signupName != "" && !isZhoneWenOrYingWen(signupName)) {

        $("#formbox3").addClass("error");
        $("#name_wrong").show();
        result = false;
    }
    if (signupPhone == "") {
        //alert('请填写手机号');
        $("#formbox4").addClass("error");
        $("#phone_empty").show();
        result = false;
    }
    if (signupPhone != "" && !isMobile(signupPhone)) {
        //alert('请填写正确的手机号，如:13012345678');
        $("#formbox4").addClass("error");
        $("#phone_wrong").show();
        result = false;
    }




    return result;
}