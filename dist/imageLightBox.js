(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["imageLightBox"] = factory();
	else
		root["imageLightBox"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

__webpack_require__(2);

var _util = __webpack_require__(3);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imageLightBox = function imageLightBox(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var self = this;

    this.item = document.querySelector(selector);

    var defaultOptions = {
        showToolbar: true,
        downloadUrl: '',
        imageProcessing: false, // sometime image you want to popup is processing.
        cache: true
    };

    this.options = _util2.default.extend(defaultOptions, options);

    this.overlay = {
        id: 'imageLightBoxOverlay' + Math.random().toString(36).substr(2, 10),
        instance: null,
        dom: function dom() {
            var _this = this;

            if (!this.instance) {
                var div = document.createElement('div');
                div.id = this.id;
                div.className = 'imageLightBoxOverlay';
                div.style = "text-align: center; background-color: rgba(0, 0, 0, 0.8); opacity: 1; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 100000;";

                div.appendChild(self.toolbar.dom());
                div.appendChild(self.loading.dom());

                var img = _util2.default.htmlToDom('<div data-x="0" data-y="0" style="transform: translate3d(0px, 0px, 0px);" class="image_wrapper"><img data-src="' + self.findImageUrl() + '" class="image" data-scale="1" style="transform: scale3d(1, 1, 1);"></div>');

                img.addEventListener('dblclick', function (e) {
                    if (_this.img().getAttribute('data-scale') > 1) {
                        self.zoomOut();
                    } else {
                        var pageX = e.pageX;
                        var pageY = e.pageY;

                        var overlayWidth = _util2.default.windowWidth();
                        var overlayHeight = _util2.default.windowHeight() + 52;

                        var x = overlayWidth / 2 - pageX;
                        var y = overlayHeight / 2 - pageY;

                        var imageWrapper = _this.dom().querySelector('.image_wrapper');;
                        imageWrapper.setAttribute('data-x', x);
                        imageWrapper.setAttribute('data-y', y);
                        imageWrapper.style.transform = 'translate3d(' + x + 'px ,' + y + 'px , 0px)';

                        self.zoomUp();
                    }
                });
                div.appendChild(img);

                this.instance = div;
            }
            return this.instance;
        },
        img: function img() {
            return this.dom().querySelector('img');
        },
        destroy: function destroy() {
            var element = this.dom();
            if (element || (element = document.getElementById(this.id))) {
                _util2.default.removeElement(element);
                this.instance = null;
            }
        },
        isExist: function isExist() {
            return !!document.getElementById(this.id);
        }
    };

    this.loading = {
        instance: null,
        dom: function dom() {
            if (!this.instance) {
                var div = document.createElement('div');
                div.className = 'loading';
                div.style.display = 'none';

                this.instance = div;
            }

            return this.instance;
        },
        show: function show() {
            this.dom().style.display = 'block';
        },
        hide: function hide() {
            this.dom().style.display = 'none';
        }
    };

    this.toolbar = {
        instance: null,
        buttons: {
            close: null,
            download: null,
            zoomUp: null,
            zoomOut: null
        },
        dom: function dom() {
            if (!this.instance) {
                var div = document.createElement('div');
                div.className = 'toolbar';

                this.buttons.close = _util2.default.htmlToDom('<a href="javascript: void(0);"><i style="float: right" class="fa fa-times fa-2x" aria-hidden="true"></i></a>');
                this.buttons.download = _util2.default.htmlToDom('<a class="download" onclick="event.stopPropagation();" target="_blank" href="' + self.options.downloadUrl + '" download><i style="float: right" class="fa fa-download fa-2x" aria-hidden="true"></i></a>');
                this.buttons.zoomUp = _util2.default.htmlToDom('<a href="javascript: void(0);" class="zoomUp"><i style="float: right" class="fa fa-search-plus fa-2x" aria-hidden="true"></i></a>');
                this.buttons.zoomOut = _util2.default.htmlToDom('<a href="javascript: void(0);" class="zoomOut disabled" disabled="true"><i style="float: right" class="fa fa-search-minus fa-2x" aria-hidden="true"></i></a>');
                div.appendChild(this.buttons.close);
                div.appendChild(this.buttons.download);
                div.appendChild(this.buttons.zoomUp);
                div.appendChild(this.buttons.zoomOut);

                this.buttons.close.addEventListener('click', function () {
                    self.close();
                });
                this.buttons.zoomUp.addEventListener('click', function () {
                    self.zoomUp();
                });
                this.buttons.zoomOut.addEventListener('click', function () {
                    self.zoomOut();
                });
                this.instance = div;
            }

            return this.instance;
        }
    };

    this.movement = {
        x: 0,
        y: 0,
        run: function run() {
            var _this2 = this;

            var startPointX = void 0,
                startPointY = void 0,
                wrapperX = void 0,
                wrapperY = void 0;
            var imageWrapper = self.overlay.dom().querySelector('.image_wrapper');

            imageWrapper.addEventListener('dragend', function (e) {
                imageWrapper.setAttribute('data-x', _this2.x);
                imageWrapper.setAttribute('data-y', _this2.y);

                _this2.resetPosition();
            }, false);

            imageWrapper.addEventListener('dragstart', function (e) {
                startPointX = e.pageX;
                startPointY = e.pageY;
                wrapperX = imageWrapper.getAttribute('data-x');
                wrapperY = imageWrapper.getAttribute('data-y');
            }, false);

            imageWrapper.addEventListener('drag', function (e) {
                if (e.pageX !== 0 && e.pageY !== 0) {
                    var movementX = e.pageX - startPointX;
                    var movementY = e.pageY - startPointY;

                    _this2.x = parseInt(wrapperX) + movementX;
                    _this2.y = parseInt(wrapperY) + movementY;
                    imageWrapper.style.transform = 'translate3d(' + _this2.x + 'px ,' + _this2.y + 'px , 0px)';
                }
            }, false);
        },
        resetPosition: function resetPosition() {
            var overlayImg = self.overlay.img();

            var imgOriginalWidth = overlayImg.clientWidth;
            var imgOriginalHeight = overlayImg.clientHeight;

            var imageWrapper = self.overlay.dom().querySelector('.image_wrapper');
            var scale = parseInt(overlayImg.getAttribute('data-scale'));

            var maxMovementX = void 0,
                minMovementX = void 0,
                maxMovementY = void 0,
                minMovementY = void 0;

            if (scale === 1) {
                maxMovementX = minMovementX = maxMovementY = minMovementY = 0;
            } else if (scale > 1) {
                var windowWidth = _util2.default.windowWidth();
                var windowHeight = _util2.default.windowHeight();

                if (imgOriginalWidth * scale > windowWidth) {
                    maxMovementX = (imgOriginalWidth * scale - windowWidth) / 2;
                } else {
                    maxMovementX = imgOriginalWidth * Math.pow(2, scale - 3);
                }

                if (imgOriginalHeight * scale > windowHeight) {
                    maxMovementY = (imgOriginalHeight * scale - windowHeight) / 2;
                } else {
                    maxMovementY = imgOriginalHeight * Math.pow(2, scale - 3);
                }

                minMovementX = -maxMovementX;
                minMovementY = -maxMovementY;
            }
            if (this.x > maxMovementX) {
                imageWrapper.setAttribute('data-x', maxMovementX);
                imageWrapper.style.transform = imageWrapper.style.transform.replace(/\(\d+/, '(' + maxMovementX);
            }
            if (this.x < minMovementX) {
                imageWrapper.setAttribute('data-x', minMovementX);
                imageWrapper.style.transform = imageWrapper.style.transform.replace(/\(\-\d+/, '(' + minMovementX);
            }
            if (this.y > maxMovementY) {
                imageWrapper.setAttribute('data-y', maxMovementY);
                imageWrapper.style.transform = imageWrapper.style.transform.replace(/(.+ )(\d+)(px\,.*)/, '$1' + maxMovementY + '$3');
            }

            if (this.y < minMovementY) {
                imageWrapper.setAttribute('data-y', minMovementY);
                imageWrapper.style.transform = imageWrapper.style.transform.replace(/(.+ )(\-\d+)(px\,.*)/, '$1' + minMovementY + '$3');
            }
        }
    };

    this.init();
};

imageLightBox.prototype.init = function () {
    var _this3 = this;

    if (!this.options.downloadUrl) {
        var url = void 0;
        if (url = this.item.getAttribute('data-download')) {
            this.options.downloadUrl = url;
        }
    }

    this.item.addEventListener('click', function () {
        _this3.show();
    });

    document.addEventListener('keyup', function (e) {
        if (e.keyCode == 27) {
            if (_this3.overlay.isExist()) {
                _this3.close();
            }
        }
    });
};

imageLightBox.prototype.zoomUp = function () {
    var img = this.overlay.img();
    var scale = parseInt(img.getAttribute('data-scale'));
    scale++;
    img.style.transform = 'scale3d(' + scale + ', ' + scale + ', 1)';
    img.setAttribute('data-scale', scale);

    _util2.default.removeClass(this.toolbar.buttons.zoomOut, 'disabled');
};

imageLightBox.prototype.zoomOut = function () {
    var img = this.overlay.img();
    var scale = parseInt(img.getAttribute('data-scale'));
    if (scale > 1) {
        scale--;
        img.style.transform = 'scale3d(' + scale + ', ' + scale + ', 1)';
        img.setAttribute('data-scale', scale);
        this.movement.resetPosition();
    }

    if (scale == 1) {
        _util2.default.addClass(this.toolbar.buttons.zoomOut, 'disabled');
    }
};

imageLightBox.prototype.showOverlay = function () {
    var o = void 0;
    // overlay exist
    if (o = document.getElementById(this.overlay.id)) {
        o.style.display = 'block';
    } else {
        document.body.appendChild(this.overlay.dom());
        this.movement.run();
    }
};

imageLightBox.prototype.show = function () {
    // TODO before show
    this.showOverlay();

    if (!this.options.imageProcessing) {
        this.loadImage();
    } else {
        this.loading.show();
    }

    // TODO after show
};

imageLightBox.prototype.hideOverlay = function () {
    var element = void 0;
    if (element = document.getElementById(this.overlay.id)) {
        element.style.display = 'none';
    }
};

imageLightBox.prototype.close = function () {
    // TODO before close
    this.hideOverlay();
    if (!this.options.cache) {
        this.overlay.destroy();
    }
    // TODO after close
};

imageLightBox.prototype.findImageUrl = function () {
    var url = void 0;
    if (url = this.item.getAttribute('data-img')) {
        return url;
    } else {
        return this.item.getAttribute('src');
    }
};

imageLightBox.prototype.loadImage = function () {
    var _this4 = this;

    var img = this.overlay.img();
    img.setAttribute('src', img.getAttribute('data-src'));
    this.loading.show();

    img.onload = function () {
        _this4.loading.hide();
    };
};

imageLightBox.prototype.imageProcessComplete = function () {
    this.options.imageProcessing = false;
    var img = this.overlay.img();
    img.setAttribute('data-src', src);
    this.overlay.dom().querySelector('a.download').setAttribute('href', downloadUrl);
    this.loadImage();
};

module.exports = imageLightBox;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _assign = __webpack_require__(24);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var util = {
    removeElement: function removeElement(el) {
        el.parentElement.removeChild(el);
    },
    windowWidth: function windowWidth() {
        return isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth;
    },
    windowHeight: function windowHeight() {
        return isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
    },
    extend: function extend(oldObject, newObject) {
        return (0, _assign2.default)({}, oldObject, newObject);
    },
    htmlToDom: function htmlToDom(html) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = html;

        return wrapper.firstChild;
    },
    addClass: function addClass(el, className) {
        if (!el) {
            return;
        }

        if (el.classList) {
            el.classList.add(className);
        } else {
            el.className += ' ' + className;
        }
    },
    removeClass: function removeClass(el, className) {
        if (!el) {
            return;
        }

        if (el.classList) {
            el.classList.remove(className);
        } else {
            if (el.hasClass(el, className)) {

                var classes = el.className.split(" ");
                classes.splice(classes.indexOf(className), 1);
                el.className = classes.join(" ");
            }
        }
    },
    hasClass: function hasClass(el, className) {
        if (!el) {
            return;
        }

        if (el.classList) {
            return el.classList.contains(className);
        } else {
            return el.className.match(new RegExp('\b' + className + '\b'));
        }
    }
};

module.exports = util;

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(18)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(21)
  , defined = __webpack_require__(22);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(41);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(25), __esModule: true };

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(26);
module.exports = __webpack_require__(19).Object.assign;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(27);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(37)});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(15)
  , core      = __webpack_require__(19)
  , ctx       = __webpack_require__(28)
  , hide      = __webpack_require__(30)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(29);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(31)
  , createDesc = __webpack_require__(36);
module.exports = __webpack_require__(17) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(32)
  , IE8_DOM_DEFINE = __webpack_require__(33)
  , toPrimitive    = __webpack_require__(35)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(17) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(17) && !__webpack_require__(18)(function(){
  return Object.defineProperty(__webpack_require__(34)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16)
  , document = __webpack_require__(15).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(16);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(38)
  , gOPS     = __webpack_require__(49)
  , pIE      = __webpack_require__(50)
  , toObject = __webpack_require__(51)
  , IObject  = __webpack_require__(21)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(18)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(39)
  , enumBugKeys = __webpack_require__(48);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(40)
  , toIObject    = __webpack_require__(20)
  , arrayIndexOf = __webpack_require__(42)(false)
  , IE_PROTO     = __webpack_require__(45)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 41 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(20)
  , toLength  = __webpack_require__(43)
  , toIndex   = __webpack_require__(44);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(23)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(23)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(46)('keys')
  , uid    = __webpack_require__(47);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(15)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 47 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 48 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 49 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 50 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(22);
module.exports = function(it){
  return Object(defined(it));
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkYmZjZTBjMGYzOTc1ZmM4Y2NjMyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvbnQtYXdlc29tZS9zY3NzL2ZvbnQtYXdlc29tZS5zY3NzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiXSwibmFtZXMiOlsiaW1hZ2VMaWdodEJveCIsInNlbGVjdG9yIiwib3B0aW9ucyIsInNlbGYiLCJpdGVtIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZGVmYXVsdE9wdGlvbnMiLCJzaG93VG9vbGJhciIsImRvd25sb2FkVXJsIiwiaW1hZ2VQcm9jZXNzaW5nIiwiY2FjaGUiLCJleHRlbmQiLCJvdmVybGF5IiwiaWQiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJzdWJzdHIiLCJpbnN0YW5jZSIsImRvbSIsImRpdiIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJzdHlsZSIsImFwcGVuZENoaWxkIiwidG9vbGJhciIsImxvYWRpbmciLCJpbWciLCJodG1sVG9Eb20iLCJmaW5kSW1hZ2VVcmwiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImdldEF0dHJpYnV0ZSIsInpvb21PdXQiLCJwYWdlWCIsInBhZ2VZIiwib3ZlcmxheVdpZHRoIiwid2luZG93V2lkdGgiLCJvdmVybGF5SGVpZ2h0Iiwid2luZG93SGVpZ2h0IiwieCIsInkiLCJpbWFnZVdyYXBwZXIiLCJzZXRBdHRyaWJ1dGUiLCJ0cmFuc2Zvcm0iLCJ6b29tVXAiLCJkZXN0cm95IiwiZWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlRWxlbWVudCIsImlzRXhpc3QiLCJkaXNwbGF5Iiwic2hvdyIsImhpZGUiLCJidXR0b25zIiwiY2xvc2UiLCJkb3dubG9hZCIsIm1vdmVtZW50IiwicnVuIiwic3RhcnRQb2ludFgiLCJzdGFydFBvaW50WSIsIndyYXBwZXJYIiwid3JhcHBlclkiLCJyZXNldFBvc2l0aW9uIiwibW92ZW1lbnRYIiwibW92ZW1lbnRZIiwicGFyc2VJbnQiLCJvdmVybGF5SW1nIiwiaW1nT3JpZ2luYWxXaWR0aCIsImNsaWVudFdpZHRoIiwiaW1nT3JpZ2luYWxIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJzY2FsZSIsIm1heE1vdmVtZW50WCIsIm1pbk1vdmVtZW50WCIsIm1heE1vdmVtZW50WSIsIm1pbk1vdmVtZW50WSIsInBvdyIsInJlcGxhY2UiLCJpbml0IiwicHJvdG90eXBlIiwidXJsIiwia2V5Q29kZSIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzaG93T3ZlcmxheSIsIm8iLCJib2R5IiwibG9hZEltYWdlIiwiaGlkZU92ZXJsYXkiLCJvbmxvYWQiLCJpbWFnZVByb2Nlc3NDb21wbGV0ZSIsInNyYyIsIm1vZHVsZSIsImV4cG9ydHMiLCJ1dGlsIiwiZWwiLCJwYXJlbnRFbGVtZW50IiwicmVtb3ZlQ2hpbGQiLCJpc05hTiIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsIm9sZE9iamVjdCIsIm5ld09iamVjdCIsImh0bWwiLCJ3cmFwcGVyIiwiaW5uZXJIVE1MIiwiZmlyc3RDaGlsZCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImhhc0NsYXNzIiwiY2xhc3NlcyIsInNwbGl0Iiwic3BsaWNlIiwiaW5kZXhPZiIsImpvaW4iLCJjb250YWlucyIsIm1hdGNoIiwiUmVnRXhwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFN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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUMsVzs7Ozs7O0FDaENEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ2hCQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBLEU7Ozs7OztBQ0hBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBLEU7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxXQUFXLGVBQWU7QUFDL0I7QUFDQSxLQUFLO0FBQ0w7QUFDQSxFOzs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0QsRTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNKQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0EsdUNBQXVDO0FBQ3ZDLEU7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0EsYTs7Ozs7O0FDSEEseUM7Ozs7OztBQ0FBLGNBQWMsc0I7Ozs7OztBQ0FkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRSIsImZpbGUiOiJpbWFnZUxpZ2h0Qm94LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiaW1hZ2VMaWdodEJveFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJpbWFnZUxpZ2h0Qm94XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGRiZmNlMGMwZjM5NzVmYzhjY2MzIiwiaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuaW1wb3J0ICdmb250LWF3ZXNvbWUvc2Nzcy9mb250LWF3ZXNvbWUuc2Nzcyc7XG5pbXBvcnQgdXRpbCBmcm9tICcuL3V0aWwuanMnO1xuXG5jb25zdCBpbWFnZUxpZ2h0Qm94ID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuaXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgdmFyIGRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgICBzaG93VG9vbGJhcjogdHJ1ZSxcbiAgICAgICAgZG93bmxvYWRVcmw6ICcnLFxuICAgICAgICBpbWFnZVByb2Nlc3Npbmc6IGZhbHNlLCAvLyBzb21ldGltZSBpbWFnZSB5b3Ugd2FudCB0byBwb3B1cCBpcyBwcm9jZXNzaW5nLlxuICAgICAgICBjYWNoZTogdHJ1ZVxuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucyA9IHV0aWwuZXh0ZW5kKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcblxuICAgIHRoaXMub3ZlcmxheSA9IHtcbiAgICAgICAgaWQ6ICdpbWFnZUxpZ2h0Qm94T3ZlcmxheScgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgMTApLFxuICAgICAgICBpbnN0YW5jZTogbnVsbCxcbiAgICAgICAgZG9tKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGRpdi5pZCA9IHRoaXMuaWQ7XG4gICAgICAgICAgICAgICAgZGl2LmNsYXNzTmFtZSA9ICdpbWFnZUxpZ2h0Qm94T3ZlcmxheSc7XG4gICAgICAgICAgICAgICAgZGl2LnN0eWxlID0gXCJ0ZXh0LWFsaWduOiBjZW50ZXI7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44KTsgb3BhY2l0eTogMTsgcG9zaXRpb246IGZpeGVkOyB0b3A6IDA7IGxlZnQ6IDA7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7IHotaW5kZXg6IDEwMDAwMDtcIjtcblxuICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChzZWxmLnRvb2xiYXIuZG9tKCkpO1xuICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChzZWxmLmxvYWRpbmcuZG9tKCkpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGltZyA9IHV0aWwuaHRtbFRvRG9tKCc8ZGl2IGRhdGEteD1cIjBcIiBkYXRhLXk9XCIwXCIgc3R5bGU9XCJ0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1wiIGNsYXNzPVwiaW1hZ2Vfd3JhcHBlclwiPjxpbWcgZGF0YS1zcmM9XCInICsgc2VsZi5maW5kSW1hZ2VVcmwoKSArICdcIiBjbGFzcz1cImltYWdlXCIgZGF0YS1zY2FsZT1cIjFcIiBzdHlsZT1cInRyYW5zZm9ybTogc2NhbGUzZCgxLCAxLCAxKTtcIj48L2Rpdj4nKTtcblxuICAgICAgICAgICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmltZygpLmdldEF0dHJpYnV0ZSgnZGF0YS1zY2FsZScpID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tT3V0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFnZVggPSBlLnBhZ2VYO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhZ2VZID0gZS5wYWdlWTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG92ZXJsYXlXaWR0aCA9IHV0aWwud2luZG93V2lkdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvdmVybGF5SGVpZ2h0ID0gdXRpbC53aW5kb3dIZWlnaHQoKSArIDUyO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgeCA9IChvdmVybGF5V2lkdGggLyAyIC0gcGFnZVgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHkgPSAob3ZlcmxheUhlaWdodCAvIDIgLSBwYWdlWSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbWFnZVdyYXBwZXIgPSB0aGlzLmRvbSgpLnF1ZXJ5U2VsZWN0b3IoJy5pbWFnZV93cmFwcGVyJyk7O1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLnNldEF0dHJpYnV0ZSgnZGF0YS14JywgeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVdyYXBwZXIuc2V0QXR0cmlidXRlKCdkYXRhLXknLCB5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIHggKyAncHggLCcgKyB5ICsgJ3B4ICwgMHB4KSdcbiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVVwKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChpbWcpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IGRpdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgICAgICB9LFxuICAgICAgICBpbWcoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kb20oKS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVzdHJveSgpIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5kb20oKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50IHx8IChlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCkpKSB7XG4gICAgICAgICAgICAgICAgdXRpbC5yZW1vdmVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0V4aXN0KCkge1xuICAgICAgICAgICAgcmV0dXJuICEhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHRoaXMubG9hZGluZyA9IHtcbiAgICAgICAgaW5zdGFuY2U6IG51bGwsXG4gICAgICAgIGRvbSgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBkaXYuY2xhc3NOYW1lID0gJ2xvYWRpbmcnO1xuICAgICAgICAgICAgICAgIGRpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IGRpdjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgICAgIH0sXG4gICAgICAgIHNob3coKSB7XG4gICAgICAgICAgICB0aGlzLmRvbSgpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9LFxuICAgICAgICBoaWRlKCkge1xuICAgICAgICAgICAgdGhpcy5kb20oKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy50b29sYmFyID0ge1xuICAgICAgICBpbnN0YW5jZTogbnVsbCxcbiAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgICAgY2xvc2U6IG51bGwsXG4gICAgICAgICAgICBkb3dubG9hZDogbnVsbCxcbiAgICAgICAgICAgIHpvb21VcDogbnVsbCxcbiAgICAgICAgICAgIHpvb21PdXQ6IG51bGxcbiAgICAgICAgfSxcbiAgICAgICAgZG9tKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGRpdi5jbGFzc05hbWUgPSAndG9vbGJhcic7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbnMuY2xvc2UgPSB1dGlsLmh0bWxUb0RvbSgnPGEgaHJlZj1cImphdmFzY3JpcHQ6IHZvaWQoMCk7XCI+PGkgc3R5bGU9XCJmbG9hdDogcmlnaHRcIiBjbGFzcz1cImZhIGZhLXRpbWVzIGZhLTJ4XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPjwvYT4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbnMuZG93bmxvYWQgPSB1dGlsLmh0bWxUb0RvbSgnPGEgY2xhc3M9XCJkb3dubG9hZFwiIG9uY2xpY2s9XCJldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiJyArIHNlbGYub3B0aW9ucy5kb3dubG9hZFVybCArICdcIiBkb3dubG9hZD48aSBzdHlsZT1cImZsb2F0OiByaWdodFwiIGNsYXNzPVwiZmEgZmEtZG93bmxvYWQgZmEtMnhcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9hPicpO1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9ucy56b29tVXAgPSB1dGlsLmh0bWxUb0RvbSgnPGEgaHJlZj1cImphdmFzY3JpcHQ6IHZvaWQoMCk7XCIgY2xhc3M9XCJ6b29tVXBcIj48aSBzdHlsZT1cImZsb2F0OiByaWdodFwiIGNsYXNzPVwiZmEgZmEtc2VhcmNoLXBsdXMgZmEtMnhcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9hPicpXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25zLnpvb21PdXQgPSB1dGlsLmh0bWxUb0RvbSgnPGEgaHJlZj1cImphdmFzY3JpcHQ6IHZvaWQoMCk7XCIgY2xhc3M9XCJ6b29tT3V0IGRpc2FibGVkXCIgZGlzYWJsZWQ9XCJ0cnVlXCI+PGkgc3R5bGU9XCJmbG9hdDogcmlnaHRcIiBjbGFzcz1cImZhIGZhLXNlYXJjaC1taW51cyBmYS0yeFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2E+JylcbiAgICAgICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGhpcy5idXR0b25zLmNsb3NlKTtcbiAgICAgICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGhpcy5idXR0b25zLmRvd25sb2FkKTtcbiAgICAgICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGhpcy5idXR0b25zLnpvb21VcCk7XG4gICAgICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRoaXMuYnV0dG9ucy56b29tT3V0KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9ucy5jbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9ucy56b29tVXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVVwKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25zLnpvb21PdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbU91dCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBkaXY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5tb3ZlbWVudCA9IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMCxcbiAgICAgICAgcnVuKCkge1xuICAgICAgICAgICAgbGV0IHN0YXJ0UG9pbnRYLCBzdGFydFBvaW50WSwgd3JhcHBlclgsIHdyYXBwZXJZO1xuICAgICAgICAgICAgbGV0IGltYWdlV3JhcHBlciA9IHNlbGYub3ZlcmxheS5kb20oKS5xdWVyeVNlbGVjdG9yKCcuaW1hZ2Vfd3JhcHBlcicpO1xuXG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLnNldEF0dHJpYnV0ZSgnZGF0YS14JywgdGhpcy54KTtcbiAgICAgICAgICAgICAgICBpbWFnZVdyYXBwZXIuc2V0QXR0cmlidXRlKCdkYXRhLXknLCB0aGlzLnkpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgICAgICAgIGltYWdlV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0UG9pbnRYID0gZS5wYWdlWDtcbiAgICAgICAgICAgICAgICBzdGFydFBvaW50WSA9IGUucGFnZVk7XG4gICAgICAgICAgICAgICAgd3JhcHBlclggPSBpbWFnZVdyYXBwZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKTtcbiAgICAgICAgICAgICAgICB3cmFwcGVyWSA9IGltYWdlV3JhcHBlci5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpO1xuICAgICAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignZHJhZycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGUucGFnZVggIT09IDAgJiYgZS5wYWdlWSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbW92ZW1lbnRYID0gZS5wYWdlWCAtIHN0YXJ0UG9pbnRYO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbW92ZW1lbnRZID0gZS5wYWdlWSAtIHN0YXJ0UG9pbnRZO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCA9IHBhcnNlSW50KHdyYXBwZXJYKSArIG1vdmVtZW50WDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ID0gcGFyc2VJbnQod3JhcHBlclkpICsgbW92ZW1lbnRZO1xuICAgICAgICAgICAgICAgICAgICBpbWFnZVdyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyB0aGlzLnggKyAncHggLCcgKyB0aGlzLnkgKyAncHggLCAwcHgpJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVzZXRQb3NpdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IG92ZXJsYXlJbWcgPSBzZWxmLm92ZXJsYXkuaW1nKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBpbWdPcmlnaW5hbFdpZHRoID0gb3ZlcmxheUltZy5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIGxldCBpbWdPcmlnaW5hbEhlaWdodCA9IG92ZXJsYXlJbWcuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICBjb25zdCBpbWFnZVdyYXBwZXIgPSBzZWxmLm92ZXJsYXkuZG9tKCkucXVlcnlTZWxlY3RvcignLmltYWdlX3dyYXBwZXInKTtcbiAgICAgICAgICAgIGNvbnN0IHNjYWxlID0gcGFyc2VJbnQob3ZlcmxheUltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2NhbGUnKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBtYXhNb3ZlbWVudFgsIG1pbk1vdmVtZW50WCwgbWF4TW92ZW1lbnRZLCBtaW5Nb3ZlbWVudFk7XG5cbiAgICAgICAgICAgIGlmIChzY2FsZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIG1heE1vdmVtZW50WCA9IG1pbk1vdmVtZW50WCA9IG1heE1vdmVtZW50WSA9IG1pbk1vdmVtZW50WSA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNjYWxlID4gMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gdXRpbC53aW5kb3dXaWR0aCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHV0aWwud2luZG93SGVpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW1nT3JpZ2luYWxXaWR0aCAqIHNjYWxlID4gd2luZG93V2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4TW92ZW1lbnRYID0gKGltZ09yaWdpbmFsV2lkdGggKiBzY2FsZSAtIHdpbmRvd1dpZHRoKSAvIDJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtYXhNb3ZlbWVudFggPSBpbWdPcmlnaW5hbFdpZHRoICogTWF0aC5wb3coMiwgc2NhbGUgLSAzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaW1nT3JpZ2luYWxIZWlnaHQgKiBzY2FsZSA+IHdpbmRvd0hlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBtYXhNb3ZlbWVudFkgPSAoaW1nT3JpZ2luYWxIZWlnaHQgKiBzY2FsZSAtIHdpbmRvd0hlaWdodCkgLyAyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4TW92ZW1lbnRZID0gaW1nT3JpZ2luYWxIZWlnaHQgKiBNYXRoLnBvdygyLCBzY2FsZSAtIDMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1pbk1vdmVtZW50WCA9IC1tYXhNb3ZlbWVudFg7XG4gICAgICAgICAgICAgICAgbWluTW92ZW1lbnRZID0gLW1heE1vdmVtZW50WTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnggPiBtYXhNb3ZlbWVudFgpIHtcbiAgICAgICAgICAgICAgICBpbWFnZVdyYXBwZXIuc2V0QXR0cmlidXRlKCdkYXRhLXgnLCBtYXhNb3ZlbWVudFgpO1xuICAgICAgICAgICAgICAgIGltYWdlV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBpbWFnZVdyYXBwZXIuc3R5bGUudHJhbnNmb3JtLnJlcGxhY2UoL1xcKFxcZCsvLCAnKCcgKyBtYXhNb3ZlbWVudFgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMueCA8IG1pbk1vdmVtZW50WCkge1xuICAgICAgICAgICAgICAgIGltYWdlV3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2RhdGEteCcsIG1pbk1vdmVtZW50WCk7XG4gICAgICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGltYWdlV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0ucmVwbGFjZSgvXFwoXFwtXFxkKy8sICcoJyArIG1pbk1vdmVtZW50WCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy55ID4gbWF4TW92ZW1lbnRZKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLnNldEF0dHJpYnV0ZSgnZGF0YS15JywgbWF4TW92ZW1lbnRZKTtcbiAgICAgICAgICAgICAgICBpbWFnZVdyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gaW1hZ2VXcmFwcGVyLnN0eWxlLnRyYW5zZm9ybS5yZXBsYWNlKC8oLisgKShcXGQrKShweFxcLC4qKS8sICckMScgKyBtYXhNb3ZlbWVudFkgKyAnJDMnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMueSA8IG1pbk1vdmVtZW50WSkge1xuICAgICAgICAgICAgICAgIGltYWdlV3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2RhdGEteScsIG1pbk1vdmVtZW50WSk7XG4gICAgICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGltYWdlV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0ucmVwbGFjZSgvKC4rICkoXFwtXFxkKykocHhcXCwuKikvLCAnJDEnICsgbWluTW92ZW1lbnRZICsgJyQzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KCk7XG59XG5cbmltYWdlTGlnaHRCb3gucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZG93bmxvYWRVcmwpIHtcbiAgICAgICAgbGV0IHVybDtcbiAgICAgICAgaWYgKHVybCA9IHRoaXMuaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZG93bmxvYWQnKSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRvd25sb2FkVXJsID0gdXJsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAyNykge1xuICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheS5pc0V4aXN0KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxufVxuXG5pbWFnZUxpZ2h0Qm94LnByb3RvdHlwZS56b29tVXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaW1nID0gdGhpcy5vdmVybGF5LmltZygpO1xuICAgIGxldCBzY2FsZSA9IHBhcnNlSW50KGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2NhbGUnKSk7XG4gICAgc2NhbGUrKztcbiAgICBpbWcuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlM2QoJyArIHNjYWxlICsgJywgJyArIHNjYWxlICsgJywgMSknO1xuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2NhbGUnLCBzY2FsZSk7XG5cbiAgICB1dGlsLnJlbW92ZUNsYXNzKHRoaXMudG9vbGJhci5idXR0b25zLnpvb21PdXQsICdkaXNhYmxlZCcpO1xufVxuXG5pbWFnZUxpZ2h0Qm94LnByb3RvdHlwZS56b29tT3V0ID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGltZyA9IHRoaXMub3ZlcmxheS5pbWcoKTtcbiAgICBsZXQgc2NhbGUgPSBwYXJzZUludChpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLXNjYWxlJykpO1xuICAgIGlmIChzY2FsZSA+IDEpIHtcbiAgICAgICAgc2NhbGUtLTtcbiAgICAgICAgaW1nLnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZTNkKCcgKyBzY2FsZSArICcsICcgKyBzY2FsZSArICcsIDEpJztcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnZGF0YS1zY2FsZScsIHNjYWxlKTtcbiAgICAgICAgdGhpcy5tb3ZlbWVudC5yZXNldFBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgaWYgKHNjYWxlID09IDEpIHtcbiAgICAgICAgdXRpbC5hZGRDbGFzcyh0aGlzLnRvb2xiYXIuYnV0dG9ucy56b29tT3V0LCAnZGlzYWJsZWQnKTtcbiAgICB9XG59XG5cbmltYWdlTGlnaHRCb3gucHJvdG90eXBlLnNob3dPdmVybGF5ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBvO1xuICAgIC8vIG92ZXJsYXkgZXhpc3RcbiAgICBpZiAobyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMub3ZlcmxheS5pZCkpIHtcbiAgICAgICAgby5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheS5kb20oKSk7XG4gICAgICAgIHRoaXMubW92ZW1lbnQucnVuKCk7XG4gICAgfVxufVxuXG5pbWFnZUxpZ2h0Qm94LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIFRPRE8gYmVmb3JlIHNob3dcbiAgICB0aGlzLnNob3dPdmVybGF5KCk7XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5pbWFnZVByb2Nlc3NpbmcpIHtcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvYWRpbmcuc2hvdygpO1xuICAgIH1cblxuICAgIC8vIFRPRE8gYWZ0ZXIgc2hvd1xufVxuXG5pbWFnZUxpZ2h0Qm94LnByb3RvdHlwZS5oaWRlT3ZlcmxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZWxlbWVudDtcbiAgICBpZiAoZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMub3ZlcmxheS5pZCkpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbn1cblxuaW1hZ2VMaWdodEJveC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gVE9ETyBiZWZvcmUgY2xvc2VcbiAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuY2FjaGUpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5LmRlc3Ryb3koKTtcbiAgICB9XG4gICAgLy8gVE9ETyBhZnRlciBjbG9zZVxufVxuXG5pbWFnZUxpZ2h0Qm94LnByb3RvdHlwZS5maW5kSW1hZ2VVcmwgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHVybDtcbiAgICBpZiAodXJsID0gdGhpcy5pdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pbWcnKSkge1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW0uZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgICB9XG59XG5cbmltYWdlTGlnaHRCb3gucHJvdG90eXBlLmxvYWRJbWFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgaW1nID0gdGhpcy5vdmVybGF5LmltZygpO1xuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpO1xuICAgIHRoaXMubG9hZGluZy5zaG93KCk7XG5cbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRpbmcuaGlkZSgpO1xuICAgIH1cbn1cblxuaW1hZ2VMaWdodEJveC5wcm90b3R5cGUuaW1hZ2VQcm9jZXNzQ29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vcHRpb25zLmltYWdlUHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgIHZhciBpbWcgPSB0aGlzLm92ZXJsYXkuaW1nKCk7XG4gICAgaW1nLnNldEF0dHJpYnV0ZSgnZGF0YS1zcmMnLCBzcmMpO1xuICAgIHRoaXMub3ZlcmxheS5kb20oKS5xdWVyeVNlbGVjdG9yKCdhLmRvd25sb2FkJykuc2V0QXR0cmlidXRlKCdocmVmJywgZG93bmxvYWRVcmwpO1xuICAgIHRoaXMubG9hZEltYWdlKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW1hZ2VMaWdodEJveDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0eWxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mb250LWF3ZXNvbWUvc2Nzcy9mb250LWF3ZXNvbWUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCB1dGlsID0ge1xuICAgIHJlbW92ZUVsZW1lbnQgKGVsKSB7XG4gICAgICAgIGVsLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgIH0sXG4gICAgd2luZG93V2lkdGggKCkge1xuICAgICAgICByZXR1cm4gaXNOYU4od2luZG93LmlubmVyV2lkdGgpID8gd2luZG93LmNsaWVudFdpZHRoIDogd2luZG93LmlubmVyV2lkdGg7XG4gICAgfSxcbiAgICB3aW5kb3dIZWlnaHQgKCkge1xuICAgICAgICByZXR1cm4gaXNOYU4od2luZG93LmlubmVySGVpZ2h0KSA/IHdpbmRvdy5jbGllbnRIZWlnaHQgOiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgfSxcbiAgICBleHRlbmQgKG9sZE9iamVjdCwgbmV3T2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBvbGRPYmplY3QsIG5ld09iamVjdCk7XG4gICAgfSxcbiAgICBodG1sVG9Eb20gKGh0bWwpIHtcbiAgICAgICAgbGV0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgd3JhcHBlci5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHdyYXBwZXIuZmlyc3RDaGlsZDtcbiAgICB9LFxuICAgIGFkZENsYXNzIChlbCwgY2xhc3NOYW1lKSB7XG4gICAgICAgIGlmICghZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XG4gICAgICAgIH1cbiAgICB9LCBcbiAgICByZW1vdmVDbGFzcyAoZWwsIGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoIWVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZWwuaGFzQ2xhc3MoZWwsIGNsYXNzTmFtZSkpIHtcblxuICAgICAgICAgICAgICAgIGxldCBjbGFzc2VzID0gZWwuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnNwbGljZShjbGFzc2VzLmluZGV4T2YoY2xhc3NOYW1lKSwgMSk7XG4gICAgICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKFwiIFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgaGFzQ2xhc3MgKGVsLCBjbGFzc05hbWUpIHtcbiAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGVsLmNsYXNzTmFtZS5tYXRjaChuZXcgUmVnRXhwKCdcXGInICsgY2xhc3NOYW1lICsgJ1xcYicpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1dGlsO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsLmpzIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi40LjAnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCBJU19XUkFQICAgPSB0eXBlICYgJGV4cG9ydC5XXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgICBpZih0aGlzIGluc3RhbmNlb2YgQyl7XG4gICAgICAgICAgc3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEM7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmKElTX1BST1RPKXtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZih0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKWhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgIFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkUCAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBTKXtcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZihTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsICRhc3NpZ24gID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCBhTGVuICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZlxuICAgICwgaXNFbnVtICAgICA9IHBJRS5mO1xuICB3aGlsZShhTGVuID4gaW5kZXgpe1xuICAgIHZhciBTICAgICAgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKVxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9JT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSlcbiAgLCBJRV9QUk9UTyAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBuYW1lcyl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwgaSAgICAgID0gMFxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGtleTtcbiAgZm9yKGtleSBpbiBPKWlmKGtleSAhPSBJRV9QUk9UTyloYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgdG9JbmRleCAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWF4ICAgICAgID0gTWF0aC5tYXhcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW5kZXgsIGxlbmd0aCl7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJylcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlkID0gMFxuICAsIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=