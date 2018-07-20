import Ticket from './Ticket';

function orderTickets(ticketsData: Array<string>, criteria: string) {
    let tickets = [];

    for (let data of ticketsData) {
        let info = data.split('|');
        tickets.push(new Ticket(info[0], info[1], info[2]));
    }

    tickets.sort(function (a, b) {
        if (a[criteria] < b[criteria]) {
            return -1;
        }
        if (a[criteria] > b[criteria]) {
            return 1;
        }
        return 0;
    });

    return tickets;
}


console.log(orderTickets(['Philadelphia|94.25|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.25|departed'],
    'destination'
));

console.log('------------------------');

console.log(orderTickets(['Philadelphia|94.25|available',
    'New York City|95.99|sold',
    'New York City|95.99|available',
    'Boston|126.25|departed'],
    'status'
));

console.log('------------------------');

console.log(orderTickets(['Philadelphia|94.25|available',
    'New York City|95.99|sold',
    'Boston|126.25|departed',
    'New York City|95.99|available'],
    'price'
));