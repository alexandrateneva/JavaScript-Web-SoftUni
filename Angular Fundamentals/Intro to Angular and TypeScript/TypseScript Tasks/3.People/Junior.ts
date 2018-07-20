import Employee from './Employee';

export default class Junior extends Employee {
    constructor(name: string, age: number) {
        super(name, age);
        this.tasks.push(`${this.name} is working on a simple task.`)
    }
}