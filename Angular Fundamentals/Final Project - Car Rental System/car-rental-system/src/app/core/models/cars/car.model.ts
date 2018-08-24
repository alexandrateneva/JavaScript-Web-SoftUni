import { VoteModel } from "./vote.model";

export class CarModel {
    constructor(
        public _id: string,
        public make: string,
        public model: string,
        public imageUrl: string,
        public year: number,
        public fuelType: string,
        public engine: string,
        public powerOutput: number,
        public pricePerDay: number,
        public votes: Array<VoteModel>
    ) { }
}