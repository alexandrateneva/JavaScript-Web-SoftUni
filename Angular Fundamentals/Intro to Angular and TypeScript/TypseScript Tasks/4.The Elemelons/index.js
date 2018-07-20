'use strict';
exports.__esModule = true;
var Watermelon_1 = require('./Watermelon');
var Firemelon_1 = require('./Firemelon');
var Airmelon_1 = require('./Airmelon');
var Earthmelon_1 = require('./Earthmelon');
var Melolemonmelon_1 = require('./Melolemonmelon');
(function createMelons () {
  var watermelon = new Watermelon_1['default'](12.5, 'Kingsize');
  console.log(watermelon.toString());
  var firemelon = new Firemelon_1['default'](5, 'Little');
  console.log(firemelon.toString());
  var airmelon = new Airmelon_1['default'](9.7, 'Medium');
  console.log(airmelon.toString());
  var earthmelon = new Earthmelon_1['default'](14.5, 'Kingsize');
  console.log(earthmelon.toString());
  var melolemonmelon = new Melolemonmelon_1['default'](10.1, 'Big');
  console.log(melolemonmelon.toString());
  melolemonmelon.morph();
  melolemonmelon.morph();
  console.log(melolemonmelon.toString());
})();
