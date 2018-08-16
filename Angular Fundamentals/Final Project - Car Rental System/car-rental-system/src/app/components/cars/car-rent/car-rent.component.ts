import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CarModel } from '../../../core/models/cars/car.model';
import { CarsService } from '../../../core/services/cars.service';
import { NgbdDatepickerRange } from '../datepicker-range/datepicker-range.component';

@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.component.html',
  styleUrls: ['./car-rent.component.css']
})
export class CarRentComponent implements OnInit {
  startDate: Date;
  endDate: Date;
  period: number = 1;
  car: CarModel;
  id: string;

  popoverTitle: string = 'Rent Confirmation';
  popoverMessage: string = 'Are you sure you want to rent this car?';

  constructor(private carsService: CarsService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.carsService.getDetails(this.id).subscribe(data => {
      this.car = data;
    });
  }

  changeDays(data): void {
    if (data.length === 1) {
      this.period = 1;
    } else {
      this.startDate = data[0];
      this.endDate = data[1];

      let diff = Math.abs(this.startDate.getTime() - this.endDate.getTime());
      let days = Math.ceil(diff / (1000 * 3600 * 24));
      this.period = days + 1;
    }
  }

  get days(): number {
    return this.period;
  }

  get totalSum(): number {
    return this.days * this.car.pricePerDay;
  }

  rent() {
    //TODO: rent
  }
}
