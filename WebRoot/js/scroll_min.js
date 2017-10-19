/*
 * Created by zhaozhao.
 * Date: 2015/5/19
 * version : 2.28 Beta
*/
jQuery.fn.extend({
    autoTopic_scroll: function(t) {
        function e(t) {
            r.find("embed, object").each(function() {
                if (0 == $(this).siblings().length) {
                    var t = $(this).parent(),
                    e = t.html();
                    t.attr("scrollEmbed", e).html("")
                }
            }),
            h.eq(t).find("[scrollEmbed]").each(function() {
                $(this).html($(this).attr("scrollEmbed"))
            })
        }
        function n(t, n) {
            return 1 == g && !a.line && n == T || 0 == v || g > w || (1 != g || a.line ? 0 == a.onClick(T, t) : 0 == a.onClick(T, n)) ? !1 : (v = !1, 1 != g || a.line ? a.onClick(T, t) : (h.hide(), n = T == w - 1 && 1 == t ? 0 : 0 > T && 0 == t ? w - 2 : n, t = a.gap || 0 != n ? a.gap || -1 != n ? t: 1 : 0, 0 == t && r.css(p, -u), h.eq(0 == t ? T: n).css(p, u).show(), h.eq(0 == t ? n: T).css(p, 0).show(), a.onClick(T, n)), x.removeClass("cur").eq(null != n ? n: t > w - 1 ? t % w: 0 > t ? w + t % w: t).addClass("cur"), 0 > t ? (r.css(p, ( - T - w) * u) + "px", t += w) : t > w + m && (r.css(p, (w - T) * u) + "px", t -= w), r.stop().delay(a.delay).animate(l ? {
                left: -t * u + "px"
            }: {
                top: -t * u + "px"
            },
            a.speed, a.easing,
            function() {
                T = t,
                1 != g || a.line || (r.css(p, 0), h.hide().eq(n).show().css(p, 0), T = n),
                B && (0 == T ? $(a.leftBtn).hide() && $(a.rightBtn).show() : $(a.leftBtn).show() && $(a.rightBtn).hide()),
                e(T),
                a.callback(T),
                v = !0
            }), void 0)
        }
        function i() {
            1 != g || a.line ? B ? n(0) : n(T - m) : n(0, T - 1)
        }
        function o() {
            1 != g || a.line ? B ? n(w - g) : n(T + m) : n(1, T + 1)
        }
        function c() {
            4 == a.side || 1 == a.side ? o() : i(),
            clearTimeout(s),
            s = setTimeout(function() {
                b || c()
            },
            a.space)
        }
        var a = {
            toc: "*",
            leftBtn: !1,
            rightBtn: !1,
            speed: 1e3,
            easing: "swing",
            range: !1,
            autoPlay: !1,
            space: 3e3,
            side: 4,
            gap: !0,
            line: !1,
            delay: 0,
            control: !1,
            controlToc: "*",
            onLoad: function() {},
            onReady: function() {},
            onClick: function() {},
            callback: function() {}
        };
        null != t && jQuery.extend(a, t),
        a.onLoad(),
        a.dom = this;
        var s, l = 2 == a.side || 4 == a.side,
        r = a.dom,
        d = l ? r.parent().width() : r.parent().height(),
        h = r.children(a.toc),
        u = l ? h.outerWidth(!0) : h.outerHeight(!0),
        f = l ? "width": "height",
        p = l ? "left": "top",
        w = h.length,
        g = Math.round(d / u),
        m = a.range !== !0 && a.range > 0 ? a.range: 2 > w / g && 0 == a.range ? 1 : 2 > w / g && a.range === !0 ? w - g: g,
        v = !0,
        T = -(parseInt("auto" == r.css(p) ? 0 : r.css(p)) / u),
        b = 0,
        B = 2 > w / g && m > w - g,
        k = $(window).width() > 990 ? $(window).width() : 990,
        y = $(a.control),
        x = y.children(a.controlToc);
        if (r.parent().width() == $(window).width() && (u = l ? k: u, h.width(k)), r.css(f, (B ? w * u: 1 != g || a.line ? 2 * w * u: 2 * u) + "px").css("position", "absolute"), r.parent().width() == $(window).width() && (r.parent().width(k), $(window).resize(function() {
            k = $(window).width() > 990 ? $(window).width() : 990,
            u = l ? k: u,
            r.parent().width(k),
            r.width(2 * k),
            h.width(k)
        })), (a.line && 1 == g || g > 1 && !B) && (h.clone().appendTo(r), h = r.children(a.toc)), 1 == g && (a.line || h.css({
            position: "absolute",
            display: "none"
        }).first().show(), x.each(function(t) {
            $(this).click(function() {
                a.line ? n(w > T ? t: w + t) : t > T ? n(1, t) : n(0, t)
            })
        }), e(T)), a.onReady(), B && $(a.leftBtn).hide(), $(a.leftBtn).click(function() {
            i()
        }), $(a.rightBtn).click(function() {
            o()
        }), 1 == a.autoPlay) {
            s = setTimeout(function() {
                b || c()
            },
            a.space);
            var C = r.selector;
            $(C + "," + a.leftBtn + "," + a.rightBtn + (a.control ? "," + a.control: "")).mouseenter(function() {
                b = 1,
                clearTimeout(s)
            }).mouseleave(function() {
                b = 0,
                clearTimeout(s),
                s = setTimeout(function() {
                    b || c()
                },
                a.space)
            })
        }
        if (navigator.userAgent.match(/mobile/i)) {
            var E = 0,
            q = 0,
            L = d / 10;
            r.parent()[0].addEventListener("touchmove",
            function(t) {
                t.preventDefault(),
                q = t.targetTouches ? l ? t.targetTouches[0].pageX - E: t.targetTouches[0].pageY - E: l ? t.clientX - E: t.clientY - E
            }),
            r.parent()[0].addEventListener("touchstart",
            function(t) {
                t.preventDefault(),
                E = t.targetTouches ? l ? t.targetTouches[0].pageX: t.targetTouches[0].pageY: l ? t.clientX: t.clientY
            }),
            r.parent()[0].addEventListener("touchend",
            function(t) {
                return t.preventDefault(),
                Math.abs(q) < L ? !1 : (0 > q ? o() : i(), void 0)
            })
        }
    }
});