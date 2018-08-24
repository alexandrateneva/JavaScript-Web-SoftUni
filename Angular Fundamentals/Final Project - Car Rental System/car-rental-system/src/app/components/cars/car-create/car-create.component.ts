import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../../core/services/cars.service';
import { CreateCarModel } from '../../../core/models/cars/create-car.model';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css']
})
export class CarCreateComponent implements OnInit {
  bindingModel: CreateCarModel;
  errorMsg: string;

  constructor(private carsService: CarsService) {
    this.bindingModel = new CreateCarModel('', '', '', 1980, '', '', 0, 10, []);
  }

  create() {
    this.carsService
      .create(this.bindingModel)
      .subscribe();
  }

  ngOnInit() {
  }
}
