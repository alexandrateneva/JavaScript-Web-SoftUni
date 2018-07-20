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
var Employee_1 = require('./Employee');
var Junior = /** @class */ (function (_super) {
  __extends(Junior, _super);
  function Junior (name, age) {
    var _this = _super.call(this, name, age) || this;
    _this.tasks.push(_this.name + ' is working on a simple task.');
    return _this;
  }
  return Junior;
}(Employee_1['default']));
exports['default'] = Junior;
