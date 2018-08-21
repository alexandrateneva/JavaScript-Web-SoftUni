export class RentModel {
    constructor(
        public _id: string,
        public car: {
            _id: string,
            make: string,
            model: string,
            imageUrl: string
        },
        public user: {
            _id: string,
            firstName: string,
            lastName: string,
            email: string
        },
        public startDate: Date,
        public endDate: Date,
        public totalSum: number
    ) { }
}