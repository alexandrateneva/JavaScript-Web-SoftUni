'use strict';
exports.__esModule = true;
var Ticket = /** @class */ (function () {
  function Ticket (destination, price, status) {
    this.destination = destination;
    this.price = Number(price);
    this.status = status;
  }
  return Ticket;
}());
exports['default'] = Ticket;
