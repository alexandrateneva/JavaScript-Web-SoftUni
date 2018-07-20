import Junior from './Junior';
import Senior from './Senior';
import Manager from './Manager';

function createTeam(juniorInfo, seniorInfo, managerInfo) {
    let junior = new Junior(juniorInfo.name, juniorInfo.age);
    console.log(junior);
    junior.salary = 2000;
    junior.work();
    junior.collectSalary();

    console.log('------------------------');

    let senior = new Senior(seniorInfo.name, seniorInfo.age);
    console.log(senior);
    senior.salary = 5000;
    senior.work();
    senior.collectSalary();

    console.log('------------------------');

    let manager = new Manager(managerInfo.name, managerInfo.age);
    console.log(manager);
    manager.salary = 10000;
    manager.divident = 2000;
    manager.work();
    manager.collectSalary();
}

createTeam({ name: 'Pesho', age: 22 },
    { name: 'Ivan', age: 34 },
    { name: 'Maria', age: 46 });
    