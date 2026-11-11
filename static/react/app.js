function iv(p) {
  return p && p.__esModule && Object.prototype.hasOwnProperty.call(p, "default") ? p.default : p;
}
var is = { exports: {} }, jn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bo;
function cv() {
  if (bo) return jn;
  bo = 1;
  var p = Symbol.for("react.transitional.element"), $ = Symbol.for("react.fragment");
  function O(m, R, W) {
    var V = null;
    if (W !== void 0 && (V = "" + W), R.key !== void 0 && (V = "" + R.key), "key" in R) {
      W = {};
      for (var tl in R)
        tl !== "key" && (W[tl] = R[tl]);
    } else W = R;
    return R = W.ref, {
      $$typeof: p,
      type: m,
      key: V,
      ref: R !== void 0 ? R : null,
      props: W
    };
  }
  return jn.Fragment = $, jn.jsx = O, jn.jsxs = O, jn;
}
var po;
function sv() {
  return po || (po = 1, is.exports = cv()), is.exports;
}
var c = sv(), cs = { exports: {} }, Z = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var So;
function fv() {
  if (So) return Z;
  So = 1;
  var p = Symbol.for("react.transitional.element"), $ = Symbol.for("react.portal"), O = Symbol.for("react.fragment"), m = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), W = Symbol.for("react.consumer"), V = Symbol.for("react.context"), tl = Symbol.for("react.forward_ref"), z = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), N = Symbol.for("react.lazy"), M = Symbol.for("react.activity"), L = Symbol.iterator;
  function xl(d) {
    return d === null || typeof d != "object" ? null : (d = L && d[L] || d["@@iterator"], typeof d == "function" ? d : null);
  }
  var B = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, D = Object.assign, ul = {};
  function il(d, E, _) {
    this.props = d, this.context = E, this.refs = ul, this.updater = _ || B;
  }
  il.prototype.isReactComponent = {}, il.prototype.setState = function(d, E) {
    if (typeof d != "object" && typeof d != "function" && d != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, d, E, "setState");
  }, il.prototype.forceUpdate = function(d) {
    this.updater.enqueueForceUpdate(this, d, "forceUpdate");
  };
  function Gl() {
  }
  Gl.prototype = il.prototype;
  function El(d, E, _) {
    this.props = d, this.context = E, this.refs = ul, this.updater = _ || B;
  }
  var Ll = El.prototype = new Gl();
  Ll.constructor = El, D(Ll, il.prototype), Ll.isPureReactComponent = !0;
  var Bl = Array.isArray;
  function zl() {
  }
  var w = { H: null, A: null, T: null, S: null }, Q = Object.prototype.hasOwnProperty;
  function dl(d, E, _) {
    var U = _.ref;
    return {
      $$typeof: p,
      type: d,
      key: E,
      ref: U !== void 0 ? U : null,
      props: _
    };
  }
  function ql(d, E) {
    return dl(d.type, E, d.props);
  }
  function Al(d) {
    return typeof d == "object" && d !== null && d.$$typeof === p;
  }
  function pl(d) {
    var E = { "=": "=0", ":": "=2" };
    return "$" + d.replace(/[=:]/g, function(_) {
      return E[_];
    });
  }
  var Ot = /\/+/g;
  function vt(d, E) {
    return typeof d == "object" && d !== null && d.key != null ? pl("" + d.key) : E.toString(36);
  }
  function Fl(d) {
    switch (d.status) {
      case "fulfilled":
        return d.value;
      case "rejected":
        throw d.reason;
      default:
        switch (typeof d.status == "string" ? d.then(zl, zl) : (d.status = "pending", d.then(
          function(E) {
            d.status === "pending" && (d.status = "fulfilled", d.value = E);
          },
          function(E) {
            d.status === "pending" && (d.status = "rejected", d.reason = E);
          }
        )), d.status) {
          case "fulfilled":
            return d.value;
          case "rejected":
            throw d.reason;
        }
    }
    throw d;
  }
  function o(d, E, _, U, K) {
    var I = typeof d;
    (I === "undefined" || I === "boolean") && (d = null);
    var ol = !1;
    if (d === null) ol = !0;
    else
      switch (I) {
        case "bigint":
        case "string":
        case "number":
          ol = !0;
          break;
        case "object":
          switch (d.$$typeof) {
            case p:
            case $:
              ol = !0;
              break;
            case N:
              return ol = d._init, o(
                ol(d._payload),
                E,
                _,
                U,
                K
              );
          }
      }
    if (ol)
      return K = K(d), ol = U === "" ? "." + vt(d, 0) : U, Bl(K) ? (_ = "", ol != null && (_ = ol.replace(Ot, "$&/") + "/"), o(K, E, _, "", function(Na) {
        return Na;
      })) : K != null && (Al(K) && (K = ql(
        K,
        _ + (K.key == null || d && d.key === K.key ? "" : ("" + K.key).replace(
          Ot,
          "$&/"
        ) + "/") + ol
      )), E.push(K)), 1;
    ol = 0;
    var $l = U === "" ? "." : U + ":";
    if (Bl(d))
      for (var Ol = 0; Ol < d.length; Ol++)
        U = d[Ol], I = $l + vt(U, Ol), ol += o(
          U,
          E,
          _,
          I,
          K
        );
    else if (Ol = xl(d), typeof Ol == "function")
      for (d = Ol.call(d), Ol = 0; !(U = d.next()).done; )
        U = U.value, I = $l + vt(U, Ol++), ol += o(
          U,
          E,
          _,
          I,
          K
        );
    else if (I === "object") {
      if (typeof d.then == "function")
        return o(
          Fl(d),
          E,
          _,
          U,
          K
        );
      throw E = String(d), Error(
        "Objects are not valid as a React child (found: " + (E === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : E) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ol;
  }
  function T(d, E, _) {
    if (d == null) return d;
    var U = [], K = 0;
    return o(d, U, "", "", function(I) {
      return E.call(_, I, K++);
    }), U;
  }
  function q(d) {
    if (d._status === -1) {
      var E = d._result;
      E = E(), E.then(
        function(_) {
          (d._status === 0 || d._status === -1) && (d._status = 1, d._result = _);
        },
        function(_) {
          (d._status === 0 || d._status === -1) && (d._status = 2, d._result = _);
        }
      ), d._status === -1 && (d._status = 0, d._result = E);
    }
    if (d._status === 1) return d._result.default;
    throw d._result;
  }
  var F = typeof reportError == "function" ? reportError : function(d) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var E = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof d == "object" && d !== null && typeof d.message == "string" ? String(d.message) : String(d),
        error: d
      });
      if (!window.dispatchEvent(E)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", d);
      return;
    }
    console.error(d);
  }, cl = {
    map: T,
    forEach: function(d, E, _) {
      T(
        d,
        function() {
          E.apply(this, arguments);
        },
        _
      );
    },
    count: function(d) {
      var E = 0;
      return T(d, function() {
        E++;
      }), E;
    },
    toArray: function(d) {
      return T(d, function(E) {
        return E;
      }) || [];
    },
    only: function(d) {
      if (!Al(d))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return d;
    }
  };
  return Z.Activity = M, Z.Children = cl, Z.Component = il, Z.Fragment = O, Z.Profiler = R, Z.PureComponent = El, Z.StrictMode = m, Z.Suspense = z, Z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, Z.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(d) {
      return w.H.useMemoCache(d);
    }
  }, Z.cache = function(d) {
    return function() {
      return d.apply(null, arguments);
    };
  }, Z.cacheSignal = function() {
    return null;
  }, Z.cloneElement = function(d, E, _) {
    if (d == null)
      throw Error(
        "The argument must be a React element, but you passed " + d + "."
      );
    var U = D({}, d.props), K = d.key;
    if (E != null)
      for (I in E.key !== void 0 && (K = "" + E.key), E)
        !Q.call(E, I) || I === "key" || I === "__self" || I === "__source" || I === "ref" && E.ref === void 0 || (U[I] = E[I]);
    var I = arguments.length - 2;
    if (I === 1) U.children = _;
    else if (1 < I) {
      for (var ol = Array(I), $l = 0; $l < I; $l++)
        ol[$l] = arguments[$l + 2];
      U.children = ol;
    }
    return dl(d.type, K, U);
  }, Z.createContext = function(d) {
    return d = {
      $$typeof: V,
      _currentValue: d,
      _currentValue2: d,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, d.Provider = d, d.Consumer = {
      $$typeof: W,
      _context: d
    }, d;
  }, Z.createElement = function(d, E, _) {
    var U, K = {}, I = null;
    if (E != null)
      for (U in E.key !== void 0 && (I = "" + E.key), E)
        Q.call(E, U) && U !== "key" && U !== "__self" && U !== "__source" && (K[U] = E[U]);
    var ol = arguments.length - 2;
    if (ol === 1) K.children = _;
    else if (1 < ol) {
      for (var $l = Array(ol), Ol = 0; Ol < ol; Ol++)
        $l[Ol] = arguments[Ol + 2];
      K.children = $l;
    }
    if (d && d.defaultProps)
      for (U in ol = d.defaultProps, ol)
        K[U] === void 0 && (K[U] = ol[U]);
    return dl(d, I, K);
  }, Z.createRef = function() {
    return { current: null };
  }, Z.forwardRef = function(d) {
    return { $$typeof: tl, render: d };
  }, Z.isValidElement = Al, Z.lazy = function(d) {
    return {
      $$typeof: N,
      _payload: { _status: -1, _result: d },
      _init: q
    };
  }, Z.memo = function(d, E) {
    return {
      $$typeof: x,
      type: d,
      compare: E === void 0 ? null : E
    };
  }, Z.startTransition = function(d) {
    var E = w.T, _ = {};
    w.T = _;
    try {
      var U = d(), K = w.S;
      K !== null && K(_, U), typeof U == "object" && U !== null && typeof U.then == "function" && U.then(zl, F);
    } catch (I) {
      F(I);
    } finally {
      E !== null && _.types !== null && (E.types = _.types), w.T = E;
    }
  }, Z.unstable_useCacheRefresh = function() {
    return w.H.useCacheRefresh();
  }, Z.use = function(d) {
    return w.H.use(d);
  }, Z.useActionState = function(d, E, _) {
    return w.H.useActionState(d, E, _);
  }, Z.useCallback = function(d, E) {
    return w.H.useCallback(d, E);
  }, Z.useContext = function(d) {
    return w.H.useContext(d);
  }, Z.useDebugValue = function() {
  }, Z.useDeferredValue = function(d, E) {
    return w.H.useDeferredValue(d, E);
  }, Z.useEffect = function(d, E) {
    return w.H.useEffect(d, E);
  }, Z.useEffectEvent = function(d) {
    return w.H.useEffectEvent(d);
  }, Z.useId = function() {
    return w.H.useId();
  }, Z.useImperativeHandle = function(d, E, _) {
    return w.H.useImperativeHandle(d, E, _);
  }, Z.useInsertionEffect = function(d, E) {
    return w.H.useInsertionEffect(d, E);
  }, Z.useLayoutEffect = function(d, E) {
    return w.H.useLayoutEffect(d, E);
  }, Z.useMemo = function(d, E) {
    return w.H.useMemo(d, E);
  }, Z.useOptimistic = function(d, E) {
    return w.H.useOptimistic(d, E);
  }, Z.useReducer = function(d, E, _) {
    return w.H.useReducer(d, E, _);
  }, Z.useRef = function(d) {
    return w.H.useRef(d);
  }, Z.useState = function(d) {
    return w.H.useState(d);
  }, Z.useSyncExternalStore = function(d, E, _) {
    return w.H.useSyncExternalStore(
      d,
      E,
      _
    );
  }, Z.useTransition = function() {
    return w.H.useTransition();
  }, Z.version = "19.2.8", Z;
}
var jo;
function ms() {
  return jo || (jo = 1, cs.exports = fv()), cs.exports;
}
var X = ms();
const rv = /* @__PURE__ */ iv(X);
var ss = { exports: {} }, xn = {}, fs = { exports: {} }, rs = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xo;
function dv() {
  return xo || (xo = 1, (function(p) {
    function $(o, T) {
      var q = o.length;
      o.push(T);
      l: for (; 0 < q; ) {
        var F = q - 1 >>> 1, cl = o[F];
        if (0 < R(cl, T))
          o[F] = T, o[q] = cl, q = F;
        else break l;
      }
    }
    function O(o) {
      return o.length === 0 ? null : o[0];
    }
    function m(o) {
      if (o.length === 0) return null;
      var T = o[0], q = o.pop();
      if (q !== T) {
        o[0] = q;
        l: for (var F = 0, cl = o.length, d = cl >>> 1; F < d; ) {
          var E = 2 * (F + 1) - 1, _ = o[E], U = E + 1, K = o[U];
          if (0 > R(_, q))
            U < cl && 0 > R(K, _) ? (o[F] = K, o[U] = q, F = U) : (o[F] = _, o[E] = q, F = E);
          else if (U < cl && 0 > R(K, q))
            o[F] = K, o[U] = q, F = U;
          else break l;
        }
      }
      return T;
    }
    function R(o, T) {
      var q = o.sortIndex - T.sortIndex;
      return q !== 0 ? q : o.id - T.id;
    }
    if (p.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var W = performance;
      p.unstable_now = function() {
        return W.now();
      };
    } else {
      var V = Date, tl = V.now();
      p.unstable_now = function() {
        return V.now() - tl;
      };
    }
    var z = [], x = [], N = 1, M = null, L = 3, xl = !1, B = !1, D = !1, ul = !1, il = typeof setTimeout == "function" ? setTimeout : null, Gl = typeof clearTimeout == "function" ? clearTimeout : null, El = typeof setImmediate < "u" ? setImmediate : null;
    function Ll(o) {
      for (var T = O(x); T !== null; ) {
        if (T.callback === null) m(x);
        else if (T.startTime <= o)
          m(x), T.sortIndex = T.expirationTime, $(z, T);
        else break;
        T = O(x);
      }
    }
    function Bl(o) {
      if (D = !1, Ll(o), !B)
        if (O(z) !== null)
          B = !0, zl || (zl = !0, pl());
        else {
          var T = O(x);
          T !== null && Fl(Bl, T.startTime - o);
        }
    }
    var zl = !1, w = -1, Q = 5, dl = -1;
    function ql() {
      return ul ? !0 : !(p.unstable_now() - dl < Q);
    }
    function Al() {
      if (ul = !1, zl) {
        var o = p.unstable_now();
        dl = o;
        var T = !0;
        try {
          l: {
            B = !1, D && (D = !1, Gl(w), w = -1), xl = !0;
            var q = L;
            try {
              t: {
                for (Ll(o), M = O(z); M !== null && !(M.expirationTime > o && ql()); ) {
                  var F = M.callback;
                  if (typeof F == "function") {
                    M.callback = null, L = M.priorityLevel;
                    var cl = F(
                      M.expirationTime <= o
                    );
                    if (o = p.unstable_now(), typeof cl == "function") {
                      M.callback = cl, Ll(o), T = !0;
                      break t;
                    }
                    M === O(z) && m(z), Ll(o);
                  } else m(z);
                  M = O(z);
                }
                if (M !== null) T = !0;
                else {
                  var d = O(x);
                  d !== null && Fl(
                    Bl,
                    d.startTime - o
                  ), T = !1;
                }
              }
              break l;
            } finally {
              M = null, L = q, xl = !1;
            }
            T = void 0;
          }
        } finally {
          T ? pl() : zl = !1;
        }
      }
    }
    var pl;
    if (typeof El == "function")
      pl = function() {
        El(Al);
      };
    else if (typeof MessageChannel < "u") {
      var Ot = new MessageChannel(), vt = Ot.port2;
      Ot.port1.onmessage = Al, pl = function() {
        vt.postMessage(null);
      };
    } else
      pl = function() {
        il(Al, 0);
      };
    function Fl(o, T) {
      w = il(function() {
        o(p.unstable_now());
      }, T);
    }
    p.unstable_IdlePriority = 5, p.unstable_ImmediatePriority = 1, p.unstable_LowPriority = 4, p.unstable_NormalPriority = 3, p.unstable_Profiling = null, p.unstable_UserBlockingPriority = 2, p.unstable_cancelCallback = function(o) {
      o.callback = null;
    }, p.unstable_forceFrameRate = function(o) {
      0 > o || 125 < o ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Q = 0 < o ? Math.floor(1e3 / o) : 5;
    }, p.unstable_getCurrentPriorityLevel = function() {
      return L;
    }, p.unstable_next = function(o) {
      switch (L) {
        case 1:
        case 2:
        case 3:
          var T = 3;
          break;
        default:
          T = L;
      }
      var q = L;
      L = T;
      try {
        return o();
      } finally {
        L = q;
      }
    }, p.unstable_requestPaint = function() {
      ul = !0;
    }, p.unstable_runWithPriority = function(o, T) {
      switch (o) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          o = 3;
      }
      var q = L;
      L = o;
      try {
        return T();
      } finally {
        L = q;
      }
    }, p.unstable_scheduleCallback = function(o, T, q) {
      var F = p.unstable_now();
      switch (typeof q == "object" && q !== null ? (q = q.delay, q = typeof q == "number" && 0 < q ? F + q : F) : q = F, o) {
        case 1:
          var cl = -1;
          break;
        case 2:
          cl = 250;
          break;
        case 5:
          cl = 1073741823;
          break;
        case 4:
          cl = 1e4;
          break;
        default:
          cl = 5e3;
      }
      return cl = q + cl, o = {
        id: N++,
        callback: T,
        priorityLevel: o,
        startTime: q,
        expirationTime: cl,
        sortIndex: -1
      }, q > F ? (o.sortIndex = q, $(x, o), O(z) === null && o === O(x) && (D ? (Gl(w), w = -1) : D = !0, Fl(Bl, q - F))) : (o.sortIndex = cl, $(z, o), B || xl || (B = !0, zl || (zl = !0, pl()))), o;
    }, p.unstable_shouldYield = ql, p.unstable_wrapCallback = function(o) {
      var T = L;
      return function() {
        var q = L;
        L = T;
        try {
          return o.apply(this, arguments);
        } finally {
          L = q;
        }
      };
    };
  })(rs)), rs;
}
var Eo;
function ov() {
  return Eo || (Eo = 1, fs.exports = dv()), fs.exports;
}
var ds = { exports: {} }, kl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ao;
function hv() {
  if (Ao) return kl;
  Ao = 1;
  var p = ms();
  function $(z) {
    var x = "https://react.dev/errors/" + z;
    if (1 < arguments.length) {
      x += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var N = 2; N < arguments.length; N++)
        x += "&args[]=" + encodeURIComponent(arguments[N]);
    }
    return "Minified React error #" + z + "; visit " + x + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function O() {
  }
  var m = {
    d: {
      f: O,
      r: function() {
        throw Error($(522));
      },
      D: O,
      C: O,
      L: O,
      m: O,
      X: O,
      S: O,
      M: O
    },
    p: 0,
    findDOMNode: null
  }, R = Symbol.for("react.portal");
  function W(z, x, N) {
    var M = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: R,
      key: M == null ? null : "" + M,
      children: z,
      containerInfo: x,
      implementation: N
    };
  }
  var V = p.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function tl(z, x) {
    if (z === "font") return "";
    if (typeof x == "string")
      return x === "use-credentials" ? x : "";
  }
  return kl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = m, kl.createPortal = function(z, x) {
    var N = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!x || x.nodeType !== 1 && x.nodeType !== 9 && x.nodeType !== 11)
      throw Error($(299));
    return W(z, x, null, N);
  }, kl.flushSync = function(z) {
    var x = V.T, N = m.p;
    try {
      if (V.T = null, m.p = 2, z) return z();
    } finally {
      V.T = x, m.p = N, m.d.f();
    }
  }, kl.preconnect = function(z, x) {
    typeof z == "string" && (x ? (x = x.crossOrigin, x = typeof x == "string" ? x === "use-credentials" ? x : "" : void 0) : x = null, m.d.C(z, x));
  }, kl.prefetchDNS = function(z) {
    typeof z == "string" && m.d.D(z);
  }, kl.preinit = function(z, x) {
    if (typeof z == "string" && x && typeof x.as == "string") {
      var N = x.as, M = tl(N, x.crossOrigin), L = typeof x.integrity == "string" ? x.integrity : void 0, xl = typeof x.fetchPriority == "string" ? x.fetchPriority : void 0;
      N === "style" ? m.d.S(
        z,
        typeof x.precedence == "string" ? x.precedence : void 0,
        {
          crossOrigin: M,
          integrity: L,
          fetchPriority: xl
        }
      ) : N === "script" && m.d.X(z, {
        crossOrigin: M,
        integrity: L,
        fetchPriority: xl,
        nonce: typeof x.nonce == "string" ? x.nonce : void 0
      });
    }
  }, kl.preinitModule = function(z, x) {
    if (typeof z == "string")
      if (typeof x == "object" && x !== null) {
        if (x.as == null || x.as === "script") {
          var N = tl(
            x.as,
            x.crossOrigin
          );
          m.d.M(z, {
            crossOrigin: N,
            integrity: typeof x.integrity == "string" ? x.integrity : void 0,
            nonce: typeof x.nonce == "string" ? x.nonce : void 0
          });
        }
      } else x == null && m.d.M(z);
  }, kl.preload = function(z, x) {
    if (typeof z == "string" && typeof x == "object" && x !== null && typeof x.as == "string") {
      var N = x.as, M = tl(N, x.crossOrigin);
      m.d.L(z, N, {
        crossOrigin: M,
        integrity: typeof x.integrity == "string" ? x.integrity : void 0,
        nonce: typeof x.nonce == "string" ? x.nonce : void 0,
        type: typeof x.type == "string" ? x.type : void 0,
        fetchPriority: typeof x.fetchPriority == "string" ? x.fetchPriority : void 0,
        referrerPolicy: typeof x.referrerPolicy == "string" ? x.referrerPolicy : void 0,
        imageSrcSet: typeof x.imageSrcSet == "string" ? x.imageSrcSet : void 0,
        imageSizes: typeof x.imageSizes == "string" ? x.imageSizes : void 0,
        media: typeof x.media == "string" ? x.media : void 0
      });
    }
  }, kl.preloadModule = function(z, x) {
    if (typeof z == "string")
      if (x) {
        var N = tl(x.as, x.crossOrigin);
        m.d.m(z, {
          as: typeof x.as == "string" && x.as !== "script" ? x.as : void 0,
          crossOrigin: N,
          integrity: typeof x.integrity == "string" ? x.integrity : void 0
        });
      } else m.d.m(z);
  }, kl.requestFormReset = function(z) {
    m.d.r(z);
  }, kl.unstable_batchedUpdates = function(z, x) {
    return z(x);
  }, kl.useFormState = function(z, x, N) {
    return V.H.useFormState(z, x, N);
  }, kl.useFormStatus = function() {
    return V.H.useHostTransitionStatus();
  }, kl.version = "19.2.8", kl;
}
var To;
function mv() {
  if (To) return ds.exports;
  To = 1;
  function p() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(p);
      } catch ($) {
        console.error($);
      }
  }
  return p(), ds.exports = hv(), ds.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zo;
function vv() {
  if (zo) return xn;
  zo = 1;
  var p = ov(), $ = ms(), O = mv();
  function m(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function R(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function W(l) {
    var t = l, e = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do
        t = l, (t.flags & 4098) !== 0 && (e = t.return), l = t.return;
      while (l);
    }
    return t.tag === 3 ? e : null;
  }
  function V(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function tl(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function z(l) {
    if (W(l) !== l)
      throw Error(m(188));
  }
  function x(l) {
    var t = l.alternate;
    if (!t) {
      if (t = W(l), t === null) throw Error(m(188));
      return t !== l ? null : l;
    }
    for (var e = l, a = t; ; ) {
      var n = e.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (a = n.return, a !== null) {
          e = a;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === e) return z(n), l;
          if (u === a) return z(n), t;
          u = u.sibling;
        }
        throw Error(m(188));
      }
      if (e.return !== a.return) e = n, a = u;
      else {
        for (var i = !1, s = n.child; s; ) {
          if (s === e) {
            i = !0, e = n, a = u;
            break;
          }
          if (s === a) {
            i = !0, a = n, e = u;
            break;
          }
          s = s.sibling;
        }
        if (!i) {
          for (s = u.child; s; ) {
            if (s === e) {
              i = !0, e = u, a = n;
              break;
            }
            if (s === a) {
              i = !0, a = u, e = n;
              break;
            }
            s = s.sibling;
          }
          if (!i) throw Error(m(189));
        }
      }
      if (e.alternate !== a) throw Error(m(190));
    }
    if (e.tag !== 3) throw Error(m(188));
    return e.stateNode.current === e ? l : t;
  }
  function N(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = N(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  var M = Object.assign, L = Symbol.for("react.element"), xl = Symbol.for("react.transitional.element"), B = Symbol.for("react.portal"), D = Symbol.for("react.fragment"), ul = Symbol.for("react.strict_mode"), il = Symbol.for("react.profiler"), Gl = Symbol.for("react.consumer"), El = Symbol.for("react.context"), Ll = Symbol.for("react.forward_ref"), Bl = Symbol.for("react.suspense"), zl = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), Q = Symbol.for("react.lazy"), dl = Symbol.for("react.activity"), ql = Symbol.for("react.memo_cache_sentinel"), Al = Symbol.iterator;
  function pl(l) {
    return l === null || typeof l != "object" ? null : (l = Al && l[Al] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Ot = Symbol.for("react.client.reference");
  function vt(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === Ot ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case D:
        return "Fragment";
      case il:
        return "Profiler";
      case ul:
        return "StrictMode";
      case Bl:
        return "Suspense";
      case zl:
        return "SuspenseList";
      case dl:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case B:
          return "Portal";
        case El:
          return l.displayName || "Context";
        case Gl:
          return (l._context.displayName || "Context") + ".Consumer";
        case Ll:
          var t = l.render;
          return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case w:
          return t = l.displayName || null, t !== null ? t : vt(l.type) || "Memo";
        case Q:
          t = l._payload, l = l._init;
          try {
            return vt(l(t));
          } catch {
          }
      }
    return null;
  }
  var Fl = Array.isArray, o = $.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, T = O.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, F = [], cl = -1;
  function d(l) {
    return { current: l };
  }
  function E(l) {
    0 > cl || (l.current = F[cl], F[cl] = null, cl--);
  }
  function _(l, t) {
    cl++, F[cl] = l.current, l.current = t;
  }
  var U = d(null), K = d(null), I = d(null), ol = d(null);
  function $l(l, t) {
    switch (_(I, t), _(K, l), _(U, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Ld(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = Ld(t), l = Qd(t, l);
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    E(U), _(U, l);
  }
  function Ol() {
    E(U), E(K), E(I);
  }
  function Na(l) {
    l.memoizedState !== null && _(ol, l);
    var t = U.current, e = Qd(t, l.type);
    t !== e && (_(K, l), _(U, e));
  }
  function En(l) {
    K.current === l && (E(U), E(K)), ol.current === l && (E(ol), gn._currentValue = q);
  }
  var Xu, vs;
  function Ee(l) {
    if (Xu === void 0)
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        Xu = t && t[1] || "", vs = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Xu + l + vs;
  }
  var Zu = !1;
  function Vu(l, t) {
    if (!l || Zu) return "";
    Zu = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var A = function() {
                throw Error();
              };
              if (Object.defineProperty(A.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(A, []);
                } catch (b) {
                  var g = b;
                }
                Reflect.construct(l, [], A);
              } else {
                try {
                  A.call();
                } catch (b) {
                  g = b;
                }
                l.call(A.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (b) {
                g = b;
              }
              (A = l()) && typeof A.catch == "function" && A.catch(function() {
              });
            }
          } catch (b) {
            if (b && g && typeof b.stack == "string")
              return [b.stack, g.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      n && n.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = a.DetermineComponentFrameRoot(), i = u[0], s = u[1];
      if (i && s) {
        var f = i.split(`
`), y = s.split(`
`);
        for (n = a = 0; a < f.length && !f[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < y.length && !y[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === f.length || n === y.length)
          for (a = f.length - 1, n = y.length - 1; 1 <= a && 0 <= n && f[a] !== y[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (f[a] !== y[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || f[a] !== y[n]) {
                  var S = `
` + f[a].replace(" at new ", " at ");
                  return l.displayName && S.includes("<anonymous>") && (S = S.replace("<anonymous>", l.displayName)), S;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      Zu = !1, Error.prepareStackTrace = e;
    }
    return (e = l ? l.displayName || l.name : "") ? Ee(e) : "";
  }
  function qo(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Ee(l.type);
      case 16:
        return Ee("Lazy");
      case 13:
        return l.child !== t && t !== null ? Ee("Suspense Fallback") : Ee("Suspense");
      case 19:
        return Ee("SuspenseList");
      case 0:
      case 15:
        return Vu(l.type, !1);
      case 11:
        return Vu(l.type.render, !1);
      case 1:
        return Vu(l.type, !0);
      case 31:
        return Ee("Activity");
      default:
        return "";
    }
  }
  function ys(l) {
    try {
      var t = "", e = null;
      do
        t += qo(l, e), e = l, l = l.return;
      while (l);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Ku = Object.prototype.hasOwnProperty, Ju = p.unstable_scheduleCallback, wu = p.unstable_cancelCallback, Yo = p.unstable_shouldYield, Go = p.unstable_requestPaint, ut = p.unstable_now, Lo = p.unstable_getCurrentPriorityLevel, gs = p.unstable_ImmediatePriority, bs = p.unstable_UserBlockingPriority, An = p.unstable_NormalPriority, Qo = p.unstable_LowPriority, ps = p.unstable_IdlePriority, Xo = p.log, Zo = p.unstable_setDisableYieldValue, _a = null, it = null;
  function It(l) {
    if (typeof Xo == "function" && Zo(l), it && typeof it.setStrictMode == "function")
      try {
        it.setStrictMode(_a, l);
      } catch {
      }
  }
  var ct = Math.clz32 ? Math.clz32 : Jo, Vo = Math.log, Ko = Math.LN2;
  function Jo(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (Vo(l) / Ko | 0) | 0;
  }
  var Tn = 256, zn = 262144, Nn = 4194304;
  function Ae(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function _n(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = l.suspendedLanes, i = l.pingedLanes;
    l = l.warmLanes;
    var s = a & 134217727;
    return s !== 0 ? (a = s & ~u, a !== 0 ? n = Ae(a) : (i &= s, i !== 0 ? n = Ae(i) : e || (e = s & ~l, e !== 0 && (n = Ae(e))))) : (s = a & ~u, s !== 0 ? n = Ae(s) : i !== 0 ? n = Ae(i) : e || (e = a & ~l, e !== 0 && (n = Ae(e)))), n === 0 ? 0 : t !== 0 && t !== n && (t & u) === 0 && (u = n & -n, e = t & -t, u >= e || u === 32 && (e & 4194048) !== 0) ? t : n;
  }
  function Oa(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function wo(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Ss() {
    var l = Nn;
    return Nn <<= 1, (Nn & 62914560) === 0 && (Nn = 4194304), l;
  }
  function ku(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function Ma(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function ko(l, t, e, a, n, u) {
    var i = l.pendingLanes;
    l.pendingLanes = e, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= e, l.entangledLanes &= e, l.errorRecoveryDisabledLanes &= e, l.shellSuspendCounter = 0;
    var s = l.entanglements, f = l.expirationTimes, y = l.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var S = 31 - ct(e), A = 1 << S;
      s[S] = 0, f[S] = -1;
      var g = y[S];
      if (g !== null)
        for (y[S] = null, S = 0; S < g.length; S++) {
          var b = g[S];
          b !== null && (b.lane &= -536870913);
        }
      e &= ~A;
    }
    a !== 0 && js(l, a, 0), u !== 0 && n === 0 && l.tag !== 0 && (l.suspendedLanes |= u & ~(i & ~t));
  }
  function js(l, t, e) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - ct(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | e & 261930;
  }
  function xs(l, t) {
    var e = l.entangledLanes |= t;
    for (l = l.entanglements; e; ) {
      var a = 31 - ct(e), n = 1 << a;
      n & t | l[a] & t && (l[a] |= t), e &= ~n;
    }
  }
  function Es(l, t) {
    var e = t & -t;
    return e = (e & 42) !== 0 ? 1 : $u(e), (e & (l.suspendedLanes | t)) !== 0 ? 0 : e;
  }
  function $u(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function Wu(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function As() {
    var l = T.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : ro(l.type));
  }
  function Ts(l, t) {
    var e = T.p;
    try {
      return T.p = l, t();
    } finally {
      T.p = e;
    }
  }
  var Pt = Math.random().toString(36).slice(2), Zl = "__reactFiber$" + Pt, Il = "__reactProps$" + Pt, Ze = "__reactContainer$" + Pt, Fu = "__reactEvents$" + Pt, $o = "__reactListeners$" + Pt, Wo = "__reactHandles$" + Pt, zs = "__reactResources$" + Pt, Ca = "__reactMarker$" + Pt;
  function Iu(l) {
    delete l[Zl], delete l[Il], delete l[Fu], delete l[$o], delete l[Wo];
  }
  function Ve(l) {
    var t = l[Zl];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if (t = e[Ze] || e[Zl]) {
        if (e = t.alternate, t.child !== null || e !== null && e.child !== null)
          for (l = kd(l); l !== null; ) {
            if (e = l[Zl]) return e;
            l = kd(l);
          }
        return t;
      }
      l = e, e = l.parentNode;
    }
    return null;
  }
  function Ke(l) {
    if (l = l[Zl] || l[Ze]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function Da(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(m(33));
  }
  function Je(l) {
    var t = l[zs];
    return t || (t = l[zs] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Ql(l) {
    l[Ca] = !0;
  }
  var Ns = /* @__PURE__ */ new Set(), _s = {};
  function Te(l, t) {
    we(l, t), we(l + "Capture", t);
  }
  function we(l, t) {
    for (_s[l] = t, l = 0; l < t.length; l++)
      Ns.add(t[l]);
  }
  var Fo = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Os = {}, Ms = {};
  function Io(l) {
    return Ku.call(Ms, l) ? !0 : Ku.call(Os, l) ? !1 : Fo.test(l) ? Ms[l] = !0 : (Os[l] = !0, !1);
  }
  function On(l, t, e) {
    if (Io(t))
      if (e === null) l.removeAttribute(t);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, "" + e);
      }
  }
  function Mn(l, t, e) {
    if (e === null) l.removeAttribute(t);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + e);
    }
  }
  function Rt(l, t, e, a) {
    if (a === null) l.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(e);
          return;
      }
      l.setAttributeNS(t, e, "" + a);
    }
  }
  function yt(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function Cs(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Po(l, t, e) {
    var a = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      t
    );
    if (!l.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, u = a.set;
      return Object.defineProperty(l, t, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(i) {
          e = "" + i, u.call(this, i);
        }
      }), Object.defineProperty(l, t, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return e;
        },
        setValue: function(i) {
          e = "" + i;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[t];
        }
      };
    }
  }
  function Pu(l) {
    if (!l._valueTracker) {
      var t = Cs(l) ? "checked" : "value";
      l._valueTracker = Po(
        l,
        t,
        "" + l[t]
      );
    }
  }
  function Ds(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var e = t.getValue(), a = "";
    return l && (a = Cs(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== e ? (t.setValue(l), !0) : !1;
  }
  function Cn(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var lh = /[\n"\\]/g;
  function gt(l) {
    return l.replace(
      lh,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function li(l, t, e, a, n, u, i, s) {
    l.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.type = i : l.removeAttribute("type"), t != null ? i === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + yt(t)) : l.value !== "" + yt(t) && (l.value = "" + yt(t)) : i !== "submit" && i !== "reset" || l.removeAttribute("value"), t != null ? ti(l, i, yt(t)) : e != null ? ti(l, i, yt(e)) : a != null && l.removeAttribute("value"), n == null && u != null && (l.defaultChecked = !!u), n != null && (l.checked = n && typeof n != "function" && typeof n != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? l.name = "" + yt(s) : l.removeAttribute("name");
  }
  function Us(l, t, e, a, n, u, i, s) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (l.type = u), t != null || e != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        Pu(l);
        return;
      }
      e = e != null ? "" + yt(e) : "", t = t != null ? "" + yt(t) : e, s || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = s ? l.checked : !!a, l.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (l.name = i), Pu(l);
  }
  function ti(l, t, e) {
    t === "number" && Cn(l.ownerDocument) === l || l.defaultValue === "" + e || (l.defaultValue = "" + e);
  }
  function ke(l, t, e, a) {
    if (l = l.options, t) {
      t = {};
      for (var n = 0; n < e.length; n++)
        t["$" + e[n]] = !0;
      for (e = 0; e < l.length; e++)
        n = t.hasOwnProperty("$" + l[e].value), l[e].selected !== n && (l[e].selected = n), n && a && (l[e].defaultSelected = !0);
    } else {
      for (e = "" + yt(e), t = null, n = 0; n < l.length; n++) {
        if (l[n].value === e) {
          l[n].selected = !0, a && (l[n].defaultSelected = !0);
          return;
        }
        t !== null || l[n].disabled || (t = l[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Rs(l, t, e) {
    if (t != null && (t = "" + yt(t), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + yt(e) : "";
  }
  function Hs(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(m(92));
        if (Fl(a)) {
          if (1 < a.length) throw Error(m(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), t = e;
    }
    e = yt(t), l.defaultValue = e, a = l.textContent, a === e && a !== "" && a !== null && (l.value = a), Pu(l);
  }
  function $e(l, t) {
    if (t) {
      var e = l.firstChild;
      if (e && e === l.lastChild && e.nodeType === 3) {
        e.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var th = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Bs(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, e) : typeof e != "number" || e === 0 || th.has(t) ? t === "float" ? l.cssFloat = e : l[t] = ("" + e).trim() : l[t] = e + "px";
  }
  function qs(l, t, e) {
    if (t != null && typeof t != "object")
      throw Error(m(62));
    if (l = l.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var n in t)
        a = t[n], t.hasOwnProperty(n) && e[n] !== a && Bs(l, n, a);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && Bs(l, u, t[u]);
  }
  function ei(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var eh = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), ah = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Dn(l) {
    return ah.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function Ht() {
  }
  var ai = null;
  function ni(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var We = null, Fe = null;
  function Ys(l) {
    var t = Ke(l);
    if (t && (l = t.stateNode)) {
      var e = l[Il] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (li(
            l,
            e.value,
            e.defaultValue,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name
          ), t = e.name, e.type === "radio" && t != null) {
            for (e = l; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll(
              'input[name="' + gt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < e.length; t++) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var n = a[Il] || null;
                if (!n) throw Error(m(90));
                li(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                );
              }
            }
            for (t = 0; t < e.length; t++)
              a = e[t], a.form === l.form && Ds(a);
          }
          break l;
        case "textarea":
          Rs(l, e.value, e.defaultValue);
          break l;
        case "select":
          t = e.value, t != null && ke(l, !!e.multiple, t, !1);
      }
    }
  }
  var ui = !1;
  function Gs(l, t, e) {
    if (ui) return l(t, e);
    ui = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (ui = !1, (We !== null || Fe !== null) && (pu(), We && (t = We, l = Fe, Fe = We = null, Ys(t), l)))
        for (t = 0; t < l.length; t++) Ys(l[t]);
    }
  }
  function Ua(l, t) {
    var e = l.stateNode;
    if (e === null) return null;
    var a = e[Il] || null;
    if (a === null) return null;
    e = a[t];
    l: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) || (l = l.type, a = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !a;
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (e && typeof e != "function")
      throw Error(
        m(231, t, typeof e)
      );
    return e;
  }
  var Bt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ii = !1;
  if (Bt)
    try {
      var Ra = {};
      Object.defineProperty(Ra, "passive", {
        get: function() {
          ii = !0;
        }
      }), window.addEventListener("test", Ra, Ra), window.removeEventListener("test", Ra, Ra);
    } catch {
      ii = !1;
    }
  var le = null, ci = null, Un = null;
  function Ls() {
    if (Un) return Un;
    var l, t = ci, e = t.length, a, n = "value" in le ? le.value : le.textContent, u = n.length;
    for (l = 0; l < e && t[l] === n[l]; l++) ;
    var i = e - l;
    for (a = 1; a <= i && t[e - a] === n[u - a]; a++) ;
    return Un = n.slice(l, 1 < a ? 1 - a : void 0);
  }
  function Rn(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Hn() {
    return !0;
  }
  function Qs() {
    return !1;
  }
  function Pl(l) {
    function t(e, a, n, u, i) {
      this._reactName = e, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var s in l)
        l.hasOwnProperty(s) && (e = l[s], this[s] = e ? e(u) : u[s]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Hn : Qs, this.isPropagationStopped = Qs, this;
    }
    return M(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Hn);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Hn);
      },
      persist: function() {
      },
      isPersistent: Hn
    }), t;
  }
  var ze = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Bn = Pl(ze), Ha = M({}, ze, { view: 0, detail: 0 }), nh = Pl(Ha), si, fi, Ba, qn = M({}, Ha, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: di,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== Ba && (Ba && l.type === "mousemove" ? (si = l.screenX - Ba.screenX, fi = l.screenY - Ba.screenY) : fi = si = 0, Ba = l), si);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : fi;
    }
  }), Xs = Pl(qn), uh = M({}, qn, { dataTransfer: 0 }), ih = Pl(uh), ch = M({}, Ha, { relatedTarget: 0 }), ri = Pl(ch), sh = M({}, ze, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), fh = Pl(sh), rh = M({}, ze, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), dh = Pl(rh), oh = M({}, ze, { data: 0 }), Zs = Pl(oh), hh = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, mh = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, vh = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function yh(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = vh[l]) ? !!t[l] : !1;
  }
  function di() {
    return yh;
  }
  var gh = M({}, Ha, {
    key: function(l) {
      if (l.key) {
        var t = hh[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = Rn(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? mh[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: di,
    charCode: function(l) {
      return l.type === "keypress" ? Rn(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? Rn(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), bh = Pl(gh), ph = M({}, qn, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Vs = Pl(ph), Sh = M({}, Ha, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: di
  }), jh = Pl(Sh), xh = M({}, ze, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Eh = Pl(xh), Ah = M({}, qn, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Th = Pl(Ah), zh = M({}, ze, {
    newState: 0,
    oldState: 0
  }), Nh = Pl(zh), _h = [9, 13, 27, 32], oi = Bt && "CompositionEvent" in window, qa = null;
  Bt && "documentMode" in document && (qa = document.documentMode);
  var Oh = Bt && "TextEvent" in window && !qa, Ks = Bt && (!oi || qa && 8 < qa && 11 >= qa), Js = " ", ws = !1;
  function ks(l, t) {
    switch (l) {
      case "keyup":
        return _h.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function $s(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Ie = !1;
  function Mh(l, t) {
    switch (l) {
      case "compositionend":
        return $s(t);
      case "keypress":
        return t.which !== 32 ? null : (ws = !0, Js);
      case "textInput":
        return l = t.data, l === Js && ws ? null : l;
      default:
        return null;
    }
  }
  function Ch(l, t) {
    if (Ie)
      return l === "compositionend" || !oi && ks(l, t) ? (l = Ls(), Un = ci = le = null, Ie = !1, l) : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Ks && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Dh = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Ws(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Dh[l.type] : t === "textarea";
  }
  function Fs(l, t, e, a) {
    We ? Fe ? Fe.push(a) : Fe = [a] : We = a, t = zu(t, "onChange"), 0 < t.length && (e = new Bn(
      "onChange",
      "change",
      null,
      e,
      a
    ), l.push({ event: e, listeners: t }));
  }
  var Ya = null, Ga = null;
  function Uh(l) {
    Rd(l, 0);
  }
  function Yn(l) {
    var t = Da(l);
    if (Ds(t)) return l;
  }
  function Is(l, t) {
    if (l === "change") return t;
  }
  var Ps = !1;
  if (Bt) {
    var hi;
    if (Bt) {
      var mi = "oninput" in document;
      if (!mi) {
        var lf = document.createElement("div");
        lf.setAttribute("oninput", "return;"), mi = typeof lf.oninput == "function";
      }
      hi = mi;
    } else hi = !1;
    Ps = hi && (!document.documentMode || 9 < document.documentMode);
  }
  function tf() {
    Ya && (Ya.detachEvent("onpropertychange", ef), Ga = Ya = null);
  }
  function ef(l) {
    if (l.propertyName === "value" && Yn(Ga)) {
      var t = [];
      Fs(
        t,
        Ga,
        l,
        ni(l)
      ), Gs(Uh, t);
    }
  }
  function Rh(l, t, e) {
    l === "focusin" ? (tf(), Ya = t, Ga = e, Ya.attachEvent("onpropertychange", ef)) : l === "focusout" && tf();
  }
  function Hh(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Yn(Ga);
  }
  function Bh(l, t) {
    if (l === "click") return Yn(t);
  }
  function qh(l, t) {
    if (l === "input" || l === "change")
      return Yn(t);
  }
  function Yh(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var st = typeof Object.is == "function" ? Object.is : Yh;
  function La(l, t) {
    if (st(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var e = Object.keys(l), a = Object.keys(t);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var n = e[a];
      if (!Ku.call(t, n) || !st(l[n], t[n]))
        return !1;
    }
    return !0;
  }
  function af(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function nf(l, t) {
    var e = af(l);
    l = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (a = l + e.textContent.length, l <= t && a >= t)
          return { node: e, offset: t - l };
        l = a;
      }
      l: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break l;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = af(e);
    }
  }
  function uf(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? uf(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function cf(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = Cn(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) l = t.contentWindow;
      else break;
      t = Cn(l.document);
    }
    return t;
  }
  function vi(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var Gh = Bt && "documentMode" in document && 11 >= document.documentMode, Pe = null, yi = null, Qa = null, gi = !1;
  function sf(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    gi || Pe == null || Pe !== Cn(a) || (a = Pe, "selectionStart" in a && vi(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Qa && La(Qa, a) || (Qa = a, a = zu(yi, "onSelect"), 0 < a.length && (t = new Bn(
      "onSelect",
      "select",
      null,
      t,
      e
    ), l.push({ event: t, listeners: a }), t.target = Pe)));
  }
  function Ne(l, t) {
    var e = {};
    return e[l.toLowerCase()] = t.toLowerCase(), e["Webkit" + l] = "webkit" + t, e["Moz" + l] = "moz" + t, e;
  }
  var la = {
    animationend: Ne("Animation", "AnimationEnd"),
    animationiteration: Ne("Animation", "AnimationIteration"),
    animationstart: Ne("Animation", "AnimationStart"),
    transitionrun: Ne("Transition", "TransitionRun"),
    transitionstart: Ne("Transition", "TransitionStart"),
    transitioncancel: Ne("Transition", "TransitionCancel"),
    transitionend: Ne("Transition", "TransitionEnd")
  }, bi = {}, ff = {};
  Bt && (ff = document.createElement("div").style, "AnimationEvent" in window || (delete la.animationend.animation, delete la.animationiteration.animation, delete la.animationstart.animation), "TransitionEvent" in window || delete la.transitionend.transition);
  function _e(l) {
    if (bi[l]) return bi[l];
    if (!la[l]) return l;
    var t = la[l], e;
    for (e in t)
      if (t.hasOwnProperty(e) && e in ff)
        return bi[l] = t[e];
    return l;
  }
  var rf = _e("animationend"), df = _e("animationiteration"), of = _e("animationstart"), Lh = _e("transitionrun"), Qh = _e("transitionstart"), Xh = _e("transitioncancel"), hf = _e("transitionend"), mf = /* @__PURE__ */ new Map(), pi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  pi.push("scrollEnd");
  function zt(l, t) {
    mf.set(l, t), Te(t, [l]);
  }
  var Gn = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  }, bt = [], ta = 0, Si = 0;
  function Ln() {
    for (var l = ta, t = Si = ta = 0; t < l; ) {
      var e = bt[t];
      bt[t++] = null;
      var a = bt[t];
      bt[t++] = null;
      var n = bt[t];
      bt[t++] = null;
      var u = bt[t];
      if (bt[t++] = null, a !== null && n !== null) {
        var i = a.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
      }
      u !== 0 && vf(e, n, u);
    }
  }
  function Qn(l, t, e, a) {
    bt[ta++] = l, bt[ta++] = t, bt[ta++] = e, bt[ta++] = a, Si |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function ji(l, t, e, a) {
    return Qn(l, t, e, a), Xn(l);
  }
  function Oe(l, t) {
    return Qn(l, null, null, t), Xn(l);
  }
  function vf(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var n = !1, u = l.return; u !== null; )
      u.childLanes |= e, a = u.alternate, a !== null && (a.childLanes |= e), u.tag === 22 && (l = u.stateNode, l === null || l._visibility & 1 || (n = !0)), l = u, u = u.return;
    return l.tag === 3 ? (u = l.stateNode, n && t !== null && (n = 31 - ct(e), l = u.hiddenUpdates, a = l[n], a === null ? l[n] = [t] : a.push(t), t.lane = e | 536870912), u) : null;
  }
  function Xn(l) {
    if (50 < rn)
      throw rn = 0, Mc = null, Error(m(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ea = {};
  function Zh(l, t, e, a) {
    this.tag = l, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ft(l, t, e, a) {
    return new Zh(l, t, e, a);
  }
  function xi(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function qt(l, t) {
    var e = l.alternate;
    return e === null ? (e = ft(
      l.tag,
      t,
      l.key,
      l.mode
    ), e.elementType = l.elementType, e.type = l.type, e.stateNode = l.stateNode, e.alternate = l, l.alternate = e) : (e.pendingProps = t, e.type = l.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = l.flags & 65011712, e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, t = l.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, e.sibling = l.sibling, e.index = l.index, e.ref = l.ref, e.refCleanup = l.refCleanup, e;
  }
  function yf(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return e === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, l.type = e.type, t = e.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function Zn(l, t, e, a, n, u) {
    var i = 0;
    if (a = l, typeof l == "function") xi(l) && (i = 1);
    else if (typeof l == "string")
      i = km(
        l,
        e,
        U.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (l) {
        case dl:
          return l = ft(31, e, t, n), l.elementType = dl, l.lanes = u, l;
        case D:
          return Me(e.children, n, u, t);
        case ul:
          i = 8, n |= 24;
          break;
        case il:
          return l = ft(12, e, t, n | 2), l.elementType = il, l.lanes = u, l;
        case Bl:
          return l = ft(13, e, t, n), l.elementType = Bl, l.lanes = u, l;
        case zl:
          return l = ft(19, e, t, n), l.elementType = zl, l.lanes = u, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case El:
                i = 10;
                break l;
              case Gl:
                i = 9;
                break l;
              case Ll:
                i = 11;
                break l;
              case w:
                i = 14;
                break l;
              case Q:
                i = 16, a = null;
                break l;
            }
          i = 29, e = Error(
            m(130, l === null ? "null" : typeof l, "")
          ), a = null;
      }
    return t = ft(i, e, t, n), t.elementType = l, t.type = a, t.lanes = u, t;
  }
  function Me(l, t, e, a) {
    return l = ft(7, l, a, t), l.lanes = e, l;
  }
  function Ei(l, t, e) {
    return l = ft(6, l, null, t), l.lanes = e, l;
  }
  function gf(l) {
    var t = ft(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function Ai(l, t, e) {
    return t = ft(
      4,
      l.children !== null ? l.children : [],
      l.key,
      t
    ), t.lanes = e, t.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, t;
  }
  var bf = /* @__PURE__ */ new WeakMap();
  function pt(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = bf.get(l);
      return e !== void 0 ? e : (t = {
        value: l,
        source: t,
        stack: ys(t)
      }, bf.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: ys(t)
    };
  }
  var aa = [], na = 0, Vn = null, Xa = 0, St = [], jt = 0, te = null, Mt = 1, Ct = "";
  function Yt(l, t) {
    aa[na++] = Xa, aa[na++] = Vn, Vn = l, Xa = t;
  }
  function pf(l, t, e) {
    St[jt++] = Mt, St[jt++] = Ct, St[jt++] = te, te = l;
    var a = Mt;
    l = Ct;
    var n = 32 - ct(a) - 1;
    a &= ~(1 << n), e += 1;
    var u = 32 - ct(t) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, Mt = 1 << 32 - ct(t) + n | e << n | a, Ct = u + l;
    } else
      Mt = 1 << u | e << n | a, Ct = l;
  }
  function Ti(l) {
    l.return !== null && (Yt(l, 1), pf(l, 1, 0));
  }
  function zi(l) {
    for (; l === Vn; )
      Vn = aa[--na], aa[na] = null, Xa = aa[--na], aa[na] = null;
    for (; l === te; )
      te = St[--jt], St[jt] = null, Ct = St[--jt], St[jt] = null, Mt = St[--jt], St[jt] = null;
  }
  function Sf(l, t) {
    St[jt++] = Mt, St[jt++] = Ct, St[jt++] = te, Mt = t.id, Ct = t.overflow, te = l;
  }
  var Vl = null, Sl = null, nl = !1, ee = null, xt = !1, Ni = Error(m(519));
  function ae(l) {
    var t = Error(
      m(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Za(pt(t, l)), Ni;
  }
  function jf(l) {
    var t = l.stateNode, e = l.type, a = l.memoizedProps;
    switch (t[Zl] = l, t[Il] = a, e) {
      case "dialog":
        ll("cancel", t), ll("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        ll("load", t);
        break;
      case "video":
      case "audio":
        for (e = 0; e < on.length; e++)
          ll(on[e], t);
        break;
      case "source":
        ll("error", t);
        break;
      case "img":
      case "image":
      case "link":
        ll("error", t), ll("load", t);
        break;
      case "details":
        ll("toggle", t);
        break;
      case "input":
        ll("invalid", t), Us(
          t,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        ll("invalid", t);
        break;
      case "textarea":
        ll("invalid", t), Hs(t, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || t.textContent === "" + e || a.suppressHydrationWarning === !0 || Yd(t.textContent, e) ? (a.popover != null && (ll("beforetoggle", t), ll("toggle", t)), a.onScroll != null && ll("scroll", t), a.onScrollEnd != null && ll("scrollend", t), a.onClick != null && (t.onclick = Ht), t = !0) : t = !1, t || ae(l, !0);
  }
  function xf(l) {
    for (Vl = l.return; Vl; )
      switch (Vl.tag) {
        case 5:
        case 31:
        case 13:
          xt = !1;
          return;
        case 27:
        case 3:
          xt = !0;
          return;
        default:
          Vl = Vl.return;
      }
  }
  function ua(l) {
    if (l !== Vl) return !1;
    if (!nl) return xf(l), nl = !0, !1;
    var t = l.tag, e;
    if ((e = t !== 3 && t !== 27) && ((e = t === 5) && (e = l.type, e = !(e !== "form" && e !== "button") || Kc(l.type, l.memoizedProps)), e = !e), e && Sl && ae(l), xf(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(m(317));
      Sl = wd(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(m(317));
      Sl = wd(l);
    } else
      t === 27 ? (t = Sl, ge(l.type) ? (l = Wc, Wc = null, Sl = l) : Sl = t) : Sl = Vl ? At(l.stateNode.nextSibling) : null;
    return !0;
  }
  function Ce() {
    Sl = Vl = null, nl = !1;
  }
  function _i() {
    var l = ee;
    return l !== null && (at === null ? at = l : at.push.apply(
      at,
      l
    ), ee = null), l;
  }
  function Za(l) {
    ee === null ? ee = [l] : ee.push(l);
  }
  var Oi = d(null), De = null, Gt = null;
  function ne(l, t, e) {
    _(Oi, t._currentValue), t._currentValue = e;
  }
  function Lt(l) {
    l._currentValue = Oi.current, E(Oi);
  }
  function Mi(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === e) break;
      l = l.return;
    }
  }
  function Ci(l, t, e, a) {
    var n = l.child;
    for (n !== null && (n.return = l); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        l: for (; u !== null; ) {
          var s = u;
          u = n;
          for (var f = 0; f < t.length; f++)
            if (s.context === t[f]) {
              u.lanes |= e, s = u.alternate, s !== null && (s.lanes |= e), Mi(
                u.return,
                e,
                l
              ), a || (i = null);
              break l;
            }
          u = s.next;
        }
      } else if (n.tag === 18) {
        if (i = n.return, i === null) throw Error(m(341));
        i.lanes |= e, u = i.alternate, u !== null && (u.lanes |= e), Mi(i, e, l), i = null;
      } else i = n.child;
      if (i !== null) i.return = n;
      else
        for (i = n; i !== null; ) {
          if (i === l) {
            i = null;
            break;
          }
          if (n = i.sibling, n !== null) {
            n.return = i.return, i = n;
            break;
          }
          i = i.return;
        }
      n = i;
    }
  }
  function ia(l, t, e, a) {
    l = null;
    for (var n = t, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var i = n.alternate;
        if (i === null) throw Error(m(387));
        if (i = i.memoizedProps, i !== null) {
          var s = n.type;
          st(n.pendingProps.value, i.value) || (l !== null ? l.push(s) : l = [s]);
        }
      } else if (n === ol.current) {
        if (i = n.alternate, i === null) throw Error(m(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (l !== null ? l.push(gn) : l = [gn]);
      }
      n = n.return;
    }
    l !== null && Ci(
      t,
      l,
      e,
      a
    ), t.flags |= 262144;
  }
  function Kn(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!st(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function Ue(l) {
    De = l, Gt = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function Kl(l) {
    return Ef(De, l);
  }
  function Jn(l, t) {
    return De === null && Ue(l), Ef(l, t);
  }
  function Ef(l, t) {
    var e = t._currentValue;
    if (t = { context: t, memoizedValue: e, next: null }, Gt === null) {
      if (l === null) throw Error(m(308));
      Gt = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else Gt = Gt.next = t;
    return e;
  }
  var Vh = typeof AbortController < "u" ? AbortController : function() {
    var l = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(e, a) {
        l.push(a);
      }
    };
    this.abort = function() {
      t.aborted = !0, l.forEach(function(e) {
        return e();
      });
    };
  }, Kh = p.unstable_scheduleCallback, Jh = p.unstable_NormalPriority, Dl = {
    $$typeof: El,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Di() {
    return {
      controller: new Vh(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Va(l) {
    l.refCount--, l.refCount === 0 && Kh(Jh, function() {
      l.controller.abort();
    });
  }
  var Ka = null, Ui = 0, ca = 0, sa = null;
  function wh(l, t) {
    if (Ka === null) {
      var e = Ka = [];
      Ui = 0, ca = Bc(), sa = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return Ui++, t.then(Af, Af), t;
  }
  function Af() {
    if (--Ui === 0 && Ka !== null) {
      sa !== null && (sa.status = "fulfilled");
      var l = Ka;
      Ka = null, ca = 0, sa = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function kh(l, t) {
    var e = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        e.push(n);
      }
    };
    return l.then(
      function() {
        a.status = "fulfilled", a.value = t;
        for (var n = 0; n < e.length; n++) (0, e[n])(t);
      },
      function(n) {
        for (a.status = "rejected", a.reason = n, n = 0; n < e.length; n++)
          (0, e[n])(void 0);
      }
    ), a;
  }
  var Tf = o.S;
  o.S = function(l, t) {
    sd = ut(), typeof t == "object" && t !== null && typeof t.then == "function" && wh(l, t), Tf !== null && Tf(l, t);
  };
  var Re = d(null);
  function Ri() {
    var l = Re.current;
    return l !== null ? l : bl.pooledCache;
  }
  function wn(l, t) {
    t === null ? _(Re, Re.current) : _(Re, t.pool);
  }
  function zf() {
    var l = Ri();
    return l === null ? null : { parent: Dl._currentValue, pool: l };
  }
  var fa = Error(m(460)), Hi = Error(m(474)), kn = Error(m(542)), $n = { then: function() {
  } };
  function Nf(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function _f(l, t, e) {
    switch (e = l[e], e === void 0 ? l.push(t) : e !== t && (t.then(Ht, Ht), t = e), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, Mf(l), l;
      default:
        if (typeof t.status == "string") t.then(Ht, Ht);
        else {
          if (l = bl, l !== null && 100 < l.shellSuspendCounter)
            throw Error(m(482));
          l = t, l.status = "pending", l.then(
            function(a) {
              if (t.status === "pending") {
                var n = t;
                n.status = "fulfilled", n.value = a;
              }
            },
            function(a) {
              if (t.status === "pending") {
                var n = t;
                n.status = "rejected", n.reason = a;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw l = t.reason, Mf(l), l;
        }
        throw Be = t, fa;
    }
  }
  function He(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (Be = e, fa) : e;
    }
  }
  var Be = null;
  function Of() {
    if (Be === null) throw Error(m(459));
    var l = Be;
    return Be = null, l;
  }
  function Mf(l) {
    if (l === fa || l === kn)
      throw Error(m(483));
  }
  var ra = null, Ja = 0;
  function Wn(l) {
    var t = Ja;
    return Ja += 1, ra === null && (ra = []), _f(ra, l, t);
  }
  function wa(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function Fn(l, t) {
    throw t.$$typeof === L ? Error(m(525)) : (l = Object.prototype.toString.call(t), Error(
      m(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function Cf(l) {
    function t(h, r) {
      if (l) {
        var v = h.deletions;
        v === null ? (h.deletions = [r], h.flags |= 16) : v.push(r);
      }
    }
    function e(h, r) {
      if (!l) return null;
      for (; r !== null; )
        t(h, r), r = r.sibling;
      return null;
    }
    function a(h) {
      for (var r = /* @__PURE__ */ new Map(); h !== null; )
        h.key !== null ? r.set(h.key, h) : r.set(h.index, h), h = h.sibling;
      return r;
    }
    function n(h, r) {
      return h = qt(h, r), h.index = 0, h.sibling = null, h;
    }
    function u(h, r, v) {
      return h.index = v, l ? (v = h.alternate, v !== null ? (v = v.index, v < r ? (h.flags |= 67108866, r) : v) : (h.flags |= 67108866, r)) : (h.flags |= 1048576, r);
    }
    function i(h) {
      return l && h.alternate === null && (h.flags |= 67108866), h;
    }
    function s(h, r, v, j) {
      return r === null || r.tag !== 6 ? (r = Ei(v, h.mode, j), r.return = h, r) : (r = n(r, v), r.return = h, r);
    }
    function f(h, r, v, j) {
      var Y = v.type;
      return Y === D ? S(
        h,
        r,
        v.props.children,
        j,
        v.key
      ) : r !== null && (r.elementType === Y || typeof Y == "object" && Y !== null && Y.$$typeof === Q && He(Y) === r.type) ? (r = n(r, v.props), wa(r, v), r.return = h, r) : (r = Zn(
        v.type,
        v.key,
        v.props,
        null,
        h.mode,
        j
      ), wa(r, v), r.return = h, r);
    }
    function y(h, r, v, j) {
      return r === null || r.tag !== 4 || r.stateNode.containerInfo !== v.containerInfo || r.stateNode.implementation !== v.implementation ? (r = Ai(v, h.mode, j), r.return = h, r) : (r = n(r, v.children || []), r.return = h, r);
    }
    function S(h, r, v, j, Y) {
      return r === null || r.tag !== 7 ? (r = Me(
        v,
        h.mode,
        j,
        Y
      ), r.return = h, r) : (r = n(r, v), r.return = h, r);
    }
    function A(h, r, v) {
      if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint")
        return r = Ei(
          "" + r,
          h.mode,
          v
        ), r.return = h, r;
      if (typeof r == "object" && r !== null) {
        switch (r.$$typeof) {
          case xl:
            return v = Zn(
              r.type,
              r.key,
              r.props,
              null,
              h.mode,
              v
            ), wa(v, r), v.return = h, v;
          case B:
            return r = Ai(
              r,
              h.mode,
              v
            ), r.return = h, r;
          case Q:
            return r = He(r), A(h, r, v);
        }
        if (Fl(r) || pl(r))
          return r = Me(
            r,
            h.mode,
            v,
            null
          ), r.return = h, r;
        if (typeof r.then == "function")
          return A(h, Wn(r), v);
        if (r.$$typeof === El)
          return A(
            h,
            Jn(h, r),
            v
          );
        Fn(h, r);
      }
      return null;
    }
    function g(h, r, v, j) {
      var Y = r !== null ? r.key : null;
      if (typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint")
        return Y !== null ? null : s(h, r, "" + v, j);
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case xl:
            return v.key === Y ? f(h, r, v, j) : null;
          case B:
            return v.key === Y ? y(h, r, v, j) : null;
          case Q:
            return v = He(v), g(h, r, v, j);
        }
        if (Fl(v) || pl(v))
          return Y !== null ? null : S(h, r, v, j, null);
        if (typeof v.then == "function")
          return g(
            h,
            r,
            Wn(v),
            j
          );
        if (v.$$typeof === El)
          return g(
            h,
            r,
            Jn(h, v),
            j
          );
        Fn(h, v);
      }
      return null;
    }
    function b(h, r, v, j, Y) {
      if (typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint")
        return h = h.get(v) || null, s(r, h, "" + j, Y);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case xl:
            return h = h.get(
              j.key === null ? v : j.key
            ) || null, f(r, h, j, Y);
          case B:
            return h = h.get(
              j.key === null ? v : j.key
            ) || null, y(r, h, j, Y);
          case Q:
            return j = He(j), b(
              h,
              r,
              v,
              j,
              Y
            );
        }
        if (Fl(j) || pl(j))
          return h = h.get(v) || null, S(r, h, j, Y, null);
        if (typeof j.then == "function")
          return b(
            h,
            r,
            v,
            Wn(j),
            Y
          );
        if (j.$$typeof === El)
          return b(
            h,
            r,
            v,
            Jn(r, j),
            Y
          );
        Fn(r, j);
      }
      return null;
    }
    function C(h, r, v, j) {
      for (var Y = null, sl = null, H = r, k = r = 0, al = null; H !== null && k < v.length; k++) {
        H.index > k ? (al = H, H = null) : al = H.sibling;
        var fl = g(
          h,
          H,
          v[k],
          j
        );
        if (fl === null) {
          H === null && (H = al);
          break;
        }
        l && H && fl.alternate === null && t(h, H), r = u(fl, r, k), sl === null ? Y = fl : sl.sibling = fl, sl = fl, H = al;
      }
      if (k === v.length)
        return e(h, H), nl && Yt(h, k), Y;
      if (H === null) {
        for (; k < v.length; k++)
          H = A(h, v[k], j), H !== null && (r = u(
            H,
            r,
            k
          ), sl === null ? Y = H : sl.sibling = H, sl = H);
        return nl && Yt(h, k), Y;
      }
      for (H = a(H); k < v.length; k++)
        al = b(
          H,
          h,
          k,
          v[k],
          j
        ), al !== null && (l && al.alternate !== null && H.delete(
          al.key === null ? k : al.key
        ), r = u(
          al,
          r,
          k
        ), sl === null ? Y = al : sl.sibling = al, sl = al);
      return l && H.forEach(function(xe) {
        return t(h, xe);
      }), nl && Yt(h, k), Y;
    }
    function G(h, r, v, j) {
      if (v == null) throw Error(m(151));
      for (var Y = null, sl = null, H = r, k = r = 0, al = null, fl = v.next(); H !== null && !fl.done; k++, fl = v.next()) {
        H.index > k ? (al = H, H = null) : al = H.sibling;
        var xe = g(h, H, fl.value, j);
        if (xe === null) {
          H === null && (H = al);
          break;
        }
        l && H && xe.alternate === null && t(h, H), r = u(xe, r, k), sl === null ? Y = xe : sl.sibling = xe, sl = xe, H = al;
      }
      if (fl.done)
        return e(h, H), nl && Yt(h, k), Y;
      if (H === null) {
        for (; !fl.done; k++, fl = v.next())
          fl = A(h, fl.value, j), fl !== null && (r = u(fl, r, k), sl === null ? Y = fl : sl.sibling = fl, sl = fl);
        return nl && Yt(h, k), Y;
      }
      for (H = a(H); !fl.done; k++, fl = v.next())
        fl = b(H, h, k, fl.value, j), fl !== null && (l && fl.alternate !== null && H.delete(fl.key === null ? k : fl.key), r = u(fl, r, k), sl === null ? Y = fl : sl.sibling = fl, sl = fl);
      return l && H.forEach(function(uv) {
        return t(h, uv);
      }), nl && Yt(h, k), Y;
    }
    function gl(h, r, v, j) {
      if (typeof v == "object" && v !== null && v.type === D && v.key === null && (v = v.props.children), typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case xl:
            l: {
              for (var Y = v.key; r !== null; ) {
                if (r.key === Y) {
                  if (Y = v.type, Y === D) {
                    if (r.tag === 7) {
                      e(
                        h,
                        r.sibling
                      ), j = n(
                        r,
                        v.props.children
                      ), j.return = h, h = j;
                      break l;
                    }
                  } else if (r.elementType === Y || typeof Y == "object" && Y !== null && Y.$$typeof === Q && He(Y) === r.type) {
                    e(
                      h,
                      r.sibling
                    ), j = n(r, v.props), wa(j, v), j.return = h, h = j;
                    break l;
                  }
                  e(h, r);
                  break;
                } else t(h, r);
                r = r.sibling;
              }
              v.type === D ? (j = Me(
                v.props.children,
                h.mode,
                j,
                v.key
              ), j.return = h, h = j) : (j = Zn(
                v.type,
                v.key,
                v.props,
                null,
                h.mode,
                j
              ), wa(j, v), j.return = h, h = j);
            }
            return i(h);
          case B:
            l: {
              for (Y = v.key; r !== null; ) {
                if (r.key === Y)
                  if (r.tag === 4 && r.stateNode.containerInfo === v.containerInfo && r.stateNode.implementation === v.implementation) {
                    e(
                      h,
                      r.sibling
                    ), j = n(r, v.children || []), j.return = h, h = j;
                    break l;
                  } else {
                    e(h, r);
                    break;
                  }
                else t(h, r);
                r = r.sibling;
              }
              j = Ai(v, h.mode, j), j.return = h, h = j;
            }
            return i(h);
          case Q:
            return v = He(v), gl(
              h,
              r,
              v,
              j
            );
        }
        if (Fl(v))
          return C(
            h,
            r,
            v,
            j
          );
        if (pl(v)) {
          if (Y = pl(v), typeof Y != "function") throw Error(m(150));
          return v = Y.call(v), G(
            h,
            r,
            v,
            j
          );
        }
        if (typeof v.then == "function")
          return gl(
            h,
            r,
            Wn(v),
            j
          );
        if (v.$$typeof === El)
          return gl(
            h,
            r,
            Jn(h, v),
            j
          );
        Fn(h, v);
      }
      return typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint" ? (v = "" + v, r !== null && r.tag === 6 ? (e(h, r.sibling), j = n(r, v), j.return = h, h = j) : (e(h, r), j = Ei(v, h.mode, j), j.return = h, h = j), i(h)) : e(h, r);
    }
    return function(h, r, v, j) {
      try {
        Ja = 0;
        var Y = gl(
          h,
          r,
          v,
          j
        );
        return ra = null, Y;
      } catch (H) {
        if (H === fa || H === kn) throw H;
        var sl = ft(29, H, null, h.mode);
        return sl.lanes = j, sl.return = h, sl;
      } finally {
      }
    };
  }
  var qe = Cf(!0), Df = Cf(!1), ue = !1;
  function Bi(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function qi(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function ie(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function ce(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (rl & 2) !== 0) {
      var n = a.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), a.pending = t, t = Xn(l), vf(l, null, e), t;
    }
    return Qn(l, a, t, e), Xn(l);
  }
  function ka(l, t, e) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (e & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, xs(l, e);
    }
  }
  function Yi(l, t) {
    var e = l.updateQueue, a = l.alternate;
    if (a !== null && (a = a.updateQueue, e === a)) {
      var n = null, u = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var i = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          u === null ? n = u = i : u = u.next = i, e = e.next;
        } while (e !== null);
        u === null ? n = u = t : u = u.next = t;
      } else n = u = t;
      e = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks
      }, l.updateQueue = e;
      return;
    }
    l = e.lastBaseUpdate, l === null ? e.firstBaseUpdate = t : l.next = t, e.lastBaseUpdate = t;
  }
  var Gi = !1;
  function $a() {
    if (Gi) {
      var l = sa;
      if (l !== null) throw l;
    }
  }
  function Wa(l, t, e, a) {
    Gi = !1;
    var n = l.updateQueue;
    ue = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, s = n.shared.pending;
    if (s !== null) {
      n.shared.pending = null;
      var f = s, y = f.next;
      f.next = null, i === null ? u = y : i.next = y, i = f;
      var S = l.alternate;
      S !== null && (S = S.updateQueue, s = S.lastBaseUpdate, s !== i && (s === null ? S.firstBaseUpdate = y : s.next = y, S.lastBaseUpdate = f));
    }
    if (u !== null) {
      var A = n.baseState;
      i = 0, S = y = f = null, s = u;
      do {
        var g = s.lane & -536870913, b = g !== s.lane;
        if (b ? (el & g) === g : (a & g) === g) {
          g !== 0 && g === ca && (Gi = !0), S !== null && (S = S.next = {
            lane: 0,
            tag: s.tag,
            payload: s.payload,
            callback: null,
            next: null
          });
          l: {
            var C = l, G = s;
            g = t;
            var gl = e;
            switch (G.tag) {
              case 1:
                if (C = G.payload, typeof C == "function") {
                  A = C.call(gl, A, g);
                  break l;
                }
                A = C;
                break l;
              case 3:
                C.flags = C.flags & -65537 | 128;
              case 0:
                if (C = G.payload, g = typeof C == "function" ? C.call(gl, A, g) : C, g == null) break l;
                A = M({}, A, g);
                break l;
              case 2:
                ue = !0;
            }
          }
          g = s.callback, g !== null && (l.flags |= 64, b && (l.flags |= 8192), b = n.callbacks, b === null ? n.callbacks = [g] : b.push(g));
        } else
          b = {
            lane: g,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null
          }, S === null ? (y = S = b, f = A) : S = S.next = b, i |= g;
        if (s = s.next, s === null) {
          if (s = n.shared.pending, s === null)
            break;
          b = s, s = b.next, b.next = null, n.lastBaseUpdate = b, n.shared.pending = null;
        }
      } while (!0);
      S === null && (f = A), n.baseState = f, n.firstBaseUpdate = y, n.lastBaseUpdate = S, u === null && (n.shared.lanes = 0), oe |= i, l.lanes = i, l.memoizedState = A;
    }
  }
  function Uf(l, t) {
    if (typeof l != "function")
      throw Error(m(191, l));
    l.call(t);
  }
  function Rf(l, t) {
    var e = l.callbacks;
    if (e !== null)
      for (l.callbacks = null, l = 0; l < e.length; l++)
        Uf(e[l], t);
  }
  var da = d(null), In = d(0);
  function Hf(l, t) {
    l = $t, _(In, l), _(da, t), $t = l | t.baseLanes;
  }
  function Li() {
    _(In, $t), _(da, da.current);
  }
  function Qi() {
    $t = In.current, E(da), E(In);
  }
  var rt = d(null), Et = null;
  function se(l) {
    var t = l.alternate;
    _(Ml, Ml.current & 1), _(rt, l), Et === null && (t === null || da.current !== null || t.memoizedState !== null) && (Et = l);
  }
  function Xi(l) {
    _(Ml, Ml.current), _(rt, l), Et === null && (Et = l);
  }
  function Bf(l) {
    l.tag === 22 ? (_(Ml, Ml.current), _(rt, l), Et === null && (Et = l)) : fe();
  }
  function fe() {
    _(Ml, Ml.current), _(rt, rt.current);
  }
  function dt(l) {
    E(rt), Et === l && (Et = null), E(Ml);
  }
  var Ml = d(0);
  function Pn(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || kc(e) || $c(e)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Qt = 0, J = null, vl = null, Ul = null, lu = !1, oa = !1, Ye = !1, tu = 0, Fa = 0, ha = null, $h = 0;
  function Nl() {
    throw Error(m(321));
  }
  function Zi(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++)
      if (!st(l[e], t[e])) return !1;
    return !0;
  }
  function Vi(l, t, e, a, n, u) {
    return Qt = u, J = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, o.H = l === null || l.memoizedState === null ? pr : uc, Ye = !1, u = e(a, n), Ye = !1, oa && (u = Yf(
      t,
      e,
      a,
      n
    )), qf(l), u;
  }
  function qf(l) {
    o.H = ln;
    var t = vl !== null && vl.next !== null;
    if (Qt = 0, Ul = vl = J = null, lu = !1, Fa = 0, ha = null, t) throw Error(m(300));
    l === null || Rl || (l = l.dependencies, l !== null && Kn(l) && (Rl = !0));
  }
  function Yf(l, t, e, a) {
    J = l;
    var n = 0;
    do {
      if (oa && (ha = null), Fa = 0, oa = !1, 25 <= n) throw Error(m(301));
      if (n += 1, Ul = vl = null, l.updateQueue != null) {
        var u = l.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      o.H = Sr, u = t(e, a);
    } while (oa);
    return u;
  }
  function Wh() {
    var l = o.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? Ia(t) : t, l = l.useState()[0], (vl !== null ? vl.memoizedState : null) !== l && (J.flags |= 1024), t;
  }
  function Ki() {
    var l = tu !== 0;
    return tu = 0, l;
  }
  function Ji(l, t, e) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~e;
  }
  function wi(l) {
    if (lu) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      lu = !1;
    }
    Qt = 0, Ul = vl = J = null, oa = !1, Fa = tu = 0, ha = null;
  }
  function Wl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ul === null ? J.memoizedState = Ul = l : Ul = Ul.next = l, Ul;
  }
  function Cl() {
    if (vl === null) {
      var l = J.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = vl.next;
    var t = Ul === null ? J.memoizedState : Ul.next;
    if (t !== null)
      Ul = t, vl = l;
    else {
      if (l === null)
        throw J.alternate === null ? Error(m(467)) : Error(m(310));
      vl = l, l = {
        memoizedState: vl.memoizedState,
        baseState: vl.baseState,
        baseQueue: vl.baseQueue,
        queue: vl.queue,
        next: null
      }, Ul === null ? J.memoizedState = Ul = l : Ul = Ul.next = l;
    }
    return Ul;
  }
  function eu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ia(l) {
    var t = Fa;
    return Fa += 1, ha === null && (ha = []), l = _f(ha, l, t), t = J, (Ul === null ? t.memoizedState : Ul.next) === null && (t = t.alternate, o.H = t === null || t.memoizedState === null ? pr : uc), l;
  }
  function au(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Ia(l);
      if (l.$$typeof === El) return Kl(l);
    }
    throw Error(m(438, String(l)));
  }
  function ki(l) {
    var t = null, e = J.updateQueue;
    if (e !== null && (t = e.memoCache), t == null) {
      var a = J.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), e === null && (e = eu(), J.updateQueue = e), e.memoCache = t, e = t.data[t.index], e === void 0)
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++)
        e[a] = ql;
    return t.index++, e;
  }
  function Xt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function nu(l) {
    var t = Cl();
    return $i(t, vl, l);
  }
  function $i(l, t, e) {
    var a = l.queue;
    if (a === null) throw Error(m(311));
    a.lastRenderedReducer = e;
    var n = l.baseQueue, u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var i = n.next;
        n.next = u.next, u.next = i;
      }
      t.baseQueue = n = u, a.pending = null;
    }
    if (u = l.baseState, n === null) l.memoizedState = u;
    else {
      t = n.next;
      var s = i = null, f = null, y = t, S = !1;
      do {
        var A = y.lane & -536870913;
        if (A !== y.lane ? (el & A) === A : (Qt & A) === A) {
          var g = y.revertLane;
          if (g === 0)
            f !== null && (f = f.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null
            }), A === ca && (S = !0);
          else if ((Qt & g) === g) {
            y = y.next, g === ca && (S = !0);
            continue;
          } else
            A = {
              lane: 0,
              revertLane: y.revertLane,
              gesture: null,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null
            }, f === null ? (s = f = A, i = u) : f = f.next = A, J.lanes |= g, oe |= g;
          A = y.action, Ye && e(u, A), u = y.hasEagerState ? y.eagerState : e(u, A);
        } else
          g = {
            lane: A,
            revertLane: y.revertLane,
            gesture: y.gesture,
            action: y.action,
            hasEagerState: y.hasEagerState,
            eagerState: y.eagerState,
            next: null
          }, f === null ? (s = f = g, i = u) : f = f.next = g, J.lanes |= A, oe |= A;
        y = y.next;
      } while (y !== null && y !== t);
      if (f === null ? i = u : f.next = s, !st(u, l.memoizedState) && (Rl = !0, S && (e = sa, e !== null)))
        throw e;
      l.memoizedState = u, l.baseState = i, l.baseQueue = f, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function Wi(l) {
    var t = Cl(), e = t.queue;
    if (e === null) throw Error(m(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch, n = e.pending, u = t.memoizedState;
    if (n !== null) {
      e.pending = null;
      var i = n = n.next;
      do
        u = l(u, i.action), i = i.next;
      while (i !== n);
      st(u, t.memoizedState) || (Rl = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), e.lastRenderedState = u;
    }
    return [u, a];
  }
  function Gf(l, t, e) {
    var a = J, n = Cl(), u = nl;
    if (u) {
      if (e === void 0) throw Error(m(407));
      e = e();
    } else e = t();
    var i = !st(
      (vl || n).memoizedState,
      e
    );
    if (i && (n.memoizedState = e, Rl = !0), n = n.queue, Pi(Xf.bind(null, a, n, l), [
      l
    ]), n.getSnapshot !== t || i || Ul !== null && Ul.memoizedState.tag & 1) {
      if (a.flags |= 2048, ma(
        9,
        { destroy: void 0 },
        Qf.bind(
          null,
          a,
          n,
          e,
          t
        ),
        null
      ), bl === null) throw Error(m(349));
      u || (Qt & 127) !== 0 || Lf(a, t, e);
    }
    return e;
  }
  function Lf(l, t, e) {
    l.flags |= 16384, l = { getSnapshot: t, value: e }, t = J.updateQueue, t === null ? (t = eu(), J.updateQueue = t, t.stores = [l]) : (e = t.stores, e === null ? t.stores = [l] : e.push(l));
  }
  function Qf(l, t, e, a) {
    t.value = e, t.getSnapshot = a, Zf(t) && Vf(l);
  }
  function Xf(l, t, e) {
    return e(function() {
      Zf(t) && Vf(l);
    });
  }
  function Zf(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !st(l, e);
    } catch {
      return !0;
    }
  }
  function Vf(l) {
    var t = Oe(l, 2);
    t !== null && nt(t, l, 2);
  }
  function Fi(l) {
    var t = Wl();
    if (typeof l == "function") {
      var e = l;
      if (l = e(), Ye) {
        It(!0);
        try {
          e();
        } finally {
          It(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Xt,
      lastRenderedState: l
    }, t;
  }
  function Kf(l, t, e, a) {
    return l.baseState = e, $i(
      l,
      vl,
      typeof a == "function" ? a : Xt
    );
  }
  function Fh(l, t, e, a, n) {
    if (cu(l)) throw Error(m(485));
    if (l = t.action, l !== null) {
      var u = {
        payload: n,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(i) {
          u.listeners.push(i);
        }
      };
      o.T !== null ? e(!0) : u.isTransition = !1, a(u), e = t.pending, e === null ? (u.next = t.pending = u, Jf(t, u)) : (u.next = e.next, t.pending = e.next = u);
    }
  }
  function Jf(l, t) {
    var e = t.action, a = t.payload, n = l.state;
    if (t.isTransition) {
      var u = o.T, i = {};
      o.T = i;
      try {
        var s = e(n, a), f = o.S;
        f !== null && f(i, s), wf(l, t, s);
      } catch (y) {
        Ii(l, t, y);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), o.T = u;
      }
    } else
      try {
        u = e(n, a), wf(l, t, u);
      } catch (y) {
        Ii(l, t, y);
      }
  }
  function wf(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        kf(l, t, a);
      },
      function(a) {
        return Ii(l, t, a);
      }
    ) : kf(l, t, e);
  }
  function kf(l, t, e) {
    t.status = "fulfilled", t.value = e, $f(t), l.state = e, t = l.pending, t !== null && (e = t.next, e === t ? l.pending = null : (e = e.next, t.next = e, Jf(l, e)));
  }
  function Ii(l, t, e) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = e, $f(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function $f(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function Wf(l, t) {
    return t;
  }
  function Ff(l, t) {
    if (nl) {
      var e = bl.formState;
      if (e !== null) {
        l: {
          var a = J;
          if (nl) {
            if (Sl) {
              t: {
                for (var n = Sl, u = xt; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break t;
                  }
                  if (n = At(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break t;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                Sl = At(
                  n.nextSibling
                ), a = n.data === "F!";
                break l;
              }
            }
            ae(a);
          }
          a = !1;
        }
        a && (t = e[0]);
      }
    }
    return e = Wl(), e.memoizedState = e.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Wf,
      lastRenderedState: t
    }, e.queue = a, e = yr.bind(
      null,
      J,
      a
    ), a.dispatch = e, a = Fi(!1), u = nc.bind(
      null,
      J,
      !1,
      a.queue
    ), a = Wl(), n = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = n, e = Fh.bind(
      null,
      J,
      n,
      u,
      e
    ), n.dispatch = e, a.memoizedState = l, [t, e, !1];
  }
  function If(l) {
    var t = Cl();
    return Pf(t, vl, l);
  }
  function Pf(l, t, e) {
    if (t = $i(
      l,
      t,
      Wf
    )[0], l = nu(Xt)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Ia(t);
      } catch (i) {
        throw i === fa ? kn : i;
      }
    else a = t;
    t = Cl();
    var n = t.queue, u = n.dispatch;
    return e !== t.memoizedState && (J.flags |= 2048, ma(
      9,
      { destroy: void 0 },
      Ih.bind(null, n, e),
      null
    )), [a, u, l];
  }
  function Ih(l, t) {
    l.action = t;
  }
  function lr(l) {
    var t = Cl(), e = vl;
    if (e !== null)
      return Pf(t, e, l);
    Cl(), t = t.memoizedState, e = Cl();
    var a = e.queue.dispatch;
    return e.memoizedState = l, [t, a, !1];
  }
  function ma(l, t, e, a) {
    return l = { tag: l, create: e, deps: a, inst: t, next: null }, t = J.updateQueue, t === null && (t = eu(), J.updateQueue = t), e = t.lastEffect, e === null ? t.lastEffect = l.next = l : (a = e.next, e.next = l, l.next = a, t.lastEffect = l), l;
  }
  function tr() {
    return Cl().memoizedState;
  }
  function uu(l, t, e, a) {
    var n = Wl();
    J.flags |= l, n.memoizedState = ma(
      1 | t,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function iu(l, t, e, a) {
    var n = Cl();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    vl !== null && a !== null && Zi(a, vl.memoizedState.deps) ? n.memoizedState = ma(t, u, e, a) : (J.flags |= l, n.memoizedState = ma(
      1 | t,
      u,
      e,
      a
    ));
  }
  function er(l, t) {
    uu(8390656, 8, l, t);
  }
  function Pi(l, t) {
    iu(2048, 8, l, t);
  }
  function Ph(l) {
    J.flags |= 4;
    var t = J.updateQueue;
    if (t === null)
      t = eu(), J.updateQueue = t, t.events = [l];
    else {
      var e = t.events;
      e === null ? t.events = [l] : e.push(l);
    }
  }
  function ar(l) {
    var t = Cl().memoizedState;
    return Ph({ ref: t, nextImpl: l }), function() {
      if ((rl & 2) !== 0) throw Error(m(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function nr(l, t) {
    return iu(4, 2, l, t);
  }
  function ur(l, t) {
    return iu(4, 4, l, t);
  }
  function ir(l, t) {
    if (typeof t == "function") {
      l = l();
      var e = t(l);
      return function() {
        typeof e == "function" ? e() : t(null);
      };
    }
    if (t != null)
      return l = l(), t.current = l, function() {
        t.current = null;
      };
  }
  function cr(l, t, e) {
    e = e != null ? e.concat([l]) : null, iu(4, 4, ir.bind(null, t, l), e);
  }
  function lc() {
  }
  function sr(l, t) {
    var e = Cl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Zi(t, a[1]) ? a[0] : (e.memoizedState = [l, t], l);
  }
  function fr(l, t) {
    var e = Cl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && Zi(t, a[1]))
      return a[0];
    if (a = l(), Ye) {
      It(!0);
      try {
        l();
      } finally {
        It(!1);
      }
    }
    return e.memoizedState = [a, t], a;
  }
  function tc(l, t, e) {
    return e === void 0 || (Qt & 1073741824) !== 0 && (el & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = e, l = rd(), J.lanes |= l, oe |= l, e);
  }
  function rr(l, t, e, a) {
    return st(e, t) ? e : da.current !== null ? (l = tc(l, e, a), st(l, t) || (Rl = !0), l) : (Qt & 42) === 0 || (Qt & 1073741824) !== 0 && (el & 261930) === 0 ? (Rl = !0, l.memoizedState = e) : (l = rd(), J.lanes |= l, oe |= l, t);
  }
  function dr(l, t, e, a, n) {
    var u = T.p;
    T.p = u !== 0 && 8 > u ? u : 8;
    var i = o.T, s = {};
    o.T = s, nc(l, !1, t, e);
    try {
      var f = n(), y = o.S;
      if (y !== null && y(s, f), f !== null && typeof f == "object" && typeof f.then == "function") {
        var S = kh(
          f,
          a
        );
        Pa(
          l,
          t,
          S,
          mt(l)
        );
      } else
        Pa(
          l,
          t,
          a,
          mt(l)
        );
    } catch (A) {
      Pa(
        l,
        t,
        { then: function() {
        }, status: "rejected", reason: A },
        mt()
      );
    } finally {
      T.p = u, i !== null && s.types !== null && (i.types = s.types), o.T = i;
    }
  }
  function lm() {
  }
  function ec(l, t, e, a) {
    if (l.tag !== 5) throw Error(m(476));
    var n = or(l).queue;
    dr(
      l,
      n,
      t,
      q,
      e === null ? lm : function() {
        return hr(l), e(a);
      }
    );
  }
  function or(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: q,
      baseState: q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Xt,
        lastRenderedState: q
      },
      next: null
    };
    var e = {};
    return t.next = {
      memoizedState: e,
      baseState: e,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Xt,
        lastRenderedState: e
      },
      next: null
    }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function hr(l) {
    var t = or(l);
    t.next === null && (t = l.alternate.memoizedState), Pa(
      l,
      t.next.queue,
      {},
      mt()
    );
  }
  function ac() {
    return Kl(gn);
  }
  function mr() {
    return Cl().memoizedState;
  }
  function vr() {
    return Cl().memoizedState;
  }
  function tm(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = mt();
          l = ie(e);
          var a = ce(t, l, e);
          a !== null && (nt(a, t, e), ka(a, t, e)), t = { cache: Di() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function em(l, t, e) {
    var a = mt();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, cu(l) ? gr(t, e) : (e = ji(l, t, e, a), e !== null && (nt(e, l, a), br(e, t, a)));
  }
  function yr(l, t, e) {
    var a = mt();
    Pa(l, t, e, a);
  }
  function Pa(l, t, e, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (cu(l)) gr(t, n);
    else {
      var u = l.alternate;
      if (l.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var i = t.lastRenderedState, s = u(i, e);
          if (n.hasEagerState = !0, n.eagerState = s, st(s, i))
            return Qn(l, t, n, 0), bl === null && Ln(), !1;
        } catch {
        } finally {
        }
      if (e = ji(l, t, n, a), e !== null)
        return nt(e, l, a), br(e, t, a), !0;
    }
    return !1;
  }
  function nc(l, t, e, a) {
    if (a = {
      lane: 2,
      revertLane: Bc(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, cu(l)) {
      if (t) throw Error(m(479));
    } else
      t = ji(
        l,
        e,
        a,
        2
      ), t !== null && nt(t, l, 2);
  }
  function cu(l) {
    var t = l.alternate;
    return l === J || t !== null && t === J;
  }
  function gr(l, t) {
    oa = lu = !0;
    var e = l.pending;
    e === null ? t.next = t : (t.next = e.next, e.next = t), l.pending = t;
  }
  function br(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, xs(l, e);
    }
  }
  var ln = {
    readContext: Kl,
    use: au,
    useCallback: Nl,
    useContext: Nl,
    useEffect: Nl,
    useImperativeHandle: Nl,
    useLayoutEffect: Nl,
    useInsertionEffect: Nl,
    useMemo: Nl,
    useReducer: Nl,
    useRef: Nl,
    useState: Nl,
    useDebugValue: Nl,
    useDeferredValue: Nl,
    useTransition: Nl,
    useSyncExternalStore: Nl,
    useId: Nl,
    useHostTransitionStatus: Nl,
    useFormState: Nl,
    useActionState: Nl,
    useOptimistic: Nl,
    useMemoCache: Nl,
    useCacheRefresh: Nl
  };
  ln.useEffectEvent = Nl;
  var pr = {
    readContext: Kl,
    use: au,
    useCallback: function(l, t) {
      return Wl().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: Kl,
    useEffect: er,
    useImperativeHandle: function(l, t, e) {
      e = e != null ? e.concat([l]) : null, uu(
        4194308,
        4,
        ir.bind(null, t, l),
        e
      );
    },
    useLayoutEffect: function(l, t) {
      return uu(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      uu(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var e = Wl();
      t = t === void 0 ? null : t;
      var a = l();
      if (Ye) {
        It(!0);
        try {
          l();
        } finally {
          It(!1);
        }
      }
      return e.memoizedState = [a, t], a;
    },
    useReducer: function(l, t, e) {
      var a = Wl();
      if (e !== void 0) {
        var n = e(t);
        if (Ye) {
          It(!0);
          try {
            e(t);
          } finally {
            It(!1);
          }
        }
      } else n = t;
      return a.memoizedState = a.baseState = n, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: n
      }, a.queue = l, l = l.dispatch = em.bind(
        null,
        J,
        l
      ), [a.memoizedState, l];
    },
    useRef: function(l) {
      var t = Wl();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = Fi(l);
      var t = l.queue, e = yr.bind(null, J, t);
      return t.dispatch = e, [l.memoizedState, e];
    },
    useDebugValue: lc,
    useDeferredValue: function(l, t) {
      var e = Wl();
      return tc(e, l, t);
    },
    useTransition: function() {
      var l = Fi(!1);
      return l = dr.bind(
        null,
        J,
        l.queue,
        !0,
        !1
      ), Wl().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, e) {
      var a = J, n = Wl();
      if (nl) {
        if (e === void 0)
          throw Error(m(407));
        e = e();
      } else {
        if (e = t(), bl === null)
          throw Error(m(349));
        (el & 127) !== 0 || Lf(a, t, e);
      }
      n.memoizedState = e;
      var u = { value: e, getSnapshot: t };
      return n.queue = u, er(Xf.bind(null, a, u, l), [
        l
      ]), a.flags |= 2048, ma(
        9,
        { destroy: void 0 },
        Qf.bind(
          null,
          a,
          u,
          e,
          t
        ),
        null
      ), e;
    },
    useId: function() {
      var l = Wl(), t = bl.identifierPrefix;
      if (nl) {
        var e = Ct, a = Mt;
        e = (a & ~(1 << 32 - ct(a) - 1)).toString(32) + e, t = "_" + t + "R_" + e, e = tu++, 0 < e && (t += "H" + e.toString(32)), t += "_";
      } else
        e = $h++, t = "_" + t + "r_" + e.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: ac,
    useFormState: Ff,
    useActionState: Ff,
    useOptimistic: function(l) {
      var t = Wl();
      t.memoizedState = t.baseState = l;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = e, t = nc.bind(
        null,
        J,
        !0,
        e
      ), e.dispatch = t, [l, t];
    },
    useMemoCache: ki,
    useCacheRefresh: function() {
      return Wl().memoizedState = tm.bind(
        null,
        J
      );
    },
    useEffectEvent: function(l) {
      var t = Wl(), e = { impl: l };
      return t.memoizedState = e, function() {
        if ((rl & 2) !== 0)
          throw Error(m(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, uc = {
    readContext: Kl,
    use: au,
    useCallback: sr,
    useContext: Kl,
    useEffect: Pi,
    useImperativeHandle: cr,
    useInsertionEffect: nr,
    useLayoutEffect: ur,
    useMemo: fr,
    useReducer: nu,
    useRef: tr,
    useState: function() {
      return nu(Xt);
    },
    useDebugValue: lc,
    useDeferredValue: function(l, t) {
      var e = Cl();
      return rr(
        e,
        vl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = nu(Xt)[0], t = Cl().memoizedState;
      return [
        typeof l == "boolean" ? l : Ia(l),
        t
      ];
    },
    useSyncExternalStore: Gf,
    useId: mr,
    useHostTransitionStatus: ac,
    useFormState: If,
    useActionState: If,
    useOptimistic: function(l, t) {
      var e = Cl();
      return Kf(e, vl, l, t);
    },
    useMemoCache: ki,
    useCacheRefresh: vr
  };
  uc.useEffectEvent = ar;
  var Sr = {
    readContext: Kl,
    use: au,
    useCallback: sr,
    useContext: Kl,
    useEffect: Pi,
    useImperativeHandle: cr,
    useInsertionEffect: nr,
    useLayoutEffect: ur,
    useMemo: fr,
    useReducer: Wi,
    useRef: tr,
    useState: function() {
      return Wi(Xt);
    },
    useDebugValue: lc,
    useDeferredValue: function(l, t) {
      var e = Cl();
      return vl === null ? tc(e, l, t) : rr(
        e,
        vl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Wi(Xt)[0], t = Cl().memoizedState;
      return [
        typeof l == "boolean" ? l : Ia(l),
        t
      ];
    },
    useSyncExternalStore: Gf,
    useId: mr,
    useHostTransitionStatus: ac,
    useFormState: lr,
    useActionState: lr,
    useOptimistic: function(l, t) {
      var e = Cl();
      return vl !== null ? Kf(e, vl, l, t) : (e.baseState = l, [l, e.queue.dispatch]);
    },
    useMemoCache: ki,
    useCacheRefresh: vr
  };
  Sr.useEffectEvent = ar;
  function ic(l, t, e, a) {
    t = l.memoizedState, e = e(a, t), e = e == null ? t : M({}, t, e), l.memoizedState = e, l.lanes === 0 && (l.updateQueue.baseState = e);
  }
  var cc = {
    enqueueSetState: function(l, t, e) {
      l = l._reactInternals;
      var a = mt(), n = ie(a);
      n.payload = t, e != null && (n.callback = e), t = ce(l, n, a), t !== null && (nt(t, l, a), ka(t, l, a));
    },
    enqueueReplaceState: function(l, t, e) {
      l = l._reactInternals;
      var a = mt(), n = ie(a);
      n.tag = 1, n.payload = t, e != null && (n.callback = e), t = ce(l, n, a), t !== null && (nt(t, l, a), ka(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var e = mt(), a = ie(e);
      a.tag = 2, t != null && (a.callback = t), t = ce(l, a, e), t !== null && (nt(t, l, e), ka(t, l, e));
    }
  };
  function jr(l, t, e, a, n, u, i) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, u, i) : t.prototype && t.prototype.isPureReactComponent ? !La(e, a) || !La(n, u) : !0;
  }
  function xr(l, t, e, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(e, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(e, a), t.state !== l && cc.enqueueReplaceState(t, t.state, null);
  }
  function Ge(l, t) {
    var e = t;
    if ("ref" in t) {
      e = {};
      for (var a in t)
        a !== "ref" && (e[a] = t[a]);
    }
    if (l = l.defaultProps) {
      e === t && (e = M({}, e));
      for (var n in l)
        e[n] === void 0 && (e[n] = l[n]);
    }
    return e;
  }
  function Er(l) {
    Gn(l);
  }
  function Ar(l) {
    console.error(l);
  }
  function Tr(l) {
    Gn(l);
  }
  function su(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function zr(l, t, e) {
    try {
      var a = l.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function sc(l, t, e) {
    return e = ie(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      su(l, t);
    }, e;
  }
  function Nr(l) {
    return l = ie(l), l.tag = 3, l;
  }
  function _r(l, t, e, a) {
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      l.payload = function() {
        return n(u);
      }, l.callback = function() {
        zr(t, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (l.callback = function() {
      zr(t, e, a), typeof n != "function" && (he === null ? he = /* @__PURE__ */ new Set([this]) : he.add(this));
      var s = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: s !== null ? s : ""
      });
    });
  }
  function am(l, t, e, a, n) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = e.alternate, t !== null && ia(
        t,
        e,
        n,
        !0
      ), e = rt.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Et === null ? Su() : e.alternate === null && _l === 0 && (_l = 3), e.flags &= -257, e.flags |= 65536, e.lanes = n, a === $n ? e.flags |= 16384 : (t = e.updateQueue, t === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), Uc(l, a, n)), !1;
          case 22:
            return e.flags |= 65536, a === $n ? e.flags |= 16384 : (t = e.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = t) : (e = t.retryQueue, e === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), Uc(l, a, n)), !1;
        }
        throw Error(m(435, e.tag));
      }
      return Uc(l, a, n), Su(), !1;
    }
    if (nl)
      return t = rt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, a !== Ni && (l = Error(m(422), { cause: a }), Za(pt(l, e)))) : (a !== Ni && (t = Error(m(423), {
        cause: a
      }), Za(
        pt(t, e)
      )), l = l.current.alternate, l.flags |= 65536, n &= -n, l.lanes |= n, a = pt(a, e), n = sc(
        l.stateNode,
        a,
        n
      ), Yi(l, n), _l !== 4 && (_l = 2)), !1;
    var u = Error(m(520), { cause: a });
    if (u = pt(u, e), fn === null ? fn = [u] : fn.push(u), _l !== 4 && (_l = 2), t === null) return !0;
    a = pt(a, e), e = t;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, l = n & -n, e.lanes |= l, l = sc(e.stateNode, a, l), Yi(e, l), !1;
        case 1:
          if (t = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (he === null || !he.has(u))))
            return e.flags |= 65536, n &= -n, e.lanes |= n, n = Nr(n), _r(
              n,
              l,
              e,
              a
            ), Yi(e, n), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var fc = Error(m(461)), Rl = !1;
  function Jl(l, t, e, a) {
    t.child = l === null ? Df(t, null, e, a) : qe(
      t,
      l.child,
      e,
      a
    );
  }
  function Or(l, t, e, a, n) {
    e = e.render;
    var u = t.ref;
    if ("ref" in a) {
      var i = {};
      for (var s in a)
        s !== "ref" && (i[s] = a[s]);
    } else i = a;
    return Ue(t), a = Vi(
      l,
      t,
      e,
      i,
      u,
      n
    ), s = Ki(), l !== null && !Rl ? (Ji(l, t, n), Zt(l, t, n)) : (nl && s && Ti(t), t.flags |= 1, Jl(l, t, a, n), t.child);
  }
  function Mr(l, t, e, a, n) {
    if (l === null) {
      var u = e.type;
      return typeof u == "function" && !xi(u) && u.defaultProps === void 0 && e.compare === null ? (t.tag = 15, t.type = u, Cr(
        l,
        t,
        u,
        a,
        n
      )) : (l = Zn(
        e.type,
        null,
        a,
        t,
        t.mode,
        n
      ), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (u = l.child, !gc(l, n)) {
      var i = u.memoizedProps;
      if (e = e.compare, e = e !== null ? e : La, e(i, a) && l.ref === t.ref)
        return Zt(l, t, n);
    }
    return t.flags |= 1, l = qt(u, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function Cr(l, t, e, a, n) {
    if (l !== null) {
      var u = l.memoizedProps;
      if (La(u, a) && l.ref === t.ref)
        if (Rl = !1, t.pendingProps = a = u, gc(l, n))
          (l.flags & 131072) !== 0 && (Rl = !0);
        else
          return t.lanes = l.lanes, Zt(l, t, n);
    }
    return rc(
      l,
      t,
      e,
      a,
      n
    );
  }
  function Dr(l, t, e, a) {
    var n = a.children, u = l !== null ? l.memoizedState : null;
    if (l === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | e : e, l !== null) {
          for (a = t.child = l.child, n = 0; a !== null; )
            n = n | a.lanes | a.childLanes, a = a.sibling;
          a = n & ~u;
        } else a = 0, t.child = null;
        return Ur(
          l,
          t,
          u,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && wn(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? Hf(t, u) : Li(), Bf(t);
      else
        return a = t.lanes = 536870912, Ur(
          l,
          t,
          u !== null ? u.baseLanes | e : e,
          e,
          a
        );
    } else
      u !== null ? (wn(t, u.cachePool), Hf(t, u), fe(), t.memoizedState = null) : (l !== null && wn(t, null), Li(), fe());
    return Jl(l, t, n, e), t.child;
  }
  function tn(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Ur(l, t, e, a, n) {
    var u = Ri();
    return u = u === null ? null : { parent: Dl._currentValue, pool: u }, t.memoizedState = {
      baseLanes: e,
      cachePool: u
    }, l !== null && wn(t, null), Li(), Bf(t), l !== null && ia(l, t, a, !0), t.childLanes = n, null;
  }
  function fu(l, t) {
    return t = du(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Rr(l, t, e) {
    return qe(t, l.child, null, e), l = fu(t, t.pendingProps), l.flags |= 2, dt(t), t.memoizedState = null, l;
  }
  function nm(l, t, e) {
    var a = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (nl) {
        if (a.mode === "hidden")
          return l = fu(t, a), t.lanes = 536870912, tn(null, l);
        if (Xi(t), (l = Sl) ? (l = Jd(
          l,
          xt
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: te !== null ? { id: Mt, overflow: Ct } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = gf(l), e.return = t, t.child = e, Vl = t, Sl = null)) : l = null, l === null) throw ae(t);
        return t.lanes = 536870912, null;
      }
      return fu(t, a);
    }
    var u = l.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (Xi(t), n)
        if (t.flags & 256)
          t.flags &= -257, t = Rr(
            l,
            t,
            e
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(m(558));
      else if (Rl || ia(l, t, e, !1), n = (e & l.childLanes) !== 0, Rl || n) {
        if (a = bl, a !== null && (i = Es(a, e), i !== 0 && i !== u.retryLane))
          throw u.retryLane = i, Oe(l, i), nt(a, l, i), fc;
        Su(), t = Rr(
          l,
          t,
          e
        );
      } else
        l = u.treeContext, Sl = At(i.nextSibling), Vl = t, nl = !0, ee = null, xt = !1, l !== null && Sf(t, l), t = fu(t, a), t.flags |= 4096;
      return t;
    }
    return l = qt(l.child, {
      mode: a.mode,
      children: a.children
    }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function ru(l, t) {
    var e = t.ref;
    if (e === null)
      l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(m(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function rc(l, t, e, a, n) {
    return Ue(t), e = Vi(
      l,
      t,
      e,
      a,
      void 0,
      n
    ), a = Ki(), l !== null && !Rl ? (Ji(l, t, n), Zt(l, t, n)) : (nl && a && Ti(t), t.flags |= 1, Jl(l, t, e, n), t.child);
  }
  function Hr(l, t, e, a, n, u) {
    return Ue(t), t.updateQueue = null, e = Yf(
      t,
      a,
      e,
      n
    ), qf(l), a = Ki(), l !== null && !Rl ? (Ji(l, t, u), Zt(l, t, u)) : (nl && a && Ti(t), t.flags |= 1, Jl(l, t, e, u), t.child);
  }
  function Br(l, t, e, a, n) {
    if (Ue(t), t.stateNode === null) {
      var u = ea, i = e.contextType;
      typeof i == "object" && i !== null && (u = Kl(i)), u = new e(a, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = cc, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = a, u.state = t.memoizedState, u.refs = {}, Bi(t), i = e.contextType, u.context = typeof i == "object" && i !== null ? Kl(i) : ea, u.state = t.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (ic(
        t,
        e,
        i,
        a
      ), u.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && cc.enqueueReplaceState(u, u.state, null), Wa(t, a, u, n), $a(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      u = t.stateNode;
      var s = t.memoizedProps, f = Ge(e, s);
      u.props = f;
      var y = u.context, S = e.contextType;
      i = ea, typeof S == "object" && S !== null && (i = Kl(S));
      var A = e.getDerivedStateFromProps;
      S = typeof A == "function" || typeof u.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, S || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (s || y !== i) && xr(
        t,
        u,
        a,
        i
      ), ue = !1;
      var g = t.memoizedState;
      u.state = g, Wa(t, a, u, n), $a(), y = t.memoizedState, s || g !== y || ue ? (typeof A == "function" && (ic(
        t,
        e,
        A,
        a
      ), y = t.memoizedState), (f = ue || jr(
        t,
        e,
        f,
        a,
        g,
        y,
        i
      )) ? (S || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = y), u.props = a, u.state = y, u.context = i, a = f) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      u = t.stateNode, qi(l, t), i = t.memoizedProps, S = Ge(e, i), u.props = S, A = t.pendingProps, g = u.context, y = e.contextType, f = ea, typeof y == "object" && y !== null && (f = Kl(y)), s = e.getDerivedStateFromProps, (y = typeof s == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== A || g !== f) && xr(
        t,
        u,
        a,
        f
      ), ue = !1, g = t.memoizedState, u.state = g, Wa(t, a, u, n), $a();
      var b = t.memoizedState;
      i !== A || g !== b || ue || l !== null && l.dependencies !== null && Kn(l.dependencies) ? (typeof s == "function" && (ic(
        t,
        e,
        s,
        a
      ), b = t.memoizedState), (S = ue || jr(
        t,
        e,
        S,
        a,
        g,
        b,
        f
      ) || l !== null && l.dependencies !== null && Kn(l.dependencies)) ? (y || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, b, f), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        b,
        f
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === l.memoizedProps && g === l.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && g === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = b), u.props = a, u.state = b, u.context = f, a = S) : (typeof u.componentDidUpdate != "function" || i === l.memoizedProps && g === l.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && g === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return u = a, ru(l, t), a = (t.flags & 128) !== 0, u || a ? (u = t.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, l !== null && a ? (t.child = qe(
      t,
      l.child,
      null,
      n
    ), t.child = qe(
      t,
      null,
      e,
      n
    )) : Jl(l, t, e, n), t.memoizedState = u.state, l = t.child) : l = Zt(
      l,
      t,
      n
    ), l;
  }
  function qr(l, t, e, a) {
    return Ce(), t.flags |= 256, Jl(l, t, e, a), t.child;
  }
  var dc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function oc(l) {
    return { baseLanes: l, cachePool: zf() };
  }
  function hc(l, t, e) {
    return l = l !== null ? l.childLanes & ~e : 0, t && (l |= ht), l;
  }
  function Yr(l, t, e) {
    var a = t.pendingProps, n = !1, u = (t.flags & 128) !== 0, i;
    if ((i = u) || (i = l !== null && l.memoizedState === null ? !1 : (Ml.current & 2) !== 0), i && (n = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (nl) {
        if (n ? se(t) : fe(), (l = Sl) ? (l = Jd(
          l,
          xt
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: te !== null ? { id: Mt, overflow: Ct } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = gf(l), e.return = t, t.child = e, Vl = t, Sl = null)) : l = null, l === null) throw ae(t);
        return $c(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var s = a.children;
      return a = a.fallback, n ? (fe(), n = t.mode, s = du(
        { mode: "hidden", children: s },
        n
      ), a = Me(
        a,
        n,
        e,
        null
      ), s.return = t, a.return = t, s.sibling = a, t.child = s, a = t.child, a.memoizedState = oc(e), a.childLanes = hc(
        l,
        i,
        e
      ), t.memoizedState = dc, tn(null, a)) : (se(t), mc(t, s));
    }
    var f = l.memoizedState;
    if (f !== null && (s = f.dehydrated, s !== null)) {
      if (u)
        t.flags & 256 ? (se(t), t.flags &= -257, t = vc(
          l,
          t,
          e
        )) : t.memoizedState !== null ? (fe(), t.child = l.child, t.flags |= 128, t = null) : (fe(), s = a.fallback, n = t.mode, a = du(
          { mode: "visible", children: a.children },
          n
        ), s = Me(
          s,
          n,
          e,
          null
        ), s.flags |= 2, a.return = t, s.return = t, a.sibling = s, t.child = a, qe(
          t,
          l.child,
          null,
          e
        ), a = t.child, a.memoizedState = oc(e), a.childLanes = hc(
          l,
          i,
          e
        ), t.memoizedState = dc, t = tn(null, a));
      else if (se(t), $c(s)) {
        if (i = s.nextSibling && s.nextSibling.dataset, i) var y = i.dgst;
        i = y, a = Error(m(419)), a.stack = "", a.digest = i, Za({ value: a, source: null, stack: null }), t = vc(
          l,
          t,
          e
        );
      } else if (Rl || ia(l, t, e, !1), i = (e & l.childLanes) !== 0, Rl || i) {
        if (i = bl, i !== null && (a = Es(i, e), a !== 0 && a !== f.retryLane))
          throw f.retryLane = a, Oe(l, a), nt(i, l, a), fc;
        kc(s) || Su(), t = vc(
          l,
          t,
          e
        );
      } else
        kc(s) ? (t.flags |= 192, t.child = l.child, t = null) : (l = f.treeContext, Sl = At(
          s.nextSibling
        ), Vl = t, nl = !0, ee = null, xt = !1, l !== null && Sf(t, l), t = mc(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return n ? (fe(), s = a.fallback, n = t.mode, f = l.child, y = f.sibling, a = qt(f, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = f.subtreeFlags & 65011712, y !== null ? s = qt(
      y,
      s
    ) : (s = Me(
      s,
      n,
      e,
      null
    ), s.flags |= 2), s.return = t, a.return = t, a.sibling = s, t.child = a, tn(null, a), a = t.child, s = l.child.memoizedState, s === null ? s = oc(e) : (n = s.cachePool, n !== null ? (f = Dl._currentValue, n = n.parent !== f ? { parent: f, pool: f } : n) : n = zf(), s = {
      baseLanes: s.baseLanes | e,
      cachePool: n
    }), a.memoizedState = s, a.childLanes = hc(
      l,
      i,
      e
    ), t.memoizedState = dc, tn(l.child, a)) : (se(t), e = l.child, l = e.sibling, e = qt(e, {
      mode: "visible",
      children: a.children
    }), e.return = t, e.sibling = null, l !== null && (i = t.deletions, i === null ? (t.deletions = [l], t.flags |= 16) : i.push(l)), t.child = e, t.memoizedState = null, e);
  }
  function mc(l, t) {
    return t = du(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function du(l, t) {
    return l = ft(22, l, null, t), l.lanes = 0, l;
  }
  function vc(l, t, e) {
    return qe(t, l.child, null, e), l = mc(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function Gr(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), Mi(l.return, t, e);
  }
  function yc(l, t, e, a, n, u) {
    var i = l.memoizedState;
    i === null ? l.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: e,
      tailMode: n,
      treeForkCount: u
    } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = e, i.tailMode = n, i.treeForkCount = u);
  }
  function Lr(l, t, e) {
    var a = t.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = Ml.current, s = (i & 2) !== 0;
    if (s ? (i = i & 1 | 2, t.flags |= 128) : i &= 1, _(Ml, i), Jl(l, t, a, e), a = nl ? Xa : 0, !s && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && Gr(l, e, t);
        else if (l.tag === 19)
          Gr(l, e, t);
        else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t)
            break l;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    switch (n) {
      case "forwards":
        for (e = t.child, n = null; e !== null; )
          l = e.alternate, l !== null && Pn(l) === null && (n = e), e = e.sibling;
        e = n, e === null ? (n = t.child, t.child = null) : (n = e.sibling, e.sibling = null), yc(
          t,
          !1,
          n,
          e,
          u,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, n = t.child, t.child = null; n !== null; ) {
          if (l = n.alternate, l !== null && Pn(l) === null) {
            t.child = n;
            break;
          }
          l = n.sibling, n.sibling = e, e = n, n = l;
        }
        yc(
          t,
          !0,
          e,
          null,
          u,
          a
        );
        break;
      case "together":
        yc(
          t,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Zt(l, t, e) {
    if (l !== null && (t.dependencies = l.dependencies), oe |= t.lanes, (e & t.childLanes) === 0)
      if (l !== null) {
        if (ia(
          l,
          t,
          e,
          !1
        ), (e & t.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && t.child !== l.child)
      throw Error(m(153));
    if (t.child !== null) {
      for (l = t.child, e = qt(l, l.pendingProps), t.child = e, e.return = t; l.sibling !== null; )
        l = l.sibling, e = e.sibling = qt(l, l.pendingProps), e.return = t;
      e.sibling = null;
    }
    return t.child;
  }
  function gc(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Kn(l)));
  }
  function um(l, t, e) {
    switch (t.tag) {
      case 3:
        $l(t, t.stateNode.containerInfo), ne(t, Dl, l.memoizedState.cache), Ce();
        break;
      case 27:
      case 5:
        Na(t);
        break;
      case 4:
        $l(t, t.stateNode.containerInfo);
        break;
      case 10:
        ne(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Xi(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (se(t), t.flags |= 128, null) : (e & t.child.childLanes) !== 0 ? Yr(l, t, e) : (se(t), l = Zt(
            l,
            t,
            e
          ), l !== null ? l.sibling : null);
        se(t);
        break;
      case 19:
        var n = (l.flags & 128) !== 0;
        if (a = (e & t.childLanes) !== 0, a || (ia(
          l,
          t,
          e,
          !1
        ), a = (e & t.childLanes) !== 0), n) {
          if (a)
            return Lr(
              l,
              t,
              e
            );
          t.flags |= 128;
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), _(Ml, Ml.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Dr(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        ne(t, Dl, l.memoizedState.cache);
    }
    return Zt(l, t, e);
  }
  function Qr(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        Rl = !0;
      else {
        if (!gc(l, e) && (t.flags & 128) === 0)
          return Rl = !1, um(
            l,
            t,
            e
          );
        Rl = (l.flags & 131072) !== 0;
      }
    else
      Rl = !1, nl && (t.flags & 1048576) !== 0 && pf(t, Xa, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = He(t.elementType), t.type = l, typeof l == "function")
            xi(l) ? (a = Ge(l, a), t.tag = 1, t = Br(
              null,
              t,
              l,
              a,
              e
            )) : (t.tag = 0, t = rc(
              null,
              t,
              l,
              a,
              e
            ));
          else {
            if (l != null) {
              var n = l.$$typeof;
              if (n === Ll) {
                t.tag = 11, t = Or(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              } else if (n === w) {
                t.tag = 14, t = Mr(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              }
            }
            throw t = vt(l) || l, Error(m(306, t, ""));
          }
        }
        return t;
      case 0:
        return rc(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 1:
        return a = t.type, n = Ge(
          a,
          t.pendingProps
        ), Br(
          l,
          t,
          a,
          n,
          e
        );
      case 3:
        l: {
          if ($l(
            t,
            t.stateNode.containerInfo
          ), l === null) throw Error(m(387));
          a = t.pendingProps;
          var u = t.memoizedState;
          n = u.element, qi(l, t), Wa(t, a, null, e);
          var i = t.memoizedState;
          if (a = i.cache, ne(t, Dl, a), a !== u.cache && Ci(
            t,
            [Dl],
            e,
            !0
          ), $a(), a = i.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = qr(
                l,
                t,
                a,
                e
              );
              break l;
            } else if (a !== n) {
              n = pt(
                Error(m(424)),
                t
              ), Za(n), t = qr(
                l,
                t,
                a,
                e
              );
              break l;
            } else {
              switch (l = t.stateNode.containerInfo, l.nodeType) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              for (Sl = At(l.firstChild), Vl = t, nl = !0, ee = null, xt = !0, e = Df(
                t,
                null,
                a,
                e
              ), t.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (Ce(), a === n) {
              t = Zt(
                l,
                t,
                e
              );
              break l;
            }
            Jl(l, t, a, e);
          }
          t = t.child;
        }
        return t;
      case 26:
        return ru(l, t), l === null ? (e = Id(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = e : nl || (e = t.type, l = t.pendingProps, a = Nu(
          I.current
        ).createElement(e), a[Zl] = t, a[Il] = l, wl(a, e, l), Ql(a), t.stateNode = a) : t.memoizedState = Id(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return Na(t), l === null && nl && (a = t.stateNode = $d(
          t.type,
          t.pendingProps,
          I.current
        ), Vl = t, xt = !0, n = Sl, ge(t.type) ? (Wc = n, Sl = At(a.firstChild)) : Sl = n), Jl(
          l,
          t,
          t.pendingProps.children,
          e
        ), ru(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && nl && ((n = a = Sl) && (a = Hm(
          a,
          t.type,
          t.pendingProps,
          xt
        ), a !== null ? (t.stateNode = a, Vl = t, Sl = At(a.firstChild), xt = !1, n = !0) : n = !1), n || ae(t)), Na(t), n = t.type, u = t.pendingProps, i = l !== null ? l.memoizedProps : null, a = u.children, Kc(n, u) ? a = null : i !== null && Kc(n, i) && (t.flags |= 32), t.memoizedState !== null && (n = Vi(
          l,
          t,
          Wh,
          null,
          null,
          e
        ), gn._currentValue = n), ru(l, t), Jl(l, t, a, e), t.child;
      case 6:
        return l === null && nl && ((l = e = Sl) && (e = Bm(
          e,
          t.pendingProps,
          xt
        ), e !== null ? (t.stateNode = e, Vl = t, Sl = null, l = !0) : l = !1), l || ae(t)), null;
      case 13:
        return Yr(l, t, e);
      case 4:
        return $l(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, l === null ? t.child = qe(
          t,
          null,
          a,
          e
        ) : Jl(l, t, a, e), t.child;
      case 11:
        return Or(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 7:
        return Jl(
          l,
          t,
          t.pendingProps,
          e
        ), t.child;
      case 8:
        return Jl(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 12:
        return Jl(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 10:
        return a = t.pendingProps, ne(t, t.type, a.value), Jl(l, t, a.children, e), t.child;
      case 9:
        return n = t.type._context, a = t.pendingProps.children, Ue(t), n = Kl(n), a = a(n), t.flags |= 1, Jl(l, t, a, e), t.child;
      case 14:
        return Mr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 15:
        return Cr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 19:
        return Lr(l, t, e);
      case 31:
        return nm(l, t, e);
      case 22:
        return Dr(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        return Ue(t), a = Kl(Dl), l === null ? (n = Ri(), n === null && (n = bl, u = Di(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= e), n = u), t.memoizedState = { parent: a, cache: n }, Bi(t), ne(t, Dl, n)) : ((l.lanes & e) !== 0 && (qi(l, t), Wa(t, null, null, e), $a()), n = l.memoizedState, u = t.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), ne(t, Dl, a)) : (a = u.cache, ne(t, Dl, a), a !== n.cache && Ci(
          t,
          [Dl],
          e,
          !0
        ))), Jl(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(m(156, t.tag));
  }
  function Vt(l) {
    l.flags |= 4;
  }
  function bc(l, t, e, a, n) {
    if ((t = (l.mode & 32) !== 0) && (t = !1), t) {
      if (l.flags |= 16777216, (n & 335544128) === n)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (md()) l.flags |= 8192;
        else
          throw Be = $n, Hi;
    } else l.flags &= -16777217;
  }
  function Xr(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !ao(t))
      if (md()) l.flags |= 8192;
      else
        throw Be = $n, Hi;
  }
  function ou(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? Ss() : 536870912, l.lanes |= t, ba |= t);
  }
  function en(l, t) {
    if (!nl)
      switch (l.tailMode) {
        case "hidden":
          t = l.tail;
          for (var e = null; t !== null; )
            t.alternate !== null && (e = t), t = t.sibling;
          e === null ? l.tail = null : e.sibling = null;
          break;
        case "collapsed":
          e = l.tail;
          for (var a = null; e !== null; )
            e.alternate !== null && (a = e), e = e.sibling;
          a === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : a.sibling = null;
      }
  }
  function jl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, e = 0, a = 0;
    if (t)
      for (var n = l.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = l, n = n.sibling;
    else
      for (n = l.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = l, n = n.sibling;
    return l.subtreeFlags |= a, l.childLanes = e, t;
  }
  function im(l, t, e) {
    var a = t.pendingProps;
    switch (zi(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return jl(t), null;
      case 1:
        return jl(t), null;
      case 3:
        return e = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Lt(Dl), Ol(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (l === null || l.child === null) && (ua(t) ? Vt(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, _i())), jl(t), null;
      case 26:
        var n = t.type, u = t.memoizedState;
        return l === null ? (Vt(t), u !== null ? (jl(t), Xr(t, u)) : (jl(t), bc(
          t,
          n,
          null,
          a,
          e
        ))) : u ? u !== l.memoizedState ? (Vt(t), jl(t), Xr(t, u)) : (jl(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && Vt(t), jl(t), bc(
          t,
          n,
          l,
          a,
          e
        )), null;
      case 27:
        if (En(t), e = I.current, n = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && Vt(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(m(166));
            return jl(t), null;
          }
          l = U.current, ua(t) ? jf(t) : (l = $d(n, a, e), t.stateNode = l, Vt(t));
        }
        return jl(t), null;
      case 5:
        if (En(t), n = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && Vt(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(m(166));
            return jl(t), null;
          }
          if (u = U.current, ua(t))
            jf(t);
          else {
            var i = Nu(
              I.current
            );
            switch (u) {
              case 1:
                u = i.createElementNS(
                  "http://www.w3.org/2000/svg",
                  n
                );
                break;
              case 2:
                u = i.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  n
                );
                break;
              default:
                switch (n) {
                  case "svg":
                    u = i.createElementNS(
                      "http://www.w3.org/2000/svg",
                      n
                    );
                    break;
                  case "math":
                    u = i.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    u = i.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof a.is == "string" ? i.createElement("select", {
                      is: a.is
                    }) : i.createElement("select"), a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                    break;
                  default:
                    u = typeof a.is == "string" ? i.createElement(n, { is: a.is }) : i.createElement(n);
                }
            }
            u[Zl] = t, u[Il] = a;
            l: for (i = t.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                u.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i, i = i.child;
                continue;
              }
              if (i === t) break l;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === t)
                  break l;
                i = i.return;
              }
              i.sibling.return = i.return, i = i.sibling;
            }
            t.stateNode = u;
            l: switch (wl(u, n, a), n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break l;
              case "img":
                a = !0;
                break l;
              default:
                a = !1;
            }
            a && Vt(t);
          }
        }
        return jl(t), bc(
          t,
          t.type,
          l === null ? null : l.memoizedProps,
          t.pendingProps,
          e
        ), null;
      case 6:
        if (l && t.stateNode != null)
          l.memoizedProps !== a && Vt(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(m(166));
          if (l = I.current, ua(t)) {
            if (l = t.stateNode, e = t.memoizedProps, a = null, n = Vl, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            l[Zl] = t, l = !!(l.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Yd(l.nodeValue, e)), l || ae(t, !0);
          } else
            l = Nu(l).createTextNode(
              a
            ), l[Zl] = t, t.stateNode = l;
        }
        return jl(t), null;
      case 31:
        if (e = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = ua(t), e !== null) {
            if (l === null) {
              if (!a) throw Error(m(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(m(557));
              l[Zl] = t;
            } else
              Ce(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            jl(t), l = !1;
          } else
            e = _i(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), l = !0;
          if (!l)
            return t.flags & 256 ? (dt(t), t) : (dt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(m(558));
        }
        return jl(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (n = ua(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!n) throw Error(m(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(m(317));
              n[Zl] = t;
            } else
              Ce(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            jl(t), n = !1;
          } else
            n = _i(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (dt(t), t) : (dt(t), null);
        }
        return dt(t), (t.flags & 128) !== 0 ? (t.lanes = e, t) : (e = a !== null, l = l !== null && l.memoizedState !== null, e && (a = t.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), e !== l && e && (t.child.flags |= 8192), ou(t, t.updateQueue), jl(t), null);
      case 4:
        return Ol(), l === null && Lc(t.stateNode.containerInfo), jl(t), null;
      case 10:
        return Lt(t.type), jl(t), null;
      case 19:
        if (E(Ml), a = t.memoizedState, a === null) return jl(t), null;
        if (n = (t.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) en(a, !1);
          else {
            if (_l !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (u = Pn(l), u !== null) {
                  for (t.flags |= 128, en(a, !1), l = u.updateQueue, t.updateQueue = l, ou(t, l), t.subtreeFlags = 0, l = e, e = t.child; e !== null; )
                    yf(e, l), e = e.sibling;
                  return _(
                    Ml,
                    Ml.current & 1 | 2
                  ), nl && Yt(t, a.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            a.tail !== null && ut() > gu && (t.flags |= 128, n = !0, en(a, !1), t.lanes = 4194304);
          }
        else {
          if (!n)
            if (l = Pn(u), l !== null) {
              if (t.flags |= 128, n = !0, l = l.updateQueue, t.updateQueue = l, ou(t, l), en(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !nl)
                return jl(t), null;
            } else
              2 * ut() - a.renderingStartTime > gu && e !== 536870912 && (t.flags |= 128, n = !0, en(a, !1), t.lanes = 4194304);
          a.isBackwards ? (u.sibling = t.child, t.child = u) : (l = a.last, l !== null ? l.sibling = u : t.child = u, a.last = u);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = ut(), l.sibling = null, e = Ml.current, _(
          Ml,
          n ? e & 1 | 2 : e & 1
        ), nl && Yt(t, a.treeForkCount), l) : (jl(t), null);
      case 22:
      case 23:
        return dt(t), Qi(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (e & 536870912) !== 0 && (t.flags & 128) === 0 && (jl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : jl(t), e = t.updateQueue, e !== null && ou(t, e.retryQueue), e = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== e && (t.flags |= 2048), l !== null && E(Re), null;
      case 24:
        return e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), Lt(Dl), jl(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(m(156, t.tag));
  }
  function cm(l, t) {
    switch (zi(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return Lt(Dl), Ol(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return En(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (dt(t), t.alternate === null)
            throw Error(m(340));
          Ce();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (dt(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(m(340));
          Ce();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return E(Ml), null;
      case 4:
        return Ol(), null;
      case 10:
        return Lt(t.type), null;
      case 22:
      case 23:
        return dt(t), Qi(), l !== null && E(Re), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return Lt(Dl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Zr(l, t) {
    switch (zi(t), t.tag) {
      case 3:
        Lt(Dl), Ol();
        break;
      case 26:
      case 27:
      case 5:
        En(t);
        break;
      case 4:
        Ol();
        break;
      case 31:
        t.memoizedState !== null && dt(t);
        break;
      case 13:
        dt(t);
        break;
      case 19:
        E(Ml);
        break;
      case 10:
        Lt(t.type);
        break;
      case 22:
      case 23:
        dt(t), Qi(), l !== null && E(Re);
        break;
      case 24:
        Lt(Dl);
    }
  }
  function an(l, t) {
    try {
      var e = t.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        e = n;
        do {
          if ((e.tag & l) === l) {
            a = void 0;
            var u = e.create, i = e.inst;
            a = u(), i.destroy = a;
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (s) {
      ml(t, t.return, s);
    }
  }
  function re(l, t, e) {
    try {
      var a = t.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & l) === l) {
            var i = a.inst, s = i.destroy;
            if (s !== void 0) {
              i.destroy = void 0, n = t;
              var f = e, y = s;
              try {
                y();
              } catch (S) {
                ml(
                  n,
                  f,
                  S
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (S) {
      ml(t, t.return, S);
    }
  }
  function Vr(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        Rf(t, e);
      } catch (a) {
        ml(l, l.return, a);
      }
    }
  }
  function Kr(l, t, e) {
    e.props = Ge(
      l.type,
      l.memoizedProps
    ), e.state = l.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      ml(l, t, a);
    }
  }
  function nn(l, t) {
    try {
      var e = l.ref;
      if (e !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var a = l.stateNode;
            break;
          case 30:
            a = l.stateNode;
            break;
          default:
            a = l.stateNode;
        }
        typeof e == "function" ? l.refCleanup = e(a) : e.current = a;
      }
    } catch (n) {
      ml(l, t, n);
    }
  }
  function Dt(l, t) {
    var e = l.ref, a = l.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          ml(l, t, n);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (n) {
          ml(l, t, n);
        }
      else e.current = null;
  }
  function Jr(l) {
    var t = l.type, e = l.memoizedProps, a = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break l;
        case "img":
          e.src ? a.src = e.src : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (n) {
      ml(l, l.return, n);
    }
  }
  function pc(l, t, e) {
    try {
      var a = l.stateNode;
      Om(a, l.type, e, t), a[Il] = t;
    } catch (n) {
      ml(l, l.return, n);
    }
  }
  function wr(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && ge(l.type) || l.tag === 4;
  }
  function Sc(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || wr(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && ge(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function jc(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(l, t) : (t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, t.appendChild(l), e = e._reactRootContainer, e != null || t.onclick !== null || (t.onclick = Ht));
    else if (a !== 4 && (a === 27 && ge(l.type) && (e = l.stateNode, t = null), l = l.child, l !== null))
      for (jc(l, t, e), l = l.sibling; l !== null; )
        jc(l, t, e), l = l.sibling;
  }
  function hu(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? e.insertBefore(l, t) : e.appendChild(l);
    else if (a !== 4 && (a === 27 && ge(l.type) && (e = l.stateNode), l = l.child, l !== null))
      for (hu(l, t, e), l = l.sibling; l !== null; )
        hu(l, t, e), l = l.sibling;
  }
  function kr(l) {
    var t = l.stateNode, e = l.memoizedProps;
    try {
      for (var a = l.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      wl(t, a, e), t[Zl] = l, t[Il] = e;
    } catch (u) {
      ml(l, l.return, u);
    }
  }
  var Kt = !1, Hl = !1, xc = !1, $r = typeof WeakSet == "function" ? WeakSet : Set, Xl = null;
  function sm(l, t) {
    if (l = l.containerInfo, Zc = Ru, l = cf(l), vi(l)) {
      if ("selectionStart" in l)
        var e = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        l: {
          e = (e = l.ownerDocument) && e.defaultView || window;
          var a = e.getSelection && e.getSelection();
          if (a && a.rangeCount !== 0) {
            e = a.anchorNode;
            var n = a.anchorOffset, u = a.focusNode;
            a = a.focusOffset;
            try {
              e.nodeType, u.nodeType;
            } catch {
              e = null;
              break l;
            }
            var i = 0, s = -1, f = -1, y = 0, S = 0, A = l, g = null;
            t: for (; ; ) {
              for (var b; A !== e || n !== 0 && A.nodeType !== 3 || (s = i + n), A !== u || a !== 0 && A.nodeType !== 3 || (f = i + a), A.nodeType === 3 && (i += A.nodeValue.length), (b = A.firstChild) !== null; )
                g = A, A = b;
              for (; ; ) {
                if (A === l) break t;
                if (g === e && ++y === n && (s = i), g === u && ++S === a && (f = i), (b = A.nextSibling) !== null) break;
                A = g, g = A.parentNode;
              }
              A = b;
            }
            e = s === -1 || f === -1 ? null : { start: s, end: f };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Vc = { focusedElem: l, selectionRange: e }, Ru = !1, Xl = t; Xl !== null; )
      if (t = Xl, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null)
        l.return = t, Xl = l;
      else
        for (; Xl !== null; ) {
          switch (t = Xl, u = t.alternate, l = t.flags, t.tag) {
            case 0:
              if ((l & 4) !== 0 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null))
                for (e = 0; e < l.length; e++)
                  n = l[e], n.ref.impl = n.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && u !== null) {
                l = void 0, e = t, n = u.memoizedProps, u = u.memoizedState, a = e.stateNode;
                try {
                  var C = Ge(
                    e.type,
                    n
                  );
                  l = a.getSnapshotBeforeUpdate(
                    C,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = l;
                } catch (G) {
                  ml(
                    e,
                    e.return,
                    G
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = t.stateNode.containerInfo, e = l.nodeType, e === 9)
                  wc(l);
                else if (e === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      wc(l);
                      break;
                    default:
                      l.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((l & 1024) !== 0) throw Error(m(163));
          }
          if (l = t.sibling, l !== null) {
            l.return = t.return, Xl = l;
            break;
          }
          Xl = t.return;
        }
  }
  function Wr(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        wt(l, e), a & 4 && an(5, e);
        break;
      case 1:
        if (wt(l, e), a & 4)
          if (l = e.stateNode, t === null)
            try {
              l.componentDidMount();
            } catch (i) {
              ml(e, e.return, i);
            }
          else {
            var n = Ge(
              e.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              l.componentDidUpdate(
                n,
                t,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              ml(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && Vr(e), a & 512 && nn(e, e.return);
        break;
      case 3:
        if (wt(l, e), a & 64 && (l = e.updateQueue, l !== null)) {
          if (t = null, e.child !== null)
            switch (e.child.tag) {
              case 27:
              case 5:
                t = e.child.stateNode;
                break;
              case 1:
                t = e.child.stateNode;
            }
          try {
            Rf(l, t);
          } catch (i) {
            ml(e, e.return, i);
          }
        }
        break;
      case 27:
        t === null && a & 4 && kr(e);
      case 26:
      case 5:
        wt(l, e), t === null && a & 4 && Jr(e), a & 512 && nn(e, e.return);
        break;
      case 12:
        wt(l, e);
        break;
      case 31:
        wt(l, e), a & 4 && Pr(l, e);
        break;
      case 13:
        wt(l, e), a & 4 && ld(l, e), a & 64 && (l = e.memoizedState, l !== null && (l = l.dehydrated, l !== null && (e = gm.bind(
          null,
          e
        ), qm(l, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || Kt, !a) {
          t = t !== null && t.memoizedState !== null || Hl, n = Kt;
          var u = Hl;
          Kt = a, (Hl = t) && !u ? kt(
            l,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : wt(l, e), Kt = n, Hl = u;
        }
        break;
      case 30:
        break;
      default:
        wt(l, e);
    }
  }
  function Fr(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, Fr(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && Iu(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var Tl = null, lt = !1;
  function Jt(l, t, e) {
    for (e = e.child; e !== null; )
      Ir(l, t, e), e = e.sibling;
  }
  function Ir(l, t, e) {
    if (it && typeof it.onCommitFiberUnmount == "function")
      try {
        it.onCommitFiberUnmount(_a, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        Hl || Dt(e, t), Jt(
          l,
          t,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Hl || Dt(e, t);
        var a = Tl, n = lt;
        ge(e.type) && (Tl = e.stateNode, lt = !1), Jt(
          l,
          t,
          e
        ), mn(e.stateNode), Tl = a, lt = n;
        break;
      case 5:
        Hl || Dt(e, t);
      case 6:
        if (a = Tl, n = lt, Tl = null, Jt(
          l,
          t,
          e
        ), Tl = a, lt = n, Tl !== null)
          if (lt)
            try {
              (Tl.nodeType === 9 ? Tl.body : Tl.nodeName === "HTML" ? Tl.ownerDocument.body : Tl).removeChild(e.stateNode);
            } catch (u) {
              ml(
                e,
                t,
                u
              );
            }
          else
            try {
              Tl.removeChild(e.stateNode);
            } catch (u) {
              ml(
                e,
                t,
                u
              );
            }
        break;
      case 18:
        Tl !== null && (lt ? (l = Tl, Vd(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          e.stateNode
        ), za(l)) : Vd(Tl, e.stateNode));
        break;
      case 4:
        a = Tl, n = lt, Tl = e.stateNode.containerInfo, lt = !0, Jt(
          l,
          t,
          e
        ), Tl = a, lt = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        re(2, e, t), Hl || re(4, e, t), Jt(
          l,
          t,
          e
        );
        break;
      case 1:
        Hl || (Dt(e, t), a = e.stateNode, typeof a.componentWillUnmount == "function" && Kr(
          e,
          t,
          a
        )), Jt(
          l,
          t,
          e
        );
        break;
      case 21:
        Jt(
          l,
          t,
          e
        );
        break;
      case 22:
        Hl = (a = Hl) || e.memoizedState !== null, Jt(
          l,
          t,
          e
        ), Hl = a;
        break;
      default:
        Jt(
          l,
          t,
          e
        );
    }
  }
  function Pr(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        za(l);
      } catch (e) {
        ml(t, t.return, e);
      }
    }
  }
  function ld(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        za(l);
      } catch (e) {
        ml(t, t.return, e);
      }
  }
  function fm(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new $r()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new $r()), t;
      default:
        throw Error(m(435, l.tag));
    }
  }
  function mu(l, t) {
    var e = fm(l);
    t.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var n = bm.bind(null, l, a);
        a.then(n, n);
      }
    });
  }
  function tt(l, t) {
    var e = t.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var n = e[a], u = l, i = t, s = i;
        l: for (; s !== null; ) {
          switch (s.tag) {
            case 27:
              if (ge(s.type)) {
                Tl = s.stateNode, lt = !1;
                break l;
              }
              break;
            case 5:
              Tl = s.stateNode, lt = !1;
              break l;
            case 3:
            case 4:
              Tl = s.stateNode.containerInfo, lt = !0;
              break l;
          }
          s = s.return;
        }
        if (Tl === null) throw Error(m(160));
        Ir(u, i, n), Tl = null, lt = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        td(t, l), t = t.sibling;
  }
  var Nt = null;
  function td(l, t) {
    var e = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        tt(t, l), et(l), a & 4 && (re(3, l, l.return), an(3, l), re(5, l, l.return));
        break;
      case 1:
        tt(t, l), et(l), a & 512 && (Hl || e === null || Dt(e, e.return)), a & 64 && Kt && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (e = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var n = Nt;
        if (tt(t, l), et(l), a & 512 && (Hl || e === null || Dt(e, e.return)), a & 4) {
          var u = e !== null ? e.memoizedState : null;
          if (a = l.memoizedState, e === null)
            if (a === null)
              if (l.stateNode === null) {
                l: {
                  a = l.type, e = l.memoizedProps, n = n.ownerDocument || n;
                  t: switch (a) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[Ca] || u[Zl] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), wl(u, a, e), u[Zl] = l, Ql(u), a = u;
                      break l;
                    case "link":
                      var i = to(
                        "link",
                        "href",
                        n
                      ).get(a + (e.href || ""));
                      if (i) {
                        for (var s = 0; s < i.length; s++)
                          if (u = i[s], u.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && u.getAttribute("rel") === (e.rel == null ? null : e.rel) && u.getAttribute("title") === (e.title == null ? null : e.title) && u.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            i.splice(s, 1);
                            break t;
                          }
                      }
                      u = n.createElement(a), wl(u, a, e), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (i = to(
                        "meta",
                        "content",
                        n
                      ).get(a + (e.content || ""))) {
                        for (s = 0; s < i.length; s++)
                          if (u = i[s], u.getAttribute("content") === (e.content == null ? null : "" + e.content) && u.getAttribute("name") === (e.name == null ? null : e.name) && u.getAttribute("property") === (e.property == null ? null : e.property) && u.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && u.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            i.splice(s, 1);
                            break t;
                          }
                      }
                      u = n.createElement(a), wl(u, a, e), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(m(468, a));
                  }
                  u[Zl] = l, Ql(u), a = u;
                }
                l.stateNode = a;
              } else
                eo(
                  n,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = lo(
                n,
                a,
                l.memoizedProps
              );
          else
            u !== a ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, a === null ? eo(
              n,
              l.type,
              l.stateNode
            ) : lo(
              n,
              a,
              l.memoizedProps
            )) : a === null && l.stateNode !== null && pc(
              l,
              l.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        tt(t, l), et(l), a & 512 && (Hl || e === null || Dt(e, e.return)), e !== null && a & 4 && pc(
          l,
          l.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (tt(t, l), et(l), a & 512 && (Hl || e === null || Dt(e, e.return)), l.flags & 32) {
          n = l.stateNode;
          try {
            $e(n, "");
          } catch (C) {
            ml(l, l.return, C);
          }
        }
        a & 4 && l.stateNode != null && (n = l.memoizedProps, pc(
          l,
          n,
          e !== null ? e.memoizedProps : n
        )), a & 1024 && (xc = !0);
        break;
      case 6:
        if (tt(t, l), et(l), a & 4) {
          if (l.stateNode === null)
            throw Error(m(162));
          a = l.memoizedProps, e = l.stateNode;
          try {
            e.nodeValue = a;
          } catch (C) {
            ml(l, l.return, C);
          }
        }
        break;
      case 3:
        if (Mu = null, n = Nt, Nt = _u(t.containerInfo), tt(t, l), Nt = n, et(l), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            za(t.containerInfo);
          } catch (C) {
            ml(l, l.return, C);
          }
        xc && (xc = !1, ed(l));
        break;
      case 4:
        a = Nt, Nt = _u(
          l.stateNode.containerInfo
        ), tt(t, l), et(l), Nt = a;
        break;
      case 12:
        tt(t, l), et(l);
        break;
      case 31:
        tt(t, l), et(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, mu(l, a)));
        break;
      case 13:
        tt(t, l), et(l), l.child.flags & 8192 && l.memoizedState !== null != (e !== null && e.memoizedState !== null) && (yu = ut()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, mu(l, a)));
        break;
      case 22:
        n = l.memoizedState !== null;
        var f = e !== null && e.memoizedState !== null, y = Kt, S = Hl;
        if (Kt = y || n, Hl = S || f, tt(t, l), Hl = S, Kt = y, et(l), a & 8192)
          l: for (t = l.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, n && (e === null || f || Kt || Hl || Le(l)), e = null, t = l; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (e === null) {
                f = e = t;
                try {
                  if (u = f.stateNode, n)
                    i = u.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    s = f.stateNode;
                    var A = f.memoizedProps.style, g = A != null && A.hasOwnProperty("display") ? A.display : null;
                    s.style.display = g == null || typeof g == "boolean" ? "" : ("" + g).trim();
                  }
                } catch (C) {
                  ml(f, f.return, C);
                }
              }
            } else if (t.tag === 6) {
              if (e === null) {
                f = t;
                try {
                  f.stateNode.nodeValue = n ? "" : f.memoizedProps;
                } catch (C) {
                  ml(f, f.return, C);
                }
              }
            } else if (t.tag === 18) {
              if (e === null) {
                f = t;
                try {
                  var b = f.stateNode;
                  n ? Kd(b, !0) : Kd(f.stateNode, !1);
                } catch (C) {
                  ml(f, f.return, C);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === l) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === l) break l;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === l) break l;
              e === t && (e = null), t = t.return;
            }
            e === t && (e = null), t.sibling.return = t.return, t = t.sibling;
          }
        a & 4 && (a = l.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, mu(l, e))));
        break;
      case 19:
        tt(t, l), et(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, mu(l, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        tt(t, l), et(l);
    }
  }
  function et(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var e, a = l.return; a !== null; ) {
          if (wr(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(m(160));
        switch (e.tag) {
          case 27:
            var n = e.stateNode, u = Sc(l);
            hu(l, u, n);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && ($e(i, ""), e.flags &= -33);
            var s = Sc(l);
            hu(l, s, i);
            break;
          case 3:
          case 4:
            var f = e.stateNode.containerInfo, y = Sc(l);
            jc(
              l,
              y,
              f
            );
            break;
          default:
            throw Error(m(161));
        }
      } catch (S) {
        ml(l, l.return, S);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function ed(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        ed(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
      }
  }
  function wt(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Wr(l, t.alternate, t), t = t.sibling;
  }
  function Le(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          re(4, t, t.return), Le(t);
          break;
        case 1:
          Dt(t, t.return);
          var e = t.stateNode;
          typeof e.componentWillUnmount == "function" && Kr(
            t,
            t.return,
            e
          ), Le(t);
          break;
        case 27:
          mn(t.stateNode);
        case 26:
        case 5:
          Dt(t, t.return), Le(t);
          break;
        case 22:
          t.memoizedState === null && Le(t);
          break;
        case 30:
          Le(t);
          break;
        default:
          Le(t);
      }
      l = l.sibling;
    }
  }
  function kt(l, t, e) {
    for (e = e && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, n = l, u = t, i = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          kt(
            n,
            u,
            e
          ), an(4, u);
          break;
        case 1:
          if (kt(
            n,
            u,
            e
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (y) {
              ml(a, a.return, y);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var s = a.stateNode;
            try {
              var f = n.shared.hiddenCallbacks;
              if (f !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < f.length; n++)
                  Uf(f[n], s);
            } catch (y) {
              ml(a, a.return, y);
            }
          }
          e && i & 64 && Vr(u), nn(u, u.return);
          break;
        case 27:
          kr(u);
        case 26:
        case 5:
          kt(
            n,
            u,
            e
          ), e && a === null && i & 4 && Jr(u), nn(u, u.return);
          break;
        case 12:
          kt(
            n,
            u,
            e
          );
          break;
        case 31:
          kt(
            n,
            u,
            e
          ), e && i & 4 && Pr(n, u);
          break;
        case 13:
          kt(
            n,
            u,
            e
          ), e && i & 4 && ld(n, u);
          break;
        case 22:
          u.memoizedState === null && kt(
            n,
            u,
            e
          ), nn(u, u.return);
          break;
        case 30:
          break;
        default:
          kt(
            n,
            u,
            e
          );
      }
      t = t.sibling;
    }
  }
  function Ec(l, t) {
    var e = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== e && (l != null && l.refCount++, e != null && Va(e));
  }
  function Ac(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Va(l));
  }
  function _t(l, t, e, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ad(
          l,
          t,
          e,
          a
        ), t = t.sibling;
  }
  function ad(l, t, e, a) {
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        _t(
          l,
          t,
          e,
          a
        ), n & 2048 && an(9, t);
        break;
      case 1:
        _t(
          l,
          t,
          e,
          a
        );
        break;
      case 3:
        _t(
          l,
          t,
          e,
          a
        ), n & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Va(l)));
        break;
      case 12:
        if (n & 2048) {
          _t(
            l,
            t,
            e,
            a
          ), l = t.stateNode;
          try {
            var u = t.memoizedProps, i = u.id, s = u.onPostCommit;
            typeof s == "function" && s(
              i,
              t.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (f) {
            ml(t, t.return, f);
          }
        } else
          _t(
            l,
            t,
            e,
            a
          );
        break;
      case 31:
        _t(
          l,
          t,
          e,
          a
        );
        break;
      case 13:
        _t(
          l,
          t,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, i = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? _t(
          l,
          t,
          e,
          a
        ) : un(l, t) : u._visibility & 2 ? _t(
          l,
          t,
          e,
          a
        ) : (u._visibility |= 2, va(
          l,
          t,
          e,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), n & 2048 && Ec(i, t);
        break;
      case 24:
        _t(
          l,
          t,
          e,
          a
        ), n & 2048 && Ac(t.alternate, t);
        break;
      default:
        _t(
          l,
          t,
          e,
          a
        );
    }
  }
  function va(l, t, e, a, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = l, i = t, s = e, f = a, y = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          va(
            u,
            i,
            s,
            f,
            n
          ), an(8, i);
          break;
        case 23:
          break;
        case 22:
          var S = i.stateNode;
          i.memoizedState !== null ? S._visibility & 2 ? va(
            u,
            i,
            s,
            f,
            n
          ) : un(
            u,
            i
          ) : (S._visibility |= 2, va(
            u,
            i,
            s,
            f,
            n
          )), n && y & 2048 && Ec(
            i.alternate,
            i
          );
          break;
        case 24:
          va(
            u,
            i,
            s,
            f,
            n
          ), n && y & 2048 && Ac(i.alternate, i);
          break;
        default:
          va(
            u,
            i,
            s,
            f,
            n
          );
      }
      t = t.sibling;
    }
  }
  function un(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var e = l, a = t, n = a.flags;
        switch (a.tag) {
          case 22:
            un(e, a), n & 2048 && Ec(
              a.alternate,
              a
            );
            break;
          case 24:
            un(e, a), n & 2048 && Ac(a.alternate, a);
            break;
          default:
            un(e, a);
        }
        t = t.sibling;
      }
  }
  var cn = 8192;
  function ya(l, t, e) {
    if (l.subtreeFlags & cn)
      for (l = l.child; l !== null; )
        nd(
          l,
          t,
          e
        ), l = l.sibling;
  }
  function nd(l, t, e) {
    switch (l.tag) {
      case 26:
        ya(
          l,
          t,
          e
        ), l.flags & cn && l.memoizedState !== null && $m(
          e,
          Nt,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        ya(
          l,
          t,
          e
        );
        break;
      case 3:
      case 4:
        var a = Nt;
        Nt = _u(l.stateNode.containerInfo), ya(
          l,
          t,
          e
        ), Nt = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = cn, cn = 16777216, ya(
          l,
          t,
          e
        ), cn = a) : ya(
          l,
          t,
          e
        ));
        break;
      default:
        ya(
          l,
          t,
          e
        );
    }
  }
  function ud(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function sn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          Xl = a, cd(
            a,
            l
          );
        }
      ud(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        id(l), l = l.sibling;
  }
  function id(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        sn(l), l.flags & 2048 && re(9, l, l.return);
        break;
      case 3:
        sn(l);
        break;
      case 12:
        sn(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, vu(l)) : sn(l);
        break;
      default:
        sn(l);
    }
  }
  function vu(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          Xl = a, cd(
            a,
            l
          );
        }
      ud(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          re(8, t, t.return), vu(t);
          break;
        case 22:
          e = t.stateNode, e._visibility & 2 && (e._visibility &= -3, vu(t));
          break;
        default:
          vu(t);
      }
      l = l.sibling;
    }
  }
  function cd(l, t) {
    for (; Xl !== null; ) {
      var e = Xl;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          re(8, e, t);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Va(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, Xl = a;
      else
        l: for (e = l; Xl !== null; ) {
          a = Xl;
          var n = a.sibling, u = a.return;
          if (Fr(a), a === e) {
            Xl = null;
            break l;
          }
          if (n !== null) {
            n.return = u, Xl = n;
            break l;
          }
          Xl = u;
        }
    }
  }
  var rm = {
    getCacheForType: function(l) {
      var t = Kl(Dl), e = t.data.get(l);
      return e === void 0 && (e = l(), t.data.set(l, e)), e;
    },
    cacheSignal: function() {
      return Kl(Dl).controller.signal;
    }
  }, dm = typeof WeakMap == "function" ? WeakMap : Map, rl = 0, bl = null, P = null, el = 0, hl = 0, ot = null, de = !1, ga = !1, Tc = !1, $t = 0, _l = 0, oe = 0, Qe = 0, zc = 0, ht = 0, ba = 0, fn = null, at = null, Nc = !1, yu = 0, sd = 0, gu = 1 / 0, bu = null, he = null, Yl = 0, me = null, pa = null, Wt = 0, _c = 0, Oc = null, fd = null, rn = 0, Mc = null;
  function mt() {
    return (rl & 2) !== 0 && el !== 0 ? el & -el : o.T !== null ? Bc() : As();
  }
  function rd() {
    if (ht === 0)
      if ((el & 536870912) === 0 || nl) {
        var l = zn;
        zn <<= 1, (zn & 3932160) === 0 && (zn = 262144), ht = l;
      } else ht = 536870912;
    return l = rt.current, l !== null && (l.flags |= 32), ht;
  }
  function nt(l, t, e) {
    (l === bl && (hl === 2 || hl === 9) || l.cancelPendingCommit !== null) && (Sa(l, 0), ve(
      l,
      el,
      ht,
      !1
    )), Ma(l, e), ((rl & 2) === 0 || l !== bl) && (l === bl && ((rl & 2) === 0 && (Qe |= e), _l === 4 && ve(
      l,
      el,
      ht,
      !1
    )), Ut(l));
  }
  function dd(l, t, e) {
    if ((rl & 6) !== 0) throw Error(m(327));
    var a = !e && (t & 127) === 0 && (t & l.expiredLanes) === 0 || Oa(l, t), n = a ? mm(l, t) : Dc(l, t, !0), u = a;
    do {
      if (n === 0) {
        ga && !a && ve(l, t, 0, !1);
        break;
      } else {
        if (e = l.current.alternate, u && !om(e)) {
          n = Dc(l, t, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = t, l.errorRecoveryDisabledLanes & u)
            var i = 0;
          else
            i = l.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            t = i;
            l: {
              var s = l;
              n = fn;
              var f = s.current.memoizedState.isDehydrated;
              if (f && (Sa(s, i).flags |= 256), i = Dc(
                s,
                i,
                !1
              ), i !== 2) {
                if (Tc && !f) {
                  s.errorRecoveryDisabledLanes |= u, Qe |= u, n = 4;
                  break l;
                }
                u = at, at = n, u !== null && (at === null ? at = u : at.push.apply(
                  at,
                  u
                ));
              }
              n = i;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Sa(l, 0), ve(l, t, 0, !0);
          break;
        }
        l: {
          switch (a = l, u = n, u) {
            case 0:
            case 1:
              throw Error(m(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ve(
                a,
                t,
                ht,
                !de
              );
              break l;
            case 2:
              at = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(m(329));
          }
          if ((t & 62914560) === t && (n = yu + 300 - ut(), 10 < n)) {
            if (ve(
              a,
              t,
              ht,
              !de
            ), _n(a, 0, !0) !== 0) break l;
            Wt = t, a.timeoutHandle = Xd(
              od.bind(
                null,
                a,
                e,
                at,
                bu,
                Nc,
                t,
                ht,
                Qe,
                ba,
                de,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break l;
          }
          od(
            a,
            e,
            at,
            bu,
            Nc,
            t,
            ht,
            Qe,
            ba,
            de,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Ut(l);
  }
  function od(l, t, e, a, n, u, i, s, f, y, S, A, g, b) {
    if (l.timeoutHandle = -1, A = t.subtreeFlags, A & 8192 || (A & 16785408) === 16785408) {
      A = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ht
      }, nd(
        t,
        u,
        A
      );
      var C = (u & 62914560) === u ? yu - ut() : (u & 4194048) === u ? sd - ut() : 0;
      if (C = Wm(
        A,
        C
      ), C !== null) {
        Wt = u, l.cancelPendingCommit = C(
          Sd.bind(
            null,
            l,
            t,
            u,
            e,
            a,
            n,
            i,
            s,
            f,
            S,
            A,
            null,
            g,
            b
          )
        ), ve(l, u, i, !y);
        return;
      }
    }
    Sd(
      l,
      t,
      u,
      e,
      a,
      n,
      i,
      s,
      f
    );
  }
  function om(l) {
    for (var t = l; ; ) {
      var e = t.tag;
      if ((e === 0 || e === 11 || e === 15) && t.flags & 16384 && (e = t.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var n = e[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!st(u(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (e = t.child, t.subtreeFlags & 16384 && e !== null)
        e.return = t, t = e;
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function ve(l, t, e, a) {
    t &= ~zc, t &= ~Qe, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var n = t; 0 < n; ) {
      var u = 31 - ct(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    e !== 0 && js(l, e, t);
  }
  function pu() {
    return (rl & 6) === 0 ? (dn(0), !1) : !0;
  }
  function Cc() {
    if (P !== null) {
      if (hl === 0)
        var l = P.return;
      else
        l = P, Gt = De = null, wi(l), ra = null, Ja = 0, l = P;
      for (; l !== null; )
        Zr(l.alternate, l), l = l.return;
      P = null;
    }
  }
  function Sa(l, t) {
    var e = l.timeoutHandle;
    e !== -1 && (l.timeoutHandle = -1, Dm(e)), e = l.cancelPendingCommit, e !== null && (l.cancelPendingCommit = null, e()), Wt = 0, Cc(), bl = l, P = e = qt(l.current, null), el = t, hl = 0, ot = null, de = !1, ga = Oa(l, t), Tc = !1, ba = ht = zc = Qe = oe = _l = 0, at = fn = null, Nc = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var n = 31 - ct(a), u = 1 << n;
        t |= l[n], a &= ~u;
      }
    return $t = t, Ln(), e;
  }
  function hd(l, t) {
    J = null, o.H = ln, t === fa || t === kn ? (t = Of(), hl = 3) : t === Hi ? (t = Of(), hl = 4) : hl = t === fc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, ot = t, P === null && (_l = 1, su(
      l,
      pt(t, l.current)
    ));
  }
  function md() {
    var l = rt.current;
    return l === null ? !0 : (el & 4194048) === el ? Et === null : (el & 62914560) === el || (el & 536870912) !== 0 ? l === Et : !1;
  }
  function vd() {
    var l = o.H;
    return o.H = ln, l === null ? ln : l;
  }
  function yd() {
    var l = o.A;
    return o.A = rm, l;
  }
  function Su() {
    _l = 4, de || (el & 4194048) !== el && rt.current !== null || (ga = !0), (oe & 134217727) === 0 && (Qe & 134217727) === 0 || bl === null || ve(
      bl,
      el,
      ht,
      !1
    );
  }
  function Dc(l, t, e) {
    var a = rl;
    rl |= 2;
    var n = vd(), u = yd();
    (bl !== l || el !== t) && (bu = null, Sa(l, t)), t = !1;
    var i = _l;
    l: do
      try {
        if (hl !== 0 && P !== null) {
          var s = P, f = ot;
          switch (hl) {
            case 8:
              Cc(), i = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              rt.current === null && (t = !0);
              var y = hl;
              if (hl = 0, ot = null, ja(l, s, f, y), e && ga) {
                i = 0;
                break l;
              }
              break;
            default:
              y = hl, hl = 0, ot = null, ja(l, s, f, y);
          }
        }
        hm(), i = _l;
        break;
      } catch (S) {
        hd(l, S);
      }
    while (!0);
    return t && l.shellSuspendCounter++, Gt = De = null, rl = a, o.H = n, o.A = u, P === null && (bl = null, el = 0, Ln()), i;
  }
  function hm() {
    for (; P !== null; ) gd(P);
  }
  function mm(l, t) {
    var e = rl;
    rl |= 2;
    var a = vd(), n = yd();
    bl !== l || el !== t ? (bu = null, gu = ut() + 500, Sa(l, t)) : ga = Oa(
      l,
      t
    );
    l: do
      try {
        if (hl !== 0 && P !== null) {
          t = P;
          var u = ot;
          t: switch (hl) {
            case 1:
              hl = 0, ot = null, ja(l, t, u, 1);
              break;
            case 2:
            case 9:
              if (Nf(u)) {
                hl = 0, ot = null, bd(t);
                break;
              }
              t = function() {
                hl !== 2 && hl !== 9 || bl !== l || (hl = 7), Ut(l);
              }, u.then(t, t);
              break l;
            case 3:
              hl = 7;
              break l;
            case 4:
              hl = 5;
              break l;
            case 7:
              Nf(u) ? (hl = 0, ot = null, bd(t)) : (hl = 0, ot = null, ja(l, t, u, 7));
              break;
            case 5:
              var i = null;
              switch (P.tag) {
                case 26:
                  i = P.memoizedState;
                case 5:
                case 27:
                  var s = P;
                  if (i ? ao(i) : s.stateNode.complete) {
                    hl = 0, ot = null;
                    var f = s.sibling;
                    if (f !== null) P = f;
                    else {
                      var y = s.return;
                      y !== null ? (P = y, ju(y)) : P = null;
                    }
                    break t;
                  }
              }
              hl = 0, ot = null, ja(l, t, u, 5);
              break;
            case 6:
              hl = 0, ot = null, ja(l, t, u, 6);
              break;
            case 8:
              Cc(), _l = 6;
              break l;
            default:
              throw Error(m(462));
          }
        }
        vm();
        break;
      } catch (S) {
        hd(l, S);
      }
    while (!0);
    return Gt = De = null, o.H = a, o.A = n, rl = e, P !== null ? 0 : (bl = null, el = 0, Ln(), _l);
  }
  function vm() {
    for (; P !== null && !Yo(); )
      gd(P);
  }
  function gd(l) {
    var t = Qr(l.alternate, l, $t);
    l.memoizedProps = l.pendingProps, t === null ? ju(l) : P = t;
  }
  function bd(l) {
    var t = l, e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Hr(
          e,
          t,
          t.pendingProps,
          t.type,
          void 0,
          el
        );
        break;
      case 11:
        t = Hr(
          e,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          el
        );
        break;
      case 5:
        wi(t);
      default:
        Zr(e, t), t = P = yf(t, $t), t = Qr(e, t, $t);
    }
    l.memoizedProps = l.pendingProps, t === null ? ju(l) : P = t;
  }
  function ja(l, t, e, a) {
    Gt = De = null, wi(t), ra = null, Ja = 0;
    var n = t.return;
    try {
      if (am(
        l,
        n,
        t,
        e,
        el
      )) {
        _l = 1, su(
          l,
          pt(e, l.current)
        ), P = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw P = n, u;
      _l = 1, su(
        l,
        pt(e, l.current)
      ), P = null;
      return;
    }
    t.flags & 32768 ? (nl || a === 1 ? l = !0 : ga || (el & 536870912) !== 0 ? l = !1 : (de = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = rt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), pd(t, l)) : ju(t);
  }
  function ju(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        pd(
          t,
          de
        );
        return;
      }
      l = t.return;
      var e = im(
        t.alternate,
        t,
        $t
      );
      if (e !== null) {
        P = e;
        return;
      }
      if (t = t.sibling, t !== null) {
        P = t;
        return;
      }
      P = t = l;
    } while (t !== null);
    _l === 0 && (_l = 5);
  }
  function pd(l, t) {
    do {
      var e = cm(l.alternate, l);
      if (e !== null) {
        e.flags &= 32767, P = e;
        return;
      }
      if (e = l.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !t && (l = l.sibling, l !== null)) {
        P = l;
        return;
      }
      P = l = e;
    } while (l !== null);
    _l = 6, P = null;
  }
  function Sd(l, t, e, a, n, u, i, s, f) {
    l.cancelPendingCommit = null;
    do
      xu();
    while (Yl !== 0);
    if ((rl & 6) !== 0) throw Error(m(327));
    if (t !== null) {
      if (t === l.current) throw Error(m(177));
      if (u = t.lanes | t.childLanes, u |= Si, ko(
        l,
        e,
        u,
        i,
        s,
        f
      ), l === bl && (P = bl = null, el = 0), pa = t, me = l, Wt = e, _c = u, Oc = n, fd = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, pm(An, function() {
        return Td(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = o.T, o.T = null, n = T.p, T.p = 2, i = rl, rl |= 4;
        try {
          sm(l, t, e);
        } finally {
          rl = i, T.p = n, o.T = a;
        }
      }
      Yl = 1, jd(), xd(), Ed();
    }
  }
  function jd() {
    if (Yl === 1) {
      Yl = 0;
      var l = me, t = pa, e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        e = o.T, o.T = null;
        var a = T.p;
        T.p = 2;
        var n = rl;
        rl |= 4;
        try {
          td(t, l);
          var u = Vc, i = cf(l.containerInfo), s = u.focusedElem, f = u.selectionRange;
          if (i !== s && s && s.ownerDocument && uf(
            s.ownerDocument.documentElement,
            s
          )) {
            if (f !== null && vi(s)) {
              var y = f.start, S = f.end;
              if (S === void 0 && (S = y), "selectionStart" in s)
                s.selectionStart = y, s.selectionEnd = Math.min(
                  S,
                  s.value.length
                );
              else {
                var A = s.ownerDocument || document, g = A && A.defaultView || window;
                if (g.getSelection) {
                  var b = g.getSelection(), C = s.textContent.length, G = Math.min(f.start, C), gl = f.end === void 0 ? G : Math.min(f.end, C);
                  !b.extend && G > gl && (i = gl, gl = G, G = i);
                  var h = nf(
                    s,
                    G
                  ), r = nf(
                    s,
                    gl
                  );
                  if (h && r && (b.rangeCount !== 1 || b.anchorNode !== h.node || b.anchorOffset !== h.offset || b.focusNode !== r.node || b.focusOffset !== r.offset)) {
                    var v = A.createRange();
                    v.setStart(h.node, h.offset), b.removeAllRanges(), G > gl ? (b.addRange(v), b.extend(r.node, r.offset)) : (v.setEnd(r.node, r.offset), b.addRange(v));
                  }
                }
              }
            }
            for (A = [], b = s; b = b.parentNode; )
              b.nodeType === 1 && A.push({
                element: b,
                left: b.scrollLeft,
                top: b.scrollTop
              });
            for (typeof s.focus == "function" && s.focus(), s = 0; s < A.length; s++) {
              var j = A[s];
              j.element.scrollLeft = j.left, j.element.scrollTop = j.top;
            }
          }
          Ru = !!Zc, Vc = Zc = null;
        } finally {
          rl = n, T.p = a, o.T = e;
        }
      }
      l.current = t, Yl = 2;
    }
  }
  function xd() {
    if (Yl === 2) {
      Yl = 0;
      var l = me, t = pa, e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        e = o.T, o.T = null;
        var a = T.p;
        T.p = 2;
        var n = rl;
        rl |= 4;
        try {
          Wr(l, t.alternate, t);
        } finally {
          rl = n, T.p = a, o.T = e;
        }
      }
      Yl = 3;
    }
  }
  function Ed() {
    if (Yl === 4 || Yl === 3) {
      Yl = 0, Go();
      var l = me, t = pa, e = Wt, a = fd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Yl = 5 : (Yl = 0, pa = me = null, Ad(l, l.pendingLanes));
      var n = l.pendingLanes;
      if (n === 0 && (he = null), Wu(e), t = t.stateNode, it && typeof it.onCommitFiberRoot == "function")
        try {
          it.onCommitFiberRoot(
            _a,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = o.T, n = T.p, T.p = 2, o.T = null;
        try {
          for (var u = l.onRecoverableError, i = 0; i < a.length; i++) {
            var s = a[i];
            u(s.value, {
              componentStack: s.stack
            });
          }
        } finally {
          o.T = t, T.p = n;
        }
      }
      (Wt & 3) !== 0 && xu(), Ut(l), n = l.pendingLanes, (e & 261930) !== 0 && (n & 42) !== 0 ? l === Mc ? rn++ : (rn = 0, Mc = l) : rn = 0, dn(0);
    }
  }
  function Ad(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, Va(t)));
  }
  function xu() {
    return jd(), xd(), Ed(), Td();
  }
  function Td() {
    if (Yl !== 5) return !1;
    var l = me, t = _c;
    _c = 0;
    var e = Wu(Wt), a = o.T, n = T.p;
    try {
      T.p = 32 > e ? 32 : e, o.T = null, e = Oc, Oc = null;
      var u = me, i = Wt;
      if (Yl = 0, pa = me = null, Wt = 0, (rl & 6) !== 0) throw Error(m(331));
      var s = rl;
      if (rl |= 4, id(u.current), ad(
        u,
        u.current,
        i,
        e
      ), rl = s, dn(0, !1), it && typeof it.onPostCommitFiberRoot == "function")
        try {
          it.onPostCommitFiberRoot(_a, u);
        } catch {
        }
      return !0;
    } finally {
      T.p = n, o.T = a, Ad(l, t);
    }
  }
  function zd(l, t, e) {
    t = pt(e, t), t = sc(l.stateNode, t, 2), l = ce(l, t, 2), l !== null && (Ma(l, 2), Ut(l));
  }
  function ml(l, t, e) {
    if (l.tag === 3)
      zd(l, l, e);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          zd(
            t,
            l,
            e
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (he === null || !he.has(a))) {
            l = pt(e, l), e = Nr(2), a = ce(t, e, 2), a !== null && (_r(
              e,
              a,
              t,
              l
            ), Ma(a, 2), Ut(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function Uc(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new dm();
      var n = /* @__PURE__ */ new Set();
      a.set(t, n);
    } else
      n = a.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(t, n));
    n.has(e) || (Tc = !0, n.add(e), l = ym.bind(null, l, t, e), t.then(l, l));
  }
  function ym(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & e, l.warmLanes &= ~e, bl === l && (el & e) === e && (_l === 4 || _l === 3 && (el & 62914560) === el && 300 > ut() - yu ? (rl & 2) === 0 && Sa(l, 0) : zc |= e, ba === el && (ba = 0)), Ut(l);
  }
  function Nd(l, t) {
    t === 0 && (t = Ss()), l = Oe(l, t), l !== null && (Ma(l, t), Ut(l));
  }
  function gm(l) {
    var t = l.memoizedState, e = 0;
    t !== null && (e = t.retryLane), Nd(l, e);
  }
  function bm(l, t) {
    var e = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var a = l.stateNode, n = l.memoizedState;
        n !== null && (e = n.retryLane);
        break;
      case 19:
        a = l.stateNode;
        break;
      case 22:
        a = l.stateNode._retryCache;
        break;
      default:
        throw Error(m(314));
    }
    a !== null && a.delete(t), Nd(l, e);
  }
  function pm(l, t) {
    return Ju(l, t);
  }
  var Eu = null, xa = null, Rc = !1, Au = !1, Hc = !1, ye = 0;
  function Ut(l) {
    l !== xa && l.next === null && (xa === null ? Eu = xa = l : xa = xa.next = l), Au = !0, Rc || (Rc = !0, jm());
  }
  function dn(l, t) {
    if (!Hc && Au) {
      Hc = !0;
      do
        for (var e = !1, a = Eu; a !== null; ) {
          if (l !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, s = a.pingedLanes;
              u = (1 << 31 - ct(42 | l) + 1) - 1, u &= n & ~(i & ~s), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (e = !0, Cd(a, u));
          } else
            u = el, u = _n(
              a,
              a === bl ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Oa(a, u) || (e = !0, Cd(a, u));
          a = a.next;
        }
      while (e);
      Hc = !1;
    }
  }
  function Sm() {
    _d();
  }
  function _d() {
    Au = Rc = !1;
    var l = 0;
    ye !== 0 && Cm() && (l = ye);
    for (var t = ut(), e = null, a = Eu; a !== null; ) {
      var n = a.next, u = Od(a, t);
      u === 0 ? (a.next = null, e === null ? Eu = n : e.next = n, n === null && (xa = e)) : (e = a, (l !== 0 || (u & 3) !== 0) && (Au = !0)), a = n;
    }
    Yl !== 0 && Yl !== 5 || dn(l), ye !== 0 && (ye = 0);
  }
  function Od(l, t) {
    for (var e = l.suspendedLanes, a = l.pingedLanes, n = l.expirationTimes, u = l.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - ct(u), s = 1 << i, f = n[i];
      f === -1 ? ((s & e) === 0 || (s & a) !== 0) && (n[i] = wo(s, t)) : f <= t && (l.expiredLanes |= s), u &= ~s;
    }
    if (t = bl, e = el, e = _n(
      l,
      l === t ? e : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a = l.callbackNode, e === 0 || l === t && (hl === 2 || hl === 9) || l.cancelPendingCommit !== null)
      return a !== null && a !== null && wu(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((e & 3) === 0 || Oa(l, e)) {
      if (t = e & -e, t === l.callbackPriority) return t;
      switch (a !== null && wu(a), Wu(e)) {
        case 2:
        case 8:
          e = bs;
          break;
        case 32:
          e = An;
          break;
        case 268435456:
          e = ps;
          break;
        default:
          e = An;
      }
      return a = Md.bind(null, l), e = Ju(e, a), l.callbackPriority = t, l.callbackNode = e, t;
    }
    return a !== null && a !== null && wu(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Md(l, t) {
    if (Yl !== 0 && Yl !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var e = l.callbackNode;
    if (xu() && l.callbackNode !== e)
      return null;
    var a = el;
    return a = _n(
      l,
      l === bl ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a === 0 ? null : (dd(l, a, t), Od(l, ut()), l.callbackNode != null && l.callbackNode === e ? Md.bind(null, l) : null);
  }
  function Cd(l, t) {
    if (xu()) return null;
    dd(l, t, !0);
  }
  function jm() {
    Um(function() {
      (rl & 6) !== 0 ? Ju(
        gs,
        Sm
      ) : _d();
    });
  }
  function Bc() {
    if (ye === 0) {
      var l = ca;
      l === 0 && (l = Tn, Tn <<= 1, (Tn & 261888) === 0 && (Tn = 256)), ye = l;
    }
    return ye;
  }
  function Dd(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Dn("" + l);
  }
  function Ud(l, t) {
    var e = t.ownerDocument.createElement("input");
    return e.name = t.name, e.value = t.value, l.id && e.setAttribute("form", l.id), t.parentNode.insertBefore(e, t), l = new FormData(l), e.parentNode.removeChild(e), l;
  }
  function xm(l, t, e, a, n) {
    if (t === "submit" && e && e.stateNode === n) {
      var u = Dd(
        (n[Il] || null).action
      ), i = a.submitter;
      i && (t = (t = i[Il] || null) ? Dd(t.formAction) : i.getAttribute("formAction"), t !== null && (u = t, i = null));
      var s = new Bn(
        "action",
        "action",
        null,
        a,
        n
      );
      l.push({
        event: s,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (ye !== 0) {
                  var f = i ? Ud(n, i) : new FormData(n);
                  ec(
                    e,
                    {
                      pending: !0,
                      data: f,
                      method: n.method,
                      action: u
                    },
                    null,
                    f
                  );
                }
              } else
                typeof u == "function" && (s.preventDefault(), f = i ? Ud(n, i) : new FormData(n), ec(
                  e,
                  {
                    pending: !0,
                    data: f,
                    method: n.method,
                    action: u
                  },
                  u,
                  f
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var qc = 0; qc < pi.length; qc++) {
    var Yc = pi[qc], Em = Yc.toLowerCase(), Am = Yc[0].toUpperCase() + Yc.slice(1);
    zt(
      Em,
      "on" + Am
    );
  }
  zt(rf, "onAnimationEnd"), zt(df, "onAnimationIteration"), zt(of, "onAnimationStart"), zt("dblclick", "onDoubleClick"), zt("focusin", "onFocus"), zt("focusout", "onBlur"), zt(Lh, "onTransitionRun"), zt(Qh, "onTransitionStart"), zt(Xh, "onTransitionCancel"), zt(hf, "onTransitionEnd"), we("onMouseEnter", ["mouseout", "mouseover"]), we("onMouseLeave", ["mouseout", "mouseover"]), we("onPointerEnter", ["pointerout", "pointerover"]), we("onPointerLeave", ["pointerout", "pointerover"]), Te(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Te(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Te("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Te(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Te(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Te(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var on = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Tm = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(on)
  );
  function Rd(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e], n = a.event;
      a = a.listeners;
      l: {
        var u = void 0;
        if (t)
          for (var i = a.length - 1; 0 <= i; i--) {
            var s = a[i], f = s.instance, y = s.currentTarget;
            if (s = s.listener, f !== u && n.isPropagationStopped())
              break l;
            u = s, n.currentTarget = y;
            try {
              u(n);
            } catch (S) {
              Gn(S);
            }
            n.currentTarget = null, u = f;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (s = a[i], f = s.instance, y = s.currentTarget, s = s.listener, f !== u && n.isPropagationStopped())
              break l;
            u = s, n.currentTarget = y;
            try {
              u(n);
            } catch (S) {
              Gn(S);
            }
            n.currentTarget = null, u = f;
          }
      }
    }
  }
  function ll(l, t) {
    var e = t[Fu];
    e === void 0 && (e = t[Fu] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    e.has(a) || (Hd(t, l, 2, !1), e.add(a));
  }
  function Gc(l, t, e) {
    var a = 0;
    t && (a |= 4), Hd(
      e,
      l,
      a,
      t
    );
  }
  var Tu = "_reactListening" + Math.random().toString(36).slice(2);
  function Lc(l) {
    if (!l[Tu]) {
      l[Tu] = !0, Ns.forEach(function(e) {
        e !== "selectionchange" && (Tm.has(e) || Gc(e, !1, l), Gc(e, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Tu] || (t[Tu] = !0, Gc("selectionchange", !1, t));
    }
  }
  function Hd(l, t, e, a) {
    switch (ro(t)) {
      case 2:
        var n = Pm;
        break;
      case 8:
        n = lv;
        break;
      default:
        n = ts;
    }
    e = n.bind(
      null,
      t,
      e,
      l
    ), n = void 0, !ii || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), a ? n !== void 0 ? l.addEventListener(t, e, {
      capture: !0,
      passive: n
    }) : l.addEventListener(t, e, !0) : n !== void 0 ? l.addEventListener(t, e, {
      passive: n
    }) : l.addEventListener(t, e, !1);
  }
  function Qc(l, t, e, a, n) {
    var u = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      l: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var s = a.stateNode.containerInfo;
          if (s === n) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var f = i.tag;
              if ((f === 3 || f === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; s !== null; ) {
            if (i = Ve(s), i === null) return;
            if (f = i.tag, f === 5 || f === 6 || f === 26 || f === 27) {
              a = u = i;
              continue l;
            }
            s = s.parentNode;
          }
        }
        a = a.return;
      }
    Gs(function() {
      var y = u, S = ni(e), A = [];
      l: {
        var g = mf.get(l);
        if (g !== void 0) {
          var b = Bn, C = l;
          switch (l) {
            case "keypress":
              if (Rn(e) === 0) break l;
            case "keydown":
            case "keyup":
              b = bh;
              break;
            case "focusin":
              C = "focus", b = ri;
              break;
            case "focusout":
              C = "blur", b = ri;
              break;
            case "beforeblur":
            case "afterblur":
              b = ri;
              break;
            case "click":
              if (e.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              b = Xs;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              b = ih;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              b = jh;
              break;
            case rf:
            case df:
            case of:
              b = fh;
              break;
            case hf:
              b = Eh;
              break;
            case "scroll":
            case "scrollend":
              b = nh;
              break;
            case "wheel":
              b = Th;
              break;
            case "copy":
            case "cut":
            case "paste":
              b = dh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              b = Vs;
              break;
            case "toggle":
            case "beforetoggle":
              b = Nh;
          }
          var G = (t & 4) !== 0, gl = !G && (l === "scroll" || l === "scrollend"), h = G ? g !== null ? g + "Capture" : null : g;
          G = [];
          for (var r = y, v; r !== null; ) {
            var j = r;
            if (v = j.stateNode, j = j.tag, j !== 5 && j !== 26 && j !== 27 || v === null || h === null || (j = Ua(r, h), j != null && G.push(
              hn(r, j, v)
            )), gl) break;
            r = r.return;
          }
          0 < G.length && (g = new b(
            g,
            C,
            null,
            e,
            S
          ), A.push({ event: g, listeners: G }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (g = l === "mouseover" || l === "pointerover", b = l === "mouseout" || l === "pointerout", g && e !== ai && (C = e.relatedTarget || e.fromElement) && (Ve(C) || C[Ze]))
            break l;
          if ((b || g) && (g = S.window === S ? S : (g = S.ownerDocument) ? g.defaultView || g.parentWindow : window, b ? (C = e.relatedTarget || e.toElement, b = y, C = C ? Ve(C) : null, C !== null && (gl = W(C), G = C.tag, C !== gl || G !== 5 && G !== 27 && G !== 6) && (C = null)) : (b = null, C = y), b !== C)) {
            if (G = Xs, j = "onMouseLeave", h = "onMouseEnter", r = "mouse", (l === "pointerout" || l === "pointerover") && (G = Vs, j = "onPointerLeave", h = "onPointerEnter", r = "pointer"), gl = b == null ? g : Da(b), v = C == null ? g : Da(C), g = new G(
              j,
              r + "leave",
              b,
              e,
              S
            ), g.target = gl, g.relatedTarget = v, j = null, Ve(S) === y && (G = new G(
              h,
              r + "enter",
              C,
              e,
              S
            ), G.target = v, G.relatedTarget = gl, j = G), gl = j, b && C)
              t: {
                for (G = zm, h = b, r = C, v = 0, j = h; j; j = G(j))
                  v++;
                j = 0;
                for (var Y = r; Y; Y = G(Y))
                  j++;
                for (; 0 < v - j; )
                  h = G(h), v--;
                for (; 0 < j - v; )
                  r = G(r), j--;
                for (; v--; ) {
                  if (h === r || r !== null && h === r.alternate) {
                    G = h;
                    break t;
                  }
                  h = G(h), r = G(r);
                }
                G = null;
              }
            else G = null;
            b !== null && Bd(
              A,
              g,
              b,
              G,
              !1
            ), C !== null && gl !== null && Bd(
              A,
              gl,
              C,
              G,
              !0
            );
          }
        }
        l: {
          if (g = y ? Da(y) : window, b = g.nodeName && g.nodeName.toLowerCase(), b === "select" || b === "input" && g.type === "file")
            var sl = Is;
          else if (Ws(g))
            if (Ps)
              sl = qh;
            else {
              sl = Hh;
              var H = Rh;
            }
          else
            b = g.nodeName, !b || b.toLowerCase() !== "input" || g.type !== "checkbox" && g.type !== "radio" ? y && ei(y.elementType) && (sl = Is) : sl = Bh;
          if (sl && (sl = sl(l, y))) {
            Fs(
              A,
              sl,
              e,
              S
            );
            break l;
          }
          H && H(l, g, y), l === "focusout" && y && g.type === "number" && y.memoizedProps.value != null && ti(g, "number", g.value);
        }
        switch (H = y ? Da(y) : window, l) {
          case "focusin":
            (Ws(H) || H.contentEditable === "true") && (Pe = H, yi = y, Qa = null);
            break;
          case "focusout":
            Qa = yi = Pe = null;
            break;
          case "mousedown":
            gi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            gi = !1, sf(A, e, S);
            break;
          case "selectionchange":
            if (Gh) break;
          case "keydown":
          case "keyup":
            sf(A, e, S);
        }
        var k;
        if (oi)
          l: {
            switch (l) {
              case "compositionstart":
                var al = "onCompositionStart";
                break l;
              case "compositionend":
                al = "onCompositionEnd";
                break l;
              case "compositionupdate":
                al = "onCompositionUpdate";
                break l;
            }
            al = void 0;
          }
        else
          Ie ? ks(l, e) && (al = "onCompositionEnd") : l === "keydown" && e.keyCode === 229 && (al = "onCompositionStart");
        al && (Ks && e.locale !== "ko" && (Ie || al !== "onCompositionStart" ? al === "onCompositionEnd" && Ie && (k = Ls()) : (le = S, ci = "value" in le ? le.value : le.textContent, Ie = !0)), H = zu(y, al), 0 < H.length && (al = new Zs(
          al,
          l,
          null,
          e,
          S
        ), A.push({ event: al, listeners: H }), k ? al.data = k : (k = $s(e), k !== null && (al.data = k)))), (k = Oh ? Mh(l, e) : Ch(l, e)) && (al = zu(y, "onBeforeInput"), 0 < al.length && (H = new Zs(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          S
        ), A.push({
          event: H,
          listeners: al
        }), H.data = k)), xm(
          A,
          l,
          y,
          e,
          S
        );
      }
      Rd(A, t);
    });
  }
  function hn(l, t, e) {
    return {
      instance: l,
      listener: t,
      currentTarget: e
    };
  }
  function zu(l, t) {
    for (var e = t + "Capture", a = []; l !== null; ) {
      var n = l, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Ua(l, e), n != null && a.unshift(
        hn(l, n, u)
      ), n = Ua(l, t), n != null && a.push(
        hn(l, n, u)
      )), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function zm(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Bd(l, t, e, a, n) {
    for (var u = t._reactName, i = []; e !== null && e !== a; ) {
      var s = e, f = s.alternate, y = s.stateNode;
      if (s = s.tag, f !== null && f === a) break;
      s !== 5 && s !== 26 && s !== 27 || y === null || (f = y, n ? (y = Ua(e, u), y != null && i.unshift(
        hn(e, y, f)
      )) : n || (y = Ua(e, u), y != null && i.push(
        hn(e, y, f)
      ))), e = e.return;
    }
    i.length !== 0 && l.push({ event: t, listeners: i });
  }
  var Nm = /\r\n?/g, _m = /\u0000|\uFFFD/g;
  function qd(l) {
    return (typeof l == "string" ? l : "" + l).replace(Nm, `
`).replace(_m, "");
  }
  function Yd(l, t) {
    return t = qd(t), qd(l) === t;
  }
  function yl(l, t, e, a, n, u) {
    switch (e) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || $e(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && $e(l, "" + a);
        break;
      case "className":
        Mn(l, "class", a);
        break;
      case "tabIndex":
        Mn(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Mn(l, e, a);
        break;
      case "style":
        qs(l, a, u);
        break;
      case "data":
        if (t !== "object") {
          Mn(l, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || e !== "href")) {
          l.removeAttribute(e);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = Dn("" + a), l.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (e === "formAction" ? (t !== "input" && yl(l, t, "name", n.name, n, null), yl(
            l,
            t,
            "formEncType",
            n.formEncType,
            n,
            null
          ), yl(
            l,
            t,
            "formMethod",
            n.formMethod,
            n,
            null
          ), yl(
            l,
            t,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (yl(l, t, "encType", n.encType, n, null), yl(l, t, "method", n.method, n, null), yl(l, t, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = Dn("" + a), l.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (l.onclick = Ht);
        break;
      case "onScroll":
        a != null && ll("scroll", l);
        break;
      case "onScrollEnd":
        a != null && ll("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(m(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(m(60));
            l.innerHTML = e;
          }
        }
        break;
      case "multiple":
        l.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        l.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        e = Dn("" + a), l.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          e
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, "" + a) : l.removeAttribute(e);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, "") : l.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === !0 ? l.setAttribute(e, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, a) : l.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? l.setAttribute(e, a) : l.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? l.removeAttribute(e) : l.setAttribute(e, a);
        break;
      case "popover":
        ll("beforetoggle", l), ll("toggle", l), On(l, "popover", a);
        break;
      case "xlinkActuate":
        Rt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Rt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Rt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Rt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Rt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Rt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Rt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Rt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Rt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        On(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = eh.get(e) || e, On(l, e, a));
    }
  }
  function Xc(l, t, e, a, n, u) {
    switch (e) {
      case "style":
        qs(l, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(m(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(m(60));
            l.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? $e(l, a) : (typeof a == "number" || typeof a == "bigint") && $e(l, "" + a);
        break;
      case "onScroll":
        a != null && ll("scroll", l);
        break;
      case "onScrollEnd":
        a != null && ll("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = Ht);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!_s.hasOwnProperty(e))
          l: {
            if (e[0] === "o" && e[1] === "n" && (n = e.endsWith("Capture"), t = e.slice(2, n ? e.length - 7 : void 0), u = l[Il] || null, u = u != null ? u[e] : null, typeof u == "function" && l.removeEventListener(t, u, n), typeof a == "function")) {
              typeof u != "function" && u !== null && (e in l ? l[e] = null : l.hasAttribute(e) && l.removeAttribute(e)), l.addEventListener(t, a, n);
              break l;
            }
            e in l ? l[e] = a : a === !0 ? l.setAttribute(e, "") : On(l, e, a);
          }
    }
  }
  function wl(l, t, e) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        ll("error", l), ll("load", l);
        var a = !1, n = !1, u;
        for (u in e)
          if (e.hasOwnProperty(u)) {
            var i = e[u];
            if (i != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(m(137, t));
                default:
                  yl(l, t, u, i, e, null);
              }
          }
        n && yl(l, t, "srcSet", e.srcSet, e, null), a && yl(l, t, "src", e.src, e, null);
        return;
      case "input":
        ll("invalid", l);
        var s = u = i = n = null, f = null, y = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var S = e[a];
            if (S != null)
              switch (a) {
                case "name":
                  n = S;
                  break;
                case "type":
                  i = S;
                  break;
                case "checked":
                  f = S;
                  break;
                case "defaultChecked":
                  y = S;
                  break;
                case "value":
                  u = S;
                  break;
                case "defaultValue":
                  s = S;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (S != null)
                    throw Error(m(137, t));
                  break;
                default:
                  yl(l, t, a, S, e, null);
              }
          }
        Us(
          l,
          u,
          s,
          f,
          y,
          i,
          n,
          !1
        );
        return;
      case "select":
        ll("invalid", l), a = i = u = null;
        for (n in e)
          if (e.hasOwnProperty(n) && (s = e[n], s != null))
            switch (n) {
              case "value":
                u = s;
                break;
              case "defaultValue":
                i = s;
                break;
              case "multiple":
                a = s;
              default:
                yl(l, t, n, s, e, null);
            }
        t = u, e = i, l.multiple = !!a, t != null ? ke(l, !!a, t, !1) : e != null && ke(l, !!a, e, !0);
        return;
      case "textarea":
        ll("invalid", l), u = n = a = null;
        for (i in e)
          if (e.hasOwnProperty(i) && (s = e[i], s != null))
            switch (i) {
              case "value":
                a = s;
                break;
              case "defaultValue":
                n = s;
                break;
              case "children":
                u = s;
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(m(91));
                break;
              default:
                yl(l, t, i, s, e, null);
            }
        Hs(l, a, n, u);
        return;
      case "option":
        for (f in e)
          if (e.hasOwnProperty(f) && (a = e[f], a != null))
            switch (f) {
              case "selected":
                l.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                yl(l, t, f, a, e, null);
            }
        return;
      case "dialog":
        ll("beforetoggle", l), ll("toggle", l), ll("cancel", l), ll("close", l);
        break;
      case "iframe":
      case "object":
        ll("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < on.length; a++)
          ll(on[a], l);
        break;
      case "image":
        ll("error", l), ll("load", l);
        break;
      case "details":
        ll("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        ll("error", l), ll("load", l);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (y in e)
          if (e.hasOwnProperty(y) && (a = e[y], a != null))
            switch (y) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(m(137, t));
              default:
                yl(l, t, y, a, e, null);
            }
        return;
      default:
        if (ei(t)) {
          for (S in e)
            e.hasOwnProperty(S) && (a = e[S], a !== void 0 && Xc(
              l,
              t,
              S,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (s in e)
      e.hasOwnProperty(s) && (a = e[s], a != null && yl(l, t, s, a, e, null));
  }
  function Om(l, t, e, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var n = null, u = null, i = null, s = null, f = null, y = null, S = null;
        for (b in e) {
          var A = e[b];
          if (e.hasOwnProperty(b) && A != null)
            switch (b) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                f = A;
              default:
                a.hasOwnProperty(b) || yl(l, t, b, null, a, A);
            }
        }
        for (var g in a) {
          var b = a[g];
          if (A = e[g], a.hasOwnProperty(g) && (b != null || A != null))
            switch (g) {
              case "type":
                u = b;
                break;
              case "name":
                n = b;
                break;
              case "checked":
                y = b;
                break;
              case "defaultChecked":
                S = b;
                break;
              case "value":
                i = b;
                break;
              case "defaultValue":
                s = b;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (b != null)
                  throw Error(m(137, t));
                break;
              default:
                b !== A && yl(
                  l,
                  t,
                  g,
                  b,
                  a,
                  A
                );
            }
        }
        li(
          l,
          i,
          s,
          f,
          y,
          S,
          u,
          n
        );
        return;
      case "select":
        b = i = s = g = null;
        for (u in e)
          if (f = e[u], e.hasOwnProperty(u) && f != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                b = f;
              default:
                a.hasOwnProperty(u) || yl(
                  l,
                  t,
                  u,
                  null,
                  a,
                  f
                );
            }
        for (n in a)
          if (u = a[n], f = e[n], a.hasOwnProperty(n) && (u != null || f != null))
            switch (n) {
              case "value":
                g = u;
                break;
              case "defaultValue":
                s = u;
                break;
              case "multiple":
                i = u;
              default:
                u !== f && yl(
                  l,
                  t,
                  n,
                  u,
                  a,
                  f
                );
            }
        t = s, e = i, a = b, g != null ? ke(l, !!e, g, !1) : !!a != !!e && (t != null ? ke(l, !!e, t, !0) : ke(l, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        b = g = null;
        for (s in e)
          if (n = e[s], e.hasOwnProperty(s) && n != null && !a.hasOwnProperty(s))
            switch (s) {
              case "value":
                break;
              case "children":
                break;
              default:
                yl(l, t, s, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = e[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                g = n;
                break;
              case "defaultValue":
                b = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(m(91));
                break;
              default:
                n !== u && yl(l, t, i, n, a, u);
            }
        Rs(l, g, b);
        return;
      case "option":
        for (var C in e)
          if (g = e[C], e.hasOwnProperty(C) && g != null && !a.hasOwnProperty(C))
            switch (C) {
              case "selected":
                l.selected = !1;
                break;
              default:
                yl(
                  l,
                  t,
                  C,
                  null,
                  a,
                  g
                );
            }
        for (f in a)
          if (g = a[f], b = e[f], a.hasOwnProperty(f) && g !== b && (g != null || b != null))
            switch (f) {
              case "selected":
                l.selected = g && typeof g != "function" && typeof g != "symbol";
                break;
              default:
                yl(
                  l,
                  t,
                  f,
                  g,
                  a,
                  b
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var G in e)
          g = e[G], e.hasOwnProperty(G) && g != null && !a.hasOwnProperty(G) && yl(l, t, G, null, a, g);
        for (y in a)
          if (g = a[y], b = e[y], a.hasOwnProperty(y) && g !== b && (g != null || b != null))
            switch (y) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (g != null)
                  throw Error(m(137, t));
                break;
              default:
                yl(
                  l,
                  t,
                  y,
                  g,
                  a,
                  b
                );
            }
        return;
      default:
        if (ei(t)) {
          for (var gl in e)
            g = e[gl], e.hasOwnProperty(gl) && g !== void 0 && !a.hasOwnProperty(gl) && Xc(
              l,
              t,
              gl,
              void 0,
              a,
              g
            );
          for (S in a)
            g = a[S], b = e[S], !a.hasOwnProperty(S) || g === b || g === void 0 && b === void 0 || Xc(
              l,
              t,
              S,
              g,
              a,
              b
            );
          return;
        }
    }
    for (var h in e)
      g = e[h], e.hasOwnProperty(h) && g != null && !a.hasOwnProperty(h) && yl(l, t, h, null, a, g);
    for (A in a)
      g = a[A], b = e[A], !a.hasOwnProperty(A) || g === b || g == null && b == null || yl(l, t, A, g, a, b);
  }
  function Gd(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Mm() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var n = e[a], u = n.transferSize, i = n.initiatorType, s = n.duration;
        if (u && s && Gd(i)) {
          for (i = 0, s = n.responseEnd, a += 1; a < e.length; a++) {
            var f = e[a], y = f.startTime;
            if (y > s) break;
            var S = f.transferSize, A = f.initiatorType;
            S && Gd(A) && (f = f.responseEnd, i += S * (f < s ? 1 : (s - y) / (f - y)));
          }
          if (--a, t += 8 * (u + i) / (n.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var Zc = null, Vc = null;
  function Nu(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Ld(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Qd(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function Kc(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Jc = null;
  function Cm() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Jc ? !1 : (Jc = l, !0) : (Jc = null, !1);
  }
  var Xd = typeof setTimeout == "function" ? setTimeout : void 0, Dm = typeof clearTimeout == "function" ? clearTimeout : void 0, Zd = typeof Promise == "function" ? Promise : void 0, Um = typeof queueMicrotask == "function" ? queueMicrotask : typeof Zd < "u" ? function(l) {
    return Zd.resolve(null).then(l).catch(Rm);
  } : Xd;
  function Rm(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function ge(l) {
    return l === "head";
  }
  function Vd(l, t) {
    var e = t, a = 0;
    do {
      var n = e.nextSibling;
      if (l.removeChild(e), n && n.nodeType === 8)
        if (e = n.data, e === "/$" || e === "/&") {
          if (a === 0) {
            l.removeChild(n), za(t);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          mn(l.ownerDocument.documentElement);
        else if (e === "head") {
          e = l.ownerDocument.head, mn(e);
          for (var u = e.firstChild; u; ) {
            var i = u.nextSibling, s = u.nodeName;
            u[Ca] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && u.rel.toLowerCase() === "stylesheet" || e.removeChild(u), u = i;
          }
        } else
          e === "body" && mn(l.ownerDocument.body);
      e = n;
    } while (e);
    za(t);
  }
  function Kd(l, t) {
    var e = l;
    l = 0;
    do {
      var a = e.nextSibling;
      if (e.nodeType === 1 ? t ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (t ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), a && a.nodeType === 8)
        if (e = a.data, e === "/$") {
          if (l === 0) break;
          l--;
        } else
          e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || l++;
      e = a;
    } while (e);
  }
  function wc(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (t = t.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          wc(e), Iu(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(e);
    }
  }
  function Hm(l, t, e, a) {
    for (; l.nodeType === 1; ) {
      var n = e;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (a) {
        if (!l[Ca])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (u = l.getAttribute("rel"), u === "stylesheet" && l.hasAttribute("data-precedence"))
                break;
              if (u !== n.rel || l.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || l.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || l.getAttribute("title") !== (n.title == null ? null : n.title))
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (u = l.getAttribute("src"), (u !== (n.src == null ? null : n.src) || l.getAttribute("type") !== (n.type == null ? null : n.type) || l.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && u && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && l.getAttribute("name") === u)
          return l;
      } else return l;
      if (l = At(l.nextSibling), l === null) break;
    }
    return null;
  }
  function Bm(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e || (l = At(l.nextSibling), l === null)) return null;
    return l;
  }
  function Jd(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = At(l.nextSibling), l === null)) return null;
    return l;
  }
  function kc(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function $c(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function qm(l, t) {
    var e = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || e.readyState !== "loading")
      t();
    else {
      var a = function() {
        t(), e.removeEventListener("DOMContentLoaded", a);
      };
      e.addEventListener("DOMContentLoaded", a), l._reactRetry = a;
    }
  }
  function At(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = l.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var Wc = null;
  function wd(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "/$" || e === "/&") {
          if (t === 0)
            return At(l.nextSibling);
          t--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function kd(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (t === 0) return l;
          t--;
        } else e !== "/$" && e !== "/&" || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function $d(l, t, e) {
    switch (t = Nu(e), l) {
      case "html":
        if (l = t.documentElement, !l) throw Error(m(452));
        return l;
      case "head":
        if (l = t.head, !l) throw Error(m(453));
        return l;
      case "body":
        if (l = t.body, !l) throw Error(m(454));
        return l;
      default:
        throw Error(m(451));
    }
  }
  function mn(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    Iu(l);
  }
  var Tt = /* @__PURE__ */ new Map(), Wd = /* @__PURE__ */ new Set();
  function _u(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var Ft = T.d;
  T.d = {
    f: Ym,
    r: Gm,
    D: Lm,
    C: Qm,
    L: Xm,
    m: Zm,
    X: Km,
    S: Vm,
    M: Jm
  };
  function Ym() {
    var l = Ft.f(), t = pu();
    return l || t;
  }
  function Gm(l) {
    var t = Ke(l);
    t !== null && t.tag === 5 && t.type === "form" ? hr(t) : Ft.r(l);
  }
  var Ea = typeof document > "u" ? null : document;
  function Fd(l, t, e) {
    var a = Ea;
    if (a && typeof t == "string" && t) {
      var n = gt(t);
      n = 'link[rel="' + l + '"][href="' + n + '"]', typeof e == "string" && (n += '[crossorigin="' + e + '"]'), Wd.has(n) || (Wd.add(n), l = { rel: l, crossOrigin: e, href: t }, a.querySelector(n) === null && (t = a.createElement("link"), wl(t, "link", l), Ql(t), a.head.appendChild(t)));
    }
  }
  function Lm(l) {
    Ft.D(l), Fd("dns-prefetch", l, null);
  }
  function Qm(l, t) {
    Ft.C(l, t), Fd("preconnect", l, t);
  }
  function Xm(l, t, e) {
    Ft.L(l, t, e);
    var a = Ea;
    if (a && l && t) {
      var n = 'link[rel="preload"][as="' + gt(t) + '"]';
      t === "image" && e && e.imageSrcSet ? (n += '[imagesrcset="' + gt(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (n += '[imagesizes="' + gt(
        e.imageSizes
      ) + '"]')) : n += '[href="' + gt(l) + '"]';
      var u = n;
      switch (t) {
        case "style":
          u = Aa(l);
          break;
        case "script":
          u = Ta(l);
      }
      Tt.has(u) || (l = M(
        {
          rel: "preload",
          href: t === "image" && e && e.imageSrcSet ? void 0 : l,
          as: t
        },
        e
      ), Tt.set(u, l), a.querySelector(n) !== null || t === "style" && a.querySelector(vn(u)) || t === "script" && a.querySelector(yn(u)) || (t = a.createElement("link"), wl(t, "link", l), Ql(t), a.head.appendChild(t)));
    }
  }
  function Zm(l, t) {
    Ft.m(l, t);
    var e = Ea;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + gt(a) + '"][href="' + gt(l) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Ta(l);
      }
      if (!Tt.has(u) && (l = M({ rel: "modulepreload", href: l }, t), Tt.set(u, l), e.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(yn(u)))
              return;
        }
        a = e.createElement("link"), wl(a, "link", l), Ql(a), e.head.appendChild(a);
      }
    }
  }
  function Vm(l, t, e) {
    Ft.S(l, t, e);
    var a = Ea;
    if (a && l) {
      var n = Je(a).hoistableStyles, u = Aa(l);
      t = t || "default";
      var i = n.get(u);
      if (!i) {
        var s = { loading: 0, preload: null };
        if (i = a.querySelector(
          vn(u)
        ))
          s.loading = 5;
        else {
          l = M(
            { rel: "stylesheet", href: l, "data-precedence": t },
            e
          ), (e = Tt.get(u)) && Fc(l, e);
          var f = i = a.createElement("link");
          Ql(f), wl(f, "link", l), f._p = new Promise(function(y, S) {
            f.onload = y, f.onerror = S;
          }), f.addEventListener("load", function() {
            s.loading |= 1;
          }), f.addEventListener("error", function() {
            s.loading |= 2;
          }), s.loading |= 4, Ou(i, t, a);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: s
        }, n.set(u, i);
      }
    }
  }
  function Km(l, t) {
    Ft.X(l, t);
    var e = Ea;
    if (e && l) {
      var a = Je(e).hoistableScripts, n = Ta(l), u = a.get(n);
      u || (u = e.querySelector(yn(n)), u || (l = M({ src: l, async: !0 }, t), (t = Tt.get(n)) && Ic(l, t), u = e.createElement("script"), Ql(u), wl(u, "link", l), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Jm(l, t) {
    Ft.M(l, t);
    var e = Ea;
    if (e && l) {
      var a = Je(e).hoistableScripts, n = Ta(l), u = a.get(n);
      u || (u = e.querySelector(yn(n)), u || (l = M({ src: l, async: !0, type: "module" }, t), (t = Tt.get(n)) && Ic(l, t), u = e.createElement("script"), Ql(u), wl(u, "link", l), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Id(l, t, e, a) {
    var n = (n = I.current) ? _u(n) : null;
    if (!n) throw Error(m(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (t = Aa(e.href), e = Je(
          n
        ).hoistableStyles, a = e.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          l = Aa(e.href);
          var u = Je(
            n
          ).hoistableStyles, i = u.get(l);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(l, i), (u = n.querySelector(
            vn(l)
          )) && !u._p && (i.instance = u, i.state.loading = 5), Tt.has(l) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Tt.set(l, e), u || wm(
            n,
            l,
            e,
            i.state
          ))), t && a === null)
            throw Error(m(528, ""));
          return i;
        }
        if (t && a !== null)
          throw Error(m(529, ""));
        return null;
      case "script":
        return t = e.async, e = e.src, typeof e == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ta(e), e = Je(
          n
        ).hoistableScripts, a = e.get(t), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(m(444, l));
    }
  }
  function Aa(l) {
    return 'href="' + gt(l) + '"';
  }
  function vn(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function Pd(l) {
    return M({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function wm(l, t, e, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), wl(t, "link", e), Ql(t), l.head.appendChild(t));
  }
  function Ta(l) {
    return '[src="' + gt(l) + '"]';
  }
  function yn(l) {
    return "script[async]" + l;
  }
  function lo(l, t, e) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = l.querySelector(
            'style[data-href~="' + gt(e.href) + '"]'
          );
          if (a)
            return t.instance = a, Ql(a), a;
          var n = M({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (l.ownerDocument || l).createElement(
            "style"
          ), Ql(a), wl(a, "style", n), Ou(a, e.precedence, l), t.instance = a;
        case "stylesheet":
          n = Aa(e.href);
          var u = l.querySelector(
            vn(n)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, Ql(u), u;
          a = Pd(e), (n = Tt.get(n)) && Fc(a, n), u = (l.ownerDocument || l).createElement("link"), Ql(u);
          var i = u;
          return i._p = new Promise(function(s, f) {
            i.onload = s, i.onerror = f;
          }), wl(u, "link", a), t.state.loading |= 4, Ou(u, e.precedence, l), t.instance = u;
        case "script":
          return u = Ta(e.src), (n = l.querySelector(
            yn(u)
          )) ? (t.instance = n, Ql(n), n) : (a = e, (n = Tt.get(u)) && (a = M({}, e), Ic(a, n)), l = l.ownerDocument || l, n = l.createElement("script"), Ql(n), wl(n, "link", a), l.head.appendChild(n), t.instance = n);
        case "void":
          return null;
        default:
          throw Error(m(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Ou(a, e.precedence, l));
    return t.instance;
  }
  function Ou(l, t, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
      var s = a[i];
      if (s.dataset.precedence === t) u = s;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(l, u.nextSibling) : (t = e.nodeType === 9 ? e.head : e, t.insertBefore(l, t.firstChild));
  }
  function Fc(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function Ic(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var Mu = null;
  function to(l, t, e) {
    if (Mu === null) {
      var a = /* @__PURE__ */ new Map(), n = Mu = /* @__PURE__ */ new Map();
      n.set(e, a);
    } else
      n = Mu, a = n.get(e), a || (a = /* @__PURE__ */ new Map(), n.set(e, a));
    if (a.has(l)) return a;
    for (a.set(l, null), e = e.getElementsByTagName(l), n = 0; n < e.length; n++) {
      var u = e[n];
      if (!(u[Ca] || u[Zl] || l === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(t) || "";
        i = l + i;
        var s = a.get(i);
        s ? s.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function eo(l, t, e) {
    l = l.ownerDocument || l, l.head.insertBefore(
      e,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function km(l, t, e) {
    if (e === 1 || t.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        switch (t.rel) {
          case "stylesheet":
            return l = t.disabled, typeof t.precedence == "string" && l == null;
          default:
            return !0;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function ao(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function $m(l, t, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var n = Aa(a.href), u = t.querySelector(
          vn(n)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = Cu.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = u, Ql(u);
          return;
        }
        u = t.ownerDocument || t, a = Pd(a), (n = Tt.get(n)) && Fc(a, n), u = u.createElement("link"), Ql(u);
        var i = u;
        i._p = new Promise(function(s, f) {
          i.onload = s, i.onerror = f;
        }), wl(u, "link", a), e.instance = u;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = Cu.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  var Pc = 0;
  function Wm(l, t) {
    return l.stylesheets && l.count === 0 && Uu(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (l.stylesheets && Uu(l, l.stylesheets), l.unsuspend) {
          var u = l.unsuspend;
          l.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < l.imgBytes && Pc === 0 && (Pc = 62500 * Mm());
      var n = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && Uu(l, l.stylesheets), l.unsuspend)) {
            var u = l.unsuspend;
            l.unsuspend = null, u();
          }
        },
        (l.imgBytes > Pc ? 50 : 800) + t
      );
      return l.unsuspend = e, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function Cu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Uu(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var Du = null;
  function Uu(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Du = /* @__PURE__ */ new Map(), t.forEach(Fm, l), Du = null, Cu.call(l));
  }
  function Fm(l, t) {
    if (!(t.state.loading & 4)) {
      var e = Du.get(l);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), Du.set(l, e);
        for (var n = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      n = t.instance, i = n.getAttribute("data-precedence"), u = e.get(i) || a, u === a && e.set(null, n), e.set(i, n), this.count++, a = Cu.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(n, l.firstChild)), t.state.loading |= 4;
    }
  }
  var gn = {
    $$typeof: El,
    Provider: null,
    Consumer: null,
    _currentValue: q,
    _currentValue2: q,
    _threadCount: 0
  };
  function Im(l, t, e, a, n, u, i, s, f) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ku(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ku(0), this.hiddenUpdates = ku(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = f, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function no(l, t, e, a, n, u, i, s, f, y, S, A) {
    return l = new Im(
      l,
      t,
      e,
      i,
      f,
      y,
      S,
      A,
      s
    ), t = 1, u === !0 && (t |= 24), u = ft(3, null, null, t), l.current = u, u.stateNode = l, t = Di(), t.refCount++, l.pooledCache = t, t.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: t
    }, Bi(u), l;
  }
  function uo(l) {
    return l ? (l = ea, l) : ea;
  }
  function io(l, t, e, a, n, u) {
    n = uo(n), a.context === null ? a.context = n : a.pendingContext = n, a = ie(t), a.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (a.callback = u), e = ce(l, a, t), e !== null && (nt(e, l, t), ka(e, l, t));
  }
  function co(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function ls(l, t) {
    co(l, t), (l = l.alternate) && co(l, t);
  }
  function so(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Oe(l, 67108864);
      t !== null && nt(t, l, 67108864), ls(l, 67108864);
    }
  }
  function fo(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = mt();
      t = $u(t);
      var e = Oe(l, t);
      e !== null && nt(e, l, t), ls(l, t);
    }
  }
  var Ru = !0;
  function Pm(l, t, e, a) {
    var n = o.T;
    o.T = null;
    var u = T.p;
    try {
      T.p = 2, ts(l, t, e, a);
    } finally {
      T.p = u, o.T = n;
    }
  }
  function lv(l, t, e, a) {
    var n = o.T;
    o.T = null;
    var u = T.p;
    try {
      T.p = 8, ts(l, t, e, a);
    } finally {
      T.p = u, o.T = n;
    }
  }
  function ts(l, t, e, a) {
    if (Ru) {
      var n = es(a);
      if (n === null)
        Qc(
          l,
          t,
          a,
          Hu,
          e
        ), oo(l, a);
      else if (ev(
        n,
        l,
        t,
        e,
        a
      ))
        a.stopPropagation();
      else if (oo(l, a), t & 4 && -1 < tv.indexOf(l)) {
        for (; n !== null; ) {
          var u = Ke(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = Ae(u.pendingLanes);
                  if (i !== 0) {
                    var s = u;
                    for (s.pendingLanes |= 2, s.entangledLanes |= 2; i; ) {
                      var f = 1 << 31 - ct(i);
                      s.entanglements[1] |= f, i &= ~f;
                    }
                    Ut(u), (rl & 6) === 0 && (gu = ut() + 500, dn(0));
                  }
                }
                break;
              case 31:
              case 13:
                s = Oe(u, 2), s !== null && nt(s, u, 2), pu(), ls(u, 2);
            }
          if (u = es(a), u === null && Qc(
            l,
            t,
            a,
            Hu,
            e
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        Qc(
          l,
          t,
          a,
          null,
          e
        );
    }
  }
  function es(l) {
    return l = ni(l), as(l);
  }
  var Hu = null;
  function as(l) {
    if (Hu = null, l = Ve(l), l !== null) {
      var t = W(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (l = V(t), l !== null) return l;
          l = null;
        } else if (e === 31) {
          if (l = tl(t), l !== null) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return Hu = l, null;
  }
  function ro(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Lo()) {
          case gs:
            return 2;
          case bs:
            return 8;
          case An:
          case Qo:
            return 32;
          case ps:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ns = !1, be = null, pe = null, Se = null, bn = /* @__PURE__ */ new Map(), pn = /* @__PURE__ */ new Map(), je = [], tv = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function oo(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        be = null;
        break;
      case "dragenter":
      case "dragleave":
        pe = null;
        break;
      case "mouseover":
      case "mouseout":
        Se = null;
        break;
      case "pointerover":
      case "pointerout":
        bn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        pn.delete(t.pointerId);
    }
  }
  function Sn(l, t, e, a, n, u) {
    return l === null || l.nativeEvent !== u ? (l = {
      blockedOn: t,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, t !== null && (t = Ke(t), t !== null && so(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), l);
  }
  function ev(l, t, e, a, n) {
    switch (t) {
      case "focusin":
        return be = Sn(
          be,
          l,
          t,
          e,
          a,
          n
        ), !0;
      case "dragenter":
        return pe = Sn(
          pe,
          l,
          t,
          e,
          a,
          n
        ), !0;
      case "mouseover":
        return Se = Sn(
          Se,
          l,
          t,
          e,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return bn.set(
          u,
          Sn(
            bn.get(u) || null,
            l,
            t,
            e,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, pn.set(
          u,
          Sn(
            pn.get(u) || null,
            l,
            t,
            e,
            a,
            n
          )
        ), !0;
    }
    return !1;
  }
  function ho(l) {
    var t = Ve(l.target);
    if (t !== null) {
      var e = W(t);
      if (e !== null) {
        if (t = e.tag, t === 13) {
          if (t = V(e), t !== null) {
            l.blockedOn = t, Ts(l.priority, function() {
              fo(e);
            });
            return;
          }
        } else if (t === 31) {
          if (t = tl(e), t !== null) {
            l.blockedOn = t, Ts(l.priority, function() {
              fo(e);
            });
            return;
          }
        } else if (t === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Bu(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = es(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        ai = a, e.target.dispatchEvent(a), ai = null;
      } else
        return t = Ke(e), t !== null && so(t), l.blockedOn = e, !1;
      t.shift();
    }
    return !0;
  }
  function mo(l, t, e) {
    Bu(l) && e.delete(t);
  }
  function av() {
    ns = !1, be !== null && Bu(be) && (be = null), pe !== null && Bu(pe) && (pe = null), Se !== null && Bu(Se) && (Se = null), bn.forEach(mo), pn.forEach(mo);
  }
  function qu(l, t) {
    l.blockedOn === t && (l.blockedOn = null, ns || (ns = !0, p.unstable_scheduleCallback(
      p.unstable_NormalPriority,
      av
    )));
  }
  var Yu = null;
  function vo(l) {
    Yu !== l && (Yu = l, p.unstable_scheduleCallback(
      p.unstable_NormalPriority,
      function() {
        Yu === l && (Yu = null);
        for (var t = 0; t < l.length; t += 3) {
          var e = l[t], a = l[t + 1], n = l[t + 2];
          if (typeof a != "function") {
            if (as(a || e) === null)
              continue;
            break;
          }
          var u = Ke(e);
          u !== null && (l.splice(t, 3), t -= 3, ec(
            u,
            {
              pending: !0,
              data: n,
              method: e.method,
              action: a
            },
            a,
            n
          ));
        }
      }
    ));
  }
  function za(l) {
    function t(f) {
      return qu(f, l);
    }
    be !== null && qu(be, l), pe !== null && qu(pe, l), Se !== null && qu(Se, l), bn.forEach(t), pn.forEach(t);
    for (var e = 0; e < je.length; e++) {
      var a = je[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < je.length && (e = je[0], e.blockedOn === null); )
      ho(e), e.blockedOn === null && je.shift();
    if (e = (l.ownerDocument || l).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var n = e[a], u = e[a + 1], i = n[Il] || null;
        if (typeof u == "function")
          i || vo(e);
        else if (i) {
          var s = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[Il] || null)
              s = i.formAction;
            else if (as(n) !== null) continue;
          } else s = i.action;
          typeof s == "function" ? e[a + 1] = s : (e.splice(a, 3), a -= 3), vo(e);
        }
      }
  }
  function yo() {
    function l(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(i) {
            return n = i;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      n !== null && (n(), n = null), a || setTimeout(e, 20);
    }
    function e() {
      if (!a && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, n = null;
      return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(e, 100), function() {
        a = !0, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), n !== null && (n(), n = null);
      };
    }
  }
  function us(l) {
    this._internalRoot = l;
  }
  Gu.prototype.render = us.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(m(409));
    var e = t.current, a = mt();
    io(e, a, l, t, null, null);
  }, Gu.prototype.unmount = us.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      io(l.current, 2, null, l, null, null), pu(), t[Ze] = null;
    }
  };
  function Gu(l) {
    this._internalRoot = l;
  }
  Gu.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = As();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < je.length && t !== 0 && t < je[e].priority; e++) ;
      je.splice(e, 0, l), e === 0 && ho(l);
    }
  };
  var go = $.version;
  if (go !== "19.2.8")
    throw Error(
      m(
        527,
        go,
        "19.2.8"
      )
    );
  T.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(m(188)) : (l = Object.keys(l).join(","), Error(m(268, l)));
    return l = x(t), l = l !== null ? N(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var nv = {
    bundleType: 0,
    version: "19.2.8",
    rendererPackageName: "react-dom",
    currentDispatcherRef: o,
    reconcilerVersion: "19.2.8"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Lu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Lu.isDisabled && Lu.supportsFiber)
      try {
        _a = Lu.inject(
          nv
        ), it = Lu;
      } catch {
      }
  }
  return xn.createRoot = function(l, t) {
    if (!R(l)) throw Error(m(299));
    var e = !1, a = "", n = Er, u = Ar, i = Tr;
    return t != null && (t.unstable_strictMode === !0 && (e = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = no(
      l,
      1,
      !1,
      null,
      null,
      e,
      a,
      null,
      n,
      u,
      i,
      yo
    ), l[Ze] = t.current, Lc(l), new us(t);
  }, xn.hydrateRoot = function(l, t, e) {
    if (!R(l)) throw Error(m(299));
    var a = !1, n = "", u = Er, i = Ar, s = Tr, f = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (s = e.onRecoverableError), e.formState !== void 0 && (f = e.formState)), t = no(
      l,
      1,
      !0,
      t,
      e ?? null,
      a,
      n,
      f,
      u,
      i,
      s,
      yo
    ), t.context = uo(null), e = t.current, a = mt(), a = $u(a), n = ie(a), n.callback = null, ce(e, n, a), e = a, t.current.lanes = e, Ma(t, e), Ut(t), l[Ze] = t.current, Lc(l), new Gu(t);
  }, xn.version = "19.2.8", xn;
}
var No;
function yv() {
  if (No) return ss.exports;
  No = 1;
  function p() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(p);
      } catch ($) {
        console.error($);
      }
  }
  return p(), ss.exports = vv(), ss.exports;
}
var Xe = yv();
const os = [
  { id: "graduate_supply_chain_analyst", title: "Graduate Supply-Chain Analyst", scenario: "Apapa Port Landed-Cost & Demurrage", description: "Landed-cost modelling, ECOWAS tariff calculation, port demurrage mitigation, and FX sensitivity analysis." },
  { id: "junior_data_analyst", title: "Junior Data Analyst", scenario: "Customer Retention, Unit Economics & SQL", description: "Customer cohort retention analysis, unit economics (LTV/CAC), and data pipeline cleaning." },
  { id: "operations_associate", title: "Operations Associate", scenario: "Haulage Margins & Turnaround Optimization", description: "Fleet dispatch haulage margins, liquidity balancing, and turnaround optimization." },
  { id: "financial_modelling_intern", title: "Financial Modelling Intern", scenario: "13-Week Cashflow Runway & Working Capital", description: "13-week cashflow forecasting, working capital optimization, and credit risk stress-testing." }
], hs = {
  unilag_econ: {
    role: "graduate_supply_chain_analyst",
    degree: "UNILAG B.Sc. Economics",
    badge: "Ada Okafor · UNILAG Economics",
    text: `University of Lagos - Department of Economics
Undergraduate Degree Course Curriculum:
ECO 101: Principles of Economics I (Microeconomics, consumer choice, elasticity, supply and demand functions)
ECO 102: Principles of Economics II (Macroeconomics, national income accounting, inflation, unemployment)
ECO 201: Quantitative Methods in Economics (Calculus for economists, linear algebra, matrix operations)
ECO 202: Economic Statistics & Data (Descriptive statistics, probability distributions, sampling techniques, index numbers)
ECO 301: Econometrics I (Classical linear regression model, OLS estimation, hypothesis testing, t-tests, F-tests, multicollinearity)
ECO 302: Econometrics II (Heteroskedasticity, autocorrelation, dummy variables, simultaneous equation models)
ECO 401: Advanced Economic Theory (General equilibrium, welfare economics)
ECO 499: Research Project / Undergraduate Dissertation (Empirical economic investigation, statistical analysis, academic report writing)`
  },
  ui_compsci: {
    role: "junior_data_analyst",
    degree: "UI B.Sc. Computer Science",
    badge: "Emeka Obi · UI Computer Science",
    text: `University of Ibadan - Department of Computer Science
B.Sc. Degree Course Curriculum:
CSC 101: Introduction to Computer Science & Problem Solving (Algorithms, flowcharts, pseudo-code)
CSC 201: Computer Programming I (Python fundamentals, data types, control structures, functions)
CSC 202: Computer Programming II (Object-oriented programming, data structures, linked lists, binary trees)
CSC 301: Database Design & Management Systems (Relational databases, SQL queries, DDL/DML, normalization, table joins, aggregation)
CSC 302: Data Structures & Algorithms (Sorting, searching, algorithmic complexity, Big-O notation)
CSC 305: Operating Systems & System Programming
CSC 401: Artificial Intelligence & Machine Learning (Supervised learning, classification, pandas preprocessing)
CSC 499: Final Year Software Engineering Capstone (System implementation, technical documentation, oral defense)`
  },
  abu_accounting: {
    role: "financial_modelling_intern",
    degree: "ABU B.Sc. Accounting",
    badge: "Zainab Bello · ABU Accounting",
    text: `Ahmadu Bello University - Department of Accounting
B.Sc. Accounting Syllabus:
ACC 101: Introduction to Financial Accounting I (Double-entry bookkeeping, trial balance, ledger accounts)
ACC 201: Financial Accounting II (Company accounts, partnership accounts, preparation of balance sheets and income statements)
ACC 202: Cost Accounting (Cost classifications, absorption costing, marginal costing, break-even analysis)
ACC 301: Management Accounting (Budgeting, budgetary control, standard costing, variance analysis)
ACC 302: Auditing & Investigation (Audit standards, internal control systems, vouching, verification of assets)
ACC 401: Advanced Financial Accounting (Group accounts, consolidated financial statements, IFRS compliance)
ACC 402: Taxation & Tax Management (Company income tax, VAT, PAYE calculation)
ACC 499: Research Project (Financial performance analysis, empirical accounting thesis)`
  }
};
function _o() {
  try {
    const p = JSON.parse(localStorage.getItem("sabi-user") || "null");
    if (p != null && p.role) return p;
  } catch {
  }
  return { role: "student", name: "Ada Okafor", alias: "Ada Okafor", university: "University of Lagos" };
}
function gv() {
  var pl, Ot, vt, Fl;
  const [p, $] = X.useState(_o), [O, m] = X.useState(location.hash.split("/")[1] || "student"), [R, W] = X.useState(hs.unilag_econ.role), [V, tl] = X.useState(hs.unilag_econ.text), [z, x] = X.useState(null), [N, M] = X.useState(null), [L, xl] = X.useState("idle"), [B, D] = X.useState(""), ul = X.useRef(null), il = X.useRef(R), Gl = X.useRef(!1), El = X.useRef(!1), Ll = O === "student-analytics", Bl = os.find((o) => o.id === R) || os[0];
  X.useEffect(() => {
    const o = (q) => {
      var F;
      return m(((F = q.detail) == null ? void 0 : F.tabId) || location.hash.split("/")[1]);
    }, T = (q) => {
      var F;
      return $(((F = q.detail) == null ? void 0 : F.user) || _o());
    };
    return window.addEventListener("sabi:navigation", o), window.addEventListener("sabi:session", T), () => {
      window.removeEventListener("sabi:navigation", o), window.removeEventListener("sabi:session", T);
    };
  }, []);
  const zl = async (o = {}) => {
    var d;
    const T = o.role || R, q = o.text ?? V, F = Object.hasOwn(o, "file") ? o.file : z;
    N != null && N.target_role && N.target_role !== T && M(null);
    const cl = new FormData();
    cl.append("target_role", T), cl.append("student_alias", p.alias || p.name || "Ada Okafor"), q.trim() && cl.append("curriculum_text", q), F && cl.append("file", F), xl("loading"), D("");
    try {
      const E = await fetch("/api/student/curriculum-gap", { method: "POST", body: cl }), _ = await E.json();
      if (!E.ok || _.status !== "success") throw new Error(_.detail || "The diagnostic could not be calculated.");
      M(_), xl("ready"), (d = window.showToast) == null || d.call(window, `Diagnostic calculated: ${_.match_percentage}% match for ${_.target_role_title}`, "success");
    } catch (E) {
      xl("error"), D(E.message || "The diagnostic could not be calculated. Please try again.");
    }
  };
  X.useEffect(() => {
    if (Ll) {
      if (!Gl.current) {
        Gl.current = !0, il.current = R, zl({ role: R, text: V });
        return;
      }
      if (El.current) {
        El.current = !1, il.current = R;
        return;
      }
      il.current !== R && (il.current = R, zl({ role: R, text: V }));
    }
  }, [Ll, R]);
  const w = (o) => {
    const T = hs[o];
    T && (El.current = T.role !== R, il.current = T.role, W(T.role), tl(T.text), x(null), ul.current && (ul.current.value = ""), zl({ role: T.role, text: T.text, file: null }));
  }, Q = (o) => {
    var T;
    o && (x(o), (T = window.showToast) == null || T.call(window, `Loaded “${o.name}”. Select Analyze to process it.`, "info"));
  }, dl = () => {
    x(null), ul.current && (ul.current.value = "");
  }, ql = () => {
    var o;
    return (o = window.startBridgeScenario) == null ? void 0 : o.call(window, R);
  }, Al = N ? Math.max(0, 100 - Number(N.cohort_percentile || 0)) : null;
  return /* @__PURE__ */ c.jsxs("div", { className: "react-curriculum space-y-5", children: [
    /* @__PURE__ */ c.jsxs("header", { className: "react-diagnostic-hero", children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("div", { className: "react-section-eyebrow", children: "YOUR NEXT STEP, MADE CLEAR" }),
        /* @__PURE__ */ c.jsx("h2", { children: "Skills diagnostic" }),
        /* @__PURE__ */ c.jsx("p", { children: "See how your coursework lines up with the skills employers ask graduates to use on the job." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-diagnostic-profile", children: [
        /* @__PURE__ */ c.jsx("div", { className: "react-profile-avatar", children: String(p.name || "A").slice(0, 1).toUpperCase() }),
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("b", { children: p.name || "Student" }),
          /* @__PURE__ */ c.jsx("span", { children: p.university || p.organization || "Student profile" })
        ] }),
        /* @__PURE__ */ c.jsx("button", { className: "btn btn-quiet btn-sm", type: "button", disabled: L === "loading", onClick: () => zl(), children: "Re-evaluate" })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: "react-diagnostic-input panel", "aria-labelledby": "diagnostic-input-heading", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "react-diagnostic-section-title", children: [
        /* @__PURE__ */ c.jsx("span", { children: "01" }),
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("h3", { id: "diagnostic-input-heading", children: "Set your target and add your coursework" }),
          /* @__PURE__ */ c.jsx("p", { children: "Choose a role, then paste a course outline or upload your syllabus." })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-diagnostic-grid", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "react-diagnostic-form", children: [
          /* @__PURE__ */ c.jsx("label", { className: "react-form-label", htmlFor: "react-curriculum-role", children: "Target commercial role" }),
          /* @__PURE__ */ c.jsx("select", { id: "react-curriculum-role", className: "field w-full", value: R, onChange: (o) => W(o.target.value), children: os.map((o) => /* @__PURE__ */ c.jsxs("option", { value: o.id, children: [
            o.title,
            " · ",
            o.scenario
          ] }, o.id)) }),
          /* @__PURE__ */ c.jsx("p", { className: "react-role-description", children: Bl.description }),
          /* @__PURE__ */ c.jsxs("div", { className: "react-preset-heading", children: [
            /* @__PURE__ */ c.jsx("span", { className: "react-form-label", children: "Start with a Nigerian degree preset" }),
            /* @__PURE__ */ c.jsx("small", { children: "Loads a sample course outline" })
          ] }),
          /* @__PURE__ */ c.jsxs("div", { className: "react-preset-list", children: [
            /* @__PURE__ */ c.jsxs("button", { type: "button", className: "react-preset", onClick: () => w("unilag_econ"), children: [
              /* @__PURE__ */ c.jsxs("span", { children: [
                /* @__PURE__ */ c.jsx("b", { children: "Economics" }),
                /* @__PURE__ */ c.jsx("small", { children: "UNILAG · B.Sc." })
              ] }),
              /* @__PURE__ */ c.jsx("i", { children: "↗" })
            ] }),
            /* @__PURE__ */ c.jsxs("button", { type: "button", className: "react-preset", onClick: () => w("ui_compsci"), children: [
              /* @__PURE__ */ c.jsxs("span", { children: [
                /* @__PURE__ */ c.jsx("b", { children: "Computer Science" }),
                /* @__PURE__ */ c.jsx("small", { children: "University of Ibadan · B.Sc." })
              ] }),
              /* @__PURE__ */ c.jsx("i", { children: "↗" })
            ] }),
            /* @__PURE__ */ c.jsxs("button", { type: "button", className: "react-preset", onClick: () => w("abu_accounting"), children: [
              /* @__PURE__ */ c.jsxs("span", { children: [
                /* @__PURE__ */ c.jsx("b", { children: "Accounting" }),
                /* @__PURE__ */ c.jsx("small", { children: "ABU · B.Sc." })
              ] }),
              /* @__PURE__ */ c.jsx("i", { children: "↗" })
            ] })
          ] }),
          /* @__PURE__ */ c.jsxs("div", { className: "react-text-label", children: [
            /* @__PURE__ */ c.jsx("label", { className: "react-form-label", htmlFor: "react-curriculum-text", children: "Course outline or syllabus" }),
            /* @__PURE__ */ c.jsx("button", { type: "button", onClick: () => tl(""), children: "Clear" })
          ] }),
          /* @__PURE__ */ c.jsx("textarea", { id: "react-curriculum-text", className: "field react-curriculum-text", value: V, onChange: (o) => tl(o.target.value), placeholder: "Paste course codes, syllabus topics, or transcript modules…" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: "react-diagnostic-upload-column", children: [
          /* @__PURE__ */ c.jsx("span", { className: "react-form-label", children: "Upload a syllabus or transcript" }),
          /* @__PURE__ */ c.jsxs(
            "label",
            {
              className: `react-upload-zone${z ? " has-file" : ""}`,
              htmlFor: "react-curriculum-file",
              onDragOver: (o) => {
                o.preventDefault(), o.currentTarget.classList.add("is-dragging");
              },
              onDragLeave: (o) => o.currentTarget.classList.remove("is-dragging"),
              onDrop: (o) => {
                var T;
                o.preventDefault(), o.currentTarget.classList.remove("is-dragging"), Q((T = o.dataTransfer.files) == null ? void 0 : T[0]);
              },
              children: [
                /* @__PURE__ */ c.jsx("input", { ref: ul, id: "react-curriculum-file", className: "sr-only", type: "file", accept: ".pdf,.txt,.md,.doc,.docx", onChange: (o) => {
                  var T;
                  return Q((T = o.target.files) == null ? void 0 : T[0]);
                } }),
                /* @__PURE__ */ c.jsx("span", { className: "react-upload-icon", children: "↑" }),
                /* @__PURE__ */ c.jsx("b", { children: z ? z.name : "Choose a file or drop it here" }),
                /* @__PURE__ */ c.jsx("small", { children: z ? `${Math.max(1, Math.round(z.size / 1024))} KB · Ready to analyze` : "PDF, Word, Markdown, or text · up to 10 MB" }),
                z && /* @__PURE__ */ c.jsx("span", { className: "react-file-clear", onClick: (o) => {
                  o.preventDefault(), dl();
                }, children: "Remove file" })
              ]
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: "react-upload-note", children: [
            /* @__PURE__ */ c.jsx("span", { children: "⌑" }),
            /* @__PURE__ */ c.jsx("p", { children: "Your course information is used to produce this diagnostic and is not shown in the blind employer pipeline." })
          ] }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-primary react-analyze-button", disabled: L === "loading", onClick: () => zl(), children: L === "loading" ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsx("span", { className: "spinner" }),
            "Analyzing your course outline…"
          ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            "Analyze my skills fit ",
            /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "→" })
          ] }) }),
          L === "error" && /* @__PURE__ */ c.jsx("p", { className: "react-diagnostic-error", role: "alert", children: B })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: "react-diagnostic-results", "aria-live": "polite", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "react-results-heading", children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("div", { className: "react-section-eyebrow", children: "YOUR DIAGNOSTIC" }),
          /* @__PURE__ */ c.jsx("h3", { children: "Where you stand today" })
        ] }),
        /* @__PURE__ */ c.jsx("span", { children: N ? `Based on ${N.target_role_title}` : L === "loading" ? `Assessing ${Bl.title}` : Bl.title })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-result-metrics", children: [
        /* @__PURE__ */ c.jsxs("article", { className: "react-result-card react-result-score", children: [
          /* @__PURE__ */ c.jsx("span", { children: "Coursework match" }),
          /* @__PURE__ */ c.jsxs("div", { children: [
            /* @__PURE__ */ c.jsx("b", { children: N ? N.match_percentage : "—" }),
            /* @__PURE__ */ c.jsx("small", { children: N ? "%" : "Awaiting analysis" })
          ] }),
          /* @__PURE__ */ c.jsx("div", { className: "react-result-track", children: /* @__PURE__ */ c.jsx("i", { style: { width: `${N ? Math.max(0, Math.min(100, N.match_percentage)) : 0}%` } }) }),
          /* @__PURE__ */ c.jsx("small", { children: "Coverage of role-relevant competencies" })
        ] }),
        /* @__PURE__ */ c.jsxs("article", { className: "react-result-card", children: [
          /* @__PURE__ */ c.jsx("span", { children: "Readiness tier" }),
          /* @__PURE__ */ c.jsx("b", { className: "react-result-value", children: (N == null ? void 0 : N.readiness_tier) || "—" }),
          /* @__PURE__ */ c.jsx("small", { children: "Competency classification" })
        ] }),
        /* @__PURE__ */ c.jsxs("article", { className: "react-result-card", children: [
          /* @__PURE__ */ c.jsx("span", { children: "Graduate benchmark" }),
          /* @__PURE__ */ c.jsx("b", { className: "react-result-value", children: Al === null ? "—" : `Top ${Al}%` }),
          /* @__PURE__ */ c.jsx("small", { children: N ? `${N.cohort_percentile}th percentile` : "Compared with peers" })
        ] }),
        /* @__PURE__ */ c.jsxs("article", { className: "react-result-card", children: [
          /* @__PURE__ */ c.jsx("span", { children: "Recommended bridge" }),
          /* @__PURE__ */ c.jsx("b", { className: "react-result-bridge", children: (N == null ? void 0 : N.recommended_bridge_scenario) || "—" }),
          /* @__PURE__ */ c.jsxs("button", { type: "button", onClick: ql, disabled: !N, className: "react-bridge-link", children: [
            "Explore this scenario ",
            /* @__PURE__ */ c.jsx("span", { children: "↗" })
          ] })
        ] })
      ] }),
      N ? /* @__PURE__ */ c.jsxs("div", { className: "react-diagnostic-summary", children: [
        /* @__PURE__ */ c.jsx("span", { className: "react-summary-check", children: "✓" }),
        /* @__PURE__ */ c.jsxs("p", { children: [
          /* @__PURE__ */ c.jsx("b", { children: "Diagnostic summary" }),
          N.summary
        ] })
      ] }) : /* @__PURE__ */ c.jsxs("div", { className: "react-diagnostic-summary is-empty", children: [
        /* @__PURE__ */ c.jsx("span", { children: "i" }),
        /* @__PURE__ */ c.jsxs("p", { children: [
          /* @__PURE__ */ c.jsx("b", { children: "Your results will appear here" }),
          "We’ll compare the coursework you share with the capabilities employers request for your target role."
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-competency-grid", children: [
        /* @__PURE__ */ c.jsxs("article", { className: "react-competency-panel", children: [
          /* @__PURE__ */ c.jsxs("div", { className: "react-competency-heading", children: [
            /* @__PURE__ */ c.jsx("span", { className: "react-competency-dot is-strong" }),
            /* @__PURE__ */ c.jsxs("div", { children: [
              /* @__PURE__ */ c.jsx("h4", { children: "Strengths from your coursework" }),
              /* @__PURE__ */ c.jsx("p", { children: "Knowledge your outline already covers" })
            ] }),
            /* @__PURE__ */ c.jsx("b", { children: ((pl = N == null ? void 0 : N.strong_areas) == null ? void 0 : pl.length) || 0 })
          ] }),
          /* @__PURE__ */ c.jsxs("div", { className: "react-competency-list", children: [
            !N && /* @__PURE__ */ c.jsx("p", { className: "react-competency-empty", children: "Run the diagnostic to see where your coursework gives you a strong foundation." }),
            (Ot = N == null ? void 0 : N.strong_areas) == null ? void 0 : Ot.map((o) => /* @__PURE__ */ c.jsxs("div", { className: "react-competency-item", children: [
              /* @__PURE__ */ c.jsxs("div", { children: [
                /* @__PURE__ */ c.jsx("b", { children: o.name }),
                /* @__PURE__ */ c.jsxs("span", { children: [
                  o.category,
                  " · ",
                  o.rating
                ] })
              ] }),
              /* @__PURE__ */ c.jsxs("strong", { children: [
                o.score_pct,
                "%"
              ] }),
              /* @__PURE__ */ c.jsx("small", { children: o.assessment }),
              /* @__PURE__ */ c.jsx("i", { children: /* @__PURE__ */ c.jsx("em", { style: { width: `${Math.max(0, Math.min(100, o.score_pct))}%` } }) })
            ] }, o.name))
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("article", { className: "react-competency-panel", children: [
          /* @__PURE__ */ c.jsxs("div", { className: "react-competency-heading", children: [
            /* @__PURE__ */ c.jsx("span", { className: "react-competency-dot is-gap" }),
            /* @__PURE__ */ c.jsxs("div", { children: [
              /* @__PURE__ */ c.jsx("h4", { children: "Skills to build next" }),
              /* @__PURE__ */ c.jsx("p", { children: "Capabilities missing from your outline" })
            ] }),
            /* @__PURE__ */ c.jsx("b", { children: ((vt = N == null ? void 0 : N.areas_to_work_on) == null ? void 0 : vt.length) || 0 })
          ] }),
          /* @__PURE__ */ c.jsxs("div", { className: "react-competency-list", children: [
            !N && /* @__PURE__ */ c.jsx("p", { className: "react-competency-empty", children: "We’ll identify practical areas to work on after reviewing your course outline." }),
            (Fl = N == null ? void 0 : N.areas_to_work_on) == null ? void 0 : Fl.map((o) => /* @__PURE__ */ c.jsxs("div", { className: "react-competency-item react-gap-item", children: [
              /* @__PURE__ */ c.jsxs("div", { children: [
                /* @__PURE__ */ c.jsx("b", { children: o.name }),
                /* @__PURE__ */ c.jsx("span", { children: o.category })
              ] }),
              /* @__PURE__ */ c.jsx("strong", { className: o.severity === "Critical Deficit" ? "is-critical" : "", children: o.severity }),
              /* @__PURE__ */ c.jsx("small", { children: o.gap_description }),
              /* @__PURE__ */ c.jsxs("button", { type: "button", onClick: () => {
                var T;
                return (T = window.startBridgeScenario) == null ? void 0 : T.call(window, R);
              }, children: [
                "Practice in ",
                o.bridge_scenario || Bl.title,
                " ",
                /* @__PURE__ */ c.jsx("span", { children: "→" })
              ] })
            ] }, o.name))
          ] })
        ] })
      ] }),
      N && /* @__PURE__ */ c.jsxs("div", { className: "react-remediation-banner", children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("span", { children: "YOUR NEXT MOVE" }),
          /* @__PURE__ */ c.jsx("h4", { children: "Turn a skill gap into hands-on evidence" }),
          /* @__PURE__ */ c.jsx("p", { children: "Choose the recommended Day One scenario, build a working model, and show what you can do beyond your course outline." })
        ] }),
        /* @__PURE__ */ c.jsxs("button", { type: "button", className: "btn btn-primary", onClick: ql, children: [
          "Launch Day One ",
          /* @__PURE__ */ c.jsx("span", { children: "→" })
        ] })
      ] })
    ] })
  ] });
}
const bv = [
  ["all", "All challenges"],
  ["operations_associate", "Operations"],
  ["graduate_supply_chain_analyst", "Supply chain"],
  ["junior_data_analyst", "Data analyst"],
  ["financial_modelling_intern", "Financial modelling"]
];
function pv() {
  const [p, $] = X.useState([]), [O, m] = X.useState("all"), [R, W] = X.useState(""), [V, tl] = X.useState("loading"), [z, x] = X.useState(""), [N, M] = X.useState(0);
  rv.useEffect(() => {
    let B = !0;
    return tl("loading"), fetch("/api/employer/tasks").then(async (D) => {
      const ul = await D.json();
      if (!D.ok || !Array.isArray(ul.tasks)) throw new Error(ul.detail || "Could not load challenges.");
      return ul.tasks;
    }).then((D) => {
      B && ($(D), tl("ready"));
    }).catch((D) => {
      B && (x(D.message || "Could not load challenges."), tl("error"));
    }), () => {
      B = !1;
    };
  }, [N]);
  const L = X.useMemo(() => p.filter((B) => {
    const D = O === "all" || B.role_track === O, ul = `${B.title} ${B.company_name} ${B.problem_statement} ${(B.skill_tags || []).join(" ")}`.toLowerCase();
    return D && ul.includes(R.trim().toLowerCase());
  }), [p, O, R]), xl = (B) => {
    window.takeEmployerChallenge(B.id, B.role_track);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "react-challenges", children: [
    /* @__PURE__ */ c.jsxs("section", { className: "react-challenges-hero", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "react-challenges-copy", children: [
        /* @__PURE__ */ c.jsx("span", { className: "react-eyebrow", children: "REAL WORK · REAL PROOF" }),
        /* @__PURE__ */ c.jsx("h2", { children: "Open challenges" }),
        /* @__PURE__ */ c.jsx("p", { children: "Build practical evidence through focused briefs from employers and Nigerian SMEs. Strong submissions can open a direct path to an interview." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-challenges-hero-stat", children: [
        /* @__PURE__ */ c.jsx("span", { children: "Live briefs" }),
        /* @__PURE__ */ c.jsx("strong", { children: V === "ready" ? String(p.length).padStart(2, "0") : "—" }),
        /* @__PURE__ */ c.jsx("small", { children: "Across high-demand roles" })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-challenges-toolbar", children: [
      /* @__PURE__ */ c.jsx("div", { className: "react-challenge-tracks", role: "group", "aria-label": "Filter challenges by role", children: bv.map(([B, D]) => /* @__PURE__ */ c.jsx("button", { type: "button", className: O === B ? "is-active" : "", onClick: () => m(B), children: D }, B)) }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-challenge-controls", children: [
        /* @__PURE__ */ c.jsxs("label", { className: "react-search", children: [
          /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "⌕" }),
          /* @__PURE__ */ c.jsx("input", { "aria-label": "Search challenges", placeholder: "Search briefs or skills", value: R, onChange: (B) => W(B.target.value) })
        ] }),
        /* @__PURE__ */ c.jsx("button", { className: "btn btn-quiet btn-sm", onClick: () => M((B) => B + 1), children: "Refresh" })
      ] })
    ] }),
    V === "loading" && /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-message", children: [
      /* @__PURE__ */ c.jsx("span", { className: "spinner" }),
      " Finding open challenges…"
    ] }),
    V === "error" && /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-message is-error", role: "alert", children: [
      z,
      /* @__PURE__ */ c.jsx("button", { className: "btn btn-quiet btn-sm", onClick: () => M((B) => B + 1), children: "Try again" })
    ] }),
    V === "ready" && L.length === 0 && /* @__PURE__ */ c.jsx("div", { className: "react-pipeline-message", children: "No challenges match those filters. Try another track or search term." }),
    V === "ready" && L.length > 0 && /* @__PURE__ */ c.jsx("div", { className: "react-challenge-grid", children: L.map((B) => {
      var D, ul;
      return /* @__PURE__ */ c.jsxs("article", { className: "react-challenge-card", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "react-challenge-card-top", children: [
          /* @__PURE__ */ c.jsx("span", { className: "react-challenge-company", children: B.company_name || "SME partner" }),
          /* @__PURE__ */ c.jsxs("span", { className: "react-challenge-time", children: [
            "◷ ",
            B.timebox_mins || 90,
            " min brief"
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("div", { className: "react-challenge-role", children: B.role_title || ((D = B.role_track) == null ? void 0 : D.replaceAll("_", " ")) }),
        /* @__PURE__ */ c.jsx("h3", { children: B.title }),
        /* @__PURE__ */ c.jsx("p", { className: "react-challenge-description", children: B.problem_statement }),
        !!((ul = B.deliverables) != null && ul.length) && /* @__PURE__ */ c.jsxs("div", { className: "react-challenge-deliverables", children: [
          /* @__PURE__ */ c.jsx("span", { children: "WHAT YOU’LL DELIVER" }),
          /* @__PURE__ */ c.jsx("ul", { children: B.deliverables.slice(0, 3).map((il) => /* @__PURE__ */ c.jsxs("li", { children: [
            /* @__PURE__ */ c.jsx("i", { children: "✓" }),
            il
          ] }, il)) })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: "react-challenge-footer", children: [
          /* @__PURE__ */ c.jsx("div", { className: "react-challenge-tags", children: (B.skill_tags || []).slice(0, 4).map((il) => /* @__PURE__ */ c.jsx("span", { children: il }, il)) }),
          /* @__PURE__ */ c.jsxs("button", { className: "react-challenge-cta", onClick: () => xl(B), children: [
            "Take on this challenge ",
            /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "↗" })
          ] })
        ] })
      ] }, B.id);
    }) })
  ] });
}
function Sv() {
  return /* @__PURE__ */ c.jsxs("div", { className: "react-learning-page", children: [
    /* @__PURE__ */ c.jsxs("section", { className: "react-learning-hero", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "react-learning-hero-copy", children: [
        /* @__PURE__ */ c.jsx("span", { className: "react-eyebrow", children: "YOUR NEXT CHAPTER STARTS HERE" }),
        /* @__PURE__ */ c.jsx("h1", { children: "Turn what you know into proof." }),
        /* @__PURE__ */ c.jsx("p", { children: "Choose a career track, build a focused study plan, then test your skills against a realistic day one challenge." }),
        /* @__PURE__ */ c.jsxs("div", { className: "react-learning-promise", children: [
          /* @__PURE__ */ c.jsx("span", { children: "01" }),
          " Choose a role ",
          /* @__PURE__ */ c.jsx("i", { children: "→" }),
          /* @__PURE__ */ c.jsx("span", { children: "02" }),
          " Practice the work ",
          /* @__PURE__ */ c.jsx("i", { children: "→" }),
          /* @__PURE__ */ c.jsx("span", { children: "03" }),
          " Prove your capability"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-learning-hero-art", "aria-hidden": "true", children: [
        /* @__PURE__ */ c.jsx("div", { className: "react-learning-orbit orbit-one" }),
        /* @__PURE__ */ c.jsx("div", { className: "react-learning-orbit orbit-two" }),
        /* @__PURE__ */ c.jsx("div", { className: "react-learning-orbit orbit-three" }),
        /* @__PURE__ */ c.jsxs("div", { className: "react-learning-core", children: [
          /* @__PURE__ */ c.jsx("span", { children: "SKILL" }),
          /* @__PURE__ */ c.jsx("strong", { children: "→" }),
          /* @__PURE__ */ c.jsx("span", { children: "PROOF" })
        ] }),
        /* @__PURE__ */ c.jsx("b", { className: "learning-float float-one", children: "✳" }),
        /* @__PURE__ */ c.jsx("b", { className: "learning-float float-two", children: "✓" })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-learning-intro", children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { className: "react-eyebrow", children: "LEARNING WORKSPACE" }),
        /* @__PURE__ */ c.jsx("h2", { children: "Your role, your roadmap, your first challenge." })
      ] }),
      /* @__PURE__ */ c.jsx("p", { children: "Every activity is designed around practical work employers recognize. Set a realistic pace and start building evidence you can explain." })
    ] })
  ] });
}
function jv() {
  return /* @__PURE__ */ c.jsxs("div", { className: "react-studio-page", children: [
    /* @__PURE__ */ c.jsxs("section", { className: "react-studio-hero", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "react-studio-copy", children: [
        /* @__PURE__ */ c.jsx("span", { className: "react-eyebrow", children: "EMPLOYER WORKSPACE · CHALLENGE STUDIO" }),
        /* @__PURE__ */ c.jsx("h2", { children: "Turn a real business need into meaningful work." }),
        /* @__PURE__ */ c.jsx("p", { children: "Capture a challenge in your own words. Sabi helps protect sensitive details and shape the brief into a practical project graduates can solve." }),
        /* @__PURE__ */ c.jsxs("div", { className: "react-studio-flow", children: [
          /* @__PURE__ */ c.jsxs("span", { children: [
            /* @__PURE__ */ c.jsx("b", { children: "01" }),
            " Capture"
          ] }),
          /* @__PURE__ */ c.jsx("i", { children: "→" }),
          /* @__PURE__ */ c.jsxs("span", { children: [
            /* @__PURE__ */ c.jsx("b", { children: "02" }),
            " Shape the brief"
          ] }),
          /* @__PURE__ */ c.jsx("i", { children: "→" }),
          /* @__PURE__ */ c.jsxs("span", { children: [
            /* @__PURE__ */ c.jsx("b", { children: "03" }),
            " Publish"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-studio-visual", "aria-hidden": "true", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "studio-document", children: [
          /* @__PURE__ */ c.jsx("span", {}),
          /* @__PURE__ */ c.jsx("span", {}),
          /* @__PURE__ */ c.jsx("span", {}),
          /* @__PURE__ */ c.jsx("b", { children: "✓" })
        ] }),
        /* @__PURE__ */ c.jsx("div", { className: "studio-shield", children: "◆" }),
        /* @__PURE__ */ c.jsx("div", { className: "studio-spark", children: "✳" })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-studio-section-head", children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { className: "react-eyebrow", children: "BRIEF INTAKE" }),
        /* @__PURE__ */ c.jsx("h3", { children: "Start with the problem. We’ll help structure the opportunity." })
      ] }),
      /* @__PURE__ */ c.jsx("p", { children: "Use a recording, an audio file, or the editable transcript. Review the privacy preview before publishing." })
    ] })
  ] });
}
const xv = ["Accounting", "Economics", "Computer Science", "Finance"], Oo = (p = "") => p.replaceAll("_", " ").replace(/\b\w/g, ($) => $.toUpperCase());
function Ev({ item: p }) {
  const $ = Math.max(0, Math.min(100, Math.round(p.demand * 100))), O = Math.max(0, Math.min(100, Math.round(p.coverage * 100))), m = Math.round(p.gap * 100), R = m > 0;
  return /* @__PURE__ */ c.jsxs("article", { className: "react-insight-gap", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "react-insight-gap-heading", children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { children: Oo(p.category || "Capability") }),
        /* @__PURE__ */ c.jsx("h4", { children: Oo(p.skill) })
      ] }),
      /* @__PURE__ */ c.jsx("b", { className: R ? "is-deficit" : "is-covered", children: R ? `${m}% gap` : `${Math.abs(m)}% coverage lead` })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-insight-bars", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "react-insight-bar-row", children: [
        /* @__PURE__ */ c.jsx("span", { children: "Employer demand" }),
        /* @__PURE__ */ c.jsx("div", { children: /* @__PURE__ */ c.jsx("i", { className: "demand", style: { width: `${$}%` } }) }),
        /* @__PURE__ */ c.jsxs("b", { children: [
          $,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-insight-bar-row", children: [
        /* @__PURE__ */ c.jsx("span", { children: "Curriculum coverage" }),
        /* @__PURE__ */ c.jsx("div", { children: /* @__PURE__ */ c.jsx("i", { className: "coverage", style: { width: `${O}%` } }) }),
        /* @__PURE__ */ c.jsxs("b", { children: [
          O,
          "%"
        ] })
      ] })
    ] })
  ] });
}
function Av({ funnel: p }) {
  var O;
  const $ = [
    ["Taught in curriculum", p.taught_pct, "taught"],
    ["Practiced in hands-on work", p.practiced_pct, "practiced"],
    ["Proven on Sabi", p.proven_pct, "proven"]
  ];
  return /* @__PURE__ */ c.jsxs("article", { className: "react-insight-funnel", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "react-insight-funnel-head", children: [
      /* @__PURE__ */ c.jsx("span", { className: "react-insight-funnel-mark", children: (O = p.department) == null ? void 0 : O.slice(0, 1) }),
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { children: "COHORT PROGRESSION" }),
        /* @__PURE__ */ c.jsx("h4", { children: p.department })
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: "react-insight-funnel-steps", children: $.map(([m, R, W], V) => {
      const tl = Math.max(0, Math.min(100, Number(R) || 0));
      return /* @__PURE__ */ c.jsxs("div", { className: "react-insight-step", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "react-insight-step-label", children: [
          /* @__PURE__ */ c.jsxs("span", { children: [
            /* @__PURE__ */ c.jsx("i", { children: String(V + 1).padStart(2, "0") }),
            m
          ] }),
          /* @__PURE__ */ c.jsxs("b", { children: [
            tl,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("div", { className: "react-insight-step-track", children: /* @__PURE__ */ c.jsx("i", { className: W, style: { width: `${tl}%` } }) })
      ] }, W);
    }) })
  ] });
}
function Tv() {
  var L, xl, B;
  const [p, $] = X.useState(""), [O, m] = X.useState(null), [R, W] = X.useState("loading"), [V, tl] = X.useState(""), [z, x] = X.useState(0), N = X.useCallback(async () => {
    W("loading"), tl("");
    try {
      const D = new URLSearchParams();
      p && D.set("department", p);
      const ul = await fetch(`/api/radar/heatmap${D.size ? `?${D}` : ""}`), il = await ul.json();
      if (!ul.ok) throw new Error(il.detail || "Unable to load talent insights.");
      m(il), W("ready");
    } catch (D) {
      tl(D.message || "Unable to load talent insights."), W("error");
    }
  }, [p]);
  X.useEffect(() => {
    N();
  }, [N, z]), X.useEffect(() => {
    const D = () => x((ul) => ul + 1);
    return window.addEventListener("sabi:radar-refresh", D), () => window.removeEventListener("sabi:radar-refresh", D);
  }, []);
  const M = X.useMemo(() => {
    const D = (O == null ? void 0 : O.gaps) || [], ul = D.filter((Gl) => Gl.gap > 0).length, il = D.length ? Math.round(D.reduce((Gl, El) => Gl + El.coverage, 0) / D.length * 100) : 0;
    return { gapCount: ul, average: il, postings: (O == null ? void 0 : O.postings_count) || 0 };
  }, [O]);
  return /* @__PURE__ */ c.jsxs("div", { className: "react-insights-page", children: [
    /* @__PURE__ */ c.jsxs("section", { className: "react-insights-hero", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "react-insights-copy", children: [
        /* @__PURE__ */ c.jsx("span", { className: "react-eyebrow", children: "SABI RADAR · MARKET INTELLIGENCE" }),
        /* @__PURE__ */ c.jsx("h2", { children: "See where capability meets demand." }),
        /* @__PURE__ */ c.jsx("p", { children: "Compare the skills employers are asking for with what graduates are taught, practice, and can prove." })
      ] }),
      /* @__PURE__ */ c.jsxs("label", { className: "react-insights-filter", children: [
        /* @__PURE__ */ c.jsx("span", { children: "FOCUS AREA" }),
        /* @__PURE__ */ c.jsxs("select", { "aria-label": "Filter by department", value: p, onChange: (D) => $(D.target.value), children: [
          /* @__PURE__ */ c.jsx("option", { value: "", children: "All departments" }),
          xv.map((D) => /* @__PURE__ */ c.jsx("option", { value: D, children: D }, D))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-insights-metrics", children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { children: "Employer postings analyzed" }),
        /* @__PURE__ */ c.jsx("b", { children: R === "ready" ? M.postings : "—" }),
        /* @__PURE__ */ c.jsx("small", { children: "Sampled market signals" })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { children: "Skills with a coverage gap" }),
        /* @__PURE__ */ c.jsx("b", { children: R === "ready" ? M.gapCount : "—" }),
        /* @__PURE__ */ c.jsx("small", { children: "Demand currently exceeds coverage" })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { children: "Average curriculum coverage" }),
        /* @__PURE__ */ c.jsx("b", { children: R === "ready" ? `${M.average}%` : "—" }),
        /* @__PURE__ */ c.jsx("small", { children: "Across the selected view" })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: "react-insights-section", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "react-insights-section-head", children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("span", { className: "react-eyebrow", children: "SKILLS LANDSCAPE" }),
          /* @__PURE__ */ c.jsx("h3", { children: "Where the curriculum can catch up" }),
          /* @__PURE__ */ c.jsx("p", { children: "Compare the relative weight of employer demand and curriculum coverage." })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: "react-insights-legend", children: [
          /* @__PURE__ */ c.jsxs("span", { children: [
            /* @__PURE__ */ c.jsx("i", { className: "demand" }),
            "Employer demand"
          ] }),
          /* @__PURE__ */ c.jsxs("span", { children: [
            /* @__PURE__ */ c.jsx("i", { className: "coverage" }),
            "Curriculum coverage"
          ] })
        ] })
      ] }),
      R === "loading" && /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-message", children: [
        /* @__PURE__ */ c.jsx("span", { className: "spinner" }),
        " Analyzing the skills landscape…"
      ] }),
      R === "error" && /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-message is-error", role: "alert", children: [
        V,
        /* @__PURE__ */ c.jsx("button", { className: "btn btn-quiet btn-sm", onClick: () => x((D) => D + 1), children: "Try again" })
      ] }),
      R === "ready" && ((L = O == null ? void 0 : O.gaps) == null ? void 0 : L.length) === 0 && /* @__PURE__ */ c.jsx("div", { className: "react-pipeline-message", children: "No skill data is available for this department yet. Choose another focus area." }),
      R === "ready" && ((xl = O == null ? void 0 : O.gaps) == null ? void 0 : xl.length) > 0 && /* @__PURE__ */ c.jsx("div", { className: "react-insights-gap-grid", children: O.gaps.slice(0, 10).map((D) => /* @__PURE__ */ c.jsx(Ev, { item: D }, D.skill)) })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: "react-insights-section react-insights-cohorts", children: [
      /* @__PURE__ */ c.jsx("div", { className: "react-insights-section-head", children: /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { className: "react-eyebrow", children: "PROOF PIPELINE" }),
        /* @__PURE__ */ c.jsx("h3", { children: "From taught to proven" }),
        /* @__PURE__ */ c.jsx("p", { children: "See how capability progresses from classroom exposure to evidence employers can trust." })
      ] }) }),
      R === "ready" && ((B = O == null ? void 0 : O.funnels) == null ? void 0 : B.length) > 0 && /* @__PURE__ */ c.jsx("div", { className: "react-insights-funnel-grid", children: O.funnels.map((D) => /* @__PURE__ */ c.jsx(Av, { funnel: D }, D.department)) })
    ] })
  ] });
}
const zv = [
  { id: "student", title: "My learning", label: "LEARNING", number: "01", caption: "Plan and prove your skills" },
  { id: "student-analytics", title: "Skills diagnostic", label: "GROWTH", number: "02", caption: "Find your curriculum gaps" },
  { id: "employer-tasks", title: "Open challenges", label: "OPPORTUNITIES", number: "03", caption: "Solve real business briefs" }
], Nv = [
  { id: "employer", title: "Candidate pipeline", label: "TALENT", number: "01", caption: "Review verified candidates" },
  { id: "sme", title: "Tasks & SME studio", label: "CHALLENGES", number: "02", caption: "Publish practical work" },
  { id: "radar", title: "Talent insights", label: "INTELLIGENCE", number: "03", caption: "Explore capability gaps" }
];
function Qu() {
  try {
    const p = JSON.parse(localStorage.getItem("sabi-user") || "null");
    if (p != null && p.role) return p;
  } catch {
  }
  return { role: "student", name: "Ada Okafor", organization: "University of Lagos" };
}
function _v() {
  const [p, $] = X.useState(Qu), [O, m] = X.useState(location.hash.split("/")[1] || (p.role === "employer" ? "employer" : "student")), [R, W] = X.useState(document.documentElement.dataset.mode === "lite"), V = p.role === "employer" ? Nv : zv;
  X.useEffect(() => {
    const z = (M) => {
      var L;
      return m(((L = M.detail) == null ? void 0 : L.tabId) || location.hash.split("/")[1]);
    }, x = (M) => {
      var L;
      return $(((L = M.detail) == null ? void 0 : L.user) || Qu());
    }, N = (M) => {
      var L;
      return W(((L = M.detail) == null ? void 0 : L.mode) === "lite");
    };
    return window.addEventListener("sabi:navigation", z), window.addEventListener("sabi:session", x), window.addEventListener("sabi:mode", N), () => {
      window.removeEventListener("sabi:navigation", z), window.removeEventListener("sabi:session", x), window.removeEventListener("sabi:mode", N);
    };
  }, []);
  const tl = (z) => {
    window.switchTab(z), m(z);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 react-shell-inner", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "flex items-center justify-between h-16 react-shell-top", children: [
      /* @__PURE__ */ c.jsxs("a", { href: "#", className: "flex items-center gap-3 react-brand", "aria-label": "Sabi home", children: [
        /* @__PURE__ */ c.jsx("span", { className: "brand-mark", "aria-hidden": "true", children: "S" }),
        /* @__PURE__ */ c.jsxs("span", { className: "react-brand-copy", children: [
          /* @__PURE__ */ c.jsx("span", { className: "react-brand-name", children: "Sabi" }),
          /* @__PURE__ */ c.jsx("span", { className: "react-brand-caption", children: "Capability, proven." })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-4 text-sm text-slate-600 react-account", children: [
        /* @__PURE__ */ c.jsxs("div", { id: "auth-user-badge", className: "flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 text-xs shadow-sm react-identity", children: [
          /* @__PURE__ */ c.jsx("span", { id: "auth-user-dot", className: "w-2 h-2 rounded-full bg-emerald-500 status-dot" }),
          /* @__PURE__ */ c.jsx("span", { id: "auth-user-name", className: "font-semibold text-slate-800", children: p.name || "User" }),
          /* @__PURE__ */ c.jsx("span", { id: "auth-user-role-badge", className: p.role === "student" ? "badge-student" : "badge-employer", children: p.role === "student" ? "Student" : `Employer · ${p.organization || p.company || "Partner"}` })
        ] }),
        /* @__PURE__ */ c.jsx("button", { type: "button", onClick: () => window.logout(), className: "btn btn-quiet btn-sm react-portal-switch", children: "Switch Portal" }),
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: "mode-switch",
            role: "switch",
            "aria-checked": String(R),
            "aria-label": "Data saver",
            title: "Data saver loads fewer files and uses less data",
            onClick: () => window.toggleMode(),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: "mode-track", children: /* @__PURE__ */ c.jsx("i", {}) }),
              /* @__PURE__ */ c.jsx("span", { className: "mode-label", children: "Data saver" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("nav", { className: "tabs react-page-nav", role: "tablist", "aria-label": "Workspace pages", children: [
      /* @__PURE__ */ c.jsx("p", { className: "react-nav-eyebrow", children: p.role === "student" ? "STUDENT WORKSPACE" : "EMPLOYER WORKSPACE" }),
      V.map((z) => /* @__PURE__ */ c.jsxs(
        "button",
        {
          id: `nav-tab-${z.id}`,
          type: "button",
          role: "tab",
          "aria-selected": O === z.id,
          className: `tab-btn ${p.role === "student" ? "student-only" : "employer-only"}${O === z.id ? " is-active" : ""}`,
          "data-tab": z.id,
          onClick: () => tl(z.id),
          children: [
            /* @__PURE__ */ c.jsx("span", { className: "react-nav-number", children: z.number }),
            /* @__PURE__ */ c.jsxs("span", { className: "react-nav-copy", children: [
              /* @__PURE__ */ c.jsx("span", { children: z.title }),
              /* @__PURE__ */ c.jsx("small", { children: z.caption })
            ] }),
            /* @__PURE__ */ c.jsx("span", { className: "react-nav-arrow", "aria-hidden": "true", children: "↗" })
          ]
        },
        z.id
      )),
      /* @__PURE__ */ c.jsxs("div", { className: "react-shell-foot", children: [
        /* @__PURE__ */ c.jsx("span", { className: "react-shell-foot-mark", children: "✓" }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("b", { children: "Evidence you can stand behind" }),
          /* @__PURE__ */ c.jsx("small", { children: "Code verifies. People explain." })
        ] })
      ] })
    ] })
  ] });
}
function Ov({ candidate: p, blind: $ }) {
  var tl;
  const [O, m] = ((tl = p.signals) == null ? void 0 : tl.shocks_survived) || [0, 6], R = $ ? p.candidate_alias : p.candidate_name || p.candidate_alias, W = $ ? "Identity hidden in blind mode" : p.candidate_school || "School not provided", V = `${p.verification_url || `/verify/${p.brief_id}`}?blind=${$}`;
  return /* @__PURE__ */ c.jsxs("article", { className: "react-candidate-card", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "react-candidate-card-top", children: [
      /* @__PURE__ */ c.jsx("div", { className: "react-candidate-avatar", "aria-hidden": "true", children: String(R || "C").slice(0, 1).toUpperCase() }),
      /* @__PURE__ */ c.jsxs("span", { className: "react-verified-pill", children: [
        /* @__PURE__ */ c.jsx("i", {}),
        " Tier A verified"
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-candidate-ident", children: [
      /* @__PURE__ */ c.jsx("h3", { children: R }),
      /* @__PURE__ */ c.jsx("p", { children: p.target_role }),
      /* @__PURE__ */ c.jsx("span", { children: W })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-candidate-proof", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "react-proof-head", children: [
        /* @__PURE__ */ c.jsx("span", { children: "Scenario resilience" }),
        /* @__PURE__ */ c.jsxs("b", { children: [
          O,
          /* @__PURE__ */ c.jsxs("small", { children: [
            "/",
            m
          ] })
        ] })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: "react-proof-track", role: "progressbar", "aria-label": "Shock tests survived", "aria-valuenow": O, "aria-valuemin": "0", "aria-valuemax": m, children: /* @__PURE__ */ c.jsx("i", { style: { width: `${m ? Math.min(100, O / m * 100) : 0}%` } }) }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-proof-points", children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("i", { children: "✓" }),
          " Defence passed"
        ] }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("i", { children: "✓" }),
          " Model constraints held"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-candidate-skills", children: [
      /* @__PURE__ */ c.jsx("div", { className: "react-section-eyebrow", children: "VERIFIED CAPABILITIES" }),
      /* @__PURE__ */ c.jsx("div", { className: "react-skill-list", children: (p.skills || []).map((z) => /* @__PURE__ */ c.jsxs("span", { className: "react-skill-chip", children: [
        /* @__PURE__ */ c.jsx("b", { children: z.skill_name || z.skill_id }),
        /* @__PURE__ */ c.jsxs("small", { children: [
          z.level,
          " · Tier ",
          z.tier
        ] })
      ] }, z.skill_id || z.skill_name)) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-candidate-card-footer", children: [
      /* @__PURE__ */ c.jsxs("span", { className: "react-hash", title: p.sha256_digest || "", children: [
        "SHA · ",
        (p.sha256_digest || "").slice(0, 8)
      ] }),
      /* @__PURE__ */ c.jsxs("a", { href: V, target: "_blank", rel: "noopener", className: "react-proof-link", children: [
        "Verify record ",
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "↗" })
      ] })
    ] })
  ] });
}
function Mv() {
  const [p, $] = X.useState(Qu), [O, m] = X.useState(() => window.getBlindMode ? window.getBlindMode() : !0), [R, W] = X.useState(location.hash.split("/")[1] || "student"), [V, tl] = X.useState([]), [z, x] = X.useState("idle"), [N, M] = X.useState(""), [L, xl] = X.useState("all"), [B, D] = X.useState(""), [ul, il] = X.useState(0);
  X.useEffect(() => {
    const Q = (Al) => {
      var pl;
      return $(((pl = Al.detail) == null ? void 0 : pl.user) || Qu());
    }, dl = (Al) => {
      var pl;
      return W(((pl = Al.detail) == null ? void 0 : pl.tabId) || location.hash.split("/")[1]);
    }, ql = (Al) => {
      var pl;
      return m(!!((pl = Al.detail) != null && pl.blind));
    };
    return window.addEventListener("sabi:session", Q), window.addEventListener("sabi:navigation", dl), window.addEventListener("sabi:blind", ql), () => {
      window.removeEventListener("sabi:session", Q), window.removeEventListener("sabi:navigation", dl), window.removeEventListener("sabi:blind", ql);
    };
  }, []);
  const Gl = p.role === "employer" && R === "employer";
  X.useEffect(() => {
    if (!Gl) return;
    const Q = new AbortController();
    return x("loading"), M(""), fetch(`/api/candidates?blind=${O}`, { signal: Q.signal }).then(async (dl) => {
      if (!dl.ok) throw new Error("Candidate pool could not be loaded.");
      return dl.json();
    }).then((dl) => {
      tl(Array.isArray(dl) ? dl : []), x("ready");
    }).catch((dl) => {
      dl.name !== "AbortError" && (M(dl.message || "Something went wrong while loading the pool."), x("error"));
    }), () => Q.abort();
  }, [Gl, O, ul]);
  const El = [...new Set(V.map((Q) => Q.target_role).filter(Boolean))].sort(), Ll = B.trim().toLocaleLowerCase(), Bl = V.filter((Q) => {
    const dl = L === "all" || Q.target_role === L, ql = [Q.candidate_alias, Q.candidate_name, Q.target_role, ...(Q.skills || []).map((Al) => Al.skill_name)].join(" ").toLocaleLowerCase();
    return dl && (!Ll || ql.includes(Ll));
  }), zl = V.filter((Q) => {
    var Al;
    const [dl, ql] = ((Al = Q.signals) == null ? void 0 : Al.shocks_survived) || [0, 6];
    return dl === ql;
  }).length, w = V.reduce((Q, dl) => {
    var ql;
    return Q + (((ql = dl.skills) == null ? void 0 : ql.length) || 0);
  }, 0);
  return /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline space-y-6", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-hero", children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("div", { className: "react-section-eyebrow", children: "TALENT, VERIFIED" }),
        /* @__PURE__ */ c.jsx("h2", { children: "Candidate pipeline" }),
        /* @__PURE__ */ c.jsx("p", { children: "Start with what people can do. Every profile is backed by a signed, scenario-tested evidence record." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-actions", children: [
        /* @__PURE__ */ c.jsxs("span", { className: `react-blind-status${O ? " is-on" : ""}`, children: [
          /* @__PURE__ */ c.jsx("i", {}),
          " ",
          O ? "Blind review on" : "Identity visible"
        ] }),
        /* @__PURE__ */ c.jsx("button", { id: "btn-toggle-blind", type: "button", onClick: () => window.toggleBlindMode(), className: `btn ${O ? "btn-primary" : "btn-quiet"} btn-sm`, children: O ? "Reveal identity" : "Hide identity" }),
        /* @__PURE__ */ c.jsx("button", { type: "button", onClick: () => il((Q) => Q + 1), className: "btn btn-quiet btn-sm", children: "Refresh" })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-stats", "aria-label": "Pipeline summary", children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { children: "Verified candidates" }),
        /* @__PURE__ */ c.jsx("b", { children: z === "loading" ? "—" : V.length.toString().padStart(2, "0") }),
        /* @__PURE__ */ c.jsx("small", { children: "in your current pool" })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { children: "Full scenario passes" }),
        /* @__PURE__ */ c.jsx("b", { children: z === "loading" ? "—" : `${zl}/${V.length}` }),
        /* @__PURE__ */ c.jsx("small", { children: "survived every stress test" })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { children: "Evidence points" }),
        /* @__PURE__ */ c.jsx("b", { children: z === "loading" ? "—" : w.toString().padStart(2, "0") }),
        /* @__PURE__ */ c.jsx("small", { children: "verified capability records" })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-toolbar", children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("h3", { children: "Verified talent" }),
        /* @__PURE__ */ c.jsx("p", { children: "Compare evidence across the role tracks you are hiring for." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-filters", children: [
        /* @__PURE__ */ c.jsxs("label", { className: "react-search", children: [
          /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "⌕" }),
          /* @__PURE__ */ c.jsx("input", { "aria-label": "Search candidates", placeholder: "Search name or capability", value: B, onChange: (Q) => D(Q.target.value) })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: "react-role-filter", children: [
          /* @__PURE__ */ c.jsx("span", { className: "sr-only", children: "Filter by target role" }),
          /* @__PURE__ */ c.jsxs("select", { value: L, onChange: (Q) => xl(Q.target.value), children: [
            /* @__PURE__ */ c.jsx("option", { value: "all", children: "All roles" }),
            El.map((Q) => /* @__PURE__ */ c.jsx("option", { value: Q, children: Q }, Q))
          ] })
        ] })
      ] })
    ] }),
    z === "loading" && /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-message", children: [
      /* @__PURE__ */ c.jsx("span", { className: "spinner" }),
      " Loading verified candidate records…"
    ] }),
    z === "error" && /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-message is-error", role: "alert", children: [
      N,
      /* @__PURE__ */ c.jsx("button", { className: "btn btn-quiet btn-sm", onClick: () => il((Q) => Q + 1), children: "Try again" })
    ] }),
    z === "ready" && Bl.length === 0 && /* @__PURE__ */ c.jsx("div", { className: "react-pipeline-message", children: "No candidates match those filters. Clear the search or choose another role." }),
    z === "ready" && Bl.length > 0 && /* @__PURE__ */ c.jsx("div", { className: "react-candidate-grid", children: Bl.map((Q) => /* @__PURE__ */ c.jsx(Ov, { candidate: Q, blind: O }, Q.brief_id)) })
  ] });
}
const Mo = document.getElementById("workspace-header-root");
Mo && document.documentElement.dataset.mode === "full" && Xe.createRoot(Mo).render(/* @__PURE__ */ c.jsx(_v, {}));
const Co = document.getElementById("react-student-learning");
Co && document.documentElement.dataset.mode === "full" && Xe.createRoot(Co).render(/* @__PURE__ */ c.jsx(Sv, {}));
const Do = document.getElementById("react-task-studio");
Do && document.documentElement.dataset.mode === "full" && Xe.createRoot(Do).render(/* @__PURE__ */ c.jsx(jv, {}));
const Uo = document.getElementById("react-talent-insights");
Uo && document.documentElement.dataset.mode === "full" && (window.reactTalentInsightsLoaded = !0, Xe.createRoot(Uo).render(/* @__PURE__ */ c.jsx(Tv, {})));
const Ro = document.getElementById("react-candidate-pipeline");
Ro && document.documentElement.dataset.mode === "full" && (window.reactCandidatePipelineLoaded = !0, Xe.createRoot(Ro).render(/* @__PURE__ */ c.jsx(Mv, {})));
const Ho = document.getElementById("react-curriculum-root");
Ho && document.documentElement.dataset.mode === "full" && (window.reactCurriculumLoaded = !0, Xe.createRoot(Ho).render(/* @__PURE__ */ c.jsx(gv, {})));
const Bo = document.getElementById("react-open-challenges");
Bo && document.documentElement.dataset.mode === "full" && (window.reactOpenChallengesLoaded = !0, Xe.createRoot(Bo).render(/* @__PURE__ */ c.jsx(pv, {})));
