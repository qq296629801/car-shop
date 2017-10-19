(function () {
    //判断是否有cookie限定必须是电脑版
    var isHaveViewPCCookie = hmc_global.utils.readcookie("isHaveViewPCCookie");
    if (isHaveViewPCCookie == "true") {
        return;
    }

    if (document.location.search.length > 0
        && document.location.search.toLowerCase().indexOf("viewpc") > 0) {
        hmc_global.utils.setCookie("isHaveViewPCCookie", "true");
        return;
    }

    var bDebugMode = false;
    var arrMobileDevices = ["240x320", "acer", "acoon", "acs-", "abacho", "ahong", "airness", "alcatel", "amoi", "android", "anywhereyougo.com", "applewebkit/525", "applewebkit/532", "asus", "audio", "au-mic", "avantogo", "becker", "benq", "bilbo", "bird", "blackberry", "blazer", "bleu", "cdm-", "compal", "coolpad", "danger", "dbtel", "dopod", "elaine", "eric", "etouch", "fly ", "fly_", "fly-", "go.web", "goodaccess", "gradiente", "grundig", "haier", "hedy", "hitachi", "htc", "huawei", "hutchison", "inno", "ipaq", "ipod", "iphone", "android", "jbrowser", "kddi", "kgt", "kwc", "lenovo", "lg ", "lg2", "lg3", "lg4", "lg5", "lg7", "lg8", "lg9", "lg-", "lge-", "lge9", "longcos", "maemo", "mercator", "meridian", "micromax", "midp", "mini", "mitsu", "mmm", "mmp", "mobi", "mot-", "moto", "nec-", "netfront", "newgen", "nexian", "nf-browser", "nintendo", "nitro", "nokia", "nook", "novarra", "obigo", "palm", "panasonic", "pantech", "philips", "phone", "pg-", "playstation", "pocket", "pt-", "qc-", "qtek", "rover", "sagem", "sama", "samu", "sanyo", "samsung", "sch-", "scooter", "sec-", "sendo", "sgh-", "sharp", "siemens", "sie-", "softbank", "sony", "spice", "sprint", "spv", "symbian", "talkabout", "tcl-", "teleca", "telit", "tianyu", "tim-", "toshiba", "tsm", "up.browser", "utec", "utstar", "verykool", "virgin", "vk-", "voda", "voxtel", "vx", "wap", "wellco", "wig browser", "wii", "windows ce", "wireless", "xda", "xde", "zte"];

    function isMobileBroswer() {
        var bReturn = false,
            szUserAgent,
            i,
            nArrLength = arrMobileDevices.length;
        szUserAgent = navigator.userAgent;
        if (bDebugMode) {
            szUserAgent = "Mozilla/5.0 (Linux; U; Android 2.2; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1";
        }
        for (i = 0; i < nArrLength; i++) {
            if (new RegExp(arrMobileDevices[i], "i").test(szUserAgent)) {
                bReturn = true;
                break;
            }
        }
        return bReturn;
    }

    if (isMobileBroswer()) {
	   var url=window.location.href.replace(".huimaiche.com",".m.huimaiche.com");
       window.location.href = url;
    }
})();