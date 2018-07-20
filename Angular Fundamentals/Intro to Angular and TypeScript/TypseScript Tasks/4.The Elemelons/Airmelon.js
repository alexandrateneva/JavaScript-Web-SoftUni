'use strict';
var __extends = (this && this.__extends) || (function () {
  var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
  return function (d, b) {
    extendStatics(d, b);
    function __ () { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
exports.__esModule = true;
var Melon_1 = require('./Melon');
var Airmelon = /** @class */ (function (_super) {
  __extends(Airmelon, _super);
  function Airmelon (weight, melonSort) {
    return _super.call(this, 'Air', weight, melonSort) || this;
  }
  return Airmelon;
}(Melon_1['default']));
exports['default'] = Airmelon;
