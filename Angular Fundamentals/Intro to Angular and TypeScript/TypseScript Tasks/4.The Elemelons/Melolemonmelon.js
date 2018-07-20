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
var names = ['Water', 'Fire', 'Earth', 'Air'];
var Melolemonmelon = /** @class */ (function (_super) {
  __extends(Melolemonmelon, _super);
  function Melolemonmelon (weight, melonSort) {
    var _this = _super.call(this, 'Water', weight, melonSort) || this;
    _this.index = 0;
    return _this;
  }
  Melolemonmelon.prototype.morph = function () {
    if (this.index < 3) {
      this.index++;
    } else {
      this.index = 0;
    }
    this.name = names[this.index];
  };
  return Melolemonmelon;
}(Melon_1['default']));
exports['default'] = Melolemonmelon;
