var bigArea = BitAutoBigAreas.bigArea;
var areaCityOrder = { '华北': [{ CityId: 201, CityName: '北京' }, { CityId: 2601, CityName: '天津'}],
    '华东': [{ CityId: 2401, CityName: '上海'}],
    '西南': [{ CityId: 3101, CityName: '重庆'}]
};

$(function () {
    init();
    $("#cmbCarMake").on("click", "a", ChoseCarMake);
    $("#cmbCarModel").on("click", "a", ChoseCarModel);
    $("#btnSearch").click(search);
    loadHotCar();

    loadSPro();
    loadSCmb();
    $("#txtUserName").blur(function () { checkUserName(false); });
    $("#txtUserPhone").blur(function () { checkUserPhone(false); });
    $("#cmbSCmb").on("click", "a", choseSCmb);
    $("#cmbSCmd").on("click", "a", choseSCmd);
    $("#cmbSPro").on("click", "a", choseSPro);
    $("#cmbSCity").on("click", "a", choseSCity);
    $("#btnSignup").click(signup);
    $('a.confirm_btn').click(function () {
        $("#txtUserName").val("");
        $("#txtUserPhone").val("");
        window.location.reload();
    });

//    $('#tip_exists a.confirm_btn').click(function () {
//        $("#tip_exists").fadeOut(200)
//        $('.mask').fadeOut(200);
//    });

    var countList = $(".list_count");
    setInterval(function () { countdown(countList) }, 1000);

    $(".simulate_box").mouseleave(function () {
        var self = $(this);
        self.find(".simulate_option,.simulate_option2").hide();
    });

    $(".list_box").hover(function () {
        $(this).addClass("cur");
        $(this).children('.join').stop().animate({ 'bottom': 0 }, 500)
    }, function () {
        $(this).removeClass("cur");
        $(this).children('.join').stop().animate({ 'bottom': -55 }, 500)
    });
});
var activityArea = null;
function init() {
    $.ajax({
        url: "/Ajax/CommonAjax.ashx/GetActvityAreaInfoForCache",
        type: "get",
        dataType: "json",
        success: function (data) {
            activityArea = data;
            choseCurrentCity();
            choseHotCity();
            loadCityList();
        }

    })
}

function choseCurrentCity() {
    $.each(activityArea, function (index, item) {
        if (item.CityId == cityId) {
            $("#lblCurrentCity").text(item.CityName);
            return false;
        }
    });
}

function choseHotCity() {
    if (activityArea == null) return;
    var len = activityArea.length > 6 ? 6 : activityArea.length;
    var ls = $("#lsHotCity");
    for (var i = 0; i < len; i++) {
        var item = activityArea[i];
        var a = $("<a />").attr("target", "_self").attr("href", "/" + BitautoCityPinyin[item.CityId]["pinyin"]).text(item.CityName);
        if (item.CityId == cityId) {
            a.css({ 'color': '#034989', 'font-weight': 'bold' });
        }
        ls.append(a);
    }

}

function loadCityList() {
    if (activityArea == null) return;

    var orderArea = BitAutoBigAreas.orderArea;
    var data = getCityListData();
    var ls = $("#lsCity");
    $.each(orderArea, function (i, a) {
        if (data[a] == undefined) return;
        var dt = $("<dt />").text(a);
        var dd = $("<dd />");
        $.each(data[a], function (index, obj) {
            var a = $("<a />").attr("href", "/" + BitautoCityPinyin[obj.CityId]["pinyin"]).attr("target", "_blank").text(obj.CityName).attr("target", "_self");
            if (obj.CityId == cityId) {
                a.css({ 'color': '#034989', 'font-weight': 'bold' });
            }
            dd.append(a);
        });
        ls.append(dt).append(dd);

    })
}

function getCityListData() {
    var result = {};
    $.each(activityArea, function (index, obj) {
        $.each(bigArea, function (i, a) {
            if (obj.ProId == a.proId) {
                if (result[a.bigAreaName] == undefined) {
                    result[a.bigAreaName] = [];
                }
                result[a.bigAreaName].push(obj);
                return false;
            }
        })
    });

    for (var key in areaCityOrder) {
        var orderCityList = areaCityOrder[key];
        var cityList = result[key];
        for (var i = 0; i < orderCityList.length; i++) {
            var orderCity = orderCityList[i];
            if (cityList != undefined) {
                for (var j = 0; j < cityList.length; j++) {
                    if (orderCity.CityId == cityList[j].CityId && i != j) {
                        var temp = cityList[i];
                        cityList[i] = cityList[j];
                        cityList[j] = temp;
                        break;
                    }
                }
            }
        }
    }
    return result;
}


function ChoseCarMake() {
    var self = $(this);
    var cmkId = self.attr("cmkId")

    $("#divCarMake").html(self.text() + "<i  class='choice'></i>").addClass("cur").attr("cmkId", cmkId);
    self.parent().hide();
    if (cmkId > 0) {
        $("#divCarModel").html("请选择车型<i class='choice'></i>").attr("cmdId", -1).removeClass("cur").addClass("select_choice");
    } else {
        $("#divCarModel").html("请选择车型<i></i>").attr("cmdId", -1).removeClass("cur").removeClass("select_choice");
    }
    $("#cmbCarModel").empty();
    if (cmkId == "" || cmkId <= 0) {
        $("#divCarMake").removeClass("cur");
        $("#divCarMake").attr("cmkId", -1);
        $("#divCarModel").attr("cmdId", -1);
        return;
    }
    $("#cmbCarModel").html("<a cmdId='-1'> 请选择车型</a>");
    $.ajax({
        url: "/Ajax/CommonAjax.ashx/GetActivityCarModel",
        type: "get",
        data: { cmkId: cmkId, cityId: cityId },
        dataType: "json",
        success: function (data) {
            var cmb = $("#cmbCarModel");
            $.each(data, function (index, item) {
                var opt = $("<a />").text(item.CmdName).attr("cmdId", item.CmdId);

                cmb.append(opt);
            });



            var opt = $("#cmbCarModel a[cmdId=" + carModel.cmdId + "]");
            if (opt.length > 0) {
                ChoseCarModel.call(opt);
            }
        }
    });
}

function ChoseCarModel() {
    var self = $(this);
    var cmdId = self.attr("cmdId");
    $("#divCarModel").html(self.text() + "<i  class='choice'></i>").addClass("cur").attr("cmdId", cmdId);
    self.parent().hide();

    if (cmdId == "" || cmdId <= 0) {
        $("#divCarModel").removeClass("cur");
        $("#divCarModel").attr("cmdId", -1);
    }

}

function search() {
    var self = $(this);
    var cmkId = $("#divCarMake").attr("cmkId");
    var cmdId = $("#divCarModel").attr("cmdId");
    if (cmkId == "" || cmkId < 0) {
        return;
        //        var newUrl = getNewUrl({ cmkId: cmkId, cmdId: cmdId });
        //        window.location = newUrl;

    } else {
        $.ajax({
            url: "/Ajax/CommonAjax.ashx/GetActivityId",
            type: "get",
            data: { cityId: cityId, cmkId: cmkId, cmdId: cmdId },
            dataType: "json",
            success: function (data) {
                if (data.isSuccess) {
                    var taId = data.taId;
                    var url = "Signup/Signup.html?taId=" + taId + "&cmdId=" + cmdId;
                    window.location = url;
                }
            }
        });
    }
}
function getNewUrl(params) {

    var url = $.url();
    var path = url.attr('path') + "?";
    var query = $.url().param();
    $.extend(query, params);
    for (var key in query) {
        if (key.toLocaleLowerCase() != "page") {
            path += key + "=" + query[key] + "&";
        }
    }
    return path;
}
///
function loadHotCar() {
    $.ajax({
        url: "/Ajax/CommonAjax.ashx/GetHotCarModel",
        data: { cityId: cityId },
        type: "get",
        dataType: "json",
        success: function (data) {
            if (data != null && data.length > 0) {
                $("#divHotCar").show();
                var ul = $("#ulHotCar");
                var html = "";
                $.each(data, function (index, obj) {
                    html += '<li>'
                        + '<div class="pic">'
                        + '<img src="' + obj.PicUrl + '" width="230" height="132" /></div>'
                        + '<p><span class="jiacu">' + obj.CmkName + obj.CmdName + '团购</span> ' + obj.OffLineTime.substring(0, 10) + '<br />'
                            + '本期报名： <span class="add_c">' + obj.SignupCount + '</span> 人</p>'
                        + '<a href="Signup/Signup.aspx?taId=' + obj.TaId + '&cmdId=' + obj.CmdId + '" class="bm_btn" target="_blank">立即报名</a> </li>';

                });
                ul.html(html);
            }
        }
    });
}
///
function loadSCmb() {
    $.ajax({
        url: "/Ajax/CommonAjax.ashx/GetAllCarMasterBrand",
        type: "get",
        dataType: "json",
        success: function (data) {
            var cmb = $("#cmbSCmb");
            $.each(data, function (index, item) {
                var a = $("<a />").attr("href", "javascript:;").attr("cmbId", item.CmbId).text(item.CmbName);
                cmb.append(a);
            })

        }
    });
}
function choseSCmb() {
    var self = $(this);
    var cmbId = self.attr("cmbId");
    var cmbSCmd = $("#cmbSCmd")
    cmbSCmd.height($("#cmbSCmb").height());
    cmbSCmd.empty();
    self.addClass('curr').siblings().removeClass();
    $.ajax({
        url: "/Ajax/CommonAjax.ashx/GetAllCarModelWithMake",
        data: { cmbId: cmbId },
        type: "get",
        dataType: "json",
        success: function (data) {

            var lastCmkId = -1;
            $.each(data, function (index, item) {
                var a = $("<a />").attr("href", "javascript:;").attr("cmkId", item.CmkId).attr("cmkName", item.CmkName);
                if (item.CmkId != lastCmkId) {
                    lastCmkId = item.CmkId;
                    a.text(item.CmkName).addClass("curr");
                } else {
                    a.attr("cmdId", item.CmdId).text(item.CmdName);
                }
                cmbSCmd.append(a);
            });
        }
    });
    //$this.parent().siblings("div.simulate_select").html($this_txt + "<i></i>").addClass("cur");
    cmbSCmd.animate({ 'left': 93 }, 200).show();
}
function choseSCmd() {
    var self = $(this);
    if (self.hasClass("curr")) { return; }

    self.addClass('curr').siblings().removeClass();
    $("#divSCmd").html(self.attr("cmkName") + "-" + self.text() + "<i></i>")
    .addClass("cur")
    .attr("cmkId", self.attr("cmkId"))
    .attr("cmkName", self.attr("cmkName"))
    .attr("cmdId", self.attr("cmdId"))
    .attr("cmdName", self.text());
    $("#cmbSCmd,#cmbSCmb").hide();
    self.parents("div.form_box").removeClass("unselected");
}

function loadSPro() {
    var area = BitAutoAreas.masterArea;
    var cmbSPro = $("#cmbSPro");
    $.each(area, function (index, obj) {
        if (obj.parentID == '0' && obj.selfID != '710000' && obj.selfID != '810000' && obj.selfID != '820000') {
            var opt = $("<a />").text(obj.name == "" ? obj.fullname : obj.name).attr("href", "javascript:;").attr("proId", obj.selfID).attr("proName", obj.name != "" ? obj.fullname : obj.name);
            cmbSPro.append(opt);
        }
    });
}

function choseSPro() {
    var self = $(this);
    var area = BitAutoAreas.masterArea;
    var proId = self.attr("proId");
    var cmbSCity = $("#cmbSCity");
    cmbSCity.height($("#cmbSPro").height());
    cmbSCity.empty();

    self.addClass('curr').siblings().removeClass();
    $.each(area, function (index, obj) {
        if (obj.parentID == proId) {
            var opt = $("<a />").text(obj.name == "" ? obj.fullname : obj.name)
            .attr("href", "javascript:;").attr("cityId", obj.selfID);
            cmbSCity.append(opt);
        }
    });
    $("#cmbSCity").animate({ 'left': 93 }, 200).show();
}
function choseSCity() {
    var aPro = $("#cmbSPro>a.curr");

    var self = $(this);

    self.addClass('curr').siblings().removeClass();
    $("#divSCity").html(self.text() + "<i></i>").addClass("cur")
    .attr("cityId", self.attr("cityId"))
    .attr("cityName", self.text())
    .attr("proId", aPro.attr("proId"))
    .attr("proName", aPro.attr("proName"));
    $("#cmbSPro").hide();
    $("#cmbSCity").hide();

    self.parents("div.form_box").removeClass("unselected");
}
///

function countdown(countList) {
    serverTime++;
    countList.each(function () {
        var self = $(this);
        var status = self.attr("status");
        var datetime = self.attr("datetime");
        if (status == 0) {
            self.html(datetime + "开始报名");
            return;
        }
        var result = getTime(datetime);
        if (result.isOver == false) {
            var html = "剩余";
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
            self.html(html);
            //self.html(" 剩余<b>" + result.day + "</b>天<b>" + result.hour + "</b>小时<b>" + result.minute + "</b>分<b>" + result.second + "</b>秒")
        }

    })
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
        day: Math.floor((totalsecond / 3600) / 24),
        hour: Math.floor((totalsecond / 3600) % 24),
        minute: Math.floor((totalsecond / 60) % 60),
        second: getFormatInt(Math.floor(totalsecond % 60))
    };

}
///
function checkUserName(isSubmit) {
    var ele = $("#txtUserName");
    var userName = $.trim(ele.val());
    if (userName == "" || !isZhoneWenOrYingWen(userName)) {
        if (isSubmit) {
            ele.parent().addClass("error_box").removeClass("correct_box");
        }
        return false;
    }
    ele.parent().removeClass("error_box").addClass("correct_box");
    ele.siblings("p").hide();
    return true;
}

function checkUserPhone(isSubmit) {
    var ele = $("#txtUserPhone");
    var userPhone = $.trim(ele.val());
    if (userPhone == "" || !isMobile(userPhone)) {
        if (isSubmit) {
            ele.parent().addClass("error_box").removeClass("correct_box");
        }
        return false;
    }
    ele.parent().removeClass("error_box").addClass("correct_box");
    ele.siblings("p").hide();
    return true;
}

function checkComboBox(id, attr) {
    var ele = $("#" + id);
    //var userPhone = $.trim(ele.val());
    var val = ele.attr(attr);
    if (val == "" || val < 0) {
        ele.parents("div.form_box").addClass("unselected");
        //ele.siblings("p").show();
        return false;
    }
    ele.parents("div.form_box").removeClass("unselected");

    return true;
}

function checkInput() {
    var result = true;
    var hasPro = true;
    var hasCmk = true;

    if (!checkUserName(true)) {
        result = false;
    }
    if (!checkUserPhone(true)) {
        result = false;
    }
    if (!checkComboBox("divSCity", "cityId")) {
        result = false;
    }
    if (!checkComboBox("divSCmd", "cmdId")) {
        result = false;
    }

    return result;
}

function signup() {
    if (!checkInput()) {
        return;
    }
    var data = {
        SignupUserName: $.trim($("#txtUserName").val()),
        SignupPhone: $.trim($("#txtUserPhone").val()),
        CmkId: $("#divSCmd").attr("cmkId"),
        CmkName: $("#divSCmd").attr("cmkName"),

        CmdId: $("#divSCmd").attr("cmdId"),
        CmdName: $("#divSCmd").attr("cmdName"),

        ProId: $("#divSCity").attr("proId"),
        ProName: $("#divSCity").attr("proName"),

        CityId: $("#divSCity").attr("cityId"),
        CityName: $("#divSCity").attr("cityName")

    }

    $.ajax({
        url: "/Ajax/CommonAjax.ashx/FastSignup",
        type: "post",
        data: data,
        dataType: "json",
        success: function (data) {
            if (data.Item1 == 0) {
                $("#tip_exists").show();
                $(".mask").show();
            }
            else {
                $("#tip_ok").show();
                $(".mask").show();
            }
        }
    })

}