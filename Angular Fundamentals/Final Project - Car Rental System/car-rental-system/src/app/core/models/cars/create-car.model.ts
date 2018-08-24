import { VoteModel } from "./vote.model";

export class CreateCarModel {
    constructor(
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