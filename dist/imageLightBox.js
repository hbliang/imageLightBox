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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(6)
  , defined = __webpack_require__(7);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(30);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(10);

__webpack_require__(11);

var _util = __webpack_require__(12);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var imageLightBox = function imageLightBox(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var self = this;

    this.item = document.querySelector(selector);

    var defaultOptions = {
        showToolbar: true,
        downloadUrl: '',
        imageProcessing: false, // sometime image you want to popup is processing.
        cache: false
    };

    this.options = _util2["default"].extend(defaultOptions, options);

    this.overlay = {
        id: 'imageLightBoxOverlay' + Math.random().toString(36).substr(2, 10),
        instance: null,
        dom: function dom() {
            if (!this.instance) {
                var div = document.createElement('div');
                div.id = this.id;
                div.className = 'imageLightBoxOverlay';

                div.style['text-align'] = 'center';
                div.style['background-color'] = 'rgba(0, 0, 0, 0.8)';
                div.style['opacity'] = '1';
                div.style['position'] = 'fixed';
                div.style['top'] = '0';
                div.style['left'] = '0';
                div.style['width'] = '100%';
                div.style['height'] = '100%';
                div.style['z-index'] = '100000';

                div.appendChild(self.toolbar.dom());
                div.appendChild(self.loading.dom());

                var img = _util2["default"].htmlToDom('<div data-x="0" data-y="0" style="transform: translate3d(0px, 0px, 0px);" class="image_wrapper"><img data-src="' + self.findImageUrl() + '" class="image" data-scale="1" style="transform: scale3d(1, 1, 1);"></div>');

                // img.addEventListener('dblclick', (e) => {
                //     if (this.img().getAttribute('data-scale') > 1) {
                //         self.zoomOut();
                //     } else {
                //         let pageX = e.pageX;
                //         let pageY = e.pageY;

                //         let overlayWidth = util.windowWidth();
                //         let overlayHeight = util.windowHeight() - 44;

                //         let x = (overlayWidth / 2 - pageX);
                //         let y = (overlayHeight / 2 - pageY);

                //         let imageWrapper = this.dom().querySelector('.image_wrapper');;
                //         imageWrapper.setAttribute('data-x', x);
                //         imageWrapper.setAttribute('data-y', y);
                //         imageWrapper.style.transform = 'translate3d(' + x + 'px ,' + y + 'px , 0px)'

                //         self.zoomUp();
                //     }
                // })
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
                _util2["default"].removeElement(element);
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

                this.buttons.close = _util2["default"].htmlToDom('<a href="javascript: void(0);"><i style="float: right" class="fa fa-times fa-2x" aria-hidden="true"></i></a>');
                this.buttons.download = _util2["default"].htmlToDom('<a style="display: none;" class="download" onclick="event.stopPropagation();" target="_blank" href="' + self.options.downloadUrl + '" download><i style="float: right" class="fa fa-download fa-2x" aria-hidden="true"></i></a>');
                this.buttons.zoomUp = _util2["default"].htmlToDom('<a style="display: none;" href="javascript: void(0);" class="zoomUp"><i style="float: right" class="fa fa-search-plus fa-2x" aria-hidden="true"></i></a>');
                this.buttons.zoomOut = _util2["default"].htmlToDom('<a style="display: none;" href="javascript: void(0);" class="zoomOut disabled"><i style="float: right" class="fa fa-search-minus fa-2x" aria-hidden="true"></i></a>');
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
            var _this = this;

            var startPointX = void 0,
                startPointY = void 0,
                wrapperX = void 0,
                wrapperY = void 0;
            var imageWrapper = self.overlay.dom().querySelector('.image_wrapper');

            imageWrapper.addEventListener('dragend', function (e) {
                imageWrapper.setAttribute('data-x', _this.x);
                imageWrapper.setAttribute('data-y', _this.y);

                _this.resetPosition();
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

                    _this.x = parseInt(wrapperX) + movementX;
                    _this.y = parseInt(wrapperY) + movementY;
                    imageWrapper.style.transform = 'translate3d(' + _this.x + 'px ,' + _this.y + 'px , 0px)';
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
                var windowWidth = _util2["default"].windowWidth();
                var windowHeight = _util2["default"].windowHeight() - 44;

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
    var _this2 = this;

    if (!this.options.downloadUrl) {
        var url = void 0;
        if (url = this.item.getAttribute('data-download')) {
            this.options.downloadUrl = url;
        }
    }

    this.item.addEventListener('click', function () {
        _this2.show();
    });

    document.addEventListener('keyup', function (e) {
        if (e.keyCode == 27) {
            if (_this2.overlay.isExist()) {
                _this2.close();
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

    _util2["default"].removeClass(this.toolbar.buttons.zoomOut, 'disabled');
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
        _util2["default"].addClass(this.toolbar.buttons.zoomOut, 'disabled');
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
    var _this3 = this;

    var img = this.overlay.img();
    img.setAttribute('src', img.getAttribute('data-src'));
    this.loading.show();

    img.onload = function () {
        _this3.toolbar.buttons.zoomOut.style.display = 'inline';
        _this3.toolbar.buttons.zoomUp.style.display = 'inline';
        _this3.toolbar.buttons.download.style.display = 'inline';
        _this3.loading.hide();
    };
};

imageLightBox.prototype.imageProcessComplete = function (src, downloadUrl, callback) {
    this.options.imageProcessing = false;
    var img = this.overlay.img();
    img.setAttribute('data-src', src);
    this.overlay.dom().querySelector('a.download').setAttribute('href', downloadUrl);
    this.loadImage();

    if (callback) {
        callback();
    }
};

module.exports = imageLightBox;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _assign = __webpack_require__(13);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
        return (0, _assign2["default"])({}, oldObject, newObject);
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(14), __esModule: true };

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(15);
module.exports = __webpack_require__(4).Object.assign;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(16);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(26)});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(0)
  , core      = __webpack_require__(4)
  , ctx       = __webpack_require__(17)
  , hide      = __webpack_require__(19)
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(18);
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
/* 18 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(20)
  , createDesc = __webpack_require__(25);
module.exports = __webpack_require__(2) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(21)
  , IE8_DOM_DEFINE = __webpack_require__(22)
  , toPrimitive    = __webpack_require__(24)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(2) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(2) && !__webpack_require__(3)(function(){
  return Object.defineProperty(__webpack_require__(23)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1)
  , document = __webpack_require__(0).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(1);
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
/* 25 */
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(27)
  , gOPS     = __webpack_require__(38)
  , pIE      = __webpack_require__(39)
  , toObject = __webpack_require__(40)
  , IObject  = __webpack_require__(6)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function(){
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(28)
  , enumBugKeys = __webpack_require__(37);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(29)
  , toIObject    = __webpack_require__(5)
  , arrayIndexOf = __webpack_require__(31)(false)
  , IE_PROTO     = __webpack_require__(34)('IE_PROTO');

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
/* 29 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(5)
  , toLength  = __webpack_require__(32)
  , toIndex   = __webpack_require__(33);
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(8)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(8)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(35)('keys')
  , uid    = __webpack_require__(36);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 38 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 39 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(7);
module.exports = function(it){
  return Object(defined(it));
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhZTlhMmQxZWM2ZjYzOTBiZDZhMiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvbnQtYXdlc29tZS9zY3NzL2ZvbnQtYXdlc29tZS5zY3NzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiXSwibmFtZXMiOlsiaW1hZ2VMaWdodEJveCIsInNlbGVjdG9yIiwib3B0aW9ucyIsInNlbGYiLCJpdGVtIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZGVmYXVsdE9wdGlvbnMiLCJzaG93VG9vbGJhciIsImRvd25sb2FkVXJsIiwiaW1hZ2VQcm9jZXNzaW5nIiwiY2FjaGUiLCJleHRlbmQiLCJvdmVybGF5IiwiaWQiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJzdWJzdHIiLCJpbnN0YW5jZSIsImRvbSIsImRpdiIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJzdHlsZSIsImFwcGVuZENoaWxkIiwidG9vbGJhciIsImxvYWRpbmciLCJpbWciLCJodG1sVG9Eb20iLCJmaW5kSW1hZ2VVcmwiLCJkZXN0cm95IiwiZWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlRWxlbWVudCIsImlzRXhpc3QiLCJkaXNwbGF5Iiwic2hvdyIsImhpZGUiLCJidXR0b25zIiwiY2xvc2UiLCJkb3dubG9hZCIsInpvb21VcCIsInpvb21PdXQiLCJhZGRFdmVudExpc3RlbmVyIiwibW92ZW1lbnQiLCJ4IiwieSIsInJ1biIsInN0YXJ0UG9pbnRYIiwic3RhcnRQb2ludFkiLCJ3cmFwcGVyWCIsIndyYXBwZXJZIiwiaW1hZ2VXcmFwcGVyIiwiZSIsInNldEF0dHJpYnV0ZSIsInJlc2V0UG9zaXRpb24iLCJwYWdlWCIsInBhZ2VZIiwiZ2V0QXR0cmlidXRlIiwibW92ZW1lbnRYIiwibW92ZW1lbnRZIiwicGFyc2VJbnQiLCJ0cmFuc2Zvcm0iLCJvdmVybGF5SW1nIiwiaW1nT3JpZ2luYWxXaWR0aCIsImNsaWVudFdpZHRoIiwiaW1nT3JpZ2luYWxIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJzY2FsZSIsIm1heE1vdmVtZW50WCIsIm1pbk1vdmVtZW50WCIsIm1heE1vdmVtZW50WSIsIm1pbk1vdmVtZW50WSIsIndpbmRvd1dpZHRoIiwid2luZG93SGVpZ2h0IiwicG93IiwicmVwbGFjZSIsImluaXQiLCJwcm90b3R5cGUiLCJ1cmwiLCJrZXlDb2RlIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInNob3dPdmVybGF5IiwibyIsImJvZHkiLCJsb2FkSW1hZ2UiLCJoaWRlT3ZlcmxheSIsIm9ubG9hZCIsImltYWdlUHJvY2Vzc0NvbXBsZXRlIiwic3JjIiwiY2FsbGJhY2siLCJtb2R1bGUiLCJleHBvcnRzIiwidXRpbCIsImVsIiwicGFyZW50RWxlbWVudCIsInJlbW92ZUNoaWxkIiwiaXNOYU4iLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJvbGRPYmplY3QiLCJuZXdPYmplY3QiLCJodG1sIiwid3JhcHBlciIsImlubmVySFRNTCIsImZpcnN0Q2hpbGQiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJoYXNDbGFzcyIsImNsYXNzZXMiLCJzcGxpdCIsInNwbGljZSIsImluZGV4T2YiLCJqb2luIiwiY29udGFpbnMiLCJtYXRjaCIsIlJlZ0V4cCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsZ0M7Ozs7OztBQ0h2QztBQUNBO0FBQ0EsRTs7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QUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDLFc7Ozs7OztBQ2hDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEU7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNoQkEsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxFOzs7Ozs7QUNIQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQSxFOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssV0FBVyxlQUFlO0FBQy9CO0FBQ0EsS0FBSztBQUNMO0FBQ0EsRTs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNELEU7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDSkE7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBLHVDQUF1QztBQUN2QyxFOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBLGE7Ozs7OztBQ0hBLHlDOzs7Ozs7QUNBQSxjQUFjLHNCOzs7Ozs7QUNBZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEUiLCJmaWxlIjoiaW1hZ2VMaWdodEJveC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImltYWdlTGlnaHRCb3hcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiaW1hZ2VMaWdodEJveFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhZTlhMmQxZWM2ZjYzOTBiZDZhMiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi40LjAnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XG5pbXBvcnQgJ2ZvbnQtYXdlc29tZS9zY3NzL2ZvbnQtYXdlc29tZS5zY3NzJztcbmltcG9ydCB1dGlsIGZyb20gJy4vdXRpbC5qcyc7XG5cbmNvbnN0IGltYWdlTGlnaHRCb3ggPSBmdW5jdGlvbiAoc2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5pdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICB2YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgIHNob3dUb29sYmFyOiB0cnVlLFxuICAgICAgICBkb3dubG9hZFVybDogJycsXG4gICAgICAgIGltYWdlUHJvY2Vzc2luZzogZmFsc2UsIC8vIHNvbWV0aW1lIGltYWdlIHlvdSB3YW50IHRvIHBvcHVwIGlzIHByb2Nlc3NpbmcuXG4gICAgICAgIGNhY2hlOiBmYWxzZVxuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucyA9IHV0aWwuZXh0ZW5kKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcblxuICAgIHRoaXMub3ZlcmxheSA9IHtcbiAgICAgICAgaWQ6ICdpbWFnZUxpZ2h0Qm94T3ZlcmxheScgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgMTApLFxuICAgICAgICBpbnN0YW5jZTogbnVsbCxcbiAgICAgICAgZG9tKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGRpdi5pZCA9IHRoaXMuaWQ7XG4gICAgICAgICAgICAgICAgZGl2LmNsYXNzTmFtZSA9ICdpbWFnZUxpZ2h0Qm94T3ZlcmxheSc7XG5cbiAgICAgICAgICAgICAgICBkaXYuc3R5bGVbJ3RleHQtYWxpZ24nXSA9ICdjZW50ZXInO1xuICAgICAgICAgICAgICAgIGRpdi5zdHlsZVsnYmFja2dyb3VuZC1jb2xvciddID0gJ3JnYmEoMCwgMCwgMCwgMC44KSc7XG4gICAgICAgICAgICAgICAgZGl2LnN0eWxlWydvcGFjaXR5J10gPSAnMSc7XG4gICAgICAgICAgICAgICAgZGl2LnN0eWxlWydwb3NpdGlvbiddID0gJ2ZpeGVkJztcbiAgICAgICAgICAgICAgICBkaXYuc3R5bGVbJ3RvcCddID0gJzAnO1xuICAgICAgICAgICAgICAgIGRpdi5zdHlsZVsnbGVmdCddID0gJzAnO1xuICAgICAgICAgICAgICAgIGRpdi5zdHlsZVsnd2lkdGgnXSA9ICcxMDAlJztcbiAgICAgICAgICAgICAgICBkaXYuc3R5bGVbJ2hlaWdodCddID0gJzEwMCUnO1xuICAgICAgICAgICAgICAgIGRpdi5zdHlsZVsnei1pbmRleCddID0gJzEwMDAwMCc7XG5cbiAgICAgICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoc2VsZi50b29sYmFyLmRvbSgpKTtcbiAgICAgICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoc2VsZi5sb2FkaW5nLmRvbSgpKTtcblxuICAgICAgICAgICAgICAgIGxldCBpbWcgPSB1dGlsLmh0bWxUb0RvbSgnPGRpdiBkYXRhLXg9XCIwXCIgZGF0YS15PVwiMFwiIHN0eWxlPVwidHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTtcIiBjbGFzcz1cImltYWdlX3dyYXBwZXJcIj48aW1nIGRhdGEtc3JjPVwiJyArIHNlbGYuZmluZEltYWdlVXJsKCkgKyAnXCIgY2xhc3M9XCJpbWFnZVwiIGRhdGEtc2NhbGU9XCIxXCIgc3R5bGU9XCJ0cmFuc2Zvcm06IHNjYWxlM2QoMSwgMSwgMSk7XCI+PC9kaXY+Jyk7XG5cbiAgICAgICAgICAgICAgICAvLyBpbWcuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICBpZiAodGhpcy5pbWcoKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2NhbGUnKSA+IDEpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHNlbGYuem9vbU91dCgpO1xuICAgICAgICAgICAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGV0IHBhZ2VYID0gZS5wYWdlWDtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCBwYWdlWSA9IGUucGFnZVk7XG5cbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCBvdmVybGF5V2lkdGggPSB1dGlsLndpbmRvd1dpZHRoKCk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBsZXQgb3ZlcmxheUhlaWdodCA9IHV0aWwud2luZG93SGVpZ2h0KCkgLSA0NDtcblxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGV0IHggPSAob3ZlcmxheVdpZHRoIC8gMiAtIHBhZ2VYKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCB5ID0gKG92ZXJsYXlIZWlnaHQgLyAyIC0gcGFnZVkpO1xuXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBsZXQgaW1hZ2VXcmFwcGVyID0gdGhpcy5kb20oKS5xdWVyeVNlbGVjdG9yKCcuaW1hZ2Vfd3JhcHBlcicpOztcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGltYWdlV3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2RhdGEteCcsIHgpO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgaW1hZ2VXcmFwcGVyLnNldEF0dHJpYnV0ZSgnZGF0YS15JywgeSk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBpbWFnZVdyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4ICwnICsgeSArICdweCAsIDBweCknXG4gXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBzZWxmLnpvb21VcCgpO1xuICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoaW1nKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBkaXY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICAgICAgfSxcbiAgICAgICAgaW1nKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9tKCkucXVlcnlTZWxlY3RvcignaW1nJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMuZG9tKCk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCB8fCAoZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpKSkge1xuICAgICAgICAgICAgICAgIHV0aWwucmVtb3ZlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFeGlzdCgpIHtcbiAgICAgICAgICAgIHJldHVybiAhIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICB0aGlzLmxvYWRpbmcgPSB7XG4gICAgICAgIGluc3RhbmNlOiBudWxsLFxuICAgICAgICBkb20oKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgZGl2LmNsYXNzTmFtZSA9ICdsb2FkaW5nJztcbiAgICAgICAgICAgICAgICBkaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBkaXY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgICAgICB9LFxuICAgICAgICBzaG93KCkge1xuICAgICAgICAgICAgdGhpcy5kb20oKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfSxcbiAgICAgICAgaGlkZSgpIHtcbiAgICAgICAgICAgIHRoaXMuZG9tKCkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudG9vbGJhciA9IHtcbiAgICAgICAgaW5zdGFuY2U6IG51bGwsXG4gICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICAgIGNsb3NlOiBudWxsLFxuICAgICAgICAgICAgZG93bmxvYWQ6IG51bGwsXG4gICAgICAgICAgICB6b29tVXA6IG51bGwsXG4gICAgICAgICAgICB6b29tT3V0OiBudWxsXG4gICAgICAgIH0sXG4gICAgICAgIGRvbSgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBkaXYuY2xhc3NOYW1lID0gJ3Rvb2xiYXInO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25zLmNsb3NlID0gdXRpbC5odG1sVG9Eb20oJzxhIGhyZWY9XCJqYXZhc2NyaXB0OiB2b2lkKDApO1wiPjxpIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCIgY2xhc3M9XCJmYSBmYS10aW1lcyBmYS0yeFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2E+Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25zLmRvd25sb2FkID0gdXRpbC5odG1sVG9Eb20oJzxhIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiBjbGFzcz1cImRvd25sb2FkXCIgb25jbGljaz1cImV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCInICsgc2VsZi5vcHRpb25zLmRvd25sb2FkVXJsICsgJ1wiIGRvd25sb2FkPjxpIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCIgY2xhc3M9XCJmYSBmYS1kb3dubG9hZCBmYS0yeFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2E+Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25zLnpvb21VcCA9IHV0aWwuaHRtbFRvRG9tKCc8YSBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgaHJlZj1cImphdmFzY3JpcHQ6IHZvaWQoMCk7XCIgY2xhc3M9XCJ6b29tVXBcIj48aSBzdHlsZT1cImZsb2F0OiByaWdodFwiIGNsYXNzPVwiZmEgZmEtc2VhcmNoLXBsdXMgZmEtMnhcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9hPicpXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25zLnpvb21PdXQgPSB1dGlsLmh0bWxUb0RvbSgnPGEgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiIGhyZWY9XCJqYXZhc2NyaXB0OiB2b2lkKDApO1wiIGNsYXNzPVwiem9vbU91dCBkaXNhYmxlZFwiPjxpIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCIgY2xhc3M9XCJmYSBmYS1zZWFyY2gtbWludXMgZmEtMnhcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9hPicpXG4gICAgICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRoaXMuYnV0dG9ucy5jbG9zZSk7XG4gICAgICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRoaXMuYnV0dG9ucy5kb3dubG9hZCk7XG4gICAgICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRoaXMuYnV0dG9ucy56b29tVXApO1xuICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0aGlzLmJ1dHRvbnMuem9vbU91dCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbnMuY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbnMuem9vbVVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21VcCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9ucy56b29tT3V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21PdXQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gZGl2O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubW92ZW1lbnQgPSB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDAsXG4gICAgICAgIHJ1bigpIHtcbiAgICAgICAgICAgIGxldCBzdGFydFBvaW50WCwgc3RhcnRQb2ludFksIHdyYXBwZXJYLCB3cmFwcGVyWTtcbiAgICAgICAgICAgIGxldCBpbWFnZVdyYXBwZXIgPSBzZWxmLm92ZXJsYXkuZG9tKCkucXVlcnlTZWxlY3RvcignLmltYWdlX3dyYXBwZXInKTtcblxuICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGltYWdlV3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2RhdGEteCcsIHRoaXMueCk7XG4gICAgICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLnNldEF0dHJpYnV0ZSgnZGF0YS15JywgdGhpcy55KTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgICAgICBpbWFnZVdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBzdGFydFBvaW50WCA9IGUucGFnZVg7XG4gICAgICAgICAgICAgICAgc3RhcnRQb2ludFkgPSBlLnBhZ2VZO1xuICAgICAgICAgICAgICAgIHdyYXBwZXJYID0gaW1hZ2VXcmFwcGVyLmdldEF0dHJpYnV0ZSgnZGF0YS14Jyk7XG4gICAgICAgICAgICAgICAgd3JhcHBlclkgPSBpbWFnZVdyYXBwZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXknKTtcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWcnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlLnBhZ2VYICE9PSAwICYmIGUucGFnZVkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vdmVtZW50WCA9IGUucGFnZVggLSBzdGFydFBvaW50WDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vdmVtZW50WSA9IGUucGFnZVkgLSBzdGFydFBvaW50WTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnggPSBwYXJzZUludCh3cmFwcGVyWCkgKyBtb3ZlbWVudFg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSA9IHBhcnNlSW50KHdyYXBwZXJZKSArIG1vdmVtZW50WTtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgdGhpcy54ICsgJ3B4ICwnICsgdGhpcy55ICsgJ3B4ICwgMHB4KSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlc2V0UG9zaXRpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBvdmVybGF5SW1nID0gc2VsZi5vdmVybGF5LmltZygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgaW1nT3JpZ2luYWxXaWR0aCA9IG92ZXJsYXlJbWcuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBsZXQgaW1nT3JpZ2luYWxIZWlnaHQgPSBvdmVybGF5SW1nLmNsaWVudEhlaWdodDtcblxuICAgICAgICAgICAgY29uc3QgaW1hZ2VXcmFwcGVyID0gc2VsZi5vdmVybGF5LmRvbSgpLnF1ZXJ5U2VsZWN0b3IoJy5pbWFnZV93cmFwcGVyJyk7XG4gICAgICAgICAgICBjb25zdCBzY2FsZSA9IHBhcnNlSW50KG92ZXJsYXlJbWcuZ2V0QXR0cmlidXRlKCdkYXRhLXNjYWxlJykpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgbWF4TW92ZW1lbnRYLCBtaW5Nb3ZlbWVudFgsIG1heE1vdmVtZW50WSwgbWluTW92ZW1lbnRZO1xuXG4gICAgICAgICAgICBpZiAoc2NhbGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBtYXhNb3ZlbWVudFggPSBtaW5Nb3ZlbWVudFggPSBtYXhNb3ZlbWVudFkgPSBtaW5Nb3ZlbWVudFkgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzY2FsZSA+IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHV0aWwud2luZG93V2lkdGgoKTtcbiAgICAgICAgICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB1dGlsLndpbmRvd0hlaWdodCgpIC0gNDQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW1nT3JpZ2luYWxXaWR0aCAqIHNjYWxlID4gd2luZG93V2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4TW92ZW1lbnRYID0gKGltZ09yaWdpbmFsV2lkdGggKiBzY2FsZSAtIHdpbmRvd1dpZHRoKSAvIDJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtYXhNb3ZlbWVudFggPSBpbWdPcmlnaW5hbFdpZHRoICogTWF0aC5wb3coMiwgc2NhbGUgLSAzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaW1nT3JpZ2luYWxIZWlnaHQgKiBzY2FsZSA+IHdpbmRvd0hlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBtYXhNb3ZlbWVudFkgPSAoaW1nT3JpZ2luYWxIZWlnaHQgKiBzY2FsZSAtIHdpbmRvd0hlaWdodCkgLyAyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4TW92ZW1lbnRZID0gaW1nT3JpZ2luYWxIZWlnaHQgKiBNYXRoLnBvdygyLCBzY2FsZSAtIDMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1pbk1vdmVtZW50WCA9IC1tYXhNb3ZlbWVudFg7XG4gICAgICAgICAgICAgICAgbWluTW92ZW1lbnRZID0gLW1heE1vdmVtZW50WTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnggPiBtYXhNb3ZlbWVudFgpIHtcbiAgICAgICAgICAgICAgICBpbWFnZVdyYXBwZXIuc2V0QXR0cmlidXRlKCdkYXRhLXgnLCBtYXhNb3ZlbWVudFgpO1xuICAgICAgICAgICAgICAgIGltYWdlV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBpbWFnZVdyYXBwZXIuc3R5bGUudHJhbnNmb3JtLnJlcGxhY2UoL1xcKFxcZCsvLCAnKCcgKyBtYXhNb3ZlbWVudFgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMueCA8IG1pbk1vdmVtZW50WCkge1xuICAgICAgICAgICAgICAgIGltYWdlV3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2RhdGEteCcsIG1pbk1vdmVtZW50WCk7XG4gICAgICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGltYWdlV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0ucmVwbGFjZSgvXFwoXFwtXFxkKy8sICcoJyArIG1pbk1vdmVtZW50WCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy55ID4gbWF4TW92ZW1lbnRZKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLnNldEF0dHJpYnV0ZSgnZGF0YS15JywgbWF4TW92ZW1lbnRZKTtcbiAgICAgICAgICAgICAgICBpbWFnZVdyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gaW1hZ2VXcmFwcGVyLnN0eWxlLnRyYW5zZm9ybS5yZXBsYWNlKC8oLisgKShcXGQrKShweFxcLC4qKS8sICckMScgKyBtYXhNb3ZlbWVudFkgKyAnJDMnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMueSA8IG1pbk1vdmVtZW50WSkge1xuICAgICAgICAgICAgICAgIGltYWdlV3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2RhdGEteScsIG1pbk1vdmVtZW50WSk7XG4gICAgICAgICAgICAgICAgaW1hZ2VXcmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGltYWdlV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0ucmVwbGFjZSgvKC4rICkoXFwtXFxkKykocHhcXCwuKikvLCAnJDEnICsgbWluTW92ZW1lbnRZICsgJyQzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KCk7XG59XG5cbmltYWdlTGlnaHRCb3gucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZG93bmxvYWRVcmwpIHtcbiAgICAgICAgbGV0IHVybDtcbiAgICAgICAgaWYgKHVybCA9IHRoaXMuaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZG93bmxvYWQnKSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRvd25sb2FkVXJsID0gdXJsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAyNykge1xuICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheS5pc0V4aXN0KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxufVxuXG5pbWFnZUxpZ2h0Qm94LnByb3RvdHlwZS56b29tVXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaW1nID0gdGhpcy5vdmVybGF5LmltZygpO1xuICAgIGxldCBzY2FsZSA9IHBhcnNlSW50KGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2NhbGUnKSk7XG4gICAgc2NhbGUrKztcbiAgICBpbWcuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlM2QoJyArIHNjYWxlICsgJywgJyArIHNjYWxlICsgJywgMSknO1xuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2NhbGUnLCBzY2FsZSk7XG5cbiAgICB1dGlsLnJlbW92ZUNsYXNzKHRoaXMudG9vbGJhci5idXR0b25zLnpvb21PdXQsICdkaXNhYmxlZCcpO1xufVxuXG5pbWFnZUxpZ2h0Qm94LnByb3RvdHlwZS56b29tT3V0ID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGltZyA9IHRoaXMub3ZlcmxheS5pbWcoKTtcbiAgICBsZXQgc2NhbGUgPSBwYXJzZUludChpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLXNjYWxlJykpO1xuICAgIGlmIChzY2FsZSA+IDEpIHtcbiAgICAgICAgc2NhbGUtLTtcbiAgICAgICAgaW1nLnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZTNkKCcgKyBzY2FsZSArICcsICcgKyBzY2FsZSArICcsIDEpJztcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnZGF0YS1zY2FsZScsIHNjYWxlKTtcbiAgICAgICAgdGhpcy5tb3ZlbWVudC5yZXNldFBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgaWYgKHNjYWxlID09IDEpIHtcbiAgICAgICAgdXRpbC5hZGRDbGFzcyh0aGlzLnRvb2xiYXIuYnV0dG9ucy56b29tT3V0LCAnZGlzYWJsZWQnKTtcbiAgICB9XG59XG5cbmltYWdlTGlnaHRCb3gucHJvdG90eXBlLnNob3dPdmVybGF5ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBvO1xuICAgIC8vIG92ZXJsYXkgZXhpc3RcbiAgICBpZiAobyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMub3ZlcmxheS5pZCkpIHtcbiAgICAgICAgby5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheS5kb20oKSk7XG4gICAgICAgIHRoaXMubW92ZW1lbnQucnVuKCk7XG4gICAgfVxufVxuXG5pbWFnZUxpZ2h0Qm94LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIFRPRE8gYmVmb3JlIHNob3dcbiAgICB0aGlzLnNob3dPdmVybGF5KCk7XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5pbWFnZVByb2Nlc3NpbmcpIHtcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvYWRpbmcuc2hvdygpO1xuICAgIH1cblxuICAgIC8vIFRPRE8gYWZ0ZXIgc2hvd1xufVxuXG5pbWFnZUxpZ2h0Qm94LnByb3RvdHlwZS5oaWRlT3ZlcmxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZWxlbWVudDtcbiAgICBpZiAoZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMub3ZlcmxheS5pZCkpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbn1cblxuaW1hZ2VMaWdodEJveC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gVE9ETyBiZWZvcmUgY2xvc2VcbiAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuY2FjaGUpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5LmRlc3Ryb3koKTtcbiAgICB9XG4gICAgLy8gVE9ETyBhZnRlciBjbG9zZVxufVxuXG5pbWFnZUxpZ2h0Qm94LnByb3RvdHlwZS5maW5kSW1hZ2VVcmwgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHVybDtcbiAgICBpZiAodXJsID0gdGhpcy5pdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pbWcnKSkge1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW0uZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgICB9XG59XG5cbmltYWdlTGlnaHRCb3gucHJvdG90eXBlLmxvYWRJbWFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgaW1nID0gdGhpcy5vdmVybGF5LmltZygpO1xuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpO1xuICAgIHRoaXMubG9hZGluZy5zaG93KCk7XG5cbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnRvb2xiYXIuYnV0dG9ucy56b29tT3V0LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgICAgICAgdGhpcy50b29sYmFyLmJ1dHRvbnMuem9vbVVwLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJzsgICAgICAgIFxuICAgICAgICB0aGlzLnRvb2xiYXIuYnV0dG9ucy5kb3dubG9hZC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgICAgIHRoaXMubG9hZGluZy5oaWRlKCk7XG4gICAgfVxufVxuXG5pbWFnZUxpZ2h0Qm94LnByb3RvdHlwZS5pbWFnZVByb2Nlc3NDb21wbGV0ZSA9IGZ1bmN0aW9uIChzcmMsIGRvd25sb2FkVXJsLCBjYWxsYmFjaykge1xuICAgIHRoaXMub3B0aW9ucy5pbWFnZVByb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICB2YXIgaW1nID0gdGhpcy5vdmVybGF5LmltZygpO1xuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgc3JjKTtcbiAgICB0aGlzLm92ZXJsYXkuZG9tKCkucXVlcnlTZWxlY3RvcignYS5kb3dubG9hZCcpLnNldEF0dHJpYnV0ZSgnaHJlZicsIGRvd25sb2FkVXJsKTtcbiAgICB0aGlzLmxvYWRJbWFnZSgpO1xuXG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGltYWdlTGlnaHRCb3g7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2ZvbnQtYXdlc29tZS9zY3NzL2ZvbnQtYXdlc29tZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCB1dGlsID0ge1xuICAgIHJlbW92ZUVsZW1lbnQgKGVsKSB7XG4gICAgICAgIGVsLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWwpO1xuICAgIH0sXG4gICAgd2luZG93V2lkdGggKCkge1xuICAgICAgICByZXR1cm4gaXNOYU4od2luZG93LmlubmVyV2lkdGgpID8gd2luZG93LmNsaWVudFdpZHRoIDogd2luZG93LmlubmVyV2lkdGg7XG4gICAgfSxcbiAgICB3aW5kb3dIZWlnaHQgKCkge1xuICAgICAgICByZXR1cm4gaXNOYU4od2luZG93LmlubmVySGVpZ2h0KSA/IHdpbmRvdy5jbGllbnRIZWlnaHQgOiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgfSxcbiAgICBleHRlbmQgKG9sZE9iamVjdCwgbmV3T2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBvbGRPYmplY3QsIG5ld09iamVjdCk7XG4gICAgfSxcbiAgICBodG1sVG9Eb20gKGh0bWwpIHtcbiAgICAgICAgbGV0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgd3JhcHBlci5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHdyYXBwZXIuZmlyc3RDaGlsZDtcbiAgICB9LFxuICAgIGFkZENsYXNzIChlbCwgY2xhc3NOYW1lKSB7XG4gICAgICAgIGlmICghZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XG4gICAgICAgIH1cbiAgICB9LCBcbiAgICByZW1vdmVDbGFzcyAoZWwsIGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoIWVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZWwuaGFzQ2xhc3MoZWwsIGNsYXNzTmFtZSkpIHtcblxuICAgICAgICAgICAgICAgIGxldCBjbGFzc2VzID0gZWwuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgICAgICAgICBjbGFzc2VzLnNwbGljZShjbGFzc2VzLmluZGV4T2YoY2xhc3NOYW1lKSwgMSk7XG4gICAgICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKFwiIFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgaGFzQ2xhc3MgKGVsLCBjbGFzc05hbWUpIHtcbiAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGVsLmNsYXNzTmFtZS5tYXRjaChuZXcgUmVnRXhwKCdcXGInICsgY2xhc3NOYW1lICsgJ1xcYicpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1dGlsO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0Jywge2Fzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGN0eCAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV1cbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGtleSwgb3duLCBvdXQ7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbihDKXtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICAgIGlmKHRoaXMgaW5zdGFuY2VvZiBDKXtcbiAgICAgICAgICBzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQztcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYoSVNfUFJPVE8pe1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0paGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWAgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBkUCAgICAgICAgICAgICA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpe1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKXRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmKCd2YWx1ZScgaW4gQXR0cmlidXRlcylPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIFMpe1xuICBpZighaXNPYmplY3QoaXQpKXJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZighUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUFMgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElPYmplY3QgID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgJGFzc2lnbiAgPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICB2YXIgQSA9IHt9XG4gICAgLCBCID0ge31cbiAgICAsIFMgPSBTeW1ib2woKVxuICAgICwgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uKGspeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUICAgICA9IHRvT2JqZWN0KHRhcmdldClcbiAgICAsIGFMZW4gID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgaW5kZXggPSAxXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mXG4gICAgLCBpc0VudW0gICAgID0gcElFLmY7XG4gIHdoaWxlKGFMZW4gPiBpbmRleCl7XG4gICAgdmFyIFMgICAgICA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKVxuICAgICAgLCBrZXlzICAgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGogICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKGxlbmd0aCA+IGopaWYoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSlUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtYXggICAgICAgPSBNYXRoLm1heFxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==