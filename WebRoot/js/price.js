/*
	designed by:zhouxl
	create date:2014.8.4
	update date:2014.10.14
	based on: raphael.js
*/

//config
//图标地址
var picAssetsUrl = "//img.huimaiche.cn/uimg/www/v20140720/images/";
//资源图片地址
var rspath = "//img.huimaiche.com/web/ptcity/";
//静态曲线图(用于在手机端显示，暂时没用)
var wapPicName = "wap.png";
var modelPicName;//车型价格数据图片
var jsonFileName;//车型价格数据（比例数据）
var timeStampUrl = "https://www.huimaiche.com/js/hmt_timestamp.js";//时间戳
var jsVersionNum;

//配置数据（坐标）
var PriceConfigLarge = function () {
    var configObj = new Object();

    var priceLabel1 = '{"type":"label1", "des":"0,0,70,30"}';
    var priceLabel2 = '{"type":"label2", "des":"0,40,70,30"}';
    var priceLabel3 = '{"type":"label3", "des":"0,80,70,30"}';
    var priceLabel4 = '{"type":"label4", "des":"0,120,70,30"}';
    var priceLabel5 = '{"type":"label5", "des":"0,160,70,30"}';
    var priceLabel6 = '{"type":"label6", "des":"0,200,70,30"}';
    var priceLabel7 = '{"type":"label7", "des":"0,240,70,30"}';

    var junjia1 = '{"type":"junjia1", "des":"0,280,118,60"}';
    var junjia2 = '{"type":"junjia2", "des":"0,350,118,60"}';
    var junjia3 = '{"type":"junjia3", "des":"0,420,118,60"}';
    var junjia4 = '{"type":"junjia4", "des":"0,490,118,60"}';
    var junjia5 = '{"type":"junjia5", "des":"0,560,118,60"}';
    var junjia6 = '{"type":"junjia6", "des":"0,630,118,60"}';

    var junjia7 = '{"type":"junjia7", "des":"128,280,118,60"}';
    var junjia8 = '{"type":"junjia8", "des":"128,350,118,60"}';
    var junjia9 = '{"type":"junjia9", "des":"128,420,118,60"}';
    var junjia10 = '{"type":"junjia10", "des":"128,490,118,60"}';
    var junjia11 = '{"type":"junjia11", "des":"128,560,118,60"}';
    var junjia12 = '{"type":"junjia12", "des":"128,630,118,60"}';

    var dijia1 = '{"type":"dijia1","des":"0,700,150,80"}';
    var dijia2 = '{"type":"dijia2","des":"0,790,150,80"}';
    var dijia3 = '{"type":"dijia3","des":"0,880,150,80"}';
    var dijia4 = '{"type":"dijia4","des":"0,970,150,80"}';
    var dijia5 = '{"type":"dijia5","des":"0,1060,150,80"}';
    var dijia6 = '{"type":"dijia6","des":"0,1150,150,80"}';

    var dijia7 = '{"type":"dijia7","des":"160,700,150,80"}';
    var dijia8 = '{"type":"dijia8","des":"160,790,150,80"}';
    var dijia9 = '{"type":"dijia9","des":"160,880,150,80"}';
    var dijia10 = '{"type":"dijia10","des":"160,970,150,80"}';
    var dijia11 = '{"type":"dijia11","des":"160,1060,150,80"}';
    var dijia12 = '{"type":"dijia12","des":"160,1150,150,80"}';

    var picDataArray = [priceLabel1, priceLabel2, priceLabel3, priceLabel4, priceLabel5, priceLabel6, priceLabel7,
						junjia1, junjia2, junjia3, junjia4, junjia5, junjia6, junjia7, junjia8, junjia9, junjia10, junjia11, junjia12,
						dijia1, dijia2, dijia3, dijia4, dijia5, dijia6, dijia7, dijia8, dijia9, dijia10, dijia11, dijia12];

    configObj.picData = "[" + picDataArray.toString() + "]";

    //曲线主区域的宽度
    configObj.mainWidth = 750;
    //曲线主区域的高度
    configObj.mainHeight = 250;
    //曲线主区域的x
    configObj.mainX = 65;
    //曲线主区域的y
    configObj.mainY = 38;
    //线段上圆点的半径
    configObj.dotRadius = 7;
    //均价颜色
    configObj.junjiaColor = "#67A3EA";
    //底价颜色
    configObj.dijiaColor = "#F17C0B"

    //图片资源的宽度
    configObj.picAssetWidth = 400;
    //图片资源的高度
    configObj.picAssetHeight = 1300;

    return configObj;
}
//检查资源图是否存在，以此判断该车型是否能够绘图，如果不能绘图，页面将不显示
var checkShowCurve = function (carId, cityId, callback) {
    var picPreUrl = rspath + carId % 10 + "/" + carId + "/";
    var curTryTimes = 0;
    var interative = true;
    var version = getVersionNo();

    loadVersionJs();

    function loadVersionJs(carId) {
        var sucFunc = function () {
            version = window.hmc_timestamp;
            jsVersionNum = version.timestamp;

            checkIfHavePic();
        }

        var failFunc = function () {
            jsVersionNum = version;

            checkIfHavePic();
        }
        LoadJs_Check(timeStampUrl + "?ver=" + getTimeStamp(), "versionJs", sucFunc, failFunc);
    }

    function checkIfHavePic() {
        modelPicName = carId + "_" + cityId + ".png";

        var _picUrl;
        _picUrl = picPreUrl.toString() + modelPicName + "?ver=" + jsVersionNum;
        checkPic(_picUrl);
    }

    function checkPic(url) {
        curTryTimes++;
        var image = new Image();
        var successCallBack = function () {
            //图片存在，加载xml
            callback(true);
        }
        image.onload = function () {
            successCallBack();
        }
        image.onerror = function () {
            //console.log("image error");
        }

        image.url = url;

        var img = new Image();
        img.src = url;
        img.onerror = function () {
            if (curTryTimes < 3) {
                curTryTimes++;
                img.src = url;
            } else {
                callback(false);
            }
        }
        if (img.complete) {
            successCallBack();
        } else {
            img.onload = function () {
                successCallBack();
            };
        };
    }

    //js加载
    function LoadJs_Check(url, jsId, successCallBack, faileCallback) {
        try {
            var jsDom = document.createElement("script");
            jsDom.setAttribute("type", "text/javascript")
            jsDom.setAttribute("src", url);
            jsDom.setAttribute("id", jsId);
            var headDom = document.getElementsByTagName('head')[0];
            RemoveDom_Check(jsId);
            headDom.appendChild(jsDom);
            if (document.all) {
                jsDom.onreadystatechange = function () {
                    if (this.readyState == "complete" || this.readyState == "loaded") {
                        try {
                            if (successCallBack) successCallBack();
                        } catch (e) {
                            setTimeout(function () {
                                RemoveDom_Check(jsId);
                                headDom.appendChild(jsDom);
                            }, 2000);
                        }
                    }
                };
            } else {
                jsDom.onload = function () {
                    if (successCallBack) successCallBack();
                };
            }
        } catch (e) {
            if (faileCallback) faileCallback();
        }
    }
    function RemoveDom_Check(id) {
        var head = document.getElementsByTagName('head')[0];
        if (document.getElementById(id)) {
            head.removeChild(document.getElementById(id));
        }
    }

    function getVersionNo() {
        var myDate = new Date();
        var curTimeStr = myDate.getFullYear().toString() + (myDate.getMonth() + 1).toString() + myDate.getDate().toString();//获取当前时间  
        return curTimeStr;
    }

    function getTimeStamp() {
        var myDate = new Date();
        var curTimeStr = myDate.getFullYear().toString() + (myDate.getMonth() + 1).toString() + myDate.getDate().toString() + myDate.getHours().toString() + myDate.getMinutes().toString() + myDate.getSeconds().toString();//获取当前时间  
        return curTimeStr;
    }
}
//绘制主函数
var drawPriceCurve = function (param) {
    var paramObj = param;
    if (param.w < 900) {
        paramObj.version = "vsmall";
    } else {
        paramObj.version = "vlarge";
    }
    //version:vlarge:600*340， vsmall:380*210
    paramObj.versionNo = getVersionNo();
    //paramObj.configIconUrlPre = "http://image.bitauto.com/bt/price/priceChart/image/";//价格曲线需要的图标资源地址
    paramObj.configIconUrlPre = picAssetsUrl;//价格曲线需要的图标资源地址
    //paramObj.configJsUrlPre = "http://image.bitauto.com/bt/price/priceChart/chart/";//用于绘制ui的js信息地址
    paramObj.configJsUrlPre = rspath + param.carId % 10 + "/" + param.carId + "/";
    //paramObj.configModelPicUrlPre = "http://image.bitauto.com/bt/price/priceChart/chart/";//用于绘制ui的模版图片地址
    paramObj.configModelPicUrlPre = rspath + param.carId % 10 + "/" + param.carId + "/";
    //paramObj.configLogUrl = "http://price.bitauto.com/pricecurve/RecordLog.ashx";//用于记录错误日志的接口地址

    //使用的是哪一种绘图方式，raphael(vml、svg) 或 canvas
    var gdiType;

    var versionDescribe;

    var priceConfig;
    var paper;
    var dotSet;//圆点集合
    //图片资源
    var iconUrlPre = param.configIconUrlPre;
    //图片信息数据
    var picPreUrl = param.configModelPicUrlPre;//图片路径前缀
    var logUrl = param.configLogUrl + "?msg=";
    var priceXml;//价格曲线所需数据的xml
    var picUrl;//图片资源的地址
    var picXml;//图片资源对应的xml
    var picWidth;//图片资源的宽度
    var picHeight;//图片资源的高度
    var picAssetElement;//图片资源元素
    //价格曲线的宽度和高度
    var canvasWidth;
    var canvasHeight;
    //资源信息
    var picDataObj;//图片资源数据

    //圆点信息
    var dotArray;//圆点信息
    //config
    var interativable = true;//是否可以交互
    var scaleFactor = 1;//针对不同屏幕大小的缩放因子

    var tryTimesTotal = 2;//重试的次数
    var curTryTimes = 0;//当前重试的次数

    var showStaticImageFlag = false;//是否显示静态图片

    var bottomRect;

    var ifHaveCurve = true;//是否有曲线图

    paramObj.useNation = param.useNation; //判断显示全国数据还是本地数据

    getConfigData();
    //获得图片资源的配置数据
    function getConfigData() {
        if (paramObj.version == "vsmall") {
            priceConfig = PriceConfigSmall();
        } else {
            priceConfig = PriceConfigLarge();
        }

        picWidth = Number(priceConfig.picAssetWidth);
        picHeight = Number(priceConfig.picAssetHeight);

        priceConfig.mainWidth = (paramObj.w - 182);
        priceConfig.mainHeight = (paramObj.h - 80);

        draw(paramObj.carId, paramObj.cityId, paramObj.w, paramObj.h, paramObj.holderId);
    }
    //绘制
    function draw(carId, cityId, w, h, holderId) {
        canvasWidth = w;
        canvasHeight = h;
        initPicData();

        paramObj.versionNo = jsVersionNum;

        jsonFileName = carId + "_" + cityId + ".js";
        var jsUrl = paramObj.configJsUrlPre + jsonFileName + "?ver=" + paramObj.versionNo;
        loadPriceData(jsUrl);

        if (interativable == true) {
            try {
                if (Raphael.vml || Raphael.svg) {
                    gdiType = "Raphael";
                    paper = Raphael(holderId, w, h);
                    paper.forEach(function (elem) {
                        e.remove();
                    })
                    paper.renderfix();
                    paper.safari();
                    bottomRect = paper.rect(0, 0, w, h).attr({ "stroke-opacity": 0, fill: "#fff", "fill-opacity": 1, "stroke-width": 0 });
                } else {
                    showStaticImageFlag = true;
                }
            } catch (e) {
                showStaticImageFlag = true;
            }
        } else {
            showStaticImageFlag = true;
        }
    }
    //检查图片是否存在
    function checkIfHavePic(carId) {
        modelPicName = carId + ".png";

        var _picUrl;
        _picUrl = picPreUrl.toString() + modelPicName + "?ver=" + getVersionNo();
        checkPic(_picUrl, carId);
    }

    function checkPic(url, carId) {
        var img = new Image();
        img.src = url;
        img.onerror = function () {
            if (curTryTimes < 3) {
                curTryTimes++;
                img.src = url;
            } else {
                ifHaveCurve = false;

                drawBg();
            }
        }
        if (img.complete) {
            successCallBack();
            picAssetElement = paper.image(url, 0, 0, picWidth, picHeight).attr("opacity", 0);
        } else {
            img.onload = function () {
                successCallBack();
            };
        };
    }
    //加载js数据
    function loadPriceData(url) {
        if (showStaticImageFlag) {
            _picUrl = picPreUrl.toString() + wapPicName + "?ver=" + paramObj.versionNo;
        } else {
            _picUrl = picPreUrl.toString() + paramObj.carId.toString() + "_" + paramObj.cityId.toString() + ".png?ver=" + paramObj.versionNo;
        }
        picUrl = _picUrl;

        if (showStaticImageFlag) {
            showStaticImage();
            return;
        }

        curTryTimes++;
        var tempUrl = url;

        var successCallBack = function () {
            var tempJson;
            try {
                tempJson = pointJson;
                parseData(tempJson);

            } catch (e) {
                var errMsg = "json数据解析出错!";
                doLog(errMsg);
            };
        }
        var faileCallback = function () {
            if (curTryTimes < tryTimesTotal) {
                loadPriceData(tempUrl);
            } else {
                //超出尝试次数
                var errMsg = "获得车型显示json数据出错！url：" + tempUrl;
                doLog(errMsg);
                exportTextDes(errMsg);
            }
        }
        LoadJs(tempUrl, "priceDataJs", successCallBack, faileCallback);
    }

    var chromeTempImg = new Image();
    var dijiaDotDataArr;
    var zhidaojiaDataArr;
    var junjiaDataArr;
    var dateArr;
    //解析js数据
    function parseData(jsonData) {
        var tempJson = jsonData;
        dateArr = new Array();//日期数组
        zhidaojiaDataArr = new Array();//指导价点的位置信息
        junjiaDataArr = new Array();//均价点的位置信息
        dijiaDotDataArr = new Array();//成交底价点的位置信息

        var tempArr = tempJson.Price;
        for (var i = 0; i < tempArr.length; i++) {
            var tempObj = tempArr[i];

            var dot = new Object();
            dot.type = "junjia" + (i + 1);
            dot.x = priceConfig.mainX + parseInt(priceConfig.mainWidth / 6 / 2) + parseInt(i * (priceConfig.mainWidth / 6));
            dot.y = priceConfig.mainY + parseInt((1 - tempObj.MarketPrice.value) * priceConfig.mainHeight);
            dot.draw = tempObj.MarketPrice.tag;
            junjiaDataArr.push(dot);

            dot = new Object();
            dot.type = "zhidaojia" + (i + 1);
            dot.x = priceConfig.mainX + parseInt(priceConfig.mainWidth / 6 / 2) + parseInt(i * (priceConfig.mainWidth / 6));
            dot.y = priceConfig.mainY + parseInt((1 - tempObj.MSRP.value) * priceConfig.mainHeight);
            dot.draw = tempObj.MSRP.tag;
            zhidaojiaDataArr.push(dot);

            dot = new Object();
            dot.type = "dijia" + (i + 1);
            dot.x = priceConfig.mainX + parseInt(priceConfig.mainWidth / 6 / 2) + parseInt(i * (priceConfig.mainWidth / 6));
            dot.y = priceConfig.mainY + parseInt((1 - tempObj.HmcPrice.value) * priceConfig.mainHeight);
            dot.draw = tempObj.HmcPrice.tag;
            dijiaDotDataArr.push(dot);

            dateArr.push(tempObj.Week);
        }

        if (isChrome()) {
            //chrome下对图片使用clip-rect时，多个图片重叠时影响鼠标事件，所以在crome下使用canvas来截图图片
            chromeTempImg.crossOrigin = "Anonymous";
            chromeTempImg.src = picUrl;

            chromeTempImg.onload = function () {
                drawBg();
            }
        } else {
            drawBg();
        }
    }

    //初始化图片数据
    function initPicData() {
        picDataObj = new Object();
        columnPicDesArray = new Array();

        var tarr = strToJson(priceConfig.picData);
        for (var i = 0; i < tarr.length; i++) {
            var tObj = tarr[i];

            picDataObj[tObj.type] = new Object();
            picDataObj[tObj.type].type = tObj.type;
            picDataObj[tObj.type]["rect"] = tObj.des;
            picDataObj[tObj.type].x = Number(tObj.des.split(",")[0]);
            picDataObj[tObj.type].y = Number(tObj.des.split(",")[1]);
            picDataObj[tObj.type].w = Number(tObj.des.split(",")[2]);
            picDataObj[tObj.type].h = Number(tObj.des.split(",")[3]);

        }
    }

    //绘制主函数
    function drawBg() {
        drawMainBg();//背景网格
        drawYCodinate();//y坐标
        if (ifHaveCurve) {
            drawPriceDot(junjiaDataArr, "junjia");//绘制均价的点
            drawPriceDot(dijiaDotDataArr, "dijia");//绘制底价的点

            drawTip();//绘制点的提示信息
            showLastTip();//默认显示最后一个提示信息
            drawInteractiveRect();//绘制交互层
        }
        drawInfo();//绘制各个价格的定义信息
    }

    var interativeSet = paper.set();
    //绘制交互层,当鼠标在点的左右范围一定区域内，显示点的提示信息
    function drawInteractiveRect() {
        interativeSet.forEach(function (inEl) {
            inEl.remove();
        })
        interativeSet.clear();

        var bottom = paper.rect(0, 0, priceConfig.mainX + priceConfig.mainWidth, canvasHeight)
							.attr("fill", "#ff0000").attr("fill-opacity", 0).attr("strokeWidth", 0).attr("stroke-opacity", 0)
							.mouseover(function (event) {
							    showLastTip();
							});
        interativeSet.push(bottom);

        for (var i = 0; i < 6; i++) {
            var startx = priceConfig.mainX + parseInt(i * priceConfig.mainWidth / 6);
            var starty = priceConfig.mainY;
            var endx = parseInt(priceConfig.mainWidth / 6);
            var endy = priceConfig.mainHeight;

            var tempRect = paper.rect(startx, starty, endx, endy).attr("fill", "#000000").attr("fill-opacity", 0).attr("strokeWidth", 0).attr("stroke-opacity", 0)
				.data("tipIndex", i + 1)
				.mouseover(function () {
				    showTip("dot_junjia" + this.data("tipIndex"));
				});
            interativeSet.push(tempRect);
        }
    }

    //绘制背景网格
    function drawMainBg() {
        //外边框
        var leftLinePath = "M" + (priceConfig.mainX + 0.5) + " " + (priceConfig.mainY + 0.5) + " L" + (priceConfig.mainX + 0.5) + " " + (priceConfig.mainY + priceConfig.mainHeight + 0.5);
        paper.path(leftLinePath).attr("stroke", "#ccc");

        var bottomLinePath = "M" + (priceConfig.mainX + 0.5) + " " + (priceConfig.mainY + priceConfig.mainHeight + 0.5) + " L" + (priceConfig.mainX + priceConfig.mainWidth + 0.5) + " " + (priceConfig.mainY + priceConfig.mainHeight + 0.5);
        paper.path(bottomLinePath).attr("stroke", "#ccc");

        var topLinePath = "M" + (priceConfig.mainX + 0.5) + " " + (priceConfig.mainY + 0.5) + " L" + (priceConfig.mainX + priceConfig.mainWidth + 0.5) + " " + (priceConfig.mainY + 0.5);
        paper.path(topLinePath).attr("stroke", "#ccc").attr("stroke-dasharray", "- ");

        var rightLinePath = "M" + (priceConfig.mainX + priceConfig.mainWidth + 0.5) + " " + (priceConfig.mainY + 0.5) + " L" + (priceConfig.mainX + priceConfig.mainWidth + 0.5) + " " + (priceConfig.mainY + priceConfig.mainHeight + 0.5);
        paper.path(rightLinePath).attr("stroke", "#ccc").attr("stroke-dasharray", "- ");

        //横背景线
        for (var i = 0; i < 4; i++) {
            var startx = priceConfig.mainX + 0.5;
            var starty = priceConfig.mainY + (i + 1) * (priceConfig.mainHeight) / 5 + 0.5;
            var endx = startx + priceConfig.mainWidth;
            var endy = starty;
            var horLinePath = "M" + startx + " " + starty + " L" + endx + " " + endy;
            paper.path(horLinePath).attr("stroke", "#ccc").attr("stroke-dasharray", "- ")
        }
        //竖背景线
        for (var j = 0; j < 6; j++) {
            var startx = parseInt(priceConfig.mainX + (priceConfig.mainWidth / 6) / 2 + j * (priceConfig.mainWidth / 6)) + 0.5;
            var starty = priceConfig.mainY + 0.5;
            var endx = startx;
            var endy = starty + priceConfig.mainHeight;
            var verLinePath = "M" + startx + " " + starty + " L" + endx + " " + endy;
            paper.path(verLinePath).attr("stroke", "#ccc").attr("stroke-dasharray", "- ");
        }
        //日期
        if (ifHaveCurve) {
            for (var k = 0; k < dateArr.length; k++) {
                var dateText = dateArr[k];
                var textx = parseInt(priceConfig.mainX + (priceConfig.mainWidth / 6) / 2 + k * (priceConfig.mainWidth / 6)) + 0.5;
                var texty = priceConfig.mainY + priceConfig.mainHeight + 10.5;
                paper.text(textx, texty, dateText).attr({ "font-size": 12, "font-family": "Microsoft YaHei" });
            }
        } else {
            paper.text(priceConfig.mainX + 380, parseInt(priceConfig.mainY + priceConfig.mainHeight / 2), "数据样本不足，暂无底价走势图").attr({ "font-size": 18, "font-family": "Microsoft YaHei", "fill": "#B8B8B8" });
        }
    }
    //绘制y坐标
    function drawYCodinate() {
        if (ifHaveCurve) {
            var zhidaoy = zhidaojiaDataArr[0].y - 15;
            for (var i = 1; i < 7; i = i + 2) {
                var x = priceConfig.mainX - picDataObj.label1.w;
                var y = priceConfig.mainY + parseInt((i - 1) * (priceConfig.mainHeight / 5));
                var tempObj = picDataObj["label" + (i + 1)];
                var picx = parseInt(tempObj.x);
                var picy = parseInt(tempObj.y);
                var picw = parseInt(tempObj.w);
                var pich = parseInt(tempObj.h);
                y -= parseInt(pich / 2);

                if (Math.abs(y - zhidaoy) >= 20) {
                    clipImage(picUrl, picx, picy, picw, pich, x, y, picWidth, picHeight).show();
                }
            }

            //厂商指导价直线
            var x = priceConfig.mainX + 0.5 - 1;
            var y = zhidaojiaDataArr[0].y;
            var endx = priceConfig.mainX + priceConfig.mainWidth + 0.5;
            var endy = y;
            var tempObj = picDataObj.label1;
            var picx = parseInt(tempObj.x);
            var picy = parseInt(tempObj.y);
            var picw = parseInt(tempObj.w);
            var pich = parseInt(tempObj.h);
            clipImage(picUrl, picx, picy, picw, pich, x - picw, y - parseInt(pich / 2), picWidth, picHeight).show();

            var linePath = "M" + x + " " + y + " L" + endx + " " + endy;
            paper.path(linePath).attr("stroke", "#7C88A4").attr("stroke-width", 2);
        } else {
            for (var j = 1; j < 6; j++) {
                var x = priceConfig.mainX - 10;
                var y = priceConfig.mainY + parseInt((j - 1) * (priceConfig.mainHeight / 5));
                paper.text(x, y, "--").attr({ "font-size": 12, "font-family": "Microsoft YaHei", "fill": "#B8B8B8" });
            }
        }
    }

    var dotSet = paper.set();
    //绘制价格圆点
    function drawPriceDot(tempArr, prefix) {
        var tempSet;

        var color = priceConfig.junjiaColor;
        if (prefix == "dijia") {
            color = priceConfig.dijiaColor;
        }

        for (var j = 0; j < tempArr.length; j++) {
            var tempObj = tempArr[j];
            var type = tempObj.type;
            var x = tempObj.x;
            var y = tempObj.y;
            var endx;
            var endy;

            if (j < (tempArr.length - 1) && tempObj.draw == 1) {
                var tempObj2 = tempArr[j + 1];
                endx = tempObj2.x;
                endy = tempObj2.y;
                if (tempObj2.draw == 1) {
                    var linePath = "M" + x + " " + y + " L" + endx + " " + endy;
                    var pathEl = paper.path(linePath).attr("stroke", color).attr("stroke-width", 3);
                }
            }
        }

        ani_dotSet.clear();
        dotSet.clear();
        for (var i = 0; i < tempArr.length; i++) {
            var tempObj = tempArr[i];
            var type = tempObj.type;
            var x = tempObj.x;
            var y = tempObj.y;
            var radius = priceConfig.dotRadius;
            if (tempObj.draw == 1) {
                var tempdot = dot(type, x, y, radius, color);
                dotSet.push(tempdot);
                tempdot.mouseover(function () {
                    showTip(this.data("elementType"));
                }).mouseout(function () {
                    hideTip();
                }).attr("cursor", "pointer");
            }
        }
    }
    //显示最后一个价格提示
    function showLastTip() {
        var tempindex;
        for (var i = 5; i >= 0; i--) {
            if (junjiaDataArr[i] || dijiaDotDataArr[i]) {
                tempindex = i + 1;
                break;
            }
        }
        showTip("dot_junjia" + tempindex);
    }
    //绘制
    function drawTip() {
        paper.forEach(function (el) {
            if (el.data("elementType")) {
                var junjiaDot;
                var dijiaDot;
                var type;
                var x;
                var y;
                var picObj_junjia;
                var picObj_dijia;
                if (el.data("elementType").indexOf("dot_junjia") != -1) {
                    type = el.data("elementType");
                    picObj_junjia = picDataObj["junjia" + type.substr(type.length - 1, 1)];
                    junjiaDot = el;

                    var posData_junjia = junjiaDot.data("posData");
                    x = parseInt(posData_junjia.split("_")[0]) - picObj_junjia.w / 2 - 3;
                    y = parseInt(posData_junjia.split("_")[1]) - parseInt(posData_junjia.split("_")[2]) - picObj_junjia.h - 5;

                    paper.forEach(function (el2) {
                        if (el2.data("elementType") && el2.data("elementType") == ("dot_dijia" + type.substr(type.length - 1, 1))) {
                            dijiaDot = el2;
                            //break;
                        }
                    })

                    if (dijiaDot) {
                        tempy = parseInt(dijiaDot.data("posData").split("_")[1]);
                        if (tempy < parseInt(posData_junjia.split("_")[1])) {
                            picObj_junjia = picDataObj["junjia" + (parseInt(type.substr(type.length - 1, 1)) + 6)];
                            y = parseInt(posData_junjia.split("_")[1]) + parseInt(posData_junjia.split("_")[2]) + 5;
                        }
                    }

                    clipImage(picUrl, picObj_junjia.x, picObj_junjia.y, picObj_junjia.w, picObj_junjia.h, x, y, picWidth, picHeight).hide().data("elementType", "tip_" + type.substr(type.length - 1, 1));
                } else if (el.data("elementType").indexOf("dot_dijia") != -1) {
                    type = el.data("elementType");
                    picObj_dijia = picDataObj["dijia" + type.substr(type.length - 1, 1)];
                    dijiaDot = el;

                    var posData_dijia = dijiaDot.data("posData");
                    x = parseInt(posData_dijia.split("_")[0]) - picObj_dijia.w / 2;
                    y = parseInt(posData_dijia.split("_")[1]) + parseInt(posData_dijia.split("_")[2]) + 5;

                    paper.forEach(function (el2) {
                        if (el2.data("elementType") && el2.data("elementType") == ("dot_junjia" + type.substr(type.length - 1, 1))) {
                            junjiaDot = el2;
                            //break;
                        }
                    })

                    if (junjiaDot) {
                        tempy = parseInt(junjiaDot.data("posData").split("_")[1]);
                        if (tempy > parseInt(posData_dijia.split("_")[1])) {
                            y = parseInt(posData_dijia.split("_")[1]) - parseInt(posData_dijia.split("_")[2]) - picObj_dijia.h - 5;
                            picObj_dijia = picDataObj["dijia" + (parseInt(type.substr(type.length - 1, 1)) + 6)];
                        }
                    }

                    clipImage(picUrl, picObj_dijia.x, picObj_dijia.y, picObj_dijia.w, picObj_dijia.h, x, y, picWidth, picHeight).hide().data("elementType", "tip_" + type.substr(type.length - 1, 1));
                }
            }
        })
    }
    //显示价格提示信息
    function showTip(type) {
        //hideTip();
        //paper.forEach(function (element) {

            //if (element.data("elementType") == ("tip_" + type.substr(type.length - 1, 1))) {
               // element.show();
            //}
       // });
        //showDotAni(type);
    }
    //隐藏价格
    function hideTip() {

        paper.forEach(function (element) {
            if (element.data("elementType") && element.data("elementType").indexOf("tip_") != -1) {
                element.hide();
            }
        });
        resetAniDot();
    }

    var ani_dotSet = paper.set();
    //画点函数
    function dot(type, xpos, ypos, radius, color) {
        var elementType = "dot_" + type;
        var strokeWidth = 2;

        elementTypeAni = "aniDot_" + type;
        var tempX = xpos;
        var tempY = ypos;
        if (Raphael.vml) {
            tempX = xpos + 3 * scaleFactor;
            tempY = ypos + 3 * scaleFactor;
        }
        var aniCircle = paper.circle(tempX, tempY, radius).data("elementType", elementTypeAni).attr({ "fill": color, "stroke-width": 0, "stroke-opacity": 0, "fill-opacity": 0 });
        ani_dotSet.push(aniCircle);
        //outer dot
        paper.circle(xpos, ypos, radius + 4).attr({ "fill": "#fff", "stroke-width": 0, "stroke-opacity": 0 });

        var circle = paper.circle(xpos, ypos, radius)
			.data("elementType", elementType)
			.data("posData", xpos + "_" + ypos + "_" + radius)
			.attr({ "fill": "#fff", "stroke": color, "stroke-width": strokeWidth });


        return circle;
    }
    //当鼠标移上后显示点的动画
    function showDotAni(type) {
        paper.forEach(function (e) {
            if (e.data("elementType")) {
                if (e.data("elementType") == "aniDot_junjia" + type.substr(type.length - 1, 1) || e.data("elementType") == "aniDot_dijia" + type.substr(type.length - 1, 1)) {
                    if (e.attr("fill-opacity") != 0) return;
                    e.attr("fill-opacity", 1);
                    e.animate({ "transform": "s3.5", "fill-opacity": 0.4 }, 50, "linear");
                }

                var color;
                if (type.indexOf("junjia") != -1) {
                    color = priceConfig.junjiaColor;
                } else if (type.indexOf("dijia") != -1) {
                    color = priceConfig.dijiaColor;
                }
                if (e.data("elementType") == "dot_junjia" + type.substr(type.length - 1, 1) || e.data("elementType") == "dot_dijia" + type.substr(type.length - 1, 1)) {
                    if (e.data("elementType").indexOf("junjia") != -1) {
                        e.attr("fill", "#0F2137").attr("stroke", "#0F2137");
                    } else if (e.data("elementType").indexOf("dijia") != -1) {
                        e.attr("fill", "#4D2A00").attr("stroke", "#4D2A00");
                    }
                }
            }
        })
    }
    //重置点
    function resetAniDot() {
        paper.forEach(function (e) {
            if (e.data("elementType") && e.data("elementType").indexOf("aniDot_") != -1) {
                e.stop();
                e.attr({ "fill-opacity": 0, "transform": "s1" });
            }
            if (e.data("elementType") && e.data("elementType").indexOf("dot_") != -1) {
                var color;
                var type = e.data("elementType");
                if (type.indexOf("junjia") != -1) {
                    color = priceConfig.junjiaColor;
                } else if (type.indexOf("dijia") != -1) {
                    color = priceConfig.dijiaColor;
                }

                e.attr("fill", "#fff").attr("stroke", color);
            }
        })
    }
    //右侧价格文字说明
    function drawInfo() {
        if (ifHaveCurve) {
            //厂商指导价
            var offset = 6;
            if (Raphael.vml) offset += 2;

            var minVerGap = 20;

            var zhidaox = priceConfig.mainX + priceConfig.mainWidth + 0.5 + 5;
            var zhidaoy = zhidaojiaDataArr[0].y;

            drawInfoGroup(zhidaox, zhidaoy, "厂商指导价", "厂商公布的此车建议零售价格。", zhidaox - 200 + 87, zhidaoy + 7, "zhidao_info");

            var junjiax = zhidaox;
            var junjiay;
            for (var i = (junjiaDataArr.length - 1) ; i >= 0; i--) {
                var tobj = junjiaDataArr[i];
                if (tobj.draw == 1) {
                    junjiay = tobj.y;
                    break;
                }
            }
            if (Math.abs(junjiay - zhidaoy) < minVerGap) {
                if (junjiay < zhidaoy) {
                    junjiay = zhidaoy - minVerGap;
                } else {
                    junjiay = zhidaoy + minVerGap;
                }
            }

            drawInfoGroup(junjiax, junjiay, "市场报价", "根据各汽车网站发布的经销商公开|售价计算得出。", junjiax - 200 + 75, junjiay + 7, "junjia_info");

            var dijiax = zhidaox;
            var dijiay;
            for (var j = (dijiaDotDataArr.length - 1) ; j >= 0; j--) {
                var tobj = dijiaDotDataArr[j];
                if (tobj.draw == 1) {
                    dijiay = tobj.y;
                    break;
                }
            }
            if (Math.abs(dijiay - junjiay) <= minVerGap) {
                dijiay = junjiay + minVerGap;
            } else if (Math.abs(dijiay - zhidaoy) <= minVerGap) {
                dijiay = zhidaoy + minVerGap;
            }

            var areaLabel = "全国";
            if (paramObj.useNation.toString() === "0") {
                areaLabel = "本地";
            }

            drawInfoGroup(dijiax, dijiay, "惠买车底价", "根据惠买车近期成交底价计算|" + areaLabel + "的平均底价。", dijiax - 200 + 87, dijiay + 7, "dijia_info");

            //draw dot line
            var startx;
            var starty;

            for (var m = (junjiaDataArr.length - 1) ; m >= 0; m--) {
                var tobj = junjiaDataArr[m];
                if (tobj.draw == 1) {
                    startx = tobj.x + priceConfig.dotRadius;
                    starty = tobj.y;
                    break;
                }
            }

            var endx = priceConfig.mainX + priceConfig.mainWidth;
            var endy = junjiay;
            var junjiaDotLinePath = "M" + startx + " " + starty + " L" + endx + " " + endy;
            paper.path(junjiaDotLinePath).attr("stroke", priceConfig.junjiaColor).attr("stroke-dasharray", "- ").attr("stroke-width", "2");

            for (var n = (dijiaDotDataArr.length - 1) ; n >= 0; n--) {
                var tobj = dijiaDotDataArr[n];
                if (tobj.draw == 1) {
                    startx = tobj.x + priceConfig.dotRadius;
                    starty = tobj.y;
                    break;
                }
            }

            endx = priceConfig.mainX + priceConfig.mainWidth;
            endy = dijiay;
            var dijiaDotLinePath = "M" + startx + " " + starty + " L" + endx + " " + endy;
            paper.path(dijiaDotLinePath).attr("stroke", priceConfig.dijiaColor).attr("stroke-dasharray", "- ").attr("stroke-width", "2");
        } else {

            var areaLabel = "全国";
            if (paramObj.useNation.toString() === "0") {
                areaLabel = "本地";
            }

            var x = priceConfig.mainX + priceConfig.mainWidth + 10;
            var y = priceConfig.mainY + 78;
            drawInfoGroup(x, y, "厂商指导价", "厂商公布的此车建议零售价格。", x - 200 + 87, y + 7, "zhidao_info");

            y += 40;
            drawInfoGroup(x, y, "市场报价", "根据各汽车网站发布的经销商公开|售价计算得出。", x - 200 + 75, y + 7, "junjia_info");

            y += 40;
            drawInfoGroup(x, y, "惠买车底价", "根据惠买车近期成交底价计算的|" + areaLabel + "平均底价。", x - 200 + 87, y + 7, "dijia_info");

        }
    }
    //显示价格文字说明
    function drawInfoGroup(x, y, title, tipContent, infox, infoy, type) {
        var offset = 6;
        if (Raphael.vml) offset += 2;

        var xoffset = 0;
        if (isChrome()) xoffset += 4;

        var minVerGap = 50;
        var color = "#878787";
        var temp = 0;
        if (type == "junjia_info") {
            color = priceConfig.junjiaColor;
            temp = -12;
        } else if (type == "dijia_info") {
            color = priceConfig.dijiaColor;
        }

        paper.text(x, y, title).attr({ "text-anchor": "start", "font-size": 12, "font-family": "Microsoft YaHei", "fill": color });
        var infoIcon = drawInfoIcon(x + 63 + temp + xoffset, y - offset);
        infoIcon.mouseover(function () {
            showInfo(infox, infoy, tipContent, type);
        }).mouseout(function () {
            hideInfo();
        })
    }
    //价格文字的icon
    function drawInfoIcon(x, y) {
        infoIcon = paper.image(paramObj.configIconUrlPre + "icon_large.png", x + 2, y, 13, 12);
        return infoIcon;
    }
    //绘制价格文字的说明
    function prepareInfo(x, y, content, type) {
        var picObj = picDataObj.infoBg;

        var bg = paper.image(paramObj.configIconUrlPre + "info_large.png", x - 5, y, 208, 70).data("elementType", type);

        var arr = content.split("|");
        for (var i = 0; i < arr.length; i++) {
            var tempContent = arr[i];
            var t = paper.text(x + 10, y + 30 + i * 20, tempContent).data("elementType", type).attr({ "text-anchor": "start", "fill": "#000", "font-size": 12, "font-family": "Microsoft YaHei" });
        }

    }
    //显示价格文字的说明
    function showInfo(x, y, content, type) {
        var xoffset = 0;
        if (isChrome()) xoffset += 4;

        prepareInfo(x + xoffset, y, content, type);
    }
    //隐藏价格文字的说明
    function hideInfo() {
        paper.forEach(function (e) {
            if (e.data("elementType") && e.data("elementType").indexOf("_info") != -1) {
                e.hide();
            }
        })
    }
    //画点
    function drawDot() {
        dotSet = paper.set();

        var drawWidth = canvasWidth - columnLeftMargin - columnRightMargin;
        var ypos = canvasHeight - bottomHeight;
        for (var i = dotArray.length - 1; i >= 0; i--) {
            var obj = dotArray[i];
            if (obj.xpos < 0 || obj.xpos > 100) continue;
            if (obj.type == "ref") {
                refDotx = columnLeftMargin + drawWidth * obj.xpos / 100;
                refDoty = ypos;
                dot(obj.type, refDotx, ypos, priceConfig.dotRefRadius, priceConfig.dotRefColor);
            } else {
                if (obj.type == "low") {
                    lowDotx = columnLeftMargin + drawWidth * obj.xpos / 100;
                    lowDoty = ypos;
                }
                dot(obj.type, columnLeftMargin + drawWidth * obj.xpos / 100, ypos, priceConfig.dotRadius, priceConfig.dotColor);
            }
        }
    }
    //从大的资源图片得到要显示的区域
    function clipImage(src, xInImage, yInImage, clipWidth, clipHeight, showX, showY, imageWidth, imageHeight) {
        showX = parseInt(showX);
        showY = parseInt(showY);
        var elem;
        if (isChrome()) {
            elem = getImage_chrome(xInImage, yInImage, clipWidth, clipHeight, showX, showY);
            return elem;
        } else {

            var clipRect = showX + "," + showY + "," + clipWidth.toString() + "," + clipHeight.toString();

            elem = paper.image(src, 0, 0, imageWidth, imageHeight);
            return elem.attr({ "x": showX - xInImage, "y": showY - yInImage, "clip-rect": clipRect });
        }
        return null;
    }

    function strToJson(str) {
        var json = eval('(' + str + ')');
        return json;
    }

    //输出文字内容
    function exportTextDes(msg) {
        var styleString = "position: relative; top: " + (canvasHeight - 12) / 2 + "px;font-family:Microsoft YaHei;"
        var msgEle = "<div style='height:" + canvasHeight + "px'><font color='#484848' size='3' style='" + styleString + "'>" + msg + "</font><div>"
        // var imageEle = "<img src='" + imageUrl + "' style='"+ styleString +"'/>";
        document.getElementById(paramObj.holderId).innerHTML = msgEle;
    }

    function doLog(errMsg) {
        return;
        var url = logUrl + errMsg;

        LoadJs(url, "logJs");
    }

    /////不需要交互，显示静态图片
    function showStaticImage() {
        var picName;
        if (paramObj.version == "vlarge") {
            versionDescribe = "600340";
            picName = "small.png";
        } else if (paramObj.version == "vsmall") {
            versionDescribe = "380210";
            picName = useLocalId + "_" + paramObj.carId + "_" + versionDescribe + ".png";
        }

        var picUrl = picPreUrl.toString() + paramObj.carId.toString() + "/" + picName;

        var imageDom = "<img src='" + picUrl + "'/>";
        document.getElementById(paramObj.holderId).innerHTML = imageDom;
    }

    function getVersionNo() {
        var myDate = new Date();
        var curTimeStr = myDate.getFullYear().toString() + (myDate.getMonth() + 1).toString() + myDate.getDate().toString() + myDate.getHours().toString();//获取当前时间  
        return curTimeStr;
    }

    //js 实现跨域加载
    function LoadJs(url, jsId, successCallBack, faileCallback) {
        try {
            var jsDom = document.createElement("script");
            jsDom.setAttribute("type", "text/javascript")
            jsDom.setAttribute("src", url);
            jsDom.setAttribute("id", jsId);
            var headDom = document.getElementsByTagName('head')[0];
            RemoveDom(jsId);
            headDom.appendChild(jsDom);
            if (document.all) {
                jsDom.onreadystatechange = function () {
                    if (this.readyState == "complete" || this.readyState == "loaded") {
                        try {
                            if (successCallBack) successCallBack();
                        } catch (e) {
                            setTimeout(function () {
                                RemoveDom(jsId);
                                headDom.appendChild(jsDom);
                            }, 2000);
                        }
                    }
                };
            } else {
                jsDom.onload = function () {
                    if (successCallBack) successCallBack();
                };
            }
        } catch (e) {
            if (faileCallback) faileCallback();
        }
    }
    function RemoveDom(id) {
        var head = document.getElementsByTagName('head')[0];
        if (document.getElementById(id)) {
            head.removeChild(document.getElementById(id));
        }
    }

    function isChrome() {
        return navigator.userAgent.indexOf("Chrome") > -1;
    }
    //如果是chrome浏览器，通过canvas从大的资源图片获得要显示的区域
    function getImage_chrome(fromx, fromy, clipWidth, clipHeight, targetx, targety) {
        var canvas = document.createElement("canvas");
        canvas.width = clipWidth;
        canvas.height = clipHeight;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(chromeTempImg, fromx, fromy, clipWidth, clipHeight, 0, 0, clipWidth, clipHeight);
        var dataURL = canvas.toDataURL("image/png");

        //var temp = dataURL.replace(/^data:image\/(png|jpg);base64,/, "")
        var elem = paper.image(dataURL, targetx, targety, clipWidth, clipHeight)
        return elem;
    }
}