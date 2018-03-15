(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["app"] = factory();
	else
		root["app"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return webpackJsonp_name_([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

var _canvas = __webpack_require__(3);

var DrawText = _interopRequireWildcard(_canvas);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(function () {
  DrawText.drawStroked('canvas', 'THIS\nIS THE\nTEXT', 100, '#000', 0, 0);
})();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.drawStroked = function (canvasElem, text, fontSize, color, offsetX, offsetY) {
  var line = text.split('\n'),
      canvas = document.querySelector(canvasElem);

  undefined.ctx = canvas.getContext('2d');
  undefined.ctx.font = fontSize + 'px ' + 'TimesNewRoman';
  undefined.ctx.strokeStyle = color;
  undefined.ctx.lineWidth = 2;
  undefined.ctx.textBaseline = 'middle';
  undefined.ctx.textAlign = 'center';
  var positionX = undefined.ctx.canvas.width / 3;
  var positionY = undefined.ctx.canvas.height / 4;

  if (offsetX !== 0) {
    positionX += offsetX;
  }

  if (offsetY !== 0) {
    positionY += offsetY;
  }
  for (var i = 0; i < line.length; i++) {
    for (var j = 0; j < line[i].length; j++) {
      var letterSpacing = 0;
      var lineHeight = positionY;

      if (line[i][j] === line[i].length) {
        lineHeight = lineHeight * i;
      }
      undefined.ctx.strokeText(line[i][j], positionX + (letterSpacing + j * 130), positionY + i * fontSize);
    }
  }
};

/***/ })
],[0]);
});
//# sourceMappingURL=app.js.map