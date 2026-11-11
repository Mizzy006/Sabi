function cy(v) {
  return v && v.__esModule && Object.prototype.hasOwnProperty.call(v, "default") ? v.default : v;
}
var is = { exports: {} }, xn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bd;
function sy() {
  if (bd) return xn;
  bd = 1;
  var v = Symbol.for("react.transitional.element"), W = Symbol.for("react.fragment");
  function C(m, q, w) {
    var Z = null;
    if (w !== void 0 && (Z = "" + w), q.key !== void 0 && (Z = "" + q.key), "key" in q) {
      w = {};
      for (var F in q)
        F !== "key" && (w[F] = q[F]);
    } else w = q;
    return q = w.ref, {
      $$typeof: v,
      type: m,
      key: Z,
      ref: q !== void 0 ? q : null,
      props: w
    };
  }
  return xn.Fragment = W, xn.jsx = C, xn.jsxs = C, xn;
}
var pd;
function fy() {
  return pd || (pd = 1, is.exports = sy()), is.exports;
}
var c = fy(), cs = { exports: {} }, V = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sd;
function ry() {
  if (Sd) return V;
  Sd = 1;
  var v = Symbol.for("react.transitional.element"), W = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), m = Symbol.for("react.strict_mode"), q = Symbol.for("react.profiler"), w = Symbol.for("react.consumer"), Z = Symbol.for("react.context"), F = Symbol.for("react.forward_ref"), A = Symbol.for("react.suspense"), j = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), U = Symbol.for("react.activity"), M = Symbol.iterator;
  function cl(f) {
    return f === null || typeof f != "object" ? null : (f = M && f[M] || f["@@iterator"], typeof f == "function" ? f : null);
  }
  var R = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, H = Object.assign, ul = {};
  function il(f, S, _) {
    this.props = f, this.context = S, this.refs = ul, this.updater = _ || R;
  }
  il.prototype.isReactComponent = {}, il.prototype.setState = function(f, S) {
    if (typeof f != "object" && typeof f != "function" && f != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, f, S, "setState");
  }, il.prototype.forceUpdate = function(f) {
    this.updater.enqueueForceUpdate(this, f, "forceUpdate");
  };
  function Rl() {
  }
  Rl.prototype = il.prototype;
  function gl(f, S, _) {
    this.props = f, this.context = S, this.refs = ul, this.updater = _ || R;
  }
  var ql = gl.prototype = new Rl();
  ql.constructor = gl, H(ql, il.prototype), ql.isPureReactComponent = !0;
  var Bl = Array.isArray;
  function jl() {
  }
  var K = { H: null, A: null, T: null, S: null }, Ol = Object.prototype.hasOwnProperty;
  function Ql(f, S, _) {
    var D = _.ref;
    return {
      $$typeof: v,
      type: f,
      key: S,
      ref: D !== void 0 ? D : null,
      props: _
    };
  }
  function ue(f, S) {
    return Ql(f.type, S, f.props);
  }
  function Kl(f) {
    return typeof f == "object" && f !== null && f.$$typeof === v;
  }
  function El(f) {
    var S = { "=": "=0", ":": "=2" };
    return "$" + f.replace(/[=:]/g, function(_) {
      return S[_];
    });
  }
  var ve = /\/+/g;
  function Fl(f, S) {
    return typeof f == "object" && f !== null && f.key != null ? El("" + f.key) : S.toString(36);
  }
  function Jl(f) {
    switch (f.status) {
      case "fulfilled":
        return f.value;
      case "rejected":
        throw f.reason;
      default:
        switch (typeof f.status == "string" ? f.then(jl, jl) : (f.status = "pending", f.then(
          function(S) {
            f.status === "pending" && (f.status = "fulfilled", f.value = S);
          },
          function(S) {
            f.status === "pending" && (f.status = "rejected", f.reason = S);
          }
        )), f.status) {
          case "fulfilled":
            return f.value;
          case "rejected":
            throw f.reason;
        }
    }
    throw f;
  }
  function d(f, S, _, D, J) {
    var P = typeof f;
    (P === "undefined" || P === "boolean") && (f = null);
    var ol = !1;
    if (f === null) ol = !0;
    else
      switch (P) {
        case "bigint":
        case "string":
        case "number":
          ol = !0;
          break;
        case "object":
          switch (f.$$typeof) {
            case v:
            case W:
              ol = !0;
              break;
            case O:
              return ol = f._init, d(
                ol(f._payload),
                S,
                _,
                D,
                J
              );
          }
      }
    if (ol)
      return J = J(f), ol = D === "" ? "." + Fl(f, 0) : D, Bl(J) ? (_ = "", ol != null && (_ = ol.replace(ve, "$&/") + "/"), d(J, S, _, "", function(_a) {
        return _a;
      })) : J != null && (Kl(J) && (J = ue(
        J,
        _ + (J.key == null || f && f.key === J.key ? "" : ("" + J.key).replace(
          ve,
          "$&/"
        ) + "/") + ol
      )), S.push(J)), 1;
    ol = 0;
    var $l = D === "" ? "." : D + ":";
    if (Bl(f))
      for (var Al = 0; Al < f.length; Al++)
        D = f[Al], P = $l + Fl(D, Al), ol += d(
          D,
          S,
          _,
          P,
          J
        );
    else if (Al = cl(f), typeof Al == "function")
      for (f = Al.call(f), Al = 0; !(D = f.next()).done; )
        D = D.value, P = $l + Fl(D, Al++), ol += d(
          D,
          S,
          _,
          P,
          J
        );
    else if (P === "object") {
      if (typeof f.then == "function")
        return d(
          Jl(f),
          S,
          _,
          D,
          J
        );
      throw S = String(f), Error(
        "Objects are not valid as a React child (found: " + (S === "[object Object]" ? "object with keys {" + Object.keys(f).join(", ") + "}" : S) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ol;
  }
  function T(f, S, _) {
    if (f == null) return f;
    var D = [], J = 0;
    return d(f, D, "", "", function(P) {
      return S.call(_, P, J++);
    }), D;
  }
  function Q(f) {
    if (f._status === -1) {
      var S = f._result;
      S = S(), S.then(
        function(_) {
          (f._status === 0 || f._status === -1) && (f._status = 1, f._result = _);
        },
        function(_) {
          (f._status === 0 || f._status === -1) && (f._status = 2, f._result = _);
        }
      ), f._status === -1 && (f._status = 0, f._result = S);
    }
    if (f._status === 1) return f._result.default;
    throw f._result;
  }
  var I = typeof reportError == "function" ? reportError : function(f) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var S = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof f == "object" && f !== null && typeof f.message == "string" ? String(f.message) : String(f),
        error: f
      });
      if (!window.dispatchEvent(S)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", f);
      return;
    }
    console.error(f);
  }, z = {
    map: T,
    forEach: function(f, S, _) {
      T(
        f,
        function() {
          S.apply(this, arguments);
        },
        _
      );
    },
    count: function(f) {
      var S = 0;
      return T(f, function() {
        S++;
      }), S;
    },
    toArray: function(f) {
      return T(f, function(S) {
        return S;
      }) || [];
    },
    only: function(f) {
      if (!Kl(f))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return f;
    }
  };
  return V.Activity = U, V.Children = z, V.Component = il, V.Fragment = C, V.Profiler = q, V.PureComponent = gl, V.StrictMode = m, V.Suspense = A, V.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = K, V.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(f) {
      return K.H.useMemoCache(f);
    }
  }, V.cache = function(f) {
    return function() {
      return f.apply(null, arguments);
    };
  }, V.cacheSignal = function() {
    return null;
  }, V.cloneElement = function(f, S, _) {
    if (f == null)
      throw Error(
        "The argument must be a React element, but you passed " + f + "."
      );
    var D = H({}, f.props), J = f.key;
    if (S != null)
      for (P in S.key !== void 0 && (J = "" + S.key), S)
        !Ol.call(S, P) || P === "key" || P === "__self" || P === "__source" || P === "ref" && S.ref === void 0 || (D[P] = S[P]);
    var P = arguments.length - 2;
    if (P === 1) D.children = _;
    else if (1 < P) {
      for (var ol = Array(P), $l = 0; $l < P; $l++)
        ol[$l] = arguments[$l + 2];
      D.children = ol;
    }
    return Ql(f.type, J, D);
  }, V.createContext = function(f) {
    return f = {
      $$typeof: Z,
      _currentValue: f,
      _currentValue2: f,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, f.Provider = f, f.Consumer = {
      $$typeof: w,
      _context: f
    }, f;
  }, V.createElement = function(f, S, _) {
    var D, J = {}, P = null;
    if (S != null)
      for (D in S.key !== void 0 && (P = "" + S.key), S)
        Ol.call(S, D) && D !== "key" && D !== "__self" && D !== "__source" && (J[D] = S[D]);
    var ol = arguments.length - 2;
    if (ol === 1) J.children = _;
    else if (1 < ol) {
      for (var $l = Array(ol), Al = 0; Al < ol; Al++)
        $l[Al] = arguments[Al + 2];
      J.children = $l;
    }
    if (f && f.defaultProps)
      for (D in ol = f.defaultProps, ol)
        J[D] === void 0 && (J[D] = ol[D]);
    return Ql(f, P, J);
  }, V.createRef = function() {
    return { current: null };
  }, V.forwardRef = function(f) {
    return { $$typeof: F, render: f };
  }, V.isValidElement = Kl, V.lazy = function(f) {
    return {
      $$typeof: O,
      _payload: { _status: -1, _result: f },
      _init: Q
    };
  }, V.memo = function(f, S) {
    return {
      $$typeof: j,
      type: f,
      compare: S === void 0 ? null : S
    };
  }, V.startTransition = function(f) {
    var S = K.T, _ = {};
    K.T = _;
    try {
      var D = f(), J = K.S;
      J !== null && J(_, D), typeof D == "object" && D !== null && typeof D.then == "function" && D.then(jl, I);
    } catch (P) {
      I(P);
    } finally {
      S !== null && _.types !== null && (S.types = _.types), K.T = S;
    }
  }, V.unstable_useCacheRefresh = function() {
    return K.H.useCacheRefresh();
  }, V.use = function(f) {
    return K.H.use(f);
  }, V.useActionState = function(f, S, _) {
    return K.H.useActionState(f, S, _);
  }, V.useCallback = function(f, S) {
    return K.H.useCallback(f, S);
  }, V.useContext = function(f) {
    return K.H.useContext(f);
  }, V.useDebugValue = function() {
  }, V.useDeferredValue = function(f, S) {
    return K.H.useDeferredValue(f, S);
  }, V.useEffect = function(f, S) {
    return K.H.useEffect(f, S);
  }, V.useEffectEvent = function(f) {
    return K.H.useEffectEvent(f);
  }, V.useId = function() {
    return K.H.useId();
  }, V.useImperativeHandle = function(f, S, _) {
    return K.H.useImperativeHandle(f, S, _);
  }, V.useInsertionEffect = function(f, S) {
    return K.H.useInsertionEffect(f, S);
  }, V.useLayoutEffect = function(f, S) {
    return K.H.useLayoutEffect(f, S);
  }, V.useMemo = function(f, S) {
    return K.H.useMemo(f, S);
  }, V.useOptimistic = function(f, S) {
    return K.H.useOptimistic(f, S);
  }, V.useReducer = function(f, S, _) {
    return K.H.useReducer(f, S, _);
  }, V.useRef = function(f) {
    return K.H.useRef(f);
  }, V.useState = function(f) {
    return K.H.useState(f);
  }, V.useSyncExternalStore = function(f, S, _) {
    return K.H.useSyncExternalStore(
      f,
      S,
      _
    );
  }, V.useTransition = function() {
    return K.H.useTransition();
  }, V.version = "19.2.8", V;
}
var xd;
function ms() {
  return xd || (xd = 1, cs.exports = ry()), cs.exports;
}
var G = ms();
const oy = /* @__PURE__ */ cy(G);
var ss = { exports: {} }, jn = {}, fs = { exports: {} }, rs = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var jd;
function dy() {
  return jd || (jd = 1, (function(v) {
    function W(d, T) {
      var Q = d.length;
      d.push(T);
      l: for (; 0 < Q; ) {
        var I = Q - 1 >>> 1, z = d[I];
        if (0 < q(z, T))
          d[I] = T, d[Q] = z, Q = I;
        else break l;
      }
    }
    function C(d) {
      return d.length === 0 ? null : d[0];
    }
    function m(d) {
      if (d.length === 0) return null;
      var T = d[0], Q = d.pop();
      if (Q !== T) {
        d[0] = Q;
        l: for (var I = 0, z = d.length, f = z >>> 1; I < f; ) {
          var S = 2 * (I + 1) - 1, _ = d[S], D = S + 1, J = d[D];
          if (0 > q(_, Q))
            D < z && 0 > q(J, _) ? (d[I] = J, d[D] = Q, I = D) : (d[I] = _, d[S] = Q, I = S);
          else if (D < z && 0 > q(J, Q))
            d[I] = J, d[D] = Q, I = D;
          else break l;
        }
      }
      return T;
    }
    function q(d, T) {
      var Q = d.sortIndex - T.sortIndex;
      return Q !== 0 ? Q : d.id - T.id;
    }
    if (v.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var w = performance;
      v.unstable_now = function() {
        return w.now();
      };
    } else {
      var Z = Date, F = Z.now();
      v.unstable_now = function() {
        return Z.now() - F;
      };
    }
    var A = [], j = [], O = 1, U = null, M = 3, cl = !1, R = !1, H = !1, ul = !1, il = typeof setTimeout == "function" ? setTimeout : null, Rl = typeof clearTimeout == "function" ? clearTimeout : null, gl = typeof setImmediate < "u" ? setImmediate : null;
    function ql(d) {
      for (var T = C(j); T !== null; ) {
        if (T.callback === null) m(j);
        else if (T.startTime <= d)
          m(j), T.sortIndex = T.expirationTime, W(A, T);
        else break;
        T = C(j);
      }
    }
    function Bl(d) {
      if (H = !1, ql(d), !R)
        if (C(A) !== null)
          R = !0, jl || (jl = !0, El());
        else {
          var T = C(j);
          T !== null && Jl(Bl, T.startTime - d);
        }
    }
    var jl = !1, K = -1, Ol = 5, Ql = -1;
    function ue() {
      return ul ? !0 : !(v.unstable_now() - Ql < Ol);
    }
    function Kl() {
      if (ul = !1, jl) {
        var d = v.unstable_now();
        Ql = d;
        var T = !0;
        try {
          l: {
            R = !1, H && (H = !1, Rl(K), K = -1), cl = !0;
            var Q = M;
            try {
              e: {
                for (ql(d), U = C(A); U !== null && !(U.expirationTime > d && ue()); ) {
                  var I = U.callback;
                  if (typeof I == "function") {
                    U.callback = null, M = U.priorityLevel;
                    var z = I(
                      U.expirationTime <= d
                    );
                    if (d = v.unstable_now(), typeof z == "function") {
                      U.callback = z, ql(d), T = !0;
                      break e;
                    }
                    U === C(A) && m(A), ql(d);
                  } else m(A);
                  U = C(A);
                }
                if (U !== null) T = !0;
                else {
                  var f = C(j);
                  f !== null && Jl(
                    Bl,
                    f.startTime - d
                  ), T = !1;
                }
              }
              break l;
            } finally {
              U = null, M = Q, cl = !1;
            }
            T = void 0;
          }
        } finally {
          T ? El() : jl = !1;
        }
      }
    }
    var El;
    if (typeof gl == "function")
      El = function() {
        gl(Kl);
      };
    else if (typeof MessageChannel < "u") {
      var ve = new MessageChannel(), Fl = ve.port2;
      ve.port1.onmessage = Kl, El = function() {
        Fl.postMessage(null);
      };
    } else
      El = function() {
        il(Kl, 0);
      };
    function Jl(d, T) {
      K = il(function() {
        d(v.unstable_now());
      }, T);
    }
    v.unstable_IdlePriority = 5, v.unstable_ImmediatePriority = 1, v.unstable_LowPriority = 4, v.unstable_NormalPriority = 3, v.unstable_Profiling = null, v.unstable_UserBlockingPriority = 2, v.unstable_cancelCallback = function(d) {
      d.callback = null;
    }, v.unstable_forceFrameRate = function(d) {
      0 > d || 125 < d ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Ol = 0 < d ? Math.floor(1e3 / d) : 5;
    }, v.unstable_getCurrentPriorityLevel = function() {
      return M;
    }, v.unstable_next = function(d) {
      switch (M) {
        case 1:
        case 2:
        case 3:
          var T = 3;
          break;
        default:
          T = M;
      }
      var Q = M;
      M = T;
      try {
        return d();
      } finally {
        M = Q;
      }
    }, v.unstable_requestPaint = function() {
      ul = !0;
    }, v.unstable_runWithPriority = function(d, T) {
      switch (d) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          d = 3;
      }
      var Q = M;
      M = d;
      try {
        return T();
      } finally {
        M = Q;
      }
    }, v.unstable_scheduleCallback = function(d, T, Q) {
      var I = v.unstable_now();
      switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? I + Q : I) : Q = I, d) {
        case 1:
          var z = -1;
          break;
        case 2:
          z = 250;
          break;
        case 5:
          z = 1073741823;
          break;
        case 4:
          z = 1e4;
          break;
        default:
          z = 5e3;
      }
      return z = Q + z, d = {
        id: O++,
        callback: T,
        priorityLevel: d,
        startTime: Q,
        expirationTime: z,
        sortIndex: -1
      }, Q > I ? (d.sortIndex = Q, W(j, d), C(A) === null && d === C(j) && (H ? (Rl(K), K = -1) : H = !0, Jl(Bl, Q - I))) : (d.sortIndex = z, W(A, d), R || cl || (R = !0, jl || (jl = !0, El()))), d;
    }, v.unstable_shouldYield = ue, v.unstable_wrapCallback = function(d) {
      var T = M;
      return function() {
        var Q = M;
        M = T;
        try {
          return d.apply(this, arguments);
        } finally {
          M = Q;
        }
      };
    };
  })(rs)), rs;
}
var Ed;
function hy() {
  return Ed || (Ed = 1, fs.exports = dy()), fs.exports;
}
var os = { exports: {} }, kl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Nd;
function my() {
  if (Nd) return kl;
  Nd = 1;
  var v = ms();
  function W(A) {
    var j = "https://react.dev/errors/" + A;
    if (1 < arguments.length) {
      j += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var O = 2; O < arguments.length; O++)
        j += "&args[]=" + encodeURIComponent(arguments[O]);
    }
    return "Minified React error #" + A + "; visit " + j + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function C() {
  }
  var m = {
    d: {
      f: C,
      r: function() {
        throw Error(W(522));
      },
      D: C,
      C,
      L: C,
      m: C,
      X: C,
      S: C,
      M: C
    },
    p: 0,
    findDOMNode: null
  }, q = Symbol.for("react.portal");
  function w(A, j, O) {
    var U = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: q,
      key: U == null ? null : "" + U,
      children: A,
      containerInfo: j,
      implementation: O
    };
  }
  var Z = v.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function F(A, j) {
    if (A === "font") return "";
    if (typeof j == "string")
      return j === "use-credentials" ? j : "";
  }
  return kl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = m, kl.createPortal = function(A, j) {
    var O = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!j || j.nodeType !== 1 && j.nodeType !== 9 && j.nodeType !== 11)
      throw Error(W(299));
    return w(A, j, null, O);
  }, kl.flushSync = function(A) {
    var j = Z.T, O = m.p;
    try {
      if (Z.T = null, m.p = 2, A) return A();
    } finally {
      Z.T = j, m.p = O, m.d.f();
    }
  }, kl.preconnect = function(A, j) {
    typeof A == "string" && (j ? (j = j.crossOrigin, j = typeof j == "string" ? j === "use-credentials" ? j : "" : void 0) : j = null, m.d.C(A, j));
  }, kl.prefetchDNS = function(A) {
    typeof A == "string" && m.d.D(A);
  }, kl.preinit = function(A, j) {
    if (typeof A == "string" && j && typeof j.as == "string") {
      var O = j.as, U = F(O, j.crossOrigin), M = typeof j.integrity == "string" ? j.integrity : void 0, cl = typeof j.fetchPriority == "string" ? j.fetchPriority : void 0;
      O === "style" ? m.d.S(
        A,
        typeof j.precedence == "string" ? j.precedence : void 0,
        {
          crossOrigin: U,
          integrity: M,
          fetchPriority: cl
        }
      ) : O === "script" && m.d.X(A, {
        crossOrigin: U,
        integrity: M,
        fetchPriority: cl,
        nonce: typeof j.nonce == "string" ? j.nonce : void 0
      });
    }
  }, kl.preinitModule = function(A, j) {
    if (typeof A == "string")
      if (typeof j == "object" && j !== null) {
        if (j.as == null || j.as === "script") {
          var O = F(
            j.as,
            j.crossOrigin
          );
          m.d.M(A, {
            crossOrigin: O,
            integrity: typeof j.integrity == "string" ? j.integrity : void 0,
            nonce: typeof j.nonce == "string" ? j.nonce : void 0
          });
        }
      } else j == null && m.d.M(A);
  }, kl.preload = function(A, j) {
    if (typeof A == "string" && typeof j == "object" && j !== null && typeof j.as == "string") {
      var O = j.as, U = F(O, j.crossOrigin);
      m.d.L(A, O, {
        crossOrigin: U,
        integrity: typeof j.integrity == "string" ? j.integrity : void 0,
        nonce: typeof j.nonce == "string" ? j.nonce : void 0,
        type: typeof j.type == "string" ? j.type : void 0,
        fetchPriority: typeof j.fetchPriority == "string" ? j.fetchPriority : void 0,
        referrerPolicy: typeof j.referrerPolicy == "string" ? j.referrerPolicy : void 0,
        imageSrcSet: typeof j.imageSrcSet == "string" ? j.imageSrcSet : void 0,
        imageSizes: typeof j.imageSizes == "string" ? j.imageSizes : void 0,
        media: typeof j.media == "string" ? j.media : void 0
      });
    }
  }, kl.preloadModule = function(A, j) {
    if (typeof A == "string")
      if (j) {
        var O = F(j.as, j.crossOrigin);
        m.d.m(A, {
          as: typeof j.as == "string" && j.as !== "script" ? j.as : void 0,
          crossOrigin: O,
          integrity: typeof j.integrity == "string" ? j.integrity : void 0
        });
      } else m.d.m(A);
  }, kl.requestFormReset = function(A) {
    m.d.r(A);
  }, kl.unstable_batchedUpdates = function(A, j) {
    return A(j);
  }, kl.useFormState = function(A, j, O) {
    return Z.H.useFormState(A, j, O);
  }, kl.useFormStatus = function() {
    return Z.H.useHostTransitionStatus();
  }, kl.version = "19.2.8", kl;
}
var Td;
function yy() {
  if (Td) return os.exports;
  Td = 1;
  function v() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(v);
      } catch (W) {
        console.error(W);
      }
  }
  return v(), os.exports = my(), os.exports;
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
var Ad;
function vy() {
  if (Ad) return jn;
  Ad = 1;
  var v = hy(), W = ms(), C = yy();
  function m(l) {
    var e = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var t = 2; t < arguments.length; t++)
        e += "&args[]=" + encodeURIComponent(arguments[t]);
    }
    return "Minified React error #" + l + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function q(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function w(l) {
    var e = l, t = l;
    if (l.alternate) for (; e.return; ) e = e.return;
    else {
      l = e;
      do
        e = l, (e.flags & 4098) !== 0 && (t = e.return), l = e.return;
      while (l);
    }
    return e.tag === 3 ? t : null;
  }
  function Z(l) {
    if (l.tag === 13) {
      var e = l.memoizedState;
      if (e === null && (l = l.alternate, l !== null && (e = l.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function F(l) {
    if (l.tag === 31) {
      var e = l.memoizedState;
      if (e === null && (l = l.alternate, l !== null && (e = l.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function A(l) {
    if (w(l) !== l)
      throw Error(m(188));
  }
  function j(l) {
    var e = l.alternate;
    if (!e) {
      if (e = w(l), e === null) throw Error(m(188));
      return e !== l ? null : l;
    }
    for (var t = l, a = e; ; ) {
      var n = t.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (a = n.return, a !== null) {
          t = a;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === t) return A(n), l;
          if (u === a) return A(n), e;
          u = u.sibling;
        }
        throw Error(m(188));
      }
      if (t.return !== a.return) t = n, a = u;
      else {
        for (var i = !1, s = n.child; s; ) {
          if (s === t) {
            i = !0, t = n, a = u;
            break;
          }
          if (s === a) {
            i = !0, a = n, t = u;
            break;
          }
          s = s.sibling;
        }
        if (!i) {
          for (s = u.child; s; ) {
            if (s === t) {
              i = !0, t = u, a = n;
              break;
            }
            if (s === a) {
              i = !0, a = u, t = n;
              break;
            }
            s = s.sibling;
          }
          if (!i) throw Error(m(189));
        }
      }
      if (t.alternate !== a) throw Error(m(190));
    }
    if (t.tag !== 3) throw Error(m(188));
    return t.stateNode.current === t ? l : e;
  }
  function O(l) {
    var e = l.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return l;
    for (l = l.child; l !== null; ) {
      if (e = O(l), e !== null) return e;
      l = l.sibling;
    }
    return null;
  }
  var U = Object.assign, M = Symbol.for("react.element"), cl = Symbol.for("react.transitional.element"), R = Symbol.for("react.portal"), H = Symbol.for("react.fragment"), ul = Symbol.for("react.strict_mode"), il = Symbol.for("react.profiler"), Rl = Symbol.for("react.consumer"), gl = Symbol.for("react.context"), ql = Symbol.for("react.forward_ref"), Bl = Symbol.for("react.suspense"), jl = Symbol.for("react.suspense_list"), K = Symbol.for("react.memo"), Ol = Symbol.for("react.lazy"), Ql = Symbol.for("react.activity"), ue = Symbol.for("react.memo_cache_sentinel"), Kl = Symbol.iterator;
  function El(l) {
    return l === null || typeof l != "object" ? null : (l = Kl && l[Kl] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var ve = Symbol.for("react.client.reference");
  function Fl(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === ve ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case H:
        return "Fragment";
      case il:
        return "Profiler";
      case ul:
        return "StrictMode";
      case Bl:
        return "Suspense";
      case jl:
        return "SuspenseList";
      case Ql:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case R:
          return "Portal";
        case gl:
          return l.displayName || "Context";
        case Rl:
          return (l._context.displayName || "Context") + ".Consumer";
        case ql:
          var e = l.render;
          return l = l.displayName, l || (l = e.displayName || e.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case K:
          return e = l.displayName || null, e !== null ? e : Fl(l.type) || "Memo";
        case Ol:
          e = l._payload, l = l._init;
          try {
            return Fl(l(e));
          } catch {
          }
      }
    return null;
  }
  var Jl = Array.isArray, d = W.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, T = C.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, I = [], z = -1;
  function f(l) {
    return { current: l };
  }
  function S(l) {
    0 > z || (l.current = I[z], I[z] = null, z--);
  }
  function _(l, e) {
    z++, I[z] = l.current, l.current = e;
  }
  var D = f(null), J = f(null), P = f(null), ol = f(null);
  function $l(l, e) {
    switch (_(P, e), _(J, l), _(D, null), e.nodeType) {
      case 9:
      case 11:
        l = (l = e.documentElement) && (l = l.namespaceURI) ? Xo(l) : 0;
        break;
      default:
        if (l = e.tagName, e = e.namespaceURI)
          e = Xo(e), l = Lo(e, l);
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
    S(D), _(D, l);
  }
  function Al() {
    S(D), S(J), S(P);
  }
  function _a(l) {
    l.memoizedState !== null && _(ol, l);
    var e = D.current, t = Lo(e, l.type);
    e !== t && (_(J, l), _(D, t));
  }
  function En(l) {
    J.current === l && (S(D), S(J)), ol.current === l && (S(ol), gn._currentValue = Q);
  }
  var Lu, ys;
  function Et(l) {
    if (Lu === void 0)
      try {
        throw Error();
      } catch (t) {
        var e = t.stack.trim().match(/\n( *(at )?)/);
        Lu = e && e[1] || "", ys = -1 < t.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < t.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Lu + l + ys;
  }
  var Zu = !1;
  function Vu(l, e) {
    if (!l || Zu) return "";
    Zu = !0;
    var t = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var N = function() {
                throw Error();
              };
              if (Object.defineProperty(N.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(N, []);
                } catch (p) {
                  var b = p;
                }
                Reflect.construct(l, [], N);
              } else {
                try {
                  N.call();
                } catch (p) {
                  b = p;
                }
                l.call(N.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (p) {
                b = p;
              }
              (N = l()) && typeof N.catch == "function" && N.catch(function() {
              });
            }
          } catch (p) {
            if (p && b && typeof p.stack == "string")
              return [p.stack, b.stack];
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
        var r = i.split(`
`), g = s.split(`
`);
        for (n = a = 0; a < r.length && !r[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < g.length && !g[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === r.length || n === g.length)
          for (a = r.length - 1, n = g.length - 1; 1 <= a && 0 <= n && r[a] !== g[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (r[a] !== g[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || r[a] !== g[n]) {
                  var x = `
` + r[a].replace(" at new ", " at ");
                  return l.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", l.displayName)), x;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      Zu = !1, Error.prepareStackTrace = t;
    }
    return (t = l ? l.displayName || l.name : "") ? Et(t) : "";
  }
  function Yd(l, e) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Et(l.type);
      case 16:
        return Et("Lazy");
      case 13:
        return l.child !== e && e !== null ? Et("Suspense Fallback") : Et("Suspense");
      case 19:
        return Et("SuspenseList");
      case 0:
      case 15:
        return Vu(l.type, !1);
      case 11:
        return Vu(l.type.render, !1);
      case 1:
        return Vu(l.type, !0);
      case 31:
        return Et("Activity");
      default:
        return "";
    }
  }
  function vs(l) {
    try {
      var e = "", t = null;
      do
        e += Yd(l, t), t = l, l = l.return;
      while (l);
      return e;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var wu = Object.prototype.hasOwnProperty, Ku = v.unstable_scheduleCallback, Ju = v.unstable_cancelCallback, Gd = v.unstable_shouldYield, Qd = v.unstable_requestPaint, ie = v.unstable_now, Xd = v.unstable_getCurrentPriorityLevel, gs = v.unstable_ImmediatePriority, bs = v.unstable_UserBlockingPriority, Nn = v.unstable_NormalPriority, Ld = v.unstable_LowPriority, ps = v.unstable_IdlePriority, Zd = v.log, Vd = v.unstable_setDisableYieldValue, za = null, ce = null;
  function Ie(l) {
    if (typeof Zd == "function" && Vd(l), ce && typeof ce.setStrictMode == "function")
      try {
        ce.setStrictMode(za, l);
      } catch {
      }
  }
  var se = Math.clz32 ? Math.clz32 : Jd, wd = Math.log, Kd = Math.LN2;
  function Jd(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (wd(l) / Kd | 0) | 0;
  }
  var Tn = 256, An = 262144, _n = 4194304;
  function Nt(l) {
    var e = l & 42;
    if (e !== 0) return e;
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
  function zn(l, e, t) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = l.suspendedLanes, i = l.pingedLanes;
    l = l.warmLanes;
    var s = a & 134217727;
    return s !== 0 ? (a = s & ~u, a !== 0 ? n = Nt(a) : (i &= s, i !== 0 ? n = Nt(i) : t || (t = s & ~l, t !== 0 && (n = Nt(t))))) : (s = a & ~u, s !== 0 ? n = Nt(s) : i !== 0 ? n = Nt(i) : t || (t = a & ~l, t !== 0 && (n = Nt(t)))), n === 0 ? 0 : e !== 0 && e !== n && (e & u) === 0 && (u = n & -n, t = e & -e, u >= t || u === 32 && (t & 4194048) !== 0) ? e : n;
  }
  function Oa(l, e) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & e) === 0;
  }
  function kd(l, e) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
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
        return e + 5e3;
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
    var l = _n;
    return _n <<= 1, (_n & 62914560) === 0 && (_n = 4194304), l;
  }
  function ku(l) {
    for (var e = [], t = 0; 31 > t; t++) e.push(l);
    return e;
  }
  function Ca(l, e) {
    l.pendingLanes |= e, e !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function $d(l, e, t, a, n, u) {
    var i = l.pendingLanes;
    l.pendingLanes = t, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= t, l.entangledLanes &= t, l.errorRecoveryDisabledLanes &= t, l.shellSuspendCounter = 0;
    var s = l.entanglements, r = l.expirationTimes, g = l.hiddenUpdates;
    for (t = i & ~t; 0 < t; ) {
      var x = 31 - se(t), N = 1 << x;
      s[x] = 0, r[x] = -1;
      var b = g[x];
      if (b !== null)
        for (g[x] = null, x = 0; x < b.length; x++) {
          var p = b[x];
          p !== null && (p.lane &= -536870913);
        }
      t &= ~N;
    }
    a !== 0 && xs(l, a, 0), u !== 0 && n === 0 && l.tag !== 0 && (l.suspendedLanes |= u & ~(i & ~e));
  }
  function xs(l, e, t) {
    l.pendingLanes |= e, l.suspendedLanes &= ~e;
    var a = 31 - se(e);
    l.entangledLanes |= e, l.entanglements[a] = l.entanglements[a] | 1073741824 | t & 261930;
  }
  function js(l, e) {
    var t = l.entangledLanes |= e;
    for (l = l.entanglements; t; ) {
      var a = 31 - se(t), n = 1 << a;
      n & e | l[a] & e && (l[a] |= e), t &= ~n;
    }
  }
  function Es(l, e) {
    var t = e & -e;
    return t = (t & 42) !== 0 ? 1 : $u(t), (t & (l.suspendedLanes | e)) !== 0 ? 0 : t;
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
  function Ns() {
    var l = T.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : od(l.type));
  }
  function Ts(l, e) {
    var t = T.p;
    try {
      return T.p = l, e();
    } finally {
      T.p = t;
    }
  }
  var Pe = Math.random().toString(36).slice(2), Xl = "__reactFiber$" + Pe, Il = "__reactProps$" + Pe, Zt = "__reactContainer$" + Pe, Fu = "__reactEvents$" + Pe, Wd = "__reactListeners$" + Pe, Fd = "__reactHandles$" + Pe, As = "__reactResources$" + Pe, Ma = "__reactMarker$" + Pe;
  function Iu(l) {
    delete l[Xl], delete l[Il], delete l[Fu], delete l[Wd], delete l[Fd];
  }
  function Vt(l) {
    var e = l[Xl];
    if (e) return e;
    for (var t = l.parentNode; t; ) {
      if (e = t[Zt] || t[Xl]) {
        if (t = e.alternate, e.child !== null || t !== null && t.child !== null)
          for (l = $o(l); l !== null; ) {
            if (t = l[Xl]) return t;
            l = $o(l);
          }
        return e;
      }
      l = t, t = l.parentNode;
    }
    return null;
  }
  function wt(l) {
    if (l = l[Xl] || l[Zt]) {
      var e = l.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return l;
    }
    return null;
  }
  function Da(l) {
    var e = l.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return l.stateNode;
    throw Error(m(33));
  }
  function Kt(l) {
    var e = l[As];
    return e || (e = l[As] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function Yl(l) {
    l[Ma] = !0;
  }
  var _s = /* @__PURE__ */ new Set(), zs = {};
  function Tt(l, e) {
    Jt(l, e), Jt(l + "Capture", e);
  }
  function Jt(l, e) {
    for (zs[l] = e, l = 0; l < e.length; l++)
      _s.add(e[l]);
  }
  var Id = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Os = {}, Cs = {};
  function Pd(l) {
    return wu.call(Cs, l) ? !0 : wu.call(Os, l) ? !1 : Id.test(l) ? Cs[l] = !0 : (Os[l] = !0, !1);
  }
  function On(l, e, t) {
    if (Pd(e))
      if (t === null) l.removeAttribute(e);
      else {
        switch (typeof t) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(e);
            return;
          case "boolean":
            var a = e.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              l.removeAttribute(e);
              return;
            }
        }
        l.setAttribute(e, "" + t);
      }
  }
  function Cn(l, e, t) {
    if (t === null) l.removeAttribute(e);
    else {
      switch (typeof t) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(e);
          return;
      }
      l.setAttribute(e, "" + t);
    }
  }
  function Re(l, e, t, a) {
    if (a === null) l.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttributeNS(e, t, "" + a);
    }
  }
  function ge(l) {
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
  function Ms(l) {
    var e = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function lh(l, e, t) {
    var a = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      e
    );
    if (!l.hasOwnProperty(e) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, u = a.set;
      return Object.defineProperty(l, e, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(i) {
          t = "" + i, u.call(this, i);
        }
      }), Object.defineProperty(l, e, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return t;
        },
        setValue: function(i) {
          t = "" + i;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[e];
        }
      };
    }
  }
  function Pu(l) {
    if (!l._valueTracker) {
      var e = Ms(l) ? "checked" : "value";
      l._valueTracker = lh(
        l,
        e,
        "" + l[e]
      );
    }
  }
  function Ds(l) {
    if (!l) return !1;
    var e = l._valueTracker;
    if (!e) return !0;
    var t = e.getValue(), a = "";
    return l && (a = Ms(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== t ? (e.setValue(l), !0) : !1;
  }
  function Mn(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var eh = /[\n"\\]/g;
  function be(l) {
    return l.replace(
      eh,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function li(l, e, t, a, n, u, i, s) {
    l.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.type = i : l.removeAttribute("type"), e != null ? i === "number" ? (e === 0 && l.value === "" || l.value != e) && (l.value = "" + ge(e)) : l.value !== "" + ge(e) && (l.value = "" + ge(e)) : i !== "submit" && i !== "reset" || l.removeAttribute("value"), e != null ? ei(l, i, ge(e)) : t != null ? ei(l, i, ge(t)) : a != null && l.removeAttribute("value"), n == null && u != null && (l.defaultChecked = !!u), n != null && (l.checked = n && typeof n != "function" && typeof n != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? l.name = "" + ge(s) : l.removeAttribute("name");
  }
  function Us(l, e, t, a, n, u, i, s) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (l.type = u), e != null || t != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        Pu(l);
        return;
      }
      t = t != null ? "" + ge(t) : "", e = e != null ? "" + ge(e) : t, s || e === l.value || (l.value = e), l.defaultValue = e;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = s ? l.checked : !!a, l.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (l.name = i), Pu(l);
  }
  function ei(l, e, t) {
    e === "number" && Mn(l.ownerDocument) === l || l.defaultValue === "" + t || (l.defaultValue = "" + t);
  }
  function kt(l, e, t, a) {
    if (l = l.options, e) {
      e = {};
      for (var n = 0; n < t.length; n++)
        e["$" + t[n]] = !0;
      for (t = 0; t < l.length; t++)
        n = e.hasOwnProperty("$" + l[t].value), l[t].selected !== n && (l[t].selected = n), n && a && (l[t].defaultSelected = !0);
    } else {
      for (t = "" + ge(t), e = null, n = 0; n < l.length; n++) {
        if (l[n].value === t) {
          l[n].selected = !0, a && (l[n].defaultSelected = !0);
          return;
        }
        e !== null || l[n].disabled || (e = l[n]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Rs(l, e, t) {
    if (e != null && (e = "" + ge(e), e !== l.value && (l.value = e), t == null)) {
      l.defaultValue !== e && (l.defaultValue = e);
      return;
    }
    l.defaultValue = t != null ? "" + ge(t) : "";
  }
  function Hs(l, e, t, a) {
    if (e == null) {
      if (a != null) {
        if (t != null) throw Error(m(92));
        if (Jl(a)) {
          if (1 < a.length) throw Error(m(93));
          a = a[0];
        }
        t = a;
      }
      t == null && (t = ""), e = t;
    }
    t = ge(e), l.defaultValue = t, a = l.textContent, a === t && a !== "" && a !== null && (l.value = a), Pu(l);
  }
  function $t(l, e) {
    if (e) {
      var t = l.firstChild;
      if (t && t === l.lastChild && t.nodeType === 3) {
        t.nodeValue = e;
        return;
      }
    }
    l.textContent = e;
  }
  var th = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function qs(l, e, t) {
    var a = e.indexOf("--") === 0;
    t == null || typeof t == "boolean" || t === "" ? a ? l.setProperty(e, "") : e === "float" ? l.cssFloat = "" : l[e] = "" : a ? l.setProperty(e, t) : typeof t != "number" || t === 0 || th.has(e) ? e === "float" ? l.cssFloat = t : l[e] = ("" + t).trim() : l[e] = t + "px";
  }
  function Bs(l, e, t) {
    if (e != null && typeof e != "object")
      throw Error(m(62));
    if (l = l.style, t != null) {
      for (var a in t)
        !t.hasOwnProperty(a) || e != null && e.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var n in e)
        a = e[n], e.hasOwnProperty(n) && t[n] !== a && qs(l, n, a);
    } else
      for (var u in e)
        e.hasOwnProperty(u) && qs(l, u, e[u]);
  }
  function ti(l) {
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
  var ah = /* @__PURE__ */ new Map([
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
  ]), nh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Dn(l) {
    return nh.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function He() {
  }
  var ai = null;
  function ni(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var Wt = null, Ft = null;
  function Ys(l) {
    var e = wt(l);
    if (e && (l = e.stateNode)) {
      var t = l[Il] || null;
      l: switch (l = e.stateNode, e.type) {
        case "input":
          if (li(
            l,
            t.value,
            t.defaultValue,
            t.defaultValue,
            t.checked,
            t.defaultChecked,
            t.type,
            t.name
          ), e = t.name, t.type === "radio" && e != null) {
            for (t = l; t.parentNode; ) t = t.parentNode;
            for (t = t.querySelectorAll(
              'input[name="' + be(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < t.length; e++) {
              var a = t[e];
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
            for (e = 0; e < t.length; e++)
              a = t[e], a.form === l.form && Ds(a);
          }
          break l;
        case "textarea":
          Rs(l, t.value, t.defaultValue);
          break l;
        case "select":
          e = t.value, e != null && kt(l, !!t.multiple, e, !1);
      }
    }
  }
  var ui = !1;
  function Gs(l, e, t) {
    if (ui) return l(e, t);
    ui = !0;
    try {
      var a = l(e);
      return a;
    } finally {
      if (ui = !1, (Wt !== null || Ft !== null) && (pu(), Wt && (e = Wt, l = Ft, Ft = Wt = null, Ys(e), l)))
        for (e = 0; e < l.length; e++) Ys(l[e]);
    }
  }
  function Ua(l, e) {
    var t = l.stateNode;
    if (t === null) return null;
    var a = t[Il] || null;
    if (a === null) return null;
    t = a[e];
    l: switch (e) {
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
    if (t && typeof t != "function")
      throw Error(
        m(231, e, typeof t)
      );
    return t;
  }
  var qe = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ii = !1;
  if (qe)
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
  var lt = null, ci = null, Un = null;
  function Qs() {
    if (Un) return Un;
    var l, e = ci, t = e.length, a, n = "value" in lt ? lt.value : lt.textContent, u = n.length;
    for (l = 0; l < t && e[l] === n[l]; l++) ;
    var i = t - l;
    for (a = 1; a <= i && e[t - a] === n[u - a]; a++) ;
    return Un = n.slice(l, 1 < a ? 1 - a : void 0);
  }
  function Rn(l) {
    var e = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && e === 13 && (l = 13)) : l = e, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Hn() {
    return !0;
  }
  function Xs() {
    return !1;
  }
  function Pl(l) {
    function e(t, a, n, u, i) {
      this._reactName = t, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var s in l)
        l.hasOwnProperty(s) && (t = l[s], this[s] = t ? t(u) : u[s]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Hn : Xs, this.isPropagationStopped = Xs, this;
    }
    return U(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var t = this.nativeEvent;
        t && (t.preventDefault ? t.preventDefault() : typeof t.returnValue != "unknown" && (t.returnValue = !1), this.isDefaultPrevented = Hn);
      },
      stopPropagation: function() {
        var t = this.nativeEvent;
        t && (t.stopPropagation ? t.stopPropagation() : typeof t.cancelBubble != "unknown" && (t.cancelBubble = !0), this.isPropagationStopped = Hn);
      },
      persist: function() {
      },
      isPersistent: Hn
    }), e;
  }
  var At = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, qn = Pl(At), Ha = U({}, At, { view: 0, detail: 0 }), uh = Pl(Ha), si, fi, qa, Bn = U({}, Ha, {
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
    getModifierState: oi,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== qa && (qa && l.type === "mousemove" ? (si = l.screenX - qa.screenX, fi = l.screenY - qa.screenY) : fi = si = 0, qa = l), si);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : fi;
    }
  }), Ls = Pl(Bn), ih = U({}, Bn, { dataTransfer: 0 }), ch = Pl(ih), sh = U({}, Ha, { relatedTarget: 0 }), ri = Pl(sh), fh = U({}, At, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), rh = Pl(fh), oh = U({}, At, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), dh = Pl(oh), hh = U({}, At, { data: 0 }), Zs = Pl(hh), mh = {
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
  }, yh = {
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
  function gh(l) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(l) : (l = vh[l]) ? !!e[l] : !1;
  }
  function oi() {
    return gh;
  }
  var bh = U({}, Ha, {
    key: function(l) {
      if (l.key) {
        var e = mh[l.key] || l.key;
        if (e !== "Unidentified") return e;
      }
      return l.type === "keypress" ? (l = Rn(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? yh[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: oi,
    charCode: function(l) {
      return l.type === "keypress" ? Rn(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? Rn(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), ph = Pl(bh), Sh = U({}, Bn, {
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
  }), Vs = Pl(Sh), xh = U({}, Ha, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: oi
  }), jh = Pl(xh), Eh = U({}, At, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Nh = Pl(Eh), Th = U({}, Bn, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Ah = Pl(Th), _h = U({}, At, {
    newState: 0,
    oldState: 0
  }), zh = Pl(_h), Oh = [9, 13, 27, 32], di = qe && "CompositionEvent" in window, Ba = null;
  qe && "documentMode" in document && (Ba = document.documentMode);
  var Ch = qe && "TextEvent" in window && !Ba, ws = qe && (!di || Ba && 8 < Ba && 11 >= Ba), Ks = " ", Js = !1;
  function ks(l, e) {
    switch (l) {
      case "keyup":
        return Oh.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
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
  var It = !1;
  function Mh(l, e) {
    switch (l) {
      case "compositionend":
        return $s(e);
      case "keypress":
        return e.which !== 32 ? null : (Js = !0, Ks);
      case "textInput":
        return l = e.data, l === Ks && Js ? null : l;
      default:
        return null;
    }
  }
  function Dh(l, e) {
    if (It)
      return l === "compositionend" || !di && ks(l, e) ? (l = Qs(), Un = ci = lt = null, It = !1, l) : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return ws && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var Uh = {
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
    var e = l && l.nodeName && l.nodeName.toLowerCase();
    return e === "input" ? !!Uh[l.type] : e === "textarea";
  }
  function Fs(l, e, t, a) {
    Wt ? Ft ? Ft.push(a) : Ft = [a] : Wt = a, e = Au(e, "onChange"), 0 < e.length && (t = new qn(
      "onChange",
      "change",
      null,
      t,
      a
    ), l.push({ event: t, listeners: e }));
  }
  var Ya = null, Ga = null;
  function Rh(l) {
    Ho(l, 0);
  }
  function Yn(l) {
    var e = Da(l);
    if (Ds(e)) return l;
  }
  function Is(l, e) {
    if (l === "change") return e;
  }
  var Ps = !1;
  if (qe) {
    var hi;
    if (qe) {
      var mi = "oninput" in document;
      if (!mi) {
        var lf = document.createElement("div");
        lf.setAttribute("oninput", "return;"), mi = typeof lf.oninput == "function";
      }
      hi = mi;
    } else hi = !1;
    Ps = hi && (!document.documentMode || 9 < document.documentMode);
  }
  function ef() {
    Ya && (Ya.detachEvent("onpropertychange", tf), Ga = Ya = null);
  }
  function tf(l) {
    if (l.propertyName === "value" && Yn(Ga)) {
      var e = [];
      Fs(
        e,
        Ga,
        l,
        ni(l)
      ), Gs(Rh, e);
    }
  }
  function Hh(l, e, t) {
    l === "focusin" ? (ef(), Ya = e, Ga = t, Ya.attachEvent("onpropertychange", tf)) : l === "focusout" && ef();
  }
  function qh(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Yn(Ga);
  }
  function Bh(l, e) {
    if (l === "click") return Yn(e);
  }
  function Yh(l, e) {
    if (l === "input" || l === "change")
      return Yn(e);
  }
  function Gh(l, e) {
    return l === e && (l !== 0 || 1 / l === 1 / e) || l !== l && e !== e;
  }
  var fe = typeof Object.is == "function" ? Object.is : Gh;
  function Qa(l, e) {
    if (fe(l, e)) return !0;
    if (typeof l != "object" || l === null || typeof e != "object" || e === null)
      return !1;
    var t = Object.keys(l), a = Object.keys(e);
    if (t.length !== a.length) return !1;
    for (a = 0; a < t.length; a++) {
      var n = t[a];
      if (!wu.call(e, n) || !fe(l[n], e[n]))
        return !1;
    }
    return !0;
  }
  function af(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function nf(l, e) {
    var t = af(l);
    l = 0;
    for (var a; t; ) {
      if (t.nodeType === 3) {
        if (a = l + t.textContent.length, l <= e && a >= e)
          return { node: t, offset: e - l };
        l = a;
      }
      l: {
        for (; t; ) {
          if (t.nextSibling) {
            t = t.nextSibling;
            break l;
          }
          t = t.parentNode;
        }
        t = void 0;
      }
      t = af(t);
    }
  }
  function uf(l, e) {
    return l && e ? l === e ? !0 : l && l.nodeType === 3 ? !1 : e && e.nodeType === 3 ? uf(l, e.parentNode) : "contains" in l ? l.contains(e) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function cf(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var e = Mn(l.document); e instanceof l.HTMLIFrameElement; ) {
      try {
        var t = typeof e.contentWindow.location.href == "string";
      } catch {
        t = !1;
      }
      if (t) l = e.contentWindow;
      else break;
      e = Mn(l.document);
    }
    return e;
  }
  function yi(l) {
    var e = l && l.nodeName && l.nodeName.toLowerCase();
    return e && (e === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || e === "textarea" || l.contentEditable === "true");
  }
  var Qh = qe && "documentMode" in document && 11 >= document.documentMode, Pt = null, vi = null, Xa = null, gi = !1;
  function sf(l, e, t) {
    var a = t.window === t ? t.document : t.nodeType === 9 ? t : t.ownerDocument;
    gi || Pt == null || Pt !== Mn(a) || (a = Pt, "selectionStart" in a && yi(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Xa && Qa(Xa, a) || (Xa = a, a = Au(vi, "onSelect"), 0 < a.length && (e = new qn(
      "onSelect",
      "select",
      null,
      e,
      t
    ), l.push({ event: e, listeners: a }), e.target = Pt)));
  }
  function _t(l, e) {
    var t = {};
    return t[l.toLowerCase()] = e.toLowerCase(), t["Webkit" + l] = "webkit" + e, t["Moz" + l] = "moz" + e, t;
  }
  var la = {
    animationend: _t("Animation", "AnimationEnd"),
    animationiteration: _t("Animation", "AnimationIteration"),
    animationstart: _t("Animation", "AnimationStart"),
    transitionrun: _t("Transition", "TransitionRun"),
    transitionstart: _t("Transition", "TransitionStart"),
    transitioncancel: _t("Transition", "TransitionCancel"),
    transitionend: _t("Transition", "TransitionEnd")
  }, bi = {}, ff = {};
  qe && (ff = document.createElement("div").style, "AnimationEvent" in window || (delete la.animationend.animation, delete la.animationiteration.animation, delete la.animationstart.animation), "TransitionEvent" in window || delete la.transitionend.transition);
  function zt(l) {
    if (bi[l]) return bi[l];
    if (!la[l]) return l;
    var e = la[l], t;
    for (t in e)
      if (e.hasOwnProperty(t) && t in ff)
        return bi[l] = e[t];
    return l;
  }
  var rf = zt("animationend"), of = zt("animationiteration"), df = zt("animationstart"), Xh = zt("transitionrun"), Lh = zt("transitionstart"), Zh = zt("transitioncancel"), hf = zt("transitionend"), mf = /* @__PURE__ */ new Map(), pi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  pi.push("scrollEnd");
  function _e(l, e) {
    mf.set(l, e), Tt(e, [l]);
  }
  var Gn = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  }, pe = [], ea = 0, Si = 0;
  function Qn() {
    for (var l = ea, e = Si = ea = 0; e < l; ) {
      var t = pe[e];
      pe[e++] = null;
      var a = pe[e];
      pe[e++] = null;
      var n = pe[e];
      pe[e++] = null;
      var u = pe[e];
      if (pe[e++] = null, a !== null && n !== null) {
        var i = a.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
      }
      u !== 0 && yf(t, n, u);
    }
  }
  function Xn(l, e, t, a) {
    pe[ea++] = l, pe[ea++] = e, pe[ea++] = t, pe[ea++] = a, Si |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function xi(l, e, t, a) {
    return Xn(l, e, t, a), Ln(l);
  }
  function Ot(l, e) {
    return Xn(l, null, null, e), Ln(l);
  }
  function yf(l, e, t) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t);
    for (var n = !1, u = l.return; u !== null; )
      u.childLanes |= t, a = u.alternate, a !== null && (a.childLanes |= t), u.tag === 22 && (l = u.stateNode, l === null || l._visibility & 1 || (n = !0)), l = u, u = u.return;
    return l.tag === 3 ? (u = l.stateNode, n && e !== null && (n = 31 - se(t), l = u.hiddenUpdates, a = l[n], a === null ? l[n] = [e] : a.push(e), e.lane = t | 536870912), u) : null;
  }
  function Ln(l) {
    if (50 < rn)
      throw rn = 0, Cc = null, Error(m(185));
    for (var e = l.return; e !== null; )
      l = e, e = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ta = {};
  function Vh(l, e, t, a) {
    this.tag = l, this.key = t, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function re(l, e, t, a) {
    return new Vh(l, e, t, a);
  }
  function ji(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function Be(l, e) {
    var t = l.alternate;
    return t === null ? (t = re(
      l.tag,
      e,
      l.key,
      l.mode
    ), t.elementType = l.elementType, t.type = l.type, t.stateNode = l.stateNode, t.alternate = l, l.alternate = t) : (t.pendingProps = e, t.type = l.type, t.flags = 0, t.subtreeFlags = 0, t.deletions = null), t.flags = l.flags & 65011712, t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, e = l.dependencies, t.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, t.sibling = l.sibling, t.index = l.index, t.ref = l.ref, t.refCleanup = l.refCleanup, t;
  }
  function vf(l, e) {
    l.flags &= 65011714;
    var t = l.alternate;
    return t === null ? (l.childLanes = 0, l.lanes = e, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, l.type = t.type, e = t.dependencies, l.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), l;
  }
  function Zn(l, e, t, a, n, u) {
    var i = 0;
    if (a = l, typeof l == "function") ji(l) && (i = 1);
    else if (typeof l == "string")
      i = $m(
        l,
        t,
        D.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (l) {
        case Ql:
          return l = re(31, t, e, n), l.elementType = Ql, l.lanes = u, l;
        case H:
          return Ct(t.children, n, u, e);
        case ul:
          i = 8, n |= 24;
          break;
        case il:
          return l = re(12, t, e, n | 2), l.elementType = il, l.lanes = u, l;
        case Bl:
          return l = re(13, t, e, n), l.elementType = Bl, l.lanes = u, l;
        case jl:
          return l = re(19, t, e, n), l.elementType = jl, l.lanes = u, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case gl:
                i = 10;
                break l;
              case Rl:
                i = 9;
                break l;
              case ql:
                i = 11;
                break l;
              case K:
                i = 14;
                break l;
              case Ol:
                i = 16, a = null;
                break l;
            }
          i = 29, t = Error(
            m(130, l === null ? "null" : typeof l, "")
          ), a = null;
      }
    return e = re(i, t, e, n), e.elementType = l, e.type = a, e.lanes = u, e;
  }
  function Ct(l, e, t, a) {
    return l = re(7, l, a, e), l.lanes = t, l;
  }
  function Ei(l, e, t) {
    return l = re(6, l, null, e), l.lanes = t, l;
  }
  function gf(l) {
    var e = re(18, null, null, 0);
    return e.stateNode = l, e;
  }
  function Ni(l, e, t) {
    return e = re(
      4,
      l.children !== null ? l.children : [],
      l.key,
      e
    ), e.lanes = t, e.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, e;
  }
  var bf = /* @__PURE__ */ new WeakMap();
  function Se(l, e) {
    if (typeof l == "object" && l !== null) {
      var t = bf.get(l);
      return t !== void 0 ? t : (e = {
        value: l,
        source: e,
        stack: vs(e)
      }, bf.set(l, e), e);
    }
    return {
      value: l,
      source: e,
      stack: vs(e)
    };
  }
  var aa = [], na = 0, Vn = null, La = 0, xe = [], je = 0, et = null, Ce = 1, Me = "";
  function Ye(l, e) {
    aa[na++] = La, aa[na++] = Vn, Vn = l, La = e;
  }
  function pf(l, e, t) {
    xe[je++] = Ce, xe[je++] = Me, xe[je++] = et, et = l;
    var a = Ce;
    l = Me;
    var n = 32 - se(a) - 1;
    a &= ~(1 << n), t += 1;
    var u = 32 - se(e) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, Ce = 1 << 32 - se(e) + n | t << n | a, Me = u + l;
    } else
      Ce = 1 << u | t << n | a, Me = l;
  }
  function Ti(l) {
    l.return !== null && (Ye(l, 1), pf(l, 1, 0));
  }
  function Ai(l) {
    for (; l === Vn; )
      Vn = aa[--na], aa[na] = null, La = aa[--na], aa[na] = null;
    for (; l === et; )
      et = xe[--je], xe[je] = null, Me = xe[--je], xe[je] = null, Ce = xe[--je], xe[je] = null;
  }
  function Sf(l, e) {
    xe[je++] = Ce, xe[je++] = Me, xe[je++] = et, Ce = e.id, Me = e.overflow, et = l;
  }
  var Ll = null, pl = null, nl = !1, tt = null, Ee = !1, _i = Error(m(519));
  function at(l) {
    var e = Error(
      m(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Za(Se(e, l)), _i;
  }
  function xf(l) {
    var e = l.stateNode, t = l.type, a = l.memoizedProps;
    switch (e[Xl] = l, e[Il] = a, t) {
      case "dialog":
        el("cancel", e), el("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        el("load", e);
        break;
      case "video":
      case "audio":
        for (t = 0; t < dn.length; t++)
          el(dn[t], e);
        break;
      case "source":
        el("error", e);
        break;
      case "img":
      case "image":
      case "link":
        el("error", e), el("load", e);
        break;
      case "details":
        el("toggle", e);
        break;
      case "input":
        el("invalid", e), Us(
          e,
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
        el("invalid", e);
        break;
      case "textarea":
        el("invalid", e), Hs(e, a.value, a.defaultValue, a.children);
    }
    t = a.children, typeof t != "string" && typeof t != "number" && typeof t != "bigint" || e.textContent === "" + t || a.suppressHydrationWarning === !0 || Go(e.textContent, t) ? (a.popover != null && (el("beforetoggle", e), el("toggle", e)), a.onScroll != null && el("scroll", e), a.onScrollEnd != null && el("scrollend", e), a.onClick != null && (e.onclick = He), e = !0) : e = !1, e || at(l, !0);
  }
  function jf(l) {
    for (Ll = l.return; Ll; )
      switch (Ll.tag) {
        case 5:
        case 31:
        case 13:
          Ee = !1;
          return;
        case 27:
        case 3:
          Ee = !0;
          return;
        default:
          Ll = Ll.return;
      }
  }
  function ua(l) {
    if (l !== Ll) return !1;
    if (!nl) return jf(l), nl = !0, !1;
    var e = l.tag, t;
    if ((t = e !== 3 && e !== 27) && ((t = e === 5) && (t = l.type, t = !(t !== "form" && t !== "button") || wc(l.type, l.memoizedProps)), t = !t), t && pl && at(l), jf(l), e === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(m(317));
      pl = ko(l);
    } else if (e === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(m(317));
      pl = ko(l);
    } else
      e === 27 ? (e = pl, gt(l.type) ? (l = Wc, Wc = null, pl = l) : pl = e) : pl = Ll ? Te(l.stateNode.nextSibling) : null;
    return !0;
  }
  function Mt() {
    pl = Ll = null, nl = !1;
  }
  function zi() {
    var l = tt;
    return l !== null && (ae === null ? ae = l : ae.push.apply(
      ae,
      l
    ), tt = null), l;
  }
  function Za(l) {
    tt === null ? tt = [l] : tt.push(l);
  }
  var Oi = f(null), Dt = null, Ge = null;
  function nt(l, e, t) {
    _(Oi, e._currentValue), e._currentValue = t;
  }
  function Qe(l) {
    l._currentValue = Oi.current, S(Oi);
  }
  function Ci(l, e, t) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & e) !== e ? (l.childLanes |= e, a !== null && (a.childLanes |= e)) : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e), l === t) break;
      l = l.return;
    }
  }
  function Mi(l, e, t, a) {
    var n = l.child;
    for (n !== null && (n.return = l); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        l: for (; u !== null; ) {
          var s = u;
          u = n;
          for (var r = 0; r < e.length; r++)
            if (s.context === e[r]) {
              u.lanes |= t, s = u.alternate, s !== null && (s.lanes |= t), Ci(
                u.return,
                t,
                l
              ), a || (i = null);
              break l;
            }
          u = s.next;
        }
      } else if (n.tag === 18) {
        if (i = n.return, i === null) throw Error(m(341));
        i.lanes |= t, u = i.alternate, u !== null && (u.lanes |= t), Ci(i, t, l), i = null;
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
  function ia(l, e, t, a) {
    l = null;
    for (var n = e, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var i = n.alternate;
        if (i === null) throw Error(m(387));
        if (i = i.memoizedProps, i !== null) {
          var s = n.type;
          fe(n.pendingProps.value, i.value) || (l !== null ? l.push(s) : l = [s]);
        }
      } else if (n === ol.current) {
        if (i = n.alternate, i === null) throw Error(m(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (l !== null ? l.push(gn) : l = [gn]);
      }
      n = n.return;
    }
    l !== null && Mi(
      e,
      l,
      t,
      a
    ), e.flags |= 262144;
  }
  function wn(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!fe(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function Ut(l) {
    Dt = l, Ge = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function Zl(l) {
    return Ef(Dt, l);
  }
  function Kn(l, e) {
    return Dt === null && Ut(l), Ef(l, e);
  }
  function Ef(l, e) {
    var t = e._currentValue;
    if (e = { context: e, memoizedValue: t, next: null }, Ge === null) {
      if (l === null) throw Error(m(308));
      Ge = e, l.dependencies = { lanes: 0, firstContext: e }, l.flags |= 524288;
    } else Ge = Ge.next = e;
    return t;
  }
  var wh = typeof AbortController < "u" ? AbortController : function() {
    var l = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(t, a) {
        l.push(a);
      }
    };
    this.abort = function() {
      e.aborted = !0, l.forEach(function(t) {
        return t();
      });
    };
  }, Kh = v.unstable_scheduleCallback, Jh = v.unstable_NormalPriority, Cl = {
    $$typeof: gl,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Di() {
    return {
      controller: new wh(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Va(l) {
    l.refCount--, l.refCount === 0 && Kh(Jh, function() {
      l.controller.abort();
    });
  }
  var wa = null, Ui = 0, ca = 0, sa = null;
  function kh(l, e) {
    if (wa === null) {
      var t = wa = [];
      Ui = 0, ca = qc(), sa = {
        status: "pending",
        value: void 0,
        then: function(a) {
          t.push(a);
        }
      };
    }
    return Ui++, e.then(Nf, Nf), e;
  }
  function Nf() {
    if (--Ui === 0 && wa !== null) {
      sa !== null && (sa.status = "fulfilled");
      var l = wa;
      wa = null, ca = 0, sa = null;
      for (var e = 0; e < l.length; e++) (0, l[e])();
    }
  }
  function $h(l, e) {
    var t = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        t.push(n);
      }
    };
    return l.then(
      function() {
        a.status = "fulfilled", a.value = e;
        for (var n = 0; n < t.length; n++) (0, t[n])(e);
      },
      function(n) {
        for (a.status = "rejected", a.reason = n, n = 0; n < t.length; n++)
          (0, t[n])(void 0);
      }
    ), a;
  }
  var Tf = d.S;
  d.S = function(l, e) {
    so = ie(), typeof e == "object" && e !== null && typeof e.then == "function" && kh(l, e), Tf !== null && Tf(l, e);
  };
  var Rt = f(null);
  function Ri() {
    var l = Rt.current;
    return l !== null ? l : bl.pooledCache;
  }
  function Jn(l, e) {
    e === null ? _(Rt, Rt.current) : _(Rt, e.pool);
  }
  function Af() {
    var l = Ri();
    return l === null ? null : { parent: Cl._currentValue, pool: l };
  }
  var fa = Error(m(460)), Hi = Error(m(474)), kn = Error(m(542)), $n = { then: function() {
  } };
  function _f(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function zf(l, e, t) {
    switch (t = l[t], t === void 0 ? l.push(e) : t !== e && (e.then(He, He), e = t), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw l = e.reason, Cf(l), l;
      default:
        if (typeof e.status == "string") e.then(He, He);
        else {
          if (l = bl, l !== null && 100 < l.shellSuspendCounter)
            throw Error(m(482));
          l = e, l.status = "pending", l.then(
            function(a) {
              if (e.status === "pending") {
                var n = e;
                n.status = "fulfilled", n.value = a;
              }
            },
            function(a) {
              if (e.status === "pending") {
                var n = e;
                n.status = "rejected", n.reason = a;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw l = e.reason, Cf(l), l;
        }
        throw qt = e, fa;
    }
  }
  function Ht(l) {
    try {
      var e = l._init;
      return e(l._payload);
    } catch (t) {
      throw t !== null && typeof t == "object" && typeof t.then == "function" ? (qt = t, fa) : t;
    }
  }
  var qt = null;
  function Of() {
    if (qt === null) throw Error(m(459));
    var l = qt;
    return qt = null, l;
  }
  function Cf(l) {
    if (l === fa || l === kn)
      throw Error(m(483));
  }
  var ra = null, Ka = 0;
  function Wn(l) {
    var e = Ka;
    return Ka += 1, ra === null && (ra = []), zf(ra, l, e);
  }
  function Ja(l, e) {
    e = e.props.ref, l.ref = e !== void 0 ? e : null;
  }
  function Fn(l, e) {
    throw e.$$typeof === M ? Error(m(525)) : (l = Object.prototype.toString.call(e), Error(
      m(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : l
      )
    ));
  }
  function Mf(l) {
    function e(h, o) {
      if (l) {
        var y = h.deletions;
        y === null ? (h.deletions = [o], h.flags |= 16) : y.push(o);
      }
    }
    function t(h, o) {
      if (!l) return null;
      for (; o !== null; )
        e(h, o), o = o.sibling;
      return null;
    }
    function a(h) {
      for (var o = /* @__PURE__ */ new Map(); h !== null; )
        h.key !== null ? o.set(h.key, h) : o.set(h.index, h), h = h.sibling;
      return o;
    }
    function n(h, o) {
      return h = Be(h, o), h.index = 0, h.sibling = null, h;
    }
    function u(h, o, y) {
      return h.index = y, l ? (y = h.alternate, y !== null ? (y = y.index, y < o ? (h.flags |= 67108866, o) : y) : (h.flags |= 67108866, o)) : (h.flags |= 1048576, o);
    }
    function i(h) {
      return l && h.alternate === null && (h.flags |= 67108866), h;
    }
    function s(h, o, y, E) {
      return o === null || o.tag !== 6 ? (o = Ei(y, h.mode, E), o.return = h, o) : (o = n(o, y), o.return = h, o);
    }
    function r(h, o, y, E) {
      var X = y.type;
      return X === H ? x(
        h,
        o,
        y.props.children,
        E,
        y.key
      ) : o !== null && (o.elementType === X || typeof X == "object" && X !== null && X.$$typeof === Ol && Ht(X) === o.type) ? (o = n(o, y.props), Ja(o, y), o.return = h, o) : (o = Zn(
        y.type,
        y.key,
        y.props,
        null,
        h.mode,
        E
      ), Ja(o, y), o.return = h, o);
    }
    function g(h, o, y, E) {
      return o === null || o.tag !== 4 || o.stateNode.containerInfo !== y.containerInfo || o.stateNode.implementation !== y.implementation ? (o = Ni(y, h.mode, E), o.return = h, o) : (o = n(o, y.children || []), o.return = h, o);
    }
    function x(h, o, y, E, X) {
      return o === null || o.tag !== 7 ? (o = Ct(
        y,
        h.mode,
        E,
        X
      ), o.return = h, o) : (o = n(o, y), o.return = h, o);
    }
    function N(h, o, y) {
      if (typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint")
        return o = Ei(
          "" + o,
          h.mode,
          y
        ), o.return = h, o;
      if (typeof o == "object" && o !== null) {
        switch (o.$$typeof) {
          case cl:
            return y = Zn(
              o.type,
              o.key,
              o.props,
              null,
              h.mode,
              y
            ), Ja(y, o), y.return = h, y;
          case R:
            return o = Ni(
              o,
              h.mode,
              y
            ), o.return = h, o;
          case Ol:
            return o = Ht(o), N(h, o, y);
        }
        if (Jl(o) || El(o))
          return o = Ct(
            o,
            h.mode,
            y,
            null
          ), o.return = h, o;
        if (typeof o.then == "function")
          return N(h, Wn(o), y);
        if (o.$$typeof === gl)
          return N(
            h,
            Kn(h, o),
            y
          );
        Fn(h, o);
      }
      return null;
    }
    function b(h, o, y, E) {
      var X = o !== null ? o.key : null;
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return X !== null ? null : s(h, o, "" + y, E);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case cl:
            return y.key === X ? r(h, o, y, E) : null;
          case R:
            return y.key === X ? g(h, o, y, E) : null;
          case Ol:
            return y = Ht(y), b(h, o, y, E);
        }
        if (Jl(y) || El(y))
          return X !== null ? null : x(h, o, y, E, null);
        if (typeof y.then == "function")
          return b(
            h,
            o,
            Wn(y),
            E
          );
        if (y.$$typeof === gl)
          return b(
            h,
            o,
            Kn(h, y),
            E
          );
        Fn(h, y);
      }
      return null;
    }
    function p(h, o, y, E, X) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return h = h.get(y) || null, s(o, h, "" + E, X);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case cl:
            return h = h.get(
              E.key === null ? y : E.key
            ) || null, r(o, h, E, X);
          case R:
            return h = h.get(
              E.key === null ? y : E.key
            ) || null, g(o, h, E, X);
          case Ol:
            return E = Ht(E), p(
              h,
              o,
              y,
              E,
              X
            );
        }
        if (Jl(E) || El(E))
          return h = h.get(y) || null, x(o, h, E, X, null);
        if (typeof E.then == "function")
          return p(
            h,
            o,
            y,
            Wn(E),
            X
          );
        if (E.$$typeof === gl)
          return p(
            h,
            o,
            y,
            Kn(o, E),
            X
          );
        Fn(o, E);
      }
      return null;
    }
    function B(h, o, y, E) {
      for (var X = null, sl = null, Y = o, $ = o = 0, al = null; Y !== null && $ < y.length; $++) {
        Y.index > $ ? (al = Y, Y = null) : al = Y.sibling;
        var fl = b(
          h,
          Y,
          y[$],
          E
        );
        if (fl === null) {
          Y === null && (Y = al);
          break;
        }
        l && Y && fl.alternate === null && e(h, Y), o = u(fl, o, $), sl === null ? X = fl : sl.sibling = fl, sl = fl, Y = al;
      }
      if ($ === y.length)
        return t(h, Y), nl && Ye(h, $), X;
      if (Y === null) {
        for (; $ < y.length; $++)
          Y = N(h, y[$], E), Y !== null && (o = u(
            Y,
            o,
            $
          ), sl === null ? X = Y : sl.sibling = Y, sl = Y);
        return nl && Ye(h, $), X;
      }
      for (Y = a(Y); $ < y.length; $++)
        al = p(
          Y,
          h,
          $,
          y[$],
          E
        ), al !== null && (l && al.alternate !== null && Y.delete(
          al.key === null ? $ : al.key
        ), o = u(
          al,
          o,
          $
        ), sl === null ? X = al : sl.sibling = al, sl = al);
      return l && Y.forEach(function(jt) {
        return e(h, jt);
      }), nl && Ye(h, $), X;
    }
    function L(h, o, y, E) {
      if (y == null) throw Error(m(151));
      for (var X = null, sl = null, Y = o, $ = o = 0, al = null, fl = y.next(); Y !== null && !fl.done; $++, fl = y.next()) {
        Y.index > $ ? (al = Y, Y = null) : al = Y.sibling;
        var jt = b(h, Y, fl.value, E);
        if (jt === null) {
          Y === null && (Y = al);
          break;
        }
        l && Y && jt.alternate === null && e(h, Y), o = u(jt, o, $), sl === null ? X = jt : sl.sibling = jt, sl = jt, Y = al;
      }
      if (fl.done)
        return t(h, Y), nl && Ye(h, $), X;
      if (Y === null) {
        for (; !fl.done; $++, fl = y.next())
          fl = N(h, fl.value, E), fl !== null && (o = u(fl, o, $), sl === null ? X = fl : sl.sibling = fl, sl = fl);
        return nl && Ye(h, $), X;
      }
      for (Y = a(Y); !fl.done; $++, fl = y.next())
        fl = p(Y, h, $, fl.value, E), fl !== null && (l && fl.alternate !== null && Y.delete(fl.key === null ? $ : fl.key), o = u(fl, o, $), sl === null ? X = fl : sl.sibling = fl, sl = fl);
      return l && Y.forEach(function(iy) {
        return e(h, iy);
      }), nl && Ye(h, $), X;
    }
    function vl(h, o, y, E) {
      if (typeof y == "object" && y !== null && y.type === H && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case cl:
            l: {
              for (var X = y.key; o !== null; ) {
                if (o.key === X) {
                  if (X = y.type, X === H) {
                    if (o.tag === 7) {
                      t(
                        h,
                        o.sibling
                      ), E = n(
                        o,
                        y.props.children
                      ), E.return = h, h = E;
                      break l;
                    }
                  } else if (o.elementType === X || typeof X == "object" && X !== null && X.$$typeof === Ol && Ht(X) === o.type) {
                    t(
                      h,
                      o.sibling
                    ), E = n(o, y.props), Ja(E, y), E.return = h, h = E;
                    break l;
                  }
                  t(h, o);
                  break;
                } else e(h, o);
                o = o.sibling;
              }
              y.type === H ? (E = Ct(
                y.props.children,
                h.mode,
                E,
                y.key
              ), E.return = h, h = E) : (E = Zn(
                y.type,
                y.key,
                y.props,
                null,
                h.mode,
                E
              ), Ja(E, y), E.return = h, h = E);
            }
            return i(h);
          case R:
            l: {
              for (X = y.key; o !== null; ) {
                if (o.key === X)
                  if (o.tag === 4 && o.stateNode.containerInfo === y.containerInfo && o.stateNode.implementation === y.implementation) {
                    t(
                      h,
                      o.sibling
                    ), E = n(o, y.children || []), E.return = h, h = E;
                    break l;
                  } else {
                    t(h, o);
                    break;
                  }
                else e(h, o);
                o = o.sibling;
              }
              E = Ni(y, h.mode, E), E.return = h, h = E;
            }
            return i(h);
          case Ol:
            return y = Ht(y), vl(
              h,
              o,
              y,
              E
            );
        }
        if (Jl(y))
          return B(
            h,
            o,
            y,
            E
          );
        if (El(y)) {
          if (X = El(y), typeof X != "function") throw Error(m(150));
          return y = X.call(y), L(
            h,
            o,
            y,
            E
          );
        }
        if (typeof y.then == "function")
          return vl(
            h,
            o,
            Wn(y),
            E
          );
        if (y.$$typeof === gl)
          return vl(
            h,
            o,
            Kn(h, y),
            E
          );
        Fn(h, y);
      }
      return typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint" ? (y = "" + y, o !== null && o.tag === 6 ? (t(h, o.sibling), E = n(o, y), E.return = h, h = E) : (t(h, o), E = Ei(y, h.mode, E), E.return = h, h = E), i(h)) : t(h, o);
    }
    return function(h, o, y, E) {
      try {
        Ka = 0;
        var X = vl(
          h,
          o,
          y,
          E
        );
        return ra = null, X;
      } catch (Y) {
        if (Y === fa || Y === kn) throw Y;
        var sl = re(29, Y, null, h.mode);
        return sl.lanes = E, sl.return = h, sl;
      } finally {
      }
    };
  }
  var Bt = Mf(!0), Df = Mf(!1), ut = !1;
  function qi(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Bi(l, e) {
    l = l.updateQueue, e.updateQueue === l && (e.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function it(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function ct(l, e, t) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (rl & 2) !== 0) {
      var n = a.pending;
      return n === null ? e.next = e : (e.next = n.next, n.next = e), a.pending = e, e = Ln(l), yf(l, null, t), e;
    }
    return Xn(l, a, e, t), Ln(l);
  }
  function ka(l, e, t) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (t & 4194048) !== 0)) {
      var a = e.lanes;
      a &= l.pendingLanes, t |= a, e.lanes = t, js(l, t);
    }
  }
  function Yi(l, e) {
    var t = l.updateQueue, a = l.alternate;
    if (a !== null && (a = a.updateQueue, t === a)) {
      var n = null, u = null;
      if (t = t.firstBaseUpdate, t !== null) {
        do {
          var i = {
            lane: t.lane,
            tag: t.tag,
            payload: t.payload,
            callback: null,
            next: null
          };
          u === null ? n = u = i : u = u.next = i, t = t.next;
        } while (t !== null);
        u === null ? n = u = e : u = u.next = e;
      } else n = u = e;
      t = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks
      }, l.updateQueue = t;
      return;
    }
    l = t.lastBaseUpdate, l === null ? t.firstBaseUpdate = e : l.next = e, t.lastBaseUpdate = e;
  }
  var Gi = !1;
  function $a() {
    if (Gi) {
      var l = sa;
      if (l !== null) throw l;
    }
  }
  function Wa(l, e, t, a) {
    Gi = !1;
    var n = l.updateQueue;
    ut = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, s = n.shared.pending;
    if (s !== null) {
      n.shared.pending = null;
      var r = s, g = r.next;
      r.next = null, i === null ? u = g : i.next = g, i = r;
      var x = l.alternate;
      x !== null && (x = x.updateQueue, s = x.lastBaseUpdate, s !== i && (s === null ? x.firstBaseUpdate = g : s.next = g, x.lastBaseUpdate = r));
    }
    if (u !== null) {
      var N = n.baseState;
      i = 0, x = g = r = null, s = u;
      do {
        var b = s.lane & -536870913, p = b !== s.lane;
        if (p ? (tl & b) === b : (a & b) === b) {
          b !== 0 && b === ca && (Gi = !0), x !== null && (x = x.next = {
            lane: 0,
            tag: s.tag,
            payload: s.payload,
            callback: null,
            next: null
          });
          l: {
            var B = l, L = s;
            b = e;
            var vl = t;
            switch (L.tag) {
              case 1:
                if (B = L.payload, typeof B == "function") {
                  N = B.call(vl, N, b);
                  break l;
                }
                N = B;
                break l;
              case 3:
                B.flags = B.flags & -65537 | 128;
              case 0:
                if (B = L.payload, b = typeof B == "function" ? B.call(vl, N, b) : B, b == null) break l;
                N = U({}, N, b);
                break l;
              case 2:
                ut = !0;
            }
          }
          b = s.callback, b !== null && (l.flags |= 64, p && (l.flags |= 8192), p = n.callbacks, p === null ? n.callbacks = [b] : p.push(b));
        } else
          p = {
            lane: b,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null
          }, x === null ? (g = x = p, r = N) : x = x.next = p, i |= b;
        if (s = s.next, s === null) {
          if (s = n.shared.pending, s === null)
            break;
          p = s, s = p.next, p.next = null, n.lastBaseUpdate = p, n.shared.pending = null;
        }
      } while (!0);
      x === null && (r = N), n.baseState = r, n.firstBaseUpdate = g, n.lastBaseUpdate = x, u === null && (n.shared.lanes = 0), dt |= i, l.lanes = i, l.memoizedState = N;
    }
  }
  function Uf(l, e) {
    if (typeof l != "function")
      throw Error(m(191, l));
    l.call(e);
  }
  function Rf(l, e) {
    var t = l.callbacks;
    if (t !== null)
      for (l.callbacks = null, l = 0; l < t.length; l++)
        Uf(t[l], e);
  }
  var oa = f(null), In = f(0);
  function Hf(l, e) {
    l = $e, _(In, l), _(oa, e), $e = l | e.baseLanes;
  }
  function Qi() {
    _(In, $e), _(oa, oa.current);
  }
  function Xi() {
    $e = In.current, S(oa), S(In);
  }
  var oe = f(null), Ne = null;
  function st(l) {
    var e = l.alternate;
    _(_l, _l.current & 1), _(oe, l), Ne === null && (e === null || oa.current !== null || e.memoizedState !== null) && (Ne = l);
  }
  function Li(l) {
    _(_l, _l.current), _(oe, l), Ne === null && (Ne = l);
  }
  function qf(l) {
    l.tag === 22 ? (_(_l, _l.current), _(oe, l), Ne === null && (Ne = l)) : ft();
  }
  function ft() {
    _(_l, _l.current), _(oe, oe.current);
  }
  function de(l) {
    S(oe), Ne === l && (Ne = null), S(_l);
  }
  var _l = f(0);
  function Pn(l) {
    for (var e = l; e !== null; ) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (t !== null && (t = t.dehydrated, t === null || kc(t) || $c(t)))
          return e;
      } else if (e.tag === 19 && (e.memoizedProps.revealOrder === "forwards" || e.memoizedProps.revealOrder === "backwards" || e.memoizedProps.revealOrder === "unstable_legacy-backwards" || e.memoizedProps.revealOrder === "together")) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === l) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === l) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var Xe = 0, k = null, ml = null, Ml = null, lu = !1, da = !1, Yt = !1, eu = 0, Fa = 0, ha = null, Wh = 0;
  function Nl() {
    throw Error(m(321));
  }
  function Zi(l, e) {
    if (e === null) return !1;
    for (var t = 0; t < e.length && t < l.length; t++)
      if (!fe(l[t], e[t])) return !1;
    return !0;
  }
  function Vi(l, e, t, a, n, u) {
    return Xe = u, k = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, d.H = l === null || l.memoizedState === null ? pr : uc, Yt = !1, u = t(a, n), Yt = !1, da && (u = Yf(
      e,
      t,
      a,
      n
    )), Bf(l), u;
  }
  function Bf(l) {
    d.H = ln;
    var e = ml !== null && ml.next !== null;
    if (Xe = 0, Ml = ml = k = null, lu = !1, Fa = 0, ha = null, e) throw Error(m(300));
    l === null || Dl || (l = l.dependencies, l !== null && wn(l) && (Dl = !0));
  }
  function Yf(l, e, t, a) {
    k = l;
    var n = 0;
    do {
      if (da && (ha = null), Fa = 0, da = !1, 25 <= n) throw Error(m(301));
      if (n += 1, Ml = ml = null, l.updateQueue != null) {
        var u = l.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      d.H = Sr, u = e(t, a);
    } while (da);
    return u;
  }
  function Fh() {
    var l = d.H, e = l.useState()[0];
    return e = typeof e.then == "function" ? Ia(e) : e, l = l.useState()[0], (ml !== null ? ml.memoizedState : null) !== l && (k.flags |= 1024), e;
  }
  function wi() {
    var l = eu !== 0;
    return eu = 0, l;
  }
  function Ki(l, e, t) {
    e.updateQueue = l.updateQueue, e.flags &= -2053, l.lanes &= ~t;
  }
  function Ji(l) {
    if (lu) {
      for (l = l.memoizedState; l !== null; ) {
        var e = l.queue;
        e !== null && (e.pending = null), l = l.next;
      }
      lu = !1;
    }
    Xe = 0, Ml = ml = k = null, da = !1, Fa = eu = 0, ha = null;
  }
  function Wl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ml === null ? k.memoizedState = Ml = l : Ml = Ml.next = l, Ml;
  }
  function zl() {
    if (ml === null) {
      var l = k.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = ml.next;
    var e = Ml === null ? k.memoizedState : Ml.next;
    if (e !== null)
      Ml = e, ml = l;
    else {
      if (l === null)
        throw k.alternate === null ? Error(m(467)) : Error(m(310));
      ml = l, l = {
        memoizedState: ml.memoizedState,
        baseState: ml.baseState,
        baseQueue: ml.baseQueue,
        queue: ml.queue,
        next: null
      }, Ml === null ? k.memoizedState = Ml = l : Ml = Ml.next = l;
    }
    return Ml;
  }
  function tu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ia(l) {
    var e = Fa;
    return Fa += 1, ha === null && (ha = []), l = zf(ha, l, e), e = k, (Ml === null ? e.memoizedState : Ml.next) === null && (e = e.alternate, d.H = e === null || e.memoizedState === null ? pr : uc), l;
  }
  function au(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Ia(l);
      if (l.$$typeof === gl) return Zl(l);
    }
    throw Error(m(438, String(l)));
  }
  function ki(l) {
    var e = null, t = k.updateQueue;
    if (t !== null && (e = t.memoCache), e == null) {
      var a = k.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (e = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), t === null && (t = tu(), k.updateQueue = t), t.memoCache = e, t = e.data[e.index], t === void 0)
      for (t = e.data[e.index] = Array(l), a = 0; a < l; a++)
        t[a] = ue;
    return e.index++, t;
  }
  function Le(l, e) {
    return typeof e == "function" ? e(l) : e;
  }
  function nu(l) {
    var e = zl();
    return $i(e, ml, l);
  }
  function $i(l, e, t) {
    var a = l.queue;
    if (a === null) throw Error(m(311));
    a.lastRenderedReducer = t;
    var n = l.baseQueue, u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var i = n.next;
        n.next = u.next, u.next = i;
      }
      e.baseQueue = n = u, a.pending = null;
    }
    if (u = l.baseState, n === null) l.memoizedState = u;
    else {
      e = n.next;
      var s = i = null, r = null, g = e, x = !1;
      do {
        var N = g.lane & -536870913;
        if (N !== g.lane ? (tl & N) === N : (Xe & N) === N) {
          var b = g.revertLane;
          if (b === 0)
            r !== null && (r = r.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: g.action,
              hasEagerState: g.hasEagerState,
              eagerState: g.eagerState,
              next: null
            }), N === ca && (x = !0);
          else if ((Xe & b) === b) {
            g = g.next, b === ca && (x = !0);
            continue;
          } else
            N = {
              lane: 0,
              revertLane: g.revertLane,
              gesture: null,
              action: g.action,
              hasEagerState: g.hasEagerState,
              eagerState: g.eagerState,
              next: null
            }, r === null ? (s = r = N, i = u) : r = r.next = N, k.lanes |= b, dt |= b;
          N = g.action, Yt && t(u, N), u = g.hasEagerState ? g.eagerState : t(u, N);
        } else
          b = {
            lane: N,
            revertLane: g.revertLane,
            gesture: g.gesture,
            action: g.action,
            hasEagerState: g.hasEagerState,
            eagerState: g.eagerState,
            next: null
          }, r === null ? (s = r = b, i = u) : r = r.next = b, k.lanes |= N, dt |= N;
        g = g.next;
      } while (g !== null && g !== e);
      if (r === null ? i = u : r.next = s, !fe(u, l.memoizedState) && (Dl = !0, x && (t = sa, t !== null)))
        throw t;
      l.memoizedState = u, l.baseState = i, l.baseQueue = r, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function Wi(l) {
    var e = zl(), t = e.queue;
    if (t === null) throw Error(m(311));
    t.lastRenderedReducer = l;
    var a = t.dispatch, n = t.pending, u = e.memoizedState;
    if (n !== null) {
      t.pending = null;
      var i = n = n.next;
      do
        u = l(u, i.action), i = i.next;
      while (i !== n);
      fe(u, e.memoizedState) || (Dl = !0), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), t.lastRenderedState = u;
    }
    return [u, a];
  }
  function Gf(l, e, t) {
    var a = k, n = zl(), u = nl;
    if (u) {
      if (t === void 0) throw Error(m(407));
      t = t();
    } else t = e();
    var i = !fe(
      (ml || n).memoizedState,
      t
    );
    if (i && (n.memoizedState = t, Dl = !0), n = n.queue, Pi(Lf.bind(null, a, n, l), [
      l
    ]), n.getSnapshot !== e || i || Ml !== null && Ml.memoizedState.tag & 1) {
      if (a.flags |= 2048, ma(
        9,
        { destroy: void 0 },
        Xf.bind(
          null,
          a,
          n,
          t,
          e
        ),
        null
      ), bl === null) throw Error(m(349));
      u || (Xe & 127) !== 0 || Qf(a, e, t);
    }
    return t;
  }
  function Qf(l, e, t) {
    l.flags |= 16384, l = { getSnapshot: e, value: t }, e = k.updateQueue, e === null ? (e = tu(), k.updateQueue = e, e.stores = [l]) : (t = e.stores, t === null ? e.stores = [l] : t.push(l));
  }
  function Xf(l, e, t, a) {
    e.value = t, e.getSnapshot = a, Zf(e) && Vf(l);
  }
  function Lf(l, e, t) {
    return t(function() {
      Zf(e) && Vf(l);
    });
  }
  function Zf(l) {
    var e = l.getSnapshot;
    l = l.value;
    try {
      var t = e();
      return !fe(l, t);
    } catch {
      return !0;
    }
  }
  function Vf(l) {
    var e = Ot(l, 2);
    e !== null && ne(e, l, 2);
  }
  function Fi(l) {
    var e = Wl();
    if (typeof l == "function") {
      var t = l;
      if (l = t(), Yt) {
        Ie(!0);
        try {
          t();
        } finally {
          Ie(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = l, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Le,
      lastRenderedState: l
    }, e;
  }
  function wf(l, e, t, a) {
    return l.baseState = t, $i(
      l,
      ml,
      typeof a == "function" ? a : Le
    );
  }
  function Ih(l, e, t, a, n) {
    if (cu(l)) throw Error(m(485));
    if (l = e.action, l !== null) {
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
      d.T !== null ? t(!0) : u.isTransition = !1, a(u), t = e.pending, t === null ? (u.next = e.pending = u, Kf(e, u)) : (u.next = t.next, e.pending = t.next = u);
    }
  }
  function Kf(l, e) {
    var t = e.action, a = e.payload, n = l.state;
    if (e.isTransition) {
      var u = d.T, i = {};
      d.T = i;
      try {
        var s = t(n, a), r = d.S;
        r !== null && r(i, s), Jf(l, e, s);
      } catch (g) {
        Ii(l, e, g);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), d.T = u;
      }
    } else
      try {
        u = t(n, a), Jf(l, e, u);
      } catch (g) {
        Ii(l, e, g);
      }
  }
  function Jf(l, e, t) {
    t !== null && typeof t == "object" && typeof t.then == "function" ? t.then(
      function(a) {
        kf(l, e, a);
      },
      function(a) {
        return Ii(l, e, a);
      }
    ) : kf(l, e, t);
  }
  function kf(l, e, t) {
    e.status = "fulfilled", e.value = t, $f(e), l.state = t, e = l.pending, e !== null && (t = e.next, t === e ? l.pending = null : (t = t.next, e.next = t, Kf(l, t)));
  }
  function Ii(l, e, t) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        e.status = "rejected", e.reason = t, $f(e), e = e.next;
      while (e !== a);
    }
    l.action = null;
  }
  function $f(l) {
    l = l.listeners;
    for (var e = 0; e < l.length; e++) (0, l[e])();
  }
  function Wf(l, e) {
    return e;
  }
  function Ff(l, e) {
    if (nl) {
      var t = bl.formState;
      if (t !== null) {
        l: {
          var a = k;
          if (nl) {
            if (pl) {
              e: {
                for (var n = pl, u = Ee; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break e;
                  }
                  if (n = Te(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break e;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                pl = Te(
                  n.nextSibling
                ), a = n.data === "F!";
                break l;
              }
            }
            at(a);
          }
          a = !1;
        }
        a && (e = t[0]);
      }
    }
    return t = Wl(), t.memoizedState = t.baseState = e, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Wf,
      lastRenderedState: e
    }, t.queue = a, t = vr.bind(
      null,
      k,
      a
    ), a.dispatch = t, a = Fi(!1), u = nc.bind(
      null,
      k,
      !1,
      a.queue
    ), a = Wl(), n = {
      state: e,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = n, t = Ih.bind(
      null,
      k,
      n,
      u,
      t
    ), n.dispatch = t, a.memoizedState = l, [e, t, !1];
  }
  function If(l) {
    var e = zl();
    return Pf(e, ml, l);
  }
  function Pf(l, e, t) {
    if (e = $i(
      l,
      e,
      Wf
    )[0], l = nu(Le)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var a = Ia(e);
      } catch (i) {
        throw i === fa ? kn : i;
      }
    else a = e;
    e = zl();
    var n = e.queue, u = n.dispatch;
    return t !== e.memoizedState && (k.flags |= 2048, ma(
      9,
      { destroy: void 0 },
      Ph.bind(null, n, t),
      null
    )), [a, u, l];
  }
  function Ph(l, e) {
    l.action = e;
  }
  function lr(l) {
    var e = zl(), t = ml;
    if (t !== null)
      return Pf(e, t, l);
    zl(), e = e.memoizedState, t = zl();
    var a = t.queue.dispatch;
    return t.memoizedState = l, [e, a, !1];
  }
  function ma(l, e, t, a) {
    return l = { tag: l, create: t, deps: a, inst: e, next: null }, e = k.updateQueue, e === null && (e = tu(), k.updateQueue = e), t = e.lastEffect, t === null ? e.lastEffect = l.next = l : (a = t.next, t.next = l, l.next = a, e.lastEffect = l), l;
  }
  function er() {
    return zl().memoizedState;
  }
  function uu(l, e, t, a) {
    var n = Wl();
    k.flags |= l, n.memoizedState = ma(
      1 | e,
      { destroy: void 0 },
      t,
      a === void 0 ? null : a
    );
  }
  function iu(l, e, t, a) {
    var n = zl();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    ml !== null && a !== null && Zi(a, ml.memoizedState.deps) ? n.memoizedState = ma(e, u, t, a) : (k.flags |= l, n.memoizedState = ma(
      1 | e,
      u,
      t,
      a
    ));
  }
  function tr(l, e) {
    uu(8390656, 8, l, e);
  }
  function Pi(l, e) {
    iu(2048, 8, l, e);
  }
  function lm(l) {
    k.flags |= 4;
    var e = k.updateQueue;
    if (e === null)
      e = tu(), k.updateQueue = e, e.events = [l];
    else {
      var t = e.events;
      t === null ? e.events = [l] : t.push(l);
    }
  }
  function ar(l) {
    var e = zl().memoizedState;
    return lm({ ref: e, nextImpl: l }), function() {
      if ((rl & 2) !== 0) throw Error(m(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function nr(l, e) {
    return iu(4, 2, l, e);
  }
  function ur(l, e) {
    return iu(4, 4, l, e);
  }
  function ir(l, e) {
    if (typeof e == "function") {
      l = l();
      var t = e(l);
      return function() {
        typeof t == "function" ? t() : e(null);
      };
    }
    if (e != null)
      return l = l(), e.current = l, function() {
        e.current = null;
      };
  }
  function cr(l, e, t) {
    t = t != null ? t.concat([l]) : null, iu(4, 4, ir.bind(null, e, l), t);
  }
  function lc() {
  }
  function sr(l, e) {
    var t = zl();
    e = e === void 0 ? null : e;
    var a = t.memoizedState;
    return e !== null && Zi(e, a[1]) ? a[0] : (t.memoizedState = [l, e], l);
  }
  function fr(l, e) {
    var t = zl();
    e = e === void 0 ? null : e;
    var a = t.memoizedState;
    if (e !== null && Zi(e, a[1]))
      return a[0];
    if (a = l(), Yt) {
      Ie(!0);
      try {
        l();
      } finally {
        Ie(!1);
      }
    }
    return t.memoizedState = [a, e], a;
  }
  function ec(l, e, t) {
    return t === void 0 || (Xe & 1073741824) !== 0 && (tl & 261930) === 0 ? l.memoizedState = e : (l.memoizedState = t, l = ro(), k.lanes |= l, dt |= l, t);
  }
  function rr(l, e, t, a) {
    return fe(t, e) ? t : oa.current !== null ? (l = ec(l, t, a), fe(l, e) || (Dl = !0), l) : (Xe & 42) === 0 || (Xe & 1073741824) !== 0 && (tl & 261930) === 0 ? (Dl = !0, l.memoizedState = t) : (l = ro(), k.lanes |= l, dt |= l, e);
  }
  function or(l, e, t, a, n) {
    var u = T.p;
    T.p = u !== 0 && 8 > u ? u : 8;
    var i = d.T, s = {};
    d.T = s, nc(l, !1, e, t);
    try {
      var r = n(), g = d.S;
      if (g !== null && g(s, r), r !== null && typeof r == "object" && typeof r.then == "function") {
        var x = $h(
          r,
          a
        );
        Pa(
          l,
          e,
          x,
          ye(l)
        );
      } else
        Pa(
          l,
          e,
          a,
          ye(l)
        );
    } catch (N) {
      Pa(
        l,
        e,
        { then: function() {
        }, status: "rejected", reason: N },
        ye()
      );
    } finally {
      T.p = u, i !== null && s.types !== null && (i.types = s.types), d.T = i;
    }
  }
  function em() {
  }
  function tc(l, e, t, a) {
    if (l.tag !== 5) throw Error(m(476));
    var n = dr(l).queue;
    or(
      l,
      n,
      e,
      Q,
      t === null ? em : function() {
        return hr(l), t(a);
      }
    );
  }
  function dr(l) {
    var e = l.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: Q,
      baseState: Q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Le,
        lastRenderedState: Q
      },
      next: null
    };
    var t = {};
    return e.next = {
      memoizedState: t,
      baseState: t,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Le,
        lastRenderedState: t
      },
      next: null
    }, l.memoizedState = e, l = l.alternate, l !== null && (l.memoizedState = e), e;
  }
  function hr(l) {
    var e = dr(l);
    e.next === null && (e = l.alternate.memoizedState), Pa(
      l,
      e.next.queue,
      {},
      ye()
    );
  }
  function ac() {
    return Zl(gn);
  }
  function mr() {
    return zl().memoizedState;
  }
  function yr() {
    return zl().memoizedState;
  }
  function tm(l) {
    for (var e = l.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var t = ye();
          l = it(t);
          var a = ct(e, l, t);
          a !== null && (ne(a, e, t), ka(a, e, t)), e = { cache: Di() }, l.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function am(l, e, t) {
    var a = ye();
    t = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: t,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, cu(l) ? gr(e, t) : (t = xi(l, e, t, a), t !== null && (ne(t, l, a), br(t, e, a)));
  }
  function vr(l, e, t) {
    var a = ye();
    Pa(l, e, t, a);
  }
  function Pa(l, e, t, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: t,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (cu(l)) gr(e, n);
    else {
      var u = l.alternate;
      if (l.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var i = e.lastRenderedState, s = u(i, t);
          if (n.hasEagerState = !0, n.eagerState = s, fe(s, i))
            return Xn(l, e, n, 0), bl === null && Qn(), !1;
        } catch {
        } finally {
        }
      if (t = xi(l, e, n, a), t !== null)
        return ne(t, l, a), br(t, e, a), !0;
    }
    return !1;
  }
  function nc(l, e, t, a) {
    if (a = {
      lane: 2,
      revertLane: qc(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, cu(l)) {
      if (e) throw Error(m(479));
    } else
      e = xi(
        l,
        t,
        a,
        2
      ), e !== null && ne(e, l, 2);
  }
  function cu(l) {
    var e = l.alternate;
    return l === k || e !== null && e === k;
  }
  function gr(l, e) {
    da = lu = !0;
    var t = l.pending;
    t === null ? e.next = e : (e.next = t.next, t.next = e), l.pending = e;
  }
  function br(l, e, t) {
    if ((t & 4194048) !== 0) {
      var a = e.lanes;
      a &= l.pendingLanes, t |= a, e.lanes = t, js(l, t);
    }
  }
  var ln = {
    readContext: Zl,
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
    readContext: Zl,
    use: au,
    useCallback: function(l, e) {
      return Wl().memoizedState = [
        l,
        e === void 0 ? null : e
      ], l;
    },
    useContext: Zl,
    useEffect: tr,
    useImperativeHandle: function(l, e, t) {
      t = t != null ? t.concat([l]) : null, uu(
        4194308,
        4,
        ir.bind(null, e, l),
        t
      );
    },
    useLayoutEffect: function(l, e) {
      return uu(4194308, 4, l, e);
    },
    useInsertionEffect: function(l, e) {
      uu(4, 2, l, e);
    },
    useMemo: function(l, e) {
      var t = Wl();
      e = e === void 0 ? null : e;
      var a = l();
      if (Yt) {
        Ie(!0);
        try {
          l();
        } finally {
          Ie(!1);
        }
      }
      return t.memoizedState = [a, e], a;
    },
    useReducer: function(l, e, t) {
      var a = Wl();
      if (t !== void 0) {
        var n = t(e);
        if (Yt) {
          Ie(!0);
          try {
            t(e);
          } finally {
            Ie(!1);
          }
        }
      } else n = e;
      return a.memoizedState = a.baseState = n, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: n
      }, a.queue = l, l = l.dispatch = am.bind(
        null,
        k,
        l
      ), [a.memoizedState, l];
    },
    useRef: function(l) {
      var e = Wl();
      return l = { current: l }, e.memoizedState = l;
    },
    useState: function(l) {
      l = Fi(l);
      var e = l.queue, t = vr.bind(null, k, e);
      return e.dispatch = t, [l.memoizedState, t];
    },
    useDebugValue: lc,
    useDeferredValue: function(l, e) {
      var t = Wl();
      return ec(t, l, e);
    },
    useTransition: function() {
      var l = Fi(!1);
      return l = or.bind(
        null,
        k,
        l.queue,
        !0,
        !1
      ), Wl().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, e, t) {
      var a = k, n = Wl();
      if (nl) {
        if (t === void 0)
          throw Error(m(407));
        t = t();
      } else {
        if (t = e(), bl === null)
          throw Error(m(349));
        (tl & 127) !== 0 || Qf(a, e, t);
      }
      n.memoizedState = t;
      var u = { value: t, getSnapshot: e };
      return n.queue = u, tr(Lf.bind(null, a, u, l), [
        l
      ]), a.flags |= 2048, ma(
        9,
        { destroy: void 0 },
        Xf.bind(
          null,
          a,
          u,
          t,
          e
        ),
        null
      ), t;
    },
    useId: function() {
      var l = Wl(), e = bl.identifierPrefix;
      if (nl) {
        var t = Me, a = Ce;
        t = (a & ~(1 << 32 - se(a) - 1)).toString(32) + t, e = "_" + e + "R_" + t, t = eu++, 0 < t && (e += "H" + t.toString(32)), e += "_";
      } else
        t = Wh++, e = "_" + e + "r_" + t.toString(32) + "_";
      return l.memoizedState = e;
    },
    useHostTransitionStatus: ac,
    useFormState: Ff,
    useActionState: Ff,
    useOptimistic: function(l) {
      var e = Wl();
      e.memoizedState = e.baseState = l;
      var t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = t, e = nc.bind(
        null,
        k,
        !0,
        t
      ), t.dispatch = e, [l, e];
    },
    useMemoCache: ki,
    useCacheRefresh: function() {
      return Wl().memoizedState = tm.bind(
        null,
        k
      );
    },
    useEffectEvent: function(l) {
      var e = Wl(), t = { impl: l };
      return e.memoizedState = t, function() {
        if ((rl & 2) !== 0)
          throw Error(m(440));
        return t.impl.apply(void 0, arguments);
      };
    }
  }, uc = {
    readContext: Zl,
    use: au,
    useCallback: sr,
    useContext: Zl,
    useEffect: Pi,
    useImperativeHandle: cr,
    useInsertionEffect: nr,
    useLayoutEffect: ur,
    useMemo: fr,
    useReducer: nu,
    useRef: er,
    useState: function() {
      return nu(Le);
    },
    useDebugValue: lc,
    useDeferredValue: function(l, e) {
      var t = zl();
      return rr(
        t,
        ml.memoizedState,
        l,
        e
      );
    },
    useTransition: function() {
      var l = nu(Le)[0], e = zl().memoizedState;
      return [
        typeof l == "boolean" ? l : Ia(l),
        e
      ];
    },
    useSyncExternalStore: Gf,
    useId: mr,
    useHostTransitionStatus: ac,
    useFormState: If,
    useActionState: If,
    useOptimistic: function(l, e) {
      var t = zl();
      return wf(t, ml, l, e);
    },
    useMemoCache: ki,
    useCacheRefresh: yr
  };
  uc.useEffectEvent = ar;
  var Sr = {
    readContext: Zl,
    use: au,
    useCallback: sr,
    useContext: Zl,
    useEffect: Pi,
    useImperativeHandle: cr,
    useInsertionEffect: nr,
    useLayoutEffect: ur,
    useMemo: fr,
    useReducer: Wi,
    useRef: er,
    useState: function() {
      return Wi(Le);
    },
    useDebugValue: lc,
    useDeferredValue: function(l, e) {
      var t = zl();
      return ml === null ? ec(t, l, e) : rr(
        t,
        ml.memoizedState,
        l,
        e
      );
    },
    useTransition: function() {
      var l = Wi(Le)[0], e = zl().memoizedState;
      return [
        typeof l == "boolean" ? l : Ia(l),
        e
      ];
    },
    useSyncExternalStore: Gf,
    useId: mr,
    useHostTransitionStatus: ac,
    useFormState: lr,
    useActionState: lr,
    useOptimistic: function(l, e) {
      var t = zl();
      return ml !== null ? wf(t, ml, l, e) : (t.baseState = l, [l, t.queue.dispatch]);
    },
    useMemoCache: ki,
    useCacheRefresh: yr
  };
  Sr.useEffectEvent = ar;
  function ic(l, e, t, a) {
    e = l.memoizedState, t = t(a, e), t = t == null ? e : U({}, e, t), l.memoizedState = t, l.lanes === 0 && (l.updateQueue.baseState = t);
  }
  var cc = {
    enqueueSetState: function(l, e, t) {
      l = l._reactInternals;
      var a = ye(), n = it(a);
      n.payload = e, t != null && (n.callback = t), e = ct(l, n, a), e !== null && (ne(e, l, a), ka(e, l, a));
    },
    enqueueReplaceState: function(l, e, t) {
      l = l._reactInternals;
      var a = ye(), n = it(a);
      n.tag = 1, n.payload = e, t != null && (n.callback = t), e = ct(l, n, a), e !== null && (ne(e, l, a), ka(e, l, a));
    },
    enqueueForceUpdate: function(l, e) {
      l = l._reactInternals;
      var t = ye(), a = it(t);
      a.tag = 2, e != null && (a.callback = e), e = ct(l, a, t), e !== null && (ne(e, l, t), ka(e, l, t));
    }
  };
  function xr(l, e, t, a, n, u, i) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, u, i) : e.prototype && e.prototype.isPureReactComponent ? !Qa(t, a) || !Qa(n, u) : !0;
  }
  function jr(l, e, t, a) {
    l = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(t, a), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(t, a), e.state !== l && cc.enqueueReplaceState(e, e.state, null);
  }
  function Gt(l, e) {
    var t = e;
    if ("ref" in e) {
      t = {};
      for (var a in e)
        a !== "ref" && (t[a] = e[a]);
    }
    if (l = l.defaultProps) {
      t === e && (t = U({}, t));
      for (var n in l)
        t[n] === void 0 && (t[n] = l[n]);
    }
    return t;
  }
  function Er(l) {
    Gn(l);
  }
  function Nr(l) {
    console.error(l);
  }
  function Tr(l) {
    Gn(l);
  }
  function su(l, e) {
    try {
      var t = l.onUncaughtError;
      t(e.value, { componentStack: e.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Ar(l, e, t) {
    try {
      var a = l.onCaughtError;
      a(t.value, {
        componentStack: t.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function sc(l, e, t) {
    return t = it(t), t.tag = 3, t.payload = { element: null }, t.callback = function() {
      su(l, e);
    }, t;
  }
  function _r(l) {
    return l = it(l), l.tag = 3, l;
  }
  function zr(l, e, t, a) {
    var n = t.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      l.payload = function() {
        return n(u);
      }, l.callback = function() {
        Ar(e, t, a);
      };
    }
    var i = t.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (l.callback = function() {
      Ar(e, t, a), typeof n != "function" && (ht === null ? ht = /* @__PURE__ */ new Set([this]) : ht.add(this));
      var s = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: s !== null ? s : ""
      });
    });
  }
  function nm(l, e, t, a, n) {
    if (t.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (e = t.alternate, e !== null && ia(
        e,
        t,
        n,
        !0
      ), t = oe.current, t !== null) {
        switch (t.tag) {
          case 31:
          case 13:
            return Ne === null ? Su() : t.alternate === null && Tl === 0 && (Tl = 3), t.flags &= -257, t.flags |= 65536, t.lanes = n, a === $n ? t.flags |= 16384 : (e = t.updateQueue, e === null ? t.updateQueue = /* @__PURE__ */ new Set([a]) : e.add(a), Uc(l, a, n)), !1;
          case 22:
            return t.flags |= 65536, a === $n ? t.flags |= 16384 : (e = t.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, t.updateQueue = e) : (t = e.retryQueue, t === null ? e.retryQueue = /* @__PURE__ */ new Set([a]) : t.add(a)), Uc(l, a, n)), !1;
        }
        throw Error(m(435, t.tag));
      }
      return Uc(l, a, n), Su(), !1;
    }
    if (nl)
      return e = oe.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = n, a !== _i && (l = Error(m(422), { cause: a }), Za(Se(l, t)))) : (a !== _i && (e = Error(m(423), {
        cause: a
      }), Za(
        Se(e, t)
      )), l = l.current.alternate, l.flags |= 65536, n &= -n, l.lanes |= n, a = Se(a, t), n = sc(
        l.stateNode,
        a,
        n
      ), Yi(l, n), Tl !== 4 && (Tl = 2)), !1;
    var u = Error(m(520), { cause: a });
    if (u = Se(u, t), fn === null ? fn = [u] : fn.push(u), Tl !== 4 && (Tl = 2), e === null) return !0;
    a = Se(a, t), t = e;
    do {
      switch (t.tag) {
        case 3:
          return t.flags |= 65536, l = n & -n, t.lanes |= l, l = sc(t.stateNode, a, l), Yi(t, l), !1;
        case 1:
          if (e = t.type, u = t.stateNode, (t.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (ht === null || !ht.has(u))))
            return t.flags |= 65536, n &= -n, t.lanes |= n, n = _r(n), zr(
              n,
              l,
              t,
              a
            ), Yi(t, n), !1;
      }
      t = t.return;
    } while (t !== null);
    return !1;
  }
  var fc = Error(m(461)), Dl = !1;
  function Vl(l, e, t, a) {
    e.child = l === null ? Df(e, null, t, a) : Bt(
      e,
      l.child,
      t,
      a
    );
  }
  function Or(l, e, t, a, n) {
    t = t.render;
    var u = e.ref;
    if ("ref" in a) {
      var i = {};
      for (var s in a)
        s !== "ref" && (i[s] = a[s]);
    } else i = a;
    return Ut(e), a = Vi(
      l,
      e,
      t,
      i,
      u,
      n
    ), s = wi(), l !== null && !Dl ? (Ki(l, e, n), Ze(l, e, n)) : (nl && s && Ti(e), e.flags |= 1, Vl(l, e, a, n), e.child);
  }
  function Cr(l, e, t, a, n) {
    if (l === null) {
      var u = t.type;
      return typeof u == "function" && !ji(u) && u.defaultProps === void 0 && t.compare === null ? (e.tag = 15, e.type = u, Mr(
        l,
        e,
        u,
        a,
        n
      )) : (l = Zn(
        t.type,
        null,
        a,
        e,
        e.mode,
        n
      ), l.ref = e.ref, l.return = e, e.child = l);
    }
    if (u = l.child, !gc(l, n)) {
      var i = u.memoizedProps;
      if (t = t.compare, t = t !== null ? t : Qa, t(i, a) && l.ref === e.ref)
        return Ze(l, e, n);
    }
    return e.flags |= 1, l = Be(u, a), l.ref = e.ref, l.return = e, e.child = l;
  }
  function Mr(l, e, t, a, n) {
    if (l !== null) {
      var u = l.memoizedProps;
      if (Qa(u, a) && l.ref === e.ref)
        if (Dl = !1, e.pendingProps = a = u, gc(l, n))
          (l.flags & 131072) !== 0 && (Dl = !0);
        else
          return e.lanes = l.lanes, Ze(l, e, n);
    }
    return rc(
      l,
      e,
      t,
      a,
      n
    );
  }
  function Dr(l, e, t, a) {
    var n = a.children, u = l !== null ? l.memoizedState : null;
    if (l === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | t : t, l !== null) {
          for (a = e.child = l.child, n = 0; a !== null; )
            n = n | a.lanes | a.childLanes, a = a.sibling;
          a = n & ~u;
        } else a = 0, e.child = null;
        return Ur(
          l,
          e,
          u,
          t,
          a
        );
      }
      if ((t & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Jn(
          e,
          u !== null ? u.cachePool : null
        ), u !== null ? Hf(e, u) : Qi(), qf(e);
      else
        return a = e.lanes = 536870912, Ur(
          l,
          e,
          u !== null ? u.baseLanes | t : t,
          t,
          a
        );
    } else
      u !== null ? (Jn(e, u.cachePool), Hf(e, u), ft(), e.memoizedState = null) : (l !== null && Jn(e, null), Qi(), ft());
    return Vl(l, e, n, t), e.child;
  }
  function en(l, e) {
    return l !== null && l.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function Ur(l, e, t, a, n) {
    var u = Ri();
    return u = u === null ? null : { parent: Cl._currentValue, pool: u }, e.memoizedState = {
      baseLanes: t,
      cachePool: u
    }, l !== null && Jn(e, null), Qi(), qf(e), l !== null && ia(l, e, a, !0), e.childLanes = n, null;
  }
  function fu(l, e) {
    return e = ou(
      { mode: e.mode, children: e.children },
      l.mode
    ), e.ref = l.ref, l.child = e, e.return = l, e;
  }
  function Rr(l, e, t) {
    return Bt(e, l.child, null, t), l = fu(e, e.pendingProps), l.flags |= 2, de(e), e.memoizedState = null, l;
  }
  function um(l, e, t) {
    var a = e.pendingProps, n = (e.flags & 128) !== 0;
    if (e.flags &= -129, l === null) {
      if (nl) {
        if (a.mode === "hidden")
          return l = fu(e, a), e.lanes = 536870912, en(null, l);
        if (Li(e), (l = pl) ? (l = Jo(
          l,
          Ee
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (e.memoizedState = {
          dehydrated: l,
          treeContext: et !== null ? { id: Ce, overflow: Me } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, t = gf(l), t.return = e, e.child = t, Ll = e, pl = null)) : l = null, l === null) throw at(e);
        return e.lanes = 536870912, null;
      }
      return fu(e, a);
    }
    var u = l.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (Li(e), n)
        if (e.flags & 256)
          e.flags &= -257, e = Rr(
            l,
            e,
            t
          );
        else if (e.memoizedState !== null)
          e.child = l.child, e.flags |= 128, e = null;
        else throw Error(m(558));
      else if (Dl || ia(l, e, t, !1), n = (t & l.childLanes) !== 0, Dl || n) {
        if (a = bl, a !== null && (i = Es(a, t), i !== 0 && i !== u.retryLane))
          throw u.retryLane = i, Ot(l, i), ne(a, l, i), fc;
        Su(), e = Rr(
          l,
          e,
          t
        );
      } else
        l = u.treeContext, pl = Te(i.nextSibling), Ll = e, nl = !0, tt = null, Ee = !1, l !== null && Sf(e, l), e = fu(e, a), e.flags |= 4096;
      return e;
    }
    return l = Be(l.child, {
      mode: a.mode,
      children: a.children
    }), l.ref = e.ref, e.child = l, l.return = e, l;
  }
  function ru(l, e) {
    var t = e.ref;
    if (t === null)
      l !== null && l.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof t != "function" && typeof t != "object")
        throw Error(m(284));
      (l === null || l.ref !== t) && (e.flags |= 4194816);
    }
  }
  function rc(l, e, t, a, n) {
    return Ut(e), t = Vi(
      l,
      e,
      t,
      a,
      void 0,
      n
    ), a = wi(), l !== null && !Dl ? (Ki(l, e, n), Ze(l, e, n)) : (nl && a && Ti(e), e.flags |= 1, Vl(l, e, t, n), e.child);
  }
  function Hr(l, e, t, a, n, u) {
    return Ut(e), e.updateQueue = null, t = Yf(
      e,
      a,
      t,
      n
    ), Bf(l), a = wi(), l !== null && !Dl ? (Ki(l, e, u), Ze(l, e, u)) : (nl && a && Ti(e), e.flags |= 1, Vl(l, e, t, u), e.child);
  }
  function qr(l, e, t, a, n) {
    if (Ut(e), e.stateNode === null) {
      var u = ta, i = t.contextType;
      typeof i == "object" && i !== null && (u = Zl(i)), u = new t(a, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = cc, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = a, u.state = e.memoizedState, u.refs = {}, qi(e), i = t.contextType, u.context = typeof i == "object" && i !== null ? Zl(i) : ta, u.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (ic(
        e,
        t,
        i,
        a
      ), u.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && cc.enqueueReplaceState(u, u.state, null), Wa(e, a, u, n), $a(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !0;
    } else if (l === null) {
      u = e.stateNode;
      var s = e.memoizedProps, r = Gt(t, s);
      u.props = r;
      var g = u.context, x = t.contextType;
      i = ta, typeof x == "object" && x !== null && (i = Zl(x));
      var N = t.getDerivedStateFromProps;
      x = typeof N == "function" || typeof u.getSnapshotBeforeUpdate == "function", s = e.pendingProps !== s, x || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (s || g !== i) && jr(
        e,
        u,
        a,
        i
      ), ut = !1;
      var b = e.memoizedState;
      u.state = b, Wa(e, a, u, n), $a(), g = e.memoizedState, s || b !== g || ut ? (typeof N == "function" && (ic(
        e,
        t,
        N,
        a
      ), g = e.memoizedState), (r = ut || xr(
        e,
        t,
        r,
        a,
        b,
        g,
        i
      )) ? (x || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = a, e.memoizedState = g), u.props = a, u.state = g, u.context = i, a = r) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !1);
    } else {
      u = e.stateNode, Bi(l, e), i = e.memoizedProps, x = Gt(t, i), u.props = x, N = e.pendingProps, b = u.context, g = t.contextType, r = ta, typeof g == "object" && g !== null && (r = Zl(g)), s = t.getDerivedStateFromProps, (g = typeof s == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== N || b !== r) && jr(
        e,
        u,
        a,
        r
      ), ut = !1, b = e.memoizedState, u.state = b, Wa(e, a, u, n), $a();
      var p = e.memoizedState;
      i !== N || b !== p || ut || l !== null && l.dependencies !== null && wn(l.dependencies) ? (typeof s == "function" && (ic(
        e,
        t,
        s,
        a
      ), p = e.memoizedState), (x = ut || xr(
        e,
        t,
        x,
        a,
        b,
        p,
        r
      ) || l !== null && l.dependencies !== null && wn(l.dependencies)) ? (g || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, p, r), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        p,
        r
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === l.memoizedProps && b === l.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && b === l.memoizedState || (e.flags |= 1024), e.memoizedProps = a, e.memoizedState = p), u.props = a, u.state = p, u.context = r, a = x) : (typeof u.componentDidUpdate != "function" || i === l.memoizedProps && b === l.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && b === l.memoizedState || (e.flags |= 1024), a = !1);
    }
    return u = a, ru(l, e), a = (e.flags & 128) !== 0, u || a ? (u = e.stateNode, t = a && typeof t.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, l !== null && a ? (e.child = Bt(
      e,
      l.child,
      null,
      n
    ), e.child = Bt(
      e,
      null,
      t,
      n
    )) : Vl(l, e, t, n), e.memoizedState = u.state, l = e.child) : l = Ze(
      l,
      e,
      n
    ), l;
  }
  function Br(l, e, t, a) {
    return Mt(), e.flags |= 256, Vl(l, e, t, a), e.child;
  }
  var oc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function dc(l) {
    return { baseLanes: l, cachePool: Af() };
  }
  function hc(l, e, t) {
    return l = l !== null ? l.childLanes & ~t : 0, e && (l |= me), l;
  }
  function Yr(l, e, t) {
    var a = e.pendingProps, n = !1, u = (e.flags & 128) !== 0, i;
    if ((i = u) || (i = l !== null && l.memoizedState === null ? !1 : (_l.current & 2) !== 0), i && (n = !0, e.flags &= -129), i = (e.flags & 32) !== 0, e.flags &= -33, l === null) {
      if (nl) {
        if (n ? st(e) : ft(), (l = pl) ? (l = Jo(
          l,
          Ee
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (e.memoizedState = {
          dehydrated: l,
          treeContext: et !== null ? { id: Ce, overflow: Me } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, t = gf(l), t.return = e, e.child = t, Ll = e, pl = null)) : l = null, l === null) throw at(e);
        return $c(l) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      var s = a.children;
      return a = a.fallback, n ? (ft(), n = e.mode, s = ou(
        { mode: "hidden", children: s },
        n
      ), a = Ct(
        a,
        n,
        t,
        null
      ), s.return = e, a.return = e, s.sibling = a, e.child = s, a = e.child, a.memoizedState = dc(t), a.childLanes = hc(
        l,
        i,
        t
      ), e.memoizedState = oc, en(null, a)) : (st(e), mc(e, s));
    }
    var r = l.memoizedState;
    if (r !== null && (s = r.dehydrated, s !== null)) {
      if (u)
        e.flags & 256 ? (st(e), e.flags &= -257, e = yc(
          l,
          e,
          t
        )) : e.memoizedState !== null ? (ft(), e.child = l.child, e.flags |= 128, e = null) : (ft(), s = a.fallback, n = e.mode, a = ou(
          { mode: "visible", children: a.children },
          n
        ), s = Ct(
          s,
          n,
          t,
          null
        ), s.flags |= 2, a.return = e, s.return = e, a.sibling = s, e.child = a, Bt(
          e,
          l.child,
          null,
          t
        ), a = e.child, a.memoizedState = dc(t), a.childLanes = hc(
          l,
          i,
          t
        ), e.memoizedState = oc, e = en(null, a));
      else if (st(e), $c(s)) {
        if (i = s.nextSibling && s.nextSibling.dataset, i) var g = i.dgst;
        i = g, a = Error(m(419)), a.stack = "", a.digest = i, Za({ value: a, source: null, stack: null }), e = yc(
          l,
          e,
          t
        );
      } else if (Dl || ia(l, e, t, !1), i = (t & l.childLanes) !== 0, Dl || i) {
        if (i = bl, i !== null && (a = Es(i, t), a !== 0 && a !== r.retryLane))
          throw r.retryLane = a, Ot(l, a), ne(i, l, a), fc;
        kc(s) || Su(), e = yc(
          l,
          e,
          t
        );
      } else
        kc(s) ? (e.flags |= 192, e.child = l.child, e = null) : (l = r.treeContext, pl = Te(
          s.nextSibling
        ), Ll = e, nl = !0, tt = null, Ee = !1, l !== null && Sf(e, l), e = mc(
          e,
          a.children
        ), e.flags |= 4096);
      return e;
    }
    return n ? (ft(), s = a.fallback, n = e.mode, r = l.child, g = r.sibling, a = Be(r, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = r.subtreeFlags & 65011712, g !== null ? s = Be(
      g,
      s
    ) : (s = Ct(
      s,
      n,
      t,
      null
    ), s.flags |= 2), s.return = e, a.return = e, a.sibling = s, e.child = a, en(null, a), a = e.child, s = l.child.memoizedState, s === null ? s = dc(t) : (n = s.cachePool, n !== null ? (r = Cl._currentValue, n = n.parent !== r ? { parent: r, pool: r } : n) : n = Af(), s = {
      baseLanes: s.baseLanes | t,
      cachePool: n
    }), a.memoizedState = s, a.childLanes = hc(
      l,
      i,
      t
    ), e.memoizedState = oc, en(l.child, a)) : (st(e), t = l.child, l = t.sibling, t = Be(t, {
      mode: "visible",
      children: a.children
    }), t.return = e, t.sibling = null, l !== null && (i = e.deletions, i === null ? (e.deletions = [l], e.flags |= 16) : i.push(l)), e.child = t, e.memoizedState = null, t);
  }
  function mc(l, e) {
    return e = ou(
      { mode: "visible", children: e },
      l.mode
    ), e.return = l, l.child = e;
  }
  function ou(l, e) {
    return l = re(22, l, null, e), l.lanes = 0, l;
  }
  function yc(l, e, t) {
    return Bt(e, l.child, null, t), l = mc(
      e,
      e.pendingProps.children
    ), l.flags |= 2, e.memoizedState = null, l;
  }
  function Gr(l, e, t) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e), Ci(l.return, e, t);
  }
  function vc(l, e, t, a, n, u) {
    var i = l.memoizedState;
    i === null ? l.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: t,
      tailMode: n,
      treeForkCount: u
    } : (i.isBackwards = e, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = t, i.tailMode = n, i.treeForkCount = u);
  }
  function Qr(l, e, t) {
    var a = e.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = _l.current, s = (i & 2) !== 0;
    if (s ? (i = i & 1 | 2, e.flags |= 128) : i &= 1, _(_l, i), Vl(l, e, a, t), a = nl ? La : 0, !s && l !== null && (l.flags & 128) !== 0)
      l: for (l = e.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && Gr(l, t, e);
        else if (l.tag === 19)
          Gr(l, t, e);
        else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === e) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === e)
            break l;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    switch (n) {
      case "forwards":
        for (t = e.child, n = null; t !== null; )
          l = t.alternate, l !== null && Pn(l) === null && (n = t), t = t.sibling;
        t = n, t === null ? (n = e.child, e.child = null) : (n = t.sibling, t.sibling = null), vc(
          e,
          !1,
          n,
          t,
          u,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (t = null, n = e.child, e.child = null; n !== null; ) {
          if (l = n.alternate, l !== null && Pn(l) === null) {
            e.child = n;
            break;
          }
          l = n.sibling, n.sibling = t, t = n, n = l;
        }
        vc(
          e,
          !0,
          t,
          null,
          u,
          a
        );
        break;
      case "together":
        vc(
          e,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function Ze(l, e, t) {
    if (l !== null && (e.dependencies = l.dependencies), dt |= e.lanes, (t & e.childLanes) === 0)
      if (l !== null) {
        if (ia(
          l,
          e,
          t,
          !1
        ), (t & e.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && e.child !== l.child)
      throw Error(m(153));
    if (e.child !== null) {
      for (l = e.child, t = Be(l, l.pendingProps), e.child = t, t.return = e; l.sibling !== null; )
        l = l.sibling, t = t.sibling = Be(l, l.pendingProps), t.return = e;
      t.sibling = null;
    }
    return e.child;
  }
  function gc(l, e) {
    return (l.lanes & e) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && wn(l)));
  }
  function im(l, e, t) {
    switch (e.tag) {
      case 3:
        $l(e, e.stateNode.containerInfo), nt(e, Cl, l.memoizedState.cache), Mt();
        break;
      case 27:
      case 5:
        _a(e);
        break;
      case 4:
        $l(e, e.stateNode.containerInfo);
        break;
      case 10:
        nt(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, Li(e), null;
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (st(e), e.flags |= 128, null) : (t & e.child.childLanes) !== 0 ? Yr(l, e, t) : (st(e), l = Ze(
            l,
            e,
            t
          ), l !== null ? l.sibling : null);
        st(e);
        break;
      case 19:
        var n = (l.flags & 128) !== 0;
        if (a = (t & e.childLanes) !== 0, a || (ia(
          l,
          e,
          t,
          !1
        ), a = (t & e.childLanes) !== 0), n) {
          if (a)
            return Qr(
              l,
              e,
              t
            );
          e.flags |= 128;
        }
        if (n = e.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), _(_l, _l.current), a) break;
        return null;
      case 22:
        return e.lanes = 0, Dr(
          l,
          e,
          t,
          e.pendingProps
        );
      case 24:
        nt(e, Cl, l.memoizedState.cache);
    }
    return Ze(l, e, t);
  }
  function Xr(l, e, t) {
    if (l !== null)
      if (l.memoizedProps !== e.pendingProps)
        Dl = !0;
      else {
        if (!gc(l, t) && (e.flags & 128) === 0)
          return Dl = !1, im(
            l,
            e,
            t
          );
        Dl = (l.flags & 131072) !== 0;
      }
    else
      Dl = !1, nl && (e.flags & 1048576) !== 0 && pf(e, La, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        l: {
          var a = e.pendingProps;
          if (l = Ht(e.elementType), e.type = l, typeof l == "function")
            ji(l) ? (a = Gt(l, a), e.tag = 1, e = qr(
              null,
              e,
              l,
              a,
              t
            )) : (e.tag = 0, e = rc(
              null,
              e,
              l,
              a,
              t
            ));
          else {
            if (l != null) {
              var n = l.$$typeof;
              if (n === ql) {
                e.tag = 11, e = Or(
                  null,
                  e,
                  l,
                  a,
                  t
                );
                break l;
              } else if (n === K) {
                e.tag = 14, e = Cr(
                  null,
                  e,
                  l,
                  a,
                  t
                );
                break l;
              }
            }
            throw e = Fl(l) || l, Error(m(306, e, ""));
          }
        }
        return e;
      case 0:
        return rc(
          l,
          e,
          e.type,
          e.pendingProps,
          t
        );
      case 1:
        return a = e.type, n = Gt(
          a,
          e.pendingProps
        ), qr(
          l,
          e,
          a,
          n,
          t
        );
      case 3:
        l: {
          if ($l(
            e,
            e.stateNode.containerInfo
          ), l === null) throw Error(m(387));
          a = e.pendingProps;
          var u = e.memoizedState;
          n = u.element, Bi(l, e), Wa(e, a, null, t);
          var i = e.memoizedState;
          if (a = i.cache, nt(e, Cl, a), a !== u.cache && Mi(
            e,
            [Cl],
            t,
            !0
          ), $a(), a = i.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
              e = Br(
                l,
                e,
                a,
                t
              );
              break l;
            } else if (a !== n) {
              n = Se(
                Error(m(424)),
                e
              ), Za(n), e = Br(
                l,
                e,
                a,
                t
              );
              break l;
            } else {
              switch (l = e.stateNode.containerInfo, l.nodeType) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              for (pl = Te(l.firstChild), Ll = e, nl = !0, tt = null, Ee = !0, t = Df(
                e,
                null,
                a,
                t
              ), e.child = t; t; )
                t.flags = t.flags & -3 | 4096, t = t.sibling;
            }
          else {
            if (Mt(), a === n) {
              e = Ze(
                l,
                e,
                t
              );
              break l;
            }
            Vl(l, e, a, t);
          }
          e = e.child;
        }
        return e;
      case 26:
        return ru(l, e), l === null ? (t = Po(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = t : nl || (t = e.type, l = e.pendingProps, a = _u(
          P.current
        ).createElement(t), a[Xl] = e, a[Il] = l, wl(a, t, l), Yl(a), e.stateNode = a) : e.memoizedState = Po(
          e.type,
          l.memoizedProps,
          e.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return _a(e), l === null && nl && (a = e.stateNode = Wo(
          e.type,
          e.pendingProps,
          P.current
        ), Ll = e, Ee = !0, n = pl, gt(e.type) ? (Wc = n, pl = Te(a.firstChild)) : pl = n), Vl(
          l,
          e,
          e.pendingProps.children,
          t
        ), ru(l, e), l === null && (e.flags |= 4194304), e.child;
      case 5:
        return l === null && nl && ((n = a = pl) && (a = qm(
          a,
          e.type,
          e.pendingProps,
          Ee
        ), a !== null ? (e.stateNode = a, Ll = e, pl = Te(a.firstChild), Ee = !1, n = !0) : n = !1), n || at(e)), _a(e), n = e.type, u = e.pendingProps, i = l !== null ? l.memoizedProps : null, a = u.children, wc(n, u) ? a = null : i !== null && wc(n, i) && (e.flags |= 32), e.memoizedState !== null && (n = Vi(
          l,
          e,
          Fh,
          null,
          null,
          t
        ), gn._currentValue = n), ru(l, e), Vl(l, e, a, t), e.child;
      case 6:
        return l === null && nl && ((l = t = pl) && (t = Bm(
          t,
          e.pendingProps,
          Ee
        ), t !== null ? (e.stateNode = t, Ll = e, pl = null, l = !0) : l = !1), l || at(e)), null;
      case 13:
        return Yr(l, e, t);
      case 4:
        return $l(
          e,
          e.stateNode.containerInfo
        ), a = e.pendingProps, l === null ? e.child = Bt(
          e,
          null,
          a,
          t
        ) : Vl(l, e, a, t), e.child;
      case 11:
        return Or(
          l,
          e,
          e.type,
          e.pendingProps,
          t
        );
      case 7:
        return Vl(
          l,
          e,
          e.pendingProps,
          t
        ), e.child;
      case 8:
        return Vl(
          l,
          e,
          e.pendingProps.children,
          t
        ), e.child;
      case 12:
        return Vl(
          l,
          e,
          e.pendingProps.children,
          t
        ), e.child;
      case 10:
        return a = e.pendingProps, nt(e, e.type, a.value), Vl(l, e, a.children, t), e.child;
      case 9:
        return n = e.type._context, a = e.pendingProps.children, Ut(e), n = Zl(n), a = a(n), e.flags |= 1, Vl(l, e, a, t), e.child;
      case 14:
        return Cr(
          l,
          e,
          e.type,
          e.pendingProps,
          t
        );
      case 15:
        return Mr(
          l,
          e,
          e.type,
          e.pendingProps,
          t
        );
      case 19:
        return Qr(l, e, t);
      case 31:
        return um(l, e, t);
      case 22:
        return Dr(
          l,
          e,
          t,
          e.pendingProps
        );
      case 24:
        return Ut(e), a = Zl(Cl), l === null ? (n = Ri(), n === null && (n = bl, u = Di(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= t), n = u), e.memoizedState = { parent: a, cache: n }, qi(e), nt(e, Cl, n)) : ((l.lanes & t) !== 0 && (Bi(l, e), Wa(e, null, null, t), $a()), n = l.memoizedState, u = e.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, e.memoizedState = n, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n), nt(e, Cl, a)) : (a = u.cache, nt(e, Cl, a), a !== n.cache && Mi(
          e,
          [Cl],
          t,
          !0
        ))), Vl(
          l,
          e,
          e.pendingProps.children,
          t
        ), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(m(156, e.tag));
  }
  function Ve(l) {
    l.flags |= 4;
  }
  function bc(l, e, t, a, n) {
    if ((e = (l.mode & 32) !== 0) && (e = !1), e) {
      if (l.flags |= 16777216, (n & 335544128) === n)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (yo()) l.flags |= 8192;
        else
          throw qt = $n, Hi;
    } else l.flags &= -16777217;
  }
  function Lr(l, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !nd(e))
      if (yo()) l.flags |= 8192;
      else
        throw qt = $n, Hi;
  }
  function du(l, e) {
    e !== null && (l.flags |= 4), l.flags & 16384 && (e = l.tag !== 22 ? Ss() : 536870912, l.lanes |= e, ba |= e);
  }
  function tn(l, e) {
    if (!nl)
      switch (l.tailMode) {
        case "hidden":
          e = l.tail;
          for (var t = null; e !== null; )
            e.alternate !== null && (t = e), e = e.sibling;
          t === null ? l.tail = null : t.sibling = null;
          break;
        case "collapsed":
          t = l.tail;
          for (var a = null; t !== null; )
            t.alternate !== null && (a = t), t = t.sibling;
          a === null ? e || l.tail === null ? l.tail = null : l.tail.sibling = null : a.sibling = null;
      }
  }
  function Sl(l) {
    var e = l.alternate !== null && l.alternate.child === l.child, t = 0, a = 0;
    if (e)
      for (var n = l.child; n !== null; )
        t |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = l, n = n.sibling;
    else
      for (n = l.child; n !== null; )
        t |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = l, n = n.sibling;
    return l.subtreeFlags |= a, l.childLanes = t, e;
  }
  function cm(l, e, t) {
    var a = e.pendingProps;
    switch (Ai(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Sl(e), null;
      case 1:
        return Sl(e), null;
      case 3:
        return t = e.stateNode, a = null, l !== null && (a = l.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), Qe(Cl), Al(), t.pendingContext && (t.context = t.pendingContext, t.pendingContext = null), (l === null || l.child === null) && (ua(e) ? Ve(e) : l === null || l.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, zi())), Sl(e), null;
      case 26:
        var n = e.type, u = e.memoizedState;
        return l === null ? (Ve(e), u !== null ? (Sl(e), Lr(e, u)) : (Sl(e), bc(
          e,
          n,
          null,
          a,
          t
        ))) : u ? u !== l.memoizedState ? (Ve(e), Sl(e), Lr(e, u)) : (Sl(e), e.flags &= -16777217) : (l = l.memoizedProps, l !== a && Ve(e), Sl(e), bc(
          e,
          n,
          l,
          a,
          t
        )), null;
      case 27:
        if (En(e), t = P.current, n = e.type, l !== null && e.stateNode != null)
          l.memoizedProps !== a && Ve(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(m(166));
            return Sl(e), null;
          }
          l = D.current, ua(e) ? xf(e) : (l = Wo(n, a, t), e.stateNode = l, Ve(e));
        }
        return Sl(e), null;
      case 5:
        if (En(e), n = e.type, l !== null && e.stateNode != null)
          l.memoizedProps !== a && Ve(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(m(166));
            return Sl(e), null;
          }
          if (u = D.current, ua(e))
            xf(e);
          else {
            var i = _u(
              P.current
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
            u[Xl] = e, u[Il] = a;
            l: for (i = e.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                u.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i, i = i.child;
                continue;
              }
              if (i === e) break l;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === e)
                  break l;
                i = i.return;
              }
              i.sibling.return = i.return, i = i.sibling;
            }
            e.stateNode = u;
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
            a && Ve(e);
          }
        }
        return Sl(e), bc(
          e,
          e.type,
          l === null ? null : l.memoizedProps,
          e.pendingProps,
          t
        ), null;
      case 6:
        if (l && e.stateNode != null)
          l.memoizedProps !== a && Ve(e);
        else {
          if (typeof a != "string" && e.stateNode === null)
            throw Error(m(166));
          if (l = P.current, ua(e)) {
            if (l = e.stateNode, t = e.memoizedProps, a = null, n = Ll, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            l[Xl] = e, l = !!(l.nodeValue === t || a !== null && a.suppressHydrationWarning === !0 || Go(l.nodeValue, t)), l || at(e, !0);
          } else
            l = _u(l).createTextNode(
              a
            ), l[Xl] = e, e.stateNode = l;
        }
        return Sl(e), null;
      case 31:
        if (t = e.memoizedState, l === null || l.memoizedState !== null) {
          if (a = ua(e), t !== null) {
            if (l === null) {
              if (!a) throw Error(m(318));
              if (l = e.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(m(557));
              l[Xl] = e;
            } else
              Mt(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Sl(e), l = !1;
          } else
            t = zi(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = t), l = !0;
          if (!l)
            return e.flags & 256 ? (de(e), e) : (de(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(m(558));
        }
        return Sl(e), null;
      case 13:
        if (a = e.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (n = ua(e), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!n) throw Error(m(318));
              if (n = e.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(m(317));
              n[Xl] = e;
            } else
              Mt(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Sl(e), n = !1;
          } else
            n = zi(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return e.flags & 256 ? (de(e), e) : (de(e), null);
        }
        return de(e), (e.flags & 128) !== 0 ? (e.lanes = t, e) : (t = a !== null, l = l !== null && l.memoizedState !== null, t && (a = e.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), t !== l && t && (e.child.flags |= 8192), du(e, e.updateQueue), Sl(e), null);
      case 4:
        return Al(), l === null && Qc(e.stateNode.containerInfo), Sl(e), null;
      case 10:
        return Qe(e.type), Sl(e), null;
      case 19:
        if (S(_l), a = e.memoizedState, a === null) return Sl(e), null;
        if (n = (e.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) tn(a, !1);
          else {
            if (Tl !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = e.child; l !== null; ) {
                if (u = Pn(l), u !== null) {
                  for (e.flags |= 128, tn(a, !1), l = u.updateQueue, e.updateQueue = l, du(e, l), e.subtreeFlags = 0, l = t, t = e.child; t !== null; )
                    vf(t, l), t = t.sibling;
                  return _(
                    _l,
                    _l.current & 1 | 2
                  ), nl && Ye(e, a.treeForkCount), e.child;
                }
                l = l.sibling;
              }
            a.tail !== null && ie() > gu && (e.flags |= 128, n = !0, tn(a, !1), e.lanes = 4194304);
          }
        else {
          if (!n)
            if (l = Pn(u), l !== null) {
              if (e.flags |= 128, n = !0, l = l.updateQueue, e.updateQueue = l, du(e, l), tn(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !nl)
                return Sl(e), null;
            } else
              2 * ie() - a.renderingStartTime > gu && t !== 536870912 && (e.flags |= 128, n = !0, tn(a, !1), e.lanes = 4194304);
          a.isBackwards ? (u.sibling = e.child, e.child = u) : (l = a.last, l !== null ? l.sibling = u : e.child = u, a.last = u);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = ie(), l.sibling = null, t = _l.current, _(
          _l,
          n ? t & 1 | 2 : t & 1
        ), nl && Ye(e, a.treeForkCount), l) : (Sl(e), null);
      case 22:
      case 23:
        return de(e), Xi(), a = e.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (e.flags |= 8192) : a && (e.flags |= 8192), a ? (t & 536870912) !== 0 && (e.flags & 128) === 0 && (Sl(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Sl(e), t = e.updateQueue, t !== null && du(e, t.retryQueue), t = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), a = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), a !== t && (e.flags |= 2048), l !== null && S(Rt), null;
      case 24:
        return t = null, l !== null && (t = l.memoizedState.cache), e.memoizedState.cache !== t && (e.flags |= 2048), Qe(Cl), Sl(e), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(m(156, e.tag));
  }
  function sm(l, e) {
    switch (Ai(e), e.tag) {
      case 1:
        return l = e.flags, l & 65536 ? (e.flags = l & -65537 | 128, e) : null;
      case 3:
        return Qe(Cl), Al(), l = e.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (e.flags = l & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return En(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (de(e), e.alternate === null)
            throw Error(m(340));
          Mt();
        }
        return l = e.flags, l & 65536 ? (e.flags = l & -65537 | 128, e) : null;
      case 13:
        if (de(e), l = e.memoizedState, l !== null && l.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(m(340));
          Mt();
        }
        return l = e.flags, l & 65536 ? (e.flags = l & -65537 | 128, e) : null;
      case 19:
        return S(_l), null;
      case 4:
        return Al(), null;
      case 10:
        return Qe(e.type), null;
      case 22:
      case 23:
        return de(e), Xi(), l !== null && S(Rt), l = e.flags, l & 65536 ? (e.flags = l & -65537 | 128, e) : null;
      case 24:
        return Qe(Cl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Zr(l, e) {
    switch (Ai(e), e.tag) {
      case 3:
        Qe(Cl), Al();
        break;
      case 26:
      case 27:
      case 5:
        En(e);
        break;
      case 4:
        Al();
        break;
      case 31:
        e.memoizedState !== null && de(e);
        break;
      case 13:
        de(e);
        break;
      case 19:
        S(_l);
        break;
      case 10:
        Qe(e.type);
        break;
      case 22:
      case 23:
        de(e), Xi(), l !== null && S(Rt);
        break;
      case 24:
        Qe(Cl);
    }
  }
  function an(l, e) {
    try {
      var t = e.updateQueue, a = t !== null ? t.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        t = n;
        do {
          if ((t.tag & l) === l) {
            a = void 0;
            var u = t.create, i = t.inst;
            a = u(), i.destroy = a;
          }
          t = t.next;
        } while (t !== n);
      }
    } catch (s) {
      hl(e, e.return, s);
    }
  }
  function rt(l, e, t) {
    try {
      var a = e.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & l) === l) {
            var i = a.inst, s = i.destroy;
            if (s !== void 0) {
              i.destroy = void 0, n = e;
              var r = t, g = s;
              try {
                g();
              } catch (x) {
                hl(
                  n,
                  r,
                  x
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (x) {
      hl(e, e.return, x);
    }
  }
  function Vr(l) {
    var e = l.updateQueue;
    if (e !== null) {
      var t = l.stateNode;
      try {
        Rf(e, t);
      } catch (a) {
        hl(l, l.return, a);
      }
    }
  }
  function wr(l, e, t) {
    t.props = Gt(
      l.type,
      l.memoizedProps
    ), t.state = l.memoizedState;
    try {
      t.componentWillUnmount();
    } catch (a) {
      hl(l, e, a);
    }
  }
  function nn(l, e) {
    try {
      var t = l.ref;
      if (t !== null) {
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
        typeof t == "function" ? l.refCleanup = t(a) : t.current = a;
      }
    } catch (n) {
      hl(l, e, n);
    }
  }
  function De(l, e) {
    var t = l.ref, a = l.refCleanup;
    if (t !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          hl(l, e, n);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof t == "function")
        try {
          t(null);
        } catch (n) {
          hl(l, e, n);
        }
      else t.current = null;
  }
  function Kr(l) {
    var e = l.type, t = l.memoizedProps, a = l.stateNode;
    try {
      l: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          t.autoFocus && a.focus();
          break l;
        case "img":
          t.src ? a.src = t.src : t.srcSet && (a.srcset = t.srcSet);
      }
    } catch (n) {
      hl(l, l.return, n);
    }
  }
  function pc(l, e, t) {
    try {
      var a = l.stateNode;
      Cm(a, l.type, t, e), a[Il] = e;
    } catch (n) {
      hl(l, l.return, n);
    }
  }
  function Jr(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && gt(l.type) || l.tag === 4;
  }
  function Sc(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || Jr(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && gt(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function xc(l, e, t) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, e ? (t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t).insertBefore(l, e) : (e = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, e.appendChild(l), t = t._reactRootContainer, t != null || e.onclick !== null || (e.onclick = He));
    else if (a !== 4 && (a === 27 && gt(l.type) && (t = l.stateNode, e = null), l = l.child, l !== null))
      for (xc(l, e, t), l = l.sibling; l !== null; )
        xc(l, e, t), l = l.sibling;
  }
  function hu(l, e, t) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, e ? t.insertBefore(l, e) : t.appendChild(l);
    else if (a !== 4 && (a === 27 && gt(l.type) && (t = l.stateNode), l = l.child, l !== null))
      for (hu(l, e, t), l = l.sibling; l !== null; )
        hu(l, e, t), l = l.sibling;
  }
  function kr(l) {
    var e = l.stateNode, t = l.memoizedProps;
    try {
      for (var a = l.type, n = e.attributes; n.length; )
        e.removeAttributeNode(n[0]);
      wl(e, a, t), e[Xl] = l, e[Il] = t;
    } catch (u) {
      hl(l, l.return, u);
    }
  }
  var we = !1, Ul = !1, jc = !1, $r = typeof WeakSet == "function" ? WeakSet : Set, Gl = null;
  function fm(l, e) {
    if (l = l.containerInfo, Zc = Ru, l = cf(l), yi(l)) {
      if ("selectionStart" in l)
        var t = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        l: {
          t = (t = l.ownerDocument) && t.defaultView || window;
          var a = t.getSelection && t.getSelection();
          if (a && a.rangeCount !== 0) {
            t = a.anchorNode;
            var n = a.anchorOffset, u = a.focusNode;
            a = a.focusOffset;
            try {
              t.nodeType, u.nodeType;
            } catch {
              t = null;
              break l;
            }
            var i = 0, s = -1, r = -1, g = 0, x = 0, N = l, b = null;
            e: for (; ; ) {
              for (var p; N !== t || n !== 0 && N.nodeType !== 3 || (s = i + n), N !== u || a !== 0 && N.nodeType !== 3 || (r = i + a), N.nodeType === 3 && (i += N.nodeValue.length), (p = N.firstChild) !== null; )
                b = N, N = p;
              for (; ; ) {
                if (N === l) break e;
                if (b === t && ++g === n && (s = i), b === u && ++x === a && (r = i), (p = N.nextSibling) !== null) break;
                N = b, b = N.parentNode;
              }
              N = p;
            }
            t = s === -1 || r === -1 ? null : { start: s, end: r };
          } else t = null;
        }
      t = t || { start: 0, end: 0 };
    } else t = null;
    for (Vc = { focusedElem: l, selectionRange: t }, Ru = !1, Gl = e; Gl !== null; )
      if (e = Gl, l = e.child, (e.subtreeFlags & 1028) !== 0 && l !== null)
        l.return = e, Gl = l;
      else
        for (; Gl !== null; ) {
          switch (e = Gl, u = e.alternate, l = e.flags, e.tag) {
            case 0:
              if ((l & 4) !== 0 && (l = e.updateQueue, l = l !== null ? l.events : null, l !== null))
                for (t = 0; t < l.length; t++)
                  n = l[t], n.ref.impl = n.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && u !== null) {
                l = void 0, t = e, n = u.memoizedProps, u = u.memoizedState, a = t.stateNode;
                try {
                  var B = Gt(
                    t.type,
                    n
                  );
                  l = a.getSnapshotBeforeUpdate(
                    B,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = l;
                } catch (L) {
                  hl(
                    t,
                    t.return,
                    L
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = e.stateNode.containerInfo, t = l.nodeType, t === 9)
                  Jc(l);
                else if (t === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Jc(l);
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
          if (l = e.sibling, l !== null) {
            l.return = e.return, Gl = l;
            break;
          }
          Gl = e.return;
        }
  }
  function Wr(l, e, t) {
    var a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Je(l, t), a & 4 && an(5, t);
        break;
      case 1:
        if (Je(l, t), a & 4)
          if (l = t.stateNode, e === null)
            try {
              l.componentDidMount();
            } catch (i) {
              hl(t, t.return, i);
            }
          else {
            var n = Gt(
              t.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              l.componentDidUpdate(
                n,
                e,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              hl(
                t,
                t.return,
                i
              );
            }
          }
        a & 64 && Vr(t), a & 512 && nn(t, t.return);
        break;
      case 3:
        if (Je(l, t), a & 64 && (l = t.updateQueue, l !== null)) {
          if (e = null, t.child !== null)
            switch (t.child.tag) {
              case 27:
              case 5:
                e = t.child.stateNode;
                break;
              case 1:
                e = t.child.stateNode;
            }
          try {
            Rf(l, e);
          } catch (i) {
            hl(t, t.return, i);
          }
        }
        break;
      case 27:
        e === null && a & 4 && kr(t);
      case 26:
      case 5:
        Je(l, t), e === null && a & 4 && Kr(t), a & 512 && nn(t, t.return);
        break;
      case 12:
        Je(l, t);
        break;
      case 31:
        Je(l, t), a & 4 && Pr(l, t);
        break;
      case 13:
        Je(l, t), a & 4 && lo(l, t), a & 64 && (l = t.memoizedState, l !== null && (l = l.dehydrated, l !== null && (t = bm.bind(
          null,
          t
        ), Ym(l, t))));
        break;
      case 22:
        if (a = t.memoizedState !== null || we, !a) {
          e = e !== null && e.memoizedState !== null || Ul, n = we;
          var u = Ul;
          we = a, (Ul = e) && !u ? ke(
            l,
            t,
            (t.subtreeFlags & 8772) !== 0
          ) : Je(l, t), we = n, Ul = u;
        }
        break;
      case 30:
        break;
      default:
        Je(l, t);
    }
  }
  function Fr(l) {
    var e = l.alternate;
    e !== null && (l.alternate = null, Fr(e)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (e = l.stateNode, e !== null && Iu(e)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var xl = null, le = !1;
  function Ke(l, e, t) {
    for (t = t.child; t !== null; )
      Ir(l, e, t), t = t.sibling;
  }
  function Ir(l, e, t) {
    if (ce && typeof ce.onCommitFiberUnmount == "function")
      try {
        ce.onCommitFiberUnmount(za, t);
      } catch {
      }
    switch (t.tag) {
      case 26:
        Ul || De(t, e), Ke(
          l,
          e,
          t
        ), t.memoizedState ? t.memoizedState.count-- : t.stateNode && (t = t.stateNode, t.parentNode.removeChild(t));
        break;
      case 27:
        Ul || De(t, e);
        var a = xl, n = le;
        gt(t.type) && (xl = t.stateNode, le = !1), Ke(
          l,
          e,
          t
        ), mn(t.stateNode), xl = a, le = n;
        break;
      case 5:
        Ul || De(t, e);
      case 6:
        if (a = xl, n = le, xl = null, Ke(
          l,
          e,
          t
        ), xl = a, le = n, xl !== null)
          if (le)
            try {
              (xl.nodeType === 9 ? xl.body : xl.nodeName === "HTML" ? xl.ownerDocument.body : xl).removeChild(t.stateNode);
            } catch (u) {
              hl(
                t,
                e,
                u
              );
            }
          else
            try {
              xl.removeChild(t.stateNode);
            } catch (u) {
              hl(
                t,
                e,
                u
              );
            }
        break;
      case 18:
        xl !== null && (le ? (l = xl, wo(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          t.stateNode
        ), Aa(l)) : wo(xl, t.stateNode));
        break;
      case 4:
        a = xl, n = le, xl = t.stateNode.containerInfo, le = !0, Ke(
          l,
          e,
          t
        ), xl = a, le = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        rt(2, t, e), Ul || rt(4, t, e), Ke(
          l,
          e,
          t
        );
        break;
      case 1:
        Ul || (De(t, e), a = t.stateNode, typeof a.componentWillUnmount == "function" && wr(
          t,
          e,
          a
        )), Ke(
          l,
          e,
          t
        );
        break;
      case 21:
        Ke(
          l,
          e,
          t
        );
        break;
      case 22:
        Ul = (a = Ul) || t.memoizedState !== null, Ke(
          l,
          e,
          t
        ), Ul = a;
        break;
      default:
        Ke(
          l,
          e,
          t
        );
    }
  }
  function Pr(l, e) {
    if (e.memoizedState === null && (l = e.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        Aa(l);
      } catch (t) {
        hl(e, e.return, t);
      }
    }
  }
  function lo(l, e) {
    if (e.memoizedState === null && (l = e.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        Aa(l);
      } catch (t) {
        hl(e, e.return, t);
      }
  }
  function rm(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var e = l.stateNode;
        return e === null && (e = l.stateNode = new $r()), e;
      case 22:
        return l = l.stateNode, e = l._retryCache, e === null && (e = l._retryCache = new $r()), e;
      default:
        throw Error(m(435, l.tag));
    }
  }
  function mu(l, e) {
    var t = rm(l);
    e.forEach(function(a) {
      if (!t.has(a)) {
        t.add(a);
        var n = pm.bind(null, l, a);
        a.then(n, n);
      }
    });
  }
  function ee(l, e) {
    var t = e.deletions;
    if (t !== null)
      for (var a = 0; a < t.length; a++) {
        var n = t[a], u = l, i = e, s = i;
        l: for (; s !== null; ) {
          switch (s.tag) {
            case 27:
              if (gt(s.type)) {
                xl = s.stateNode, le = !1;
                break l;
              }
              break;
            case 5:
              xl = s.stateNode, le = !1;
              break l;
            case 3:
            case 4:
              xl = s.stateNode.containerInfo, le = !0;
              break l;
          }
          s = s.return;
        }
        if (xl === null) throw Error(m(160));
        Ir(u, i, n), xl = null, le = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        eo(e, l), e = e.sibling;
  }
  var ze = null;
  function eo(l, e) {
    var t = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ee(e, l), te(l), a & 4 && (rt(3, l, l.return), an(3, l), rt(5, l, l.return));
        break;
      case 1:
        ee(e, l), te(l), a & 512 && (Ul || t === null || De(t, t.return)), a & 64 && we && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (t = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = t === null ? a : t.concat(a))));
        break;
      case 26:
        var n = ze;
        if (ee(e, l), te(l), a & 512 && (Ul || t === null || De(t, t.return)), a & 4) {
          var u = t !== null ? t.memoizedState : null;
          if (a = l.memoizedState, t === null)
            if (a === null)
              if (l.stateNode === null) {
                l: {
                  a = l.type, t = l.memoizedProps, n = n.ownerDocument || n;
                  e: switch (a) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[Ma] || u[Xl] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), wl(u, a, t), u[Xl] = l, Yl(u), a = u;
                      break l;
                    case "link":
                      var i = td(
                        "link",
                        "href",
                        n
                      ).get(a + (t.href || ""));
                      if (i) {
                        for (var s = 0; s < i.length; s++)
                          if (u = i[s], u.getAttribute("href") === (t.href == null || t.href === "" ? null : t.href) && u.getAttribute("rel") === (t.rel == null ? null : t.rel) && u.getAttribute("title") === (t.title == null ? null : t.title) && u.getAttribute("crossorigin") === (t.crossOrigin == null ? null : t.crossOrigin)) {
                            i.splice(s, 1);
                            break e;
                          }
                      }
                      u = n.createElement(a), wl(u, a, t), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (i = td(
                        "meta",
                        "content",
                        n
                      ).get(a + (t.content || ""))) {
                        for (s = 0; s < i.length; s++)
                          if (u = i[s], u.getAttribute("content") === (t.content == null ? null : "" + t.content) && u.getAttribute("name") === (t.name == null ? null : t.name) && u.getAttribute("property") === (t.property == null ? null : t.property) && u.getAttribute("http-equiv") === (t.httpEquiv == null ? null : t.httpEquiv) && u.getAttribute("charset") === (t.charSet == null ? null : t.charSet)) {
                            i.splice(s, 1);
                            break e;
                          }
                      }
                      u = n.createElement(a), wl(u, a, t), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(m(468, a));
                  }
                  u[Xl] = l, Yl(u), a = u;
                }
                l.stateNode = a;
              } else
                ad(
                  n,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = ed(
                n,
                a,
                l.memoizedProps
              );
          else
            u !== a ? (u === null ? t.stateNode !== null && (t = t.stateNode, t.parentNode.removeChild(t)) : u.count--, a === null ? ad(
              n,
              l.type,
              l.stateNode
            ) : ed(
              n,
              a,
              l.memoizedProps
            )) : a === null && l.stateNode !== null && pc(
              l,
              l.memoizedProps,
              t.memoizedProps
            );
        }
        break;
      case 27:
        ee(e, l), te(l), a & 512 && (Ul || t === null || De(t, t.return)), t !== null && a & 4 && pc(
          l,
          l.memoizedProps,
          t.memoizedProps
        );
        break;
      case 5:
        if (ee(e, l), te(l), a & 512 && (Ul || t === null || De(t, t.return)), l.flags & 32) {
          n = l.stateNode;
          try {
            $t(n, "");
          } catch (B) {
            hl(l, l.return, B);
          }
        }
        a & 4 && l.stateNode != null && (n = l.memoizedProps, pc(
          l,
          n,
          t !== null ? t.memoizedProps : n
        )), a & 1024 && (jc = !0);
        break;
      case 6:
        if (ee(e, l), te(l), a & 4) {
          if (l.stateNode === null)
            throw Error(m(162));
          a = l.memoizedProps, t = l.stateNode;
          try {
            t.nodeValue = a;
          } catch (B) {
            hl(l, l.return, B);
          }
        }
        break;
      case 3:
        if (Cu = null, n = ze, ze = zu(e.containerInfo), ee(e, l), ze = n, te(l), a & 4 && t !== null && t.memoizedState.isDehydrated)
          try {
            Aa(e.containerInfo);
          } catch (B) {
            hl(l, l.return, B);
          }
        jc && (jc = !1, to(l));
        break;
      case 4:
        a = ze, ze = zu(
          l.stateNode.containerInfo
        ), ee(e, l), te(l), ze = a;
        break;
      case 12:
        ee(e, l), te(l);
        break;
      case 31:
        ee(e, l), te(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, mu(l, a)));
        break;
      case 13:
        ee(e, l), te(l), l.child.flags & 8192 && l.memoizedState !== null != (t !== null && t.memoizedState !== null) && (vu = ie()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, mu(l, a)));
        break;
      case 22:
        n = l.memoizedState !== null;
        var r = t !== null && t.memoizedState !== null, g = we, x = Ul;
        if (we = g || n, Ul = x || r, ee(e, l), Ul = x, we = g, te(l), a & 8192)
          l: for (e = l.stateNode, e._visibility = n ? e._visibility & -2 : e._visibility | 1, n && (t === null || r || we || Ul || Qt(l)), t = null, e = l; ; ) {
            if (e.tag === 5 || e.tag === 26) {
              if (t === null) {
                r = t = e;
                try {
                  if (u = r.stateNode, n)
                    i = u.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    s = r.stateNode;
                    var N = r.memoizedProps.style, b = N != null && N.hasOwnProperty("display") ? N.display : null;
                    s.style.display = b == null || typeof b == "boolean" ? "" : ("" + b).trim();
                  }
                } catch (B) {
                  hl(r, r.return, B);
                }
              }
            } else if (e.tag === 6) {
              if (t === null) {
                r = e;
                try {
                  r.stateNode.nodeValue = n ? "" : r.memoizedProps;
                } catch (B) {
                  hl(r, r.return, B);
                }
              }
            } else if (e.tag === 18) {
              if (t === null) {
                r = e;
                try {
                  var p = r.stateNode;
                  n ? Ko(p, !0) : Ko(r.stateNode, !1);
                } catch (B) {
                  hl(r, r.return, B);
                }
              }
            } else if ((e.tag !== 22 && e.tag !== 23 || e.memoizedState === null || e === l) && e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === l) break l;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === l) break l;
              t === e && (t = null), e = e.return;
            }
            t === e && (t = null), e.sibling.return = e.return, e = e.sibling;
          }
        a & 4 && (a = l.updateQueue, a !== null && (t = a.retryQueue, t !== null && (a.retryQueue = null, mu(l, t))));
        break;
      case 19:
        ee(e, l), te(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, mu(l, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ee(e, l), te(l);
    }
  }
  function te(l) {
    var e = l.flags;
    if (e & 2) {
      try {
        for (var t, a = l.return; a !== null; ) {
          if (Jr(a)) {
            t = a;
            break;
          }
          a = a.return;
        }
        if (t == null) throw Error(m(160));
        switch (t.tag) {
          case 27:
            var n = t.stateNode, u = Sc(l);
            hu(l, u, n);
            break;
          case 5:
            var i = t.stateNode;
            t.flags & 32 && ($t(i, ""), t.flags &= -33);
            var s = Sc(l);
            hu(l, s, i);
            break;
          case 3:
          case 4:
            var r = t.stateNode.containerInfo, g = Sc(l);
            xc(
              l,
              g,
              r
            );
            break;
          default:
            throw Error(m(161));
        }
      } catch (x) {
        hl(l, l.return, x);
      }
      l.flags &= -3;
    }
    e & 4096 && (l.flags &= -4097);
  }
  function to(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var e = l;
        to(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), l = l.sibling;
      }
  }
  function Je(l, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        Wr(l, e.alternate, e), e = e.sibling;
  }
  function Qt(l) {
    for (l = l.child; l !== null; ) {
      var e = l;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          rt(4, e, e.return), Qt(e);
          break;
        case 1:
          De(e, e.return);
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && wr(
            e,
            e.return,
            t
          ), Qt(e);
          break;
        case 27:
          mn(e.stateNode);
        case 26:
        case 5:
          De(e, e.return), Qt(e);
          break;
        case 22:
          e.memoizedState === null && Qt(e);
          break;
        case 30:
          Qt(e);
          break;
        default:
          Qt(e);
      }
      l = l.sibling;
    }
  }
  function ke(l, e, t) {
    for (t = t && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var a = e.alternate, n = l, u = e, i = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          ke(
            n,
            u,
            t
          ), an(4, u);
          break;
        case 1:
          if (ke(
            n,
            u,
            t
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (g) {
              hl(a, a.return, g);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var s = a.stateNode;
            try {
              var r = n.shared.hiddenCallbacks;
              if (r !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < r.length; n++)
                  Uf(r[n], s);
            } catch (g) {
              hl(a, a.return, g);
            }
          }
          t && i & 64 && Vr(u), nn(u, u.return);
          break;
        case 27:
          kr(u);
        case 26:
        case 5:
          ke(
            n,
            u,
            t
          ), t && a === null && i & 4 && Kr(u), nn(u, u.return);
          break;
        case 12:
          ke(
            n,
            u,
            t
          );
          break;
        case 31:
          ke(
            n,
            u,
            t
          ), t && i & 4 && Pr(n, u);
          break;
        case 13:
          ke(
            n,
            u,
            t
          ), t && i & 4 && lo(n, u);
          break;
        case 22:
          u.memoizedState === null && ke(
            n,
            u,
            t
          ), nn(u, u.return);
          break;
        case 30:
          break;
        default:
          ke(
            n,
            u,
            t
          );
      }
      e = e.sibling;
    }
  }
  function Ec(l, e) {
    var t = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), l = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), l !== t && (l != null && l.refCount++, t != null && Va(t));
  }
  function Nc(l, e) {
    l = null, e.alternate !== null && (l = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== l && (e.refCount++, l != null && Va(l));
  }
  function Oe(l, e, t, a) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        ao(
          l,
          e,
          t,
          a
        ), e = e.sibling;
  }
  function ao(l, e, t, a) {
    var n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Oe(
          l,
          e,
          t,
          a
        ), n & 2048 && an(9, e);
        break;
      case 1:
        Oe(
          l,
          e,
          t,
          a
        );
        break;
      case 3:
        Oe(
          l,
          e,
          t,
          a
        ), n & 2048 && (l = null, e.alternate !== null && (l = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== l && (e.refCount++, l != null && Va(l)));
        break;
      case 12:
        if (n & 2048) {
          Oe(
            l,
            e,
            t,
            a
          ), l = e.stateNode;
          try {
            var u = e.memoizedProps, i = u.id, s = u.onPostCommit;
            typeof s == "function" && s(
              i,
              e.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (r) {
            hl(e, e.return, r);
          }
        } else
          Oe(
            l,
            e,
            t,
            a
          );
        break;
      case 31:
        Oe(
          l,
          e,
          t,
          a
        );
        break;
      case 13:
        Oe(
          l,
          e,
          t,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = e.stateNode, i = e.alternate, e.memoizedState !== null ? u._visibility & 2 ? Oe(
          l,
          e,
          t,
          a
        ) : un(l, e) : u._visibility & 2 ? Oe(
          l,
          e,
          t,
          a
        ) : (u._visibility |= 2, ya(
          l,
          e,
          t,
          a,
          (e.subtreeFlags & 10256) !== 0 || !1
        )), n & 2048 && Ec(i, e);
        break;
      case 24:
        Oe(
          l,
          e,
          t,
          a
        ), n & 2048 && Nc(e.alternate, e);
        break;
      default:
        Oe(
          l,
          e,
          t,
          a
        );
    }
  }
  function ya(l, e, t, a, n) {
    for (n = n && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = l, i = e, s = t, r = a, g = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          ya(
            u,
            i,
            s,
            r,
            n
          ), an(8, i);
          break;
        case 23:
          break;
        case 22:
          var x = i.stateNode;
          i.memoizedState !== null ? x._visibility & 2 ? ya(
            u,
            i,
            s,
            r,
            n
          ) : un(
            u,
            i
          ) : (x._visibility |= 2, ya(
            u,
            i,
            s,
            r,
            n
          )), n && g & 2048 && Ec(
            i.alternate,
            i
          );
          break;
        case 24:
          ya(
            u,
            i,
            s,
            r,
            n
          ), n && g & 2048 && Nc(i.alternate, i);
          break;
        default:
          ya(
            u,
            i,
            s,
            r,
            n
          );
      }
      e = e.sibling;
    }
  }
  function un(l, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var t = l, a = e, n = a.flags;
        switch (a.tag) {
          case 22:
            un(t, a), n & 2048 && Ec(
              a.alternate,
              a
            );
            break;
          case 24:
            un(t, a), n & 2048 && Nc(a.alternate, a);
            break;
          default:
            un(t, a);
        }
        e = e.sibling;
      }
  }
  var cn = 8192;
  function va(l, e, t) {
    if (l.subtreeFlags & cn)
      for (l = l.child; l !== null; )
        no(
          l,
          e,
          t
        ), l = l.sibling;
  }
  function no(l, e, t) {
    switch (l.tag) {
      case 26:
        va(
          l,
          e,
          t
        ), l.flags & cn && l.memoizedState !== null && Wm(
          t,
          ze,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        va(
          l,
          e,
          t
        );
        break;
      case 3:
      case 4:
        var a = ze;
        ze = zu(l.stateNode.containerInfo), va(
          l,
          e,
          t
        ), ze = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = cn, cn = 16777216, va(
          l,
          e,
          t
        ), cn = a) : va(
          l,
          e,
          t
        ));
        break;
      default:
        va(
          l,
          e,
          t
        );
    }
  }
  function uo(l) {
    var e = l.alternate;
    if (e !== null && (l = e.child, l !== null)) {
      e.child = null;
      do
        e = l.sibling, l.sibling = null, l = e;
      while (l !== null);
    }
  }
  function sn(l) {
    var e = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (e !== null)
        for (var t = 0; t < e.length; t++) {
          var a = e[t];
          Gl = a, co(
            a,
            l
          );
        }
      uo(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        io(l), l = l.sibling;
  }
  function io(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        sn(l), l.flags & 2048 && rt(9, l, l.return);
        break;
      case 3:
        sn(l);
        break;
      case 12:
        sn(l);
        break;
      case 22:
        var e = l.stateNode;
        l.memoizedState !== null && e._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (e._visibility &= -3, yu(l)) : sn(l);
        break;
      default:
        sn(l);
    }
  }
  function yu(l) {
    var e = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (e !== null)
        for (var t = 0; t < e.length; t++) {
          var a = e[t];
          Gl = a, co(
            a,
            l
          );
        }
      uo(l);
    }
    for (l = l.child; l !== null; ) {
      switch (e = l, e.tag) {
        case 0:
        case 11:
        case 15:
          rt(8, e, e.return), yu(e);
          break;
        case 22:
          t = e.stateNode, t._visibility & 2 && (t._visibility &= -3, yu(e));
          break;
        default:
          yu(e);
      }
      l = l.sibling;
    }
  }
  function co(l, e) {
    for (; Gl !== null; ) {
      var t = Gl;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          rt(8, t, e);
          break;
        case 23:
        case 22:
          if (t.memoizedState !== null && t.memoizedState.cachePool !== null) {
            var a = t.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Va(t.memoizedState.cache);
      }
      if (a = t.child, a !== null) a.return = t, Gl = a;
      else
        l: for (t = l; Gl !== null; ) {
          a = Gl;
          var n = a.sibling, u = a.return;
          if (Fr(a), a === t) {
            Gl = null;
            break l;
          }
          if (n !== null) {
            n.return = u, Gl = n;
            break l;
          }
          Gl = u;
        }
    }
  }
  var om = {
    getCacheForType: function(l) {
      var e = Zl(Cl), t = e.data.get(l);
      return t === void 0 && (t = l(), e.data.set(l, t)), t;
    },
    cacheSignal: function() {
      return Zl(Cl).controller.signal;
    }
  }, dm = typeof WeakMap == "function" ? WeakMap : Map, rl = 0, bl = null, ll = null, tl = 0, dl = 0, he = null, ot = !1, ga = !1, Tc = !1, $e = 0, Tl = 0, dt = 0, Xt = 0, Ac = 0, me = 0, ba = 0, fn = null, ae = null, _c = !1, vu = 0, so = 0, gu = 1 / 0, bu = null, ht = null, Hl = 0, mt = null, pa = null, We = 0, zc = 0, Oc = null, fo = null, rn = 0, Cc = null;
  function ye() {
    return (rl & 2) !== 0 && tl !== 0 ? tl & -tl : d.T !== null ? qc() : Ns();
  }
  function ro() {
    if (me === 0)
      if ((tl & 536870912) === 0 || nl) {
        var l = An;
        An <<= 1, (An & 3932160) === 0 && (An = 262144), me = l;
      } else me = 536870912;
    return l = oe.current, l !== null && (l.flags |= 32), me;
  }
  function ne(l, e, t) {
    (l === bl && (dl === 2 || dl === 9) || l.cancelPendingCommit !== null) && (Sa(l, 0), yt(
      l,
      tl,
      me,
      !1
    )), Ca(l, t), ((rl & 2) === 0 || l !== bl) && (l === bl && ((rl & 2) === 0 && (Xt |= t), Tl === 4 && yt(
      l,
      tl,
      me,
      !1
    )), Ue(l));
  }
  function oo(l, e, t) {
    if ((rl & 6) !== 0) throw Error(m(327));
    var a = !t && (e & 127) === 0 && (e & l.expiredLanes) === 0 || Oa(l, e), n = a ? ym(l, e) : Dc(l, e, !0), u = a;
    do {
      if (n === 0) {
        ga && !a && yt(l, e, 0, !1);
        break;
      } else {
        if (t = l.current.alternate, u && !hm(t)) {
          n = Dc(l, e, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = e, l.errorRecoveryDisabledLanes & u)
            var i = 0;
          else
            i = l.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            e = i;
            l: {
              var s = l;
              n = fn;
              var r = s.current.memoizedState.isDehydrated;
              if (r && (Sa(s, i).flags |= 256), i = Dc(
                s,
                i,
                !1
              ), i !== 2) {
                if (Tc && !r) {
                  s.errorRecoveryDisabledLanes |= u, Xt |= u, n = 4;
                  break l;
                }
                u = ae, ae = n, u !== null && (ae === null ? ae = u : ae.push.apply(
                  ae,
                  u
                ));
              }
              n = i;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Sa(l, 0), yt(l, e, 0, !0);
          break;
        }
        l: {
          switch (a = l, u = n, u) {
            case 0:
            case 1:
              throw Error(m(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              yt(
                a,
                e,
                me,
                !ot
              );
              break l;
            case 2:
              ae = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(m(329));
          }
          if ((e & 62914560) === e && (n = vu + 300 - ie(), 10 < n)) {
            if (yt(
              a,
              e,
              me,
              !ot
            ), zn(a, 0, !0) !== 0) break l;
            We = e, a.timeoutHandle = Zo(
              ho.bind(
                null,
                a,
                t,
                ae,
                bu,
                _c,
                e,
                me,
                Xt,
                ba,
                ot,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break l;
          }
          ho(
            a,
            t,
            ae,
            bu,
            _c,
            e,
            me,
            Xt,
            ba,
            ot,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Ue(l);
  }
  function ho(l, e, t, a, n, u, i, s, r, g, x, N, b, p) {
    if (l.timeoutHandle = -1, N = e.subtreeFlags, N & 8192 || (N & 16785408) === 16785408) {
      N = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: He
      }, no(
        e,
        u,
        N
      );
      var B = (u & 62914560) === u ? vu - ie() : (u & 4194048) === u ? so - ie() : 0;
      if (B = Fm(
        N,
        B
      ), B !== null) {
        We = u, l.cancelPendingCommit = B(
          xo.bind(
            null,
            l,
            e,
            u,
            t,
            a,
            n,
            i,
            s,
            r,
            x,
            N,
            null,
            b,
            p
          )
        ), yt(l, u, i, !g);
        return;
      }
    }
    xo(
      l,
      e,
      u,
      t,
      a,
      n,
      i,
      s,
      r
    );
  }
  function hm(l) {
    for (var e = l; ; ) {
      var t = e.tag;
      if ((t === 0 || t === 11 || t === 15) && e.flags & 16384 && (t = e.updateQueue, t !== null && (t = t.stores, t !== null)))
        for (var a = 0; a < t.length; a++) {
          var n = t[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!fe(u(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (t = e.child, e.subtreeFlags & 16384 && t !== null)
        t.return = e, e = t;
      else {
        if (e === l) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === l) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function yt(l, e, t, a) {
    e &= ~Ac, e &= ~Xt, l.suspendedLanes |= e, l.pingedLanes &= ~e, a && (l.warmLanes |= e), a = l.expirationTimes;
    for (var n = e; 0 < n; ) {
      var u = 31 - se(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    t !== 0 && xs(l, t, e);
  }
  function pu() {
    return (rl & 6) === 0 ? (on(0), !1) : !0;
  }
  function Mc() {
    if (ll !== null) {
      if (dl === 0)
        var l = ll.return;
      else
        l = ll, Ge = Dt = null, Ji(l), ra = null, Ka = 0, l = ll;
      for (; l !== null; )
        Zr(l.alternate, l), l = l.return;
      ll = null;
    }
  }
  function Sa(l, e) {
    var t = l.timeoutHandle;
    t !== -1 && (l.timeoutHandle = -1, Um(t)), t = l.cancelPendingCommit, t !== null && (l.cancelPendingCommit = null, t()), We = 0, Mc(), bl = l, ll = t = Be(l.current, null), tl = e, dl = 0, he = null, ot = !1, ga = Oa(l, e), Tc = !1, ba = me = Ac = Xt = dt = Tl = 0, ae = fn = null, _c = !1, (e & 8) !== 0 && (e |= e & 32);
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= e; 0 < a; ) {
        var n = 31 - se(a), u = 1 << n;
        e |= l[n], a &= ~u;
      }
    return $e = e, Qn(), t;
  }
  function mo(l, e) {
    k = null, d.H = ln, e === fa || e === kn ? (e = Of(), dl = 3) : e === Hi ? (e = Of(), dl = 4) : dl = e === fc ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, he = e, ll === null && (Tl = 1, su(
      l,
      Se(e, l.current)
    ));
  }
  function yo() {
    var l = oe.current;
    return l === null ? !0 : (tl & 4194048) === tl ? Ne === null : (tl & 62914560) === tl || (tl & 536870912) !== 0 ? l === Ne : !1;
  }
  function vo() {
    var l = d.H;
    return d.H = ln, l === null ? ln : l;
  }
  function go() {
    var l = d.A;
    return d.A = om, l;
  }
  function Su() {
    Tl = 4, ot || (tl & 4194048) !== tl && oe.current !== null || (ga = !0), (dt & 134217727) === 0 && (Xt & 134217727) === 0 || bl === null || yt(
      bl,
      tl,
      me,
      !1
    );
  }
  function Dc(l, e, t) {
    var a = rl;
    rl |= 2;
    var n = vo(), u = go();
    (bl !== l || tl !== e) && (bu = null, Sa(l, e)), e = !1;
    var i = Tl;
    l: do
      try {
        if (dl !== 0 && ll !== null) {
          var s = ll, r = he;
          switch (dl) {
            case 8:
              Mc(), i = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              oe.current === null && (e = !0);
              var g = dl;
              if (dl = 0, he = null, xa(l, s, r, g), t && ga) {
                i = 0;
                break l;
              }
              break;
            default:
              g = dl, dl = 0, he = null, xa(l, s, r, g);
          }
        }
        mm(), i = Tl;
        break;
      } catch (x) {
        mo(l, x);
      }
    while (!0);
    return e && l.shellSuspendCounter++, Ge = Dt = null, rl = a, d.H = n, d.A = u, ll === null && (bl = null, tl = 0, Qn()), i;
  }
  function mm() {
    for (; ll !== null; ) bo(ll);
  }
  function ym(l, e) {
    var t = rl;
    rl |= 2;
    var a = vo(), n = go();
    bl !== l || tl !== e ? (bu = null, gu = ie() + 500, Sa(l, e)) : ga = Oa(
      l,
      e
    );
    l: do
      try {
        if (dl !== 0 && ll !== null) {
          e = ll;
          var u = he;
          e: switch (dl) {
            case 1:
              dl = 0, he = null, xa(l, e, u, 1);
              break;
            case 2:
            case 9:
              if (_f(u)) {
                dl = 0, he = null, po(e);
                break;
              }
              e = function() {
                dl !== 2 && dl !== 9 || bl !== l || (dl = 7), Ue(l);
              }, u.then(e, e);
              break l;
            case 3:
              dl = 7;
              break l;
            case 4:
              dl = 5;
              break l;
            case 7:
              _f(u) ? (dl = 0, he = null, po(e)) : (dl = 0, he = null, xa(l, e, u, 7));
              break;
            case 5:
              var i = null;
              switch (ll.tag) {
                case 26:
                  i = ll.memoizedState;
                case 5:
                case 27:
                  var s = ll;
                  if (i ? nd(i) : s.stateNode.complete) {
                    dl = 0, he = null;
                    var r = s.sibling;
                    if (r !== null) ll = r;
                    else {
                      var g = s.return;
                      g !== null ? (ll = g, xu(g)) : ll = null;
                    }
                    break e;
                  }
              }
              dl = 0, he = null, xa(l, e, u, 5);
              break;
            case 6:
              dl = 0, he = null, xa(l, e, u, 6);
              break;
            case 8:
              Mc(), Tl = 6;
              break l;
            default:
              throw Error(m(462));
          }
        }
        vm();
        break;
      } catch (x) {
        mo(l, x);
      }
    while (!0);
    return Ge = Dt = null, d.H = a, d.A = n, rl = t, ll !== null ? 0 : (bl = null, tl = 0, Qn(), Tl);
  }
  function vm() {
    for (; ll !== null && !Gd(); )
      bo(ll);
  }
  function bo(l) {
    var e = Xr(l.alternate, l, $e);
    l.memoizedProps = l.pendingProps, e === null ? xu(l) : ll = e;
  }
  function po(l) {
    var e = l, t = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Hr(
          t,
          e,
          e.pendingProps,
          e.type,
          void 0,
          tl
        );
        break;
      case 11:
        e = Hr(
          t,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          tl
        );
        break;
      case 5:
        Ji(e);
      default:
        Zr(t, e), e = ll = vf(e, $e), e = Xr(t, e, $e);
    }
    l.memoizedProps = l.pendingProps, e === null ? xu(l) : ll = e;
  }
  function xa(l, e, t, a) {
    Ge = Dt = null, Ji(e), ra = null, Ka = 0;
    var n = e.return;
    try {
      if (nm(
        l,
        n,
        e,
        t,
        tl
      )) {
        Tl = 1, su(
          l,
          Se(t, l.current)
        ), ll = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw ll = n, u;
      Tl = 1, su(
        l,
        Se(t, l.current)
      ), ll = null;
      return;
    }
    e.flags & 32768 ? (nl || a === 1 ? l = !0 : ga || (tl & 536870912) !== 0 ? l = !1 : (ot = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = oe.current, a !== null && a.tag === 13 && (a.flags |= 16384))), So(e, l)) : xu(e);
  }
  function xu(l) {
    var e = l;
    do {
      if ((e.flags & 32768) !== 0) {
        So(
          e,
          ot
        );
        return;
      }
      l = e.return;
      var t = cm(
        e.alternate,
        e,
        $e
      );
      if (t !== null) {
        ll = t;
        return;
      }
      if (e = e.sibling, e !== null) {
        ll = e;
        return;
      }
      ll = e = l;
    } while (e !== null);
    Tl === 0 && (Tl = 5);
  }
  function So(l, e) {
    do {
      var t = sm(l.alternate, l);
      if (t !== null) {
        t.flags &= 32767, ll = t;
        return;
      }
      if (t = l.return, t !== null && (t.flags |= 32768, t.subtreeFlags = 0, t.deletions = null), !e && (l = l.sibling, l !== null)) {
        ll = l;
        return;
      }
      ll = l = t;
    } while (l !== null);
    Tl = 6, ll = null;
  }
  function xo(l, e, t, a, n, u, i, s, r) {
    l.cancelPendingCommit = null;
    do
      ju();
    while (Hl !== 0);
    if ((rl & 6) !== 0) throw Error(m(327));
    if (e !== null) {
      if (e === l.current) throw Error(m(177));
      if (u = e.lanes | e.childLanes, u |= Si, $d(
        l,
        t,
        u,
        i,
        s,
        r
      ), l === bl && (ll = bl = null, tl = 0), pa = e, mt = l, We = t, zc = u, Oc = n, fo = a, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, Sm(Nn, function() {
        return Ao(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || a) {
        a = d.T, d.T = null, n = T.p, T.p = 2, i = rl, rl |= 4;
        try {
          fm(l, e, t);
        } finally {
          rl = i, T.p = n, d.T = a;
        }
      }
      Hl = 1, jo(), Eo(), No();
    }
  }
  function jo() {
    if (Hl === 1) {
      Hl = 0;
      var l = mt, e = pa, t = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || t) {
        t = d.T, d.T = null;
        var a = T.p;
        T.p = 2;
        var n = rl;
        rl |= 4;
        try {
          eo(e, l);
          var u = Vc, i = cf(l.containerInfo), s = u.focusedElem, r = u.selectionRange;
          if (i !== s && s && s.ownerDocument && uf(
            s.ownerDocument.documentElement,
            s
          )) {
            if (r !== null && yi(s)) {
              var g = r.start, x = r.end;
              if (x === void 0 && (x = g), "selectionStart" in s)
                s.selectionStart = g, s.selectionEnd = Math.min(
                  x,
                  s.value.length
                );
              else {
                var N = s.ownerDocument || document, b = N && N.defaultView || window;
                if (b.getSelection) {
                  var p = b.getSelection(), B = s.textContent.length, L = Math.min(r.start, B), vl = r.end === void 0 ? L : Math.min(r.end, B);
                  !p.extend && L > vl && (i = vl, vl = L, L = i);
                  var h = nf(
                    s,
                    L
                  ), o = nf(
                    s,
                    vl
                  );
                  if (h && o && (p.rangeCount !== 1 || p.anchorNode !== h.node || p.anchorOffset !== h.offset || p.focusNode !== o.node || p.focusOffset !== o.offset)) {
                    var y = N.createRange();
                    y.setStart(h.node, h.offset), p.removeAllRanges(), L > vl ? (p.addRange(y), p.extend(o.node, o.offset)) : (y.setEnd(o.node, o.offset), p.addRange(y));
                  }
                }
              }
            }
            for (N = [], p = s; p = p.parentNode; )
              p.nodeType === 1 && N.push({
                element: p,
                left: p.scrollLeft,
                top: p.scrollTop
              });
            for (typeof s.focus == "function" && s.focus(), s = 0; s < N.length; s++) {
              var E = N[s];
              E.element.scrollLeft = E.left, E.element.scrollTop = E.top;
            }
          }
          Ru = !!Zc, Vc = Zc = null;
        } finally {
          rl = n, T.p = a, d.T = t;
        }
      }
      l.current = e, Hl = 2;
    }
  }
  function Eo() {
    if (Hl === 2) {
      Hl = 0;
      var l = mt, e = pa, t = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || t) {
        t = d.T, d.T = null;
        var a = T.p;
        T.p = 2;
        var n = rl;
        rl |= 4;
        try {
          Wr(l, e.alternate, e);
        } finally {
          rl = n, T.p = a, d.T = t;
        }
      }
      Hl = 3;
    }
  }
  function No() {
    if (Hl === 4 || Hl === 3) {
      Hl = 0, Qd();
      var l = mt, e = pa, t = We, a = fo;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? Hl = 5 : (Hl = 0, pa = mt = null, To(l, l.pendingLanes));
      var n = l.pendingLanes;
      if (n === 0 && (ht = null), Wu(t), e = e.stateNode, ce && typeof ce.onCommitFiberRoot == "function")
        try {
          ce.onCommitFiberRoot(
            za,
            e,
            void 0,
            (e.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        e = d.T, n = T.p, T.p = 2, d.T = null;
        try {
          for (var u = l.onRecoverableError, i = 0; i < a.length; i++) {
            var s = a[i];
            u(s.value, {
              componentStack: s.stack
            });
          }
        } finally {
          d.T = e, T.p = n;
        }
      }
      (We & 3) !== 0 && ju(), Ue(l), n = l.pendingLanes, (t & 261930) !== 0 && (n & 42) !== 0 ? l === Cc ? rn++ : (rn = 0, Cc = l) : rn = 0, on(0);
    }
  }
  function To(l, e) {
    (l.pooledCacheLanes &= e) === 0 && (e = l.pooledCache, e != null && (l.pooledCache = null, Va(e)));
  }
  function ju() {
    return jo(), Eo(), No(), Ao();
  }
  function Ao() {
    if (Hl !== 5) return !1;
    var l = mt, e = zc;
    zc = 0;
    var t = Wu(We), a = d.T, n = T.p;
    try {
      T.p = 32 > t ? 32 : t, d.T = null, t = Oc, Oc = null;
      var u = mt, i = We;
      if (Hl = 0, pa = mt = null, We = 0, (rl & 6) !== 0) throw Error(m(331));
      var s = rl;
      if (rl |= 4, io(u.current), ao(
        u,
        u.current,
        i,
        t
      ), rl = s, on(0, !1), ce && typeof ce.onPostCommitFiberRoot == "function")
        try {
          ce.onPostCommitFiberRoot(za, u);
        } catch {
        }
      return !0;
    } finally {
      T.p = n, d.T = a, To(l, e);
    }
  }
  function _o(l, e, t) {
    e = Se(t, e), e = sc(l.stateNode, e, 2), l = ct(l, e, 2), l !== null && (Ca(l, 2), Ue(l));
  }
  function hl(l, e, t) {
    if (l.tag === 3)
      _o(l, l, t);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          _o(
            e,
            l,
            t
          );
          break;
        } else if (e.tag === 1) {
          var a = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (ht === null || !ht.has(a))) {
            l = Se(t, l), t = _r(2), a = ct(e, t, 2), a !== null && (zr(
              t,
              a,
              e,
              l
            ), Ca(a, 2), Ue(a));
            break;
          }
        }
        e = e.return;
      }
  }
  function Uc(l, e, t) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new dm();
      var n = /* @__PURE__ */ new Set();
      a.set(e, n);
    } else
      n = a.get(e), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(e, n));
    n.has(t) || (Tc = !0, n.add(t), l = gm.bind(null, l, e, t), e.then(l, l));
  }
  function gm(l, e, t) {
    var a = l.pingCache;
    a !== null && a.delete(e), l.pingedLanes |= l.suspendedLanes & t, l.warmLanes &= ~t, bl === l && (tl & t) === t && (Tl === 4 || Tl === 3 && (tl & 62914560) === tl && 300 > ie() - vu ? (rl & 2) === 0 && Sa(l, 0) : Ac |= t, ba === tl && (ba = 0)), Ue(l);
  }
  function zo(l, e) {
    e === 0 && (e = Ss()), l = Ot(l, e), l !== null && (Ca(l, e), Ue(l));
  }
  function bm(l) {
    var e = l.memoizedState, t = 0;
    e !== null && (t = e.retryLane), zo(l, t);
  }
  function pm(l, e) {
    var t = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var a = l.stateNode, n = l.memoizedState;
        n !== null && (t = n.retryLane);
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
    a !== null && a.delete(e), zo(l, t);
  }
  function Sm(l, e) {
    return Ku(l, e);
  }
  var Eu = null, ja = null, Rc = !1, Nu = !1, Hc = !1, vt = 0;
  function Ue(l) {
    l !== ja && l.next === null && (ja === null ? Eu = ja = l : ja = ja.next = l), Nu = !0, Rc || (Rc = !0, jm());
  }
  function on(l, e) {
    if (!Hc && Nu) {
      Hc = !0;
      do
        for (var t = !1, a = Eu; a !== null; ) {
          if (l !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, s = a.pingedLanes;
              u = (1 << 31 - se(42 | l) + 1) - 1, u &= n & ~(i & ~s), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (t = !0, Do(a, u));
          } else
            u = tl, u = zn(
              a,
              a === bl ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Oa(a, u) || (t = !0, Do(a, u));
          a = a.next;
        }
      while (t);
      Hc = !1;
    }
  }
  function xm() {
    Oo();
  }
  function Oo() {
    Nu = Rc = !1;
    var l = 0;
    vt !== 0 && Dm() && (l = vt);
    for (var e = ie(), t = null, a = Eu; a !== null; ) {
      var n = a.next, u = Co(a, e);
      u === 0 ? (a.next = null, t === null ? Eu = n : t.next = n, n === null && (ja = t)) : (t = a, (l !== 0 || (u & 3) !== 0) && (Nu = !0)), a = n;
    }
    Hl !== 0 && Hl !== 5 || on(l), vt !== 0 && (vt = 0);
  }
  function Co(l, e) {
    for (var t = l.suspendedLanes, a = l.pingedLanes, n = l.expirationTimes, u = l.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - se(u), s = 1 << i, r = n[i];
      r === -1 ? ((s & t) === 0 || (s & a) !== 0) && (n[i] = kd(s, e)) : r <= e && (l.expiredLanes |= s), u &= ~s;
    }
    if (e = bl, t = tl, t = zn(
      l,
      l === e ? t : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a = l.callbackNode, t === 0 || l === e && (dl === 2 || dl === 9) || l.cancelPendingCommit !== null)
      return a !== null && a !== null && Ju(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((t & 3) === 0 || Oa(l, t)) {
      if (e = t & -t, e === l.callbackPriority) return e;
      switch (a !== null && Ju(a), Wu(t)) {
        case 2:
        case 8:
          t = bs;
          break;
        case 32:
          t = Nn;
          break;
        case 268435456:
          t = ps;
          break;
        default:
          t = Nn;
      }
      return a = Mo.bind(null, l), t = Ku(t, a), l.callbackPriority = e, l.callbackNode = t, e;
    }
    return a !== null && a !== null && Ju(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Mo(l, e) {
    if (Hl !== 0 && Hl !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var t = l.callbackNode;
    if (ju() && l.callbackNode !== t)
      return null;
    var a = tl;
    return a = zn(
      l,
      l === bl ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a === 0 ? null : (oo(l, a, e), Co(l, ie()), l.callbackNode != null && l.callbackNode === t ? Mo.bind(null, l) : null);
  }
  function Do(l, e) {
    if (ju()) return null;
    oo(l, e, !0);
  }
  function jm() {
    Rm(function() {
      (rl & 6) !== 0 ? Ku(
        gs,
        xm
      ) : Oo();
    });
  }
  function qc() {
    if (vt === 0) {
      var l = ca;
      l === 0 && (l = Tn, Tn <<= 1, (Tn & 261888) === 0 && (Tn = 256)), vt = l;
    }
    return vt;
  }
  function Uo(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Dn("" + l);
  }
  function Ro(l, e) {
    var t = e.ownerDocument.createElement("input");
    return t.name = e.name, t.value = e.value, l.id && t.setAttribute("form", l.id), e.parentNode.insertBefore(t, e), l = new FormData(l), t.parentNode.removeChild(t), l;
  }
  function Em(l, e, t, a, n) {
    if (e === "submit" && t && t.stateNode === n) {
      var u = Uo(
        (n[Il] || null).action
      ), i = a.submitter;
      i && (e = (e = i[Il] || null) ? Uo(e.formAction) : i.getAttribute("formAction"), e !== null && (u = e, i = null));
      var s = new qn(
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
                if (vt !== 0) {
                  var r = i ? Ro(n, i) : new FormData(n);
                  tc(
                    t,
                    {
                      pending: !0,
                      data: r,
                      method: n.method,
                      action: u
                    },
                    null,
                    r
                  );
                }
              } else
                typeof u == "function" && (s.preventDefault(), r = i ? Ro(n, i) : new FormData(n), tc(
                  t,
                  {
                    pending: !0,
                    data: r,
                    method: n.method,
                    action: u
                  },
                  u,
                  r
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var Bc = 0; Bc < pi.length; Bc++) {
    var Yc = pi[Bc], Nm = Yc.toLowerCase(), Tm = Yc[0].toUpperCase() + Yc.slice(1);
    _e(
      Nm,
      "on" + Tm
    );
  }
  _e(rf, "onAnimationEnd"), _e(of, "onAnimationIteration"), _e(df, "onAnimationStart"), _e("dblclick", "onDoubleClick"), _e("focusin", "onFocus"), _e("focusout", "onBlur"), _e(Xh, "onTransitionRun"), _e(Lh, "onTransitionStart"), _e(Zh, "onTransitionCancel"), _e(hf, "onTransitionEnd"), Jt("onMouseEnter", ["mouseout", "mouseover"]), Jt("onMouseLeave", ["mouseout", "mouseover"]), Jt("onPointerEnter", ["pointerout", "pointerover"]), Jt("onPointerLeave", ["pointerout", "pointerover"]), Tt(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Tt(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Tt("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Tt(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Tt(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Tt(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var dn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Am = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(dn)
  );
  function Ho(l, e) {
    e = (e & 4) !== 0;
    for (var t = 0; t < l.length; t++) {
      var a = l[t], n = a.event;
      a = a.listeners;
      l: {
        var u = void 0;
        if (e)
          for (var i = a.length - 1; 0 <= i; i--) {
            var s = a[i], r = s.instance, g = s.currentTarget;
            if (s = s.listener, r !== u && n.isPropagationStopped())
              break l;
            u = s, n.currentTarget = g;
            try {
              u(n);
            } catch (x) {
              Gn(x);
            }
            n.currentTarget = null, u = r;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (s = a[i], r = s.instance, g = s.currentTarget, s = s.listener, r !== u && n.isPropagationStopped())
              break l;
            u = s, n.currentTarget = g;
            try {
              u(n);
            } catch (x) {
              Gn(x);
            }
            n.currentTarget = null, u = r;
          }
      }
    }
  }
  function el(l, e) {
    var t = e[Fu];
    t === void 0 && (t = e[Fu] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    t.has(a) || (qo(e, l, 2, !1), t.add(a));
  }
  function Gc(l, e, t) {
    var a = 0;
    e && (a |= 4), qo(
      t,
      l,
      a,
      e
    );
  }
  var Tu = "_reactListening" + Math.random().toString(36).slice(2);
  function Qc(l) {
    if (!l[Tu]) {
      l[Tu] = !0, _s.forEach(function(t) {
        t !== "selectionchange" && (Am.has(t) || Gc(t, !1, l), Gc(t, !0, l));
      });
      var e = l.nodeType === 9 ? l : l.ownerDocument;
      e === null || e[Tu] || (e[Tu] = !0, Gc("selectionchange", !1, e));
    }
  }
  function qo(l, e, t, a) {
    switch (od(e)) {
      case 2:
        var n = ly;
        break;
      case 8:
        n = ey;
        break;
      default:
        n = es;
    }
    t = n.bind(
      null,
      e,
      t,
      l
    ), n = void 0, !ii || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (n = !0), a ? n !== void 0 ? l.addEventListener(e, t, {
      capture: !0,
      passive: n
    }) : l.addEventListener(e, t, !0) : n !== void 0 ? l.addEventListener(e, t, {
      passive: n
    }) : l.addEventListener(e, t, !1);
  }
  function Xc(l, e, t, a, n) {
    var u = a;
    if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
      l: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var s = a.stateNode.containerInfo;
          if (s === n) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var r = i.tag;
              if ((r === 3 || r === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; s !== null; ) {
            if (i = Vt(s), i === null) return;
            if (r = i.tag, r === 5 || r === 6 || r === 26 || r === 27) {
              a = u = i;
              continue l;
            }
            s = s.parentNode;
          }
        }
        a = a.return;
      }
    Gs(function() {
      var g = u, x = ni(t), N = [];
      l: {
        var b = mf.get(l);
        if (b !== void 0) {
          var p = qn, B = l;
          switch (l) {
            case "keypress":
              if (Rn(t) === 0) break l;
            case "keydown":
            case "keyup":
              p = ph;
              break;
            case "focusin":
              B = "focus", p = ri;
              break;
            case "focusout":
              B = "blur", p = ri;
              break;
            case "beforeblur":
            case "afterblur":
              p = ri;
              break;
            case "click":
              if (t.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              p = Ls;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              p = ch;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              p = jh;
              break;
            case rf:
            case of:
            case df:
              p = rh;
              break;
            case hf:
              p = Nh;
              break;
            case "scroll":
            case "scrollend":
              p = uh;
              break;
            case "wheel":
              p = Ah;
              break;
            case "copy":
            case "cut":
            case "paste":
              p = dh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              p = Vs;
              break;
            case "toggle":
            case "beforetoggle":
              p = zh;
          }
          var L = (e & 4) !== 0, vl = !L && (l === "scroll" || l === "scrollend"), h = L ? b !== null ? b + "Capture" : null : b;
          L = [];
          for (var o = g, y; o !== null; ) {
            var E = o;
            if (y = E.stateNode, E = E.tag, E !== 5 && E !== 26 && E !== 27 || y === null || h === null || (E = Ua(o, h), E != null && L.push(
              hn(o, E, y)
            )), vl) break;
            o = o.return;
          }
          0 < L.length && (b = new p(
            b,
            B,
            null,
            t,
            x
          ), N.push({ event: b, listeners: L }));
        }
      }
      if ((e & 7) === 0) {
        l: {
          if (b = l === "mouseover" || l === "pointerover", p = l === "mouseout" || l === "pointerout", b && t !== ai && (B = t.relatedTarget || t.fromElement) && (Vt(B) || B[Zt]))
            break l;
          if ((p || b) && (b = x.window === x ? x : (b = x.ownerDocument) ? b.defaultView || b.parentWindow : window, p ? (B = t.relatedTarget || t.toElement, p = g, B = B ? Vt(B) : null, B !== null && (vl = w(B), L = B.tag, B !== vl || L !== 5 && L !== 27 && L !== 6) && (B = null)) : (p = null, B = g), p !== B)) {
            if (L = Ls, E = "onMouseLeave", h = "onMouseEnter", o = "mouse", (l === "pointerout" || l === "pointerover") && (L = Vs, E = "onPointerLeave", h = "onPointerEnter", o = "pointer"), vl = p == null ? b : Da(p), y = B == null ? b : Da(B), b = new L(
              E,
              o + "leave",
              p,
              t,
              x
            ), b.target = vl, b.relatedTarget = y, E = null, Vt(x) === g && (L = new L(
              h,
              o + "enter",
              B,
              t,
              x
            ), L.target = y, L.relatedTarget = vl, E = L), vl = E, p && B)
              e: {
                for (L = _m, h = p, o = B, y = 0, E = h; E; E = L(E))
                  y++;
                E = 0;
                for (var X = o; X; X = L(X))
                  E++;
                for (; 0 < y - E; )
                  h = L(h), y--;
                for (; 0 < E - y; )
                  o = L(o), E--;
                for (; y--; ) {
                  if (h === o || o !== null && h === o.alternate) {
                    L = h;
                    break e;
                  }
                  h = L(h), o = L(o);
                }
                L = null;
              }
            else L = null;
            p !== null && Bo(
              N,
              b,
              p,
              L,
              !1
            ), B !== null && vl !== null && Bo(
              N,
              vl,
              B,
              L,
              !0
            );
          }
        }
        l: {
          if (b = g ? Da(g) : window, p = b.nodeName && b.nodeName.toLowerCase(), p === "select" || p === "input" && b.type === "file")
            var sl = Is;
          else if (Ws(b))
            if (Ps)
              sl = Yh;
            else {
              sl = qh;
              var Y = Hh;
            }
          else
            p = b.nodeName, !p || p.toLowerCase() !== "input" || b.type !== "checkbox" && b.type !== "radio" ? g && ti(g.elementType) && (sl = Is) : sl = Bh;
          if (sl && (sl = sl(l, g))) {
            Fs(
              N,
              sl,
              t,
              x
            );
            break l;
          }
          Y && Y(l, b, g), l === "focusout" && g && b.type === "number" && g.memoizedProps.value != null && ei(b, "number", b.value);
        }
        switch (Y = g ? Da(g) : window, l) {
          case "focusin":
            (Ws(Y) || Y.contentEditable === "true") && (Pt = Y, vi = g, Xa = null);
            break;
          case "focusout":
            Xa = vi = Pt = null;
            break;
          case "mousedown":
            gi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            gi = !1, sf(N, t, x);
            break;
          case "selectionchange":
            if (Qh) break;
          case "keydown":
          case "keyup":
            sf(N, t, x);
        }
        var $;
        if (di)
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
          It ? ks(l, t) && (al = "onCompositionEnd") : l === "keydown" && t.keyCode === 229 && (al = "onCompositionStart");
        al && (ws && t.locale !== "ko" && (It || al !== "onCompositionStart" ? al === "onCompositionEnd" && It && ($ = Qs()) : (lt = x, ci = "value" in lt ? lt.value : lt.textContent, It = !0)), Y = Au(g, al), 0 < Y.length && (al = new Zs(
          al,
          l,
          null,
          t,
          x
        ), N.push({ event: al, listeners: Y }), $ ? al.data = $ : ($ = $s(t), $ !== null && (al.data = $)))), ($ = Ch ? Mh(l, t) : Dh(l, t)) && (al = Au(g, "onBeforeInput"), 0 < al.length && (Y = new Zs(
          "onBeforeInput",
          "beforeinput",
          null,
          t,
          x
        ), N.push({
          event: Y,
          listeners: al
        }), Y.data = $)), Em(
          N,
          l,
          g,
          t,
          x
        );
      }
      Ho(N, e);
    });
  }
  function hn(l, e, t) {
    return {
      instance: l,
      listener: e,
      currentTarget: t
    };
  }
  function Au(l, e) {
    for (var t = e + "Capture", a = []; l !== null; ) {
      var n = l, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Ua(l, t), n != null && a.unshift(
        hn(l, n, u)
      ), n = Ua(l, e), n != null && a.push(
        hn(l, n, u)
      )), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function _m(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Bo(l, e, t, a, n) {
    for (var u = e._reactName, i = []; t !== null && t !== a; ) {
      var s = t, r = s.alternate, g = s.stateNode;
      if (s = s.tag, r !== null && r === a) break;
      s !== 5 && s !== 26 && s !== 27 || g === null || (r = g, n ? (g = Ua(t, u), g != null && i.unshift(
        hn(t, g, r)
      )) : n || (g = Ua(t, u), g != null && i.push(
        hn(t, g, r)
      ))), t = t.return;
    }
    i.length !== 0 && l.push({ event: e, listeners: i });
  }
  var zm = /\r\n?/g, Om = /\u0000|\uFFFD/g;
  function Yo(l) {
    return (typeof l == "string" ? l : "" + l).replace(zm, `
`).replace(Om, "");
  }
  function Go(l, e) {
    return e = Yo(e), Yo(l) === e;
  }
  function yl(l, e, t, a, n, u) {
    switch (t) {
      case "children":
        typeof a == "string" ? e === "body" || e === "textarea" && a === "" || $t(l, a) : (typeof a == "number" || typeof a == "bigint") && e !== "body" && $t(l, "" + a);
        break;
      case "className":
        Cn(l, "class", a);
        break;
      case "tabIndex":
        Cn(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Cn(l, t, a);
        break;
      case "style":
        Bs(l, a, u);
        break;
      case "data":
        if (e !== "object") {
          Cn(l, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (e !== "a" || t !== "href")) {
          l.removeAttribute(t);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(t);
          break;
        }
        a = Dn("" + a), l.setAttribute(t, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(
            t,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (t === "formAction" ? (e !== "input" && yl(l, e, "name", n.name, n, null), yl(
            l,
            e,
            "formEncType",
            n.formEncType,
            n,
            null
          ), yl(
            l,
            e,
            "formMethod",
            n.formMethod,
            n,
            null
          ), yl(
            l,
            e,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (yl(l, e, "encType", n.encType, n, null), yl(l, e, "method", n.method, n, null), yl(l, e, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(t);
          break;
        }
        a = Dn("" + a), l.setAttribute(t, a);
        break;
      case "onClick":
        a != null && (l.onclick = He);
        break;
      case "onScroll":
        a != null && el("scroll", l);
        break;
      case "onScrollEnd":
        a != null && el("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(m(61));
          if (t = a.__html, t != null) {
            if (n.children != null) throw Error(m(60));
            l.innerHTML = t;
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
        t = Dn("" + a), l.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          t
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
        a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(t, "" + a) : l.removeAttribute(t);
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
        a && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(t, "") : l.removeAttribute(t);
        break;
      case "capture":
      case "download":
        a === !0 ? l.setAttribute(t, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(t, a) : l.removeAttribute(t);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? l.setAttribute(t, a) : l.removeAttribute(t);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? l.removeAttribute(t) : l.setAttribute(t, a);
        break;
      case "popover":
        el("beforetoggle", l), el("toggle", l), On(l, "popover", a);
        break;
      case "xlinkActuate":
        Re(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Re(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Re(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Re(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Re(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Re(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Re(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Re(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Re(
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
        (!(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (t = ah.get(t) || t, On(l, t, a));
    }
  }
  function Lc(l, e, t, a, n, u) {
    switch (t) {
      case "style":
        Bs(l, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(m(61));
          if (t = a.__html, t != null) {
            if (n.children != null) throw Error(m(60));
            l.innerHTML = t;
          }
        }
        break;
      case "children":
        typeof a == "string" ? $t(l, a) : (typeof a == "number" || typeof a == "bigint") && $t(l, "" + a);
        break;
      case "onScroll":
        a != null && el("scroll", l);
        break;
      case "onScrollEnd":
        a != null && el("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = He);
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
        if (!zs.hasOwnProperty(t))
          l: {
            if (t[0] === "o" && t[1] === "n" && (n = t.endsWith("Capture"), e = t.slice(2, n ? t.length - 7 : void 0), u = l[Il] || null, u = u != null ? u[t] : null, typeof u == "function" && l.removeEventListener(e, u, n), typeof a == "function")) {
              typeof u != "function" && u !== null && (t in l ? l[t] = null : l.hasAttribute(t) && l.removeAttribute(t)), l.addEventListener(e, a, n);
              break l;
            }
            t in l ? l[t] = a : a === !0 ? l.setAttribute(t, "") : On(l, t, a);
          }
    }
  }
  function wl(l, e, t) {
    switch (e) {
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
        el("error", l), el("load", l);
        var a = !1, n = !1, u;
        for (u in t)
          if (t.hasOwnProperty(u)) {
            var i = t[u];
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
                  throw Error(m(137, e));
                default:
                  yl(l, e, u, i, t, null);
              }
          }
        n && yl(l, e, "srcSet", t.srcSet, t, null), a && yl(l, e, "src", t.src, t, null);
        return;
      case "input":
        el("invalid", l);
        var s = u = i = n = null, r = null, g = null;
        for (a in t)
          if (t.hasOwnProperty(a)) {
            var x = t[a];
            if (x != null)
              switch (a) {
                case "name":
                  n = x;
                  break;
                case "type":
                  i = x;
                  break;
                case "checked":
                  r = x;
                  break;
                case "defaultChecked":
                  g = x;
                  break;
                case "value":
                  u = x;
                  break;
                case "defaultValue":
                  s = x;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (x != null)
                    throw Error(m(137, e));
                  break;
                default:
                  yl(l, e, a, x, t, null);
              }
          }
        Us(
          l,
          u,
          s,
          r,
          g,
          i,
          n,
          !1
        );
        return;
      case "select":
        el("invalid", l), a = i = u = null;
        for (n in t)
          if (t.hasOwnProperty(n) && (s = t[n], s != null))
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
                yl(l, e, n, s, t, null);
            }
        e = u, t = i, l.multiple = !!a, e != null ? kt(l, !!a, e, !1) : t != null && kt(l, !!a, t, !0);
        return;
      case "textarea":
        el("invalid", l), u = n = a = null;
        for (i in t)
          if (t.hasOwnProperty(i) && (s = t[i], s != null))
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
                yl(l, e, i, s, t, null);
            }
        Hs(l, a, n, u);
        return;
      case "option":
        for (r in t)
          if (t.hasOwnProperty(r) && (a = t[r], a != null))
            switch (r) {
              case "selected":
                l.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                yl(l, e, r, a, t, null);
            }
        return;
      case "dialog":
        el("beforetoggle", l), el("toggle", l), el("cancel", l), el("close", l);
        break;
      case "iframe":
      case "object":
        el("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < dn.length; a++)
          el(dn[a], l);
        break;
      case "image":
        el("error", l), el("load", l);
        break;
      case "details":
        el("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        el("error", l), el("load", l);
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
        for (g in t)
          if (t.hasOwnProperty(g) && (a = t[g], a != null))
            switch (g) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(m(137, e));
              default:
                yl(l, e, g, a, t, null);
            }
        return;
      default:
        if (ti(e)) {
          for (x in t)
            t.hasOwnProperty(x) && (a = t[x], a !== void 0 && Lc(
              l,
              e,
              x,
              a,
              t,
              void 0
            ));
          return;
        }
    }
    for (s in t)
      t.hasOwnProperty(s) && (a = t[s], a != null && yl(l, e, s, a, t, null));
  }
  function Cm(l, e, t, a) {
    switch (e) {
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
        var n = null, u = null, i = null, s = null, r = null, g = null, x = null;
        for (p in t) {
          var N = t[p];
          if (t.hasOwnProperty(p) && N != null)
            switch (p) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                r = N;
              default:
                a.hasOwnProperty(p) || yl(l, e, p, null, a, N);
            }
        }
        for (var b in a) {
          var p = a[b];
          if (N = t[b], a.hasOwnProperty(b) && (p != null || N != null))
            switch (b) {
              case "type":
                u = p;
                break;
              case "name":
                n = p;
                break;
              case "checked":
                g = p;
                break;
              case "defaultChecked":
                x = p;
                break;
              case "value":
                i = p;
                break;
              case "defaultValue":
                s = p;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (p != null)
                  throw Error(m(137, e));
                break;
              default:
                p !== N && yl(
                  l,
                  e,
                  b,
                  p,
                  a,
                  N
                );
            }
        }
        li(
          l,
          i,
          s,
          r,
          g,
          x,
          u,
          n
        );
        return;
      case "select":
        p = i = s = b = null;
        for (u in t)
          if (r = t[u], t.hasOwnProperty(u) && r != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                p = r;
              default:
                a.hasOwnProperty(u) || yl(
                  l,
                  e,
                  u,
                  null,
                  a,
                  r
                );
            }
        for (n in a)
          if (u = a[n], r = t[n], a.hasOwnProperty(n) && (u != null || r != null))
            switch (n) {
              case "value":
                b = u;
                break;
              case "defaultValue":
                s = u;
                break;
              case "multiple":
                i = u;
              default:
                u !== r && yl(
                  l,
                  e,
                  n,
                  u,
                  a,
                  r
                );
            }
        e = s, t = i, a = p, b != null ? kt(l, !!t, b, !1) : !!a != !!t && (e != null ? kt(l, !!t, e, !0) : kt(l, !!t, t ? [] : "", !1));
        return;
      case "textarea":
        p = b = null;
        for (s in t)
          if (n = t[s], t.hasOwnProperty(s) && n != null && !a.hasOwnProperty(s))
            switch (s) {
              case "value":
                break;
              case "children":
                break;
              default:
                yl(l, e, s, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = t[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                b = n;
                break;
              case "defaultValue":
                p = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(m(91));
                break;
              default:
                n !== u && yl(l, e, i, n, a, u);
            }
        Rs(l, b, p);
        return;
      case "option":
        for (var B in t)
          if (b = t[B], t.hasOwnProperty(B) && b != null && !a.hasOwnProperty(B))
            switch (B) {
              case "selected":
                l.selected = !1;
                break;
              default:
                yl(
                  l,
                  e,
                  B,
                  null,
                  a,
                  b
                );
            }
        for (r in a)
          if (b = a[r], p = t[r], a.hasOwnProperty(r) && b !== p && (b != null || p != null))
            switch (r) {
              case "selected":
                l.selected = b && typeof b != "function" && typeof b != "symbol";
                break;
              default:
                yl(
                  l,
                  e,
                  r,
                  b,
                  a,
                  p
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
        for (var L in t)
          b = t[L], t.hasOwnProperty(L) && b != null && !a.hasOwnProperty(L) && yl(l, e, L, null, a, b);
        for (g in a)
          if (b = a[g], p = t[g], a.hasOwnProperty(g) && b !== p && (b != null || p != null))
            switch (g) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (b != null)
                  throw Error(m(137, e));
                break;
              default:
                yl(
                  l,
                  e,
                  g,
                  b,
                  a,
                  p
                );
            }
        return;
      default:
        if (ti(e)) {
          for (var vl in t)
            b = t[vl], t.hasOwnProperty(vl) && b !== void 0 && !a.hasOwnProperty(vl) && Lc(
              l,
              e,
              vl,
              void 0,
              a,
              b
            );
          for (x in a)
            b = a[x], p = t[x], !a.hasOwnProperty(x) || b === p || b === void 0 && p === void 0 || Lc(
              l,
              e,
              x,
              b,
              a,
              p
            );
          return;
        }
    }
    for (var h in t)
      b = t[h], t.hasOwnProperty(h) && b != null && !a.hasOwnProperty(h) && yl(l, e, h, null, a, b);
    for (N in a)
      b = a[N], p = t[N], !a.hasOwnProperty(N) || b === p || b == null && p == null || yl(l, e, N, b, a, p);
  }
  function Qo(l) {
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
      for (var l = 0, e = 0, t = performance.getEntriesByType("resource"), a = 0; a < t.length; a++) {
        var n = t[a], u = n.transferSize, i = n.initiatorType, s = n.duration;
        if (u && s && Qo(i)) {
          for (i = 0, s = n.responseEnd, a += 1; a < t.length; a++) {
            var r = t[a], g = r.startTime;
            if (g > s) break;
            var x = r.transferSize, N = r.initiatorType;
            x && Qo(N) && (r = r.responseEnd, i += x * (r < s ? 1 : (s - g) / (r - g)));
          }
          if (--a, e += 8 * (u + i) / (n.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return e / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var Zc = null, Vc = null;
  function _u(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Xo(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Lo(l, e) {
    if (l === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && e === "foreignObject" ? 0 : l;
  }
  function wc(l, e) {
    return l === "textarea" || l === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Kc = null;
  function Dm() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Kc ? !1 : (Kc = l, !0) : (Kc = null, !1);
  }
  var Zo = typeof setTimeout == "function" ? setTimeout : void 0, Um = typeof clearTimeout == "function" ? clearTimeout : void 0, Vo = typeof Promise == "function" ? Promise : void 0, Rm = typeof queueMicrotask == "function" ? queueMicrotask : typeof Vo < "u" ? function(l) {
    return Vo.resolve(null).then(l).catch(Hm);
  } : Zo;
  function Hm(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function gt(l) {
    return l === "head";
  }
  function wo(l, e) {
    var t = e, a = 0;
    do {
      var n = t.nextSibling;
      if (l.removeChild(t), n && n.nodeType === 8)
        if (t = n.data, t === "/$" || t === "/&") {
          if (a === 0) {
            l.removeChild(n), Aa(e);
            return;
          }
          a--;
        } else if (t === "$" || t === "$?" || t === "$~" || t === "$!" || t === "&")
          a++;
        else if (t === "html")
          mn(l.ownerDocument.documentElement);
        else if (t === "head") {
          t = l.ownerDocument.head, mn(t);
          for (var u = t.firstChild; u; ) {
            var i = u.nextSibling, s = u.nodeName;
            u[Ma] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && u.rel.toLowerCase() === "stylesheet" || t.removeChild(u), u = i;
          }
        } else
          t === "body" && mn(l.ownerDocument.body);
      t = n;
    } while (t);
    Aa(e);
  }
  function Ko(l, e) {
    var t = l;
    l = 0;
    do {
      var a = t.nextSibling;
      if (t.nodeType === 1 ? e ? (t._stashedDisplay = t.style.display, t.style.display = "none") : (t.style.display = t._stashedDisplay || "", t.getAttribute("style") === "" && t.removeAttribute("style")) : t.nodeType === 3 && (e ? (t._stashedText = t.nodeValue, t.nodeValue = "") : t.nodeValue = t._stashedText || ""), a && a.nodeType === 8)
        if (t = a.data, t === "/$") {
          if (l === 0) break;
          l--;
        } else
          t !== "$" && t !== "$?" && t !== "$~" && t !== "$!" || l++;
      t = a;
    } while (t);
  }
  function Jc(l) {
    var e = l.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var t = e;
      switch (e = e.nextSibling, t.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Jc(t), Iu(t);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (t.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(t);
    }
  }
  function qm(l, e, t, a) {
    for (; l.nodeType === 1; ) {
      var n = t;
      if (l.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (a) {
        if (!l[Ma])
          switch (e) {
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
      } else if (e === "input" && l.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && l.getAttribute("name") === u)
          return l;
      } else return l;
      if (l = Te(l.nextSibling), l === null) break;
    }
    return null;
  }
  function Bm(l, e, t) {
    if (e === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = Te(l.nextSibling), l === null)) return null;
    return l;
  }
  function Jo(l, e) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e || (l = Te(l.nextSibling), l === null)) return null;
    return l;
  }
  function kc(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function $c(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function Ym(l, e) {
    var t = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = e;
    else if (l.data !== "$?" || t.readyState !== "loading")
      e();
    else {
      var a = function() {
        e(), t.removeEventListener("DOMContentLoaded", a);
      };
      t.addEventListener("DOMContentLoaded", a), l._reactRetry = a;
    }
  }
  function Te(l) {
    for (; l != null; l = l.nextSibling) {
      var e = l.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = l.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return l;
  }
  var Wc = null;
  function ko(l) {
    l = l.nextSibling;
    for (var e = 0; l; ) {
      if (l.nodeType === 8) {
        var t = l.data;
        if (t === "/$" || t === "/&") {
          if (e === 0)
            return Te(l.nextSibling);
          e--;
        } else
          t !== "$" && t !== "$!" && t !== "$?" && t !== "$~" && t !== "&" || e++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function $o(l) {
    l = l.previousSibling;
    for (var e = 0; l; ) {
      if (l.nodeType === 8) {
        var t = l.data;
        if (t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&") {
          if (e === 0) return l;
          e--;
        } else t !== "/$" && t !== "/&" || e++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function Wo(l, e, t) {
    switch (e = _u(t), l) {
      case "html":
        if (l = e.documentElement, !l) throw Error(m(452));
        return l;
      case "head":
        if (l = e.head, !l) throw Error(m(453));
        return l;
      case "body":
        if (l = e.body, !l) throw Error(m(454));
        return l;
      default:
        throw Error(m(451));
    }
  }
  function mn(l) {
    for (var e = l.attributes; e.length; )
      l.removeAttributeNode(e[0]);
    Iu(l);
  }
  var Ae = /* @__PURE__ */ new Map(), Fo = /* @__PURE__ */ new Set();
  function zu(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var Fe = T.d;
  T.d = {
    f: Gm,
    r: Qm,
    D: Xm,
    C: Lm,
    L: Zm,
    m: Vm,
    X: Km,
    S: wm,
    M: Jm
  };
  function Gm() {
    var l = Fe.f(), e = pu();
    return l || e;
  }
  function Qm(l) {
    var e = wt(l);
    e !== null && e.tag === 5 && e.type === "form" ? hr(e) : Fe.r(l);
  }
  var Ea = typeof document > "u" ? null : document;
  function Io(l, e, t) {
    var a = Ea;
    if (a && typeof e == "string" && e) {
      var n = be(e);
      n = 'link[rel="' + l + '"][href="' + n + '"]', typeof t == "string" && (n += '[crossorigin="' + t + '"]'), Fo.has(n) || (Fo.add(n), l = { rel: l, crossOrigin: t, href: e }, a.querySelector(n) === null && (e = a.createElement("link"), wl(e, "link", l), Yl(e), a.head.appendChild(e)));
    }
  }
  function Xm(l) {
    Fe.D(l), Io("dns-prefetch", l, null);
  }
  function Lm(l, e) {
    Fe.C(l, e), Io("preconnect", l, e);
  }
  function Zm(l, e, t) {
    Fe.L(l, e, t);
    var a = Ea;
    if (a && l && e) {
      var n = 'link[rel="preload"][as="' + be(e) + '"]';
      e === "image" && t && t.imageSrcSet ? (n += '[imagesrcset="' + be(
        t.imageSrcSet
      ) + '"]', typeof t.imageSizes == "string" && (n += '[imagesizes="' + be(
        t.imageSizes
      ) + '"]')) : n += '[href="' + be(l) + '"]';
      var u = n;
      switch (e) {
        case "style":
          u = Na(l);
          break;
        case "script":
          u = Ta(l);
      }
      Ae.has(u) || (l = U(
        {
          rel: "preload",
          href: e === "image" && t && t.imageSrcSet ? void 0 : l,
          as: e
        },
        t
      ), Ae.set(u, l), a.querySelector(n) !== null || e === "style" && a.querySelector(yn(u)) || e === "script" && a.querySelector(vn(u)) || (e = a.createElement("link"), wl(e, "link", l), Yl(e), a.head.appendChild(e)));
    }
  }
  function Vm(l, e) {
    Fe.m(l, e);
    var t = Ea;
    if (t && l) {
      var a = e && typeof e.as == "string" ? e.as : "script", n = 'link[rel="modulepreload"][as="' + be(a) + '"][href="' + be(l) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Ta(l);
      }
      if (!Ae.has(u) && (l = U({ rel: "modulepreload", href: l }, e), Ae.set(u, l), t.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (t.querySelector(vn(u)))
              return;
        }
        a = t.createElement("link"), wl(a, "link", l), Yl(a), t.head.appendChild(a);
      }
    }
  }
  function wm(l, e, t) {
    Fe.S(l, e, t);
    var a = Ea;
    if (a && l) {
      var n = Kt(a).hoistableStyles, u = Na(l);
      e = e || "default";
      var i = n.get(u);
      if (!i) {
        var s = { loading: 0, preload: null };
        if (i = a.querySelector(
          yn(u)
        ))
          s.loading = 5;
        else {
          l = U(
            { rel: "stylesheet", href: l, "data-precedence": e },
            t
          ), (t = Ae.get(u)) && Fc(l, t);
          var r = i = a.createElement("link");
          Yl(r), wl(r, "link", l), r._p = new Promise(function(g, x) {
            r.onload = g, r.onerror = x;
          }), r.addEventListener("load", function() {
            s.loading |= 1;
          }), r.addEventListener("error", function() {
            s.loading |= 2;
          }), s.loading |= 4, Ou(i, e, a);
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
  function Km(l, e) {
    Fe.X(l, e);
    var t = Ea;
    if (t && l) {
      var a = Kt(t).hoistableScripts, n = Ta(l), u = a.get(n);
      u || (u = t.querySelector(vn(n)), u || (l = U({ src: l, async: !0 }, e), (e = Ae.get(n)) && Ic(l, e), u = t.createElement("script"), Yl(u), wl(u, "link", l), t.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Jm(l, e) {
    Fe.M(l, e);
    var t = Ea;
    if (t && l) {
      var a = Kt(t).hoistableScripts, n = Ta(l), u = a.get(n);
      u || (u = t.querySelector(vn(n)), u || (l = U({ src: l, async: !0, type: "module" }, e), (e = Ae.get(n)) && Ic(l, e), u = t.createElement("script"), Yl(u), wl(u, "link", l), t.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Po(l, e, t, a) {
    var n = (n = P.current) ? zu(n) : null;
    if (!n) throw Error(m(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof t.precedence == "string" && typeof t.href == "string" ? (e = Na(t.href), t = Kt(
          n
        ).hoistableStyles, a = t.get(e), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, t.set(e, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (t.rel === "stylesheet" && typeof t.href == "string" && typeof t.precedence == "string") {
          l = Na(t.href);
          var u = Kt(
            n
          ).hoistableStyles, i = u.get(l);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(l, i), (u = n.querySelector(
            yn(l)
          )) && !u._p && (i.instance = u, i.state.loading = 5), Ae.has(l) || (t = {
            rel: "preload",
            as: "style",
            href: t.href,
            crossOrigin: t.crossOrigin,
            integrity: t.integrity,
            media: t.media,
            hrefLang: t.hrefLang,
            referrerPolicy: t.referrerPolicy
          }, Ae.set(l, t), u || km(
            n,
            l,
            t,
            i.state
          ))), e && a === null)
            throw Error(m(528, ""));
          return i;
        }
        if (e && a !== null)
          throw Error(m(529, ""));
        return null;
      case "script":
        return e = t.async, t = t.src, typeof t == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = Ta(t), t = Kt(
          n
        ).hoistableScripts, a = t.get(e), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, t.set(e, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(m(444, l));
    }
  }
  function Na(l) {
    return 'href="' + be(l) + '"';
  }
  function yn(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function ld(l) {
    return U({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function km(l, e, t, a) {
    l.querySelector('link[rel="preload"][as="style"][' + e + "]") ? a.loading = 1 : (e = l.createElement("link"), a.preload = e, e.addEventListener("load", function() {
      return a.loading |= 1;
    }), e.addEventListener("error", function() {
      return a.loading |= 2;
    }), wl(e, "link", t), Yl(e), l.head.appendChild(e));
  }
  function Ta(l) {
    return '[src="' + be(l) + '"]';
  }
  function vn(l) {
    return "script[async]" + l;
  }
  function ed(l, e, t) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var a = l.querySelector(
            'style[data-href~="' + be(t.href) + '"]'
          );
          if (a)
            return e.instance = a, Yl(a), a;
          var n = U({}, t, {
            "data-href": t.href,
            "data-precedence": t.precedence,
            href: null,
            precedence: null
          });
          return a = (l.ownerDocument || l).createElement(
            "style"
          ), Yl(a), wl(a, "style", n), Ou(a, t.precedence, l), e.instance = a;
        case "stylesheet":
          n = Na(t.href);
          var u = l.querySelector(
            yn(n)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, Yl(u), u;
          a = ld(t), (n = Ae.get(n)) && Fc(a, n), u = (l.ownerDocument || l).createElement("link"), Yl(u);
          var i = u;
          return i._p = new Promise(function(s, r) {
            i.onload = s, i.onerror = r;
          }), wl(u, "link", a), e.state.loading |= 4, Ou(u, t.precedence, l), e.instance = u;
        case "script":
          return u = Ta(t.src), (n = l.querySelector(
            vn(u)
          )) ? (e.instance = n, Yl(n), n) : (a = t, (n = Ae.get(u)) && (a = U({}, t), Ic(a, n)), l = l.ownerDocument || l, n = l.createElement("script"), Yl(n), wl(n, "link", a), l.head.appendChild(n), e.instance = n);
        case "void":
          return null;
        default:
          throw Error(m(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (a = e.instance, e.state.loading |= 4, Ou(a, t.precedence, l));
    return e.instance;
  }
  function Ou(l, e, t) {
    for (var a = t.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
      var s = a[i];
      if (s.dataset.precedence === e) u = s;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(l, u.nextSibling) : (e = t.nodeType === 9 ? t.head : t, e.insertBefore(l, e.firstChild));
  }
  function Fc(l, e) {
    l.crossOrigin == null && (l.crossOrigin = e.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = e.referrerPolicy), l.title == null && (l.title = e.title);
  }
  function Ic(l, e) {
    l.crossOrigin == null && (l.crossOrigin = e.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = e.referrerPolicy), l.integrity == null && (l.integrity = e.integrity);
  }
  var Cu = null;
  function td(l, e, t) {
    if (Cu === null) {
      var a = /* @__PURE__ */ new Map(), n = Cu = /* @__PURE__ */ new Map();
      n.set(t, a);
    } else
      n = Cu, a = n.get(t), a || (a = /* @__PURE__ */ new Map(), n.set(t, a));
    if (a.has(l)) return a;
    for (a.set(l, null), t = t.getElementsByTagName(l), n = 0; n < t.length; n++) {
      var u = t[n];
      if (!(u[Ma] || u[Xl] || l === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(e) || "";
        i = l + i;
        var s = a.get(i);
        s ? s.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function ad(l, e, t) {
    l = l.ownerDocument || l, l.head.insertBefore(
      t,
      e === "title" ? l.querySelector("head > title") : null
    );
  }
  function $m(l, e, t) {
    if (t === 1 || e.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        switch (e.rel) {
          case "stylesheet":
            return l = e.disabled, typeof e.precedence == "string" && l == null;
          default:
            return !0;
        }
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function nd(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function Wm(l, e, t, a) {
    if (t.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (t.state.loading & 4) === 0) {
      if (t.instance === null) {
        var n = Na(a.href), u = e.querySelector(
          yn(n)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (l.count++, l = Mu.bind(l), e.then(l, l)), t.state.loading |= 4, t.instance = u, Yl(u);
          return;
        }
        u = e.ownerDocument || e, a = ld(a), (n = Ae.get(n)) && Fc(a, n), u = u.createElement("link"), Yl(u);
        var i = u;
        i._p = new Promise(function(s, r) {
          i.onload = s, i.onerror = r;
        }), wl(u, "link", a), t.instance = u;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(t, e), (e = t.state.preload) && (t.state.loading & 3) === 0 && (l.count++, t = Mu.bind(l), e.addEventListener("load", t), e.addEventListener("error", t));
    }
  }
  var Pc = 0;
  function Fm(l, e) {
    return l.stylesheets && l.count === 0 && Uu(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(t) {
      var a = setTimeout(function() {
        if (l.stylesheets && Uu(l, l.stylesheets), l.unsuspend) {
          var u = l.unsuspend;
          l.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < l.imgBytes && Pc === 0 && (Pc = 62500 * Mm());
      var n = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && Uu(l, l.stylesheets), l.unsuspend)) {
            var u = l.unsuspend;
            l.unsuspend = null, u();
          }
        },
        (l.imgBytes > Pc ? 50 : 800) + e
      );
      return l.unsuspend = t, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function Mu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Uu(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var Du = null;
  function Uu(l, e) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Du = /* @__PURE__ */ new Map(), e.forEach(Im, l), Du = null, Mu.call(l));
  }
  function Im(l, e) {
    if (!(e.state.loading & 4)) {
      var t = Du.get(l);
      if (t) var a = t.get(null);
      else {
        t = /* @__PURE__ */ new Map(), Du.set(l, t);
        for (var n = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (t.set(i.dataset.precedence, i), a = i);
        }
        a && t.set(null, a);
      }
      n = e.instance, i = n.getAttribute("data-precedence"), u = t.get(i) || a, u === a && t.set(null, n), t.set(i, n), this.count++, a = Mu.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(n, l.firstChild)), e.state.loading |= 4;
    }
  }
  var gn = {
    $$typeof: gl,
    Provider: null,
    Consumer: null,
    _currentValue: Q,
    _currentValue2: Q,
    _threadCount: 0
  };
  function Pm(l, e, t, a, n, u, i, s, r) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ku(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ku(0), this.hiddenUpdates = ku(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = r, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function ud(l, e, t, a, n, u, i, s, r, g, x, N) {
    return l = new Pm(
      l,
      e,
      t,
      i,
      r,
      g,
      x,
      N,
      s
    ), e = 1, u === !0 && (e |= 24), u = re(3, null, null, e), l.current = u, u.stateNode = l, e = Di(), e.refCount++, l.pooledCache = e, e.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: t,
      cache: e
    }, qi(u), l;
  }
  function id(l) {
    return l ? (l = ta, l) : ta;
  }
  function cd(l, e, t, a, n, u) {
    n = id(n), a.context === null ? a.context = n : a.pendingContext = n, a = it(e), a.payload = { element: t }, u = u === void 0 ? null : u, u !== null && (a.callback = u), t = ct(l, a, e), t !== null && (ne(t, l, e), ka(t, l, e));
  }
  function sd(l, e) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var t = l.retryLane;
      l.retryLane = t !== 0 && t < e ? t : e;
    }
  }
  function ls(l, e) {
    sd(l, e), (l = l.alternate) && sd(l, e);
  }
  function fd(l) {
    if (l.tag === 13 || l.tag === 31) {
      var e = Ot(l, 67108864);
      e !== null && ne(e, l, 67108864), ls(l, 67108864);
    }
  }
  function rd(l) {
    if (l.tag === 13 || l.tag === 31) {
      var e = ye();
      e = $u(e);
      var t = Ot(l, e);
      t !== null && ne(t, l, e), ls(l, e);
    }
  }
  var Ru = !0;
  function ly(l, e, t, a) {
    var n = d.T;
    d.T = null;
    var u = T.p;
    try {
      T.p = 2, es(l, e, t, a);
    } finally {
      T.p = u, d.T = n;
    }
  }
  function ey(l, e, t, a) {
    var n = d.T;
    d.T = null;
    var u = T.p;
    try {
      T.p = 8, es(l, e, t, a);
    } finally {
      T.p = u, d.T = n;
    }
  }
  function es(l, e, t, a) {
    if (Ru) {
      var n = ts(a);
      if (n === null)
        Xc(
          l,
          e,
          a,
          Hu,
          t
        ), dd(l, a);
      else if (ay(
        n,
        l,
        e,
        t,
        a
      ))
        a.stopPropagation();
      else if (dd(l, a), e & 4 && -1 < ty.indexOf(l)) {
        for (; n !== null; ) {
          var u = wt(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = Nt(u.pendingLanes);
                  if (i !== 0) {
                    var s = u;
                    for (s.pendingLanes |= 2, s.entangledLanes |= 2; i; ) {
                      var r = 1 << 31 - se(i);
                      s.entanglements[1] |= r, i &= ~r;
                    }
                    Ue(u), (rl & 6) === 0 && (gu = ie() + 500, on(0));
                  }
                }
                break;
              case 31:
              case 13:
                s = Ot(u, 2), s !== null && ne(s, u, 2), pu(), ls(u, 2);
            }
          if (u = ts(a), u === null && Xc(
            l,
            e,
            a,
            Hu,
            t
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        Xc(
          l,
          e,
          a,
          null,
          t
        );
    }
  }
  function ts(l) {
    return l = ni(l), as(l);
  }
  var Hu = null;
  function as(l) {
    if (Hu = null, l = Vt(l), l !== null) {
      var e = w(l);
      if (e === null) l = null;
      else {
        var t = e.tag;
        if (t === 13) {
          if (l = Z(e), l !== null) return l;
          l = null;
        } else if (t === 31) {
          if (l = F(e), l !== null) return l;
          l = null;
        } else if (t === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          l = null;
        } else e !== l && (l = null);
      }
    }
    return Hu = l, null;
  }
  function od(l) {
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
        switch (Xd()) {
          case gs:
            return 2;
          case bs:
            return 8;
          case Nn:
          case Ld:
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
  var ns = !1, bt = null, pt = null, St = null, bn = /* @__PURE__ */ new Map(), pn = /* @__PURE__ */ new Map(), xt = [], ty = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function dd(l, e) {
    switch (l) {
      case "focusin":
      case "focusout":
        bt = null;
        break;
      case "dragenter":
      case "dragleave":
        pt = null;
        break;
      case "mouseover":
      case "mouseout":
        St = null;
        break;
      case "pointerover":
      case "pointerout":
        bn.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        pn.delete(e.pointerId);
    }
  }
  function Sn(l, e, t, a, n, u) {
    return l === null || l.nativeEvent !== u ? (l = {
      blockedOn: e,
      domEventName: t,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, e !== null && (e = wt(e), e !== null && fd(e)), l) : (l.eventSystemFlags |= a, e = l.targetContainers, n !== null && e.indexOf(n) === -1 && e.push(n), l);
  }
  function ay(l, e, t, a, n) {
    switch (e) {
      case "focusin":
        return bt = Sn(
          bt,
          l,
          e,
          t,
          a,
          n
        ), !0;
      case "dragenter":
        return pt = Sn(
          pt,
          l,
          e,
          t,
          a,
          n
        ), !0;
      case "mouseover":
        return St = Sn(
          St,
          l,
          e,
          t,
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
            e,
            t,
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
            e,
            t,
            a,
            n
          )
        ), !0;
    }
    return !1;
  }
  function hd(l) {
    var e = Vt(l.target);
    if (e !== null) {
      var t = w(e);
      if (t !== null) {
        if (e = t.tag, e === 13) {
          if (e = Z(t), e !== null) {
            l.blockedOn = e, Ts(l.priority, function() {
              rd(t);
            });
            return;
          }
        } else if (e === 31) {
          if (e = F(t), e !== null) {
            l.blockedOn = e, Ts(l.priority, function() {
              rd(t);
            });
            return;
          }
        } else if (e === 3 && t.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = t.tag === 3 ? t.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function qu(l) {
    if (l.blockedOn !== null) return !1;
    for (var e = l.targetContainers; 0 < e.length; ) {
      var t = ts(l.nativeEvent);
      if (t === null) {
        t = l.nativeEvent;
        var a = new t.constructor(
          t.type,
          t
        );
        ai = a, t.target.dispatchEvent(a), ai = null;
      } else
        return e = wt(t), e !== null && fd(e), l.blockedOn = t, !1;
      e.shift();
    }
    return !0;
  }
  function md(l, e, t) {
    qu(l) && t.delete(e);
  }
  function ny() {
    ns = !1, bt !== null && qu(bt) && (bt = null), pt !== null && qu(pt) && (pt = null), St !== null && qu(St) && (St = null), bn.forEach(md), pn.forEach(md);
  }
  function Bu(l, e) {
    l.blockedOn === e && (l.blockedOn = null, ns || (ns = !0, v.unstable_scheduleCallback(
      v.unstable_NormalPriority,
      ny
    )));
  }
  var Yu = null;
  function yd(l) {
    Yu !== l && (Yu = l, v.unstable_scheduleCallback(
      v.unstable_NormalPriority,
      function() {
        Yu === l && (Yu = null);
        for (var e = 0; e < l.length; e += 3) {
          var t = l[e], a = l[e + 1], n = l[e + 2];
          if (typeof a != "function") {
            if (as(a || t) === null)
              continue;
            break;
          }
          var u = wt(t);
          u !== null && (l.splice(e, 3), e -= 3, tc(
            u,
            {
              pending: !0,
              data: n,
              method: t.method,
              action: a
            },
            a,
            n
          ));
        }
      }
    ));
  }
  function Aa(l) {
    function e(r) {
      return Bu(r, l);
    }
    bt !== null && Bu(bt, l), pt !== null && Bu(pt, l), St !== null && Bu(St, l), bn.forEach(e), pn.forEach(e);
    for (var t = 0; t < xt.length; t++) {
      var a = xt[t];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < xt.length && (t = xt[0], t.blockedOn === null); )
      hd(t), t.blockedOn === null && xt.shift();
    if (t = (l.ownerDocument || l).$$reactFormReplay, t != null)
      for (a = 0; a < t.length; a += 3) {
        var n = t[a], u = t[a + 1], i = n[Il] || null;
        if (typeof u == "function")
          i || yd(t);
        else if (i) {
          var s = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[Il] || null)
              s = i.formAction;
            else if (as(n) !== null) continue;
          } else s = i.action;
          typeof s == "function" ? t[a + 1] = s : (t.splice(a, 3), a -= 3), yd(t);
        }
      }
  }
  function vd() {
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
    function e() {
      n !== null && (n(), n = null), a || setTimeout(t, 20);
    }
    function t() {
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
      return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(t, 100), function() {
        a = !0, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), n !== null && (n(), n = null);
      };
    }
  }
  function us(l) {
    this._internalRoot = l;
  }
  Gu.prototype.render = us.prototype.render = function(l) {
    var e = this._internalRoot;
    if (e === null) throw Error(m(409));
    var t = e.current, a = ye();
    cd(t, a, l, e, null, null);
  }, Gu.prototype.unmount = us.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var e = l.containerInfo;
      cd(l.current, 2, null, l, null, null), pu(), e[Zt] = null;
    }
  };
  function Gu(l) {
    this._internalRoot = l;
  }
  Gu.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var e = Ns();
      l = { blockedOn: null, target: l, priority: e };
      for (var t = 0; t < xt.length && e !== 0 && e < xt[t].priority; t++) ;
      xt.splice(t, 0, l), t === 0 && hd(l);
    }
  };
  var gd = W.version;
  if (gd !== "19.2.8")
    throw Error(
      m(
        527,
        gd,
        "19.2.8"
      )
    );
  T.findDOMNode = function(l) {
    var e = l._reactInternals;
    if (e === void 0)
      throw typeof l.render == "function" ? Error(m(188)) : (l = Object.keys(l).join(","), Error(m(268, l)));
    return l = j(e), l = l !== null ? O(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var uy = {
    bundleType: 0,
    version: "19.2.8",
    rendererPackageName: "react-dom",
    currentDispatcherRef: d,
    reconcilerVersion: "19.2.8"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Qu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Qu.isDisabled && Qu.supportsFiber)
      try {
        za = Qu.inject(
          uy
        ), ce = Qu;
      } catch {
      }
  }
  return jn.createRoot = function(l, e) {
    if (!q(l)) throw Error(m(299));
    var t = !1, a = "", n = Er, u = Nr, i = Tr;
    return e != null && (e.unstable_strictMode === !0 && (t = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError)), e = ud(
      l,
      1,
      !1,
      null,
      null,
      t,
      a,
      null,
      n,
      u,
      i,
      vd
    ), l[Zt] = e.current, Qc(l), new us(e);
  }, jn.hydrateRoot = function(l, e, t) {
    if (!q(l)) throw Error(m(299));
    var a = !1, n = "", u = Er, i = Nr, s = Tr, r = null;
    return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (n = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (i = t.onCaughtError), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.formState !== void 0 && (r = t.formState)), e = ud(
      l,
      1,
      !0,
      e,
      t ?? null,
      a,
      n,
      r,
      u,
      i,
      s,
      vd
    ), e.context = id(null), t = e.current, a = ye(), a = $u(a), n = it(a), n.callback = null, ct(t, n, a), t = a, e.current.lanes = t, Ca(e, t), Ue(e), l[Zt] = e.current, Qc(l), new Gu(e);
  }, jn.version = "19.2.8", jn;
}
var _d;
function gy() {
  if (_d) return ss.exports;
  _d = 1;
  function v() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(v);
      } catch (W) {
        console.error(W);
      }
  }
  return v(), ss.exports = vy(), ss.exports;
}
var Lt = gy();
const ds = [
  { id: "graduate_supply_chain_analyst", title: "Graduate Supply-Chain Analyst", scenario: "Import costs and port fees", description: "Calculate the full cost of imported goods, including duty, port fees and exchange-rate changes." },
  { id: "junior_data_analyst", title: "Junior Data Analyst", scenario: "Customer trends and sales data", description: "Find customer trends, check sales data and explain what the numbers mean." },
  { id: "operations_associate", title: "Operations Associate", scenario: "Transport costs and delivery times", description: "Compare delivery costs, fuel use and travel times across routes." },
  { id: "financial_modelling_intern", title: "Financial Modelling Intern", scenario: "Cash flow and business costs", description: "Forecast cash coming in and going out, and see how the business handles changes." }
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
function zd() {
  try {
    const v = JSON.parse(localStorage.getItem("sabi-user") || "null");
    if (v != null && v.role) return v;
  } catch {
  }
  return { role: "student", name: "Ada Okafor", alias: "Ada Okafor", university: "University of Lagos" };
}
function by() {
  var El, ve, Fl, Jl;
  const [v, W] = G.useState(zd), [C, m] = G.useState(location.hash.split("/")[1] || "student"), [q, w] = G.useState(hs.unilag_econ.role), [Z, F] = G.useState(hs.unilag_econ.text), [A, j] = G.useState(null), [O, U] = G.useState(null), [M, cl] = G.useState("idle"), [R, H] = G.useState(""), ul = G.useRef(null), il = G.useRef(q), Rl = G.useRef(!1), gl = G.useRef(!1), ql = C === "student-analytics", Bl = ds.find((d) => d.id === q) || ds[0];
  G.useEffect(() => {
    const d = (Q) => {
      var I;
      return m(((I = Q.detail) == null ? void 0 : I.tabId) || location.hash.split("/")[1]);
    }, T = (Q) => {
      var I;
      return W(((I = Q.detail) == null ? void 0 : I.user) || zd());
    };
    return window.addEventListener("sabi:navigation", d), window.addEventListener("sabi:session", T), () => {
      window.removeEventListener("sabi:navigation", d), window.removeEventListener("sabi:session", T);
    };
  }, []);
  const jl = async (d = {}) => {
    var f;
    const T = d.role || q, Q = d.text ?? Z, I = Object.hasOwn(d, "file") ? d.file : A;
    O != null && O.target_role && O.target_role !== T && U(null);
    const z = new FormData();
    z.append("target_role", T), z.append("student_alias", v.alias || v.name || "Ada Okafor"), Q.trim() && z.append("curriculum_text", Q), I && z.append("file", I), cl("loading"), H("");
    try {
      const S = await fetch("/api/student/curriculum-gap", { method: "POST", body: z }), _ = await S.json();
      if (!S.ok || _.status !== "success") throw new Error(_.detail || "The diagnostic could not be calculated.");
      U(_), cl("ready"), (f = window.showToast) == null || f.call(window, `Course comparison complete: ${_.match_percentage}% match for ${_.target_role_title}.`, "success");
    } catch (S) {
      cl("error"), H(S.message || "The diagnostic could not be calculated. Please try again.");
    }
  };
  G.useEffect(() => {
    if (ql) {
      if (!Rl.current) {
        Rl.current = !0, il.current = q, jl({ role: q, text: Z });
        return;
      }
      if (gl.current) {
        gl.current = !1, il.current = q;
        return;
      }
      il.current !== q && (il.current = q, jl({ role: q, text: Z }));
    }
  }, [ql, q]);
  const K = (d) => {
    const T = hs[d];
    T && (gl.current = T.role !== q, il.current = T.role, w(T.role), F(T.text), j(null), ul.current && (ul.current.value = ""), jl({ role: T.role, text: T.text, file: null }));
  }, Ol = (d) => {
    var T;
    d && (j(d), (T = window.showToast) == null || T.call(window, `Loaded “${d.name}”. Select Analyze to process it.`, "info"));
  }, Ql = () => {
    j(null), ul.current && (ul.current.value = "");
  }, ue = () => {
    var d;
    return (d = window.startBridgeScenario) == null ? void 0 : d.call(window, q);
  }, Kl = O ? Math.max(0, 100 - Number(O.cohort_percentile || 0)) : null;
  return /* @__PURE__ */ c.jsxs("div", { className: "react-curriculum space-y-5", children: [
    /* @__PURE__ */ c.jsxs("header", { className: "react-diagnostic-hero", children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("div", { className: "react-section-eyebrow", children: "YOUR NEXT STEP, MADE CLEAR" }),
        /* @__PURE__ */ c.jsx("h2", { children: "Skills diagnostic" }),
        /* @__PURE__ */ c.jsx("p", { children: "See how your courses line up with the skills employers want for the job you’re preparing for." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-diagnostic-profile", children: [
        /* @__PURE__ */ c.jsx("div", { className: "react-profile-avatar", children: String(v.name || "A").slice(0, 1).toUpperCase() }),
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("b", { children: v.name || "Student" }),
          /* @__PURE__ */ c.jsx("span", { children: v.university || v.organization || "Student profile" })
        ] }),
        /* @__PURE__ */ c.jsx("button", { className: "btn btn-quiet btn-sm", type: "button", disabled: M === "loading", onClick: () => jl(), children: "Update results" })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: "react-diagnostic-input panel", "aria-labelledby": "diagnostic-input-heading", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "react-diagnostic-section-title", children: [
        /* @__PURE__ */ c.jsx("span", { children: "01" }),
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("h3", { id: "diagnostic-input-heading", children: "Add your course information" }),
          /* @__PURE__ */ c.jsx("p", { children: "Choose the kind of job you want, then paste your course list or upload a syllabus." })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-diagnostic-grid", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "react-diagnostic-form", children: [
          /* @__PURE__ */ c.jsx("label", { className: "react-form-label", htmlFor: "react-curriculum-role", children: "Job you’re preparing for" }),
          /* @__PURE__ */ c.jsx("select", { id: "react-curriculum-role", className: "field w-full", value: q, onChange: (d) => w(d.target.value), children: ds.map((d) => /* @__PURE__ */ c.jsxs("option", { value: d.id, children: [
            d.title,
            " · ",
            d.scenario
          ] }, d.id)) }),
          /* @__PURE__ */ c.jsx("p", { className: "react-role-description", children: Bl.description }),
          /* @__PURE__ */ c.jsxs("div", { className: "react-preset-heading", children: [
            /* @__PURE__ */ c.jsx("span", { className: "react-form-label", children: "Use a sample course list" }),
            /* @__PURE__ */ c.jsx("small", { children: "Choose one to see an example" })
          ] }),
          /* @__PURE__ */ c.jsxs("div", { className: "react-preset-list", children: [
            /* @__PURE__ */ c.jsxs("button", { type: "button", className: "react-preset", onClick: () => K("unilag_econ"), children: [
              /* @__PURE__ */ c.jsxs("span", { children: [
                /* @__PURE__ */ c.jsx("b", { children: "Economics" }),
                /* @__PURE__ */ c.jsx("small", { children: "UNILAG · B.Sc." })
              ] }),
              /* @__PURE__ */ c.jsx("i", { children: "↗" })
            ] }),
            /* @__PURE__ */ c.jsxs("button", { type: "button", className: "react-preset", onClick: () => K("ui_compsci"), children: [
              /* @__PURE__ */ c.jsxs("span", { children: [
                /* @__PURE__ */ c.jsx("b", { children: "Computer Science" }),
                /* @__PURE__ */ c.jsx("small", { children: "University of Ibadan · B.Sc." })
              ] }),
              /* @__PURE__ */ c.jsx("i", { children: "↗" })
            ] }),
            /* @__PURE__ */ c.jsxs("button", { type: "button", className: "react-preset", onClick: () => K("abu_accounting"), children: [
              /* @__PURE__ */ c.jsxs("span", { children: [
                /* @__PURE__ */ c.jsx("b", { children: "Accounting" }),
                /* @__PURE__ */ c.jsx("small", { children: "ABU · B.Sc." })
              ] }),
              /* @__PURE__ */ c.jsx("i", { children: "↗" })
            ] })
          ] }),
          /* @__PURE__ */ c.jsxs("div", { className: "react-text-label", children: [
            /* @__PURE__ */ c.jsx("label", { className: "react-form-label", htmlFor: "react-curriculum-text", children: "Paste your course list" }),
            /* @__PURE__ */ c.jsx("button", { type: "button", onClick: () => F(""), children: "Clear" })
          ] }),
          /* @__PURE__ */ c.jsx("textarea", { id: "react-curriculum-text", className: "field react-curriculum-text", value: Z, onChange: (d) => F(d.target.value), placeholder: "Paste course codes, syllabus topics, or transcript modules…" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: "react-diagnostic-upload-column", children: [
          /* @__PURE__ */ c.jsx("span", { className: "react-form-label", children: "Upload a syllabus or transcript" }),
          /* @__PURE__ */ c.jsxs(
            "label",
            {
              className: `react-upload-zone${A ? " has-file" : ""}`,
              htmlFor: "react-curriculum-file",
              onDragOver: (d) => {
                d.preventDefault(), d.currentTarget.classList.add("is-dragging");
              },
              onDragLeave: (d) => d.currentTarget.classList.remove("is-dragging"),
              onDrop: (d) => {
                var T;
                d.preventDefault(), d.currentTarget.classList.remove("is-dragging"), Ol((T = d.dataTransfer.files) == null ? void 0 : T[0]);
              },
              children: [
                /* @__PURE__ */ c.jsx("input", { ref: ul, id: "react-curriculum-file", className: "sr-only", type: "file", accept: ".pdf,.txt,.md,.doc,.docx", onChange: (d) => {
                  var T;
                  return Ol((T = d.target.files) == null ? void 0 : T[0]);
                } }),
                /* @__PURE__ */ c.jsx("span", { className: "react-upload-icon", children: "↑" }),
                /* @__PURE__ */ c.jsx("b", { children: A ? A.name : "Choose a file or drop it here" }),
                /* @__PURE__ */ c.jsx("small", { children: A ? `${Math.max(1, Math.round(A.size / 1024))} KB · Ready to analyze` : "PDF, Word, Markdown, or text · up to 10 MB" }),
                A && /* @__PURE__ */ c.jsx("span", { className: "react-file-clear", onClick: (d) => {
                  d.preventDefault(), Ql();
                }, children: "Remove file" })
              ]
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: "react-upload-note", children: [
            /* @__PURE__ */ c.jsx("span", { children: "⌑" }),
            /* @__PURE__ */ c.jsx("p", { children: "Your course information is used for this comparison and isn’t shown to employers." })
          ] }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-primary react-analyze-button", disabled: M === "loading", onClick: () => jl(), children: M === "loading" ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsx("span", { className: "spinner" }),
            "Checking your courses…"
          ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            "Compare my courses with this job ",
            /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "→" })
          ] }) }),
          M === "error" && /* @__PURE__ */ c.jsx("p", { className: "react-diagnostic-error", role: "alert", children: R })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: "react-diagnostic-results", "aria-live": "polite", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "react-results-heading", children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("div", { className: "react-section-eyebrow", children: "YOUR DIAGNOSTIC" }),
          /* @__PURE__ */ c.jsx("h3", { children: "Where you stand today" })
        ] }),
        /* @__PURE__ */ c.jsx("span", { children: O ? `Based on ${O.target_role_title}` : M === "loading" ? `Assessing ${Bl.title}` : Bl.title })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-result-metrics", children: [
        /* @__PURE__ */ c.jsxs("article", { className: "react-result-card react-result-score", children: [
          /* @__PURE__ */ c.jsx("span", { children: "Coursework match" }),
          /* @__PURE__ */ c.jsxs("div", { children: [
            /* @__PURE__ */ c.jsx("b", { children: O ? O.match_percentage : "—" }),
            /* @__PURE__ */ c.jsx("small", { children: O ? "%" : "Awaiting analysis" })
          ] }),
          /* @__PURE__ */ c.jsx("div", { className: "react-result-track", children: /* @__PURE__ */ c.jsx("i", { style: { width: `${O ? Math.max(0, Math.min(100, O.match_percentage)) : 0}%` } }) }),
          /* @__PURE__ */ c.jsx("small", { children: "Coverage of role-relevant competencies" })
        ] }),
        /* @__PURE__ */ c.jsxs("article", { className: "react-result-card", children: [
          /* @__PURE__ */ c.jsx("span", { children: "Coursework match level" }),
          /* @__PURE__ */ c.jsx("b", { className: "react-result-value", children: (O == null ? void 0 : O.readiness_tier) || "—" }),
          /* @__PURE__ */ c.jsx("small", { children: "Based on the course information you shared" })
        ] }),
        /* @__PURE__ */ c.jsxs("article", { className: "react-result-card", children: [
          /* @__PURE__ */ c.jsx("span", { children: "Compared with graduates" }),
          /* @__PURE__ */ c.jsx("b", { className: "react-result-value", children: Kl === null ? "—" : `Top ${Kl}%` }),
          /* @__PURE__ */ c.jsx("small", { children: O ? "In this sample group" : "A sample group comparison" })
        ] }),
        /* @__PURE__ */ c.jsxs("article", { className: "react-result-card", children: [
          /* @__PURE__ */ c.jsx("span", { children: "Suggested practice task" }),
          /* @__PURE__ */ c.jsx("b", { className: "react-result-bridge", children: (O == null ? void 0 : O.recommended_bridge_scenario) || "—" }),
          /* @__PURE__ */ c.jsxs("button", { type: "button", onClick: ue, disabled: !O, className: "react-bridge-link", children: [
            "Try this task ",
            /* @__PURE__ */ c.jsx("span", { children: "↗" })
          ] })
        ] })
      ] }),
      O ? /* @__PURE__ */ c.jsxs("div", { className: "react-diagnostic-summary", children: [
        /* @__PURE__ */ c.jsx("span", { className: "react-summary-check", children: "✓" }),
        /* @__PURE__ */ c.jsxs("p", { children: [
          /* @__PURE__ */ c.jsx("b", { children: "What we found" }),
          O.summary
        ] })
      ] }) : /* @__PURE__ */ c.jsxs("div", { className: "react-diagnostic-summary is-empty", children: [
        /* @__PURE__ */ c.jsx("span", { children: "i" }),
        /* @__PURE__ */ c.jsxs("p", { children: [
          /* @__PURE__ */ c.jsx("b", { children: "Your results will appear here" }),
          "We’ll compare the courses you share with the skills employers want for your chosen role."
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-competency-grid", children: [
        /* @__PURE__ */ c.jsxs("article", { className: "react-competency-panel", children: [
          /* @__PURE__ */ c.jsxs("div", { className: "react-competency-heading", children: [
            /* @__PURE__ */ c.jsx("span", { className: "react-competency-dot is-strong" }),
            /* @__PURE__ */ c.jsxs("div", { children: [
              /* @__PURE__ */ c.jsx("h4", { children: "Skills your courses cover" }),
              /* @__PURE__ */ c.jsx("p", { children: "Areas where your course list gives you a foundation" })
            ] }),
            /* @__PURE__ */ c.jsx("b", { children: ((El = O == null ? void 0 : O.strong_areas) == null ? void 0 : El.length) || 0 })
          ] }),
          /* @__PURE__ */ c.jsxs("div", { className: "react-competency-list", children: [
            !O && /* @__PURE__ */ c.jsx("p", { className: "react-competency-empty", children: "Compare your courses to see which job skills you’ve already studied." }),
            (ve = O == null ? void 0 : O.strong_areas) == null ? void 0 : ve.map((d) => /* @__PURE__ */ c.jsxs("div", { className: "react-competency-item", children: [
              /* @__PURE__ */ c.jsxs("div", { children: [
                /* @__PURE__ */ c.jsx("b", { children: d.name }),
                /* @__PURE__ */ c.jsxs("span", { children: [
                  d.category,
                  " · ",
                  d.rating
                ] })
              ] }),
              /* @__PURE__ */ c.jsxs("strong", { children: [
                d.score_pct,
                "%"
              ] }),
              /* @__PURE__ */ c.jsx("small", { children: d.assessment }),
              /* @__PURE__ */ c.jsx("i", { children: /* @__PURE__ */ c.jsx("em", { style: { width: `${Math.max(0, Math.min(100, d.score_pct))}%` } }) })
            ] }, d.name))
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("article", { className: "react-competency-panel", children: [
          /* @__PURE__ */ c.jsxs("div", { className: "react-competency-heading", children: [
            /* @__PURE__ */ c.jsx("span", { className: "react-competency-dot is-gap" }),
            /* @__PURE__ */ c.jsxs("div", { children: [
              /* @__PURE__ */ c.jsx("h4", { children: "Skills to practice next" }),
              /* @__PURE__ */ c.jsx("p", { children: "Job skills not clearly covered in your course list" })
            ] }),
            /* @__PURE__ */ c.jsx("b", { children: ((Fl = O == null ? void 0 : O.areas_to_work_on) == null ? void 0 : Fl.length) || 0 })
          ] }),
          /* @__PURE__ */ c.jsxs("div", { className: "react-competency-list", children: [
            !O && /* @__PURE__ */ c.jsx("p", { className: "react-competency-empty", children: "We’ll suggest useful skills to practice after reviewing your course list." }),
            (Jl = O == null ? void 0 : O.areas_to_work_on) == null ? void 0 : Jl.map((d) => /* @__PURE__ */ c.jsxs("div", { className: "react-competency-item react-gap-item", children: [
              /* @__PURE__ */ c.jsxs("div", { children: [
                /* @__PURE__ */ c.jsx("b", { children: d.name }),
                /* @__PURE__ */ c.jsx("span", { children: d.category })
              ] }),
              /* @__PURE__ */ c.jsx("strong", { className: d.severity === "Critical Deficit" ? "is-critical" : "", children: d.severity }),
              /* @__PURE__ */ c.jsx("small", { children: d.gap_description }),
              /* @__PURE__ */ c.jsxs("button", { type: "button", onClick: () => {
                var T;
                return (T = window.startBridgeScenario) == null ? void 0 : T.call(window, q);
              }, children: [
                "Practice in ",
                d.bridge_scenario || Bl.title,
                " ",
                /* @__PURE__ */ c.jsx("span", { children: "→" })
              ] })
            ] }, d.name))
          ] })
        ] })
      ] }),
      O && /* @__PURE__ */ c.jsxs("div", { className: "react-remediation-banner", children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("span", { children: "YOUR NEXT STEP" }),
          /* @__PURE__ */ c.jsx("h4", { children: "Practice a skill you haven’t covered yet" }),
          /* @__PURE__ */ c.jsx("p", { children: "Try a realistic task for your chosen role and put what you’ve learned into practice." })
        ] }),
        /* @__PURE__ */ c.jsxs("button", { type: "button", className: "btn btn-primary", onClick: ue, children: [
          "Try a practice task ",
          /* @__PURE__ */ c.jsx("span", { children: "→" })
        ] })
      ] })
    ] })
  ] });
}
const py = [
  ["all", "All challenges"],
  ["operations_associate", "Operations"],
  ["graduate_supply_chain_analyst", "Supply chain"],
  ["junior_data_analyst", "Data analyst"],
  ["financial_modelling_intern", "Financial modelling"]
];
function Sy() {
  const [v, W] = G.useState([]), [C, m] = G.useState("all"), [q, w] = G.useState(""), [Z, F] = G.useState("loading"), [A, j] = G.useState(""), [O, U] = G.useState(0);
  oy.useEffect(() => {
    let R = !0;
    return F("loading"), fetch("/api/employer/tasks").then(async (H) => {
      const ul = await H.json();
      if (!H.ok || !Array.isArray(ul.tasks)) throw new Error(ul.detail || "Could not load challenges.");
      return ul.tasks;
    }).then((H) => {
      R && (W(H), F("ready"));
    }).catch((H) => {
      R && (j(H.message || "Could not load challenges."), F("error"));
    }), () => {
      R = !1;
    };
  }, [O]);
  const M = G.useMemo(() => v.filter((R) => {
    const H = C === "all" || R.role_track === C, ul = `${R.title} ${R.company_name} ${R.problem_statement} ${(R.skill_tags || []).join(" ")}`.toLowerCase();
    return H && ul.includes(q.trim().toLowerCase());
  }), [v, C, q]), cl = (R) => {
    window.takeEmployerChallenge(R.id, R.role_track);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "react-challenges", children: [
    /* @__PURE__ */ c.jsxs("section", { className: "react-challenges-hero", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "react-challenges-copy", children: [
        /* @__PURE__ */ c.jsx("span", { className: "react-eyebrow", children: "PRACTICE WITH REAL WORK" }),
        /* @__PURE__ */ c.jsx("h2", { children: "Tasks from employers" }),
        /* @__PURE__ */ c.jsx("p", { children: "Try practical tasks shared by employers and Nigerian businesses. Some strong submissions may lead to an interview." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-challenges-hero-stat", children: [
        /* @__PURE__ */ c.jsx("span", { children: "Open tasks" }),
        /* @__PURE__ */ c.jsx("strong", { children: Z === "ready" ? String(v.length).padStart(2, "0") : "—" }),
        /* @__PURE__ */ c.jsx("small", { children: "Across several career paths" })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-challenges-toolbar", children: [
      /* @__PURE__ */ c.jsx("div", { className: "react-challenge-tracks", role: "group", "aria-label": "Filter challenges by role", children: py.map(([R, H]) => /* @__PURE__ */ c.jsx("button", { type: "button", className: C === R ? "is-active" : "", onClick: () => m(R), children: H }, R)) }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-challenge-controls", children: [
        /* @__PURE__ */ c.jsxs("label", { className: "react-search", children: [
          /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "⌕" }),
          /* @__PURE__ */ c.jsx("input", { "aria-label": "Search challenges", placeholder: "Search tasks or skills", value: q, onChange: (R) => w(R.target.value) })
        ] }),
        /* @__PURE__ */ c.jsx("button", { className: "btn btn-quiet btn-sm", onClick: () => U((R) => R + 1), children: "Refresh" })
      ] })
    ] }),
    Z === "loading" && /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-message", children: [
      /* @__PURE__ */ c.jsx("span", { className: "spinner" }),
      " Loading tasks…"
    ] }),
    Z === "error" && /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-message is-error", role: "alert", children: [
      A,
      /* @__PURE__ */ c.jsx("button", { className: "btn btn-quiet btn-sm", onClick: () => U((R) => R + 1), children: "Try again" })
    ] }),
    Z === "ready" && M.length === 0 && /* @__PURE__ */ c.jsx("div", { className: "react-pipeline-message", children: "No tasks match your filters. Try another role or search." }),
    Z === "ready" && M.length > 0 && /* @__PURE__ */ c.jsx("div", { className: "react-challenge-grid", children: M.map((R) => {
      var H, ul;
      return /* @__PURE__ */ c.jsxs("article", { className: "react-challenge-card", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "react-challenge-card-top", children: [
          /* @__PURE__ */ c.jsx("span", { className: "react-challenge-company", children: R.company_name || "Business partner" }),
          /* @__PURE__ */ c.jsxs("span", { className: "react-challenge-time", children: [
            "◷ About ",
            R.timebox_mins || 90,
            " minutes"
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("div", { className: "react-challenge-role", children: R.role_title || ((H = R.role_track) == null ? void 0 : H.replaceAll("_", " ")) }),
        /* @__PURE__ */ c.jsx("h3", { children: R.title }),
        /* @__PURE__ */ c.jsx("p", { className: "react-challenge-description", children: R.problem_statement }),
        !!((ul = R.deliverables) != null && ul.length) && /* @__PURE__ */ c.jsxs("div", { className: "react-challenge-deliverables", children: [
          /* @__PURE__ */ c.jsx("span", { children: "WHAT YOU’LL MAKE" }),
          /* @__PURE__ */ c.jsx("ul", { children: R.deliverables.slice(0, 3).map((il) => /* @__PURE__ */ c.jsxs("li", { children: [
            /* @__PURE__ */ c.jsx("i", { children: "✓" }),
            il
          ] }, il)) })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: "react-challenge-footer", children: [
          /* @__PURE__ */ c.jsx("div", { className: "react-challenge-tags", children: (R.skill_tags || []).slice(0, 4).map((il) => /* @__PURE__ */ c.jsx("span", { children: il }, il)) }),
          /* @__PURE__ */ c.jsxs("button", { className: "react-challenge-cta", onClick: () => cl(R), children: [
            "Try this task ",
            /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "↗" })
          ] })
        ] })
      ] }, R.id);
    }) })
  ] });
}
function Od() {
  try {
    return JSON.parse(localStorage.getItem("sabi-user") || "null") || { name: "Ada Okafor", email: "ada@unilag.edu.ng" };
  } catch {
    return { name: "Ada Okafor", email: "ada@unilag.edu.ng" };
  }
}
function xy() {
  const [v, W] = G.useState(Od), [C, m] = G.useState([]), [q, w] = G.useState(!1), [Z, F] = G.useState(""), [A, j] = G.useState(""), O = async (M) => {
    if (!(!(v != null && v.email) || !(v != null && v.name))) {
      w(!0);
      try {
        const cl = new URLSearchParams({ email: v.email, name: v.name }), R = await fetch(`/api/student/contact-requests?${cl}`, { signal: M }), H = await R.json();
        if (!R.ok) throw new Error(H.detail || "Could not load introduction requests.");
        m(Array.isArray(H.requests) ? H.requests : []), F("");
      } catch (cl) {
        cl.name !== "AbortError" && F(cl.message || "Could not load introduction requests.");
      } finally {
        w(!1);
      }
    }
  };
  G.useEffect(() => {
    const M = (cl) => {
      var R;
      return W(((R = cl.detail) == null ? void 0 : R.user) || Od());
    };
    return window.addEventListener("sabi:session", M), () => window.removeEventListener("sabi:session", M);
  }, []), G.useEffect(() => {
    const M = new AbortController();
    return O(M.signal), () => M.abort();
  }, [v == null ? void 0 : v.email, v == null ? void 0 : v.name]);
  const U = async (M, cl) => {
    j(M.request_id), F("");
    try {
      const R = await fetch("/api/student/contact-requests/decision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request_id: M.request_id, candidate_name: M.candidate_name, candidate_email: v.email, decision: cl })
      }), H = await R.json();
      if (!R.ok) throw new Error(H.detail || "Could not update this request.");
      await O();
    } catch (R) {
      F(R.message || "Could not update this request.");
    } finally {
      j("");
    }
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "react-learning-page", children: [
    /* @__PURE__ */ c.jsxs("section", { className: "react-learning-hero", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "react-learning-hero-copy", children: [
        /* @__PURE__ */ c.jsx("span", { className: "react-eyebrow", children: "YOUR LEARNING PLAN" }),
        /* @__PURE__ */ c.jsx("h1", { children: "Get ready for the work you want to do." }),
        /* @__PURE__ */ c.jsx("p", { children: "Choose a role, set a study pace that works for you, and practice with a realistic task." }),
        /* @__PURE__ */ c.jsxs("div", { className: "react-learning-promise", children: [
          /* @__PURE__ */ c.jsx("span", { children: "01" }),
          " Choose a role ",
          /* @__PURE__ */ c.jsx("i", { children: "→" }),
          /* @__PURE__ */ c.jsx("span", { children: "02" }),
          " Follow your plan ",
          /* @__PURE__ */ c.jsx("i", { children: "→" }),
          /* @__PURE__ */ c.jsx("span", { children: "03" }),
          " Try a real task"
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
        /* @__PURE__ */ c.jsx("span", { className: "react-eyebrow", children: "START HERE" }),
        /* @__PURE__ */ c.jsx("h2", { children: "Your role shapes your study plan and practice task." })
      ] }),
      /* @__PURE__ */ c.jsx("p", { children: "Choose the kind of job you want. We’ll suggest what to study and give you a task to try." })
    ] }),
    (C.length > 0 || q || Z) && /* @__PURE__ */ c.jsxs("section", { className: "panel space-y-4", "aria-labelledby": "intro-requests-title", children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { className: "react-eyebrow", children: "YOUR CHOICE" }),
        /* @__PURE__ */ c.jsx("h2", { id: "intro-requests-title", className: "text-xl font-semibold text-slate-900", children: "Employer introduction requests" }),
        /* @__PURE__ */ c.jsx("p", { className: "mt-1 text-sm text-slate-600", children: "Review a message before deciding whether to share your email address." })
      ] }),
      q && /* @__PURE__ */ c.jsx("p", { className: "text-sm text-slate-500", children: "Checking for requests…" }),
      Z && /* @__PURE__ */ c.jsx("p", { className: "text-sm text-rose-700", role: "alert", children: Z }),
      C.map((M) => /* @__PURE__ */ c.jsxs("article", { className: "rounded-xl border border-slate-200 p-4", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
          /* @__PURE__ */ c.jsxs("div", { children: [
            /* @__PURE__ */ c.jsx("h3", { className: "font-semibold text-slate-900", children: M.employer_organization || M.employer_name }),
            /* @__PURE__ */ c.jsxs("p", { className: "text-xs text-slate-500", children: [
              "About your ",
              M.brief_id ? "verified result" : "profile"
            ] })
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: "rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700", children: M.status })
        ] }),
        /* @__PURE__ */ c.jsx("p", { className: "mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700", children: M.message }),
        M.status === "pending" && /* @__PURE__ */ c.jsxs("div", { className: "mt-3 flex justify-end gap-2", children: [
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-quiet btn-sm", disabled: A === M.request_id, onClick: () => U(M, "declined"), children: "Decline" }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-primary btn-sm", disabled: A === M.request_id, onClick: () => U(M, "accepted"), children: A === M.request_id ? "Saving…" : "Accept and share my email" })
        ] })
      ] }, M.request_id)),
      !q && C.length === 0 && !Z && /* @__PURE__ */ c.jsx("p", { className: "text-sm text-slate-500", children: "You don’t have any introduction requests yet." })
    ] })
  ] });
}
function jy() {
  return /* @__PURE__ */ c.jsxs("div", { className: "react-studio-page", children: [
    /* @__PURE__ */ c.jsxs("section", { className: "react-studio-hero", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "react-studio-copy", children: [
        /* @__PURE__ */ c.jsx("span", { className: "react-eyebrow", children: "SHARE A BUSINESS TASK" }),
        /* @__PURE__ */ c.jsx("h2", { children: "Give graduates a real problem to solve." }),
        /* @__PURE__ */ c.jsx("p", { children: "Describe the work you need help with. Sabi helps turn it into a clear project and hide personal details before you publish it." }),
        /* @__PURE__ */ c.jsxs("div", { className: "react-studio-flow", children: [
          /* @__PURE__ */ c.jsxs("span", { children: [
            /* @__PURE__ */ c.jsx("b", { children: "01" }),
            " Describe it"
          ] }),
          /* @__PURE__ */ c.jsx("i", { children: "→" }),
          /* @__PURE__ */ c.jsxs("span", { children: [
            /* @__PURE__ */ c.jsx("b", { children: "02" }),
            " Review the task"
          ] }),
          /* @__PURE__ */ c.jsx("i", { children: "→" }),
          /* @__PURE__ */ c.jsxs("span", { children: [
            /* @__PURE__ */ c.jsx("b", { children: "03" }),
            " Share it"
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
        /* @__PURE__ */ c.jsx("span", { className: "react-eyebrow", children: "DESCRIBE THE TASK" }),
        /* @__PURE__ */ c.jsx("h3", { children: "Start with the problem you need solved." })
      ] }),
      /* @__PURE__ */ c.jsx("p", { children: "Record a voice note, upload audio, or type a description. Review the details before sharing the task." })
    ] })
  ] });
}
const Ey = ["Accounting", "Economics", "Computer Science", "Finance"], Cd = (v = "") => v.replaceAll("_", " ").replace(/\b\w/g, (W) => W.toUpperCase());
function Ny({ item: v }) {
  const W = Math.max(0, Math.min(100, Math.round(v.demand * 100))), C = Math.max(0, Math.min(100, Math.round(v.coverage * 100))), m = Math.round(v.gap * 100), q = m > 0;
  return /* @__PURE__ */ c.jsxs("article", { className: "react-insight-gap", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "react-insight-gap-heading", children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { children: Cd(v.category || "Skill area") }),
        /* @__PURE__ */ c.jsx("h4", { children: Cd(v.skill) })
      ] }),
      /* @__PURE__ */ c.jsx("b", { className: q ? "is-deficit" : "is-covered", children: q ? `${m}% course gap` : `${Math.abs(m)}% more course coverage` })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-insight-bars", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "react-insight-bar-row", children: [
        /* @__PURE__ */ c.jsx("span", { children: "Asked for in jobs" }),
        /* @__PURE__ */ c.jsx("div", { children: /* @__PURE__ */ c.jsx("i", { className: "demand", style: { width: `${W}%` } }) }),
        /* @__PURE__ */ c.jsxs("b", { children: [
          W,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-insight-bar-row", children: [
        /* @__PURE__ */ c.jsx("span", { children: "Covered in courses" }),
        /* @__PURE__ */ c.jsx("div", { children: /* @__PURE__ */ c.jsx("i", { className: "coverage", style: { width: `${C}%` } }) }),
        /* @__PURE__ */ c.jsxs("b", { children: [
          C,
          "%"
        ] })
      ] })
    ] })
  ] });
}
function Ty({ funnel: v }) {
  var C;
  const W = [
    ["Taught in curriculum", v.taught_pct, "taught"],
    ["Practiced in hands-on work", v.practiced_pct, "practiced"],
    ["Proven on Sabi", v.proven_pct, "proven"]
  ];
  return /* @__PURE__ */ c.jsxs("article", { className: "react-insight-funnel", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "react-insight-funnel-head", children: [
      /* @__PURE__ */ c.jsx("span", { className: "react-insight-funnel-mark", children: (C = v.department) == null ? void 0 : C.slice(0, 1) }),
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { children: "COHORT PROGRESSION" }),
        /* @__PURE__ */ c.jsx("h4", { children: v.department })
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: "react-insight-funnel-steps", children: W.map(([m, q, w], Z) => {
      const F = Math.max(0, Math.min(100, Number(q) || 0));
      return /* @__PURE__ */ c.jsxs("div", { className: "react-insight-step", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "react-insight-step-label", children: [
          /* @__PURE__ */ c.jsxs("span", { children: [
            /* @__PURE__ */ c.jsx("i", { children: String(Z + 1).padStart(2, "0") }),
            m
          ] }),
          /* @__PURE__ */ c.jsxs("b", { children: [
            F,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("div", { className: "react-insight-step-track", children: /* @__PURE__ */ c.jsx("i", { className: w, style: { width: `${F}%` } }) })
      ] }, w);
    }) })
  ] });
}
function Ay() {
  var M, cl, R;
  const [v, W] = G.useState(""), [C, m] = G.useState(null), [q, w] = G.useState("loading"), [Z, F] = G.useState(""), [A, j] = G.useState(0), O = G.useCallback(async () => {
    w("loading"), F("");
    try {
      const H = new URLSearchParams();
      v && H.set("department", v);
      const ul = await fetch(`/api/radar/heatmap${H.size ? `?${H}` : ""}`), il = await ul.json();
      if (!ul.ok) throw new Error(il.detail || "Unable to load talent insights.");
      m(il), w("ready");
    } catch (H) {
      F(H.message || "Unable to load talent insights."), w("error");
    }
  }, [v]);
  G.useEffect(() => {
    O();
  }, [O, A]), G.useEffect(() => {
    const H = () => j((ul) => ul + 1);
    return window.addEventListener("sabi:radar-refresh", H), () => window.removeEventListener("sabi:radar-refresh", H);
  }, []);
  const U = G.useMemo(() => {
    const H = (C == null ? void 0 : C.gaps) || [], ul = H.filter((Rl) => Rl.gap > 0).length, il = H.length ? Math.round(H.reduce((Rl, gl) => Rl + gl.coverage, 0) / H.length * 100) : 0;
    return { gapCount: ul, average: il, postings: (C == null ? void 0 : C.postings_count) || 0 };
  }, [C]);
  return /* @__PURE__ */ c.jsxs("div", { className: "react-insights-page", children: [
    /* @__PURE__ */ c.jsxs("section", { className: "react-insights-hero", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "react-insights-copy", children: [
        /* @__PURE__ */ c.jsx("span", { className: "react-eyebrow", children: "SKILLS AND COURSE CONTENT" }),
        /* @__PURE__ */ c.jsx("h2", { children: "Are graduates learning the skills employers need?" }),
        /* @__PURE__ */ c.jsx("p", { children: "Compare skills requested in job listings with what courses cover and what graduates have practiced." })
      ] }),
      /* @__PURE__ */ c.jsxs("label", { className: "react-insights-filter", children: [
        /* @__PURE__ */ c.jsx("span", { children: "SHOW DEPARTMENT" }),
        /* @__PURE__ */ c.jsxs("select", { "aria-label": "Filter by department", value: v, onChange: (H) => W(H.target.value), children: [
          /* @__PURE__ */ c.jsx("option", { value: "", children: "All departments" }),
          Ey.map((H) => /* @__PURE__ */ c.jsx("option", { value: H, children: H }, H))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-insights-metrics", children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { children: "Job listings reviewed" }),
        /* @__PURE__ */ c.jsx("b", { children: q === "ready" ? U.postings : "—" }),
        /* @__PURE__ */ c.jsx("small", { children: "Sample listings in this view" })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { children: "Skills with a course gap" }),
        /* @__PURE__ */ c.jsx("b", { children: q === "ready" ? U.gapCount : "—" }),
        /* @__PURE__ */ c.jsx("small", { children: "Jobs ask for these more often" })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { children: "Average course coverage" }),
        /* @__PURE__ */ c.jsx("b", { children: q === "ready" ? `${U.average}%` : "—" }),
        /* @__PURE__ */ c.jsx("small", { children: "For the selected departments" })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: "react-insights-section", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "react-insights-section-head", children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("span", { className: "react-eyebrow", children: "SKILLS COMPARISON" }),
          /* @__PURE__ */ c.jsx("h3", { children: "What jobs ask for and courses teach" }),
          /* @__PURE__ */ c.jsx("p", { children: "Higher bars mean more job listings ask for a skill or more courses cover it." })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: "react-insights-legend", children: [
          /* @__PURE__ */ c.jsxs("span", { children: [
            /* @__PURE__ */ c.jsx("i", { className: "demand" }),
            "Asked for in jobs"
          ] }),
          /* @__PURE__ */ c.jsxs("span", { children: [
            /* @__PURE__ */ c.jsx("i", { className: "coverage" }),
            "Covered in courses"
          ] })
        ] })
      ] }),
      q === "loading" && /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-message", children: [
        /* @__PURE__ */ c.jsx("span", { className: "spinner" }),
        " Analyzing the skills landscape…"
      ] }),
      q === "error" && /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-message is-error", role: "alert", children: [
        Z,
        /* @__PURE__ */ c.jsx("button", { className: "btn btn-quiet btn-sm", onClick: () => j((H) => H + 1), children: "Try again" })
      ] }),
      q === "ready" && ((M = C == null ? void 0 : C.gaps) == null ? void 0 : M.length) === 0 && /* @__PURE__ */ c.jsx("div", { className: "react-pipeline-message", children: "No skill data is available for this department yet. Choose another focus area." }),
      q === "ready" && ((cl = C == null ? void 0 : C.gaps) == null ? void 0 : cl.length) > 0 && /* @__PURE__ */ c.jsx("div", { className: "react-insights-gap-grid", children: C.gaps.slice(0, 10).map((H) => /* @__PURE__ */ c.jsx(Ny, { item: H }, H.skill)) })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: "react-insights-section react-insights-cohorts", children: [
      /* @__PURE__ */ c.jsx("div", { className: "react-insights-section-head", children: /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { className: "react-eyebrow", children: "STUDENT PROGRESS" }),
        /* @__PURE__ */ c.jsx("h3", { children: "From learning to showing your work" }),
        /* @__PURE__ */ c.jsx("p", { children: "See how many students have studied, practiced, and demonstrated these skills." })
      ] }) }),
      q === "ready" && ((R = C == null ? void 0 : C.funnels) == null ? void 0 : R.length) > 0 && /* @__PURE__ */ c.jsx("div", { className: "react-insights-funnel-grid", children: C.funnels.map((H) => /* @__PURE__ */ c.jsx(Ty, { funnel: H }, H.department)) })
    ] })
  ] });
}
const _y = [
  { id: "student", title: "My learning", label: "LEARNING", number: "01", caption: "Plan your study and practice" },
  { id: "student-analytics", title: "Coursework check", label: "GROWTH", number: "02", caption: "See what to learn next" },
  { id: "employer-tasks", title: "Practice tasks", label: "OPPORTUNITIES", number: "03", caption: "Try tasks from employers" }
], zy = [
  { id: "employer", title: "Candidates", label: "TALENT", number: "01", caption: "Review work and results" },
  { id: "sme", title: "Share a task", label: "CHALLENGES", number: "02", caption: "Turn a work need into a project" },
  { id: "radar", title: "Skills insights", label: "INSIGHTS", number: "03", caption: "Compare skills and course content" }
];
function Xu() {
  try {
    const v = JSON.parse(localStorage.getItem("sabi-user") || "null");
    if (v != null && v.role) return v;
  } catch {
  }
  return { role: "student", name: "Ada Okafor", organization: "University of Lagos" };
}
function Oy() {
  const [v, W] = G.useState(Xu), [C, m] = G.useState(location.hash.split("/")[1] || (v.role === "employer" ? "employer" : "student")), [q, w] = G.useState(document.documentElement.dataset.mode === "lite"), Z = v.role === "employer" ? zy : _y;
  G.useEffect(() => {
    const A = (U) => {
      var M;
      return m(((M = U.detail) == null ? void 0 : M.tabId) || location.hash.split("/")[1]);
    }, j = (U) => {
      var M;
      return W(((M = U.detail) == null ? void 0 : M.user) || Xu());
    }, O = (U) => {
      var M;
      return w(((M = U.detail) == null ? void 0 : M.mode) === "lite");
    };
    return window.addEventListener("sabi:navigation", A), window.addEventListener("sabi:session", j), window.addEventListener("sabi:mode", O), () => {
      window.removeEventListener("sabi:navigation", A), window.removeEventListener("sabi:session", j), window.removeEventListener("sabi:mode", O);
    };
  }, []);
  const F = (A) => {
    window.switchTab(A), m(A);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 react-shell-inner", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "flex items-center justify-between h-16 react-shell-top", children: [
      /* @__PURE__ */ c.jsxs("a", { href: "#", className: "flex items-center gap-3 react-brand", "aria-label": "Sabi home", children: [
        /* @__PURE__ */ c.jsx("span", { className: "brand-mark", "aria-hidden": "true", children: "S" }),
        /* @__PURE__ */ c.jsxs("span", { className: "react-brand-copy", children: [
          /* @__PURE__ */ c.jsx("span", { className: "react-brand-name", children: "Sabi" }),
          /* @__PURE__ */ c.jsx("span", { className: "react-brand-caption", children: "Practical skills, shown through real work." })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-4 text-sm text-slate-600 react-account", children: [
        /* @__PURE__ */ c.jsxs("div", { id: "auth-user-badge", className: "flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 text-xs shadow-sm react-identity", children: [
          /* @__PURE__ */ c.jsx("span", { id: "auth-user-dot", className: "w-2 h-2 rounded-full bg-emerald-500 status-dot" }),
          /* @__PURE__ */ c.jsx("span", { id: "auth-user-name", className: "font-semibold text-slate-800", children: v.name || "User" }),
          /* @__PURE__ */ c.jsx("span", { id: "auth-user-role-badge", className: v.role === "student" ? "badge-student" : "badge-employer", children: v.role === "student" ? "Student" : `Employer · ${v.organization || v.company || "Partner"}` })
        ] }),
        /* @__PURE__ */ c.jsx("button", { type: "button", onClick: () => window.logout(), className: "btn btn-quiet btn-sm react-portal-switch", children: "Switch Portal" }),
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: "mode-switch",
            role: "switch",
            "aria-checked": String(q),
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
      /* @__PURE__ */ c.jsx("p", { className: "react-nav-eyebrow", children: v.role === "student" ? "STUDENT WORKSPACE" : "EMPLOYER WORKSPACE" }),
      Z.map((A) => /* @__PURE__ */ c.jsxs(
        "button",
        {
          id: `nav-tab-${A.id}`,
          type: "button",
          role: "tab",
          "aria-selected": C === A.id,
          className: `tab-btn ${v.role === "student" ? "student-only" : "employer-only"}${C === A.id ? " is-active" : ""}`,
          "data-tab": A.id,
          onClick: () => F(A.id),
          children: [
            /* @__PURE__ */ c.jsx("span", { className: "react-nav-number", children: A.number }),
            /* @__PURE__ */ c.jsxs("span", { className: "react-nav-copy", children: [
              /* @__PURE__ */ c.jsx("span", { children: A.title }),
              /* @__PURE__ */ c.jsx("small", { children: A.caption })
            ] }),
            /* @__PURE__ */ c.jsx("span", { className: "react-nav-arrow", "aria-hidden": "true", children: "↗" })
          ]
        },
        A.id
      )),
      /* @__PURE__ */ c.jsxs("div", { className: "react-shell-foot", children: [
        /* @__PURE__ */ c.jsx("span", { className: "react-shell-foot-mark", children: "✓" }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("b", { children: "Results you can share" }),
          /* @__PURE__ */ c.jsx("small", { children: "See what was checked and how." })
        ] })
      ] })
    ] })
  ] });
}
function Cy({ candidate: v, blind: W, onContact: C, contactStatus: m }) {
  var j;
  const [q, w] = ((j = v.signals) == null ? void 0 : j.shocks_survived) || [0, 6], Z = W ? v.candidate_alias : v.candidate_name || v.candidate_alias, F = W ? "Identity hidden" : v.candidate_school || "School not provided", A = `${v.verification_url || `/verify/${v.brief_id}`}?blind=${W}`;
  return /* @__PURE__ */ c.jsxs("article", { className: "react-candidate-card", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "react-candidate-card-top", children: [
      /* @__PURE__ */ c.jsx("div", { className: "react-candidate-avatar", "aria-hidden": "true", children: String(Z || "C").slice(0, 1).toUpperCase() }),
      /* @__PURE__ */ c.jsxs("span", { className: "react-verified-pill", children: [
        /* @__PURE__ */ c.jsx("i", {}),
        " Sabi checked"
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-candidate-ident", children: [
      /* @__PURE__ */ c.jsx("h3", { children: Z }),
      /* @__PURE__ */ c.jsx("p", { children: v.target_role }),
      /* @__PURE__ */ c.jsx("span", { children: F })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-candidate-proof", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "react-proof-head", children: [
        /* @__PURE__ */ c.jsx("span", { children: "Changes handled" }),
        /* @__PURE__ */ c.jsxs("b", { children: [
          q,
          /* @__PURE__ */ c.jsxs("small", { children: [
            "/",
            w
          ] })
        ] })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: "react-proof-track", role: "progressbar", "aria-label": "Shock tests survived", "aria-valuenow": q, "aria-valuemin": "0", "aria-valuemax": w, children: /* @__PURE__ */ c.jsx("i", { style: { width: `${w ? Math.min(100, q / w * 100) : 0}%` } }) }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-proof-points", children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("i", { children: "✓" }),
          " Explained their work"
        ] }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("i", { children: "✓" }),
          " Task checks passed"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-candidate-skills", children: [
      /* @__PURE__ */ c.jsx("div", { className: "react-section-eyebrow", children: "SKILLS SHOWN IN THIS TASK" }),
      /* @__PURE__ */ c.jsx("div", { className: "react-skill-list", children: (v.skills || []).map((O) => /* @__PURE__ */ c.jsxs("span", { className: "react-skill-chip", children: [
        /* @__PURE__ */ c.jsx("b", { children: O.skill_name || O.skill_id }),
        /* @__PURE__ */ c.jsxs("small", { children: [
          O.level,
          " · Tier ",
          O.tier
        ] })
      ] }, O.skill_id || O.skill_name)) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-candidate-card-footer", children: [
      /* @__PURE__ */ c.jsxs("span", { className: "react-hash", title: v.sha256_digest || "", children: [
        "SHA · ",
        (v.sha256_digest || "").slice(0, 8)
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "flex flex-wrap justify-end gap-2", children: [
        /* @__PURE__ */ c.jsxs("a", { href: A, target: "_blank", rel: "noopener", className: "react-proof-link", children: [
          "View signed result ",
          /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "↗" })
        ] }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-primary btn-sm", onClick: () => C(v), disabled: !!m, children: m === "pending" ? "Request sent" : m === "accepted" ? "Contact shared" : m === "declined" ? "Request declined" : "Request introduction" })
      ] })
    ] })
  ] });
}
function My() {
  const [v, W] = G.useState(Xu), [C, m] = G.useState(() => window.getBlindMode ? window.getBlindMode() : !0), [q, w] = G.useState(location.hash.split("/")[1] || "student"), [Z, F] = G.useState([]), [A, j] = G.useState("idle"), [O, U] = G.useState(""), [M, cl] = G.useState("all"), [R, H] = G.useState(""), [ul, il] = G.useState(0), [Rl, gl] = G.useState(null), [ql, Bl] = G.useState(""), [jl, K] = G.useState(!1), [Ol, Ql] = G.useState(""), [ue, Kl] = G.useState([]);
  G.useEffect(() => {
    const z = (_) => {
      var D;
      return W(((D = _.detail) == null ? void 0 : D.user) || Xu());
    }, f = (_) => {
      var D;
      return w(((D = _.detail) == null ? void 0 : D.tabId) || location.hash.split("/")[1]);
    }, S = (_) => {
      var D;
      return m(!!((D = _.detail) != null && D.blind));
    };
    return window.addEventListener("sabi:session", z), window.addEventListener("sabi:navigation", f), window.addEventListener("sabi:blind", S), () => {
      window.removeEventListener("sabi:session", z), window.removeEventListener("sabi:navigation", f), window.removeEventListener("sabi:blind", S);
    };
  }, []);
  const El = v.role === "employer" && q === "employer";
  G.useEffect(() => {
    if (!El) return;
    const z = new AbortController();
    return j("loading"), U(""), fetch(`/api/candidates?blind=${C}`, { signal: z.signal }).then(async (f) => {
      if (!f.ok) throw new Error("Candidate pool could not be loaded.");
      return f.json();
    }).then((f) => {
      F(Array.isArray(f) ? f : []), j("ready");
    }).catch((f) => {
      f.name !== "AbortError" && (U(f.message || "Something went wrong while loading the pool."), j("error"));
    }), () => z.abort();
  }, [El, C, ul]), G.useEffect(() => {
    if (!El || !(v != null && v.email)) return;
    const z = new AbortController();
    return fetch(`/api/employer/contact-requests?email=${encodeURIComponent(v.email)}`, { signal: z.signal }).then((f) => f.ok ? f.json() : { requests: [] }).then((f) => Kl(Array.isArray(f.requests) ? f.requests : [])).catch((f) => {
      f.name !== "AbortError" && Kl([]);
    }), () => z.abort();
  }, [El, v == null ? void 0 : v.email, ul]);
  const ve = (z) => {
    gl(z), Bl(`Hello, I reviewed your ${z.target_role || "task"} result and would like to discuss an opportunity with you.`), Ql("");
  }, Fl = async (z) => {
    if (z.preventDefault(), !(v != null && v.email)) {
      Ql("Please sign in with an employer account that has an email address.");
      return;
    }
    K(!0), Ql("");
    try {
      const f = await fetch("/api/contact-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brief_id: Rl.brief_id,
          employer_name: v.name || "Hiring team",
          employer_email: v.email,
          employer_organization: v.organization || v.company || "",
          message: ql
        })
      }), S = await f.json();
      if (!f.ok) throw new Error(S.detail || "The introduction request could not be sent.");
      gl(null), il((_) => _ + 1);
    } catch (f) {
      Ql(f.message || "The introduction request could not be sent.");
    } finally {
      K(!1);
    }
  }, Jl = [...new Set(Z.map((z) => z.target_role).filter(Boolean))].sort(), d = R.trim().toLocaleLowerCase(), T = Z.filter((z) => {
    const f = M === "all" || z.target_role === M, S = [z.candidate_alias, z.candidate_name, z.target_role, ...(z.skills || []).map((_) => _.skill_name)].join(" ").toLocaleLowerCase();
    return f && (!d || S.includes(d));
  }), Q = Z.filter((z) => {
    var _;
    const [f, S] = ((_ = z.signals) == null ? void 0 : _.shocks_survived) || [0, 6];
    return f === S;
  }).length, I = Z.reduce((z, f) => {
    var S;
    return z + (((S = f.skills) == null ? void 0 : S.length) || 0);
  }, 0);
  return /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline space-y-6", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-hero", children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("div", { className: "react-section-eyebrow", children: "REVIEW CANDIDATES" }),
        /* @__PURE__ */ c.jsx("h2", { children: "See what candidates can do." }),
        /* @__PURE__ */ c.jsx("p", { children: "Review practical task results before deciding who to interview. Each result links to a signed record you can verify." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-actions", children: [
        /* @__PURE__ */ c.jsxs("span", { className: `react-blind-status${C ? " is-on" : ""}`, children: [
          /* @__PURE__ */ c.jsx("i", {}),
          " ",
          C ? "Names hidden" : "Names shown"
        ] }),
        /* @__PURE__ */ c.jsx("button", { id: "btn-toggle-blind", type: "button", onClick: () => window.toggleBlindMode(), className: `btn ${C ? "btn-primary" : "btn-quiet"} btn-sm`, children: C ? "Show names" : "Hide names" }),
        /* @__PURE__ */ c.jsx("button", { type: "button", onClick: () => il((z) => z + 1), className: "btn btn-quiet btn-sm", children: "Refresh" })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-stats", "aria-label": "Pipeline summary", children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { children: "Verified candidates" }),
        /* @__PURE__ */ c.jsx("b", { children: A === "loading" ? "—" : Z.length.toString().padStart(2, "0") }),
        /* @__PURE__ */ c.jsx("small", { children: "in your current pool" })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { children: "All task checks passed" }),
        /* @__PURE__ */ c.jsx("b", { children: A === "loading" ? "—" : `${Q}/${Z.length}` }),
        /* @__PURE__ */ c.jsx("small", { children: "passed every change test" })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("span", { children: "Skills shown" }),
        /* @__PURE__ */ c.jsx("b", { children: A === "loading" ? "—" : I.toString().padStart(2, "0") }),
        /* @__PURE__ */ c.jsx("small", { children: "across candidate results" })
      ] })
    ] }),
    ue.length > 0 && /* @__PURE__ */ c.jsxs("section", { className: "panel space-y-3", children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("h3", { className: "font-semibold text-slate-900", children: "Introduction requests" }),
        /* @__PURE__ */ c.jsx("p", { className: "text-xs text-slate-500", children: "Candidates choose whether to share their contact details." })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: "grid gap-2", children: ue.map((z) => /* @__PURE__ */ c.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-3 text-sm", children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("b", { children: z.candidate_alias }),
          /* @__PURE__ */ c.jsx("span", { className: "ml-2 text-xs text-slate-500", children: z.employer_organization || z.employer_name }),
          /* @__PURE__ */ c.jsx("p", { className: "mt-1 text-xs text-slate-600", children: z.message })
        ] }),
        z.status === "accepted" && z.candidate_email ? /* @__PURE__ */ c.jsx("a", { className: "btn btn-primary btn-sm", href: `mailto:${encodeURIComponent(z.candidate_email)}`, children: "Email candidate" }) : /* @__PURE__ */ c.jsx("span", { className: "rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800", children: z.status === "declined" ? "Declined" : "Waiting for candidate" })
      ] }, z.request_id)) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-toolbar", children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("h3", { children: "Candidate results" }),
        /* @__PURE__ */ c.jsx("p", { children: "Filter by role or search for a skill." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-filters", children: [
        /* @__PURE__ */ c.jsxs("label", { className: "react-search", children: [
          /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "⌕" }),
          /* @__PURE__ */ c.jsx("input", { "aria-label": "Search candidates", placeholder: "Search name, role or skill", value: R, onChange: (z) => H(z.target.value) })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: "react-role-filter", children: [
          /* @__PURE__ */ c.jsx("span", { className: "sr-only", children: "Filter by target role" }),
          /* @__PURE__ */ c.jsxs("select", { value: M, onChange: (z) => cl(z.target.value), children: [
            /* @__PURE__ */ c.jsx("option", { value: "all", children: "All roles" }),
            Jl.map((z) => /* @__PURE__ */ c.jsx("option", { value: z, children: z }, z))
          ] })
        ] })
      ] })
    ] }),
    A === "loading" && /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-message", children: [
      /* @__PURE__ */ c.jsx("span", { className: "spinner" }),
      " Loading candidate results…"
    ] }),
    A === "error" && /* @__PURE__ */ c.jsxs("div", { className: "react-pipeline-message is-error", role: "alert", children: [
      O,
      /* @__PURE__ */ c.jsx("button", { className: "btn btn-quiet btn-sm", onClick: () => il((z) => z + 1), children: "Try again" })
    ] }),
    A === "ready" && T.length === 0 && /* @__PURE__ */ c.jsx("div", { className: "react-pipeline-message", children: "No candidates match your filters. Clear the search or choose another role." }),
    A === "ready" && T.length > 0 && /* @__PURE__ */ c.jsx("div", { className: "react-candidate-grid", children: T.map((z) => {
      var f;
      return /* @__PURE__ */ c.jsx(Cy, { candidate: z, blind: C, onContact: ve, contactStatus: ((f = ue.find((S) => S.brief_id === z.brief_id)) == null ? void 0 : f.status) || "" }, z.brief_id);
    }) }),
    Rl && /* @__PURE__ */ c.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4", role: "presentation", onMouseDown: (z) => {
      z.target === z.currentTarget && gl(null);
    }, children: /* @__PURE__ */ c.jsxs("form", { className: "w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-2xl", onSubmit: Fl, role: "dialog", "aria-modal": "true", "aria-labelledby": "contact-request-title", children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("p", { className: "react-eyebrow", children: "CANDIDATE INTRODUCTION" }),
        /* @__PURE__ */ c.jsx("h3", { id: "contact-request-title", className: "text-xl font-semibold text-slate-900", children: "Request an introduction" }),
        /* @__PURE__ */ c.jsxs("p", { className: "mt-1 text-sm text-slate-600", children: [
          "Your message will be shared with ",
          Rl.candidate_alias,
          ". Their contact details stay private unless they accept."
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("label", { className: "block text-sm font-medium text-slate-700", children: [
        "Your message",
        /* @__PURE__ */ c.jsx("textarea", { className: "field mt-1 w-full", rows: "5", minLength: "10", maxLength: "1000", value: ql, onChange: (z) => Bl(z.target.value), required: !0 })
      ] }),
      Ol && /* @__PURE__ */ c.jsx("p", { className: "text-sm text-rose-700", role: "alert", children: Ol }),
      /* @__PURE__ */ c.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "btn btn-quiet", onClick: () => gl(null), children: "Cancel" }),
        /* @__PURE__ */ c.jsx("button", { type: "submit", className: "btn btn-primary", disabled: jl, children: jl ? "Sending…" : "Send request" })
      ] })
    ] }) })
  ] });
}
const Md = document.getElementById("workspace-header-root");
Md && document.documentElement.dataset.mode === "full" && Lt.createRoot(Md).render(/* @__PURE__ */ c.jsx(Oy, {}));
const Dd = document.getElementById("react-student-learning");
Dd && document.documentElement.dataset.mode === "full" && Lt.createRoot(Dd).render(/* @__PURE__ */ c.jsx(xy, {}));
const Ud = document.getElementById("react-task-studio");
Ud && document.documentElement.dataset.mode === "full" && Lt.createRoot(Ud).render(/* @__PURE__ */ c.jsx(jy, {}));
const Rd = document.getElementById("react-talent-insights");
Rd && document.documentElement.dataset.mode === "full" && (window.reactTalentInsightsLoaded = !0, Lt.createRoot(Rd).render(/* @__PURE__ */ c.jsx(Ay, {})));
const Hd = document.getElementById("react-candidate-pipeline");
Hd && document.documentElement.dataset.mode === "full" && (window.reactCandidatePipelineLoaded = !0, Lt.createRoot(Hd).render(/* @__PURE__ */ c.jsx(My, {})));
const qd = document.getElementById("react-curriculum-root");
qd && document.documentElement.dataset.mode === "full" && (window.reactCurriculumLoaded = !0, Lt.createRoot(qd).render(/* @__PURE__ */ c.jsx(by, {})));
const Bd = document.getElementById("react-open-challenges");
Bd && document.documentElement.dataset.mode === "full" && (window.reactOpenChallengesLoaded = !0, Lt.createRoot(Bd).render(/* @__PURE__ */ c.jsx(Sy, {})));
