export class UserModel {
    constructor(
        public _id: string,
        public username: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public age: number
    ) { }
}