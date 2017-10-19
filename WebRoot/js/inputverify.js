//表单验证***整理于2016.1.21

//判断字符串是不是非中文的
function IsChar(str) {
    var flagChar = false;
    if (str) {
        for (var i = 0; i < str.length; i++) {
            var c = str.charAt(i);
            if (/^[\u0000-\u00ff]$/.test(c)) {
                return true;
            }
        }
    }
    return flagChar;
}

//获取字符串长度
function GetStringRealLength(str) {
    var bytesCount = 0;
    if (str) {
        for (var i = 0; i < str.length; i++) {
            var c = str.charAt(i);
            if (/^[\u0000-\u00ff]$/.test(c)) {
                bytesCount += 1;
            } else {
                bytesCount += 2;
            }
        }
    }
    return bytesCount;
}

//车顾问UID验证(6位数字)
function isUid(uid) {
    return (/^[\d]{6}$/.test(uid));
}

//手机号码验证
function isMobile(mobile) {
    return (/^(?:13\d|15\d|17\d|18\d|145|147)-?\d{5}(\d{3}|\*{3})$/.test(mobile));
}

//邮箱验证
function isMail(mail) {
    return (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(mail));
}
//15位身份证验证
function is15sfz(sfz) {
    return (/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(sfz));
}
//18位身份证验证
function is18sfz(sfz) {
    return (/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(sfz));
}
//判断输入的邮编(只能为六位)是否正确    
function IsZIP(zip) {
    var reg = /^\d{6}$/;
    return reg.test(str);
}
//判断输入的字符是否全为中文    
function IsChinese(str) {
    var reg = /^\u4E00-\u9FA5+$/;
    if (str.length > 0) {
        for (var i = 0; i < str; i++) {
            var c = str.charAt(i);
            if (!reg.test(c)) {
                return false;
            }
        }
    }
    else {
        return true;
    }
    return true;
}
//判断输入的字符是否为英文字母    
function IsLetter(str) {
    var reg = /^[a-zA-Z]+$/;
    return reg.test(str);
}
//判断输入的字符是否为整数    
function IsInteger(str) {
    var reg = /^[-+]?\d*$/;
    return reg.test(str);
}
//判断输入的字符是否为:a-z,A-Z,0-9    
function IsString(str) {
    var reg = /^[a-zA-Z0-9_]+$/;
    return reg.test(str);
}

//银行卡号验证(16到19位)
function isCard(card) {
    return (/^[0-9]{16,19}$/.test(card));
}
//验证浮点数(2位小数)
function isFloatShu(str) {
    return (/^\d+(\.[0-9]{1,2})?$/).test(str);
}
//验证银行卡号是否是最后4位加密
function isCardJiaMi4Xing(card) {
    return (/^[0-9]{12,15}\*\*\*\*$/.test(card));
}

//验证是否是中文或者英文
function isZhoneWenOrYingWen(str) {
    return (/^[a-zA-Z\u4e00-\u9fa5]{2,}$/).test(str);
}

//验证数字
function isShuZi(str) {
    return (/^[0-9]*$/).test(str);
}
//验证英文字母
function isYingWenZiMu(str) {
    return (/^[A-Za-z]+$/).test(str);
}