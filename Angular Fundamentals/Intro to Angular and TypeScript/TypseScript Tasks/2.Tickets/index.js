'use strict';
exports.__esModule = true;
var Ticket_1 = require('./Ticket');
function orderTickets (ticketsData, criteria) {
  var tickets = [];
  for (var _i = 0, ticketsData_1 = ticketsData; _i < ticketsData_1.length; _i++) {
    var data = ticketsData_1[_i];
    var info = data.split('|');
    tickets.push(new Ticket_1['default'](info[0], info[1], info[2]));
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
  'Boston|126.25|departed'], 'destination'));
console.log('------------------------');
console.log(orderTickets(['Philadelphia|94.25|available',
  'New York City|95.99|sold',
  'New York City|95.99|available',
  'Boston|126.25|departed'], 'status'));
console.log('------------------------');
console.log(orderTickets(['Philadelphia|94.25|available',
  'New York City|95.99|sold',
  'Boston|126.25|departed',
  'New York City|95.99|available'], 'price'));
