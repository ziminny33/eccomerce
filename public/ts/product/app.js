/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/ts/product/BaseClass.ts":
/*!*******************************************!*\
  !*** ./resources/ts/product/BaseClass.ts ***!
  \*******************************************/
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

  this.$ = function (selector) {
    var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return scope.querySelector(selector);
  };
});

/***/ }),

/***/ "./resources/ts/product/changeOrder.ts":
/*!*********************************************!*\
  !*** ./resources/ts/product/changeOrder.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChangeOrder": () => (/* binding */ ChangeOrder)
/* harmony export */ });
/* harmony import */ var _BaseClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseClass */ "./resources/ts/product/BaseClass.ts");
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
  if (str.length >= limit) {
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************************!*\
  !*** ./resources/ts/product/app.ts ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_limitLetters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/limitLetters */ "./resources/ts/utils/limitLetters.ts");
/* harmony import */ var _utils_loadGrider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/loadGrider */ "./resources/ts/utils/loadGrider.ts");
/* harmony import */ var _utils_recursiveCategory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/recursiveCategory */ "./resources/ts/utils/recursiveCategory.ts");
/* harmony import */ var _utils_totalCategoriesLength__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/totalCategoriesLength */ "./resources/ts/utils/totalCategoriesLength.ts");
/* harmony import */ var _changeOrder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./changeOrder */ "./resources/ts/product/changeOrder.ts");
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






window.loadGlider = _utils_loadGrider__WEBPACK_IMPORTED_MODULE_1__.loadGrider;

window.products = function () {
  var _window$fillVariables = window.fillVariables,
      categories = _window$fillVariables.categories,
      items = _window$fillVariables.items,
      themeColor = _window$fillVariables.themeColor,
      isMobile = _window$fillVariables.isMobile;
  var changeOrder = new _changeOrder__WEBPACK_IMPORTED_MODULE_4__.ChangeOrder();
  var allIdsForShowItems = [];
  var container = document.querySelector(".product-container"); // Remove all items 

  var removeAllItems = function removeAllItems() {
    document.querySelectorAll(".product-cart-item").forEach(function (element) {
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
      filter.forEach(function (item) {
        var content = document.createElement("div");
        content.classList.add('product-cart-item');
        content.style.borderTopColor = themeColor;
        var image = document.createElement("div");
        image.classList.add('product-cart-image');
        var innerImage = document.createElement("img");
        innerImage.setAttribute("src", item.Image);
        image.appendChild(innerImage);
        content.appendChild(image);
        var name = document.createElement("div");
        name.classList.add('product-cart-name');
        name.textContent = item.Name;
        content.appendChild(name);
        var description = document.createElement("div");
        description.classList.add('product-cart-description-small');
        description.innerHTML = (0,_utils_limitLetters__WEBPACK_IMPORTED_MODULE_0__.limitLetters)(item.Description, 100);
        content.appendChild(description);
        var price = document.createElement("div");
        price.classList.add('product-cart-price');
        price.innerHTML = item.Amount;
        content.appendChild(price);
        var delivered = document.createElement("div");
        delivered.classList.add('product-cart-delivered');
        delivered.innerHTML = "<span>Entregue por:</span> Alguma empresa";
        content.appendChild(delivered);
        var cartAbsoluteRight = document.createElement("div");
        cartAbsoluteRight.classList.add('product-cart-add-item');
        cartAbsoluteRight.style.backgroundColor = themeColor;
        var innerImageCart = document.createElement("img");
        innerImageCart.setAttribute("src", '/images/cart.svg');
        cartAbsoluteRight.appendChild(innerImageCart);
        content.appendChild(cartAbsoluteRight);
        container === null || container === void 0 ? void 0 : container.appendChild(content);
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

      (0,_utils_loadGrider__WEBPACK_IMPORTED_MODULE_1__.loadGrider)();
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
  searchPerCategory(0, true);
};
})();

/******/ })()
;