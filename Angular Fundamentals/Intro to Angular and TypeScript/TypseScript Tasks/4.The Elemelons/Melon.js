'use strict';
exports.__esModule = true;
var Melon = /** @class */ (function () {
  function Melon (name, weight, melonSort) {
    this.name = name;
    this.weight = weight;
    this.melonSort = melonSort;
    this.elementIndex = this.weight * this.melonSort.length;
  }
  Melon.prototype.toString = function () {
    var str = 'Element: ' + this.name + '\n' + ('Sort: ' + this.melonSort + '\n') + ('Element Index: ' + this.elementIndex.toFixed(2) + '\n');
    return str;
  };
  return Melon;
}());
exports['default'] = Melon;
