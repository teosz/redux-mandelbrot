(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["es6Boilerplate"] = factory();
	else
		root["es6Boilerplate"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _mandelbrot = __webpack_require__(2);
	
	var _mandelbrot2 = _interopRequireDefault(_mandelbrot);
	
	var _store = __webpack_require__(3);
	
	var _store2 = _interopRequireDefault(_store);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var draw = function draw(canvas) {
	  _store2.default.subscribe(function (state) {
	    var _store$getState = _store2.default.getState(),
	        data = _store$getState.data,
	        width = _store$getState.width,
	        height = _store$getState.height;
	
	    var uintData = new Uint8ClampedArray(data);
	    canvas.width = width;
	    canvas.height = height;
	    canvas.getContext('2d').putImageData(new ImageData(uintData, width, height), 0, 0);
	  });
	  var i = 1;
	  var iterations = 200;
	  var increment = 1;
	  setInterval(function () {
	    console.log("here...", i);
	    if (i % 50 === 0) {
	      iterations += 50;
	      increment += 5;
	    }
	    _store2.default.dispatch({
	      type: 'DRAW',
	      // const offset = i
	      // if(i>100)
	      payload: {
	        offset: i,
	        zoom: i / 1.5
	      }
	    });
	    i += increment;
	  }, 300);
	};
	window.draw = draw;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getIteration = function getIteration(cX, cY, nrIter) {
	  var x = 0.0,
	      y = 0.0,
	      xx = 0,
	      yy = 0,
	      xy = 0,
	      i = nrIter;
	  while (i-- && xx + yy <= 4) {
	    xy = x * y;
	    xx = x * x;
	    yy = y * y;
	    x = xx - yy + cX;
	    y = xy + xy + cY;
	  }
	  return nrIter - i;
	};
	
	exports.default = function (_ref) {
	  var data = _ref.data,
	      width = _ref.width,
	      height = _ref.height,
	      start = _ref.start,
	      zoom = _ref.zoom,
	      offset = _ref.offset,
	      iterations = _ref.iterations;
	  var xmin = start.xmin,
	      xmax = start.xmax,
	      ymin = start.ymin,
	      ymax = start.ymax;
	
	  for (var ix = 0; ix < width; ++ix) {
	    for (var iy = 0; iy < height; ++iy) {
	      var x = xmin + (xmax - xmin) * ix / (width - 1);
	      var y = ymin + (ymax - ymin) * iy / (height - 1);
	      y = y / zoom;
	      x = (x - offset) / zoom;
	      var i = getIteration(x, y, iterations);
	      var ppos = 4 * (width * iy + ix);
	
	      if (i > iterations) {
	        data[ppos] = 0;
	        data[ppos + 1] = 0;
	        data[ppos + 2] = 0;
	      } else {
	        var c = 3 * Math.log(i) / Math.log(iterations - 1.0);
	
	        if (c < 1) {
	          data[ppos] = 0;
	          data[ppos + 1] = 0;
	          data[ppos + 2] = 255 * c;
	        } else if (c < 2) {
	          data[ppos] = 0;
	          data[ppos + 1] = 255 * (c - 1);
	          data[ppos + 2] = 255;
	        } else {
	          data[ppos] = 255;
	          data[ppos + 1] = 255;
	          data[ppos + 2] = 255 * (c - 2);
	        }
	      }
	      data[ppos + 3] = 255;
	    }
	  }
	  return data;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _lightRedux = __webpack_require__(4);
	
	var _lightRedux2 = _interopRequireDefault(_lightRedux);
	
	var _mandelbrot = __webpack_require__(2);
	
	var _mandelbrot2 = _interopRequireDefault(_mandelbrot);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var width = document.body.clientWidth;
	var height = document.body.clientHeight;
	
	var initialState = {
	  width: width,
	  height: height,
	  data: [],
	  iterations: 200,
	  start: {
	    xmin: -2,
	    xmax: 1,
	    ymin: -1,
	    ymax: 1
	  },
	  offset: 1,
	  zoom: 1
	
	};
	exports.default = (0, _lightRedux2.default)(function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  if (action.type == 'DRAW') {
	    var data = (0, _mandelbrot2.default)(state);
	    return _extends({
	      data: data
	    }, state, action.payload);
	  }
	  return state;
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (reducer) {
	  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : reducer(undefined, { type: "@@INIT" });
	
	  var subscribers = new Set();
	  return {
	    dispatch: function dispatch(action) {
	      state = reducer(state, action);
	      subscribers.forEach(function (func) {
	        return func();
	      });
	    },
	    subscribe: function subscribe(func) {
	      subscribers.add(func);
	      return function () {
	        return subscribers.delete(func);
	      };
	    },
	    getState: function getState() {
	      return state;
	    }
	  };
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyNmJiM2E0MzdkNTQ3YzkxZDY3YiIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbWFuZGVsYnJvdC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvc3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2xpZ2h0LXJlZHV4LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwiZHJhdyIsImNhbnZhcyIsInN1YnNjcmliZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJkYXRhIiwid2lkdGgiLCJoZWlnaHQiLCJ1aW50RGF0YSIsIlVpbnQ4Q2xhbXBlZEFycmF5IiwiZ2V0Q29udGV4dCIsInB1dEltYWdlRGF0YSIsIkltYWdlRGF0YSIsImkiLCJpdGVyYXRpb25zIiwiaW5jcmVtZW50Iiwic2V0SW50ZXJ2YWwiLCJjb25zb2xlIiwibG9nIiwiZGlzcGF0Y2giLCJ0eXBlIiwicGF5bG9hZCIsIm9mZnNldCIsInpvb20iLCJ3aW5kb3ciLCJnZXRJdGVyYXRpb24iLCJjWCIsImNZIiwibnJJdGVyIiwieCIsInkiLCJ4eCIsInl5IiwieHkiLCJzdGFydCIsInhtaW4iLCJ4bWF4IiwieW1pbiIsInltYXgiLCJpeCIsIml5IiwicHBvcyIsImMiLCJNYXRoIiwiZG9jdW1lbnQiLCJib2R5IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJpbml0aWFsU3RhdGUiLCJhY3Rpb24iLCJyZWR1Y2VyIiwidW5kZWZpbmVkIiwic3Vic2NyaWJlcnMiLCJTZXQiLCJmb3JFYWNoIiwiZnVuYyIsImFkZCIsImRlbGV0ZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNE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ZixPQUFPLDBCQUFXRixLQUFYLENBQWI7QUFDQTtBQUNFRTtBQURGLFFBRUtGLEtBRkwsRUFHSzhDLE9BQU81QixPQUhaO0FBS0Q7QUFDRCxVQUFPbEIsS0FBUDtBQUNELEVBVmMsQzs7Ozs7Ozs7Ozs7O21CQ3RCQSxVQUFDK0MsT0FBRCxFQUE2RDtBQUFBLE9BQW5EL0MsS0FBbUQsdUVBQTNDK0MsUUFBUUMsU0FBUixFQUFtQixFQUFFL0IsTUFBTSxRQUFSLEVBQW5CLENBQTJDOztBQUMxRSxPQUFNZ0MsY0FBYyxJQUFJQyxHQUFKLEVBQXBCO0FBQ0EsVUFBTztBQUNMbEMsZUFBVSxrQkFBQzhCLE1BQUQsRUFBWTtBQUNwQjlDLGVBQVErQyxRQUFRL0MsS0FBUixFQUFlOEMsTUFBZixDQUFSO0FBQ0FHLG1CQUFZRSxPQUFaLENBQW9CO0FBQUEsZ0JBQVFDLE1BQVI7QUFBQSxRQUFwQjtBQUNELE1BSkk7QUFLTHJELGdCQUFXLG1CQUFDcUQsSUFBRCxFQUFVO0FBQ25CSCxtQkFBWUksR0FBWixDQUFnQkQsSUFBaEI7QUFDQSxjQUFPO0FBQUEsZ0JBQU1ILFlBQVlLLE1BQVosQ0FBbUJGLElBQW5CLENBQU47QUFBQSxRQUFQO0FBQ0QsTUFSSTtBQVNMbkQsZUFBVTtBQUFBLGNBQU1ELEtBQU47QUFBQTtBQVRMLElBQVA7QUFXRCxFIiwiZmlsZSI6Ii4vZGlzdC9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJlczZCb2lsZXJwbGF0ZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJlczZCb2lsZXJwbGF0ZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyNmJiM2E0MzdkNTQ3YzkxZDY3YiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvbWFpbicpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaW5kZXguanMiLCIndXNlIHN0cmljdCc7XG5pbXBvcnQgbWFuZGVsYnJvdCBmcm9tICcuL21hbmRlbGJyb3QnO1xuaW1wb3J0IHN0b3JlIGZyb20gJy4vc3RvcmUnO1xuXG5jb25zdCBkcmF3ID0gKGNhbnZhcykgPT4ge1xuICBzdG9yZS5zdWJzY3JpYmUoKHN0YXRlKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhLCB3aWR0aCwgaGVpZ2h0IH0gPSBzdG9yZS5nZXRTdGF0ZSgpO1xuICAgIGNvbnN0IHVpbnREYXRhID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGRhdGEpO1xuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgY2FudmFzLmdldENvbnRleHQoJzJkJykucHV0SW1hZ2VEYXRhKG5ldyBJbWFnZURhdGEodWludERhdGEsIHdpZHRoLCBoZWlnaHQpLCAwLCAwKTtcbiAgfSk7XG4gIGxldCBpID0gMTtcbiAgbGV0IGl0ZXJhdGlvbnMgPSAyMDA7XG4gIGxldCBpbmNyZW1lbnQgPSAxO1xuICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJoZXJlLi4uXCIsIGkpO1xuICAgIGlmKGkgJSA1MCA9PT0gMCkge1xuICAgICAgaXRlcmF0aW9ucys9NTA7XG4gICAgICBpbmNyZW1lbnQrPTU7XG4gICAgfVxuICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICdEUkFXJyxcbiAgICAgIC8vIGNvbnN0IG9mZnNldCA9IGlcbiAgICAgIC8vIGlmKGk+MTAwKVxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBvZmZzZXQ6IGksXG4gICAgICAgIHpvb206IGkvMS41LFxuICAgICAgfVxuICAgIH0pO1xuICAgIGkrPWluY3JlbWVudDtcblxuICB9LCAzMDApXG59XG53aW5kb3cuZHJhdyA9IGRyYXc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvbWFpbi5qcyIsImNvbnN0IGdldEl0ZXJhdGlvbiA9IChjWCwgY1ksIG5ySXRlcikgPT4ge1xuICBsZXQgeCA9IDAuMCwgeSA9IDAuMCwgeHggPSAwLCB5eSA9IDAsIHh5ID0gMCwgaSA9IG5ySXRlcjtcbiAgd2hpbGUgKGktLSAmJiB4eCArIHl5IDw9IDQpIHtcbiAgICB4eSA9IHggKiB5O1xuICAgIHh4ID0geCAqIHg7XG4gICAgeXkgPSB5ICogeTtcbiAgICB4ID0geHggLSB5eSArIGNYO1xuICAgIHkgPSB4eSArIHh5ICsgY1k7XG4gIH1cbiAgcmV0dXJuIG5ySXRlciAtIGk7XG59XG5cbmV4cG9ydCBkZWZhdWx0ICh7ZGF0YSwgd2lkdGgsIGhlaWdodCwgc3RhcnQsIHpvb20sIG9mZnNldCwgaXRlcmF0aW9uc30pID0+IHtcbiAgY29uc3QgeyB4bWluLCB4bWF4LCB5bWluLCB5bWF4IH0gPSBzdGFydDtcbiAgZm9yIChsZXQgaXggPSAwOyBpeCA8IHdpZHRoOyArK2l4KSB7XG4gICAgZm9yIChsZXQgaXkgPSAwOyBpeSA8IGhlaWdodDsgKytpeSkge1xuICAgICAgbGV0IHggPSB4bWluICsgKHhtYXggLSB4bWluKSAqIGl4IC8gKHdpZHRoIC0gMSk7XG4gICAgICBsZXQgeSA9IHltaW4gKyAoeW1heCAtIHltaW4pICogaXkgLyAoaGVpZ2h0IC0gMSk7XG4gICAgICB5ID0geS96b29tO1xuICAgICAgeCA9ICh4IC0gb2Zmc2V0KS96b29tO1xuICAgICAgbGV0IGkgPSBnZXRJdGVyYXRpb24oeCwgeSwgaXRlcmF0aW9ucyk7XG4gICAgICBsZXQgcHBvcyA9IDQgKiAod2lkdGggKiBpeSArIGl4KTtcblxuICAgICAgaWYgKGkgPiBpdGVyYXRpb25zKSB7XG4gICAgICAgIGRhdGFbcHBvc10gPSAwO1xuICAgICAgICBkYXRhW3Bwb3MgKyAxXSA9IDA7XG4gICAgICAgIGRhdGFbcHBvcyArIDJdID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBjID0gMyAqIE1hdGgubG9nKGkpIC8gTWF0aC5sb2coaXRlcmF0aW9ucyAtIDEuMCk7XG5cbiAgICAgICAgaWYgKGMgPCAxKSB7XG4gICAgICAgICAgZGF0YVtwcG9zXSA9IDA7XG4gICAgICAgICAgZGF0YVtwcG9zICsgMV0gPSAwO1xuICAgICAgICAgIGRhdGFbcHBvcyArIDJdID0gMjU1ICogYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggYyA8IDIgKSB7XG4gICAgICAgICAgZGF0YVtwcG9zXSA9IDA7XG4gICAgICAgICAgZGF0YVtwcG9zICsgMV0gPSAyNTUgKiAoYyAtIDEpO1xuICAgICAgICAgIGRhdGFbcHBvcyArIDJdID0gMjU1O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRhdGFbcHBvc10gPSAyNTU7XG4gICAgICAgICAgZGF0YVtwcG9zICsgMV0gPSAyNTU7XG4gICAgICAgICAgZGF0YVtwcG9zICsgMl0gPSAyNTUgKiAoYyAtIDIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkYXRhW3Bwb3MgKyAzXSA9IDI1NTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRhdGE7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvbWFuZGVsYnJvdC5qcyIsImltcG9ydCBjcmVhdGVTdG9yZSBmcm9tICcuL2xpZ2h0LXJlZHV4JztcbmltcG9ydCBtYW5kZWxicm90IGZyb20gJy4vbWFuZGVsYnJvdCc7XG5cblxuY29uc3Qgd2lkdGggPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuY29uc3QgaGVpZ2h0ID0gZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQ7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgd2lkdGgsXG4gIGhlaWdodCxcbiAgZGF0YTogW10sXG4gIGl0ZXJhdGlvbnM6IDIwMCxcbiAgc3RhcnQ6IHtcbiAgICB4bWluOiAtMixcbiAgICB4bWF4OiAxLFxuICAgIHltaW4gOiAtMSxcbiAgICB5bWF4IDogMVxuICB9LFxuICBvZmZzZXQ6IDEsXG4gIHpvb206IDEsXG5cbn1cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVN0b3JlKChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGlmKGFjdGlvbi50eXBlID09ICdEUkFXJykge1xuICAgIGNvbnN0IGRhdGEgPSBtYW5kZWxicm90KHN0YXRlKTtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YSxcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgLi4uYWN0aW9uLnBheWxvYWQsXG4gICAgfTtcbiAgfVxuICByZXR1cm4gc3RhdGU7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9zdG9yZS5qcyIsImV4cG9ydCBkZWZhdWx0IChyZWR1Y2VyLCBzdGF0ZSA9IHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IFwiQEBJTklUXCIgfSkpID0+IHtcbiAgY29uc3Qgc3Vic2NyaWJlcnMgPSBuZXcgU2V0KClcbiAgcmV0dXJuIHtcbiAgICBkaXNwYXRjaDogKGFjdGlvbikgPT4ge1xuICAgICAgc3RhdGUgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pXG4gICAgICBzdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmMgPT4gZnVuYygpKVxuICAgIH0sXG4gICAgc3Vic2NyaWJlOiAoZnVuYykgPT4ge1xuICAgICAgc3Vic2NyaWJlcnMuYWRkKGZ1bmMpXG4gICAgICByZXR1cm4gKCkgPT4gc3Vic2NyaWJlcnMuZGVsZXRlKGZ1bmMpXG4gICAgfSxcbiAgICBnZXRTdGF0ZTogKCkgPT4gc3RhdGVcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2xpZ2h0LXJlZHV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==