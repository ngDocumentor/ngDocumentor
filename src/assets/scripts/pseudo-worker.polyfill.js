(function (f) { if (typeof exports === "object" && typeof module !== "undefined") { module.exports = f() } else if (typeof define === "function" && define.amd) { define([], f) } else { var g; if (typeof window !== "undefined") { g = window } else if (typeof global !== "undefined") { g = global } else if (typeof self !== "undefined") { g = self } else { g = this } g.PseudoWorker = f() } })(function () {
  var define, module, exports; return (function () { function r(e, n, t) { function o(i, f) { if (!n[i]) { if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a } var p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
    1: [function (require, module, exports) {
      (function (global) {
        'use strict';

        function doEval(self, __pseudoworker_script) {
          /* jshint unused:false */
          (function () {
            /* jshint evil:true */
            eval(__pseudoworker_script);
          }).call(global);
        }

        function PseudoWorker(path) {
          var messageListeners = [];
          var errorListeners = [];
          var workerMessageListeners = [];
          var workerErrorListeners = [];
          var postMessageListeners = [];
          var terminated = false;
          var script;
          var workerSelf;

          var api = this;

          // custom each loop is for IE8 support
          function executeEach(arr, fun) {
            var i = -1;
            while (++i < arr.length) {
              if (arr[i]) {
                fun(arr[i]);
              }
            }
          }

          function callErrorListener(err) {
            return function (listener) {
              listener({
                type: 'error',
                error: err,
                message: err.message
              });
            };
          }

          function addEventListener(type, fun) {
            /* istanbul ignore else */
            if (type === 'message') {
              messageListeners.push(fun);
            } else if (type === 'error') {
              errorListeners.push(fun);
            }
          }

          function removeEventListener(type, fun) {
            var listeners;
            /* istanbul ignore else */
            if (type === 'message') {
              listeners = messageListeners;
            } else if (type === 'error') {
              listeners = errorListeners;
            } else {
              return;
            }
            var i = -1;
            while (++i < listeners.length) {
              var listener = listeners[i];
              if (listener === fun) {
                delete listeners[i];
                break;
              }
            }
          }

          function postError(err) {
            var callFun = callErrorListener(err);
            if (typeof api.onerror === 'function') {
              callFun(api.onerror);
            }
            if (workerSelf && typeof workerSelf.onerror === 'function') {
              callFun(workerSelf.onerror);
            }
            executeEach(errorListeners, callFun);
            executeEach(workerErrorListeners, callFun);
          }

          function runPostMessage(msg) {
            function callFun(listener) {
              try {
                listener({ data: msg });
              } catch (err) {
                postError(err);
              }
            }

            if (workerSelf && typeof workerSelf.onmessage === 'function') {
              callFun(workerSelf.onmessage);
            }
            executeEach(workerMessageListeners, callFun);
          }

          function postMessage(msg) {
            if (typeof msg === 'undefined') {
              throw new Error('postMessage() requires an argument');
            }
            if (terminated) {
              return;
            }
            if (!script) {
              postMessageListeners.push(msg);
              return;
            }
            runPostMessage(msg);
          }

          function terminate() {
            terminated = true;
          }

          function workerPostMessage(msg) {
            if (terminated) {
              return;
            }
            function callFun(listener) {
              listener({
                data: msg
              });
            }
            if (typeof api.onmessage === 'function') {
              callFun(api.onmessage);
            }
            executeEach(messageListeners, callFun);
          }

          function workerAddEventListener(type, fun) {
            /* istanbul ignore else */
            if (type === 'message') {
              workerMessageListeners.push(fun);
            } else if (type === 'error') {
              workerErrorListeners.push(fun);
            }
          }

          var xhr = new XMLHttpRequest();

          xhr.open('GET', path);
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              if (xhr.status >= 200 && xhr.status < 400) {
                script = xhr.responseText;
                workerSelf = {
                  postMessage: workerPostMessage,
                  addEventListener: workerAddEventListener,
                  close: terminate
                };
                doEval(workerSelf, script);
                var currentListeners = postMessageListeners;
                postMessageListeners = [];
                for (var i = 0; i < currentListeners.length; i++) {
                  runPostMessage(currentListeners[i]);
                }
              } else {
                postError(new Error('cannot find script ' + path));
              }
            }
          };

          xhr.send();

          api.postMessage = postMessage;
          api.addEventListener = addEventListener;
          api.removeEventListener = removeEventListener;
          api.terminate = terminate;

          return api;
        }

        module.exports = PseudoWorker;

      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}], 2: [function (require, module, exports) {
      (function (global) {
        'use strict';

        var PseudoWorker = require(1);

        if (typeof Worker === 'undefined') {
          global.Worker = PseudoWorker;
        }

        module.exports = PseudoWorker;
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, { "1": 1 }]
  }, {}, [2])(2)
}); 