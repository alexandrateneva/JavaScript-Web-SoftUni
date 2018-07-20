'use strict';
exports.__esModule = true;
var Junior_1 = require('./Junior');
var Senior_1 = require('./Senior');
var Manager_1 = require('./Manager');
function createTeam (juniorInfo, seniorInfo, managerInfo) {
  var junior = new Junior_1['default'](juniorInfo.name, juniorInfo.age);
  console.log(junior);
  junior.salary = 2000;
  junior.work();
  junior.collectSalary();
  console.log('------------------------');
  var senior = new Senior_1['default'](seniorInfo.name, seniorInfo.age);
  console.log(senior);
  senior.salary = 5000;
  senior.work();
  senior.collectSalary();
  console.log('------------------------');
  var manager = new Manager_1['default'](managerInfo.name, managerInfo.age);
  console.log(manager);
  manager.salary = 10000;
  manager.divident = 2000;
  manager.work();
  manager.collectSalary();
}
createTeam({ name: 'Pesho', age: 22 }, { name: 'Ivan', age: 34 }, { name: 'Maria', age: 46 });
