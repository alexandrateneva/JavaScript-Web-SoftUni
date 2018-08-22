import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner'; 
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
  cars: CarModel[];  
  pageSize: number = 3;
  currentPage: number = 1;

  constructor(
    private carsService: CarsService,
    private authService: AuthService,
    private toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.carsService.getAll().subscribe(data => {
      this.cars = data;      
      this.spinnerService.hide();
    });
  }

  deleteItem(id) {
    this.carsService.delete(id).subscribe(() => {
      this.cars = this.cars.filter(f => f._id !== id);
      this.toastr.success('Car deleted!', 'Warning!');
    })
  }

  changePage(page) {
    this.currentPage = page;
  }
}
