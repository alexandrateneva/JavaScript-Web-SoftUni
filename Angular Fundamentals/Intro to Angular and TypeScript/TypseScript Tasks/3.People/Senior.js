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
var Senior = /** @class */ (function (_super) {
  __extends(Senior, _super);
  function Senior (name, age) {
    var _this = _super.call(this, name, age) || this;
    _this.tasks.push(_this.name + ' is working on a complicated task.');
    _this.tasks.push(_this.name + ' is taking time off work.');
    _this.tasks.push(_this.name + ' is supervising junior workers.');
    return _this;
  }
  return Senior;
}(Employee_1['default']));
exports['default'] = Senior;
