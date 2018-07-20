import Employee from './Employee';

export default class Manager extends Employee {
    public divident: number;

    constructor(name: string, age: number) {
        super(name, age);
        this.divident = 0;        
        this.tasks.push(`${this.name} scheduled a meeting.`);
        this.tasks.push(`${this.name} is preparing a quarterly report.`);
    }

    getSalary(): number {
        return this.salary + this.divident;
    }
}