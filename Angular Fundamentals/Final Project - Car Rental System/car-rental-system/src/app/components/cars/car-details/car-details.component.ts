import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModel } from '../../../core/models/cars/car.model';
import { CarsService } from '../../../core/services/cars.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  car: Observable<CarModel>;
  id: string;

  constructor(private carsService: CarsService,private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.car = this.carsService.getDetails(this.id);
  }
}
