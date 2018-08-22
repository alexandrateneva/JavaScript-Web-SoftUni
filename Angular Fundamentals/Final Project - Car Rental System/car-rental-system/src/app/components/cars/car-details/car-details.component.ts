import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs';
import { CarModel } from '../../../core/models/cars/car.model';
import { CarsService } from '../../../core/services/cars.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  car: CarModel;
  id: string;

  constructor(
    private carsService: CarsService,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.spinnerService.show();
    this.carsService.getDetails(this.id).subscribe(data => {
      this.car = data;
      this.spinnerService.hide();
    });
  }
}
