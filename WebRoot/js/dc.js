//0.042
//0.041
//CIG DC
var _dc_cm_time = 432000;//5days 432000 500days 43200000
var _dc_pc_kg = 0;//0关 1开
var _dc_scd_host = "scd.dc.ctags.cn";
    _dc_scd_host = "scddc.ctags.cn";
//var _dc_cm_host = "scd.dc.cig.com.cn";
var _dc_log_host = "dclog.dc.ctags.cn"; //dclog.cig.com.cn dclog.dc.ctags.cn
	_dc_log_host = "dclog.cig.com.cn";
	_dc_log_host = "scddc.ctags.cn";
var _dc_pc_host = "pc.dc.cig.com.cn"; //pc.dc.cig.com.cn pc.dc.ctags.cn
	_dc_pc_host = "pc.dc.ctags.cn";
	_dc_pc_host = "scddc.ctags.cn";
var _dc_ev_host = "ev.dc.ctags.cn"; //    http://ev.dc.ctags.cn/    http://dclog.dc.ctags.cn
    _dc_ev_host = "evdc.ctags.cn";
var _dc_ev_gif = "/_ev.gif";
	_dc_ev_gif = "/_ev.php";
	
var _dc_script=document.getElementsByTagName("script");var _dc_aid = 0;for (i = 0; i < _dc_script.length; i++) {if(_dc_script[i].src.indexOf("dc.js") >1){var _dc_aParams = _dc_script[i].src.split('?');if(_dc_aParams[1]>0 && _dc_aParams[1] <100000){_dc_aid = _dc_aParams[1];}}}
var _dc_r=Math.round(Math.random()*9999);
var _dcv = _dcv || [];
_dcv.push(['_setAccount', _dc_aid]);
_dcv.push(['_setRand',_dc_r]);
_dcv.push(['_trackPageview']);
var _dc_string2=''; 

(function() {
    /*
        2013-08-14 09:32 0.004 dm_uid to 16jinzhi,32wei
        2013-09-05 15:06 0.005 dcbitautousername
        2013-09-11 18:36 0.006 _arrAdKeys new Array() to {}
        2013-09-12 10:57 0.007 默认用主域 _dc_domain &dcd= | &dcbtun= +dcbitautousername;|col_CIGDCID = _wc("CIGDCID", col_data[11], 2);
        2013-09-12 12:34 0.008 晶赞 cookie mapping 新意 cookie mapping
        2013-10-08 17:01 0.009 col_data[11] = uid;
        2013-10-09 17:40 0.010 scd.php
        2013-10-10 10:11 0.011 scd.php每5天一次
        2013-10-10 10:52 0.012 if(uid){col_data[11] = uid;}
		2013-12-05 13:32 0.013 易车title特殊处理，特么太长了 if (_dc_domain=='bitauto.com') {_dc_dt = '';}
		2014-01-07 14:47 0.014 _dc_gif = "/_ev.gif";
		2014-04-24 10:32 0.015 CIGDCAD CIGDCSE
		2014-05-16 10:32 0.016 抓取TDK，抓取经销商、车型 dcbtml dcbt4s dcbterr
		2014-06-06 13:24 0.017 _dc_pc_kg = 0;//0关 1开
		2014-06-12 11:51 0.018 var _dc_scd_host = "scd.dc.cig.com.cn";
		2014-06-13 10:26 0.019 _dc_se 21-35
		2014-06-17 17:23 0.020 col_CIGDCID = _wc("CIGDCID", col_data[11], 2);
		2014-06-17 17:23 0.021 var _dc_string2='';
		2014-09-30 11:04 0.022 _dc_string += "&dcxc_id=" +XCWEBLOG_ID;
		2014-11-03 15:09 0.023 kill deler.bitauto.com
		2014-11-03 15:09 0.024 dckw dcdp dcdt
		2014-11-03 15:09 0.025 _dc_string2=_dc_string+'&'+_dc_tdk; kill _dc_tdk
		2015-01-04 09:51 0.026 var _dc_host = _dc_log_host; var _dc_pc_host = "pc.dc.cig.com.cn";
		2015-01-13 16:04 0.027 var _dc_ev_host = "dclog.dc.ctags.cn";  var _dc_ev_gif = "/_ev.gif";
		2015-03-10 10:38 0.027 delete URLParams add haosou
		2015-03-10 10:43 0.028 _arrAdKeys['rfpa_source'] = '';
		2015-09-08 14:23 0.029 rfpa_tracker
		2015-09-08 14:23 0.030 cta_p
		2015-09-08 14:23 0.031 virtualPage
		2016-03-30 11:56 0.032 dma 临时
		2016-05-12 15:50 0.033 kill dm_uid ，修改三方cookie逻辑，及cm逻辑
		2016-05-24 11:26 0.034 update scd domain
		2016-06-01 17:36 0.035 _setCustomVar
		2016-09-06 15:10 0.036 内部引流，添加初试来源；记录易车userid
		2016-09-23 11:14 0.037 &dccta_pbe= 记录点击来源信息
		2016-11-24 15:52 0.038 ref from tracker_u 记录，访次内有效
		2016-12-27 15:32 0.039 add wt.mc_id Ref, del _dc_cm,兼容https
		2017-03-13 15:20 0.040 老访客标识 dcisnw
		2017-04-26 11:06 0.041 自定义变量做去重处理
		2017-06-04 20:59 0.042 col_search = _wc("rfpa_trackerbe", _arrAdIn['rfpa_tracker'], 1);
    */
    var _dc_jsv = "0.042";
    var _dc_host = _dc_log_host;
    var _dct = '1';
    var _dc_date = new Date();
    var _dc_now = Math.round(_dc_date.getTime() / 1000);
    var ec,
    el,
    eo,
    ev;
    var evar = [];
    var ttt = '';
    var _dc_gif = "/_dc.gif";
    var _dc_var = "_dcv";
    var rand = Math.round(Math.random() * 9999),
    did;
    var uid = '';
    var _dlprotocol = document.location,
    _dc_dc = document,
    _dc_split = "|",
    _dc_split2 = "[]";
    var ph = get_ph(_dlprotocol.href);
    this.cst = 18E5;
    this.ct = 63072E6;
    this._transvar = '';
    this._setvars = Array(5);
    _transvars = Array(10);
    if ("https:" == _dlprotocol.protocol) {
        _dc_host = "https://" + _dc_host;
        _dc_ev_host = "https://" + _dc_ev_host;
        _dc_scd_host = "https://" + _dc_scd_host;
        _dc_pc_host = "https://" + _dc_pc_host;
    } else {
        _dc_host = "http://" + _dc_host;
        _dc_ev_host = "http://" + _dc_ev_host;
        _dc_scd_host = "http://" + _dc_scd_host;
        _dc_pc_host = "http://" + _dc_pc_host;
    }
    var _dc_r = "";
    var _dc_url = dm_url();
    var _dc_domain = dm_domain();
    _dc_this_domain = _dc_domain;
    
    var _dccv_3;//自定义变量临时变量

    //2013-09-12 默认用主域
    var _dc_arrDomain = Array('com.cn','org.cn','com','cn','name','org','net');
    for (i = 0; i < _dc_arrDomain.length; i++) {
        if(_dc_domain.indexOf(_dc_arrDomain[i])>1){
            var _dc_t = _dc_domain.replace("."+_dc_arrDomain[i],"");
            _dc_domain = _dc_t.substr(_dc_t.lastIndexOf(".")+1)+"."+_dc_arrDomain[i];
            break;
        }
    }

    var _dc_cookie = 1;
    var _dc_3_cookie;
    var _dc_se = new Array();
    var _dc_sk = new Array();
    var rfParams = new Array();
    var _arrAdIn = {};
    _arrAdIn['rfpa_tracker'] = '';
    _arrAdIn['cta_p'] = '';
    _arrAdIn['CIGDCID'] = '';
    _arrAdIn['ref'] = '';
    _arrAdIn['Ref'] = '';
    _arrAdIn['from'] = '';
    _arrAdIn['tracker_u'] = '';
    
    // http://ctags.cn/test/ruankao.html?wt.mc_id=1&WT.mc_id=2&utm_source=2.1&rfpa_source=2.2&rfpa_tracker=3&cta_p=4&CIGDCID=4&ref=4&Ref=4&from=4&tracker_u=4

    var _arrAdKeys = {};
    _arrAdKeys['utm_campaign'] = '';
    _arrAdKeys['utm_source'] = '';
    _arrAdKeys['utm_content'] = '';
    _arrAdKeys['utm_medium'] = '';
    _arrAdKeys['WT.mc_id'] = '';
    _arrAdKeys['wt.mc_id'] = '';//2016-12-27
    _arrAdKeys['rfpa_source'] = '';
    var aParams = _dlprotocol.search.substr(1).split('&');
    for (i = 0; i < aParams.length; i++) {
        var aParam = aParams[i].split('=');
        for (_AdKey in _arrAdKeys) {
            if (aParam[0] == _AdKey && aParam[1] != 'undefined') {
                _arrAdKeys[_AdKey] = aParam[1];
            }
        }
        for (_AdKey in _arrAdIn) {
            if (aParam[0] == _AdKey && aParam[1] != 'undefined') {
                _arrAdIn[_AdKey] = aParam[1];
                _arrAdKeys[_AdKey] = aParam[1];//2016-12-27
            }
        }
        aParam = null
    }
    aParams = null;

    _dc_se[0] = "google";
    _dc_sk[0] = "q";
    _dc_se[1] = "baidu";
    _dc_sk[1] = "wd";
    _dc_se[2] = "baidu";
    _dc_sk[2] = "word";
    _dc_se[3] = "cn.yahoo";
    _dc_sk[3] = "p";
    _dc_se[4] = "yahoo";
    _dc_sk[4] = "p";
    
    //tengxun
    _dc_se[5] = "soso";
    _dc_sk[5] = "query";
    
    _dc_se[6] = "live";
    _dc_sk[6] = "q";
    _dc_se[7] = "3721";
    _dc_sk[7] = "p";
    _dc_se[8] = "3721";
    _dc_sk[8] = "name";
    _dc_se[9] = "sogou";
    _dc_sk[9] = "query";
    
    //https://www.search.com/web?q=%E6%98%93%E8%BD%A6&qo=homeSearchBox&qsrc=&ot=organic
    _dc_se[10] = "search";
    _dc_sk[10] = "q";
    
    _dc_se[11] = "163";
    _dc_sk[11] = "q";
    
    //http://search.aol.com/aol/search?s_chn=prt_video-trap-test-g&q=%E6%98%93%E8%BD%A6&s_it=comsearch
    _dc_se[12] = "aol";
    _dc_sk[12] = "query";
    _dc_se[13] = "tom";
    _dc_sk[13] = "word";
    _dc_se[14] = "zhongsou";
    _dc_sk[14] = "word";
    _dc_se[15] = "114.vnet";
    _dc_sk[15] = "kw";
    _dc_se[16] = "netscape";
    _dc_sk[16] = "query";
    _dc_se[17] = "cnn";
    _dc_sk[17] = "query";
    _dc_se[18] = "ask";
    _dc_sk[18] = "q";
    
    //http://search.lycos.com/web/?q=%E6%98%93%E8%BD%A6&keyvol=0099b1f2e17bc9703496
    _dc_se[19] = "lycos";
    _dc_sk[19] = "query";
    
    _dc_se[20] = "bing";
    _dc_sk[20] = "q";
    
    //http://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q=%E6%98%93%E8%BD%A6
    _dc_se[21] = "so";
    _dc_sk[21] = "q";

    //etao
    _dc_se[22] = "etao";
    _dc_sk[22] = "q";

    //http://www.youdao.com/search?q=%E6%98%93%E8%BD%A6&ue=utf8&keyfrom=web.index.suggest
    _dc_se[23] = "youdao";
    _dc_sk[23] = "q";

    //soku
    _dc_se[24] = "soku";
    _dc_sk[24] = "keyword";

    //http://doc.mbalib.com/search?q=%E9%9A%86%E9%91%AB
    _dc_se[25] = "mbalib";
    _dc_sk[25] = "q";

    //http://caigou.makepolo.com/spc_new.php?search_flag=0&q=%E9%9A%86%E9%91%AB
    _dc_se[26] = "makepolo";
    _dc_sk[26] = "q";

    //http://www.youboy.com/spro?kw=%u9686%u946B
    _dc_se[27] = "youboy";
    _dc_sk[27] = "kw";
    
    //http://i.easou.com/s.m?idx=1&sty=1&q=%E6%98%93%E8%BD%A6&ch_pad=%E6%90%9C+%E7%B4%A2&prefix=100&cid=paw&fr=9.1005.2.2&esid=Ga1DH-7zN3v&wver=dsp
    _dc_se[28] = "easou";
    _dc_sk[28] = "q";
    
    //http://search.b2b.cn/product/?k=%D2%D7%B3%B5
    _dc_se[29] = "b2b";
    _dc_sk[29] = "k";
    
    //http://www.51sole.com/s.aspx?q=%E6%98%93%E8%BD%A6
    _dc_se[30] = "51sole";
    _dc_sk[30] = "q";
    
    //http://search.114chn.com/SearchResult.aspx?key=%E6%98%93%E8%BD%A6&type=1
    _dc_se[31] = "114chn";
    _dc_sk[31] = "key";
    
    //http://www.zhongsou.com/third.cgi?w=%D2%D7%B3%B5&kid=&y=5&stag=1&dt=0&pt=0
    _dc_se[32] = "zhongsou";
    _dc_sk[32] = "w";
    
    //http://search.jqw.com/s1.aspx?keyword=%D2%D7%B3%B5&page=1
    _dc_se[33] = "jqw";
    _dc_sk[33] = "keyword";
    
    //http://www.258.com/s?q=%E6%98%93%E8%BD%A6&w=
    _dc_se[34] = "258";
    _dc_sk[34] = "q";
    
    //http://www.roboo.com/search.htm?word=%E6%98%93%E8%BD%A6
    _dc_se[35] = "roboo";
    _dc_sk[35] = "word";
    
    //http://www.haosou.com/s?ie=utf-8&shb=1&src=360sou_newhome&q=yiche
    _dc_se[36] = "haosou";
    _dc_sk[36] = "q";
    
    //http://m.sm.cn/s?q=%E6%98%93%E8%BD%A6&from=smor&safe=1&snum=0
    _dc_se[37] = "sm";
    _dc_sk[37] = "q";
    
    function _setDomainName(s) {
        var a = _dc_domain.indexOf(s);
        var t = a + s.length;
        ttt = a + ' ' + s.length + ' ' + t + ' ' + _dc_domain.length;
        if (t == _dc_domain.length) {
            _dc_domain = s
        } else {}
    }
    function _delDomainName() {
        _dc_domain = _dc_dc.domain
    }

    function _dc(n) {
        var e;
        date = new Date();
        e = new Date(date.getTime() - 1);
        e = " expires=" + e.toGMTString() + ";";
        document.cookie = n + "=;path=/;" + e + "domain=" + _dc_domain + ";";
        return
    }
    function _ues(c) {
        if (typeof(decodeURIComponent) == 'function') {
            return decodeURIComponent(c)
        } else {
            return unescape(c)
        }
    }
    function _es(c) {
        if (typeof(encodeURIComponent) == 'function') {
            return encodeURIComponent(c)
        } else {
            return escape(c)
        }
    }
    function _rc(n) {
        var arr = document.cookie.match(new RegExp("(^| )" + n + "=([^;]*)(;|$)"));
        if (arr != null) {
            return _ues(arr[2])
        }
        return null
    }
    function _wc(n, v, t) {
        var exp,
        r;
        var date = new Date();
        if (t == 0) {
            date.setTime(date.getTime() - 1);
            exp = "expires=" + date.toGMTString() + ";"
        } else if (t == 1) {
            exp = ""
        } else if (t == 2) {
            date.setTime(date.getTime() + ct * 10);
            exp = "expires=" + date.toGMTString() + ";"
        } else if (t == 3) {
            date.setTime(date.getTime() + cst);
            exp = "expires=" + date.toGMTString() + ";"
        } else if (t > 100) {
            date.setTime(date.getTime() + t);
            exp = "expires=" + date.toGMTString() + ";"
        }
        document.cookie = n + "=" + _es(v) + ";path=/;" + exp + "domain=" + _dc_domain + ";";
        r = _rc(n);
        if (r != v) {
            _dc(n);
            return 0
        };
        return 1
    }
    function slog(url) {
        var n = "t_" + (new Date()).getTime() + Math.random() * 9999;
        var c = window[n] = new Image(1, 1);
        c.onload = (c.onerror = function() {
            window[n] = null
        });
        c.src = url;
        url = null;
        n = null;
        c = null
    }
    function _setRand(n) {
        rand = n;
    }
    function _setUid(n) {
        uid = n;
    }
    function _set3C(n) {
        var col_s = _wc("_dc3c", n, 2);
    }
    function _trackPageview(virtual_path) {
    	
    
        var _dc_dt = dm_dt();
        var is_virtual_path = 0;
        if (typeof virtual_path == "undefined" || !virtual_path || virtual_path == "") {
            virtual_path = ""
        } else {
            virtual_path = get_ph(virtual_path);
            virtual_path = _es(virtual_path);
            ph = virtual_path;
            _dc_dt = '';
            is_virtual_path = 1
        }
        if (!did) {
            return
        }

        var _dcacc = '';
        var _dc_bt = 0;
        var _dc_tp = 0,

        _dc_ts = 0,
        _dc_va = "",
        _dc_vb = "",
        _dc_vc = "",
        _dc_vd = "",
        _dc_rf = "",
        _dc_rff = "";
        var _dc_r_domain = "";
        var _dc_init = 0;
        var p,
        p1,
        p2,
        p3,
        p4,
        p5,
        t,
        t1;
        var isI = 0;
        _dc_r = dm_r();
        _dc_rf = dm_rf(virtual_path);
        if (virtual_path) {
            //virtual_path = "http://" + virtual_path
        }
        _dc_r_domain = getDomain(_dc_r);
        p = _dc_r.indexOf("/");
        p1 = p;
        if (p < 0) {
            p = _dc_r.length
        }
        t = _dc_r.indexOf(_dc_domain);
        if ((t > -1) && t + _dc_domain.length == p) {
            _dc_r = ""
        }
        if (_dc_domain == _dc_r_domain || _dc_domain == "." + _dc_r_domain) {
            _dc_r = ""
        }
        if (_dc_r) {
            _dc_tp = 1;
            if (p1 < 0) {
                _dc_va = _dc_r;
                _dc_vb = ""
            } else {
                _dc_va = _dc_r.substring(0, p1);
                _dc_vb = _dc_r.substring(p1, _dc_r.length)
            }
        }
        var _dc_search = '';
        var _dc_search_a = '';
        var _dc_search_b = '';
        for (var i = 0; i < _dc_se.length; i++) {
            if (_dc_va.indexOf("." + _dc_se[i] + ".") > -1) {
                if (_dc_vb.indexOf("&" + _dc_sk[i] + "=") > -1) {
                    _dc_search_a = _dc_se[i];
                    p2 = _dc_vb.indexOf("&" + _dc_sk[i] + "=");
                    p3 = _dc_vb.indexOf("&", p2 + 1);
                    if (p3 < 0) {
                        p3 = _dc_vb.length
                    }
                    _dc_search_b = _dc_vb.substring(p2 + _dc_sk[i].length + 2, p3);
                    _dc_search_b = _dc_search_b.substring(0, 511)
                } else if (_dc_vb.indexOf("?" + _dc_sk[i] + "=") > -1) {
                    _dc_search_a = _dc_se[i];
                    p2 = _dc_vb.indexOf("?" + _dc_sk[i] + "=");
                    p3 = _dc_vb.indexOf("&", p2 + 1);
                    if (p3 < 0) {
                        p3 = _dc_vb.length
                    }
                    _dc_search_b = _dc_vb.substring(p2 + _dc_sk[i].length + 2, p3);
                    _dc_search_b = _dc_search_b.substring(0, 511)
                }
                if (_dc_search_a && _dc_search_b) {
                    _dc_tp = 2;
                    _dc_search = _es(_dc_search_a) + '|' + _es(_dc_search_b)
                }
            }
        }
        
        //先获取cookie里的dcad
        try{
	        var _dctmp = _rc("dcad" + did);
	        if(_dctmp){
	        	var _dctmp_data = _dctmp.split('|');
		        for (_dctmp_dataInfo in _dctmp_data) {
		        	if(_dctmp_data[_dctmp_dataInfo]){
		        		var _dctmp_dataInfoArr = _dctmp_data[_dctmp_dataInfo].split(':');
			        	if(_dctmp_dataInfoArr[0] && _dctmp_dataInfoArr[1]){
			        		if(!_arrAdKeys[_dctmp_dataInfoArr[0]]){
			        			_arrAdKeys[_dctmp_dataInfoArr[0]] = _dctmp_dataInfoArr[1];
			        		}
			        	}
		        	}
		        }
	        }
		}catch(err){}
         
        var _dc_cad = '';
        var aevar = [];
        for (_AdKey in _arrAdKeys) {
            if (_arrAdKeys[_AdKey].length > 0) {
                aevar.push(_es(_AdKey) + ':' + _es(_arrAdKeys[_AdKey]));
            }
        }
        if (aevar.length > 0) {
            _dc_cad = aevar.join('|');
            //_dc_tp = 3
        }

        var cot = "",
        cot_s = 0,
        cot_data = new Array(),
        col = "",
        col_s = 0,
        col_data = new Array();
        if (!_dc_init) {
            col = _rc("dm" + did);
            if (!col) {
                _dc_init = 1
            } else {
                col_data = col.split(_dc_split);
                if (_rc("dmts" + did) && _rc("dmt" + did)) {
                    cot = _rc("dmt" + did)
                } else {
                    cot = ""
                }
                _dc_rff = _rc("dm_rff" + did);
                if (!_dc_rff) {
                    _dc_rff = ''
                }
                cot_data = cot.split(_dc_split);
                if (col_data.length < 14) {
                    _dc_init = 1
                }
            }
        }
        if (_dc_init == 1) {
            col = "0" + _dc_split + _dc_now + _dc_split + _dc_tp + _dc_split + _dc_va + _dc_split + _dc_vb;
            col_data = col.split(_dc_split);
            cot_data[0] = 0;
            cot_data[1] = 0;
            col_data[0] = 0;
            col_data[1] = _dc_now;
            col_data[2] = 0;
            col_data[3] = '';
            col_data[4] = '';
            col_data[5] = '';
            col_data[6] = '';
            col_data[7] = 0;
            col_data[8] = 0;
            col_data[9] = 0;
            col_data[10] = 0;
        }
        if (!cot_data[0] || parseInt(cot_data[0]) < 1) {
            cot_data[0] = 0;
            cot_data[1] = 0;
            col_data[0] = parseInt(col_data[0]) + 1;
            if (parseInt(col_data[0]) > 1 && parseInt(col_data[1]) > 1) _dc_bt = _dc_now - parseInt(col_data[1])
        }
        if (_dct == '1') {
            cot_data[0] = parseInt(cot_data[0]) + 1
        }
        col_data[1] = _dc_now;
        if (_dc_tp && isI == 0) {
            col_data[2] = _dc_tp;
            col_data[3] = _dc_va;
            col_data[4] = _dc_vb;
            col_data[5] = _dc_vc;
            col_data[6] = _dc_vd;
            cot_data[1] = 1;
            if (_dc_ts == 0) {
                _dc_ts = 2
            }
        }
        if (cot_data[1] == 1 && _dc_ts == 0) {
            _dc_ts = 1
        }
        
/*        if (col_data[2] == '3' && _dc_ts != 2) {
            _dc_cad = _rc("dcad" + did);
            if (!_dc_cad || _dc_cad == 'undefined') {
                _dc_cad = ''
            }
        }*/
        
        if (col_data[2] == '2' && _dc_ts != 2) {
            _dc_search = _rc("dc_search" + did);
            if (!_dc_search || _dc_search == 'undefined') {
                _dc_search = ''
            }
        }
        if (cot_data[0] == 1) {
            if (col_data[0] == 1) {
                col_data[7] = _dc_now;
                _dc_rff = _es(_dc_rf) + _dc_split2 + _es(_dc_url) + _dc_split2 + _es(_dc_ts) + _dc_split2 + _es(_dc_cad)
            }
            col_data[9] = col_data[10];
            col_data[10] = _dc_now;
            if (col_data[2] && _dc_ts == 2) {
                col_data[8] = _dc_now
            }
            if (col_data[2] == 0 && _dc_ts == 0) {
                col_data[8] = col_data[7]
            }
        }
        if (!cot_data[1]) {
            cot_data[1] = 0
        }
        if (!col_data[0]) {
            col_data[0] = 1
        }
        cot_data[2] = is_virtual_path;
        cot_data[3] = ph;
        cot_data[4] = _dc_rf;
       // alert(cot_data[2]+'|'+cot_data[3]+'|'+cot_data[4])
        if (!col_data[2]) {
            col_data[2] = 0
        }
        if (!col_data[3]) {
            col_data[3] = ""
        }
        if (!col_data[4]) {
            col_data[4] = ""
        }
        if (!col_data[5]) {
            col_data[5] = ""
        }
        if (!col_data[6]) {
            col_data[6] = ""
        }
        if (!col_data[7] || col_data[7] == 'undefined') {
            col_data[7] = _dc_now
        }
        if (!col_data[8] || col_data[8] == 'undefined') {
            col_data[8] = _dc_now
        }
        if (!col_data[9] || col_data[9] == 'undefined') {
            col_data[9] = 0
        }
        if (!col_data[10] || col_data[10] == 'undefined') {
            col_data[10] = _dc_now
        }

        //没有cookie的场合
        if(_arrAdIn['CIGDCID']) {col_data[11] = _arrAdIn['CIGDCID'];}
        
        _dc_3_cookie = _rc("_dc3c");
    	
		//每访次第一个pv，做scd
    	if (cot_data[0] == 1){
    		if(uid){
    			col_data[11] = uid;
				/*    			
				if(_dc_3_cookie){
    				col_data[11] = uid;
    			}else{
    				if(!col_data[11]) col_data[11] = uid;
    			}*/
    		}else{
    			_dc_scd("&dcv=" + col_data[0] + '.' + cot_data[0]+'&dcu='+col_data[11]);
        		return;
    		}
        }
        
        //cm 如果支持第三方cookie，就做cm
/*        if(_dc_3_cookie==1){
        	var col_CIGDCSCD = _rc("CIGDCSCD");
	        if(col_CIGDCSCD < (_dc_now-_dc_cm_time)){
				_dc_cm(col_data[11]);
	        }
        }*/
	        
        col_data[12] = isI;
        if (!_dc_cad || _dc_cad == 'undefined') {
            _dc_cad = ""
        }
        if (!_dc_rff || _dc_rff == 'undefined') {
            _dc_rff = ""
        }

        cot = cot_data[0] + _dc_split + cot_data[1] + _dc_split + cot_data[2] + _dc_split + cot_data[3] + _dc_split + cot_data[4];
        cot_s = _wc("dmt" + did, cot, 1);
        cot_s = _wc("dmts" + did, 1, 3);
        col = col_data[0] + _dc_split + col_data[1] + _dc_split + col_data[2] + _dc_split + col_data[3] + _dc_split + col_data[4] + _dc_split + col_data[5] + _dc_split + col_data[6] + _dc_split + col_data[7] + _dc_split + col_data[8] + _dc_split + col_data[9] + _dc_split + col_data[10] + _dc_split + col_data[11] + _dc_split + col_data[12];
        col = col + _dc_split + '' + _dc_split + '';
        col_s = _wc("dm" + did, col, 2);
        
        //首访次来源
        //col_rff = _wc("dm_rff" + did, _dc_rff, 2);
        
        col_ad = _wc("dcad" + did, _dc_cad, 1); //访次内有效
        col_search = _wc("dc_search" + did, _dc_search, 2);
        
        col_CIGDCID = _wc("CIGDCID", col_data[11], 2);
        
        /*
        	提供给第三方读的cookie
        */
        //col_ad = _wc("CIGDCTP", col_data[2], 2);
        //col_ad = _wc("CIGDCTS", _dc_ts, 2);
        //col_ad = _wc("CIGDCAD", _dc_cad, 2);
        //col_search = _wc("CIGDCSE", _dc_search, 2);
        
        var _dc_rfpa_trackerbe = _rc("rfpa_trackerbe");//初始来源
        if(_arrAdIn['rfpa_tracker']){
        	//最终来源
        	col_search = _wc("rfpa_tracker", _arrAdIn['rfpa_tracker'], 1);
        	
        	//初始来源
        	if(!_dc_rfpa_trackerbe){
        		//col_search = _wc("rfpa_trackerbe", _arrAdIn['rfpa_tracker'], 2);
        		col_search = _wc("rfpa_trackerbe", _arrAdIn['rfpa_tracker'], 1);
        		_dc_rfpa_trackerbe = _arrAdIn['rfpa_tracker'];
        	}
        }else{
        	_arrAdIn['rfpa_tracker'] = _rc("rfpa_tracker");
        }

		var _dc_cta_pbe = _rc("cta_pbe");//初始点击
        if(_arrAdIn['cta_p']){
        	//最终点击
        	col_search = _wc("cta_p", _arrAdIn['cta_p'], 1);
        	
        	//初始点击
        	if(!_dc_cta_pbe){
        		col_search = _wc("cta_pbe", _arrAdIn['cta_p'], 2);
        		_dc_cta_pbe = _arrAdIn['cta_p'];
        	}
        }else{
        	_arrAdIn['cta_p'] = _rc("cta_p");
        }
        
        //2016-11-24 _arrAdIn['ref'] = '';
        if(_arrAdIn['Ref']){
        	_arrAdIn['ref'] = _arrAdIn['Ref'];
        }
        if(_arrAdIn['ref']){
        	col_search = _wc("_dcref", _arrAdIn['ref'], 1); //访次内有效
        }else{
        	_arrAdIn['ref'] = _rc("_dcref");
        }
        
    	//2016-11-24 _arrAdIn['from'] = '';
    	if(_arrAdIn['from']){
        	col_search = _wc("_dcfrom", _arrAdIn['from'], 1); //访次内有效
        }else{
        	_arrAdIn['from'] = _rc("_dcfrom");
        }
        
    	//2016-11-24 _arrAdIn['tracker_u'] = '';
    	if(_arrAdIn['tracker_u']){
        	col_search = _wc("_dctracker_u", _arrAdIn['tracker_u'], 1); //访次内有效
        }else{
        	_arrAdIn['tracker_u'] = _rc("_dctracker_u");
        }

        if (!cot_s || !col_s) {
            _dc_cookie = 0;
        }
        
        //新老访客标识 dcisnw
        var _dcisnw = _rc("_dcisnw");
        if(col_data[0] == 1 && cot_data[0] == 1){
        	_dcisnw = 1;
        	var myDate = new Date();
        	_wc("_dcisnw", _dcisnw, 60*1000*(1440-1-(myDate.getHours()*60+myDate.getMinutes()))); //24点前有效，传入的是到24点还有多少毫秒
        }

        //易车title特殊处理，特么太长了
        /*
        if (_dc_domain=='bitauto.com') {
            _dc_dt = '';
        }*/

        var _dc_string = '';
        _dc_string = "?JSv=" + _dc_jsv + "&dct=" + _dct + "&dcu=" + col_data[11] + "&dcac=" + did + "&dcv=" + col_data[0] + '.' + cot_data[0] + "&dcvt=" + col_data[7] + '.' + col_data[8] + '.' + col_data[9] + '.' + col_data[10] + '.' + _dc_now + '.' + rand + "&dctp=" + col_data[2] + "&dcts=" + _dc_ts + "&dcc=" + _dc_cookie + '|' + _dc_3_cookie + '|' + dm_if() + '|' + dm_sr() + '|' + dm_sc() + '|' + dm_je() + '|' + dm_ul() + '|' + dm_cs() + '|' + dm_fl();// + "&dcdt=" + _dc_dt;
        _dc_string += "&dcdt=" + _dc_dt; 
        _dc_string += "&dcrf=" + _es(_dc_rf);
       // _dc_string += "&dcrff=" + _dc_rff;
       
       //新老访客标识 dcisnw
       if(_dcisnw){
        	_dc_string += "&dcisnw=" + _dcisnw;
        }
       
        if(_arrAdIn['rfpa_tracker']){
        	_dc_string += "&dcin=" + _arrAdIn['rfpa_tracker'];
        }
        if(_dc_rfpa_trackerbe){
        	_dc_string += "&dcbe=" + _dc_rfpa_trackerbe;
        } 
        
        if(_arrAdIn['cta_p']){
        	_dc_string += "&dccta_p=" + _arrAdIn['cta_p'];
        }  
        if(_dc_cta_pbe){
        	_dc_string += "&dccta_pbe=" + _dc_cta_pbe;
        }  
        
        //2016-11-24
        if(_arrAdIn['ref']){
        	_dc_string += "&dcref=" + _arrAdIn['ref'];
        }
        if(_arrAdIn['from']){
        	_dc_string += "&dcfrom=" + _arrAdIn['from'];
        }
        if(_arrAdIn['tracker_u']){
        	_dc_string += "&dctracker_u=" + _arrAdIn['tracker_u'];
        }
        
        if (col_data[2] == 1) {
            _dc_string += "&dcr=" + col_data[3] + "|" + col_data[4]
        }
        if (_dct == '2') {
            _dc_string += "&dce=" + ec + "|" + el;
            if (eo) {
                _dc_string += "|" + eo
            }
            if (ev) {
                _dc_string += "|" + ev
            }
        } else if (_dct == '3') {
            var aevar = [];
            for (var kvar in evar) {
                aevar.push(_es(kvar) + ':' + _es(evar[kvar]));
            }
            _dc_string += "&dcev=" + aevar.join('|');
            
 			_dc_host = _dc_ev_host;
            _dc_gif = _dc_ev_gif;
        }
        if (_dc_search) {
            _dc_string += "&dcse=" + _dc_search;
        }
        if (_dc_cad) {
            _dc_string += "&dcad=" + _dc_cad;
        }
        if (_dc_domain) {
            _dc_string += "&dcd=" + _dc_domain;
        }
        if (virtual_path) {
            _dc_string += "&dxn=" + virtual_path;
        }
        
        //自定义变量 get
        var _dccv = _getCustomVar(did);
        if (_dccv) {
            _dc_string += "&dccv=" + _dccv;
        }
        
        //晶赞 cookie mapping
        /*
        if(cot_data[0] == 1){
            var col_CIGDCJZMP = _wc("CIGDCJZMP", _dc_now, 2);
            slog('http://cm.gtags.net/pixel?v=1&cig_id='+col_data[11]);
            _dc_string += "&dcjzmp=" + _dc_now;
        }*/

        //新意 cookie mapping
        /*
        if(cot_data[0] == 1){
            var col_CIGDCCIGMP = _wc("CIGDCCIGMP", _dc_now, 2);
            slog('http://dclog.cig.com.cn/_mp.gif?v=1&t='+_dc_now+'&cig_id='+col_data[11]);
            _dc_string += "&dccigmp=" + _dc_now;
        }*/

        //yiche 定制
        var _dcBtErr='';
        
        //记录易车登陆用户名
        try{
	        var dcbitautousername = _rc("username");
	        if(dcbitautousername){
	            _dc_string += "&dcbtun=" +dcbitautousername;
	        }
	        if(Bitauto.Login.result.userId){
	            _dc_string += "&dcBitauto=userId:" +Bitauto.Login.result.userId+";";
	            _dc_string += "userName:" +Bitauto.Login.result.userName+";";
	            _dc_string += "showName:" +Bitauto.Login.result.showName+";";
	            _dc_string += "viewedcars:";
	            for (i = 0; i < Bitauto.Login.result.viewedcars.length; i++) {
		            _dc_string += Bitauto.Login.result.viewedcars[i].CarSerialId+",";
			    }
	        }
        }catch(err){
		}
        
        try{
        	if (XCWEBLOG_ID || XCWEBLOG_ID != 'undefined') {
            	_dc_string += "&dcxc_id=" +XCWEBLOG_ID;
        	}
        }catch(err){
			//_dcBtErr += 'XCWEBLOG_ID:'+err+';';
		}
		
		//抓取TDK
        var _dc_tdk = '';
        _dc_tdk += "dcdt=" + _dc_dt;
        try{
        	var _dc_dealer_meta = document.getElementsByTagName('meta');
			for (i = 0; i < _dc_dealer_meta.length; i++) {
				if(_dc_dealer_meta[i].name == 'keywords' || _dc_dealer_meta[i].name == 'Keywords'){
					_dc_tdk += "&dckw=" + _es(_dc_dealer_meta[i].content);
					_dc_string += "&dckw=" + _es(_dc_dealer_meta[i].content);
				}
				if(_dc_dealer_meta[i].name == 'description' || _dc_dealer_meta[i].name == 'Description'){
					_dc_tdk += "&dcdp=" + _es(_dc_dealer_meta[i].content);
					//_dc_string += "&dcdp=" + _es(_dc_dealer_meta[i].content);
				}
			}
        }catch(err){
			_dcBtErr += 'keywords:'+err+';';
		} 

		if(_dcBtErr){ 
			_dc_string += "&dcbterr=" +_dcBtErr;
		}
        
        slog(_dc_host + _dc_gif + _dc_string); 
        
        //dma 临时
        /*
        if (_dct == '3') {
			slog("http://dma.cig.com.cn/media/_ev.php" + _dc_string); 
        }*/

		if(_dcBtErr){ 
			_dc_tdk += "&dcbterr=" +_dcBtErr;
		}
		if(_dc_tdk && _dc_pc_kg){ 
			slog(_dc_pc_host+"/_pc.gif?" + _dc_tdk);
		}
		_dc_string2=_dc_string;
        
        cot_data = null;
        col_data = null;
        _dc_string = null;
        virtual_path = null
    } 

    function _dc_scd(canshu) {
		var _dc_scd = document.createElement('script'); _dc_scd.type = 'text/javascript'; _dc_scd.async = true;
		_dc_scd.src = _dc_scd_host + '/c3c.php?JSv=' + _dc_jsv + '&r='+rand+canshu;
		var _dc_scd_s = document.getElementsByTagName('script')[0]; _dc_scd_s.parentNode.insertBefore(_dc_scd, _dc_scd_s);
    }
    
/*    function _dc_cm(n) {
    	_dc_3_cookie = _rc("_dc3c");
    	if(document.location.protocol != 'https:' && document.location.protocol != 'HTTPS:'){
    		var _dc_scd = document.createElement('script'); 
			_dc_scd.type = 'text/javascript'; 
			_dc_scd.async = true;
			_dc_scd.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + _dc_cm_host + '/scdctags.php?JSv=' + _dc_jsv + '&CIGDCID='+n+'&_dc_cm_time='+_dc_cm_time+'&r='+rand+'&dc3c='+_dc_3_cookie;
			var _dc_scd_s = document.getElementsByTagName('script')[0]; 
			_dc_scd_s.parentNode.insertBefore(_dc_scd, _dc_scd_s);
			var col_CIGDCSCD = _wc("CIGDCSCD", _dc_now, 2);
    	}
    }*/
    
    function _setCustomVar(index, name, value, opt_scope) {
    	var tmp = _es(index)+':'+_es(name)+':'+_es(value);
    	//alert(tmp);
    	if(!did) {
    		did=_dc_aid;
    	}
    	if(!opt_scope) opt_scope = 3;
    	
    	//历史数据合并 start
    	var tmp1 = _rc("_dccv"+opt_scope+did);
		if(tmp1){
			var tmp1_data = tmp1.split('|');
	    	
	    	//去重处理
/*	    	for (i = 0; i < tmp1_data.length; i++){
	    		if(tmp == tmp1_data[i]){
	    			tmp='';
	    			break;
	    		}
	    	}*/
	    	
	    	//合并
	    	var tmpObject = []; 
	    	tmpObject[index+name] = value;
	    	
	    //	alert(tmp1_data.length);
	    	for (i = 0; i < tmp1_data.length; i++){
	    		if(!tmp1_data[i]) continue;
	    		var tmp2_data = tmp1_data[i].split(':');

	    		if(!tmpObject[tmp2_data[0]+tmp2_data[1]]){
	    			tmpObject[tmp2_data[0]+tmp2_data[1]] = tmp2_data[2];
	    			
	    			
	    			tmp += '|' + tmp1_data[i];
	    			//alert(name+'  '+tmp2_data[0]+tmp2_data[1]+tmp2_data[2] +'   '+tmpObject[tmp2_data[0]+tmp2_data[1]]+'   '+tmp); 
	    		}
	    			//alert(tmp2_data[0]+tmp2_data[1]+tmp2_data[2] +'   '+tmpObject[tmp2_data[0]+tmp2_data[1]]+'   '+tmp); 
	    	}
		}
    	//历史数据合并 end

    	//1表示访客级别，2表示会话级别，3表示页面级别。为空时默认表示页面级别。
    	if(tmp){
    		if(opt_scope==1){
	        	var c = _wc("_dccv"+opt_scope+did, tmp, 2);
	        }else if(opt_scope==2){
	        	var c = _wc("_dccv"+opt_scope+did, tmp, 1);
	        }else{
	        	if(_dccv_3){
	        		_dccv_3 += '|'+tmp;
	        	}else{
	        		_dccv_3 = tmp;
	        	}
	        }
    	}
    }
    function _getCustomVar(did) {
    	//1表示访客级别
    	var tmp = _rc("_dccv1"+did);
    	
    	//2表示会话级别
    	var t1 = _rc("_dccv2"+did);
    	if(t1){
    		tmp += '|'+t1;
    	}
    	
    	//3表示页面级别
    	if(_dccv_3){
    		tmp += '|'+_dccv_3;
    	}
    	
    	return tmp;
    }

    function _setVar(k, v) {
        if (k && v) {
            evar[k] = v
        }
    }
    function _trackVar(ecv, elv) {
        _dct = '3';
        _trackPageview()
    }
    function _trackEvent(ecv, elv, eov, evv) {
        _dct = '2';
        if (!ecv) {
            return
        } else {
            ec = _es(ecv)
        }
        if (!elv) {
            return
        } else {
            el = _es(elv)
        }
        if (eov) {
            eo = _es(eov)
        } else {
            eo = ""
        }
        if (evv) {
            ev = _es(evv)
        } else {
            ev = ""
        }
        _trackPageview()
    }
    function getC(a) {
        var col2 = '';
        var col_data2 = Array();
        col2 = _rc(a + did);
        if (!col2 || col2 == 'undefined') {
            col2 = ''
        }
        col_data2 = col2.split(_dc_split);
        return col_data2
    }

    function dm_dt() {
        var dt = "";
        if (_dc_dc.title) {
            dt = _dc_dc.title;
            dt = dt.substring(0, 64);
            dt = _es(dt)
        }
        return dt
    }
    
    function dm_if() {
        if (top.location != self.location) return 1;
        return 0
    }
    function dm_sr() {
        var sr = "";
        if (self.screen) {
            sr = screen.width + "x" + screen.height
        } else if (self.java) {
            sr = java.awt.Toolkit.getDefaultToolkit().getScreenSize().width + "x" + java.awt.Toolkit.getDefaultToolkit().getScreenSize().height
        }
        return typeof(sr) != 'undefined' ? sr: ''
    }
    function dm_sc() {
        var sc = "";
        if (self.screen) {
            sc = screen.colorDepth + "-bit"
        }
        return typeof(sc) != 'undefined' ? sc: ''
    }
    function dm_je() {
        var je = "";
        je = navigator.javaEnabled() ? 1: 0;
        return typeof(je) != 'undefined' ? je: ''
    }
    function dm_ul() {
        var ul = "";
        if (navigator.language) {
            ul = navigator.language.toLowerCase()
        } else if (navigator.browserLanguage) {
            ul = navigator.browserLanguage.toLowerCase()
        }
        return typeof(ul) != 'undefined' ? ul: ''
    }
    function dm_cs() {
        var char = document.documentElement.innerHTML.match(/<meta.*?charset\s*=\s*(([a-z0-9\/\-]+)|"([a-z0-9\/\-]+)").*?>/i);
        if (char) {
            char = char[2] ? char[2] : char[3];
            return char.length > 15 ? 'utf-8': char
        } else {
            return 'utf-8'
        }
    }
    function dm_fl() {
        var f = "";
        if (navigator.plugins && navigator.plugins.length) {
            for (var ii = 0; ii < navigator.plugins.length; ii++) {
                if (navigator.plugins[ii].name.indexOf('Shockwave Flash') != -1) {
                    f = navigator.plugins[ii].description.split('Shockwave Flash ')[1];
                    break
                }
            }
        } else if (window.ActiveXObject) {
            for (var ii = 10; ii >= 2; ii--) {
                try {
                    if (eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');")) {
                        f = ii + '.0';
                        ii = null;
                        break
                    }
                } catch(e) {}
            }
        }
        return typeof(f) != 'undefined' ? f: ''
    }
    function _setAccount(b) {
        did = b
    }
    function dm_url() {
        var a = '';
        a = _dlprotocol.href;
        if (a.substr(0, 7) == "http://") {
            a = a.substr(7)
        } else if (a.substr(0, 8) == "https://") {
            a = a.substr(8)
        }
        return a
    }
    function dm_domain() {
        p = _dc_url.indexOf("/");
        p,
        d = _dc_url.substr(0, p);
        if (!_dc_domain) {
            p = d.indexOf(":");
            if (p >= 0) {
                return d.substr(0, p)
            } else {
                return d
            }
        } else {
            p = d.indexOf(_dc_domain);
            if ((p > -1) && (p + _dc_domain.length == d.length)) {
                return _dc_domain
            }
            return d
        }
    }
    function get_ph(p) {
        if (p.length <= 7) {
            return p
        }
        var t = p;
        if (p.substr(0, 7) == "http://") {
            t = p.substr(7)
        } else if (p.substr(0, 8) == "https://") {
            t = p.substr(8)
        }
        return t
    }
    function dm_rf(virtual_path) {
        if (!_dc_dc.referrer && !virtual_path) {
            return ""
        }
        var rf = '';
        if (_dc_dc.referrer) {
            if (_dc_dc.referrer.substr(0, 7) == "http://") {
                rf = _dc_dc.referrer.substr(7)
            } else if (_dc_dc.referrer.substr(0, 8) == "https://") {
                rf = _dc_dc.referrer.substr(8)
            }
            var aParams = rf.substr(1).split('&');
            for (i = 0; i < aParams.length; i++) {
                var aParam = aParams[i].split('=');
                rfParams[aParam[0]] = aParam[1];
                aParam = null
            }
            aParams = null
        }
        var cot_data = get_cot_data();
        if (virtual_path) {
            if (virtual_path == cot_data[3]) {
                rf = cot_data[4]
            } else {
                rf = cot_data[3]
            }
            _dc_r = get_ph(_dlprotocol.href)
        } else {
            if (cot_data[2] == 1) {
                rf = cot_data[3]
            }
        }
        return rf
    }
    function get_cot_data() {
        var cot = _rc("dmt" + did);
        var cot_data = Array();
        if (cot != null) {
            cot_data = cot.split(_dc_split)
        } else {
            cot_data[0] = '';
            cot_data[1] = '';
            cot_data[2] = '';
            cot_data[3] = '';
            cot_data[4] = ''
        }
        return cot_data
    }
    function dm_r() {
        if (!_dc_dc.referrer) {
            return ""
        }
        var rf;
        if (_dc_dc.referrer.substr(0, 7) == "http://") {
            rf = _dc_dc.referrer.substr(7)
        } else if (_dc_dc.referrer.substr(0, 8) == "https://") {
            rf = _dc_dc.referrer.substr(8)
        }
        return rf
    }
    function getDomain(b) {
        if (b.substring(0, 7) == "http://") {
            b = b.substring(7)
        }
        if (b.substring(0, 8) == "https://") {
            b = b.substring(8)
        }
        if (b.indexOf("/") != "-1") {
            b = b.substr(0, b.indexOf("/"))
        }
        if (b.indexOf(":") != "-1") {
            b = b.substr(0, b.indexOf(":"))
        }
        return b
    }
    var ecol = null;
    function _addOrganic(b, e, h) {
        _dc_se[_dc_se.length] = b;
        _dc_sk[_dc_sk.length] = e
    }
    function epush(arr) {
        try {
            var buf = "";
            for (var i = 1, len = arr.length; i < len; i++) {
                buf += "\"" + arr[i] + "\","
            }
            if (buf != "") {
                buf = buf.substr(0, buf.length - 1)
            }
            buf = arr[0] + "(" + buf + ")";
            eval(buf);
            buf = null
        } catch(e) {}
    }
    window[_dc_var].push = function(arr) {
        epush(arr)
    };
    function initPush() {
        for (var i = 0, len = window[_dc_var].length; i < len; i++) {
            epush(window[_dc_var][i])
        }
    }
    initPush()
})();



//曝光监测域名
var TrackingImpUrl="https://im.ctags.cn/";
var TrackingCliImpUrl="https://cl.ctags.cn/";

	setTimeout('_psc_kanli_kuai_im_dcjs()',6000);
function slogBitaiDZ(url) {
    var n = "t_" + (new Date()).getTime() + Math.random() * 9999;
    var c = window[n] = new Image(1, 1);
    c.onload = (c.onerror = function() {
        window[n] = null
    });
    c.src = url;
    url = null;
    n = null;
    c = null
}
function _psc_kanli_kuai_im_dcjs(){
try{
		//获取所有刊例广告位标签
		divArr = new Array();
	    arrDadUp = document.getElementsByTagName('div');
	    arrDadUp = document.getElementsByTagName('ins');
	    for(var i = 0; i < arrDadUp.length; i++) {
	       divArr[divArr.length] = arrDadUp[i];
	    }
	    arrDadUp = divArr;
	    
	    var klstr = '';
	    
	    //遍历位置
	    for(var i=0,len=arrDadUp.length; i<len; i++){
		    var DadUp = arrDadUp[i];//获取一个广告位的位置
		    var kl = DadUp.getAttribute('ssp-kl');
		    if(kl) continue;
		    DadUp.setAttribute('ssp-kl','1');//已发送的标识，
		    
		    /*
				<ins id="div_22bf5713-566c-42e7-bd96-37d91bc6e48a" type="ad_play" adplay_ip="" 
				adplay_areaname="" adplay_cityname="" adplay_brandid="" 
				adplay_brandname="" adplay_brandtype="" adplay_blockcode="22bf5713-566c-42e7-bd96-37d91bc6e48a">
				</ins>
		    */
		    /*<ins id="div_ba10f730-0c13-4dcf-aa81-8b5ccafc9e21" data-type="ad_play" data-adplay_IP="" data-adplay_AreaName
	="" data-adplay_CityName="" data-adplay_BrandID="" data-adplay_BrandName="" data-adplay_BrandType=""
	 data-adplay_BlockCode="ba10f730-0c13-4dcf-aa81-8b5ccafc9e21"> </ins>
	 		*/
			var id = DadUp.getAttribute('id');
			id = id.replace('div_','');
			if(id.length>0){
/*				var innerHTML = DadUp.innerHTML;
				if(innerHTML.indexOf("dadUP") > 0){
					innerHTML = innerHTML.replace('href="https://cl.ctags.cn/', 'href="'+TrackingCliImpUrl+"sy18/kl"+id+"?https://cl.ctags.cn/");
					innerHTML = innerHTML.replace("RedirectOnClickBitaiDZ('http", "RedirectOnClickBitaiDZ('"+TrackingCliImpUrl+"sy18/kl"+id+"?http");
				}else{
					innerHTML = innerHTML.replace("RedirectOnClick('http", "RedirectOnClick('"+TrackingCliImpUrl+"sy18/kl"+id+"?http");
				}
			    DadUp.innerHTML = innerHTML;*/
			    klstr += id+',';
			}
	    }
	    if(klstr){
	    	slogBitaiDZ(TrackingImpUrl+'sy18/kl'+klstr+'?datetime=201705111150&fr=dc.js&ord='+Math.ceil(Math.random()* 9999));
	    }
	}catch(err){
	}
}