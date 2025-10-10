(() => {
    var e = {
        5616: function(e, t) {
            var n;
            /*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */            !function(t, n) {
                "use strict";
                "object" == typeof e.exports ? e.exports = t.document ? n(t, !0) : function(e) {
                    if (!e.document) throw new Error("jQuery requires a window with a document");
                    return n(e);
                } : n(t);
            }("undefined" != typeof window ? window : this, (function(r, o) {
                "use strict";
                var i = [], s = Object.getPrototypeOf, a = i.slice, c = i.flat ? function(e) {
                    return i.flat.call(e);
                } : function(e) {
                    return i.concat.apply([], e);
                }, u = i.push, l = i.indexOf, f = {}, d = f.toString, p = f.hasOwnProperty, h = p.toString, g = h.call(Object), v = {}, y = function(e) {
                    return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item;
                }, m = function(e) {
                    return null != e && e === e.window;
                }, b = r.document, x = {
                    type: !0,
                    src: !0,
                    nonce: !0,
                    noModule: !0
                };
                function w(e, t, n) {
                    var r, o, i = (n = n || b).createElement("script");
                    if (i.text = e, t) for (r in x) (o = t[r] || t.getAttribute && t.getAttribute(r)) && i.setAttribute(r, o);
                    n.head.appendChild(i).parentNode.removeChild(i);
                }
                function k(e) {
                    return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? f[d.call(e)] || "object" : typeof e;
                }
                var T = "3.7.1", C = /HTML$/i, E = function(e, t) {
                    return new E.fn.init(e, t);
                };
                function S(e) {
                    var t = !!e && "length" in e && e.length, n = k(e);
                    return !y(e) && !m(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e);
                }
                function j(e, t) {
                    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
                }
                E.fn = E.prototype = {
                    jquery: T,
                    constructor: E,
                    length: 0,
                    toArray: function() {
                        return a.call(this);
                    },
                    get: function(e) {
                        return null == e ? a.call(this) : e < 0 ? this[e + this.length] : this[e];
                    },
                    pushStack: function(e) {
                        var t = E.merge(this.constructor(), e);
                        return t.prevObject = this, t;
                    },
                    each: function(e) {
                        return E.each(this, e);
                    },
                    map: function(e) {
                        return this.pushStack(E.map(this, (function(t, n) {
                            return e.call(t, n, t);
                        })));
                    },
                    slice: function() {
                        return this.pushStack(a.apply(this, arguments));
                    },
                    first: function() {
                        return this.eq(0);
                    },
                    last: function() {
                        return this.eq(-1);
                    },
                    even: function() {
                        return this.pushStack(E.grep(this, (function(e, t) {
                            return (t + 1) % 2;
                        })));
                    },
                    odd: function() {
                        return this.pushStack(E.grep(this, (function(e, t) {
                            return t % 2;
                        })));
                    },
                    eq: function(e) {
                        var t = this.length, n = +e + (e < 0 ? t : 0);
                        return this.pushStack(n >= 0 && n < t ? [ this[n] ] : []);
                    },
                    end: function() {
                        return this.prevObject || this.constructor();
                    },
                    push: u,
                    sort: i.sort,
                    splice: i.splice
                }, E.extend = E.fn.extend = function() {
                    var e, t, n, r, o, i, s = arguments[0] || {}, a = 1, c = arguments.length, u = !1;
                    for ("boolean" == typeof s && (u = s, s = arguments[a] || {}, a++), "object" == typeof s || y(s) || (s = {}), 
                    a === c && (s = this, a--); a < c; a++) if (null != (e = arguments[a])) for (t in e) r = e[t], 
                    "__proto__" !== t && s !== r && (u && r && (E.isPlainObject(r) || (o = Array.isArray(r))) ? (n = s[t], 
                    i = o && !Array.isArray(n) ? [] : o || E.isPlainObject(n) ? n : {}, o = !1, s[t] = E.extend(u, i, r)) : void 0 !== r && (s[t] = r));
                    return s;
                }, E.extend({
                    expando: "jQuery" + (T + Math.random()).replace(/\D/g, ""),
                    isReady: !0,
                    error: function(e) {
                        throw new Error(e);
                    },
                    noop: function() {},
                    isPlainObject: function(e) {
                        var t, n;
                        return !(!e || "[object Object]" !== d.call(e) || (t = s(e)) && ("function" != typeof (n = p.call(t, "constructor") && t.constructor) || h.call(n) !== g));
                    },
                    isEmptyObject: function(e) {
                        var t;
                        for (t in e) return !1;
                        return !0;
                    },
                    globalEval: function(e, t, n) {
                        w(e, {
                            nonce: t && t.nonce
                        }, n);
                    },
                    each: function(e, t) {
                        var n, r = 0;
                        if (S(e)) for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++) ; else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
                        return e;
                    },
                    text: function(e) {
                        var t, n = "", r = 0, o = e.nodeType;
                        if (!o) for (;t = e[r++]; ) n += E.text(t);
                        return 1 === o || 11 === o ? e.textContent : 9 === o ? e.documentElement.textContent : 3 === o || 4 === o ? e.nodeValue : n;
                    },
                    makeArray: function(e, t) {
                        var n = t || [];
                        return null != e && (S(Object(e)) ? E.merge(n, "string" == typeof e ? [ e ] : e) : u.call(n, e)), 
                        n;
                    },
                    inArray: function(e, t, n) {
                        return null == t ? -1 : l.call(t, e, n);
                    },
                    isXMLDoc: function(e) {
                        var t = e && e.namespaceURI, n = e && (e.ownerDocument || e).documentElement;
                        return !C.test(t || n && n.nodeName || "HTML");
                    },
                    merge: function(e, t) {
                        for (var n = +t.length, r = 0, o = e.length; r < n; r++) e[o++] = t[r];
                        return e.length = o, e;
                    },
                    grep: function(e, t, n) {
                        for (var r = [], o = 0, i = e.length, s = !n; o < i; o++) !t(e[o], o) !== s && r.push(e[o]);
                        return r;
                    },
                    map: function(e, t, n) {
                        var r, o, i = 0, s = [];
                        if (S(e)) for (r = e.length; i < r; i++) null != (o = t(e[i], i, n)) && s.push(o); else for (i in e) null != (o = t(e[i], i, n)) && s.push(o);
                        return c(s);
                    },
                    guid: 1,
                    support: v
                }), "function" == typeof Symbol && (E.fn[Symbol.iterator] = i[Symbol.iterator]), 
                E.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function(e, t) {
                    f["[object " + t + "]"] = t.toLowerCase();
                }));
                var A = i.pop, D = i.sort, N = i.splice, L = "[\\x20\\t\\r\\n\\f]", q = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g");
                E.contains = function(e, t) {
                    var n = t && t.parentNode;
                    return e === n || !(!n || 1 !== n.nodeType || !(e.contains ? e.contains(n) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(n)));
                };
                var H = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
                function O(e, t) {
                    return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e;
                }
                E.escapeSelector = function(e) {
                    return (e + "").replace(H, O);
                };
                var P = b, M = u;
                !function() {
                    var e, t, n, o, s, c, u, f, d, h, g = M, y = E.expando, m = 0, b = 0, x = ee(), w = ee(), k = ee(), T = ee(), C = function(e, t) {
                        return e === t && (s = !0), 0;
                    }, S = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", H = "(?:\\\\[\\da-fA-F]{1,6}" + L + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", O = "\\[" + L + "*(" + H + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + H + "))|)" + L + "*\\]", R = ":(" + H + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + O + ")*)|.*)\\)|)", _ = new RegExp(L + "+", "g"), I = new RegExp("^" + L + "*," + L + "*"), W = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"), F = new RegExp(L + "|>"), $ = new RegExp(R), B = new RegExp("^" + H + "$"), X = {
                        ID: new RegExp("^#(" + H + ")"),
                        CLASS: new RegExp("^\\.(" + H + ")"),
                        TAG: new RegExp("^(" + H + "|[*])"),
                        ATTR: new RegExp("^" + O),
                        PSEUDO: new RegExp("^" + R),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + S + ")$", "i"),
                        needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
                    }, U = /^(?:input|select|textarea|button)$/i, z = /^h\d$/i, V = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, Y = /[+~]/, G = new RegExp("\\\\[\\da-fA-F]{1,6}" + L + "?|\\\\([^\\r\\n\\f])", "g"), Q = function(e, t) {
                        var n = "0x" + e.slice(1) - 65536;
                        return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320));
                    }, J = function() {
                        ce();
                    }, K = de((function(e) {
                        return !0 === e.disabled && j(e, "fieldset");
                    }), {
                        dir: "parentNode",
                        next: "legend"
                    });
                    try {
                        g.apply(i = a.call(P.childNodes), P.childNodes), i[P.childNodes.length].nodeType;
                    } catch (e) {
                        g = {
                            apply: function(e, t) {
                                M.apply(e, a.call(t));
                            },
                            call: function(e) {
                                M.apply(e, a.call(arguments, 1));
                            }
                        };
                    }
                    function Z(e, t, n, r) {
                        var o, i, s, a, u, l, p, h = t && t.ownerDocument, m = t ? t.nodeType : 9;
                        if (n = n || [], "string" != typeof e || !e || 1 !== m && 9 !== m && 11 !== m) return n;
                        if (!r && (ce(t), t = t || c, f)) {
                            if (11 !== m && (u = V.exec(e))) if (o = u[1]) {
                                if (9 === m) {
                                    if (!(s = t.getElementById(o))) return n;
                                    if (s.id === o) return g.call(n, s), n;
                                } else if (h && (s = h.getElementById(o)) && Z.contains(t, s) && s.id === o) return g.call(n, s), 
                                n;
                            } else {
                                if (u[2]) return g.apply(n, t.getElementsByTagName(e)), n;
                                if ((o = u[3]) && t.getElementsByClassName) return g.apply(n, t.getElementsByClassName(o)), 
                                n;
                            }
                            if (!(T[e + " "] || d && d.test(e))) {
                                if (p = e, h = t, 1 === m && (F.test(e) || W.test(e))) {
                                    for ((h = Y.test(e) && ae(t.parentNode) || t) == t && v.scope || ((a = t.getAttribute("id")) ? a = E.escapeSelector(a) : t.setAttribute("id", a = y)), 
                                    i = (l = le(e)).length; i--; ) l[i] = (a ? "#" + a : ":scope") + " " + fe(l[i]);
                                    p = l.join(",");
                                }
                                try {
                                    return g.apply(n, h.querySelectorAll(p)), n;
                                } catch (t) {
                                    T(e, !0);
                                } finally {
                                    a === y && t.removeAttribute("id");
                                }
                            }
                        }
                        return me(e.replace(q, "$1"), t, n, r);
                    }
                    function ee() {
                        var e = [];
                        return function n(r, o) {
                            return e.push(r + " ") > t.cacheLength && delete n[e.shift()], n[r + " "] = o;
                        };
                    }
                    function te(e) {
                        return e[y] = !0, e;
                    }
                    function ne(e) {
                        var t = c.createElement("fieldset");
                        try {
                            return !!e(t);
                        } catch (e) {
                            return !1;
                        } finally {
                            t.parentNode && t.parentNode.removeChild(t), t = null;
                        }
                    }
                    function re(e) {
                        return function(t) {
                            return j(t, "input") && t.type === e;
                        };
                    }
                    function oe(e) {
                        return function(t) {
                            return (j(t, "input") || j(t, "button")) && t.type === e;
                        };
                    }
                    function ie(e) {
                        return function(t) {
                            return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && K(t) === e : t.disabled === e : "label" in t && t.disabled === e;
                        };
                    }
                    function se(e) {
                        return te((function(t) {
                            return t = +t, te((function(n, r) {
                                for (var o, i = e([], n.length, t), s = i.length; s--; ) n[o = i[s]] && (n[o] = !(r[o] = n[o]));
                            }));
                        }));
                    }
                    function ae(e) {
                        return e && void 0 !== e.getElementsByTagName && e;
                    }
                    function ce(e) {
                        var n, r = e ? e.ownerDocument || e : P;
                        return r != c && 9 === r.nodeType && r.documentElement ? (u = (c = r).documentElement, 
                        f = !E.isXMLDoc(c), h = u.matches || u.webkitMatchesSelector || u.msMatchesSelector, 
                        u.msMatchesSelector && P != c && (n = c.defaultView) && n.top !== n && n.addEventListener("unload", J), 
                        v.getById = ne((function(e) {
                            return u.appendChild(e).id = E.expando, !c.getElementsByName || !c.getElementsByName(E.expando).length;
                        })), v.disconnectedMatch = ne((function(e) {
                            return h.call(e, "*");
                        })), v.scope = ne((function() {
                            return c.querySelectorAll(":scope");
                        })), v.cssHas = ne((function() {
                            try {
                                return c.querySelector(":has(*,:jqfake)"), !1;
                            } catch (e) {
                                return !0;
                            }
                        })), v.getById ? (t.filter.ID = function(e) {
                            var t = e.replace(G, Q);
                            return function(e) {
                                return e.getAttribute("id") === t;
                            };
                        }, t.find.ID = function(e, t) {
                            if (void 0 !== t.getElementById && f) {
                                var n = t.getElementById(e);
                                return n ? [ n ] : [];
                            }
                        }) : (t.filter.ID = function(e) {
                            var t = e.replace(G, Q);
                            return function(e) {
                                var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                                return n && n.value === t;
                            };
                        }, t.find.ID = function(e, t) {
                            if (void 0 !== t.getElementById && f) {
                                var n, r, o, i = t.getElementById(e);
                                if (i) {
                                    if ((n = i.getAttributeNode("id")) && n.value === e) return [ i ];
                                    for (o = t.getElementsByName(e), r = 0; i = o[r++]; ) if ((n = i.getAttributeNode("id")) && n.value === e) return [ i ];
                                }
                                return [];
                            }
                        }), t.find.TAG = function(e, t) {
                            return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : t.querySelectorAll(e);
                        }, t.find.CLASS = function(e, t) {
                            if (void 0 !== t.getElementsByClassName && f) return t.getElementsByClassName(e);
                        }, d = [], ne((function(e) {
                            var t;
                            u.appendChild(e).innerHTML = "<a id='" + y + "' href='' disabled='disabled'></a><select id='" + y + "-\r\\' disabled='disabled'><option selected=''></option></select>", 
                            e.querySelectorAll("[selected]").length || d.push("\\[" + L + "*(?:value|" + S + ")"), 
                            e.querySelectorAll("[id~=" + y + "-]").length || d.push("~="), e.querySelectorAll("a#" + y + "+*").length || d.push(".#.+[+~]"), 
                            e.querySelectorAll(":checked").length || d.push(":checked"), (t = c.createElement("input")).setAttribute("type", "hidden"), 
                            e.appendChild(t).setAttribute("name", "D"), u.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && d.push(":enabled", ":disabled"), 
                            (t = c.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || d.push("\\[" + L + "*name" + L + "*=" + L + "*(?:''|\"\")");
                        })), v.cssHas || d.push(":has"), d = d.length && new RegExp(d.join("|")), C = function(e, t) {
                            if (e === t) return s = !0, 0;
                            var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                            return n || (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !v.sortDetached && t.compareDocumentPosition(e) === n ? e === c || e.ownerDocument == P && Z.contains(P, e) ? -1 : t === c || t.ownerDocument == P && Z.contains(P, t) ? 1 : o ? l.call(o, e) - l.call(o, t) : 0 : 4 & n ? -1 : 1);
                        }, c) : c;
                    }
                    for (e in Z.matches = function(e, t) {
                        return Z(e, null, null, t);
                    }, Z.matchesSelector = function(e, t) {
                        if (ce(e), f && !T[t + " "] && (!d || !d.test(t))) try {
                            var n = h.call(e, t);
                            if (n || v.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n;
                        } catch (e) {
                            T(t, !0);
                        }
                        return Z(t, c, null, [ e ]).length > 0;
                    }, Z.contains = function(e, t) {
                        return (e.ownerDocument || e) != c && ce(e), E.contains(e, t);
                    }, Z.attr = function(e, n) {
                        (e.ownerDocument || e) != c && ce(e);
                        var r = t.attrHandle[n.toLowerCase()], o = r && p.call(t.attrHandle, n.toLowerCase()) ? r(e, n, !f) : void 0;
                        return void 0 !== o ? o : e.getAttribute(n);
                    }, Z.error = function(e) {
                        throw new Error("Syntax error, unrecognized expression: " + e);
                    }, E.uniqueSort = function(e) {
                        var t, n = [], r = 0, i = 0;
                        if (s = !v.sortStable, o = !v.sortStable && a.call(e, 0), D.call(e, C), s) {
                            for (;t = e[i++]; ) t === e[i] && (r = n.push(i));
                            for (;r--; ) N.call(e, n[r], 1);
                        }
                        return o = null, e;
                    }, E.fn.uniqueSort = function() {
                        return this.pushStack(E.uniqueSort(a.apply(this)));
                    }, (t = E.expr = {
                        cacheLength: 50,
                        createPseudo: te,
                        match: X,
                        attrHandle: {},
                        find: {},
                        relative: {
                            ">": {
                                dir: "parentNode",
                                first: !0
                            },
                            " ": {
                                dir: "parentNode"
                            },
                            "+": {
                                dir: "previousSibling",
                                first: !0
                            },
                            "~": {
                                dir: "previousSibling"
                            }
                        },
                        preFilter: {
                            ATTR: function(e) {
                                return e[1] = e[1].replace(G, Q), e[3] = (e[3] || e[4] || e[5] || "").replace(G, Q), 
                                "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                            },
                            CHILD: function(e) {
                                return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || Z.error(e[0]), 
                                e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && Z.error(e[0]), 
                                e;
                            },
                            PSEUDO: function(e) {
                                var t, n = !e[6] && e[2];
                                return X.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && $.test(n) && (t = le(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), 
                                e[2] = n.slice(0, t)), e.slice(0, 3));
                            }
                        },
                        filter: {
                            TAG: function(e) {
                                var t = e.replace(G, Q).toLowerCase();
                                return "*" === e ? function() {
                                    return !0;
                                } : function(e) {
                                    return j(e, t);
                                };
                            },
                            CLASS: function(e) {
                                var t = x[e + " "];
                                return t || (t = new RegExp("(^|" + L + ")" + e + "(" + L + "|$)")) && x(e, (function(e) {
                                    return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "");
                                }));
                            },
                            ATTR: function(e, t, n) {
                                return function(r) {
                                    var o = Z.attr(r, e);
                                    return null == o ? "!=" === t : !t || (o += "", "=" === t ? o === n : "!=" === t ? o !== n : "^=" === t ? n && 0 === o.indexOf(n) : "*=" === t ? n && o.indexOf(n) > -1 : "$=" === t ? n && o.slice(-n.length) === n : "~=" === t ? (" " + o.replace(_, " ") + " ").indexOf(n) > -1 : "|=" === t && (o === n || o.slice(0, n.length + 1) === n + "-"));
                                };
                            },
                            CHILD: function(e, t, n, r, o) {
                                var i = "nth" !== e.slice(0, 3), s = "last" !== e.slice(-4), a = "of-type" === t;
                                return 1 === r && 0 === o ? function(e) {
                                    return !!e.parentNode;
                                } : function(t, n, c) {
                                    var u, l, f, d, p, h = i !== s ? "nextSibling" : "previousSibling", g = t.parentNode, v = a && t.nodeName.toLowerCase(), b = !c && !a, x = !1;
                                    if (g) {
                                        if (i) {
                                            for (;h; ) {
                                                for (f = t; f = f[h]; ) if (a ? j(f, v) : 1 === f.nodeType) return !1;
                                                p = h = "only" === e && !p && "nextSibling";
                                            }
                                            return !0;
                                        }
                                        if (p = [ s ? g.firstChild : g.lastChild ], s && b) {
                                            for (x = (d = (u = (l = g[y] || (g[y] = {}))[e] || [])[0] === m && u[1]) && u[2], 
                                            f = d && g.childNodes[d]; f = ++d && f && f[h] || (x = d = 0) || p.pop(); ) if (1 === f.nodeType && ++x && f === t) {
                                                l[e] = [ m, d, x ];
                                                break;
                                            }
                                        } else if (b && (x = d = (u = (l = t[y] || (t[y] = {}))[e] || [])[0] === m && u[1]), 
                                        !1 === x) for (;(f = ++d && f && f[h] || (x = d = 0) || p.pop()) && (!(a ? j(f, v) : 1 === f.nodeType) || !++x || (b && ((l = f[y] || (f[y] = {}))[e] = [ m, x ]), 
                                        f !== t)); ) ;
                                        return (x -= o) === r || x % r == 0 && x / r >= 0;
                                    }
                                };
                            },
                            PSEUDO: function(e, n) {
                                var r, o = t.pseudos[e] || t.setFilters[e.toLowerCase()] || Z.error("unsupported pseudo: " + e);
                                return o[y] ? o(n) : o.length > 1 ? (r = [ e, e, "", n ], t.setFilters.hasOwnProperty(e.toLowerCase()) ? te((function(e, t) {
                                    for (var r, i = o(e, n), s = i.length; s--; ) e[r = l.call(e, i[s])] = !(t[r] = i[s]);
                                })) : function(e) {
                                    return o(e, 0, r);
                                }) : o;
                            }
                        },
                        pseudos: {
                            not: te((function(e) {
                                var t = [], n = [], r = ye(e.replace(q, "$1"));
                                return r[y] ? te((function(e, t, n, o) {
                                    for (var i, s = r(e, null, o, []), a = e.length; a--; ) (i = s[a]) && (e[a] = !(t[a] = i));
                                })) : function(e, o, i) {
                                    return t[0] = e, r(t, null, i, n), t[0] = null, !n.pop();
                                };
                            })),
                            has: te((function(e) {
                                return function(t) {
                                    return Z(e, t).length > 0;
                                };
                            })),
                            contains: te((function(e) {
                                return e = e.replace(G, Q), function(t) {
                                    return (t.textContent || E.text(t)).indexOf(e) > -1;
                                };
                            })),
                            lang: te((function(e) {
                                return B.test(e || "") || Z.error("unsupported lang: " + e), e = e.replace(G, Q).toLowerCase(), 
                                function(t) {
                                    var n;
                                    do {
                                        if (n = f ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-");
                                    } while ((t = t.parentNode) && 1 === t.nodeType);
                                    return !1;
                                };
                            })),
                            target: function(e) {
                                var t = r.location && r.location.hash;
                                return t && t.slice(1) === e.id;
                            },
                            root: function(e) {
                                return e === u;
                            },
                            focus: function(e) {
                                return e === function() {
                                    try {
                                        return c.activeElement;
                                    } catch (e) {}
                                }() && c.hasFocus() && !!(e.type || e.href || ~e.tabIndex);
                            },
                            enabled: ie(!1),
                            disabled: ie(!0),
                            checked: function(e) {
                                return j(e, "input") && !!e.checked || j(e, "option") && !!e.selected;
                            },
                            selected: function(e) {
                                return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
                            },
                            empty: function(e) {
                                for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                                return !0;
                            },
                            parent: function(e) {
                                return !t.pseudos.empty(e);
                            },
                            header: function(e) {
                                return z.test(e.nodeName);
                            },
                            input: function(e) {
                                return U.test(e.nodeName);
                            },
                            button: function(e) {
                                return j(e, "input") && "button" === e.type || j(e, "button");
                            },
                            text: function(e) {
                                var t;
                                return j(e, "input") && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
                            },
                            first: se((function() {
                                return [ 0 ];
                            })),
                            last: se((function(e, t) {
                                return [ t - 1 ];
                            })),
                            eq: se((function(e, t, n) {
                                return [ n < 0 ? n + t : n ];
                            })),
                            even: se((function(e, t) {
                                for (var n = 0; n < t; n += 2) e.push(n);
                                return e;
                            })),
                            odd: se((function(e, t) {
                                for (var n = 1; n < t; n += 2) e.push(n);
                                return e;
                            })),
                            lt: se((function(e, t, n) {
                                var r;
                                for (r = n < 0 ? n + t : n > t ? t : n; --r >= 0; ) e.push(r);
                                return e;
                            })),
                            gt: se((function(e, t, n) {
                                for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
                                return e;
                            }))
                        }
                    }).pseudos.nth = t.pseudos.eq, {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) t.pseudos[e] = re(e);
                    for (e in {
                        submit: !0,
                        reset: !0
                    }) t.pseudos[e] = oe(e);
                    function ue() {}
                    function le(e, n) {
                        var r, o, i, s, a, c, u, l = w[e + " "];
                        if (l) return n ? 0 : l.slice(0);
                        for (a = e, c = [], u = t.preFilter; a; ) {
                            for (s in r && !(o = I.exec(a)) || (o && (a = a.slice(o[0].length) || a), c.push(i = [])), 
                            r = !1, (o = W.exec(a)) && (r = o.shift(), i.push({
                                value: r,
                                type: o[0].replace(q, " ")
                            }), a = a.slice(r.length)), t.filter) !(o = X[s].exec(a)) || u[s] && !(o = u[s](o)) || (r = o.shift(), 
                            i.push({
                                value: r,
                                type: s,
                                matches: o
                            }), a = a.slice(r.length));
                            if (!r) break;
                        }
                        return n ? a.length : a ? Z.error(e) : w(e, c).slice(0);
                    }
                    function fe(e) {
                        for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
                        return r;
                    }
                    function de(e, t, n) {
                        var r = t.dir, o = t.next, i = o || r, s = n && "parentNode" === i, a = b++;
                        return t.first ? function(t, n, o) {
                            for (;t = t[r]; ) if (1 === t.nodeType || s) return e(t, n, o);
                            return !1;
                        } : function(t, n, c) {
                            var u, l, f = [ m, a ];
                            if (c) {
                                for (;t = t[r]; ) if ((1 === t.nodeType || s) && e(t, n, c)) return !0;
                            } else for (;t = t[r]; ) if (1 === t.nodeType || s) if (l = t[y] || (t[y] = {}), 
                            o && j(t, o)) t = t[r] || t; else {
                                if ((u = l[i]) && u[0] === m && u[1] === a) return f[2] = u[2];
                                if (l[i] = f, f[2] = e(t, n, c)) return !0;
                            }
                            return !1;
                        };
                    }
                    function pe(e) {
                        return e.length > 1 ? function(t, n, r) {
                            for (var o = e.length; o--; ) if (!e[o](t, n, r)) return !1;
                            return !0;
                        } : e[0];
                    }
                    function he(e, t, n, r, o) {
                        for (var i, s = [], a = 0, c = e.length, u = null != t; a < c; a++) (i = e[a]) && (n && !n(i, r, o) || (s.push(i), 
                        u && t.push(a)));
                        return s;
                    }
                    function ge(e, t, n, r, o, i) {
                        return r && !r[y] && (r = ge(r)), o && !o[y] && (o = ge(o, i)), te((function(i, s, a, c) {
                            var u, f, d, p, h = [], v = [], y = s.length, m = i || function(e, t, n) {
                                for (var r = 0, o = t.length; r < o; r++) Z(e, t[r], n);
                                return n;
                            }(t || "*", a.nodeType ? [ a ] : a, []), b = !e || !i && t ? m : he(m, h, e, a, c);
                            if (n ? n(b, p = o || (i ? e : y || r) ? [] : s, a, c) : p = b, r) for (u = he(p, v), 
                            r(u, [], a, c), f = u.length; f--; ) (d = u[f]) && (p[v[f]] = !(b[v[f]] = d));
                            if (i) {
                                if (o || e) {
                                    if (o) {
                                        for (u = [], f = p.length; f--; ) (d = p[f]) && u.push(b[f] = d);
                                        o(null, p = [], u, c);
                                    }
                                    for (f = p.length; f--; ) (d = p[f]) && (u = o ? l.call(i, d) : h[f]) > -1 && (i[u] = !(s[u] = d));
                                }
                            } else p = he(p === s ? p.splice(y, p.length) : p), o ? o(null, s, p, c) : g.apply(s, p);
                        }));
                    }
                    function ve(e) {
                        for (var r, o, i, s = e.length, a = t.relative[e[0].type], c = a || t.relative[" "], u = a ? 1 : 0, f = de((function(e) {
                            return e === r;
                        }), c, !0), d = de((function(e) {
                            return l.call(r, e) > -1;
                        }), c, !0), p = [ function(e, t, o) {
                            var i = !a && (o || t != n) || ((r = t).nodeType ? f(e, t, o) : d(e, t, o));
                            return r = null, i;
                        } ]; u < s; u++) if (o = t.relative[e[u].type]) p = [ de(pe(p), o) ]; else {
                            if ((o = t.filter[e[u].type].apply(null, e[u].matches))[y]) {
                                for (i = ++u; i < s && !t.relative[e[i].type]; i++) ;
                                return ge(u > 1 && pe(p), u > 1 && fe(e.slice(0, u - 1).concat({
                                    value: " " === e[u - 2].type ? "*" : ""
                                })).replace(q, "$1"), o, u < i && ve(e.slice(u, i)), i < s && ve(e = e.slice(i)), i < s && fe(e));
                            }
                            p.push(o);
                        }
                        return pe(p);
                    }
                    function ye(e, r) {
                        var o, i = [], s = [], a = k[e + " "];
                        if (!a) {
                            for (r || (r = le(e)), o = r.length; o--; ) (a = ve(r[o]))[y] ? i.push(a) : s.push(a);
                            (a = k(e, function(e, r) {
                                var o = r.length > 0, i = e.length > 0, s = function(s, a, u, l, d) {
                                    var p, h, v, y = 0, b = "0", x = s && [], w = [], k = n, T = s || i && t.find.TAG("*", d), C = m += null == k ? 1 : Math.random() || .1, S = T.length;
                                    for (d && (n = a == c || a || d); b !== S && null != (p = T[b]); b++) {
                                        if (i && p) {
                                            for (h = 0, a || p.ownerDocument == c || (ce(p), u = !f); v = e[h++]; ) if (v(p, a || c, u)) {
                                                g.call(l, p);
                                                break;
                                            }
                                            d && (m = C);
                                        }
                                        o && ((p = !v && p) && y--, s && x.push(p));
                                    }
                                    if (y += b, o && b !== y) {
                                        for (h = 0; v = r[h++]; ) v(x, w, a, u);
                                        if (s) {
                                            if (y > 0) for (;b--; ) x[b] || w[b] || (w[b] = A.call(l));
                                            w = he(w);
                                        }
                                        g.apply(l, w), d && !s && w.length > 0 && y + r.length > 1 && E.uniqueSort(l);
                                    }
                                    return d && (m = C, n = k), x;
                                };
                                return o ? te(s) : s;
                            }(s, i))).selector = e;
                        }
                        return a;
                    }
                    function me(e, n, r, o) {
                        var i, s, a, c, u, l = "function" == typeof e && e, d = !o && le(e = l.selector || e);
                        if (r = r || [], 1 === d.length) {
                            if ((s = d[0] = d[0].slice(0)).length > 2 && "ID" === (a = s[0]).type && 9 === n.nodeType && f && t.relative[s[1].type]) {
                                if (!(n = (t.find.ID(a.matches[0].replace(G, Q), n) || [])[0])) return r;
                                l && (n = n.parentNode), e = e.slice(s.shift().value.length);
                            }
                            for (i = X.needsContext.test(e) ? 0 : s.length; i-- && (a = s[i], !t.relative[c = a.type]); ) if ((u = t.find[c]) && (o = u(a.matches[0].replace(G, Q), Y.test(s[0].type) && ae(n.parentNode) || n))) {
                                if (s.splice(i, 1), !(e = o.length && fe(s))) return g.apply(r, o), r;
                                break;
                            }
                        }
                        return (l || ye(e, d))(o, n, !f, r, !n || Y.test(e) && ae(n.parentNode) || n), r;
                    }
                    ue.prototype = t.filters = t.pseudos, t.setFilters = new ue, v.sortStable = y.split("").sort(C).join("") === y, 
                    ce(), v.sortDetached = ne((function(e) {
                        return 1 & e.compareDocumentPosition(c.createElement("fieldset"));
                    })), E.find = Z, E.expr[":"] = E.expr.pseudos, E.unique = E.uniqueSort, Z.compile = ye, 
                    Z.select = me, Z.setDocument = ce, Z.tokenize = le, Z.escape = E.escapeSelector, 
                    Z.getText = E.text, Z.isXML = E.isXMLDoc, Z.selectors = E.expr, Z.support = E.support, 
                    Z.uniqueSort = E.uniqueSort;
                }();
                var R = function(e, t, n) {
                    for (var r = [], o = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; ) if (1 === e.nodeType) {
                        if (o && E(e).is(n)) break;
                        r.push(e);
                    }
                    return r;
                }, _ = function(e, t) {
                    for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                    return n;
                }, I = E.expr.match.needsContext, W = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
                function F(e, t, n) {
                    return y(t) ? E.grep(e, (function(e, r) {
                        return !!t.call(e, r, e) !== n;
                    })) : t.nodeType ? E.grep(e, (function(e) {
                        return e === t !== n;
                    })) : "string" != typeof t ? E.grep(e, (function(e) {
                        return l.call(t, e) > -1 !== n;
                    })) : E.filter(t, e, n);
                }
                E.filter = function(e, t, n) {
                    var r = t[0];
                    return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? E.find.matchesSelector(r, e) ? [ r ] : [] : E.find.matches(e, E.grep(t, (function(e) {
                        return 1 === e.nodeType;
                    })));
                }, E.fn.extend({
                    find: function(e) {
                        var t, n, r = this.length, o = this;
                        if ("string" != typeof e) return this.pushStack(E(e).filter((function() {
                            for (t = 0; t < r; t++) if (E.contains(o[t], this)) return !0;
                        })));
                        for (n = this.pushStack([]), t = 0; t < r; t++) E.find(e, o[t], n);
                        return r > 1 ? E.uniqueSort(n) : n;
                    },
                    filter: function(e) {
                        return this.pushStack(F(this, e || [], !1));
                    },
                    not: function(e) {
                        return this.pushStack(F(this, e || [], !0));
                    },
                    is: function(e) {
                        return !!F(this, "string" == typeof e && I.test(e) ? E(e) : e || [], !1).length;
                    }
                });
                var $, B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
                (E.fn.init = function(e, t, n) {
                    var r, o;
                    if (!e) return this;
                    if (n = n || $, "string" == typeof e) {
                        if (!(r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [ null, e, null ] : B.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                        if (r[1]) {
                            if (t = t instanceof E ? t[0] : t, E.merge(this, E.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : b, !0)), 
                            W.test(r[1]) && E.isPlainObject(t)) for (r in t) y(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                            return this;
                        }
                        return (o = b.getElementById(r[2])) && (this[0] = o, this.length = 1), this;
                    }
                    return e.nodeType ? (this[0] = e, this.length = 1, this) : y(e) ? void 0 !== n.ready ? n.ready(e) : e(E) : E.makeArray(e, this);
                }).prototype = E.fn, $ = E(b);
                var X = /^(?:parents|prev(?:Until|All))/, U = {
                    children: !0,
                    contents: !0,
                    next: !0,
                    prev: !0
                };
                function z(e, t) {
                    for (;(e = e[t]) && 1 !== e.nodeType; ) ;
                    return e;
                }
                E.fn.extend({
                    has: function(e) {
                        var t = E(e, this), n = t.length;
                        return this.filter((function() {
                            for (var e = 0; e < n; e++) if (E.contains(this, t[e])) return !0;
                        }));
                    },
                    closest: function(e, t) {
                        var n, r = 0, o = this.length, i = [], s = "string" != typeof e && E(e);
                        if (!I.test(e)) for (;r < o; r++) for (n = this[r]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && E.find.matchesSelector(n, e))) {
                            i.push(n);
                            break;
                        }
                        return this.pushStack(i.length > 1 ? E.uniqueSort(i) : i);
                    },
                    index: function(e) {
                        return e ? "string" == typeof e ? l.call(E(e), this[0]) : l.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
                    },
                    add: function(e, t) {
                        return this.pushStack(E.uniqueSort(E.merge(this.get(), E(e, t))));
                    },
                    addBack: function(e) {
                        return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
                    }
                }), E.each({
                    parent: function(e) {
                        var t = e.parentNode;
                        return t && 11 !== t.nodeType ? t : null;
                    },
                    parents: function(e) {
                        return R(e, "parentNode");
                    },
                    parentsUntil: function(e, t, n) {
                        return R(e, "parentNode", n);
                    },
                    next: function(e) {
                        return z(e, "nextSibling");
                    },
                    prev: function(e) {
                        return z(e, "previousSibling");
                    },
                    nextAll: function(e) {
                        return R(e, "nextSibling");
                    },
                    prevAll: function(e) {
                        return R(e, "previousSibling");
                    },
                    nextUntil: function(e, t, n) {
                        return R(e, "nextSibling", n);
                    },
                    prevUntil: function(e, t, n) {
                        return R(e, "previousSibling", n);
                    },
                    siblings: function(e) {
                        return _((e.parentNode || {}).firstChild, e);
                    },
                    children: function(e) {
                        return _(e.firstChild);
                    },
                    contents: function(e) {
                        return null != e.contentDocument && s(e.contentDocument) ? e.contentDocument : (j(e, "template") && (e = e.content || e), 
                        E.merge([], e.childNodes));
                    }
                }, (function(e, t) {
                    E.fn[e] = function(n, r) {
                        var o = E.map(this, t, n);
                        return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (o = E.filter(r, o)), 
                        this.length > 1 && (U[e] || E.uniqueSort(o), X.test(e) && o.reverse()), this.pushStack(o);
                    };
                }));
                var V = /[^\x20\t\r\n\f]+/g;
                function Y(e) {
                    return e;
                }
                function G(e) {
                    throw e;
                }
                function Q(e, t, n, r) {
                    var o;
                    try {
                        e && y(o = e.promise) ? o.call(e).done(t).fail(n) : e && y(o = e.then) ? o.call(e, t, n) : t.apply(void 0, [ e ].slice(r));
                    } catch (e) {
                        n.apply(void 0, [ e ]);
                    }
                }
                E.Callbacks = function(e) {
                    e = "string" == typeof e ? function(e) {
                        var t = {};
                        return E.each(e.match(V) || [], (function(e, n) {
                            t[n] = !0;
                        })), t;
                    }(e) : E.extend({}, e);
                    var t, n, r, o, i = [], s = [], a = -1, c = function() {
                        for (o = o || e.once, r = t = !0; s.length; a = -1) for (n = s.shift(); ++a < i.length; ) !1 === i[a].apply(n[0], n[1]) && e.stopOnFalse && (a = i.length, 
                        n = !1);
                        e.memory || (n = !1), t = !1, o && (i = n ? [] : "");
                    }, u = {
                        add: function() {
                            return i && (n && !t && (a = i.length - 1, s.push(n)), function t(n) {
                                E.each(n, (function(n, r) {
                                    y(r) ? e.unique && u.has(r) || i.push(r) : r && r.length && "string" !== k(r) && t(r);
                                }));
                            }(arguments), n && !t && c()), this;
                        },
                        remove: function() {
                            return E.each(arguments, (function(e, t) {
                                for (var n; (n = E.inArray(t, i, n)) > -1; ) i.splice(n, 1), n <= a && a--;
                            })), this;
                        },
                        has: function(e) {
                            return e ? E.inArray(e, i) > -1 : i.length > 0;
                        },
                        empty: function() {
                            return i && (i = []), this;
                        },
                        disable: function() {
                            return o = s = [], i = n = "", this;
                        },
                        disabled: function() {
                            return !i;
                        },
                        lock: function() {
                            return o = s = [], n || t || (i = n = ""), this;
                        },
                        locked: function() {
                            return !!o;
                        },
                        fireWith: function(e, n) {
                            return o || (n = [ e, (n = n || []).slice ? n.slice() : n ], s.push(n), t || c()), 
                            this;
                        },
                        fire: function() {
                            return u.fireWith(this, arguments), this;
                        },
                        fired: function() {
                            return !!r;
                        }
                    };
                    return u;
                }, E.extend({
                    Deferred: function(e) {
                        var t = [ [ "notify", "progress", E.Callbacks("memory"), E.Callbacks("memory"), 2 ], [ "resolve", "done", E.Callbacks("once memory"), E.Callbacks("once memory"), 0, "resolved" ], [ "reject", "fail", E.Callbacks("once memory"), E.Callbacks("once memory"), 1, "rejected" ] ], n = "pending", o = {
                            state: function() {
                                return n;
                            },
                            always: function() {
                                return i.done(arguments).fail(arguments), this;
                            },
                            catch: function(e) {
                                return o.then(null, e);
                            },
                            pipe: function() {
                                var e = arguments;
                                return E.Deferred((function(n) {
                                    E.each(t, (function(t, r) {
                                        var o = y(e[r[4]]) && e[r[4]];
                                        i[r[1]]((function() {
                                            var e = o && o.apply(this, arguments);
                                            e && y(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[r[0] + "With"](this, o ? [ e ] : arguments);
                                        }));
                                    })), e = null;
                                })).promise();
                            },
                            then: function(e, n, o) {
                                var i = 0;
                                function s(e, t, n, o) {
                                    return function() {
                                        var a = this, c = arguments, u = function() {
                                            var r, u;
                                            if (!(e < i)) {
                                                if ((r = n.apply(a, c)) === t.promise()) throw new TypeError("Thenable self-resolution");
                                                u = r && ("object" == typeof r || "function" == typeof r) && r.then, y(u) ? o ? u.call(r, s(i, t, Y, o), s(i, t, G, o)) : (i++, 
                                                u.call(r, s(i, t, Y, o), s(i, t, G, o), s(i, t, Y, t.notifyWith))) : (n !== Y && (a = void 0, 
                                                c = [ r ]), (o || t.resolveWith)(a, c));
                                            }
                                        }, l = o ? u : function() {
                                            try {
                                                u();
                                            } catch (r) {
                                                E.Deferred.exceptionHook && E.Deferred.exceptionHook(r, l.error), e + 1 >= i && (n !== G && (a = void 0, 
                                                c = [ r ]), t.rejectWith(a, c));
                                            }
                                        };
                                        e ? l() : (E.Deferred.getErrorHook ? l.error = E.Deferred.getErrorHook() : E.Deferred.getStackHook && (l.error = E.Deferred.getStackHook()), 
                                        r.setTimeout(l));
                                    };
                                }
                                return E.Deferred((function(r) {
                                    t[0][3].add(s(0, r, y(o) ? o : Y, r.notifyWith)), t[1][3].add(s(0, r, y(e) ? e : Y)), 
                                    t[2][3].add(s(0, r, y(n) ? n : G));
                                })).promise();
                            },
                            promise: function(e) {
                                return null != e ? E.extend(e, o) : o;
                            }
                        }, i = {};
                        return E.each(t, (function(e, r) {
                            var s = r[2], a = r[5];
                            o[r[1]] = s.add, a && s.add((function() {
                                n = a;
                            }), t[3 - e][2].disable, t[3 - e][3].disable, t[0][2].lock, t[0][3].lock), s.add(r[3].fire), 
                            i[r[0]] = function() {
                                return i[r[0] + "With"](this === i ? void 0 : this, arguments), this;
                            }, i[r[0] + "With"] = s.fireWith;
                        })), o.promise(i), e && e.call(i, i), i;
                    },
                    when: function(e) {
                        var t = arguments.length, n = t, r = Array(n), o = a.call(arguments), i = E.Deferred(), s = function(e) {
                            return function(n) {
                                r[e] = this, o[e] = arguments.length > 1 ? a.call(arguments) : n, --t || i.resolveWith(r, o);
                            };
                        };
                        if (t <= 1 && (Q(e, i.done(s(n)).resolve, i.reject, !t), "pending" === i.state() || y(o[n] && o[n].then))) return i.then();
                        for (;n--; ) Q(o[n], s(n), i.reject);
                        return i.promise();
                    }
                });
                var J = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
                E.Deferred.exceptionHook = function(e, t) {
                    r.console && r.console.warn && e && J.test(e.name) && r.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t);
                }, E.readyException = function(e) {
                    r.setTimeout((function() {
                        throw e;
                    }));
                };
                var K = E.Deferred();
                function Z() {
                    b.removeEventListener("DOMContentLoaded", Z), r.removeEventListener("load", Z), 
                    E.ready();
                }
                E.fn.ready = function(e) {
                    return K.then(e).catch((function(e) {
                        E.readyException(e);
                    })), this;
                }, E.extend({
                    isReady: !1,
                    readyWait: 1,
                    ready: function(e) {
                        (!0 === e ? --E.readyWait : E.isReady) || (E.isReady = !0, !0 !== e && --E.readyWait > 0 || K.resolveWith(b, [ E ]));
                    }
                }), E.ready.then = K.then, "complete" === b.readyState || "loading" !== b.readyState && !b.documentElement.doScroll ? r.setTimeout(E.ready) : (b.addEventListener("DOMContentLoaded", Z), 
                r.addEventListener("load", Z));
                var ee = function(e, t, n, r, o, i, s) {
                    var a = 0, c = e.length, u = null == n;
                    if ("object" === k(n)) for (a in o = !0, n) ee(e, t, a, n[a], !0, i, s); else if (void 0 !== r && (o = !0, 
                    y(r) || (s = !0), u && (s ? (t.call(e, r), t = null) : (u = t, t = function(e, t, n) {
                        return u.call(E(e), n);
                    })), t)) for (;a < c; a++) t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
                    return o ? e : u ? t.call(e) : c ? t(e[0], n) : i;
                }, te = /^-ms-/, ne = /-([a-z])/g;
                function re(e, t) {
                    return t.toUpperCase();
                }
                function oe(e) {
                    return e.replace(te, "ms-").replace(ne, re);
                }
                var ie = function(e) {
                    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
                };
                function se() {
                    this.expando = E.expando + se.uid++;
                }
                se.uid = 1, se.prototype = {
                    cache: function(e) {
                        var t = e[this.expando];
                        return t || (t = {}, ie(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                            value: t,
                            configurable: !0
                        }))), t;
                    },
                    set: function(e, t, n) {
                        var r, o = this.cache(e);
                        if ("string" == typeof t) o[oe(t)] = n; else for (r in t) o[oe(r)] = t[r];
                        return o;
                    },
                    get: function(e, t) {
                        return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][oe(t)];
                    },
                    access: function(e, t, n) {
                        return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), 
                        void 0 !== n ? n : t);
                    },
                    remove: function(e, t) {
                        var n, r = e[this.expando];
                        if (void 0 !== r) {
                            if (void 0 !== t) {
                                n = (t = Array.isArray(t) ? t.map(oe) : (t = oe(t)) in r ? [ t ] : t.match(V) || []).length;
                                for (;n--; ) delete r[t[n]];
                            }
                            (void 0 === t || E.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
                        }
                    },
                    hasData: function(e) {
                        var t = e[this.expando];
                        return void 0 !== t && !E.isEmptyObject(t);
                    }
                };
                var ae = new se, ce = new se, ue = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, le = /[A-Z]/g;
                function fe(e, t, n) {
                    var r;
                    if (void 0 === n && 1 === e.nodeType) if (r = "data-" + t.replace(le, "-$&").toLowerCase(), 
                    "string" == typeof (n = e.getAttribute(r))) {
                        try {
                            n = function(e) {
                                return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : ue.test(e) ? JSON.parse(e) : e);
                            }(n);
                        } catch (e) {}
                        ce.set(e, t, n);
                    } else n = void 0;
                    return n;
                }
                E.extend({
                    hasData: function(e) {
                        return ce.hasData(e) || ae.hasData(e);
                    },
                    data: function(e, t, n) {
                        return ce.access(e, t, n);
                    },
                    removeData: function(e, t) {
                        ce.remove(e, t);
                    },
                    _data: function(e, t, n) {
                        return ae.access(e, t, n);
                    },
                    _removeData: function(e, t) {
                        ae.remove(e, t);
                    }
                }), E.fn.extend({
                    data: function(e, t) {
                        var n, r, o, i = this[0], s = i && i.attributes;
                        if (void 0 === e) {
                            if (this.length && (o = ce.get(i), 1 === i.nodeType && !ae.get(i, "hasDataAttrs"))) {
                                for (n = s.length; n--; ) s[n] && 0 === (r = s[n].name).indexOf("data-") && (r = oe(r.slice(5)), 
                                fe(i, r, o[r]));
                                ae.set(i, "hasDataAttrs", !0);
                            }
                            return o;
                        }
                        return "object" == typeof e ? this.each((function() {
                            ce.set(this, e);
                        })) : ee(this, (function(t) {
                            var n;
                            if (i && void 0 === t) return void 0 !== (n = ce.get(i, e)) || void 0 !== (n = fe(i, e)) ? n : void 0;
                            this.each((function() {
                                ce.set(this, e, t);
                            }));
                        }), null, t, arguments.length > 1, null, !0);
                    },
                    removeData: function(e) {
                        return this.each((function() {
                            ce.remove(this, e);
                        }));
                    }
                }), E.extend({
                    queue: function(e, t, n) {
                        var r;
                        if (e) return t = (t || "fx") + "queue", r = ae.get(e, t), n && (!r || Array.isArray(n) ? r = ae.access(e, t, E.makeArray(n)) : r.push(n)), 
                        r || [];
                    },
                    dequeue: function(e, t) {
                        t = t || "fx";
                        var n = E.queue(e, t), r = n.length, o = n.shift(), i = E._queueHooks(e, t);
                        "inprogress" === o && (o = n.shift(), r--), o && ("fx" === t && n.unshift("inprogress"), 
                        delete i.stop, o.call(e, (function() {
                            E.dequeue(e, t);
                        }), i)), !r && i && i.empty.fire();
                    },
                    _queueHooks: function(e, t) {
                        var n = t + "queueHooks";
                        return ae.get(e, n) || ae.access(e, n, {
                            empty: E.Callbacks("once memory").add((function() {
                                ae.remove(e, [ t + "queue", n ]);
                            }))
                        });
                    }
                }), E.fn.extend({
                    queue: function(e, t) {
                        var n = 2;
                        return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? E.queue(this[0], e) : void 0 === t ? this : this.each((function() {
                            var n = E.queue(this, e, t);
                            E._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && E.dequeue(this, e);
                        }));
                    },
                    dequeue: function(e) {
                        return this.each((function() {
                            E.dequeue(this, e);
                        }));
                    },
                    clearQueue: function(e) {
                        return this.queue(e || "fx", []);
                    },
                    promise: function(e, t) {
                        var n, r = 1, o = E.Deferred(), i = this, s = this.length, a = function() {
                            --r || o.resolveWith(i, [ i ]);
                        };
                        for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--; ) (n = ae.get(i[s], e + "queueHooks")) && n.empty && (r++, 
                        n.empty.add(a));
                        return a(), o.promise(t);
                    }
                });
                var de = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, pe = new RegExp("^(?:([+-])=|)(" + de + ")([a-z%]*)$", "i"), he = [ "Top", "Right", "Bottom", "Left" ], ge = b.documentElement, ve = function(e) {
                    return E.contains(e.ownerDocument, e);
                }, ye = {
                    composed: !0
                };
                ge.getRootNode && (ve = function(e) {
                    return E.contains(e.ownerDocument, e) || e.getRootNode(ye) === e.ownerDocument;
                });
                var me = function(e, t) {
                    return "none" === (e = t || e).style.display || "" === e.style.display && ve(e) && "none" === E.css(e, "display");
                };
                function be(e, t, n, r) {
                    var o, i, s = 20, a = r ? function() {
                        return r.cur();
                    } : function() {
                        return E.css(e, t, "");
                    }, c = a(), u = n && n[3] || (E.cssNumber[t] ? "" : "px"), l = e.nodeType && (E.cssNumber[t] || "px" !== u && +c) && pe.exec(E.css(e, t));
                    if (l && l[3] !== u) {
                        for (c /= 2, u = u || l[3], l = +c || 1; s--; ) E.style(e, t, l + u), (1 - i) * (1 - (i = a() / c || .5)) <= 0 && (s = 0), 
                        l /= i;
                        l *= 2, E.style(e, t, l + u), n = n || [];
                    }
                    return n && (l = +l || +c || 0, o = n[1] ? l + (n[1] + 1) * n[2] : +n[2], r && (r.unit = u, 
                    r.start = l, r.end = o)), o;
                }
                var xe = {};
                function we(e) {
                    var t, n = e.ownerDocument, r = e.nodeName, o = xe[r];
                    return o || (t = n.body.appendChild(n.createElement(r)), o = E.css(t, "display"), 
                    t.parentNode.removeChild(t), "none" === o && (o = "block"), xe[r] = o, o);
                }
                function ke(e, t) {
                    for (var n, r, o = [], i = 0, s = e.length; i < s; i++) (r = e[i]).style && (n = r.style.display, 
                    t ? ("none" === n && (o[i] = ae.get(r, "display") || null, o[i] || (r.style.display = "")), 
                    "" === r.style.display && me(r) && (o[i] = we(r))) : "none" !== n && (o[i] = "none", 
                    ae.set(r, "display", n)));
                    for (i = 0; i < s; i++) null != o[i] && (e[i].style.display = o[i]);
                    return e;
                }
                E.fn.extend({
                    show: function() {
                        return ke(this, !0);
                    },
                    hide: function() {
                        return ke(this);
                    },
                    toggle: function(e) {
                        return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each((function() {
                            me(this) ? E(this).show() : E(this).hide();
                        }));
                    }
                });
                var Te, Ce, Ee = /^(?:checkbox|radio)$/i, Se = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, je = /^$|^module$|\/(?:java|ecma)script/i;
                Te = b.createDocumentFragment().appendChild(b.createElement("div")), (Ce = b.createElement("input")).setAttribute("type", "radio"), 
                Ce.setAttribute("checked", "checked"), Ce.setAttribute("name", "t"), Te.appendChild(Ce), 
                v.checkClone = Te.cloneNode(!0).cloneNode(!0).lastChild.checked, Te.innerHTML = "<textarea>x</textarea>", 
                v.noCloneChecked = !!Te.cloneNode(!0).lastChild.defaultValue, Te.innerHTML = "<option></option>", 
                v.option = !!Te.lastChild;
                var Ae = {
                    thead: [ 1, "<table>", "</table>" ],
                    col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
                    tr: [ 2, "<table><tbody>", "</tbody></table>" ],
                    td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
                    _default: [ 0, "", "" ]
                };
                function De(e, t) {
                    var n;
                    return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], 
                    void 0 === t || t && j(e, t) ? E.merge([ e ], n) : n;
                }
                function Ne(e, t) {
                    for (var n = 0, r = e.length; n < r; n++) ae.set(e[n], "globalEval", !t || ae.get(t[n], "globalEval"));
                }
                Ae.tbody = Ae.tfoot = Ae.colgroup = Ae.caption = Ae.thead, Ae.th = Ae.td, v.option || (Ae.optgroup = Ae.option = [ 1, "<select multiple='multiple'>", "</select>" ]);
                var Le = /<|&#?\w+;/;
                function qe(e, t, n, r, o) {
                    for (var i, s, a, c, u, l, f = t.createDocumentFragment(), d = [], p = 0, h = e.length; p < h; p++) if ((i = e[p]) || 0 === i) if ("object" === k(i)) E.merge(d, i.nodeType ? [ i ] : i); else if (Le.test(i)) {
                        for (s = s || f.appendChild(t.createElement("div")), a = (Se.exec(i) || [ "", "" ])[1].toLowerCase(), 
                        c = Ae[a] || Ae._default, s.innerHTML = c[1] + E.htmlPrefilter(i) + c[2], l = c[0]; l--; ) s = s.lastChild;
                        E.merge(d, s.childNodes), (s = f.firstChild).textContent = "";
                    } else d.push(t.createTextNode(i));
                    for (f.textContent = "", p = 0; i = d[p++]; ) if (r && E.inArray(i, r) > -1) o && o.push(i); else if (u = ve(i), 
                    s = De(f.appendChild(i), "script"), u && Ne(s), n) for (l = 0; i = s[l++]; ) je.test(i.type || "") && n.push(i);
                    return f;
                }
                var He = /^([^.]*)(?:\.(.+)|)/;
                function Oe() {
                    return !0;
                }
                function Pe() {
                    return !1;
                }
                function Me(e, t, n, r, o, i) {
                    var s, a;
                    if ("object" == typeof t) {
                        for (a in "string" != typeof n && (r = r || n, n = void 0), t) Me(e, a, n, r, t[a], i);
                        return e;
                    }
                    if (null == r && null == o ? (o = n, r = n = void 0) : null == o && ("string" == typeof n ? (o = r, 
                    r = void 0) : (o = r, r = n, n = void 0)), !1 === o) o = Pe; else if (!o) return e;
                    return 1 === i && (s = o, (o = function(e) {
                        return E().off(e), s.apply(this, arguments);
                    }).guid = s.guid || (s.guid = E.guid++)), e.each((function() {
                        E.event.add(this, t, o, r, n);
                    }));
                }
                function Re(e, t, n) {
                    n ? (ae.set(e, t, !1), E.event.add(e, t, {
                        namespace: !1,
                        handler: function(e) {
                            var n, r = ae.get(this, t);
                            if (1 & e.isTrigger && this[t]) {
                                if (r) (E.event.special[t] || {}).delegateType && e.stopPropagation(); else if (r = a.call(arguments), 
                                ae.set(this, t, r), this[t](), n = ae.get(this, t), ae.set(this, t, !1), r !== n) return e.stopImmediatePropagation(), 
                                e.preventDefault(), n;
                            } else r && (ae.set(this, t, E.event.trigger(r[0], r.slice(1), this)), e.stopPropagation(), 
                            e.isImmediatePropagationStopped = Oe);
                        }
                    })) : void 0 === ae.get(e, t) && E.event.add(e, t, Oe);
                }
                E.event = {
                    global: {},
                    add: function(e, t, n, r, o) {
                        var i, s, a, c, u, l, f, d, p, h, g, v = ae.get(e);
                        if (ie(e)) for (n.handler && (n = (i = n).handler, o = i.selector), o && E.find.matchesSelector(ge, o), 
                        n.guid || (n.guid = E.guid++), (c = v.events) || (c = v.events = Object.create(null)), 
                        (s = v.handle) || (s = v.handle = function(t) {
                            return void 0 !== E && E.event.triggered !== t.type ? E.event.dispatch.apply(e, arguments) : void 0;
                        }), u = (t = (t || "").match(V) || [ "" ]).length; u--; ) p = g = (a = He.exec(t[u]) || [])[1], 
                        h = (a[2] || "").split(".").sort(), p && (f = E.event.special[p] || {}, p = (o ? f.delegateType : f.bindType) || p, 
                        f = E.event.special[p] || {}, l = E.extend({
                            type: p,
                            origType: g,
                            data: r,
                            handler: n,
                            guid: n.guid,
                            selector: o,
                            needsContext: o && E.expr.match.needsContext.test(o),
                            namespace: h.join(".")
                        }, i), (d = c[p]) || ((d = c[p] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(e, r, h, s) || e.addEventListener && e.addEventListener(p, s)), 
                        f.add && (f.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)), o ? d.splice(d.delegateCount++, 0, l) : d.push(l), 
                        E.event.global[p] = !0);
                    },
                    remove: function(e, t, n, r, o) {
                        var i, s, a, c, u, l, f, d, p, h, g, v = ae.hasData(e) && ae.get(e);
                        if (v && (c = v.events)) {
                            for (u = (t = (t || "").match(V) || [ "" ]).length; u--; ) if (p = g = (a = He.exec(t[u]) || [])[1], 
                            h = (a[2] || "").split(".").sort(), p) {
                                for (f = E.event.special[p] || {}, d = c[p = (r ? f.delegateType : f.bindType) || p] || [], 
                                a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = i = d.length; i--; ) l = d[i], 
                                !o && g !== l.origType || n && n.guid !== l.guid || a && !a.test(l.namespace) || r && r !== l.selector && ("**" !== r || !l.selector) || (d.splice(i, 1), 
                                l.selector && d.delegateCount--, f.remove && f.remove.call(e, l));
                                s && !d.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || E.removeEvent(e, p, v.handle), 
                                delete c[p]);
                            } else for (p in c) E.event.remove(e, p + t[u], n, r, !0);
                            E.isEmptyObject(c) && ae.remove(e, "handle events");
                        }
                    },
                    dispatch: function(e) {
                        var t, n, r, o, i, s, a = new Array(arguments.length), c = E.event.fix(e), u = (ae.get(this, "events") || Object.create(null))[c.type] || [], l = E.event.special[c.type] || {};
                        for (a[0] = c, t = 1; t < arguments.length; t++) a[t] = arguments[t];
                        if (c.delegateTarget = this, !l.preDispatch || !1 !== l.preDispatch.call(this, c)) {
                            for (s = E.event.handlers.call(this, c, u), t = 0; (o = s[t++]) && !c.isPropagationStopped(); ) for (c.currentTarget = o.elem, 
                            n = 0; (i = o.handlers[n++]) && !c.isImmediatePropagationStopped(); ) c.rnamespace && !1 !== i.namespace && !c.rnamespace.test(i.namespace) || (c.handleObj = i, 
                            c.data = i.data, void 0 !== (r = ((E.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, a)) && !1 === (c.result = r) && (c.preventDefault(), 
                            c.stopPropagation()));
                            return l.postDispatch && l.postDispatch.call(this, c), c.result;
                        }
                    },
                    handlers: function(e, t) {
                        var n, r, o, i, s, a = [], c = t.delegateCount, u = e.target;
                        if (c && u.nodeType && !("click" === e.type && e.button >= 1)) for (;u !== this; u = u.parentNode || this) if (1 === u.nodeType && ("click" !== e.type || !0 !== u.disabled)) {
                            for (i = [], s = {}, n = 0; n < c; n++) void 0 === s[o = (r = t[n]).selector + " "] && (s[o] = r.needsContext ? E(o, this).index(u) > -1 : E.find(o, this, null, [ u ]).length), 
                            s[o] && i.push(r);
                            i.length && a.push({
                                elem: u,
                                handlers: i
                            });
                        }
                        return u = this, c < t.length && a.push({
                            elem: u,
                            handlers: t.slice(c)
                        }), a;
                    },
                    addProp: function(e, t) {
                        Object.defineProperty(E.Event.prototype, e, {
                            enumerable: !0,
                            configurable: !0,
                            get: y(t) ? function() {
                                if (this.originalEvent) return t(this.originalEvent);
                            } : function() {
                                if (this.originalEvent) return this.originalEvent[e];
                            },
                            set: function(t) {
                                Object.defineProperty(this, e, {
                                    enumerable: !0,
                                    configurable: !0,
                                    writable: !0,
                                    value: t
                                });
                            }
                        });
                    },
                    fix: function(e) {
                        return e[E.expando] ? e : new E.Event(e);
                    },
                    special: {
                        load: {
                            noBubble: !0
                        },
                        click: {
                            setup: function(e) {
                                var t = this || e;
                                return Ee.test(t.type) && t.click && j(t, "input") && Re(t, "click", !0), !1;
                            },
                            trigger: function(e) {
                                var t = this || e;
                                return Ee.test(t.type) && t.click && j(t, "input") && Re(t, "click"), !0;
                            },
                            _default: function(e) {
                                var t = e.target;
                                return Ee.test(t.type) && t.click && j(t, "input") && ae.get(t, "click") || j(t, "a");
                            }
                        },
                        beforeunload: {
                            postDispatch: function(e) {
                                void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                            }
                        }
                    }
                }, E.removeEvent = function(e, t, n) {
                    e.removeEventListener && e.removeEventListener(t, n);
                }, E.Event = function(e, t) {
                    if (!(this instanceof E.Event)) return new E.Event(e, t);
                    e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Oe : Pe, 
                    this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, 
                    this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, 
                    t && E.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[E.expando] = !0;
                }, E.Event.prototype = {
                    constructor: E.Event,
                    isDefaultPrevented: Pe,
                    isPropagationStopped: Pe,
                    isImmediatePropagationStopped: Pe,
                    isSimulated: !1,
                    preventDefault: function() {
                        var e = this.originalEvent;
                        this.isDefaultPrevented = Oe, e && !this.isSimulated && e.preventDefault();
                    },
                    stopPropagation: function() {
                        var e = this.originalEvent;
                        this.isPropagationStopped = Oe, e && !this.isSimulated && e.stopPropagation();
                    },
                    stopImmediatePropagation: function() {
                        var e = this.originalEvent;
                        this.isImmediatePropagationStopped = Oe, e && !this.isSimulated && e.stopImmediatePropagation(), 
                        this.stopPropagation();
                    }
                }, E.each({
                    altKey: !0,
                    bubbles: !0,
                    cancelable: !0,
                    changedTouches: !0,
                    ctrlKey: !0,
                    detail: !0,
                    eventPhase: !0,
                    metaKey: !0,
                    pageX: !0,
                    pageY: !0,
                    shiftKey: !0,
                    view: !0,
                    char: !0,
                    code: !0,
                    charCode: !0,
                    key: !0,
                    keyCode: !0,
                    button: !0,
                    buttons: !0,
                    clientX: !0,
                    clientY: !0,
                    offsetX: !0,
                    offsetY: !0,
                    pointerId: !0,
                    pointerType: !0,
                    screenX: !0,
                    screenY: !0,
                    targetTouches: !0,
                    toElement: !0,
                    touches: !0,
                    which: !0
                }, E.event.addProp), E.each({
                    focus: "focusin",
                    blur: "focusout"
                }, (function(e, t) {
                    function n(e) {
                        if (b.documentMode) {
                            var n = ae.get(this, "handle"), r = E.event.fix(e);
                            r.type = "focusin" === e.type ? "focus" : "blur", r.isSimulated = !0, n(e), r.target === r.currentTarget && n(r);
                        } else E.event.simulate(t, e.target, E.event.fix(e));
                    }
                    E.event.special[e] = {
                        setup: function() {
                            var r;
                            if (Re(this, e, !0), !b.documentMode) return !1;
                            (r = ae.get(this, t)) || this.addEventListener(t, n), ae.set(this, t, (r || 0) + 1);
                        },
                        trigger: function() {
                            return Re(this, e), !0;
                        },
                        teardown: function() {
                            var e;
                            if (!b.documentMode) return !1;
                            (e = ae.get(this, t) - 1) ? ae.set(this, t, e) : (this.removeEventListener(t, n), 
                            ae.remove(this, t));
                        },
                        _default: function(t) {
                            return ae.get(t.target, e);
                        },
                        delegateType: t
                    }, E.event.special[t] = {
                        setup: function() {
                            var r = this.ownerDocument || this.document || this, o = b.documentMode ? this : r, i = ae.get(o, t);
                            i || (b.documentMode ? this.addEventListener(t, n) : r.addEventListener(e, n, !0)), 
                            ae.set(o, t, (i || 0) + 1);
                        },
                        teardown: function() {
                            var r = this.ownerDocument || this.document || this, o = b.documentMode ? this : r, i = ae.get(o, t) - 1;
                            i ? ae.set(o, t, i) : (b.documentMode ? this.removeEventListener(t, n) : r.removeEventListener(e, n, !0), 
                            ae.remove(o, t));
                        }
                    };
                })), E.each({
                    mouseenter: "mouseover",
                    mouseleave: "mouseout",
                    pointerenter: "pointerover",
                    pointerleave: "pointerout"
                }, (function(e, t) {
                    E.event.special[e] = {
                        delegateType: t,
                        bindType: t,
                        handle: function(e) {
                            var n, r = e.relatedTarget, o = e.handleObj;
                            return r && (r === this || E.contains(this, r)) || (e.type = o.origType, n = o.handler.apply(this, arguments), 
                            e.type = t), n;
                        }
                    };
                })), E.fn.extend({
                    on: function(e, t, n, r) {
                        return Me(this, e, t, n, r);
                    },
                    one: function(e, t, n, r) {
                        return Me(this, e, t, n, r, 1);
                    },
                    off: function(e, t, n) {
                        var r, o;
                        if (e && e.preventDefault && e.handleObj) return r = e.handleObj, E(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), 
                        this;
                        if ("object" == typeof e) {
                            for (o in e) this.off(o, t, e[o]);
                            return this;
                        }
                        return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Pe), 
                        this.each((function() {
                            E.event.remove(this, e, n, t);
                        }));
                    }
                });
                var _e = /<script|<style|<link/i, Ie = /checked\s*(?:[^=]|=\s*.checked.)/i, We = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
                function Fe(e, t) {
                    return j(e, "table") && j(11 !== t.nodeType ? t : t.firstChild, "tr") && E(e).children("tbody")[0] || e;
                }
                function $e(e) {
                    return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
                }
                function Be(e) {
                    return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), 
                    e;
                }
                function Xe(e, t) {
                    var n, r, o, i, s, a;
                    if (1 === t.nodeType) {
                        if (ae.hasData(e) && (a = ae.get(e).events)) for (o in ae.remove(t, "handle events"), 
                        a) for (n = 0, r = a[o].length; n < r; n++) E.event.add(t, o, a[o][n]);
                        ce.hasData(e) && (i = ce.access(e), s = E.extend({}, i), ce.set(t, s));
                    }
                }
                function Ue(e, t) {
                    var n = t.nodeName.toLowerCase();
                    "input" === n && Ee.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue);
                }
                function ze(e, t, n, r) {
                    t = c(t);
                    var o, i, s, a, u, l, f = 0, d = e.length, p = d - 1, h = t[0], g = y(h);
                    if (g || d > 1 && "string" == typeof h && !v.checkClone && Ie.test(h)) return e.each((function(o) {
                        var i = e.eq(o);
                        g && (t[0] = h.call(this, o, i.html())), ze(i, t, n, r);
                    }));
                    if (d && (i = (o = qe(t, e[0].ownerDocument, !1, e, r)).firstChild, 1 === o.childNodes.length && (o = i), 
                    i || r)) {
                        for (a = (s = E.map(De(o, "script"), $e)).length; f < d; f++) u = o, f !== p && (u = E.clone(u, !0, !0), 
                        a && E.merge(s, De(u, "script"))), n.call(e[f], u, f);
                        if (a) for (l = s[s.length - 1].ownerDocument, E.map(s, Be), f = 0; f < a; f++) u = s[f], 
                        je.test(u.type || "") && !ae.access(u, "globalEval") && E.contains(l, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? E._evalUrl && !u.noModule && E._evalUrl(u.src, {
                            nonce: u.nonce || u.getAttribute("nonce")
                        }, l) : w(u.textContent.replace(We, ""), u, l));
                    }
                    return e;
                }
                function Ve(e, t, n) {
                    for (var r, o = t ? E.filter(t, e) : e, i = 0; null != (r = o[i]); i++) n || 1 !== r.nodeType || E.cleanData(De(r)), 
                    r.parentNode && (n && ve(r) && Ne(De(r, "script")), r.parentNode.removeChild(r));
                    return e;
                }
                E.extend({
                    htmlPrefilter: function(e) {
                        return e;
                    },
                    clone: function(e, t, n) {
                        var r, o, i, s, a = e.cloneNode(!0), c = ve(e);
                        if (!(v.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || E.isXMLDoc(e))) for (s = De(a), 
                        r = 0, o = (i = De(e)).length; r < o; r++) Ue(i[r], s[r]);
                        if (t) if (n) for (i = i || De(e), s = s || De(a), r = 0, o = i.length; r < o; r++) Xe(i[r], s[r]); else Xe(e, a);
                        return (s = De(a, "script")).length > 0 && Ne(s, !c && De(e, "script")), a;
                    },
                    cleanData: function(e) {
                        for (var t, n, r, o = E.event.special, i = 0; void 0 !== (n = e[i]); i++) if (ie(n)) {
                            if (t = n[ae.expando]) {
                                if (t.events) for (r in t.events) o[r] ? E.event.remove(n, r) : E.removeEvent(n, r, t.handle);
                                n[ae.expando] = void 0;
                            }
                            n[ce.expando] && (n[ce.expando] = void 0);
                        }
                    }
                }), E.fn.extend({
                    detach: function(e) {
                        return Ve(this, e, !0);
                    },
                    remove: function(e) {
                        return Ve(this, e);
                    },
                    text: function(e) {
                        return ee(this, (function(e) {
                            return void 0 === e ? E.text(this) : this.empty().each((function() {
                                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e);
                            }));
                        }), null, e, arguments.length);
                    },
                    append: function() {
                        return ze(this, arguments, (function(e) {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Fe(this, e).appendChild(e);
                        }));
                    },
                    prepend: function() {
                        return ze(this, arguments, (function(e) {
                            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                var t = Fe(this, e);
                                t.insertBefore(e, t.firstChild);
                            }
                        }));
                    },
                    before: function() {
                        return ze(this, arguments, (function(e) {
                            this.parentNode && this.parentNode.insertBefore(e, this);
                        }));
                    },
                    after: function() {
                        return ze(this, arguments, (function(e) {
                            this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
                        }));
                    },
                    empty: function() {
                        for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (E.cleanData(De(e, !1)), 
                        e.textContent = "");
                        return this;
                    },
                    clone: function(e, t) {
                        return e = null != e && e, t = null == t ? e : t, this.map((function() {
                            return E.clone(this, e, t);
                        }));
                    },
                    html: function(e) {
                        return ee(this, (function(e) {
                            var t = this[0] || {}, n = 0, r = this.length;
                            if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                            if ("string" == typeof e && !_e.test(e) && !Ae[(Se.exec(e) || [ "", "" ])[1].toLowerCase()]) {
                                e = E.htmlPrefilter(e);
                                try {
                                    for (;n < r; n++) 1 === (t = this[n] || {}).nodeType && (E.cleanData(De(t, !1)), 
                                    t.innerHTML = e);
                                    t = 0;
                                } catch (e) {}
                            }
                            t && this.empty().append(e);
                        }), null, e, arguments.length);
                    },
                    replaceWith: function() {
                        var e = [];
                        return ze(this, arguments, (function(t) {
                            var n = this.parentNode;
                            E.inArray(this, e) < 0 && (E.cleanData(De(this)), n && n.replaceChild(t, this));
                        }), e);
                    }
                }), E.each({
                    appendTo: "append",
                    prependTo: "prepend",
                    insertBefore: "before",
                    insertAfter: "after",
                    replaceAll: "replaceWith"
                }, (function(e, t) {
                    E.fn[e] = function(e) {
                        for (var n, r = [], o = E(e), i = o.length - 1, s = 0; s <= i; s++) n = s === i ? this : this.clone(!0), 
                        E(o[s])[t](n), u.apply(r, n.get());
                        return this.pushStack(r);
                    };
                }));
                var Ye = new RegExp("^(" + de + ")(?!px)[a-z%]+$", "i"), Ge = /^--/, Qe = function(e) {
                    var t = e.ownerDocument.defaultView;
                    return t && t.opener || (t = r), t.getComputedStyle(e);
                }, Je = function(e, t, n) {
                    var r, o, i = {};
                    for (o in t) i[o] = e.style[o], e.style[o] = t[o];
                    for (o in r = n.call(e), t) e.style[o] = i[o];
                    return r;
                }, Ke = new RegExp(he.join("|"), "i");
                function Ze(e, t, n) {
                    var r, o, i, s, a = Ge.test(t), c = e.style;
                    return (n = n || Qe(e)) && (s = n.getPropertyValue(t) || n[t], a && s && (s = s.replace(q, "$1") || void 0), 
                    "" !== s || ve(e) || (s = E.style(e, t)), !v.pixelBoxStyles() && Ye.test(s) && Ke.test(t) && (r = c.width, 
                    o = c.minWidth, i = c.maxWidth, c.minWidth = c.maxWidth = c.width = s, s = n.width, 
                    c.width = r, c.minWidth = o, c.maxWidth = i)), void 0 !== s ? s + "" : s;
                }
                function et(e, t) {
                    return {
                        get: function() {
                            if (!e()) return (this.get = t).apply(this, arguments);
                            delete this.get;
                        }
                    };
                }
                !function() {
                    function e() {
                        if (l) {
                            u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", 
                            l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", 
                            ge.appendChild(u).appendChild(l);
                            var e = r.getComputedStyle(l);
                            n = "1%" !== e.top, c = 12 === t(e.marginLeft), l.style.right = "60%", s = 36 === t(e.right), 
                            o = 36 === t(e.width), l.style.position = "absolute", i = 12 === t(l.offsetWidth / 3), 
                            ge.removeChild(u), l = null;
                        }
                    }
                    function t(e) {
                        return Math.round(parseFloat(e));
                    }
                    var n, o, i, s, a, c, u = b.createElement("div"), l = b.createElement("div");
                    l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", 
                    v.clearCloneStyle = "content-box" === l.style.backgroundClip, E.extend(v, {
                        boxSizingReliable: function() {
                            return e(), o;
                        },
                        pixelBoxStyles: function() {
                            return e(), s;
                        },
                        pixelPosition: function() {
                            return e(), n;
                        },
                        reliableMarginLeft: function() {
                            return e(), c;
                        },
                        scrollboxSize: function() {
                            return e(), i;
                        },
                        reliableTrDimensions: function() {
                            var e, t, n, o;
                            return null == a && (e = b.createElement("table"), t = b.createElement("tr"), n = b.createElement("div"), 
                            e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", t.style.cssText = "box-sizing:content-box;border:1px solid", 
                            t.style.height = "1px", n.style.height = "9px", n.style.display = "block", ge.appendChild(e).appendChild(t).appendChild(n), 
                            o = r.getComputedStyle(t), a = parseInt(o.height, 10) + parseInt(o.borderTopWidth, 10) + parseInt(o.borderBottomWidth, 10) === t.offsetHeight, 
                            ge.removeChild(e)), a;
                        }
                    }));
                }();
                var tt = [ "Webkit", "Moz", "ms" ], nt = b.createElement("div").style, rt = {};
                function ot(e) {
                    return E.cssProps[e] || rt[e] || (e in nt ? e : rt[e] = function(e) {
                        for (var t = e[0].toUpperCase() + e.slice(1), n = tt.length; n--; ) if ((e = tt[n] + t) in nt) return e;
                    }(e) || e);
                }
                var it = /^(none|table(?!-c[ea]).+)/, st = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                }, at = {
                    letterSpacing: "0",
                    fontWeight: "400"
                };
                function ct(e, t, n) {
                    var r = pe.exec(t);
                    return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
                }
                function ut(e, t, n, r, o, i) {
                    var s = "width" === t ? 1 : 0, a = 0, c = 0, u = 0;
                    if (n === (r ? "border" : "content")) return 0;
                    for (;s < 4; s += 2) "margin" === n && (u += E.css(e, n + he[s], !0, o)), r ? ("content" === n && (c -= E.css(e, "padding" + he[s], !0, o)), 
                    "margin" !== n && (c -= E.css(e, "border" + he[s] + "Width", !0, o))) : (c += E.css(e, "padding" + he[s], !0, o), 
                    "padding" !== n ? c += E.css(e, "border" + he[s] + "Width", !0, o) : a += E.css(e, "border" + he[s] + "Width", !0, o));
                    return !r && i >= 0 && (c += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - i - c - a - .5)) || 0), 
                    c + u;
                }
                function lt(e, t, n) {
                    var r = Qe(e), o = (!v.boxSizingReliable() || n) && "border-box" === E.css(e, "boxSizing", !1, r), i = o, s = Ze(e, t, r), a = "offset" + t[0].toUpperCase() + t.slice(1);
                    if (Ye.test(s)) {
                        if (!n) return s;
                        s = "auto";
                    }
                    return (!v.boxSizingReliable() && o || !v.reliableTrDimensions() && j(e, "tr") || "auto" === s || !parseFloat(s) && "inline" === E.css(e, "display", !1, r)) && e.getClientRects().length && (o = "border-box" === E.css(e, "boxSizing", !1, r), 
                    (i = a in e) && (s = e[a])), (s = parseFloat(s) || 0) + ut(e, t, n || (o ? "border" : "content"), i, r, s) + "px";
                }
                function ft(e, t, n, r, o) {
                    return new ft.prototype.init(e, t, n, r, o);
                }
                E.extend({
                    cssHooks: {
                        opacity: {
                            get: function(e, t) {
                                if (t) {
                                    var n = Ze(e, "opacity");
                                    return "" === n ? "1" : n;
                                }
                            }
                        }
                    },
                    cssNumber: {
                        animationIterationCount: !0,
                        aspectRatio: !0,
                        borderImageSlice: !0,
                        columnCount: !0,
                        flexGrow: !0,
                        flexShrink: !0,
                        fontWeight: !0,
                        gridArea: !0,
                        gridColumn: !0,
                        gridColumnEnd: !0,
                        gridColumnStart: !0,
                        gridRow: !0,
                        gridRowEnd: !0,
                        gridRowStart: !0,
                        lineHeight: !0,
                        opacity: !0,
                        order: !0,
                        orphans: !0,
                        scale: !0,
                        widows: !0,
                        zIndex: !0,
                        zoom: !0,
                        fillOpacity: !0,
                        floodOpacity: !0,
                        stopOpacity: !0,
                        strokeMiterlimit: !0,
                        strokeOpacity: !0
                    },
                    cssProps: {},
                    style: function(e, t, n, r) {
                        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                            var o, i, s, a = oe(t), c = Ge.test(t), u = e.style;
                            if (c || (t = ot(a)), s = E.cssHooks[t] || E.cssHooks[a], void 0 === n) return s && "get" in s && void 0 !== (o = s.get(e, !1, r)) ? o : u[t];
                            "string" == (i = typeof n) && (o = pe.exec(n)) && o[1] && (n = be(e, t, o), i = "number"), 
                            null != n && n == n && ("number" !== i || c || (n += o && o[3] || (E.cssNumber[a] ? "" : "px")), 
                            v.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), 
                            s && "set" in s && void 0 === (n = s.set(e, n, r)) || (c ? u.setProperty(t, n) : u[t] = n));
                        }
                    },
                    css: function(e, t, n, r) {
                        var o, i, s, a = oe(t);
                        return Ge.test(t) || (t = ot(a)), (s = E.cssHooks[t] || E.cssHooks[a]) && "get" in s && (o = s.get(e, !0, n)), 
                        void 0 === o && (o = Ze(e, t, r)), "normal" === o && t in at && (o = at[t]), "" === n || n ? (i = parseFloat(o), 
                        !0 === n || isFinite(i) ? i || 0 : o) : o;
                    }
                }), E.each([ "height", "width" ], (function(e, t) {
                    E.cssHooks[t] = {
                        get: function(e, n, r) {
                            if (n) return !it.test(E.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? lt(e, t, r) : Je(e, st, (function() {
                                return lt(e, t, r);
                            }));
                        },
                        set: function(e, n, r) {
                            var o, i = Qe(e), s = !v.scrollboxSize() && "absolute" === i.position, a = (s || r) && "border-box" === E.css(e, "boxSizing", !1, i), c = r ? ut(e, t, r, a, i) : 0;
                            return a && s && (c -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(i[t]) - ut(e, t, "border", !1, i) - .5)), 
                            c && (o = pe.exec(n)) && "px" !== (o[3] || "px") && (e.style[t] = n, n = E.css(e, t)), 
                            ct(0, n, c);
                        }
                    };
                })), E.cssHooks.marginLeft = et(v.reliableMarginLeft, (function(e, t) {
                    if (t) return (parseFloat(Ze(e, "marginLeft")) || e.getBoundingClientRect().left - Je(e, {
                        marginLeft: 0
                    }, (function() {
                        return e.getBoundingClientRect().left;
                    }))) + "px";
                })), E.each({
                    margin: "",
                    padding: "",
                    border: "Width"
                }, (function(e, t) {
                    E.cssHooks[e + t] = {
                        expand: function(n) {
                            for (var r = 0, o = {}, i = "string" == typeof n ? n.split(" ") : [ n ]; r < 4; r++) o[e + he[r] + t] = i[r] || i[r - 2] || i[0];
                            return o;
                        }
                    }, "margin" !== e && (E.cssHooks[e + t].set = ct);
                })), E.fn.extend({
                    css: function(e, t) {
                        return ee(this, (function(e, t, n) {
                            var r, o, i = {}, s = 0;
                            if (Array.isArray(t)) {
                                for (r = Qe(e), o = t.length; s < o; s++) i[t[s]] = E.css(e, t[s], !1, r);
                                return i;
                            }
                            return void 0 !== n ? E.style(e, t, n) : E.css(e, t);
                        }), e, t, arguments.length > 1);
                    }
                }), E.Tween = ft, ft.prototype = {
                    constructor: ft,
                    init: function(e, t, n, r, o, i) {
                        this.elem = e, this.prop = n, this.easing = o || E.easing._default, this.options = t, 
                        this.start = this.now = this.cur(), this.end = r, this.unit = i || (E.cssNumber[n] ? "" : "px");
                    },
                    cur: function() {
                        var e = ft.propHooks[this.prop];
                        return e && e.get ? e.get(this) : ft.propHooks._default.get(this);
                    },
                    run: function(e) {
                        var t, n = ft.propHooks[this.prop];
                        return this.options.duration ? this.pos = t = E.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, 
                        this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
                        n && n.set ? n.set(this) : ft.propHooks._default.set(this), this;
                    }
                }, ft.prototype.init.prototype = ft.prototype, ft.propHooks = {
                    _default: {
                        get: function(e) {
                            var t;
                            return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = E.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
                        },
                        set: function(e) {
                            E.fx.step[e.prop] ? E.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !E.cssHooks[e.prop] && null == e.elem.style[ot(e.prop)] ? e.elem[e.prop] = e.now : E.style(e.elem, e.prop, e.now + e.unit);
                        }
                    }
                }, ft.propHooks.scrollTop = ft.propHooks.scrollLeft = {
                    set: function(e) {
                        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
                    }
                }, E.easing = {
                    linear: function(e) {
                        return e;
                    },
                    swing: function(e) {
                        return .5 - Math.cos(e * Math.PI) / 2;
                    },
                    _default: "swing"
                }, E.fx = ft.prototype.init, E.fx.step = {};
                var dt, pt, ht = /^(?:toggle|show|hide)$/, gt = /queueHooks$/;
                function vt() {
                    pt && (!1 === b.hidden && r.requestAnimationFrame ? r.requestAnimationFrame(vt) : r.setTimeout(vt, E.fx.interval), 
                    E.fx.tick());
                }
                function yt() {
                    return r.setTimeout((function() {
                        dt = void 0;
                    })), dt = Date.now();
                }
                function mt(e, t) {
                    var n, r = 0, o = {
                        height: e
                    };
                    for (t = t ? 1 : 0; r < 4; r += 2 - t) o["margin" + (n = he[r])] = o["padding" + n] = e;
                    return t && (o.opacity = o.width = e), o;
                }
                function bt(e, t, n) {
                    for (var r, o = (xt.tweeners[t] || []).concat(xt.tweeners["*"]), i = 0, s = o.length; i < s; i++) if (r = o[i].call(n, t, e)) return r;
                }
                function xt(e, t, n) {
                    var r, o, i = 0, s = xt.prefilters.length, a = E.Deferred().always((function() {
                        delete c.elem;
                    })), c = function() {
                        if (o) return !1;
                        for (var t = dt || yt(), n = Math.max(0, u.startTime + u.duration - t), r = 1 - (n / u.duration || 0), i = 0, s = u.tweens.length; i < s; i++) u.tweens[i].run(r);
                        return a.notifyWith(e, [ u, r, n ]), r < 1 && s ? n : (s || a.notifyWith(e, [ u, 1, 0 ]), 
                        a.resolveWith(e, [ u ]), !1);
                    }, u = a.promise({
                        elem: e,
                        props: E.extend({}, t),
                        opts: E.extend(!0, {
                            specialEasing: {},
                            easing: E.easing._default
                        }, n),
                        originalProperties: t,
                        originalOptions: n,
                        startTime: dt || yt(),
                        duration: n.duration,
                        tweens: [],
                        createTween: function(t, n) {
                            var r = E.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                            return u.tweens.push(r), r;
                        },
                        stop: function(t) {
                            var n = 0, r = t ? u.tweens.length : 0;
                            if (o) return this;
                            for (o = !0; n < r; n++) u.tweens[n].run(1);
                            return t ? (a.notifyWith(e, [ u, 1, 0 ]), a.resolveWith(e, [ u, t ])) : a.rejectWith(e, [ u, t ]), 
                            this;
                        }
                    }), l = u.props;
                    for (function(e, t) {
                        var n, r, o, i, s;
                        for (n in e) if (o = t[r = oe(n)], i = e[n], Array.isArray(i) && (o = i[1], i = e[n] = i[0]), 
                        n !== r && (e[r] = i, delete e[n]), (s = E.cssHooks[r]) && "expand" in s) for (n in i = s.expand(i), 
                        delete e[r], i) n in e || (e[n] = i[n], t[n] = o); else t[r] = o;
                    }(l, u.opts.specialEasing); i < s; i++) if (r = xt.prefilters[i].call(u, e, l, u.opts)) return y(r.stop) && (E._queueHooks(u.elem, u.opts.queue).stop = r.stop.bind(r)), 
                    r;
                    return E.map(l, bt, u), y(u.opts.start) && u.opts.start.call(e, u), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always), 
                    E.fx.timer(E.extend(c, {
                        elem: e,
                        anim: u,
                        queue: u.opts.queue
                    })), u;
                }
                E.Animation = E.extend(xt, {
                    tweeners: {
                        "*": [ function(e, t) {
                            var n = this.createTween(e, t);
                            return be(n.elem, e, pe.exec(t), n), n;
                        } ]
                    },
                    tweener: function(e, t) {
                        y(e) ? (t = e, e = [ "*" ]) : e = e.match(V);
                        for (var n, r = 0, o = e.length; r < o; r++) n = e[r], xt.tweeners[n] = xt.tweeners[n] || [], 
                        xt.tweeners[n].unshift(t);
                    },
                    prefilters: [ function(e, t, n) {
                        var r, o, i, s, a, c, u, l, f = "width" in t || "height" in t, d = this, p = {}, h = e.style, g = e.nodeType && me(e), v = ae.get(e, "fxshow");
                        for (r in n.queue || (null == (s = E._queueHooks(e, "fx")).unqueued && (s.unqueued = 0, 
                        a = s.empty.fire, s.empty.fire = function() {
                            s.unqueued || a();
                        }), s.unqueued++, d.always((function() {
                            d.always((function() {
                                s.unqueued--, E.queue(e, "fx").length || s.empty.fire();
                            }));
                        }))), t) if (o = t[r], ht.test(o)) {
                            if (delete t[r], i = i || "toggle" === o, o === (g ? "hide" : "show")) {
                                if ("show" !== o || !v || void 0 === v[r]) continue;
                                g = !0;
                            }
                            p[r] = v && v[r] || E.style(e, r);
                        }
                        if ((c = !E.isEmptyObject(t)) || !E.isEmptyObject(p)) for (r in f && 1 === e.nodeType && (n.overflow = [ h.overflow, h.overflowX, h.overflowY ], 
                        null == (u = v && v.display) && (u = ae.get(e, "display")), "none" === (l = E.css(e, "display")) && (u ? l = u : (ke([ e ], !0), 
                        u = e.style.display || u, l = E.css(e, "display"), ke([ e ]))), ("inline" === l || "inline-block" === l && null != u) && "none" === E.css(e, "float") && (c || (d.done((function() {
                            h.display = u;
                        })), null == u && (l = h.display, u = "none" === l ? "" : l)), h.display = "inline-block")), 
                        n.overflow && (h.overflow = "hidden", d.always((function() {
                            h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2];
                        }))), c = !1, p) c || (v ? "hidden" in v && (g = v.hidden) : v = ae.access(e, "fxshow", {
                            display: u
                        }), i && (v.hidden = !g), g && ke([ e ], !0), d.done((function() {
                            for (r in g || ke([ e ]), ae.remove(e, "fxshow"), p) E.style(e, r, p[r]);
                        }))), c = bt(g ? v[r] : 0, r, d), r in v || (v[r] = c.start, g && (c.end = c.start, 
                        c.start = 0));
                    } ],
                    prefilter: function(e, t) {
                        t ? xt.prefilters.unshift(e) : xt.prefilters.push(e);
                    }
                }), E.speed = function(e, t, n) {
                    var r = e && "object" == typeof e ? E.extend({}, e) : {
                        complete: n || !n && t || y(e) && e,
                        duration: e,
                        easing: n && t || t && !y(t) && t
                    };
                    return E.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in E.fx.speeds ? r.duration = E.fx.speeds[r.duration] : r.duration = E.fx.speeds._default), 
                    null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                        y(r.old) && r.old.call(this), r.queue && E.dequeue(this, r.queue);
                    }, r;
                }, E.fn.extend({
                    fadeTo: function(e, t, n, r) {
                        return this.filter(me).css("opacity", 0).show().end().animate({
                            opacity: t
                        }, e, n, r);
                    },
                    animate: function(e, t, n, r) {
                        var o = E.isEmptyObject(e), i = E.speed(t, n, r), s = function() {
                            var t = xt(this, E.extend({}, e), i);
                            (o || ae.get(this, "finish")) && t.stop(!0);
                        };
                        return s.finish = s, o || !1 === i.queue ? this.each(s) : this.queue(i.queue, s);
                    },
                    stop: function(e, t, n) {
                        var r = function(e) {
                            var t = e.stop;
                            delete e.stop, t(n);
                        };
                        return "string" != typeof e && (n = t, t = e, e = void 0), t && this.queue(e || "fx", []), 
                        this.each((function() {
                            var t = !0, o = null != e && e + "queueHooks", i = E.timers, s = ae.get(this);
                            if (o) s[o] && s[o].stop && r(s[o]); else for (o in s) s[o] && s[o].stop && gt.test(o) && r(s[o]);
                            for (o = i.length; o--; ) i[o].elem !== this || null != e && i[o].queue !== e || (i[o].anim.stop(n), 
                            t = !1, i.splice(o, 1));
                            !t && n || E.dequeue(this, e);
                        }));
                    },
                    finish: function(e) {
                        return !1 !== e && (e = e || "fx"), this.each((function() {
                            var t, n = ae.get(this), r = n[e + "queue"], o = n[e + "queueHooks"], i = E.timers, s = r ? r.length : 0;
                            for (n.finish = !0, E.queue(this, e, []), o && o.stop && o.stop.call(this, !0), 
                            t = i.length; t--; ) i[t].elem === this && i[t].queue === e && (i[t].anim.stop(!0), 
                            i.splice(t, 1));
                            for (t = 0; t < s; t++) r[t] && r[t].finish && r[t].finish.call(this);
                            delete n.finish;
                        }));
                    }
                }), E.each([ "toggle", "show", "hide" ], (function(e, t) {
                    var n = E.fn[t];
                    E.fn[t] = function(e, r, o) {
                        return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(mt(t, !0), e, r, o);
                    };
                })), E.each({
                    slideDown: mt("show"),
                    slideUp: mt("hide"),
                    slideToggle: mt("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                }, (function(e, t) {
                    E.fn[e] = function(e, n, r) {
                        return this.animate(t, e, n, r);
                    };
                })), E.timers = [], E.fx.tick = function() {
                    var e, t = 0, n = E.timers;
                    for (dt = Date.now(); t < n.length; t++) (e = n[t])() || n[t] !== e || n.splice(t--, 1);
                    n.length || E.fx.stop(), dt = void 0;
                }, E.fx.timer = function(e) {
                    E.timers.push(e), E.fx.start();
                }, E.fx.interval = 13, E.fx.start = function() {
                    pt || (pt = !0, vt());
                }, E.fx.stop = function() {
                    pt = null;
                }, E.fx.speeds = {
                    slow: 600,
                    fast: 200,
                    _default: 400
                }, E.fn.delay = function(e, t) {
                    return e = E.fx && E.fx.speeds[e] || e, t = t || "fx", this.queue(t, (function(t, n) {
                        var o = r.setTimeout(t, e);
                        n.stop = function() {
                            r.clearTimeout(o);
                        };
                    }));
                }, function() {
                    var e = b.createElement("input"), t = b.createElement("select").appendChild(b.createElement("option"));
                    e.type = "checkbox", v.checkOn = "" !== e.value, v.optSelected = t.selected, (e = b.createElement("input")).value = "t", 
                    e.type = "radio", v.radioValue = "t" === e.value;
                }();
                var wt, kt = E.expr.attrHandle;
                E.fn.extend({
                    attr: function(e, t) {
                        return ee(this, E.attr, e, t, arguments.length > 1);
                    },
                    removeAttr: function(e) {
                        return this.each((function() {
                            E.removeAttr(this, e);
                        }));
                    }
                }), E.extend({
                    attr: function(e, t, n) {
                        var r, o, i = e.nodeType;
                        if (3 !== i && 8 !== i && 2 !== i) return void 0 === e.getAttribute ? E.prop(e, t, n) : (1 === i && E.isXMLDoc(e) || (o = E.attrHooks[t.toLowerCase()] || (E.expr.match.bool.test(t) ? wt : void 0)), 
                        void 0 !== n ? null === n ? void E.removeAttr(e, t) : o && "set" in o && void 0 !== (r = o.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), 
                        n) : o && "get" in o && null !== (r = o.get(e, t)) ? r : null == (r = E.find.attr(e, t)) ? void 0 : r);
                    },
                    attrHooks: {
                        type: {
                            set: function(e, t) {
                                if (!v.radioValue && "radio" === t && j(e, "input")) {
                                    var n = e.value;
                                    return e.setAttribute("type", t), n && (e.value = n), t;
                                }
                            }
                        }
                    },
                    removeAttr: function(e, t) {
                        var n, r = 0, o = t && t.match(V);
                        if (o && 1 === e.nodeType) for (;n = o[r++]; ) e.removeAttribute(n);
                    }
                }), wt = {
                    set: function(e, t, n) {
                        return !1 === t ? E.removeAttr(e, n) : e.setAttribute(n, n), n;
                    }
                }, E.each(E.expr.match.bool.source.match(/\w+/g), (function(e, t) {
                    var n = kt[t] || E.find.attr;
                    kt[t] = function(e, t, r) {
                        var o, i, s = t.toLowerCase();
                        return r || (i = kt[s], kt[s] = o, o = null != n(e, t, r) ? s : null, kt[s] = i), 
                        o;
                    };
                }));
                var Tt = /^(?:input|select|textarea|button)$/i, Ct = /^(?:a|area)$/i;
                function Et(e) {
                    return (e.match(V) || []).join(" ");
                }
                function St(e) {
                    return e.getAttribute && e.getAttribute("class") || "";
                }
                function jt(e) {
                    return Array.isArray(e) ? e : "string" == typeof e && e.match(V) || [];
                }
                E.fn.extend({
                    prop: function(e, t) {
                        return ee(this, E.prop, e, t, arguments.length > 1);
                    },
                    removeProp: function(e) {
                        return this.each((function() {
                            delete this[E.propFix[e] || e];
                        }));
                    }
                }), E.extend({
                    prop: function(e, t, n) {
                        var r, o, i = e.nodeType;
                        if (3 !== i && 8 !== i && 2 !== i) return 1 === i && E.isXMLDoc(e) || (t = E.propFix[t] || t, 
                        o = E.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (r = o.set(e, n, t)) ? r : e[t] = n : o && "get" in o && null !== (r = o.get(e, t)) ? r : e[t];
                    },
                    propHooks: {
                        tabIndex: {
                            get: function(e) {
                                var t = E.find.attr(e, "tabindex");
                                return t ? parseInt(t, 10) : Tt.test(e.nodeName) || Ct.test(e.nodeName) && e.href ? 0 : -1;
                            }
                        }
                    },
                    propFix: {
                        for: "htmlFor",
                        class: "className"
                    }
                }), v.optSelected || (E.propHooks.selected = {
                    get: function(e) {
                        var t = e.parentNode;
                        return t && t.parentNode && t.parentNode.selectedIndex, null;
                    },
                    set: function(e) {
                        var t = e.parentNode;
                        t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
                    }
                }), E.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], (function() {
                    E.propFix[this.toLowerCase()] = this;
                })), E.fn.extend({
                    addClass: function(e) {
                        var t, n, r, o, i, s;
                        return y(e) ? this.each((function(t) {
                            E(this).addClass(e.call(this, t, St(this)));
                        })) : (t = jt(e)).length ? this.each((function() {
                            if (r = St(this), n = 1 === this.nodeType && " " + Et(r) + " ") {
                                for (i = 0; i < t.length; i++) o = t[i], n.indexOf(" " + o + " ") < 0 && (n += o + " ");
                                s = Et(n), r !== s && this.setAttribute("class", s);
                            }
                        })) : this;
                    },
                    removeClass: function(e) {
                        var t, n, r, o, i, s;
                        return y(e) ? this.each((function(t) {
                            E(this).removeClass(e.call(this, t, St(this)));
                        })) : arguments.length ? (t = jt(e)).length ? this.each((function() {
                            if (r = St(this), n = 1 === this.nodeType && " " + Et(r) + " ") {
                                for (i = 0; i < t.length; i++) for (o = t[i]; n.indexOf(" " + o + " ") > -1; ) n = n.replace(" " + o + " ", " ");
                                s = Et(n), r !== s && this.setAttribute("class", s);
                            }
                        })) : this : this.attr("class", "");
                    },
                    toggleClass: function(e, t) {
                        var n, r, o, i, s = typeof e, a = "string" === s || Array.isArray(e);
                        return y(e) ? this.each((function(n) {
                            E(this).toggleClass(e.call(this, n, St(this), t), t);
                        })) : "boolean" == typeof t && a ? t ? this.addClass(e) : this.removeClass(e) : (n = jt(e), 
                        this.each((function() {
                            if (a) for (i = E(this), o = 0; o < n.length; o++) r = n[o], i.hasClass(r) ? i.removeClass(r) : i.addClass(r); else void 0 !== e && "boolean" !== s || ((r = St(this)) && ae.set(this, "__className__", r), 
                            this.setAttribute && this.setAttribute("class", r || !1 === e ? "" : ae.get(this, "__className__") || ""));
                        })));
                    },
                    hasClass: function(e) {
                        var t, n, r = 0;
                        for (t = " " + e + " "; n = this[r++]; ) if (1 === n.nodeType && (" " + Et(St(n)) + " ").indexOf(t) > -1) return !0;
                        return !1;
                    }
                });
                var At = /\r/g;
                E.fn.extend({
                    val: function(e) {
                        var t, n, r, o = this[0];
                        return arguments.length ? (r = y(e), this.each((function(n) {
                            var o;
                            1 === this.nodeType && (null == (o = r ? e.call(this, n, E(this).val()) : e) ? o = "" : "number" == typeof o ? o += "" : Array.isArray(o) && (o = E.map(o, (function(e) {
                                return null == e ? "" : e + "";
                            }))), (t = E.valHooks[this.type] || E.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o));
                        }))) : o ? (t = E.valHooks[o.type] || E.valHooks[o.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : "string" == typeof (n = o.value) ? n.replace(At, "") : null == n ? "" : n : void 0;
                    }
                }), E.extend({
                    valHooks: {
                        option: {
                            get: function(e) {
                                var t = E.find.attr(e, "value");
                                return null != t ? t : Et(E.text(e));
                            }
                        },
                        select: {
                            get: function(e) {
                                var t, n, r, o = e.options, i = e.selectedIndex, s = "select-one" === e.type, a = s ? null : [], c = s ? i + 1 : o.length;
                                for (r = i < 0 ? c : s ? i : 0; r < c; r++) if (((n = o[r]).selected || r === i) && !n.disabled && (!n.parentNode.disabled || !j(n.parentNode, "optgroup"))) {
                                    if (t = E(n).val(), s) return t;
                                    a.push(t);
                                }
                                return a;
                            },
                            set: function(e, t) {
                                for (var n, r, o = e.options, i = E.makeArray(t), s = o.length; s--; ) ((r = o[s]).selected = E.inArray(E.valHooks.option.get(r), i) > -1) && (n = !0);
                                return n || (e.selectedIndex = -1), i;
                            }
                        }
                    }
                }), E.each([ "radio", "checkbox" ], (function() {
                    E.valHooks[this] = {
                        set: function(e, t) {
                            if (Array.isArray(t)) return e.checked = E.inArray(E(e).val(), t) > -1;
                        }
                    }, v.checkOn || (E.valHooks[this].get = function(e) {
                        return null === e.getAttribute("value") ? "on" : e.value;
                    });
                }));
                var Dt = r.location, Nt = {
                    guid: Date.now()
                }, Lt = /\?/;
                E.parseXML = function(e) {
                    var t, n;
                    if (!e || "string" != typeof e) return null;
                    try {
                        t = (new r.DOMParser).parseFromString(e, "text/xml");
                    } catch (e) {}
                    return n = t && t.getElementsByTagName("parsererror")[0], t && !n || E.error("Invalid XML: " + (n ? E.map(n.childNodes, (function(e) {
                        return e.textContent;
                    })).join("\n") : e)), t;
                };
                var qt = /^(?:focusinfocus|focusoutblur)$/, Ht = function(e) {
                    e.stopPropagation();
                };
                E.extend(E.event, {
                    trigger: function(e, t, n, o) {
                        var i, s, a, c, u, l, f, d, h = [ n || b ], g = p.call(e, "type") ? e.type : e, v = p.call(e, "namespace") ? e.namespace.split(".") : [];
                        if (s = d = a = n = n || b, 3 !== n.nodeType && 8 !== n.nodeType && !qt.test(g + E.event.triggered) && (g.indexOf(".") > -1 && (v = g.split("."), 
                        g = v.shift(), v.sort()), u = g.indexOf(":") < 0 && "on" + g, (e = e[E.expando] ? e : new E.Event(g, "object" == typeof e && e)).isTrigger = o ? 2 : 3, 
                        e.namespace = v.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
                        e.result = void 0, e.target || (e.target = n), t = null == t ? [ e ] : E.makeArray(t, [ e ]), 
                        f = E.event.special[g] || {}, o || !f.trigger || !1 !== f.trigger.apply(n, t))) {
                            if (!o && !f.noBubble && !m(n)) {
                                for (c = f.delegateType || g, qt.test(c + g) || (s = s.parentNode); s; s = s.parentNode) h.push(s), 
                                a = s;
                                a === (n.ownerDocument || b) && h.push(a.defaultView || a.parentWindow || r);
                            }
                            for (i = 0; (s = h[i++]) && !e.isPropagationStopped(); ) d = s, e.type = i > 1 ? c : f.bindType || g, 
                            (l = (ae.get(s, "events") || Object.create(null))[e.type] && ae.get(s, "handle")) && l.apply(s, t), 
                            (l = u && s[u]) && l.apply && ie(s) && (e.result = l.apply(s, t), !1 === e.result && e.preventDefault());
                            return e.type = g, o || e.isDefaultPrevented() || f._default && !1 !== f._default.apply(h.pop(), t) || !ie(n) || u && y(n[g]) && !m(n) && ((a = n[u]) && (n[u] = null), 
                            E.event.triggered = g, e.isPropagationStopped() && d.addEventListener(g, Ht), n[g](), 
                            e.isPropagationStopped() && d.removeEventListener(g, Ht), E.event.triggered = void 0, 
                            a && (n[u] = a)), e.result;
                        }
                    },
                    simulate: function(e, t, n) {
                        var r = E.extend(new E.Event, n, {
                            type: e,
                            isSimulated: !0
                        });
                        E.event.trigger(r, null, t);
                    }
                }), E.fn.extend({
                    trigger: function(e, t) {
                        return this.each((function() {
                            E.event.trigger(e, t, this);
                        }));
                    },
                    triggerHandler: function(e, t) {
                        var n = this[0];
                        if (n) return E.event.trigger(e, t, n, !0);
                    }
                });
                var Ot = /\[\]$/, Pt = /\r?\n/g, Mt = /^(?:submit|button|image|reset|file)$/i, Rt = /^(?:input|select|textarea|keygen)/i;
                function _t(e, t, n, r) {
                    var o;
                    if (Array.isArray(t)) E.each(t, (function(t, o) {
                        n || Ot.test(e) ? r(e, o) : _t(e + "[" + ("object" == typeof o && null != o ? t : "") + "]", o, n, r);
                    })); else if (n || "object" !== k(t)) r(e, t); else for (o in t) _t(e + "[" + o + "]", t[o], n, r);
                }
                E.param = function(e, t) {
                    var n, r = [], o = function(e, t) {
                        var n = y(t) ? t() : t;
                        r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
                    };
                    if (null == e) return "";
                    if (Array.isArray(e) || e.jquery && !E.isPlainObject(e)) E.each(e, (function() {
                        o(this.name, this.value);
                    })); else for (n in e) _t(n, e[n], t, o);
                    return r.join("&");
                }, E.fn.extend({
                    serialize: function() {
                        return E.param(this.serializeArray());
                    },
                    serializeArray: function() {
                        return this.map((function() {
                            var e = E.prop(this, "elements");
                            return e ? E.makeArray(e) : this;
                        })).filter((function() {
                            var e = this.type;
                            return this.name && !E(this).is(":disabled") && Rt.test(this.nodeName) && !Mt.test(e) && (this.checked || !Ee.test(e));
                        })).map((function(e, t) {
                            var n = E(this).val();
                            return null == n ? null : Array.isArray(n) ? E.map(n, (function(e) {
                                return {
                                    name: t.name,
                                    value: e.replace(Pt, "\r\n")
                                };
                            })) : {
                                name: t.name,
                                value: n.replace(Pt, "\r\n")
                            };
                        })).get();
                    }
                });
                var It = /%20/g, Wt = /#.*$/, Ft = /([?&])_=[^&]*/, $t = /^(.*?):[ \t]*([^\r\n]*)$/gm, Bt = /^(?:GET|HEAD)$/, Xt = /^\/\//, Ut = {}, zt = {}, Vt = "*/".concat("*"), Yt = b.createElement("a");
                function Gt(e) {
                    return function(t, n) {
                        "string" != typeof t && (n = t, t = "*");
                        var r, o = 0, i = t.toLowerCase().match(V) || [];
                        if (y(n)) for (;r = i[o++]; ) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
                    };
                }
                function Qt(e, t, n, r) {
                    var o = {}, i = e === zt;
                    function s(a) {
                        var c;
                        return o[a] = !0, E.each(e[a] || [], (function(e, a) {
                            var u = a(t, n, r);
                            return "string" != typeof u || i || o[u] ? i ? !(c = u) : void 0 : (t.dataTypes.unshift(u), 
                            s(u), !1);
                        })), c;
                    }
                    return s(t.dataTypes[0]) || !o["*"] && s("*");
                }
                function Jt(e, t) {
                    var n, r, o = E.ajaxSettings.flatOptions || {};
                    for (n in t) void 0 !== t[n] && ((o[n] ? e : r || (r = {}))[n] = t[n]);
                    return r && E.extend(!0, e, r), e;
                }
                Yt.href = Dt.href, E.extend({
                    active: 0,
                    lastModified: {},
                    etag: {},
                    ajaxSettings: {
                        url: Dt.href,
                        type: "GET",
                        isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Dt.protocol),
                        global: !0,
                        processData: !0,
                        async: !0,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        accepts: {
                            "*": Vt,
                            text: "text/plain",
                            html: "text/html",
                            xml: "application/xml, text/xml",
                            json: "application/json, text/javascript"
                        },
                        contents: {
                            xml: /\bxml\b/,
                            html: /\bhtml/,
                            json: /\bjson\b/
                        },
                        responseFields: {
                            xml: "responseXML",
                            text: "responseText",
                            json: "responseJSON"
                        },
                        converters: {
                            "* text": String,
                            "text html": !0,
                            "text json": JSON.parse,
                            "text xml": E.parseXML
                        },
                        flatOptions: {
                            url: !0,
                            context: !0
                        }
                    },
                    ajaxSetup: function(e, t) {
                        return t ? Jt(Jt(e, E.ajaxSettings), t) : Jt(E.ajaxSettings, e);
                    },
                    ajaxPrefilter: Gt(Ut),
                    ajaxTransport: Gt(zt),
                    ajax: function(e, t) {
                        "object" == typeof e && (t = e, e = void 0), t = t || {};
                        var n, o, i, s, a, c, u, l, f, d, p = E.ajaxSetup({}, t), h = p.context || p, g = p.context && (h.nodeType || h.jquery) ? E(h) : E.event, v = E.Deferred(), y = E.Callbacks("once memory"), m = p.statusCode || {}, x = {}, w = {}, k = "canceled", T = {
                            readyState: 0,
                            getResponseHeader: function(e) {
                                var t;
                                if (u) {
                                    if (!s) for (s = {}; t = $t.exec(i); ) s[t[1].toLowerCase() + " "] = (s[t[1].toLowerCase() + " "] || []).concat(t[2]);
                                    t = s[e.toLowerCase() + " "];
                                }
                                return null == t ? null : t.join(", ");
                            },
                            getAllResponseHeaders: function() {
                                return u ? i : null;
                            },
                            setRequestHeader: function(e, t) {
                                return null == u && (e = w[e.toLowerCase()] = w[e.toLowerCase()] || e, x[e] = t), 
                                this;
                            },
                            overrideMimeType: function(e) {
                                return null == u && (p.mimeType = e), this;
                            },
                            statusCode: function(e) {
                                var t;
                                if (e) if (u) T.always(e[T.status]); else for (t in e) m[t] = [ m[t], e[t] ];
                                return this;
                            },
                            abort: function(e) {
                                var t = e || k;
                                return n && n.abort(t), C(0, t), this;
                            }
                        };
                        if (v.promise(T), p.url = ((e || p.url || Dt.href) + "").replace(Xt, Dt.protocol + "//"), 
                        p.type = t.method || t.type || p.method || p.type, p.dataTypes = (p.dataType || "*").toLowerCase().match(V) || [ "" ], 
                        null == p.crossDomain) {
                            c = b.createElement("a");
                            try {
                                c.href = p.url, c.href = c.href, p.crossDomain = Yt.protocol + "//" + Yt.host != c.protocol + "//" + c.host;
                            } catch (e) {
                                p.crossDomain = !0;
                            }
                        }
                        if (p.data && p.processData && "string" != typeof p.data && (p.data = E.param(p.data, p.traditional)), 
                        Qt(Ut, p, t, T), u) return T;
                        for (f in (l = E.event && p.global) && 0 == E.active++ && E.event.trigger("ajaxStart"), 
                        p.type = p.type.toUpperCase(), p.hasContent = !Bt.test(p.type), o = p.url.replace(Wt, ""), 
                        p.hasContent ? p.data && p.processData && 0 === (p.contentType || "").indexOf("application/x-www-form-urlencoded") && (p.data = p.data.replace(It, "+")) : (d = p.url.slice(o.length), 
                        p.data && (p.processData || "string" == typeof p.data) && (o += (Lt.test(o) ? "&" : "?") + p.data, 
                        delete p.data), !1 === p.cache && (o = o.replace(Ft, "$1"), d = (Lt.test(o) ? "&" : "?") + "_=" + Nt.guid++ + d), 
                        p.url = o + d), p.ifModified && (E.lastModified[o] && T.setRequestHeader("If-Modified-Since", E.lastModified[o]), 
                        E.etag[o] && T.setRequestHeader("If-None-Match", E.etag[o])), (p.data && p.hasContent && !1 !== p.contentType || t.contentType) && T.setRequestHeader("Content-Type", p.contentType), 
                        T.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Vt + "; q=0.01" : "") : p.accepts["*"]), 
                        p.headers) T.setRequestHeader(f, p.headers[f]);
                        if (p.beforeSend && (!1 === p.beforeSend.call(h, T, p) || u)) return T.abort();
                        if (k = "abort", y.add(p.complete), T.done(p.success), T.fail(p.error), n = Qt(zt, p, t, T)) {
                            if (T.readyState = 1, l && g.trigger("ajaxSend", [ T, p ]), u) return T;
                            p.async && p.timeout > 0 && (a = r.setTimeout((function() {
                                T.abort("timeout");
                            }), p.timeout));
                            try {
                                u = !1, n.send(x, C);
                            } catch (e) {
                                if (u) throw e;
                                C(-1, e);
                            }
                        } else C(-1, "No Transport");
                        function C(e, t, s, c) {
                            var f, d, b, x, w, k = t;
                            u || (u = !0, a && r.clearTimeout(a), n = void 0, i = c || "", T.readyState = e > 0 ? 4 : 0, 
                            f = e >= 200 && e < 300 || 304 === e, s && (x = function(e, t, n) {
                                for (var r, o, i, s, a = e.contents, c = e.dataTypes; "*" === c[0]; ) c.shift(), 
                                void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                                if (r) for (o in a) if (a[o] && a[o].test(r)) {
                                    c.unshift(o);
                                    break;
                                }
                                if (c[0] in n) i = c[0]; else {
                                    for (o in n) {
                                        if (!c[0] || e.converters[o + " " + c[0]]) {
                                            i = o;
                                            break;
                                        }
                                        s || (s = o);
                                    }
                                    i = i || s;
                                }
                                if (i) return i !== c[0] && c.unshift(i), n[i];
                            }(p, T, s)), !f && E.inArray("script", p.dataTypes) > -1 && E.inArray("json", p.dataTypes) < 0 && (p.converters["text script"] = function() {}), 
                            x = function(e, t, n, r) {
                                var o, i, s, a, c, u = {}, l = e.dataTypes.slice();
                                if (l[1]) for (s in e.converters) u[s.toLowerCase()] = e.converters[s];
                                for (i = l.shift(); i; ) if (e.responseFields[i] && (n[e.responseFields[i]] = t), 
                                !c && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), c = i, i = l.shift()) if ("*" === i) i = c; else if ("*" !== c && c !== i) {
                                    if (!(s = u[c + " " + i] || u["* " + i])) for (o in u) if ((a = o.split(" "))[1] === i && (s = u[c + " " + a[0]] || u["* " + a[0]])) {
                                        !0 === s ? s = u[o] : !0 !== u[o] && (i = a[0], l.unshift(a[1]));
                                        break;
                                    }
                                    if (!0 !== s) if (s && e.throws) t = s(t); else try {
                                        t = s(t);
                                    } catch (e) {
                                        return {
                                            state: "parsererror",
                                            error: s ? e : "No conversion from " + c + " to " + i
                                        };
                                    }
                                }
                                return {
                                    state: "success",
                                    data: t
                                };
                            }(p, x, T, f), f ? (p.ifModified && ((w = T.getResponseHeader("Last-Modified")) && (E.lastModified[o] = w), 
                            (w = T.getResponseHeader("etag")) && (E.etag[o] = w)), 204 === e || "HEAD" === p.type ? k = "nocontent" : 304 === e ? k = "notmodified" : (k = x.state, 
                            d = x.data, f = !(b = x.error))) : (b = k, !e && k || (k = "error", e < 0 && (e = 0))), 
                            T.status = e, T.statusText = (t || k) + "", f ? v.resolveWith(h, [ d, k, T ]) : v.rejectWith(h, [ T, k, b ]), 
                            T.statusCode(m), m = void 0, l && g.trigger(f ? "ajaxSuccess" : "ajaxError", [ T, p, f ? d : b ]), 
                            y.fireWith(h, [ T, k ]), l && (g.trigger("ajaxComplete", [ T, p ]), --E.active || E.event.trigger("ajaxStop")));
                        }
                        return T;
                    },
                    getJSON: function(e, t, n) {
                        return E.get(e, t, n, "json");
                    },
                    getScript: function(e, t) {
                        return E.get(e, void 0, t, "script");
                    }
                }), E.each([ "get", "post" ], (function(e, t) {
                    E[t] = function(e, n, r, o) {
                        return y(n) && (o = o || r, r = n, n = void 0), E.ajax(E.extend({
                            url: e,
                            type: t,
                            dataType: o,
                            data: n,
                            success: r
                        }, E.isPlainObject(e) && e));
                    };
                })), E.ajaxPrefilter((function(e) {
                    var t;
                    for (t in e.headers) "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "");
                })), E._evalUrl = function(e, t, n) {
                    return E.ajax({
                        url: e,
                        type: "GET",
                        dataType: "script",
                        cache: !0,
                        async: !1,
                        global: !1,
                        converters: {
                            "text script": function() {}
                        },
                        dataFilter: function(e) {
                            E.globalEval(e, t, n);
                        }
                    });
                }, E.fn.extend({
                    wrapAll: function(e) {
                        var t;
                        return this[0] && (y(e) && (e = e.call(this[0])), t = E(e, this[0].ownerDocument).eq(0).clone(!0), 
                        this[0].parentNode && t.insertBefore(this[0]), t.map((function() {
                            for (var e = this; e.firstElementChild; ) e = e.firstElementChild;
                            return e;
                        })).append(this)), this;
                    },
                    wrapInner: function(e) {
                        return y(e) ? this.each((function(t) {
                            E(this).wrapInner(e.call(this, t));
                        })) : this.each((function() {
                            var t = E(this), n = t.contents();
                            n.length ? n.wrapAll(e) : t.append(e);
                        }));
                    },
                    wrap: function(e) {
                        var t = y(e);
                        return this.each((function(n) {
                            E(this).wrapAll(t ? e.call(this, n) : e);
                        }));
                    },
                    unwrap: function(e) {
                        return this.parent(e).not("body").each((function() {
                            E(this).replaceWith(this.childNodes);
                        })), this;
                    }
                }), E.expr.pseudos.hidden = function(e) {
                    return !E.expr.pseudos.visible(e);
                }, E.expr.pseudos.visible = function(e) {
                    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
                }, E.ajaxSettings.xhr = function() {
                    try {
                        return new r.XMLHttpRequest;
                    } catch (e) {}
                };
                var Kt = {
                    0: 200,
                    1223: 204
                }, Zt = E.ajaxSettings.xhr();
                v.cors = !!Zt && "withCredentials" in Zt, v.ajax = Zt = !!Zt, E.ajaxTransport((function(e) {
                    var t, n;
                    if (v.cors || Zt && !e.crossDomain) return {
                        send: function(o, i) {
                            var s, a = e.xhr();
                            if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (s in e.xhrFields) a[s] = e.xhrFields[s];
                            for (s in e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest"), 
                            o) a.setRequestHeader(s, o[s]);
                            t = function(e) {
                                return function() {
                                    t && (t = n = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null, 
                                    "abort" === e ? a.abort() : "error" === e ? "number" != typeof a.status ? i(0, "error") : i(a.status, a.statusText) : i(Kt[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
                                        binary: a.response
                                    } : {
                                        text: a.responseText
                                    }, a.getAllResponseHeaders()));
                                };
                            }, a.onload = t(), n = a.onerror = a.ontimeout = t("error"), void 0 !== a.onabort ? a.onabort = n : a.onreadystatechange = function() {
                                4 === a.readyState && r.setTimeout((function() {
                                    t && n();
                                }));
                            }, t = t("abort");
                            try {
                                a.send(e.hasContent && e.data || null);
                            } catch (e) {
                                if (t) throw e;
                            }
                        },
                        abort: function() {
                            t && t();
                        }
                    };
                })), E.ajaxPrefilter((function(e) {
                    e.crossDomain && (e.contents.script = !1);
                })), E.ajaxSetup({
                    accepts: {
                        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                    },
                    contents: {
                        script: /\b(?:java|ecma)script\b/
                    },
                    converters: {
                        "text script": function(e) {
                            return E.globalEval(e), e;
                        }
                    }
                }), E.ajaxPrefilter("script", (function(e) {
                    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
                })), E.ajaxTransport("script", (function(e) {
                    var t, n;
                    if (e.crossDomain || e.scriptAttrs) return {
                        send: function(r, o) {
                            t = E("<script>").attr(e.scriptAttrs || {}).prop({
                                charset: e.scriptCharset,
                                src: e.url
                            }).on("load error", n = function(e) {
                                t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type);
                            }), b.head.appendChild(t[0]);
                        },
                        abort: function() {
                            n && n();
                        }
                    };
                }));
                var en, tn = [], nn = /(=)\?(?=&|$)|\?\?/;
                E.ajaxSetup({
                    jsonp: "callback",
                    jsonpCallback: function() {
                        var e = tn.pop() || E.expando + "_" + Nt.guid++;
                        return this[e] = !0, e;
                    }
                }), E.ajaxPrefilter("json jsonp", (function(e, t, n) {
                    var o, i, s, a = !1 !== e.jsonp && (nn.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && nn.test(e.data) && "data");
                    if (a || "jsonp" === e.dataTypes[0]) return o = e.jsonpCallback = y(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, 
                    a ? e[a] = e[a].replace(nn, "$1" + o) : !1 !== e.jsonp && (e.url += (Lt.test(e.url) ? "&" : "?") + e.jsonp + "=" + o), 
                    e.converters["script json"] = function() {
                        return s || E.error(o + " was not called"), s[0];
                    }, e.dataTypes[0] = "json", i = r[o], r[o] = function() {
                        s = arguments;
                    }, n.always((function() {
                        void 0 === i ? E(r).removeProp(o) : r[o] = i, e[o] && (e.jsonpCallback = t.jsonpCallback, 
                        tn.push(o)), s && y(i) && i(s[0]), s = i = void 0;
                    })), "script";
                })), v.createHTMLDocument = ((en = b.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 
                2 === en.childNodes.length), E.parseHTML = function(e, t, n) {
                    return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (v.createHTMLDocument ? ((r = (t = b.implementation.createHTMLDocument("")).createElement("base")).href = b.location.href, 
                    t.head.appendChild(r)) : t = b), i = !n && [], (o = W.exec(e)) ? [ t.createElement(o[1]) ] : (o = qe([ e ], t, i), 
                    i && i.length && E(i).remove(), E.merge([], o.childNodes)));
                    var r, o, i;
                }, E.fn.load = function(e, t, n) {
                    var r, o, i, s = this, a = e.indexOf(" ");
                    return a > -1 && (r = Et(e.slice(a)), e = e.slice(0, a)), y(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"), 
                    s.length > 0 && E.ajax({
                        url: e,
                        type: o || "GET",
                        dataType: "html",
                        data: t
                    }).done((function(e) {
                        i = arguments, s.html(r ? E("<div>").append(E.parseHTML(e)).find(r) : e);
                    })).always(n && function(e, t) {
                        s.each((function() {
                            n.apply(this, i || [ e.responseText, t, e ]);
                        }));
                    }), this;
                }, E.expr.pseudos.animated = function(e) {
                    return E.grep(E.timers, (function(t) {
                        return e === t.elem;
                    })).length;
                }, E.offset = {
                    setOffset: function(e, t, n) {
                        var r, o, i, s, a, c, u = E.css(e, "position"), l = E(e), f = {};
                        "static" === u && (e.style.position = "relative"), a = l.offset(), i = E.css(e, "top"), 
                        c = E.css(e, "left"), ("absolute" === u || "fixed" === u) && (i + c).indexOf("auto") > -1 ? (s = (r = l.position()).top, 
                        o = r.left) : (s = parseFloat(i) || 0, o = parseFloat(c) || 0), y(t) && (t = t.call(e, n, E.extend({}, a))), 
                        null != t.top && (f.top = t.top - a.top + s), null != t.left && (f.left = t.left - a.left + o), 
                        "using" in t ? t.using.call(e, f) : l.css(f);
                    }
                }, E.fn.extend({
                    offset: function(e) {
                        if (arguments.length) return void 0 === e ? this : this.each((function(t) {
                            E.offset.setOffset(this, e, t);
                        }));
                        var t, n, r = this[0];
                        return r ? r.getClientRects().length ? (t = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, 
                        {
                            top: t.top + n.pageYOffset,
                            left: t.left + n.pageXOffset
                        }) : {
                            top: 0,
                            left: 0
                        } : void 0;
                    },
                    position: function() {
                        if (this[0]) {
                            var e, t, n, r = this[0], o = {
                                top: 0,
                                left: 0
                            };
                            if ("fixed" === E.css(r, "position")) t = r.getBoundingClientRect(); else {
                                for (t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === E.css(e, "position"); ) e = e.parentNode;
                                e && e !== r && 1 === e.nodeType && ((o = E(e).offset()).top += E.css(e, "borderTopWidth", !0), 
                                o.left += E.css(e, "borderLeftWidth", !0));
                            }
                            return {
                                top: t.top - o.top - E.css(r, "marginTop", !0),
                                left: t.left - o.left - E.css(r, "marginLeft", !0)
                            };
                        }
                    },
                    offsetParent: function() {
                        return this.map((function() {
                            for (var e = this.offsetParent; e && "static" === E.css(e, "position"); ) e = e.offsetParent;
                            return e || ge;
                        }));
                    }
                }), E.each({
                    scrollLeft: "pageXOffset",
                    scrollTop: "pageYOffset"
                }, (function(e, t) {
                    var n = "pageYOffset" === t;
                    E.fn[e] = function(r) {
                        return ee(this, (function(e, r, o) {
                            var i;
                            if (m(e) ? i = e : 9 === e.nodeType && (i = e.defaultView), void 0 === o) return i ? i[t] : e[r];
                            i ? i.scrollTo(n ? i.pageXOffset : o, n ? o : i.pageYOffset) : e[r] = o;
                        }), e, r, arguments.length);
                    };
                })), E.each([ "top", "left" ], (function(e, t) {
                    E.cssHooks[t] = et(v.pixelPosition, (function(e, n) {
                        if (n) return n = Ze(e, t), Ye.test(n) ? E(e).position()[t] + "px" : n;
                    }));
                })), E.each({
                    Height: "height",
                    Width: "width"
                }, (function(e, t) {
                    E.each({
                        padding: "inner" + e,
                        content: t,
                        "": "outer" + e
                    }, (function(n, r) {
                        E.fn[r] = function(o, i) {
                            var s = arguments.length && (n || "boolean" != typeof o), a = n || (!0 === o || !0 === i ? "margin" : "border");
                            return ee(this, (function(t, n, o) {
                                var i;
                                return m(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, 
                                Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === o ? E.css(t, n, a) : E.style(t, n, o, a);
                            }), t, s ? o : void 0, s);
                        };
                    }));
                })), E.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], (function(e, t) {
                    E.fn[t] = function(e) {
                        return this.on(t, e);
                    };
                })), E.fn.extend({
                    bind: function(e, t, n) {
                        return this.on(e, null, t, n);
                    },
                    unbind: function(e, t) {
                        return this.off(e, null, t);
                    },
                    delegate: function(e, t, n, r) {
                        return this.on(t, e, n, r);
                    },
                    undelegate: function(e, t, n) {
                        return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
                    },
                    hover: function(e, t) {
                        return this.on("mouseenter", e).on("mouseleave", t || e);
                    }
                }), E.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), (function(e, t) {
                    E.fn[t] = function(e, n) {
                        return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
                    };
                }));
                var rn = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
                E.proxy = function(e, t) {
                    var n, r, o;
                    if ("string" == typeof t && (n = e[t], t = e, e = n), y(e)) return r = a.call(arguments, 2), 
                    (o = function() {
                        return e.apply(t || this, r.concat(a.call(arguments)));
                    }).guid = e.guid = e.guid || E.guid++, o;
                }, E.holdReady = function(e) {
                    e ? E.readyWait++ : E.ready(!0);
                }, E.isArray = Array.isArray, E.parseJSON = JSON.parse, E.nodeName = j, E.isFunction = y, 
                E.isWindow = m, E.camelCase = oe, E.type = k, E.now = Date.now, E.isNumeric = function(e) {
                    var t = E.type(e);
                    return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
                }, E.trim = function(e) {
                    return null == e ? "" : (e + "").replace(rn, "$1");
                }, void 0 === (n = function() {
                    return E;
                }.apply(t, [])) || (e.exports = n);
                var on = r.jQuery, sn = r.$;
                return E.noConflict = function(e) {
                    return r.$ === E && (r.$ = sn), e && r.jQuery === E && (r.jQuery = on), E;
                }, void 0 === o && (r.jQuery = r.$ = E), E;
            }));
        }
    }, t = {};
    function n(r) {
        var o = t[r];
        if (void 0 !== o) return o.exports;
        var i = t[r] = {
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, n), i.exports;
    }
    n.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return n.d(t, {
            a: t
        }), t;
    }, n.d = (e, t) => {
        for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
            enumerable: !0,
            get: t[r]
        });
    }, n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), (() => {
        "use strict";
        var e = n(5616), t = n.n(e);
        function r(e) {
            return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            })(e);
        }
        function o(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                Object.defineProperty(e, i(r.key), r);
            }
        }
        function i(e) {
            var t = function(e, t) {
                if ("object" != r(e) || !e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var o = n.call(e, t);
                    if ("object" != r(o)) return o;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(e);
            }(e, "string");
            return "symbol" == r(t) ? t : t + "";
        }
        var s = function(e, t, n) {
            var r = e.getImageData(t, n, 1, 1).data;
            return "rgba(".concat(r[0], ", ").concat(r[1], ", ").concat(r[2], ", ").concat(r[3] / 255, ")");
        };
        function a() {
            t()("body").css("overflow", "auto"), t()("body").css("padding-right", 0), t()("#cpg_wrapper").remove(), 
            document.body.style.overflow = "auto", window.onscroll = null, chrome.storage.local.set({
                runingPicker: !1
            });
        }
        function c(e) {
            "Escape" === e.code && (chrome.storage.local.set({
                runingPicker: !1
            }), document.removeEventListener("keydown", c), a());
        }
        var u = function() {
            return e = function e() {
                !function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, e), this.listener(), this.canvas = null;
            }, (n = [ {
                key: "listener",
                value: function() {
                    var e = this;
                    chrome.runtime.onMessage.addListener((function(n, r, o) {
                        var i = n.action, s = n.scrUrl, a = n.color, c = n.options;
                        if ("screenshotUrl" === i) {
                            window.focus(), t()("body").append('<div id="cpg_wrapper" class="cpg_wrapper"></div>'), 
                            t()("#cpg_wrapper").append('<div id="cpg_wrapper_helper" class="cpg_wrapper_helper"></div>'), 
                            t()("#cpg_wrapper_helper").append('<canvas id="cpg_canvas" class="cpg_canvas"></canvas>'), 
                            t()("#cpg_wrapper_helper").append('<div id="cpg_preview" class="cpg_preview"></div>'), 
                            e.canvas = document.getElementById("cpg_canvas");
                            var u = new Image;
                            u.onload = function() {
                                e.canvas.width = window.innerWidth, e.canvas.height = window.innerHeight, e.drawCanvas(u);
                            }, u.src = s;
                        } else if ("setColorToClipboard" === i) e.setColorToClipboard(a, c); else if ("ping" === i) return Promise.resolve({
                            response: "Hi from content script"
                        });
                        return !0;
                    })), document.body.addEventListener("keyup", (function(e) {
                        "Escape" === e.code && chrome.storage.local.set({
                            runingPicker: !1
                        });
                    }));
                }
            }, {
                key: "setColorToClipboard",
                value: function(e, t) {
                    var n;
                    n = !1 === t.pickBehaviour.copyHash ? e : e.slice(1, e.length);
                    var r = document.createElement("textarea");
                    r.value = n, r.setAttribute("readonly", ""), r.style.position = "absolute", r.style.left = "-9999px", 
                    document.body.appendChild(r), r.select(), document.execCommand("copy"), document.body.removeChild(r);
                }
            }, {
                key: "drawCanvas",
                value: function(e) {
                    var t = this.canvas.getContext("2d");
                    t.drawImage(e, 0, 0, window.innerWidth, window.innerHeight), this.mouseListener(t);
                }
            }, {
                key: "mouseListener",
                value: function(e) {
                    var n = window.pageYOffset || document.documentElement.scrollTop, r = window.pageXOffset || document.documentElement.scrollLeft;
                    window.onscroll = function() {
                        window.scrollTo(r, n);
                    };
                    var o = t()("#cpg_preview");
                    this.drawGrid(o), document.getElementById("cpg_wrapper_helper").addEventListener("mousemove", (function(t) {
                        var n = Math.floor(t.clientX), r = Math.floor(t.clientY);
                        o.css("top", r + 20), o.css("left", n + 20), function(e, t, n, r) {
                            e.find("span#1").css("background-color", s(t, n + 4, r + 4)), e.find("span#2").css("background-color", s(t, n + 3, r + 4)), 
                            e.find("span#3").css("background-color", s(t, n + 2, r + 4)), e.find("span#4").css("background-color", s(t, n + 1, r + 4)), 
                            e.find("span#5").css("background-color", s(t, n, r + 4)), e.find("span#6").css("background-color", s(t, n - 1, r + 4)), 
                            e.find("span#7").css("background-color", s(t, n - 2, r + 4)), e.find("span#8").css("background-color", s(t, n - 3, r + 4)), 
                            e.find("span#9").css("background-color", s(t, n - 4, r + 4)), e.find("span#10").css("background-color", s(t, n + 4, r + 3)), 
                            e.find("span#11").css("background-color", s(t, n + 3, r + 3)), e.find("span#12").css("background-color", s(t, n + 2, r + 3)), 
                            e.find("span#13").css("background-color", s(t, n + 1, r + 3)), e.find("span#14").css("background-color", s(t, n, r + 3)), 
                            e.find("span#15").css("background-color", s(t, n - 1, r + 3)), e.find("span#16").css("background-color", s(t, n - 2, r + 3)), 
                            e.find("span#17").css("background-color", s(t, n - 3, r + 3)), e.find("span#18").css("background-color", s(t, n - 4, r + 3)), 
                            e.find("span#19").css("background-color", s(t, n + 4, r + 2)), e.find("span#20").css("background-color", s(t, n + 3, r + 2)), 
                            e.find("span#21").css("background-color", s(t, n + 2, r + 2)), e.find("span#22").css("background-color", s(t, n + 1, r + 2)), 
                            e.find("span#23").css("background-color", s(t, n, r + 2)), e.find("span#24").css("background-color", s(t, n - 1, r + 2)), 
                            e.find("span#25").css("background-color", s(t, n - 2, r + 2)), e.find("span#26").css("background-color", s(t, n - 3, r + 2)), 
                            e.find("span#27").css("background-color", s(t, n - 4, r + 2)), e.find("span#28").css("background-color", s(t, n + 4, r + 1)), 
                            e.find("span#29").css("background-color", s(t, n + 3, r + 1)), e.find("span#30").css("background-color", s(t, n + 2, r + 1)), 
                            e.find("span#31").css("background-color", s(t, n + 1, r + 1)), e.find("span#32").css("background-color", s(t, n, r + 1)), 
                            e.find("span#33").css("background-color", s(t, n - 1, r + 1)), e.find("span#34").css("background-color", s(t, n - 2, r + 1)), 
                            e.find("span#35").css("background-color", s(t, n - 3, r + 1)), e.find("span#36").css("background-color", s(t, n - 4, r + 1)), 
                            e.find("span#37").css("background-color", s(t, n + 4, r)), e.find("span#38").css("background-color", s(t, n + 3, r)), 
                            e.find("span#39").css("background-color", s(t, n + 2, r)), e.find("span#40").css("background-color", s(t, n + 1, r)), 
                            e.find("span#41").css({
                                "background-color": s(t, n, r),
                                border: "1px solid #000"
                            }), e.find("span#42").css("background-color", s(t, n - 1, r)), e.find("span#43").css("background-color", s(t, n - 2, r)), 
                            e.find("span#44").css("background-color", s(t, n - 3, r)), e.find("span#45").css("background-color", s(t, n - 4, r)), 
                            e.find("span#46").css("background-color", s(t, n + 4, r - 1)), e.find("span#47").css("background-color", s(t, n + 3, r - 1)), 
                            e.find("span#48").css("background-color", s(t, n + 2, r - 1)), e.find("span#49").css("background-color", s(t, n + 1, r - 1)), 
                            e.find("span#50").css("background-color", s(t, n, r - 1)), e.find("span#51").css("background-color", s(t, n - 1, r - 1)), 
                            e.find("span#52").css("background-color", s(t, n - 2, r - 1)), e.find("span#53").css("background-color", s(t, n - 3, r - 1)), 
                            e.find("span#54").css("background-color", s(t, n - 4, r - 1)), e.find("span#55").css("background-color", s(t, n + 4, r - 2)), 
                            e.find("span#56").css("background-color", s(t, n + 3, r - 2)), e.find("span#57").css("background-color", s(t, n + 2, r - 2)), 
                            e.find("span#58").css("background-color", s(t, n + 1, r - 2)), e.find("span#59").css("background-color", s(t, n, r - 2)), 
                            e.find("span#60").css("background-color", s(t, n - 1, r - 2)), e.find("span#61").css("background-color", s(t, n - 2, r - 2)), 
                            e.find("span#62").css("background-color", s(t, n - 3, r - 2)), e.find("span#63").css("background-color", s(t, n - 4, r - 2)), 
                            e.find("span#64").css("background-color", s(t, n + 4, r - 3)), e.find("span#65").css("background-color", s(t, n + 3, r - 3)), 
                            e.find("span#66").css("background-color", s(t, n + 2, r - 3)), e.find("span#67").css("background-color", s(t, n + 1, r - 3)), 
                            e.find("span#68").css("background-color", s(t, n, r - 3)), e.find("span#69").css("background-color", s(t, n - 1, r - 3)), 
                            e.find("span#70").css("background-color", s(t, n - 2, r - 3)), e.find("span#71").css("background-color", s(t, n - 3, r - 3)), 
                            e.find("span#72").css("background-color", s(t, n - 4, r - 3)), e.find("span#73").css("background-color", s(t, n + 4, r - 4)), 
                            e.find("span#74").css("background-color", s(t, n + 3, r - 4)), e.find("span#75").css("background-color", s(t, n + 2, r - 4)), 
                            e.find("span#76").css("background-color", s(t, n + 1, r - 4)), e.find("span#77").css("background-color", s(t, n, r - 4)), 
                            e.find("span#78").css("background-color", s(t, n - 1, r - 4)), e.find("span#79").css("background-color", s(t, n - 2, r - 4)), 
                            e.find("span#80").css("background-color", s(t, n - 3, r - 4)), e.find("span#81").css("background-color", s(t, n - 4, r - 4));
                        }(o, e, n, r), window.screen.height - 250 < r && o.css("top", r - 20 - 100), window.screen.width - 150 < n && o.css("left", n - 20 - 100);
                    })), document.getElementById("cpg_wrapper_helper").addEventListener("click", (function(t) {
                        var n = Math.floor(t.clientX), r = Math.floor(t.clientY), o = e.getImageData(n, r, 1, 1).data;
                        chrome.runtime.sendMessage({
                            action: "userPickedColor",
                            color: "rgba(".concat(o[0], ", ").concat(o[1], ", ").concat(o[2], ", ").concat(o[3] / 255, ")")
                        }, (function() {
                            a();
                        }));
                    })), document.addEventListener("keydown", c);
                }
            }, {
                key: "drawGrid",
                value: function(e) {
                    for (var t = 1; t < 82; t++) e.prepend('\n      <span id="'.concat(t, '" class="grid_item"></span>\n      '));
                }
            } ]) && o(e.prototype, n), Object.defineProperty(e, "prototype", {
                writable: !1
            }), e;
            var e, n;
        }();
        document.addEventListener("DOMContentLoaded", (function(e) {
            new u;
        }));
    })();
})();