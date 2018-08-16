import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModel } from '../../../core/models/cars/car.model';
import { CarsService } from '../../../core/services/cars.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { deteleAnimation } from '../delete-car.animation';

@Component({
  selector: 'app-list-all-cars',
  templateUrl: './list-all-cars.component.html',
  styleUrls: ['./list-all-cars.component.css'],
  animations: deteleAnimation
})
export class ListAllCarsComponent implements OnInit {
  furnitures: CarModel[];
  cars: CarModel[];

  constructor(
    private carsService: CarsService,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.carsService.getAll().subscribe(data => {
      this.cars = data;
    });
  }

  deleteItem(id) {
    this.carsService.delete(id).subscribe(() => {
      this.cars = this.cars.filter(f => f._id !== id);
      this.toastr.success('Car deleted!', 'Warning!');
    })
  }
}
