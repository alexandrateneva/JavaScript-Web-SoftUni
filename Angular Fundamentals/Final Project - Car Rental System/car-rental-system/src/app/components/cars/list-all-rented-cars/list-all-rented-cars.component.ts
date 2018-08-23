import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs';
import { RentService } from '../../../core/services/rent.service';
import { AuthService } from '../../../core/services/auth.service';
import { CarsService } from '../../../core/services/cars.service';
import { deteleAnimation } from '../delete-car.animation';
import { RentModel } from '../../../core/models/cars/rent.model';

@Component({
  selector: 'app-list-all-rented-cars',
  templateUrl: './list-all-rented-cars.component.html',
  styleUrls: ['./list-all-rented-cars.component.css'],
  animations: deteleAnimation
})
export class ListAllRentedCarsComponent implements OnInit {
  rents: Array<RentModel>;
  pageSize: number = 3;
  currentPage: number = 1;

  constructor(
    private rentService: RentService,
    private authService: AuthService,
    private toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.rentService.getAllForAdmin().subscribe(data => {
      this.rents = data;
      this.spinnerService.hide();
    });
  }

  deleteItem(id) {
    let current = this.rents.find(r => r._id === id);
    this.rentService.hide(id, current, 'admin').subscribe(() => {
      this.rents = this.rents.filter(f => f._id !== id);
      this.toastr.success('Rent deleted!', 'Warning!');
    })
  }

  changePage(page) {
    this.currentPage = page;
  }

  reject(id) {
    let current = this.rents.find(r => r._id === id);
    let state = current.isRejected ? 'approved' : 'rejected';
    this.rentService.reject(id, current).subscribe(() => {
      this.toastr.success(`Rent ${state}!`, 'Warning!');
    })
  }
}
