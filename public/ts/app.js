/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js ***!
  \*********************************************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./resources/ts/app.ts":
/*!*****************************!*\
  !*** ./resources/ts/app.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "baseUrl": () => (/* binding */ baseUrl)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_localstorageVars__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/localstorageVars */ "./resources/ts/utils/localstorageVars.ts");
/* harmony import */ var _pages_body__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/body */ "./resources/ts/pages/body/index.ts");
/* harmony import */ var _pages_cart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/cart */ "./resources/ts/pages/cart/index.ts");
/* harmony import */ var _pages_header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/header */ "./resources/ts/pages/header/index.ts");
/* harmony import */ var _pages_product__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/product */ "./resources/ts/pages/product/index.ts");
/* harmony import */ var _pages_product_details__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/product-details */ "./resources/ts/pages/product-details/index.ts");


var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};







var baseUrl = "https://epservice.herokuapp.com/api/v1";
var token = localStorage.getItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_1__.itemLocalStorageToken);
var orderId = localStorage.getItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_1__.itemLocalStorageOrderId);

window.loadItems = function () {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
    var response, items;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fetch("".concat(baseUrl, "/Item/ShowByQrCode/").concat(orderId), {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: "Bearer ".concat(token)
              }
            });

          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.json();

          case 6:
            items = _context.sent;
            console.log(items.Data.Data);
            window.fillVariables = Object.assign({}, window.fillVariables);
            localStorage.setItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_1__.itemLocalStorageItems, JSON.stringify(items.Data.Data));
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));
};

window.loadCategories = function () {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
    var response, categories;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return fetch("".concat(baseUrl, "/CategoryItem/ShowTree"), {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: "Bearer ".concat(token)
              }
            });

          case 3:
            response = _context2.sent;
            _context2.next = 6;
            return response.json();

          case 6:
            categories = _context2.sent;
            window.fillVariables = Object.assign(Object.assign({}, window.fillVariables), {
              categories: categories.Data.Data[0]
            });
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));
};

window.header = _pages_header__WEBPACK_IMPORTED_MODULE_4__.header;
window.body = _pages_body__WEBPACK_IMPORTED_MODULE_2__.body;
window.products = _pages_product__WEBPACK_IMPORTED_MODULE_5__.products;
window.productDetails = _pages_product_details__WEBPACK_IMPORTED_MODULE_6__.productDetails;
window.cart = _pages_cart__WEBPACK_IMPORTED_MODULE_3__.cart;

/***/ }),

/***/ "./resources/ts/pages/BaseClass.ts":
/*!*****************************************!*\
  !*** ./resources/ts/pages/BaseClass.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseClass": () => (/* binding */ BaseClass)
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var BaseClass = /*#__PURE__*/_createClass(function BaseClass() {
  _classCallCheck(this, BaseClass);
  /**
   * @param selector
   * @param scope
   * @returns
   */


  this.$ = function (selector) {
    var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return scope.querySelector(selector);
  };
});

/***/ }),

/***/ "./resources/ts/pages/body/index.ts":
/*!******************************************!*\
  !*** ./resources/ts/pages/body/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "body": () => (/* binding */ body)
/* harmony export */ });
var body = function body() {
  var isDefaultNavigation = window.fillVariables.isDefaultNavigation;

  if (!isDefaultNavigation) {
    var main = document.querySelector("main");
    main.style.padding = "0";
  }
};

/***/ }),

/***/ "./resources/ts/pages/cart/CartList.ts":
/*!*********************************************!*\
  !*** ./resources/ts/pages/cart/CartList.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CartList": () => (/* binding */ CartList)
/* harmony export */ });
/* harmony import */ var _utils_formatPrice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../utils/formatPrice */ "./resources/ts/utils/formatPrice.ts");
/* harmony import */ var _utils_limitLetters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/limitLetters */ "./resources/ts/utils/limitLetters.ts");
/* harmony import */ var _utils_localstorageVars__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/localstorageVars */ "./resources/ts/utils/localstorageVars.ts");
/* harmony import */ var _BaseClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../BaseClass */ "./resources/ts/pages/BaseClass.ts");
/* harmony import */ var _FinalizeCart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FinalizeCart */ "./resources/ts/pages/cart/FinalizeCart.ts");
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}






var CartList = /*#__PURE__*/function (_BaseClass) {
  _inherits(CartList, _BaseClass);

  var _super = _createSuper(CartList);

  function CartList() {
    _classCallCheck(this, CartList);

    return _super.call(this);
  }

  _createClass(CartList, [{
    key: "createElementsHeader",
    value: function createElementsHeader() {
      // header
      this.cartSectionButtonAndMarketplaceName = document.createElement("div");
      this.cartArrowBackButton = document.createElement("button");
      this.cartArrowBackImage = document.createElement("img");
      this.cartContainer = this.$(".cart-container");
      this.cartMarketplaceName = document.createElement("h2");
      this.cartClearButton = document.createElement("button");
      this.cartClearImage = document.createElement("img");
    }
  }, {
    key: "addClassHeader",
    value: function addClassHeader() {
      //header
      this.cartSectionButtonAndMarketplaceName.classList.add("cart-section-button-and-marketplace-name");
      this.cartArrowBackButton.classList.add("cart-arrow-back-button");
      this.cartArrowBackImage.classList.add("cart-arrow-back-imag");
      this.cartMarketplaceName.classList.add("cart-marketplace-name");
      this.cartClearButton.classList.add("cart-clear-button");
      this.cartClearImage.classList.add("cart-clear-image");
    }
  }, {
    key: "createElementsCartItem",
    value: function createElementsCartItem() {
      // cart item
      this.cartItemContainer = document.createElement("div");
      this.cartItemContent = document.createElement("div");
      this.cartItemContainerImage = document.createElement("div");
      this.cartItemImage = document.createElement("img");
      this.cartItemNameAndPrice = document.createElement("div");
      this.cartItemName = document.createElement("h4");
      this.cartItemPrice = document.createElement("p");
      this.cartItemAddOrRemoveContainer = document.createElement("div");
      this.cartItemAdd = document.createElement("button");
      this.cartItemAddOrRemoveTotal = document.createElement("p");
      this.cartItemRemove = document.createElement("button");
      this.cartItemDescription = document.createElement("h5");
      this.cartItemTotalPrice = document.createElement("div");
    }
  }, {
    key: "addClassCartItem",
    value: function addClassCartItem() {
      //cart
      this.cartItemContent.classList.add("cart-item-content");
      this.cartItemContainer.classList.add("cart-item-container");
      this.cartItemContainerImage.classList.add("cart-item-container-image");
      this.cartItemImage.classList.add("cart-item-image");
      this.cartItemNameAndPrice.classList.add("cart-item-name-and-price");
      this.cartItemName.classList.add("cart-item-name");
      this.cartItemPrice.classList.add("cart-item-price");
      this.cartItemAddOrRemoveContainer.classList.add("cart-item-add-or-remove-container");
      this.cartItemAdd.classList.add("cart-item-add");
      this.cartItemAddOrRemoveTotal.classList.add("cart-item-add-or-remove-total");
      this.cartItemRemove.classList.add("cart-item-remove");
      this.cartItemDescription.classList.add("cart-item-description");
      this.cartItemTotalPrice.classList.add("cart-item-total-price");
    }
  }, {
    key: "createElementsAmountSum",
    value: function createElementsAmountSum() {
      // amount sum
      this.cartTotalContainer = document.createElement("div");
      this.cartTotalName = document.createElement("p");
      this.cartTotalPrice = document.createElement("p");
      this.cartTaxContainer = document.createElement("div");
      this.cartTaxName = document.createElement("p");
      this.cartTaxPrice = document.createElement("p");
      this.cartSubTotalContainer = document.createElement("div");
      this.cartSubTotalName = document.createElement("p");
      this.cartSubTotalPrice = document.createElement("p");
      this.cartAmountSumContainer = document.createElement("div");
      this.cartFinalizeButton = document.createElement("button");
    }
  }, {
    key: "addClassAmountSum",
    value: function addClassAmountSum() {
      this.cartTotalContainer.classList.add("cart-total-container");
      this.cartTotalName.classList.add("cart-total-name");
      this.cartTotalPrice.classList.add("cart-total-price");
      this.cartTaxContainer.classList.add("cart-tax-container");
      this.cartTaxName.classList.add("cart-tax-name");
      this.cartTaxPrice.classList.add("cart-tax-price");
      this.cartSubTotalContainer.classList.add("cart-sub-total-container");
      this.cartSubTotalName.classList.add("cart-sub-total-name");
      this.cartSubTotalPrice.classList.add("cart-sub-total-price");
      this.cartFinalizeButton.classList.add("cart-finalize-button");
    }
  }, {
    key: "amountSumMount",
    value: function amountSumMount() {
      this.cartTotalName.textContent = "Total";
      this.cartTotalContainer.appendChild(this.cartTotalName);
      this.cartTotalContainer.appendChild(this.cartTotalPrice);
      this.cartTaxName.textContent = "Taxa";
      this.cartTaxPrice.textContent = "R$ 0.00";
      this.cartTaxContainer.appendChild(this.cartTaxName);
      this.cartTaxContainer.appendChild(this.cartTaxPrice);
      this.cartSubTotalName.textContent = "Subtotal";
      this.cartSubTotalPrice.textContent = "R$ 50.00";
      this.cartSubTotalContainer.appendChild(this.cartSubTotalName);
      this.cartSubTotalContainer.appendChild(this.cartSubTotalPrice);
      this.cartAmountSumContainer.appendChild(this.cartTotalContainer);
      this.cartAmountSumContainer.appendChild(this.cartTaxContainer);
      this.cartAmountSumContainer.appendChild(this.cartSubTotalContainer);
      this.cartAmountSumContainer.appendChild(this.cartFinalizeButton);
      this.cartContainer.appendChild(this.cartAmountSumContainer);
      this.cartFinalizeButton.textContent = "Finalizar Pedido";
      this.cartFinalizeButton.addEventListener("click", function () {
        new _FinalizeCart__WEBPACK_IMPORTED_MODULE_4__.FinalizeCart().execute();
      });
    }
  }, {
    key: "amountSumCalc",
    value: function amountSumCalc() {
      var storage = localStorage.getItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_2__.itemLocalstorage);

      if (storage) {
        if (!this.cartAmountSumContainer.classList.contains("cart-amount-sum-container")) {
          this.cartAmountSumContainer.classList.add("cart-amount-sum-container");
          this.amountSumMount();
        }

        var items = JSON.parse(storage);
        var total = items.reduce(function (increment, item) {
          increment += item.total;
          return increment;
        }, 0);
        this.cartTotalPrice.textContent = (0,_utils_formatPrice__WEBPACK_IMPORTED_MODULE_0__.formatPrice)(total);
      }
    }
  }, {
    key: "noExistsItemListMessage",
    value: function noExistsItemListMessage() {
      console.log("Caiu aqui");
      this.cartNoExistsCartListMessage = document.createElement("div");
      var storage = localStorage.getItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_2__.itemLocalstorage);
      var items = JSON.parse(storage || '[]');
      console.log(items);

      if (!this.cartNoExistsCartListMessage.classList.contains("cart-no-exists-cart-list-message") && !items.length) {
        this.cartNoExistsCartListMessage.classList.add("cart-no-exists-cart-list-message");
        this.cartNoExistsCartListMessage.textContent = "Você não tem nenhum item adicionado ao carrinho ainda!";
        this.cartContainer.appendChild(this.cartNoExistsCartListMessage);
      }
    }
  }, {
    key: "header",
    value: function header() {
      var _this = this;

      this.cartArrowBackButton.appendChild(this.cartArrowBackImage);
      this.cartArrowBackButton.addEventListener("click", function () {
        location.href = "/product";
      });
      this.cartClearButton.appendChild(this.cartClearImage);
      this.cartClearButton.addEventListener("click", function () {
        _this.cartItemContainer.remove();

        var items = _toConsumableArray(document.querySelectorAll(".cart-item-container"));

        items.forEach(function (element) {
          element.remove();
        });

        _this.cartAmountSumContainer.remove();

        localStorage.removeItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_2__.itemLocalstorage);

        _this.noExistsItemListMessage();
      });
      this.cartArrowBackImage.setAttribute("src", "/images/icon-back.svg");
      this.cartClearImage.setAttribute("src", "/images/icon-clear.svg");
      this.cartSectionButtonAndMarketplaceName.appendChild(this.cartArrowBackButton);
      this.cartSectionButtonAndMarketplaceName.appendChild(this.cartMarketplaceName);
      this.cartSectionButtonAndMarketplaceName.appendChild(this.cartClearButton);
      this.cartMarketplaceName.textContent = "Carrinho";
      this.cartContainer.appendChild(this.cartSectionButtonAndMarketplaceName);
    }
  }, {
    key: "itemCart",
    value: function itemCart(cartItem) {
      this.cartItemImage.setAttribute("src", cartItem.item.Image || '/images/no-image.png');
      this.cartItemContainerImage.appendChild(this.cartItemImage);
      this.cartItemName.textContent = cartItem.item.Name;
      this.cartItemPrice.textContent = (0,_utils_formatPrice__WEBPACK_IMPORTED_MODULE_0__.formatPrice)(parseFloat(cartItem.item.Amount));
      this.cartItemNameAndPrice.appendChild(this.cartItemName);
      this.cartItemNameAndPrice.appendChild(this.cartItemPrice);
      this.cartItemAdd.textContent = "+";
      this.cartItemRemove.textContent = "-";
      this.cartItemAddOrRemoveTotal.textContent = String(cartItem.amount);
      this.cartItemAddOrRemoveContainer.appendChild(this.cartItemAdd);
      this.cartItemAddOrRemoveContainer.appendChild(this.cartItemAddOrRemoveTotal);
      this.cartItemAddOrRemoveContainer.appendChild(this.cartItemRemove);
      this.cartItemContent.appendChild(this.cartItemContainerImage);
      this.cartItemContent.appendChild(this.cartItemNameAndPrice);
      this.cartItemContent.appendChild(this.cartItemAddOrRemoveContainer);
      this.cartItemDescription.textContent = (0,_utils_limitLetters__WEBPACK_IMPORTED_MODULE_1__.limitLetters)(cartItem.item.Description, 28);
      this.cartItemContainer.style.borderTopColor = window.fillVariables.themeColor;
      this.cartItemContainer.appendChild(this.cartItemContent);
      this.cartItemContainer.appendChild(this.cartItemDescription);
      this.cartItemTotalPrice.textContent = "Total " + (0,_utils_formatPrice__WEBPACK_IMPORTED_MODULE_0__.formatPrice)(cartItem.total);
      this.cartItemTotalPrice.style.backgroundColor = window.fillVariables.themeColor;
      this.cartItemContainer.appendChild(this.cartItemTotalPrice);
      this.increase(cartItem, this.cartItemAdd, this.cartItemAddOrRemoveTotal, this.cartItemTotalPrice);
      this.decrease(cartItem, this.cartItemRemove, this.cartItemAddOrRemoveTotal, this.cartItemTotalPrice);
      this.cartContainer.appendChild(this.cartItemContainer);
    }
  }, {
    key: "make",
    value: function make() {
      var _this2 = this;

      var storage = localStorage.getItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_2__.itemLocalstorage);

      if (storage) {
        var items = JSON.parse(storage);
        items.forEach(function (item) {
          _this2.createElementsCartItem();

          _this2.addClassCartItem();

          _this2.itemCart(item);
        });
      }
    }
  }, {
    key: "addToCart",
    value: function addToCart(cartItem, total, totalPrice) {
      var storage = localStorage.getItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_2__.itemLocalstorage);

      if (storage) {
        var itemsLocalStorage = JSON.parse(storage);
        var itemSelected = itemsLocalStorage.find(function (item) {
          return item.item.Id == cartItem.item.Id;
        });
        itemSelected.amount = total;
        itemSelected.total = total * parseFloat(itemSelected.item.Amount);
        var findRemoveCurrentCard = itemsLocalStorage.filter(function (item) {
          return item.item.Id != itemSelected.item.Id;
        });
        var newCart = [].concat(_toConsumableArray(findRemoveCurrentCard), [itemSelected]);
        localStorage.setItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_2__.itemLocalstorage, JSON.stringify(newCart));
        totalPrice.textContent = "Total " + (0,_utils_formatPrice__WEBPACK_IMPORTED_MODULE_0__.formatPrice)(itemSelected.total);
      }
    }
  }, {
    key: "increase",
    value: function increase(itemCart, element, target, totalPrice) {
      var _this3 = this;

      element.addEventListener("click", function () {
        var total = parseInt(target.textContent);

        if (typeof total === "number") {
          total++;
          target.textContent = String(total);

          _this3.addToCart(itemCart, total, totalPrice);

          _this3.amountSumCalc();
        }
      });
    }
  }, {
    key: "decrease",
    value: function decrease(itemCart, element, target, totalPrice) {
      var _this4 = this;

      element.addEventListener("click", function () {
        var total = parseInt(target.textContent);

        if (typeof total === "number" && total > 1) {
          total--;
          target.textContent = String(total);

          _this4.addToCart(itemCart, total, totalPrice);

          _this4.amountSumCalc();
        }
      });
    }
  }, {
    key: "execute",
    value: function execute() {
      this.createElementsHeader();
      this.addClassHeader();
      this.header();
      this.make();
      this.createElementsAmountSum();
      this.addClassAmountSum();
      this.amountSumCalc();
      this.noExistsItemListMessage();
    }
  }]);

  return CartList;
}(_BaseClass__WEBPACK_IMPORTED_MODULE_3__.BaseClass);

/***/ }),

/***/ "./resources/ts/pages/cart/FinalizeCart.ts":
/*!*************************************************!*\
  !*** ./resources/ts/pages/cart/FinalizeCart.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FinalizeCart": () => (/* binding */ FinalizeCart)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_localstorageVars__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/localstorageVars */ "./resources/ts/utils/localstorageVars.ts");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app */ "./resources/ts/app.ts");


function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};




var FinalizeCart = /*#__PURE__*/function () {
  function FinalizeCart() {
    _classCallCheck(this, FinalizeCart);
  }

  _createClass(FinalizeCart, [{
    key: "execute",
    value: function execute() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var storageItems, token, orderId, items, Data, body, response, jsonResponse;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                storageItems = localStorage.getItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_1__.itemLocalstorage);

                if (!storageItems) {
                  _context.next = 20;
                  break;
                }

                token = localStorage.getItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_1__.itemLocalStorageToken);
                orderId = localStorage.getItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_1__.itemLocalStorageOrderId);
                items = JSON.parse(storageItems);
                Data = items.reduce(function (increment, cartItem, array, index) {
                  increment.push({
                    ItemId: cartItem.item.Id,
                    Quantity: cartItem.amount
                  });
                  return increment;
                }, []);
                body = {
                  QrCode: orderId,
                  Data: Data
                };
                _context.prev = 7;
                _context.next = 10;
                return fetch("".concat(_app__WEBPACK_IMPORTED_MODULE_2__.baseUrl, "/OrderItem/AddCollectionEcommerce"), {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: "Bearer ".concat(token)
                  },
                  body: JSON.stringify(body)
                });

              case 10:
                response = _context.sent;
                _context.next = 13;
                return response.json();

              case 13:
                jsonResponse = _context.sent;

                if (jsonResponse.Success) {
                  console.log("Success");
                }

                _context.next = 20;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](7);
                console.log(_context.t0);

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[7, 17]]);
      }));
    }
  }]);

  return FinalizeCart;
}();

/***/ }),

/***/ "./resources/ts/pages/cart/index.ts":
/*!******************************************!*\
  !*** ./resources/ts/pages/cart/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cart": () => (/* binding */ cart)
/* harmony export */ });
/* harmony import */ var _CartList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CartList */ "./resources/ts/pages/cart/CartList.ts");

var cart = function cart() {
  new _CartList__WEBPACK_IMPORTED_MODULE_0__.CartList().execute();
};

/***/ }),

/***/ "./resources/ts/pages/header/AmountItemsCard.ts":
/*!******************************************************!*\
  !*** ./resources/ts/pages/header/AmountItemsCard.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AmountItemsCard": () => (/* binding */ AmountItemsCard)
/* harmony export */ });
/* harmony import */ var _utils_localstorageVars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/localstorageVars */ "./resources/ts/utils/localstorageVars.ts");
/* harmony import */ var _BaseClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseClass */ "./resources/ts/pages/BaseClass.ts");
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}



var AmountItemsCard = /*#__PURE__*/function (_BaseClass) {
  _inherits(AmountItemsCard, _BaseClass);

  var _super = _createSuper(AmountItemsCard);

  function AmountItemsCard() {
    var _this;

    _classCallCheck(this, AmountItemsCard);

    _this = _super.call(this);
    _this.badge = _this.$(".global-header-total-items-cart");
    return _this;
  }

  _createClass(AmountItemsCard, [{
    key: "execute",
    value: function execute() {
      if (this.getitems() && this.badge != null) {
        this.badge.style.display = "flex";
        this.badge.textContent = String(this.getitems().length);
      }
    }
  }, {
    key: "getitems",
    value: function getitems() {
      var storage = localStorage.getItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_0__.itemLocalstorage);
      var items;

      if (storage) {
        items = JSON.parse(storage);
      }

      return items;
    }
  }]);

  return AmountItemsCard;
}(_BaseClass__WEBPACK_IMPORTED_MODULE_1__.BaseClass);

/***/ }),

/***/ "./resources/ts/pages/header/ScrollChangeSize.ts":
/*!*******************************************************!*\
  !*** ./resources/ts/pages/header/ScrollChangeSize.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrollChangeSize": () => (/* binding */ ScrollChangeSize)
/* harmony export */ });
/* harmony import */ var _BaseClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseClass */ "./resources/ts/pages/BaseClass.ts");
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}


var ScrollChangeSize = /*#__PURE__*/function (_BaseClass) {
  _inherits(ScrollChangeSize, _BaseClass);

  var _super = _createSuper(ScrollChangeSize);

  function ScrollChangeSize() {
    var _this;

    _classCallCheck(this, ScrollChangeSize);

    _this = _super.call(this);
    var categories = window.fillVariables.categories;
    _this.textHeader = _this.$(".global-header-company-name");
    _this.main = _this.$("main");
    _this.containerLogo = _this.$(".global-header-logo");
    _this.logo = _this.$(".global-header-logo-image");
    _this.text = _this.$(".global-header-company-name");
    _this.header = _this.$("header");
    _this.textHeader.textContent = categories.Name;
    _this.header.style.backgroundColor = "#f5f5f5";
    _this.header.style.borderBottom = ".3px solid #DDDDDD";
    _this.header.style.justifyContent = "stretch";
    _this.header.style.height = "80px";
    _this.main.style.paddingTop = "100px";
    return _this;
  }
  /**
   *  @return void
   *  Get scroll position, if 60 or more rezite to 40px, else 80px
   */


  _createClass(ScrollChangeSize, [{
    key: "onScroll",
    value: function onScroll() {
      var _this2 = this;

      window.addEventListener("scroll", function (e) {
        var top = window.scrollY;

        if (top > 60) {
          _this2.header.style.backgroundColor = "rgba(245,245,245,.9";
          _this2.header.style.height = "40px";
          _this2.containerLogo.style.marginRight = "8px";
          _this2.header.style.justifyContent = "center";
          _this2.logo.style.height = "18px";
          _this2.text.style.fontSize = "16px";
          return;
        }

        _this2.header.style.backgroundColor = "#f5f5f5";
        _this2.header.style.height = "80px";
        _this2.containerLogo.style.marginRight = "20px";
        _this2.header.style.justifyContent = "stretch";
        _this2.logo.style.height = "36px";
        _this2.text.style.fontSize = "18px";
      });
    }
  }]);

  return ScrollChangeSize;
}(_BaseClass__WEBPACK_IMPORTED_MODULE_0__.BaseClass);

/***/ }),

/***/ "./resources/ts/pages/header/index.ts":
/*!********************************************!*\
  !*** ./resources/ts/pages/header/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "header": () => (/* binding */ header)
/* harmony export */ });
/* harmony import */ var _AmountItemsCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AmountItemsCard */ "./resources/ts/pages/header/AmountItemsCard.ts");
/* harmony import */ var _ScrollChangeSize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ScrollChangeSize */ "./resources/ts/pages/header/ScrollChangeSize.ts");


var header = function header() {
  var _window$fillVariables = window.fillVariables,
      isMobile = _window$fillVariables.isMobile,
      isDefaultNavigation = _window$fillVariables.isDefaultNavigation; // If not mobile device, WEB

  new _AmountItemsCard__WEBPACK_IMPORTED_MODULE_0__.AmountItemsCard().execute();

  if (!isMobile && isDefaultNavigation) {
    new _ScrollChangeSize__WEBPACK_IMPORTED_MODULE_1__.ScrollChangeSize().onScroll();
  }
};

/***/ }),

/***/ "./resources/ts/pages/product-details/AddToCard.ts":
/*!*********************************************************!*\
  !*** ./resources/ts/pages/product-details/AddToCard.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddToCard": () => (/* binding */ AddToCard)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_localstorageVars__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/localstorageVars */ "./resources/ts/utils/localstorageVars.ts");
/* harmony import */ var _BaseClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../BaseClass */ "./resources/ts/pages/BaseClass.ts");
/* harmony import */ var _utils_getIdUrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/getIdUrl */ "./resources/ts/utils/getIdUrl.ts");
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}



function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};




var AddToCard = /*#__PURE__*/function (_BaseClass) {
  _inherits(AddToCard, _BaseClass);

  var _super = _createSuper(AddToCard);

  function AddToCard(controlAmountItem) {
    var _this;

    _classCallCheck(this, AddToCard);

    _this = _super.call(this);
    _this.controlAmountItem = controlAmountItem;
    _this.confirm = _this.$('.details-button-confirm');
    return _this;
  }

  _createClass(AddToCard, [{
    key: "execute",
    value: function execute() {
      var _this2 = this;

      this.controlAmountItem.execute();
      this.confirm.addEventListener("click", function () {
        return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.additem((0,_utils_getIdUrl__WEBPACK_IMPORTED_MODULE_3__.getIdUrl)());

                case 2:
                  location.href = "/product";

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));
      });
    }
  }, {
    key: "additem",
    value: function additem(id) {
      var _a, _b;

      return __awaiter(this, void 0, void 0, /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var items, item, amount, getitemLocalstorage, _cart, curerntCart, _total2, sumAmount, removeCurrentItem, _newCart, _total, newCart, total, cart;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if (!(typeof id == "number")) {
                  _context2.next = 25;
                  break;
                }

                items = JSON.parse(localStorage.getItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_1__.itemLocalStorageItems));
                item = items.find(function (i) {
                  return i.Id == id;
                }); // If main page add 1 un

                amount = (_b = (_a = this.controlAmountItem) === null || _a === void 0 ? void 0 : _a.getAmount()) !== null && _b !== void 0 ? _b : 1;
                getitemLocalstorage = localStorage.getItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_1__.itemLocalstorage); // Exists item(s) cart

                if (!getitemLocalstorage) {
                  _context2.next = 22;
                  break;
                }

                _cart = JSON.parse(getitemLocalstorage); // If exists selected item, add more quantity

                curerntCart = _cart.find(function (i) {
                  return i.item.Id == id;
                });

                if (!curerntCart) {
                  _context2.next = 18;
                  break;
                }

                _total2 = parseFloat(curerntCart.item.Amount) * (amount + curerntCart.amount);
                sumAmount = curerntCart.amount + amount;
                curerntCart.amount = sumAmount;
                curerntCart.total = _total2;
                removeCurrentItem = _cart.filter(function (e) {
                  return e.item.Id != id;
                });
                _newCart = [].concat(_toConsumableArray(removeCurrentItem), [curerntCart]);
                localStorage.setItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_1__.itemLocalstorage, JSON.stringify(_newCart));
                return _context2.abrupt("return");

              case 18:
                _total = parseFloat(item.Amount) * amount; // If not exists is item in card, add

                newCart = [].concat(_toConsumableArray(_cart), [{
                  item: item,
                  amount: amount,
                  total: _total
                }]);
                localStorage.setItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_1__.itemLocalstorage, JSON.stringify(newCart));
                return _context2.abrupt("return");

              case 22:
                total = parseFloat(item.Amount) * amount; // Not exists items

                cart = [{
                  item: item,
                  amount: amount,
                  total: total
                }];
                localStorage.setItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_1__.itemLocalstorage, JSON.stringify(cart));

              case 25:
                _context2.next = 30;
                break;

              case 27:
                _context2.prev = 27;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);

              case 30:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 27]]);
      }));
    }
  }]);

  return AddToCard;
}(_BaseClass__WEBPACK_IMPORTED_MODULE_2__.BaseClass);

/***/ }),

/***/ "./resources/ts/pages/product-details/ControlAmountItem.ts":
/*!*****************************************************************!*\
  !*** ./resources/ts/pages/product-details/ControlAmountItem.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ControlAmountItem": () => (/* binding */ ControlAmountItem)
/* harmony export */ });
/* harmony import */ var _BaseClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseClass */ "./resources/ts/pages/BaseClass.ts");
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}


var ControlAmountItem = /*#__PURE__*/function (_BaseClass) {
  _inherits(ControlAmountItem, _BaseClass);

  var _super = _createSuper(ControlAmountItem);

  function ControlAmountItem() {
    var _this;

    _classCallCheck(this, ControlAmountItem);

    _this = _super.call(this);
    _this.add = _this.$('.details-button-rounded-action-add');
    _this.remove = _this.$('.details-button-rounded-action-rem');
    _this.amount = _this.$('.details-qtd');
    return _this;
  }

  _createClass(ControlAmountItem, [{
    key: "execute",
    value: function execute() {
      this.increase(this.add);
      this.decrease(this.remove);
    }
  }, {
    key: "getAmount",
    value: function getAmount() {
      return parseInt(this.amount.textContent);
    }
  }, {
    key: "increase",
    value: function increase(element) {
      var _this2 = this;

      element.addEventListener("click", function () {
        var total = parseInt(_this2.amount.textContent);

        if (typeof total === "number") {
          total++;
          _this2.amount.textContent = String(total);
        }
      });
    }
  }, {
    key: "decrease",
    value: function decrease(element) {
      var _this3 = this;

      element.addEventListener("click", function () {
        var total = parseInt(_this3.amount.textContent);

        if (typeof total === "number" && total > 1) {
          total--;
          _this3.amount.textContent = String(total);
        }
      });
    }
  }]);

  return ControlAmountItem;
}(_BaseClass__WEBPACK_IMPORTED_MODULE_0__.BaseClass);

/***/ }),

/***/ "./resources/ts/pages/product-details/SelectedItem.ts":
/*!************************************************************!*\
  !*** ./resources/ts/pages/product-details/SelectedItem.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectedItem": () => (/* binding */ SelectedItem)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_localstorageVars__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../utils/localstorageVars */ "./resources/ts/utils/localstorageVars.ts");
/* harmony import */ var _BaseClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../BaseClass */ "./resources/ts/pages/BaseClass.ts");
/* harmony import */ var _AddToCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AddToCard */ "./resources/ts/pages/product-details/AddToCard.ts");
/* harmony import */ var _ControlAmountItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ControlAmountItem */ "./resources/ts/pages/product-details/ControlAmountItem.ts");
/* harmony import */ var _utils_getIdUrl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/getIdUrl */ "./resources/ts/utils/getIdUrl.ts");
/* harmony import */ var _utils_formatPrice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/formatPrice */ "./resources/ts/utils/formatPrice.ts");
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}



function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};







var SelectedItem = /*#__PURE__*/function (_BaseClass) {
  _inherits(SelectedItem, _BaseClass);

  var _super = _createSuper(SelectedItem);

  function SelectedItem() {
    var _this;

    _classCallCheck(this, SelectedItem);

    _this = _super.call(this);

    _this.createComponents();

    _this.createClass();

    var _location = location,
        pathname = _location.pathname;
    return _this;
  }

  _createClass(SelectedItem, [{
    key: "createComponents",
    value: function createComponents() {
      this.detailsContainer = this.$(".details-container");
      this.detailsImageContainer = document.createElement("div"); //this.$(".details-image-container")

      this.detailsButtonBack = document.createElement("button"); //this.$(".details-button-back")

      this.detailsIconback = document.createElement("img"); //this.$(".details-icon-back")

      this.detailsProductName = document.createElement("h2"); //this.$(".details-product-name")

      this.detailsProductAmount = document.createElement("p"); //this.$(".details-product-amount")

      this.detailsProductDescription = document.createElement("h4"); //this.$(".details-product-description")

      this.detailsFooterBottoms = document.createElement("div"); //this.$(".details-footer-bottoms")

      this.detailsButtonRoundedActionAdd = document.createElement("button"); //this.$(".details-button-rounded-action")

      this.detailsQtd = document.createElement("span"); //this.$(".details-qtd")

      this.detailsButtonRoundedActionRem = document.createElement("button");
      this.detailsButtonConfirm = document.createElement("button"); //this.$(".details-button-confirm")
    }
  }, {
    key: "createClass",
    value: function createClass() {
      this.detailsButtonBack.classList.add("details-button-back");
      this.detailsImageContainer.classList.add("details-image-container");
      this.detailsIconback.classList.add("details-icon-back");
      this.detailsProductName.classList.add("details-product-name");
      this.detailsProductAmount.classList.add("details-product-amount");
      this.detailsProductDescription.classList.add("details-product-description");
      this.detailsFooterBottoms.classList.add("details-footer-bottoms");
      this.detailsButtonRoundedActionRem.classList.add("details-button-rounded-action");
      this.detailsButtonRoundedActionRem.classList.add("details-button-rounded-action-rem");
      this.detailsQtd.classList.add("details-qtd");
      this.detailsButtonRoundedActionAdd.classList.add("details-button-rounded-action");
      this.detailsButtonRoundedActionAdd.classList.add("details-button-rounded-action-add");
      this.detailsButtonConfirm.classList.add("details-button-confirm");
    }
  }, {
    key: "execute",
    value: function execute() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var items, item;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // const response = await fetch(`/api/Item/Show/${getIdUrl()}`)
                // const item = await response.json() as ItemShow
                items = JSON.parse(localStorage.getItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_1__.itemLocalStorageItems));
                item = items.find(function (i) {
                  return i.Id == (0,_utils_getIdUrl__WEBPACK_IMPORTED_MODULE_5__.getIdUrl)();
                });
                this.detailsIconback.setAttribute("src", "/images/icon-back.png");
                this.detailsButtonBack.appendChild(this.detailsIconback);
                this.detailsButtonBack.addEventListener("click", function () {
                  location.href = "/product";
                });
                this.detailsImageContainer.style.backgroundImage = "url(".concat(item.Image, ")");
                this.detailsImageContainer.appendChild(this.detailsButtonBack);
                this.detailsButtonRoundedActionRem.textContent = "-";
                this.detailsFooterBottoms.appendChild(this.detailsButtonRoundedActionRem);
                this.detailsQtd.textContent = "1";
                this.detailsFooterBottoms.appendChild(this.detailsQtd);
                this.detailsButtonRoundedActionAdd.textContent = "+";
                this.detailsFooterBottoms.appendChild(this.detailsButtonRoundedActionAdd);
                this.detailsButtonConfirm.textContent = "Adicionar";
                this.detailsFooterBottoms.appendChild(this.detailsButtonConfirm);
                this.detailsContainer.appendChild(this.detailsImageContainer);
                this.detailsProductName.textContent = item.Name;
                this.detailsContainer.appendChild(this.detailsProductName);
                this.detailsProductAmount.textContent = (0,_utils_formatPrice__WEBPACK_IMPORTED_MODULE_6__.formatPrice)(parseFloat(item.Amount));
                this.detailsContainer.appendChild(this.detailsProductAmount);
                this.detailsProductDescription.textContent = item.Description;
                this.detailsContainer.appendChild(this.detailsProductDescription);
                this.detailsContainer.appendChild(this.detailsFooterBottoms);
                new _AddToCard__WEBPACK_IMPORTED_MODULE_3__.AddToCard(new _ControlAmountItem__WEBPACK_IMPORTED_MODULE_4__.ControlAmountItem()).execute();

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }]);

  return SelectedItem;
}(_BaseClass__WEBPACK_IMPORTED_MODULE_2__.BaseClass);

/***/ }),

/***/ "./resources/ts/pages/product-details/index.ts":
/*!*****************************************************!*\
  !*** ./resources/ts/pages/product-details/index.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "productDetails": () => (/* binding */ productDetails)
/* harmony export */ });
/* harmony import */ var _SelectedItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SelectedItem */ "./resources/ts/pages/product-details/SelectedItem.ts");

var productDetails = function productDetails() {
  new _SelectedItem__WEBPACK_IMPORTED_MODULE_0__.SelectedItem().execute();
};

/***/ }),

/***/ "./resources/ts/pages/product/ChangeOrder.ts":
/*!***************************************************!*\
  !*** ./resources/ts/pages/product/ChangeOrder.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChangeOrder)
/* harmony export */ });
/* harmony import */ var _BaseClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseClass */ "./resources/ts/pages/BaseClass.ts");
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}



var ChangeOrder = /*#__PURE__*/function (_BaseClass) {
  _inherits(ChangeOrder, _BaseClass);

  var _super = _createSuper(ChangeOrder);

  function ChangeOrder() {
    var _this;

    _classCallCheck(this, ChangeOrder);

    _this = _super.call(this);
    _this.productSubSectionButtonSort = _this.$(".product-sub-section-button-sort");
    _this.productSubSectionButtonText = _this.$(".product-sub-section-button-text");
    _this.productSubSectionButtonContent = _this.$(".product-sub-section-dropdown-content");
    _this.productSubSectionRigth = _this.$(".product-sub-section-rigth");

    _this.showHideOptions();

    return _this;
  }
  /**
   *  @returns void
   *  Hide or show menu sorted
   */


  _createClass(ChangeOrder, [{
    key: "showHideOptions",
    value: function showHideOptions() {
      var _this2 = this; // Hide click outside


      document.addEventListener("mouseup", function (event) {
        if (event.target != _this2.productSubSectionRigth && event.target != _this2.productSubSectionButtonContent) {
          _this2.productSubSectionButtonContent.style.display = "none";
        }
      });
      this.productSubSectionButtonSort.addEventListener("click", function () {
        var display = _this2.productSubSectionButtonContent.style.display;

        if (display === "none" || !display) {
          _this2.productSubSectionButtonContent.style.display = "flex";
          return;
        }

        _this2.productSubSectionButtonContent.style.display = "none";
      });
    }
    /**
     *  @param callback
     *  @return void
     *  Callback with type sorted
     */

  }, {
    key: "sortBy",
    value: function sortBy(callback) {
      var _this3 = this;

      var classElement = document.querySelectorAll(".product-sub-section-dropdown-sort-by");
      classElement.forEach(function (element) {
        element.addEventListener("click", function () {
          _this3.productSubSectionButtonContent.style.display = "none";
          _this3.productSubSectionButtonText.textContent = element.textContent;
          var sorted = element.getAttribute("data-sort-by");
          callback(sorted);
        });
      });
    }
  }]);

  return ChangeOrder;
}(_BaseClass__WEBPACK_IMPORTED_MODULE_0__.BaseClass);



/***/ }),

/***/ "./resources/ts/pages/product/ClickToDetailsProduct.ts":
/*!*************************************************************!*\
  !*** ./resources/ts/pages/product/ClickToDetailsProduct.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClickToDetailsProduct)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

var ClickToDetailsProduct = /*#__PURE__*/function () {
  function ClickToDetailsProduct() {
    _classCallCheck(this, ClickToDetailsProduct);
  }

  _createClass(ClickToDetailsProduct, null, [{
    key: "execute",
    value:
    /**
     *  @param element
     *  @param item
     *  @return void
     *  Redirect user to details product
     */
    function execute(element, item) {
      element.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "/product/".concat(item.Id);
      });
    }
  }]);

  return ClickToDetailsProduct;
}();



/***/ }),

/***/ "./resources/ts/pages/product/FillItems.ts":
/*!*************************************************!*\
  !*** ./resources/ts/pages/product/FillItems.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FillItems)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_formatPrice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/formatPrice */ "./resources/ts/utils/formatPrice.ts");
/* harmony import */ var _utils_limitLetters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/limitLetters */ "./resources/ts/utils/limitLetters.ts");
/* harmony import */ var _BaseClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../BaseClass */ "./resources/ts/pages/BaseClass.ts");
/* harmony import */ var _header_AmountItemsCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../header/AmountItemsCard */ "./resources/ts/pages/header/AmountItemsCard.ts");
/* harmony import */ var _product_details_AddToCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../product-details/AddToCard */ "./resources/ts/pages/product-details/AddToCard.ts");
/* harmony import */ var _ClickToDetailsProduct__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ClickToDetailsProduct */ "./resources/ts/pages/product/ClickToDetailsProduct.ts");
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}



function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};








var FillItems = /*#__PURE__*/function (_BaseClass) {
  _inherits(FillItems, _BaseClass);

  var _super = _createSuper(FillItems);

  function FillItems() {
    var _this;

    _classCallCheck(this, FillItems);

    _this = _super.call(this);
    _this.themeColor = window.fillVariables.themeColor;
    _this.showTree = window.fillVariables.categories;
    _this.container = _this.$(".product-container");
    _this.addToCard = new _product_details_AddToCard__WEBPACK_IMPORTED_MODULE_5__.AddToCard();
    _this.amountItemsCard = new _header_AmountItemsCard__WEBPACK_IMPORTED_MODULE_4__.AmountItemsCard();
    return _this;
  }
  /**
   *  @param item
   *  @return void
   *  Fill all items in screen
   */


  _createClass(FillItems, [{
    key: "execute",
    value: function execute(item) {
      var _this2 = this;

      var _a;

      var wrapper = document.createElement("div");
      wrapper.classList.add('product-cart-item-wrapper');
      wrapper.style.borderTopColor = this.themeColor;
      var content = document.createElement("div");
      content.classList.add('product-cart-item');
      wrapper.appendChild(content);
      _ClickToDetailsProduct__WEBPACK_IMPORTED_MODULE_6__["default"].execute(content, item);
      var image = document.createElement("div");
      image.classList.add('product-cart-image');
      var innerImage = document.createElement("img");
      innerImage.setAttribute("src", item.Image || '/images/no-image.png');
      image.appendChild(innerImage);
      content.appendChild(image);
      var name = document.createElement("div");
      name.classList.add('product-cart-name');
      name.textContent = item.Name;
      content.appendChild(name);
      var description = document.createElement("div");
      description.classList.add('product-cart-description-small');
      description.innerHTML = (0,_utils_limitLetters__WEBPACK_IMPORTED_MODULE_2__.limitLetters)(item.Description, 100);
      content.appendChild(description);
      var price = document.createElement("div");
      price.classList.add('product-cart-price');
      price.innerHTML = (0,_utils_formatPrice__WEBPACK_IMPORTED_MODULE_1__.formatPrice)(parseFloat(item.Amount));
      content.appendChild(price);
      var delivered = document.createElement("div");
      delivered.classList.add('product-cart-delivered');
      delivered.innerHTML = "<span>Entregue por:</span> " + item.Delivered;
      content.appendChild(delivered);
      var cartAbsoluteRight = document.createElement("button");
      cartAbsoluteRight.classList.add('product-cart-add-item');
      cartAbsoluteRight.style.backgroundColor = this.themeColor;
      cartAbsoluteRight.addEventListener("click", function () {
        return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.addToCard.additem(item.Id);

                case 2:
                  this.amountItemsCard.execute();

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));
      });
      var innerImageCart = document.createElement("img");
      innerImageCart.setAttribute("src", '/images/cart.svg');
      cartAbsoluteRight.appendChild(innerImageCart);
      wrapper.appendChild(cartAbsoluteRight);
      (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(wrapper);
    }
  }]);

  return FillItems;
}(_BaseClass__WEBPACK_IMPORTED_MODULE_3__.BaseClass);



/***/ }),

/***/ "./resources/ts/pages/product/index.ts":
/*!*********************************************!*\
  !*** ./resources/ts/pages/product/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "products": () => (/* binding */ products)
/* harmony export */ });
/* harmony import */ var _utils_loadGrider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/loadGrider */ "./resources/ts/utils/loadGrider.ts");
/* harmony import */ var _utils_localstorageVars__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/localstorageVars */ "./resources/ts/utils/localstorageVars.ts");
/* harmony import */ var _utils_recursiveCategory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/recursiveCategory */ "./resources/ts/utils/recursiveCategory.ts");
/* harmony import */ var _utils_totalCategoriesLength__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/totalCategoriesLength */ "./resources/ts/utils/totalCategoriesLength.ts");
/* harmony import */ var _ChangeOrder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ChangeOrder */ "./resources/ts/pages/product/ChangeOrder.ts");
/* harmony import */ var _FillItems__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FillItems */ "./resources/ts/pages/product/FillItems.ts");
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}







window.loadGlider = _utils_loadGrider__WEBPACK_IMPORTED_MODULE_0__.loadGrider;
var products = function products() {
  var categories = window.fillVariables.categories;
  var items = JSON.parse(localStorage.getItem(_utils_localstorageVars__WEBPACK_IMPORTED_MODULE_1__.itemLocalStorageItems));
  var changeOrder = new _ChangeOrder__WEBPACK_IMPORTED_MODULE_4__["default"]();
  var fillItems = new _FillItems__WEBPACK_IMPORTED_MODULE_5__["default"]();
  var allIdsForShowItems = [];
  var container = document.querySelector(".product-container"); // Remove all items 

  var removeAllItems = function removeAllItems() {
    document.querySelectorAll(".product-cart-item-wrapper").forEach(function (element) {
      element.remove();
    });
  }; // END


  var itemCategoryArray = function itemCategoryArray() {
    var itemCategory = document.querySelectorAll(".product-item");
    return _toConsumableArray(itemCategory);
  };

  var clickChangeCategories = function clickChangeCategories() {
    itemCategoryArray().forEach(function (item) {
      item.addEventListener("click", function () {
        removeAllItems();
        var categoryId = item.getAttribute("data-id");
        searchPerCategory(parseInt(categoryId), false, true);
        categoriesChange(parseInt(categoryId));
      });
    });
  };

  clickChangeCategories();
  var filter = [];

  var searchPerCategory = function searchPerCategory(categoryId) {
    var resetItems = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var rerenderClickBreak = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var filterCategory = (0,_utils_recursiveCategory__WEBPACK_IMPORTED_MODULE_2__.recursiveCategory)(categories.ItemCategories, categoryId);
    allIdsForShowItems = [];
    if (filterCategory && filterCategory.children) idCategoriesRecursive(filterCategory.children);
    var itemsFiltered = items.filter(function (item) {
      return item.CategoryId === categoryId || allIdsForShowItems.find(function (list) {
        return item.CategoryId == list;
      });
    });
    (0,_utils_totalCategoriesLength__WEBPACK_IMPORTED_MODULE_3__.totalCategoriesLength)(resetItems ? items.length : itemsFiltered.length);
    filter = resetItems ? items : itemsFiltered;

    var fill = function fill(filter) {
      console.log("DENTRO FILL");
      filter === null || filter === void 0 ? void 0 : filter.forEach(function (item) {
        fillItems.execute(item);
      });
    };

    if (!rerenderClickBreak) {
      changeOrder.sortBy(function (sort) {
        removeAllItems();
        console.log("Dentro sortby");

        switch (sort) {
          case "asc":
            break;

          case "desc":
            break;

          case "name":
            filter = filter.sort(function (a, b) {
              return a.Name > b.Name ? 1 : -1;
            });
            break;
        }

        fill(filter);
      });
    }

    fill(filter);
  };

  var idCategoriesRecursive = function idCategoriesRecursive(cat) {
    return cat.reduce(function (increment, category) {
      allIdsForShowItems.push(category.Id);
      idCategoriesRecursive(category.children);
      return allIdsForShowItems;
    }, []);
  };

  var categoriesChange = function categoriesChange(categoryId) {
    var resetAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var removeBreadcrumb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var _a;

    var gliderContainer = document.querySelector("#product-glider-container");
    var filterCategory = (0,_utils_recursiveCategory__WEBPACK_IMPORTED_MODULE_2__.recursiveCategory)(categories.ItemCategories, categoryId);

    if (((_a = filterCategory === null || filterCategory === void 0 ? void 0 : filterCategory.children) === null || _a === void 0 ? void 0 : _a.length) || resetAll) {
      if (!removeBreadcrumb) breadcrumbsChange(filterCategory, resetAll);
      gliderContainer === null || gliderContainer === void 0 ? void 0 : gliderContainer.remove();
      var gliderWrapper = document.querySelector(".glider-wrapper");
      var newGliderContainer = document.createElement("div");
      newGliderContainer.classList.add(".glider-contain");
      newGliderContainer.classList.add(".product-glider-container");
      newGliderContainer.id = "product-glider-container";
      gliderWrapper === null || gliderWrapper === void 0 ? void 0 : gliderWrapper.appendChild(newGliderContainer);
      var gliderContent = document.createElement("div");
      gliderContent.classList.add("product-glider-content");
      newGliderContainer.appendChild(gliderContent);

      if (resetAll) {
        categories.ItemCategories.forEach(function (item) {
          var button = document.createElement("button");
          button.setAttribute("data-id", String(item.Id));
          button.classList.add("product-item");
          button.innerHTML = item.Name;
          gliderContent.appendChild(button);
        });
        clickChangeCategories();
        breadCrumbsEvent(false);
      } else {
        filterCategory.children.forEach(function (item) {
          var button = document.createElement("button");
          button.setAttribute("data-id", String(item.Id));
          button.classList.add("product-item");
          button.innerHTML = item.Name;
          gliderContent.appendChild(button);
        });
        clickChangeCategories();
        breadCrumbsEvent(false);
      }

      (0,_utils_loadGrider__WEBPACK_IMPORTED_MODULE_0__.loadGrider)();
    }
  };

  var breadcrumbsChange = function breadcrumbsChange(category, resetAll) {
    var container = document.querySelector(".product-breadcrumb-container");

    if (!resetAll) {
      var button = document.createElement("button");
      button.classList.add("product-breadcrumb-button");
      button.setAttribute("data-breadcrumbs-id", String(category.Id));
      button.innerHTML = "&nbsp;/ " + category.Name;
      container === null || container === void 0 ? void 0 : container.appendChild(button);
      return;
    }

    allIdsForShowItems = [];
    var buttons = document.querySelectorAll(".product-breadcrumb-button");

    var _ref = _toConsumableArray(buttons),
        _ = _ref[0],
        buttonArray = _ref.slice(1);

    buttonArray.forEach(function (item, index) {
      item.remove();
    });
  };

  var breadCrumbsEvent = function breadCrumbsEvent() {
    var rerender = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var buttons = document.querySelectorAll(".product-breadcrumb-button");

    var _ref2 = _toConsumableArray(buttons),
        allCategories = _ref2[0],
        arrayButtons = _ref2.slice(1);

    if (rerender) {
      allCategories.addEventListener("click", function () {
        categoriesChange(0, true);
        removeAllItems();
        searchPerCategory(0, true, true);
        (0,_utils_totalCategoriesLength__WEBPACK_IMPORTED_MODULE_3__.totalCategoriesLength)(items.length);
      });
    }

    arrayButtons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        if (arrayButtons.length - 1 != index) {
          var categoryId = button.getAttribute("data-breadcrumbs-id");
          arrayButtons.forEach(function (element, indexElement) {
            if (index < indexElement) {
              arrayButtons[indexElement].remove();
            }
          });
          removeAllItems();
          categoriesChange(parseInt(categoryId), false, true);
          searchPerCategory(parseInt(categoryId));
        }
      });
    });
  };

  breadCrumbsEvent();
  categoriesChange(0, true);
  searchPerCategory(0, true);
};

/***/ }),

/***/ "./resources/ts/utils/formatPrice.ts":
/*!*******************************************!*\
  !*** ./resources/ts/utils/formatPrice.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatPrice": () => (/* binding */ formatPrice)
/* harmony export */ });
var formatPrice = function formatPrice(price) {
  return price === null || price === void 0 ? void 0 : price.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  });
};

/***/ }),

/***/ "./resources/ts/utils/getIdUrl.ts":
/*!****************************************!*\
  !*** ./resources/ts/utils/getIdUrl.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getIdUrl": () => (/* binding */ getIdUrl)
/* harmony export */ });
var getIdUrl = function getIdUrl() {
  var _location = location,
      pathname = _location.pathname;
  return parseInt(pathname.split("/")[pathname.split("/").length - 1]);
};

/***/ }),

/***/ "./resources/ts/utils/hasChildren.ts":
/*!*******************************************!*\
  !*** ./resources/ts/utils/hasChildren.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasChildren": () => (/* binding */ hasChildren)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

var hasChildren = function hasChildren(node) {
  return _typeof(node) === 'object' && typeof node.children !== 'undefined' && node.children.length > 0;
};

/***/ }),

/***/ "./resources/ts/utils/limitLetters.ts":
/*!********************************************!*\
  !*** ./resources/ts/utils/limitLetters.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "limitLetters": () => (/* binding */ limitLetters)
/* harmony export */ });
var limitLetters = function limitLetters(str, limit) {
  if ((str === null || str === void 0 ? void 0 : str.length) >= limit) {
    var result = "";

    for (var index = 0; index <= limit; index++) {
      result += str[index];
    }

    return result + "...";
  }

  return str;
};



/***/ }),

/***/ "./resources/ts/utils/loadGrider.ts":
/*!******************************************!*\
  !*** ./resources/ts/utils/loadGrider.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadGrider": () => (/* binding */ loadGrider)
/* harmony export */ });
/* harmony import */ var _glider_glider_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glider/glider.min.js */ "./resources/ts/glider/glider.min.js");
/* harmony import */ var _glider_glider_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_glider_glider_min_js__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}


var loadGrider = function loadGrider() {
  new (_glider_glider_min_js__WEBPACK_IMPORTED_MODULE_0___default())(document.querySelector('.product-glider-content'), {
    slidesToShow: 5,
    slidesToScroll: 2.5,
    draggable: true,
    arrows: false,
    exactWidth: false,
    scrollPropagate: false,
    eventPropagate: true,
    scrollLock: false
  }); // Filter add class Active click

  var itemsCategories = document.querySelectorAll(".product-item");
  itemsCategories.forEach(function (item, index) {
    item.addEventListener("click", function () {
      //@ts-ignore
      var itemsCategoriesArray = _toConsumableArray(itemsCategories);

      var removeSelectedInArray = itemsCategoriesArray.filter(function (i) {
        return i != item;
      });
      removeSelectedInArray.forEach(function (item) {
        item.classList.remove("selected");
      });
      item.classList.add("selected");
    });
  });
};

/***/ }),

/***/ "./resources/ts/utils/localstorageVars.ts":
/*!************************************************!*\
  !*** ./resources/ts/utils/localstorageVars.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "itemLocalStorageIsMobile": () => (/* binding */ itemLocalStorageIsMobile),
/* harmony export */   "itemLocalStorageItems": () => (/* binding */ itemLocalStorageItems),
/* harmony export */   "itemLocalStorageOrderId": () => (/* binding */ itemLocalStorageOrderId),
/* harmony export */   "itemLocalStorageThemeColor": () => (/* binding */ itemLocalStorageThemeColor),
/* harmony export */   "itemLocalStorageToken": () => (/* binding */ itemLocalStorageToken),
/* harmony export */   "itemLocalstorage": () => (/* binding */ itemLocalstorage)
/* harmony export */ });
/**
 *  @var itemLocalstorage
 *  item in cart
 */
var itemLocalstorage = "@trem.digital.eccomerce:cart";
var itemLocalStorageOrderId = '@trem.digital.eccomerce:orderId';
var itemLocalStorageToken = '@trem.digital.eccomerce:token';
var itemLocalStorageThemeColor = '@trem.digital.eccomerce:themeColor';
var itemLocalStorageIsMobile = '@trem.digital.eccomerce:isMobile';
var itemLocalStorageItems = '@trem.digital.eccomerce:items';

/***/ }),

/***/ "./resources/ts/utils/recursiveCategory.ts":
/*!*************************************************!*\
  !*** ./resources/ts/utils/recursiveCategory.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "recursiveCategory": () => (/* binding */ recursiveCategory)
/* harmony export */ });
/* harmony import */ var _hasChildren__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hasChildren */ "./resources/ts/utils/hasChildren.ts");

var recursiveCategory = function recursiveCategory(categoryFind, categoryId) {
  //@ts-ignore
  return categoryFind.reduce(function (increment, category) {
    if ((0,_hasChildren__WEBPACK_IMPORTED_MODULE_0__.hasChildren)(category) || category.Id == categoryId) {
      if (category.Id != categoryId) return recursiveCategory(category.children, categoryId);
      return category;
    }

    return increment;
  }, []);
};

/***/ }),

/***/ "./resources/ts/utils/totalCategoriesLength.ts":
/*!*****************************************************!*\
  !*** ./resources/ts/utils/totalCategoriesLength.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "totalCategoriesLength": () => (/* binding */ totalCategoriesLength)
/* harmony export */ });
var totalCategoriesLength = function totalCategoriesLength(total) {
  var producSubSectionLength = document.querySelector(".product-sub-section-length");
  var totalFormatted = "".concat(total, " produto(s)");
  producSubSectionLength.innerHTML = totalFormatted;
};

/***/ }),

/***/ "./resources/ts/glider/glider.min.js":
/*!*******************************************!*\
  !*** ./resources/ts/glider/glider.min.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
/* @preserve
    _____ __ _     __                _
   / ___// /(_)___/ /___  ____      (_)___
  / (_ // // // _  // -_)/ __/_    / /(_-<
  \___//_//_/ \_,_/ \__//_/  (_)__/ //___/
                              |___/

  Version: 1.7.4
  Author: Nick Piscitelli (pickykneee)
  Website: https://nickpiscitelli.com
  Documentation: http://nickpiscitelli.github.io/Glider.js
  License: MIT License
  Release Date: October 25th, 2018

*/


!function (e) {
   true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (e),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
}(function () {
  var a = "undefined" != typeof window ? window : this,
      e = a.Glider = function (e, t) {
    var o = this;
    if (e._glider) return e._glider;
    if (o.ele = e, o.ele.classList.add("glider"), (o.ele._glider = o).opt = Object.assign({}, {
      slidesToScroll: 1,
      slidesToShow: 1,
      resizeLock: !0,
      duration: .5,
      easing: function easing(e, t, o, i, r) {
        return i * (t /= r) * t + o;
      }
    }, t), o.animate_id = o.page = o.slide = 0, o.arrows = {}, o._opt = o.opt, o.opt.skipTrack) o.track = o.ele.children[0];else for (o.track = document.createElement("div"), o.ele.appendChild(o.track); 1 !== o.ele.children.length;) {
      o.track.appendChild(o.ele.children[0]);
    }
    o.track.classList.add("glider-track"), o.init(), o.resize = o.init.bind(o, !0), o.event(o.ele, "add", {
      scroll: o.updateControls.bind(o)
    }), o.event(a, "add", {
      resize: o.resize
    });
  },
      t = e.prototype;

  return t.init = function (e, t) {
    var o = this,
        i = 0,
        r = 0;
    o.slides = o.track.children, [].forEach.call(o.slides, function (e, t) {
      e.classList.add("glider-slide"), e.setAttribute("data-gslide", t);
    }), o.containerWidth = o.ele.clientWidth;
    var s = o.settingsBreakpoint();

    if (t || (t = s), "auto" === o.opt.slidesToShow || void 0 !== o.opt._autoSlide) {
      var l = o.containerWidth / o.opt.itemWidth;
      o.opt._autoSlide = o.opt.slidesToShow = o.opt.exactWidth ? l : Math.max(1, Math.floor(l));
    }

    "auto" === o.opt.slidesToScroll && (o.opt.slidesToScroll = Math.floor(o.opt.slidesToShow)), o.itemWidth = o.opt.exactWidth ? o.opt.itemWidth : o.containerWidth / o.opt.slidesToShow, [].forEach.call(o.slides, function (e) {
      e.style.height = "auto", e.style.width = o.itemWidth + "px", i += o.itemWidth, r = Math.max(e.offsetHeight, r);
    }), o.track.style.width = i + "px", o.trackWidth = i, o.isDrag = !1, o.preventClick = !1, o.opt.resizeLock && o.scrollTo(o.slide * o.itemWidth, 0), (s || t) && (o.bindArrows(), o.buildDots(), o.bindDrag()), o.updateControls(), o.emit(e ? "refresh" : "loaded");
  }, t.bindDrag = function () {
    var t = this;
    t.mouse = t.mouse || t.handleMouse.bind(t);

    var e = function e() {
      t.mouseDown = void 0, t.ele.classList.remove("drag"), t.isDrag && (t.preventClick = !0), t.isDrag = !1;
    },
        o = {
      mouseup: e,
      mouseleave: e,
      mousedown: function mousedown(e) {
        e.preventDefault(), e.stopPropagation(), t.mouseDown = e.clientX, t.ele.classList.add("drag");
      },
      mousemove: t.mouse,
      click: function click(e) {
        t.preventClick && (e.preventDefault(), e.stopPropagation()), t.preventClick = !1;
      }
    };

    t.ele.classList.toggle("draggable", !0 === t.opt.draggable), t.event(t.ele, "remove", o), t.opt.draggable && t.event(t.ele, "add", o);
  }, t.buildDots = function () {
    var e = this;

    if (e.opt.dots) {
      if ("string" == typeof e.opt.dots ? e.dots = document.querySelector(e.opt.dots) : e.dots = e.opt.dots, e.dots) {
        e.dots.innerHTML = "", e.dots.classList.add("glider-dots");

        for (var t = 0; t < Math.ceil(e.slides.length / e.opt.slidesToShow); ++t) {
          var o = document.createElement("button");
          o.dataset.index = t, o.setAttribute("aria-label", "Page " + (t + 1)), o.setAttribute("role", "tab"), o.className = "glider-dot " + (t ? "" : "active"), e.event(o, "add", {
            click: e.scrollItem.bind(e, t, !0)
          }), e.dots.appendChild(o);
        }
      }
    } else e.dots && (e.dots.innerHTML = "");
  }, t.bindArrows = function () {
    var o = this;
    o.opt.arrows ? ["prev", "next"].forEach(function (e) {
      var t = o.opt.arrows[e];
      t && ("string" == typeof t && (t = document.querySelector(t)), t && (t._func = t._func || o.scrollItem.bind(o, e), o.event(t, "remove", {
        click: t._func
      }), o.event(t, "add", {
        click: t._func
      }), o.arrows[e] = t));
    }) : Object.keys(o.arrows).forEach(function (e) {
      var t = o.arrows[e];
      o.event(t, "remove", {
        click: t._func
      });
    });
  }, t.updateControls = function (e) {
    var d = this;
    e && !d.opt.scrollPropagate && e.stopPropagation();
    var t = d.containerWidth >= d.trackWidth;
    d.opt.rewind || (d.arrows.prev && (d.arrows.prev.classList.toggle("disabled", d.ele.scrollLeft <= 0 || t), d.arrows.prev.setAttribute("aria-disabled", d.arrows.prev.classList.contains("disabled"))), d.arrows.next && (d.arrows.next.classList.toggle("disabled", Math.ceil(d.ele.scrollLeft + d.containerWidth) >= Math.floor(d.trackWidth) || t), d.arrows.next.setAttribute("aria-disabled", d.arrows.next.classList.contains("disabled")))), d.slide = Math.round(d.ele.scrollLeft / d.itemWidth), d.page = Math.round(d.ele.scrollLeft / d.containerWidth);
    var c = d.slide + Math.floor(Math.floor(d.opt.slidesToShow) / 2),
        h = Math.floor(d.opt.slidesToShow) % 2 ? 0 : c + 1;
    1 === Math.floor(d.opt.slidesToShow) && (h = 0), d.ele.scrollLeft + d.containerWidth >= Math.floor(d.trackWidth) && (d.page = d.dots ? d.dots.children.length - 1 : 0), [].forEach.call(d.slides, function (e, t) {
      var o = e.classList,
          i = o.contains("visible"),
          r = d.ele.scrollLeft,
          s = d.ele.scrollLeft + d.containerWidth,
          l = d.itemWidth * t,
          n = l + d.itemWidth;
      [].forEach.call(o, function (e) {
        /^left|right/.test(e) && o.remove(e);
      }), o.toggle("active", d.slide === t), c === t || h && h === t ? o.add("center") : (o.remove("center"), o.add([t < c ? "left" : "right", Math.abs(t - (t < c ? c : h || c))].join("-")));
      var a = Math.ceil(l) >= Math.floor(r) && Math.floor(n) <= Math.ceil(s);
      o.toggle("visible", a), a !== i && d.emit("slide-" + (a ? "visible" : "hidden"), {
        slide: t
      });
    }), d.dots && [].forEach.call(d.dots.children, function (e, t) {
      e.classList.toggle("active", d.page === t);
    }), e && d.opt.scrollLock && (clearTimeout(d.scrollLock), d.scrollLock = setTimeout(function () {
      clearTimeout(d.scrollLock), .02 < Math.abs(d.ele.scrollLeft / d.itemWidth - d.slide) && (d.mouseDown || d.trackWidth > d.containerWidth + d.ele.scrollLeft && d.scrollItem(d.getCurrentSlide()));
    }, d.opt.scrollLockDelay || 250));
  }, t.getCurrentSlide = function () {
    var e = this;
    return e.round(e.ele.scrollLeft / e.itemWidth);
  }, t.scrollItem = function (e, t, o) {
    o && o.preventDefault();
    var i = this,
        r = e;
    if (++i.animate_id, !0 === t) e *= i.containerWidth, e = Math.round(e / i.itemWidth) * i.itemWidth;else {
      if ("string" == typeof e) {
        var s = "prev" === e;

        if (e = i.opt.slidesToScroll % 1 || i.opt.slidesToShow % 1 ? i.getCurrentSlide() : i.slide, s ? e -= i.opt.slidesToScroll : e += i.opt.slidesToScroll, i.opt.rewind) {
          var l = i.ele.scrollLeft;
          e = s && !l ? i.slides.length : !s && l + i.containerWidth >= Math.floor(i.trackWidth) ? 0 : e;
        }
      }

      e = Math.max(Math.min(e, i.slides.length), 0), i.slide = e, e = i.itemWidth * e;
    }
    return i.scrollTo(e, i.opt.duration * Math.abs(i.ele.scrollLeft - e), function () {
      i.updateControls(), i.emit("animated", {
        value: r,
        type: "string" == typeof r ? "arrow" : t ? "dot" : "slide"
      });
    }), !1;
  }, t.settingsBreakpoint = function () {
    var e = this,
        t = e._opt.responsive;

    if (t) {
      t.sort(function (e, t) {
        return t.breakpoint - e.breakpoint;
      });

      for (var o = 0; o < t.length; ++o) {
        var i = t[o];
        if (a.innerWidth >= i.breakpoint) return e.breakpoint !== i.breakpoint && (e.opt = Object.assign({}, e._opt, i.settings), e.breakpoint = i.breakpoint, !0);
      }
    }

    var r = 0 !== e.breakpoint;
    return e.opt = Object.assign({}, e._opt), e.breakpoint = 0, r;
  }, t.scrollTo = function (t, o, i) {
    var r = this,
        s = new Date().getTime(),
        l = r.animate_id,
        n = function n() {
      var e = new Date().getTime() - s;
      r.ele.scrollLeft = r.ele.scrollLeft + (t - r.ele.scrollLeft) * r.opt.easing(0, e, 0, 1, o), e < o && l === r.animate_id ? a.requestAnimationFrame(n) : (r.ele.scrollLeft = t, i && i.call(r));
    };

    a.requestAnimationFrame(n);
  }, t.removeItem = function (e) {
    var t = this;
    t.slides.length && (t.track.removeChild(t.slides[e]), t.refresh(!0), t.emit("remove"));
  }, t.addItem = function (e) {
    this.track.appendChild(e), this.refresh(!0), this.emit("add");
  }, t.handleMouse = function (e) {
    var t = this;
    t.mouseDown && (t.isDrag = !0, t.ele.scrollLeft += (t.mouseDown - e.clientX) * (t.opt.dragVelocity || 3.3), t.mouseDown = e.clientX);
  }, t.round = function (e) {
    var t = 1 / (this.opt.slidesToScroll % 1 || 1);
    return Math.round(e * t) / t;
  }, t.refresh = function (e) {
    this.init(!0, e);
  }, t.setOption = function (t, e) {
    var o = this;
    o.breakpoint && !e ? o._opt.responsive.forEach(function (e) {
      e.breakpoint === o.breakpoint && (e.settings = Object.assign({}, e.settings, t));
    }) : o._opt = Object.assign({}, o._opt, t), o.breakpoint = 0, o.settingsBreakpoint();
  }, t.destroy = function () {
    var e = this,
        t = e.ele.cloneNode(!0),
        o = function o(t) {
      t.removeAttribute("style"), [].forEach.call(t.classList, function (e) {
        /^glider/.test(e) && t.classList.remove(e);
      });
    };

    t.children[0].outerHTML = t.children[0].innerHTML, o(t), [].forEach.call(t.getElementsByTagName("*"), o), e.ele.parentNode.replaceChild(t, e.ele), e.event(a, "remove", {
      resize: e.resize
    }), e.emit("destroy");
  }, t.emit = function (e, t) {
    var o = new a.CustomEvent("glider-" + e, {
      bubbles: !this.opt.eventPropagate,
      detail: t
    });
    this.ele.dispatchEvent(o);
  }, t.event = function (e, t, o) {
    var i = e[t + "EventListener"].bind(e);
    Object.keys(o).forEach(function (e) {
      i(e, o[e]);
    });
  }, e;
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./resources/ts/app.ts");
/******/ 	
/******/ })()
;