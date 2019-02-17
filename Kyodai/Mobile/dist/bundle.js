! function (e) {
  var t = {};

  function n(r) {
    if (t[r]) return t[r].exports;
    var o = t[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
  }
  n.m = e, n.c = t, n.d = function (e, t, r) {
    n.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: r
    })
  }, n.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    })
  }, n.t = function (e, t) {
    if (1 & t && (e = n(e)), 8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var r = Object.create(null);
    if (n.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e)
      for (var o in e) n.d(r, o, function (t) {
        return e[t]
      }.bind(null, o));
    return r
  }, n.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default
    } : function () {
      return e
    };
    return n.d(t, "a", t), t
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, n.p = "", n(n.s = 0)
}([function (e, t, n) {
  "use strict";
  n.r(t);
  n(1);
  let r = document.documentElement.clientWidth || document.body.clientWidth,
    o = document.getElementsByTagName("html")[0];
  o.style.fontSize = r / 10 + "px", window.addEventListener("resize", e => {
    let t = document.documentElement.clientWidth || document.body.clientWidth;
    o.style.fontSize = t / 10 + "px"
  })
}, function (e, t, n) {
  var r = n(2);
  "string" == typeof r && (r = [
    [e.i, r, ""]
  ]);
  var o = {
    hmr: !0,
    transform: void 0,
    insertInto: void 0
  };
  n(4)(r, o);
  r.locals && (e.exports = r.locals)
}, function (e, t, n) {
  (e.exports = n(3)(!1)).push([e.i, ".header {\n  height: 1.06667rem;\n  width: 100%;\n  background-color: red;\n  padding-left: 0.61333rem;\n  box-sizing: border-box; }\n  .header .header-nav {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-around;\n    white-space: nowrap; }\n    .header .header-nav .header-item {\n      color: #ffcdce;\n      font-size: 0.42667rem;\n      margin-right: 0.53333rem;\n      line-height: 1.06667rem; }\n", ""])
}, function (e, t) {
  e.exports = function (e) {
    var t = [];
    return t.toString = function () {
      return this.map(function (t) {
        var n = function (e, t) {
          var n = e[1] || "",
            r = e[3];
          if (!r) return n;
          if (t && "function" == typeof btoa) {
            var o = function (e) {
                return "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(e)))) + " */"
              }(r),
              i = r.sources.map(function (e) {
                return "/*# sourceURL=" + r.sourceRoot + e + " */"
              });
            return [n].concat(i).concat([o]).join("\n")
          }
          return [n].join("\n")
        }(t, e);
        return t[2] ? "@media " + t[2] + "{" + n + "}" : n
      }).join("")
    }, t.i = function (e, n) {
      "string" == typeof e && (e = [
        [null, e, ""]
      ]);
      for (var r = {}, o = 0; o < this.length; o++) {
        var i = this[o][0];
        "number" == typeof i && (r[i] = !0)
      }
      for (o = 0; o < e.length; o++) {
        var a = e[o];
        "number" == typeof a[0] && r[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] + ") and (" + n + ")"), t.push(a))
      }
    }, t
  }
}, function (e, t, n) {
  var r = {},
    o = function (e) {
      var t;
      return function () {
        return void 0 === t && (t = e.apply(this, arguments)), t
      }
    }(function () {
      return window && document && document.all && !window.atob
    }),
    i = function (e) {
      var t = {};
      return function (e, n) {
        if ("function" == typeof e) return e();
        if (void 0 === t[e]) {
          var r = function (e, t) {
            return t ? t.querySelector(e) : document.querySelector(e)
          }.call(this, e, n);
          if (window.HTMLIFrameElement && r instanceof window.HTMLIFrameElement) try {
            r = r.contentDocument.head
          } catch (e) {
            r = null
          }
          t[e] = r
        }
        return t[e]
      }
    }(),
    a = null,
    s = 0,
    u = [],
    c = n(5);

  function f(e, t) {
    for (var n = 0; n < e.length; n++) {
      var o = e[n],
        i = r[o.id];
      if (i) {
        i.refs++;
        for (var a = 0; a < i.parts.length; a++) i.parts[a](o.parts[a]);
        for (; a < o.parts.length; a++) i.parts.push(m(o.parts[a], t))
      } else {
        var s = [];
        for (a = 0; a < o.parts.length; a++) s.push(m(o.parts[a], t));
        r[o.id] = {
          id: o.id,
          refs: 1,
          parts: s
        }
      }
    }
  }

  function l(e, t) {
    for (var n = [], r = {}, o = 0; o < e.length; o++) {
      var i = e[o],
        a = t.base ? i[0] + t.base : i[0],
        s = {
          css: i[1],
          media: i[2],
          sourceMap: i[3]
        };
      r[a] ? r[a].parts.push(s) : n.push(r[a] = {
        id: a,
        parts: [s]
      })
    }
    return n
  }

  function d(e, t) {
    var n = i(e.insertInto);
    if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
    var r = u[u.length - 1];
    if ("top" === e.insertAt) r ? r.nextSibling ? n.insertBefore(t, r.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild), u.push(t);
    else if ("bottom" === e.insertAt) n.appendChild(t);
    else {
      if ("object" != typeof e.insertAt || !e.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
      var o = i(e.insertAt.before, n);
      n.insertBefore(t, o)
    }
  }

  function p(e) {
    if (null === e.parentNode) return !1;
    e.parentNode.removeChild(e);
    var t = u.indexOf(e);
    t >= 0 && u.splice(t, 1)
  }

  function h(e) {
    var t = document.createElement("style");
    if (void 0 === e.attrs.type && (e.attrs.type = "text/css"), void 0 === e.attrs.nonce) {
      var r = function () {
        0;
        return n.nc
      }();
      r && (e.attrs.nonce = r)
    }
    return v(t, e.attrs), d(e, t), t
  }

  function v(e, t) {
    Object.keys(t).forEach(function (n) {
      e.setAttribute(n, t[n])
    })
  }

  function m(e, t) {
    var n, r, o, i;
    if (t.transform && e.css) {
      if (!(i = t.transform(e.css))) return function () {};
      e.css = i
    }
    if (t.singleton) {
      var u = s++;
      n = a || (a = h(t)), r = y.bind(null, n, u, !1), o = y.bind(null, n, u, !0)
    } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = function (e) {
      var t = document.createElement("link");
      return void 0 === e.attrs.type && (e.attrs.type = "text/css"), e.attrs.rel = "stylesheet", v(t, e.attrs), d(e, t), t
    }(t), r = function (e, t, n) {
      var r = n.css,
        o = n.sourceMap,
        i = void 0 === t.convertToAbsoluteUrls && o;
      (t.convertToAbsoluteUrls || i) && (r = c(r));
      o && (r += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */");
      var a = new Blob([r], {
          type: "text/css"
        }),
        s = e.href;
      e.href = URL.createObjectURL(a), s && URL.revokeObjectURL(s)
    }.bind(null, n, t), o = function () {
      p(n), n.href && URL.revokeObjectURL(n.href)
    }) : (n = h(t), r = function (e, t) {
      var n = t.css,
        r = t.media;
      r && e.setAttribute("media", r);
      if (e.styleSheet) e.styleSheet.cssText = n;
      else {
        for (; e.firstChild;) e.removeChild(e.firstChild);
        e.appendChild(document.createTextNode(n))
      }
    }.bind(null, n), o = function () {
      p(n)
    });
    return r(e),
      function (t) {
        if (t) {
          if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
          r(e = t)
        } else o()
      }
  }
  e.exports = function (e, t) {
    if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
    (t = t || {}).attrs = "object" == typeof t.attrs ? t.attrs : {}, t.singleton || "boolean" == typeof t.singleton || (t.singleton = o()), t.insertInto || (t.insertInto = "head"), t.insertAt || (t.insertAt = "bottom");
    var n = l(e, t);
    return f(n, t),
      function (e) {
        for (var o = [], i = 0; i < n.length; i++) {
          var a = n[i];
          (s = r[a.id]).refs--, o.push(s)
        }
        e && f(l(e, t), t);
        for (i = 0; i < o.length; i++) {
          var s;
          if (0 === (s = o[i]).refs) {
            for (var u = 0; u < s.parts.length; u++) s.parts[u]();
            delete r[s.id]
          }
        }
      }
  };
  var b = function () {
    var e = [];
    return function (t, n) {
      return e[t] = n, e.filter(Boolean).join("\n")
    }
  }();

  function y(e, t, n, r) {
    var o = n ? "" : r.css;
    if (e.styleSheet) e.styleSheet.cssText = b(t, o);
    else {
      var i = document.createTextNode(o),
        a = e.childNodes;
      a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(i, a[t]) : e.appendChild(i)
    }
  }
}, function (e, t) {
  e.exports = function (e) {
    var t = "undefined" != typeof window && window.location;
    if (!t) throw new Error("fixUrls requires window.location");
    if (!e || "string" != typeof e) return e;
    var n = t.protocol + "//" + t.host,
      r = n + t.pathname.replace(/\/[^\/]*$/, "/");
    return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (e, t) {
      var o, i = t.trim().replace(/^"(.*)"$/, function (e, t) {
        return t
      }).replace(/^'(.*)'$/, function (e, t) {
        return t
      });
      return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i) ? e : (o = 0 === i.indexOf("//") ? i : 0 === i.indexOf("/") ? n + i : r + i.replace(/^\.\//, ""), "url(" + JSON.stringify(o) + ")")
    })
  }
}]);