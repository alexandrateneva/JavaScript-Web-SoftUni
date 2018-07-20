'use strict';
exports.__esModule = true;
var Employee = /** @class */ (function () {
  function Employee (name, age) {
    this.name = name;
    this.age = Number(age);
    this.salary = 0;
    this.tasks = [];
  }
  Employee.prototype.work = function () {
    for (var _i = 0, _a = this.tasks; _i < _a.length; _i++) {
      var task = _a[_i];
      console.log(task);
    }
  };
  Employee.prototype.getSalary = function () {
    return this.salary;
  };
  Employee.prototype.collectSalary = function () {
    console.log(this.name + ' received ' + this.getSalary() + ' this month.');
  };
  return Employee;
}());
exports['default'] = Employee;
