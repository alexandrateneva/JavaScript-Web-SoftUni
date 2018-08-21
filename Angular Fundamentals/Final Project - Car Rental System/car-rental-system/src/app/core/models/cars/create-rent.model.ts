export class CreateRentModel {
    constructor(
        public car: {
            id: string,
            make: string,
            model: string
        },
        public user: {
            id: string,
            firstName: string,
            lastName: string,
            email: string
        },
        public startDate: Date,
        public endDate: Date,
        public totalSum: number
    ) { }
}