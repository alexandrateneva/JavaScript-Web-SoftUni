export default abstract class Employee {
    public name: string;
    public age: number;
    public salary: number;
    public tasks: Array<string>;

    constructor(name, age) {
        this.name = name;
        this.age = Number(age);
        this.salary = 0;
        this.tasks = [];
    }

    work(): void {
        for (let task of this.tasks) {
            console.log(task);
        }
    }

    getSalary(): number {
        return this.salary;
    }

    collectSalary(): void {
        console.log(`${this.name} received ${this.getSalary()} this month.`);
    }
}