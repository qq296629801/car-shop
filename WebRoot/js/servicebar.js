(function () {
    var rsplit = function (string, regex) {
        var result = regex.exec(string), retArr = new Array(), first_idx, last_idx, first_bit;
        while (result != null) {
            first_idx = result.index; last_idx = regex.lastIndex;
            if ((first_idx) != 0) {
                first_bit = string.substring(0, first_idx);
                retArr.push(string.substring(0, first_idx));
                string = string.slice(first_idx);
            }
            retArr.push(result[0]);
            string = string.slice(result[0].length);
            result = regex.exec(string);
        }
        if (!string == '') {
            retArr.push(string);
        }
        return retArr;
    },
    chop = function (string) {
        return string.substr(0, string.length - 1);
    },
    extend = function (d, s) {
        for (var n in s) {
            if (s.hasOwnProperty(n)) d[n] = s[n];
        }
    }

    EJS = function (options) {

        options = typeof options == "string" ? { view: options} : options
        this.set_options(options);
        if (options.precompiled) {
            this.template = {};
            this.template.process = options.precompiled;
            EJS.update(this.name, this);
            return;
        }
        if (options.customTpl) {
            EJS.customTpl = options.customTpl;
        }
        if (options.element) {
            if (typeof options.element == 'string') {
                var name = options.element
                options.element = document.getElementById(options.element)
                if (options.element == null) throw name + 'does not exist!'
            }
            if (options.element.value) {
                this.text = options.element.value
            } else {
                this.text = options.element.innerHTML
            }
            this.name = options.element.id
            this.type = '['
        } else if (options.url) {
            options.url = EJS.endExt(options.url, this.extMatch);
            this.name = this.name ? this.name : options.url;
            var url = options.url
            //options.view = options.absolute_url || options.view || options.;

            var template = EJS.get(this.name /*url*/, this.cache);
            if (template) return template;
            if (template == EJS.INVALID_PATH) return null;
            try {
                this.text = EJS.request(url + (this.cache ? '' : '?' + Math.random()));
            } catch (e) { }

            if (this.text == null) {
                throw ({ type: 'EJS', message: 'There is no template at ' + url });
            }
            //this.name = url;
        }
        var template = new EJS.Compiler(this.text, this.type);

        template.compile(options, this.name);

        EJS.update(this.name, this);
        this.template = template;
    };
    /* @Prototype*/
    EJS.prototype = {
        /**
        * Renders an object with extra view helpers attached to the view.
        * @param {Object} object data to be rendered
        * @param {Object} extra_helpers an object with additonal view helpers
        * @return {String} returns the result of the string
        */
        render: function (object, extra_helpers) {
            object = object || {};
            this._extra_helpers = extra_helpers;
            var v = new EJS.Helpers(object, extra_helpers || {});
            return this.template.process.call(object, object, v);
        },
        update: function (element, options) {
            if (typeof element == 'string') {
                element = document.getElementById(element)
            }
            if (options == null) {
                _template = this;
                return function (object) {
                    EJS.prototype.update.call(_template, element, object)
                }
            }
            if (typeof options == 'string') {
                params = {}
                params.url = options
                _template = this;
                params.onComplete = function (request) {
                    var object = eval(request.responseText)
                    EJS.prototype.update.call(_template, element, object)
                }
                EJS.ajax_request(params)
            } else {
                element.innerHTML = this.render(options)
            }
        },
        out: function () {
            return this.template.out;
        },
        /**
        * Sets options on this view to be rendered with.
        * @param {Object} options
        */
        set_options: function (options) {
            this.type = options.type || EJS.type;
            this.cache = options.cache != null ? options.cache : EJS.cache;
            this.text = options.text || null;
            this.name = options.name || null;
            this.ext = options.ext || EJS.ext;
            this.extMatch = new RegExp(this.ext.replace(/\./, '\.'));

        }
    };
    EJS.endExt = function (path, match) {
        if (!path) return null;
        match.lastIndex = 0
        return path + (match.test(path) ? '' : this.ext)
    }

    /* @Static*/
    EJS.Scanner = function (source, left, right) {
        extend(this,
        { left_delimiter: left + '%',
            right_delimiter: '%' + right,
            double_left: left + '%%',
            double_right: '%%' + right,
            left_equal: left + '%=',
            left_comment: left + '%#'
        })

        this.SplitRegexp = left == '[' ? /(\[%%)|(%%\])|(\[%=)|(\[%#)|(\[%)|(%\]\n)|(%\])|(\n)/ : new RegExp('(' + this.double_left + ')|(%%' + this.double_right + ')|(' + this.left_equal + ')|(' + this.left_comment + ')|(' + this.left_delimiter + ')|(' + this.right_delimiter + '\n)|(' + this.right_delimiter + ')|(\n)');

        this.source = source;
        this.stag = null;
        this.lines = 0;
    };

    EJS.Scanner.to_text = function (input) {
        if (input == null || input === undefined)
            return '';
        if (input instanceof Date)
            return input.toDateString();
        if (input.toString)
            return input.toString();
        return '';
    };

    EJS.Scanner.prototype = {
        scan: function (block) {
            scanline = this.scanline;
            regex = this.SplitRegexp;
            if (!this.source == '') {
                var source_split = rsplit(this.source, /\n/);
                for (var i = 0; i < source_split.length; i++) {
                    var item = source_split[i];
                    this.scanline(item, regex, block);
                }
            }
        },
        scanline: function (line, regex, block) {
            this.lines++;
            var line_split = rsplit(line, regex);
            for (var i = 0; i < line_split.length; i++) {
                var token = line_split[i];
                if (token != null) {
                    try {
                        block(token, this);
                    } catch (e) {
                        throw { type: 'EJS.Scanner', line: this.lines };
                    }
                }
            }
        }
    };

    EJS.Buffer = function (pre_cmd, post_cmd) {
        this.line = new Array();
        this.script = "";
        this.pre_cmd = pre_cmd;
        this.post_cmd = post_cmd;
        for (var i = 0; i < this.pre_cmd.length; i++) {
            this.push(pre_cmd[i]);
        }
    };
    EJS.Buffer.prototype = {
        push: function (cmd) {
            this.line.push(cmd);
        },

        cr: function () {
            this.script = this.script + this.line.join('; ');
            this.line = new Array();
            this.script = this.script + "\n";
        },

        close: function () {
            if (this.line.length > 0) {
                for (var i = 0; i < this.post_cmd.length; i++) {
                    this.push(pre_cmd[i]);
                }
                this.script = this.script + this.line.join('; ');
                line = null;
            }
        }
    };

    EJS.Compiler = function (source, left) {
        this.pre_cmd = ['var ___ViewO = [];'];
        this.post_cmd = new Array();
        this.source = ' ';
        if (source != null) {
            if (typeof source == 'string') {
                source = source.replace(/\r\n/g, "\n");
                source = source.replace(/\r/g, "\n");
                this.source = source;
            } else if (source.innerHTML) {
                this.source = source.innerHTML;
            }
            if (typeof this.source != 'string') {
                this.source = "";
            }
        }
        left = left || '<';
        var right = '>';
        switch (left) {
            case '[':
                right = ']';
                break;
            case '<':
                break;
            default:
                throw left + ' is not a supported deliminator';
                break;
        }
        this.scanner = new EJS.Scanner(this.source, left, right);
        this.out = '';
    };
    EJS.Compiler.prototype = {
        compile: function (options, name) {
            options = options || {};
            this.out = '';
            var put_cmd = "___ViewO.push(";
            var insert_cmd = put_cmd;
            var buff = new EJS.Buffer(this.pre_cmd, this.post_cmd);
            var content = '';
            var clean = function (content) {
                content = content.replace(/\\/g, '\\\\');
                content = content.replace(/\n/g, '\\n');
                content = content.replace(/"/g, '\\"');
                return content;
            };
            this.scanner.scan(function (token, scanner) {
                if (scanner.stag == null) {
                    switch (token) {
                        case '\n':
                            content = content + "\n";
                            buff.push(put_cmd + '"' + clean(content) + '");');
                            buff.cr();
                            content = '';
                            break;
                        case scanner.left_delimiter:
                        case scanner.left_equal:
                        case scanner.left_comment:
                            scanner.stag = token;
                            if (content.length > 0) {
                                buff.push(put_cmd + '"' + clean(content) + '")');
                            }
                            content = '';
                            break;
                        case scanner.double_left:
                            content = content + scanner.left_delimiter;
                            break;
                        default:
                            content = content + token;
                            break;
                    }
                }
                else {
                    switch (token) {
                        case scanner.right_delimiter:
                            switch (scanner.stag) {
                                case scanner.left_delimiter:
                                    if (content[content.length - 1] == '\n') {
                                        content = chop(content);
                                        buff.push(content);
                                        buff.cr();
                                    }
                                    else {
                                        buff.push(content);
                                    }
                                    break;
                                case scanner.left_equal:
                                    buff.push(insert_cmd + "(EJS.Scanner.to_text(" + content + ")))");
                                    break;
                            }
                            scanner.stag = null;
                            content = '';
                            break;
                        case scanner.double_right:
                            content = content + scanner.right_delimiter;
                            break;
                        default:
                            content = content + token;
                            break;
                    }
                }
            });
            if (content.length > 0) {
                // Chould be content.dump in Ruby
                buff.push(put_cmd + '"' + clean(content) + '")');
            }
            buff.close();
            this.out = buff.script + ";";
            var to_be_evaled = '/*' + name + '*/this.process = function(_CONTEXT,_VIEW) { try { with(_VIEW) { with (_CONTEXT) {' + this.out + " return ___ViewO.join('');}}}catch(e){e.lineNumber=null;throw e;}};";

            try {
                eval(to_be_evaled);
            } catch (e) {
                if (typeof JSLINT != 'undefined') {
                    JSLINT(this.out);
                    for (var i = 0; i < JSLINT.errors.length; i++) {
                        var error = JSLINT.errors[i];
                        if (error.reason != "Unnecessary semicolon.") {
                            error.line++;
                            var e = new Error();
                            e.lineNumber = error.line;
                            e.message = error.reason;
                            if (options.view)
                                e.fileName = options.view;
                            throw e;
                        }
                    }
                } else {
                    throw e;
                }
            }
        }
    };

    EJS.config = function (options) {
        EJS.cache = options.cache != null ? options.cache : EJS.cache;
        EJS.type = options.type != null ? options.type : EJS.type;
        EJS.ext = options.ext != null ? options.ext : EJS.ext;
        var templates_directory = EJS.templates_directory || {}; 
        EJS.templates_directory = templates_directory;
        EJS.get = function (path, cache) {
            if (cache == false) return null;
            if (templates_directory[path]) return templates_directory[path];
            return null;
        };

        EJS.update = function (path, template) {
            if (path == null) return;
            templates_directory[path] = template;
        };

        EJS.INVALID_PATH = -1;
    };
    EJS.config({ cache: true, type: '<', ext: '.html' });

    EJS.Helpers = function (data, extras) {
        this._data = data;
        this._extras = extras;
        extend(this, extras);
    };
   
    EJS.Helpers.prototype = {
        view: function (options, data, helpers) {
            if (!helpers) helpers = this._extras
            if (!data) data = this._data;
            return new EJS(options).render(data, helpers);
        },
        to_text: function (input, null_text) {
            if (input == null || input === undefined) return null_text || '';
            if (input instanceof Date) return input.toDateString();
            if (input.toString) return input.toString().replace(/\n/g, '<br />').replace(/''/g, "'");
            return '';
        }
    };
    EJS.newRequest = function () {
        var factories = [function () { return new ActiveXObject("Msxml2.XMLHTTP"); }, function () { return new XMLHttpRequest(); }, function () { return new ActiveXObject("Microsoft.XMLHTTP"); } ];
        for (var i = 0; i < factories.length; i++) {
            try {
                var request = factories[i]();
                if (request != null) return request;
            }
            catch (e) { continue; }
        }
    }

    EJS.request = function (path) {
        var request = null;
        //cross domain
        if (path && path.indexOf("http") < 0 && path.indexOf("/") == 0) {
            path = document.location.protocol + "//" + window.location.host + path;
        }
        if (path && path.indexOf(window.location.host) < 0) {
            request = {
                responseText: "",
                open: function () { },
                send: function () {
                    if (EJS.customTpl) {
                        this.responseText = EJS.customTpl;
                        EJS.customTpl = "";
                    }
                },
                status: 200
            };
        } else {
            request = new EJS.newRequest();
        }
        request.open("GET", path, false);
        try { request.send(null); }
        catch (e) { return null; }
        if (request.status == 404 || request.status == 2 || (request.status == 0 && request.responseText == '')) return null;
        return request.responseText;
    }
    EJS.ajax_request = function (params) {
        params.method = (params.method ? params.method : 'GET');
        var request = new EJS.newRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    params.onComplete(request);
                } else {
                    params.onComplete(request);
                }
            }
        }
        request.open(params.method, params.url);
        request.send(null);
    }
})();﻿
$(function () {
    if (!$.jqmFrame) {
        $.jqmFrame = {};
        $.extend($.jqmFrame, {
            oFrame: null,
            oBox: null,
            oTitle: null,
            oContent: null,
            oCache: {},
            initFrame: function (boxClassFlag) {
                var frameStr = "<div class=\"jqmWindow\" id=\"jqmframe\"><div class=\"fuc_box \"><div class=\"fuc_close jqmClose\"><a href=\"#\"></a></div><h2 class=\"fuc_tit lay_tit\"></h2><div class=\"lay_cont\"></div></div></div>";
                if ($("#jqmframe").length == 0) {
                    $("body").prepend(frameStr);
                }
                $.jqmFrame.oFrame = $("#jqmframe");
                $.jqmFrame.oBox = $("#jqmframe .fuc_box ");
                $.jqmFrame.oTitle = $("#jqmframe h2");
                $.jqmFrame.oContent = $("#jqmframe .lay_cont");
                $.jqmFrame.oFrame.hide().jqm({ overlay: 50 });
            },
            show: function (title, content, boxClass, style) {

                if ($("#jqmframe").is(":visible")) {
                    return;
                }
                $.jqmFrame.initFrame();
                $.jqmFrame.oBox.attr("class", "fuc_box " + boxClass);
                $.jqmFrame.oBox.attr("style", style);
                $.jqmFrame.setContent(title, content);
                $.jqmFrame.oFrame.jqmShow();
            },
            setContent: function (title, content) {
                $.jqmFrame.oContent = $("#jqmframe .lay_cont");
                $.jqmFrame.oTitle.html(title);
                $.jqmFrame.oContent.replaceWith(content);
                //高度居中设置
                var wintop = parseInt(($(window).height() - $(".jqmWindow").height()) / 2);
                $(".jqmWindow").css("top", wintop < 0 ? 0 : wintop);
            },
            hide: function () {
                try { $.jqmFrame.oFrame.jqmHide(); }
                catch (e)
            { }
            }
        });
    }
    if (!$.slidebar) {
        $.slidebar = {};
        $.extend($.slidebar, {
            feedBack: {
                maxChart: 490,
                oCharCount: null,
                oContent: null,
                oBtnSendFeed: null,
                initFeed: function () {
                    $.slidebar.feedBack.oContent = $("#content");
                    $.slidebar.feedBack.oCharCount = $(".suggest .fright strong");
                    $.slidebar.feedBack.oCharCount.html($.slidebar.feedBack.maxChart);
                    $.slidebar.feedBack.oContent.bind("blur", function () {
                        if ($(this).val() == '') {
                            $(this).val($(this).attr("data-tip")).css("color", "#999");
                        }
                    }).bind("focus", function () {
                        if ($(this).val() == $(this).attr("data-tip")) {
                            $(this).val("");
                        }
                        $(this).css("color", "#333");
                    }).val($.slidebar.feedBack.oContent.attr("data-tip"));
                    $.slidebar.feedBack.oContent.bind("keyup", function () {
                        var int_reChar = $.slidebar.feedBack.maxChart - $(this).val().length;
                        if (int_reChar > 0)
                            $.slidebar.feedBack.oCharCount.html(int_reChar);
                        else {
                            $.slidebar.feedBack.oCharCount.html("0");
                            $(this).blur();
                        }
                    }).bind("click", function () {
                        if ($(this).val().length > $.slidebar.feedBack.maxChart) {
                            $(this).val($(this).val().substring(0, $.slidebar.feedBack.maxChart));
                        }
                    }).bind("focus", function () { $(this).trigger("click"); }).bind("blur", function () { $(this).trigger("click"); });
                    $.slidebar.feedBack.oBtnSendFeed = $("#btnSendFeed");
                    $.slidebar.feedBack.oBtnSendFeed.click($.slidebar.feedBack.subFeedback);
                },
                //验证方法集合
                validateFn: {
                    checkContent: function () {
                        return $.validator.validate({
                            el: $.slidebar.feedBack.oContent,
                            customCheck: function () {
                                var vr = $.validator.createResult();
                                var errtip = "写下您遇到的问题或建议";
                                if ($.trim($.slidebar.feedBack.oContent.val()).length === 0 || $.trim($.slidebar.feedBack.oContent.val()) == errtip) {
                                    vr.errMsg = errtip;
                                } else {
                                    $.slidebar.feedBack.oContent.val($.slidebar.feedBack.oContent.val().substring(0, $.slidebar.feedBack.maxChart));
                                    $(".suggest .error").remove();
                                    vr.success = true;
                                }
                                return vr;
                            },
                            failCallback: function (err) {
                                $(".suggest .error").remove();
                                $.slidebar.feedBack.oContent.after("<div  class=\"error\">" + err + "</div>");
                            }
                        }).IsPass();
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
                subFeedback: function () {
                    if ($.slidebar.feedBack.validate()) {
                        $.ajax({
                            type: "POST",
                            url: "#",
                            data: { content: $.slidebar.feedBack.oContent.val().substring(0, $.slidebar.feedBack.maxChart) },
                            dataType: 'jsonp',
                            beforeSend: function () {
                                $.slidebar.feedBack.oBtnSendFeed.unbind("click");
                            },
                            success: function (data) {
                                if (data) {
                                    if ($.jqmFrame && $.jqmFrame.hide)
                                        $.jqmFrame.hide();
                                }
                            },
                            complete: function () {
                                $.slidebar.feedBack.oBtnSendFeed.click($.slidebar.feedBack.subFeedback);
                            }
                        });
                    }
                }
            }
        });
    }
    setList();
});
function popStopCancel(e) {
    return e ? e.stopPropagation() : event.cancelBubble = true;
}

//设置订单列表
function setList(loginStatus) {
    $.getJSON("#?", function (result) {
        var html = new EJS({ url:"https://ajax.huimaiche.com/tpl/servicebar.html", cache: false,  customTpl: result.Html }).render(result);
        if (!result.IsLogin) {
            var timer_0 = setInterval(function () {
                if (typeof $.hmc_frame !== "undefined") {
                    $.hmc_frame.reset({
                        login_callback: function () {
                            $(".tool-bar-new").remove();
                            setList(result.IsLogin);
                            barLoginStatus = result.IsLogin;
                        }
                    });
                    clearInterval(timer_0);
                }
            }, 200);
        }
        if (html) {
			var protocol = window.location.href.indexOf('https:') > 0 ? window.location.href : window.location.href.replace("http:","");
            var form = "<form id='servicebarform' action='//im.bitauto.com/onlineservice.aspx' method='post' target='_blank'><input type='hidden' name='PageTitle' value='" + document.title + "' /><input type='hidden' name='SourceUrl' value='" + protocol + "' /><input type='hidden' name='SourceType' value='2'' /></form>";
            $("body").append(html + form);
            $("#showfeedbackBtn").click(function () {
                $.jqmFrame.show("提建议", new EJS({ url:"#",customTpl: result.HtmlFeecBack }).render(), "fuc_w520", "");
            });
            $('.tool-bar-new').css({ 'right': '0' });
            $('.tool-mycar').css({ 'margin-left': '0' });
            $("#couponctrl").click(function() {
                if(!result.IsLogin) {
                    $.hmc_jqmFrame.login();
                    $.hmc_frame.login();
                }
                else {
                    window.location = "//i.huimaiche.com/coupon";
                }
            });
            var toolBar = $(".tool-bar");
            var QrHover = toolBar.find(".app");
            var QrDiv = toolBar.find(".qrCode");
            QrHover.hover(function () {
                QrDiv.show();
            }, function () {
                QrDiv.hide();
            });
            $(".tool-mycar").click(function (e) {
                if(!result.IsLogin) {
                    $.hmc_jqmFrame.login();
                    $.hmc_frame.login();
                }
                else {
                    $(this).find('.tool-a').addClass('cur');
                    $(this).find(".tool-car").animate({ opacity: "1" }, 'slow').show();
                }
            }).mouseleave(function () {
                if(result.IsLogin) {
                    $(this).find(".tool-car").animate({ opacity: "0" }).hide();
                    $(this).find('.tool-a').removeClass('cur');
                }
            });
            $(window).resize(function () {
                var wh = $(window).height();
                var ww = $(window).width();
                if (ww < 1184) {
                    $(".tool-bar-new").unbind("mouseleave");
                    $('.tool-bar-new').css({ 'right': '-36px' });
                    $('.tool-mycar,.gotop').css({ 'margin-left': '-36px' });
                    $('.tool-mycar').find('.js_new-message').css({ 'right': '38px' });
                    $(".tool-mycar").hover(function (e) {
                        popStopCancel(e);
                        $(this).parents(".tool-bar-new").stop().animate({ 'right': '0' });
                        $(this).stop().animate({ 'margin-left': '0' });
                        $(this).find('.js_new-message').stop().animate({ 'right': '2px' });
                        $('.gotop').stop().animate({ 'margin-left': '0' });
                    }, function (e) {

                    });
                    $('.tool-bar-new').mouseleave(function () {
                        $(this).stop().animate({ 'right': '-36px' });
                        $(this).find('.tool-mycar').stop().animate({ 'margin-left': '-36px' });
                        $(this).find('.js_new-message').stop().animate({ 'right': '38px' });
                        $(this).find('.gotop').stop().animate({ 'margin-left': '-36px' });
                    }).hover(function () { }, function (e) {
                        popStopCancel(e);
                        $(".tool-mycar").parents(".tool-bar-new").stop().animate({ 'right': '-36px' });
                        $(".tool-mycar").stop().animate({ 'margin-left': '-36px' });
                        $(".tool-mycar").find('.js_new-message').stop().animate({ 'right': '38px' });
                        $('.gotop').stop().animate({ 'margin-left': '-36px' });
                    });

                } else {
                    $('.tool-bar-new').css({ 'right': '0' });
                    $('.tool-mycar,.gotop').css({ 'margin-left': '0' });
                    $('.tool-mycar').find('.js_new-message').css({ 'right': '0' });
                    $(".tool-bar-new").unbind("mouseleave");
                }
                if (wh < 600) {
                    $('.sidebaradv').hide();
                } else {
                    $('.sidebaradv').show();
                }
            });
            var WEB = WEB || {};

            WEB.goTop = function () {
                var _scrollTop = (function () {
                    return $(window).scrollTop();
                })();

                var $slider_bar = $(".gotop");

                if (_scrollTop > 300) {
                    $slider_bar.show();
                } else {
                    $slider_bar.hide();
                }
            };

            WEB.scrollPos = function (elem, obj) {
                var defaults = $.extend({ topsite: 0, times: 500 }, obj);
                $(document).on('click', elem, function () {
                    $('html, body').animate({
                        scrollTop: defaults.topsite
                    }, defaults.times);
                });
            };

            $(document).ready(function () {
                var $window = $(window);
                $window.on('load scroll', WEB.goTop);
                //回到顶部
                WEB.scrollPos(".gotop");
            });
            $("#onlineServiceLink").click(function () {
                document.getElementById("servicebarform").submit();
            });
            $("div[data-adcode]").adProcess();
        }
    });
}