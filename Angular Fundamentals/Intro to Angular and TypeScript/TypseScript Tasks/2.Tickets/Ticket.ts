export default class Ticket {
    public destination: string;
    public price: number;
    public status: string;

    constructor(destination, price, status){
        this.destination = destination;
        this.price = Number(price);
        this.status = status;
    }
}