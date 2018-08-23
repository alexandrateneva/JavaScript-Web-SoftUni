import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CarModel } from '../../../core/models/cars/car.model';
import { CreateRentModel } from '../../../core/models/cars/create-rent.model';
import { AuthService } from '../../../core/services/auth.service';
import { CarsService } from '../../../core/services/cars.service';
import { RentService } from '../../../core/services/rent.service';
import { NgbdDatepickerRange } from '../datepicker-range/datepicker-range.component';
import { Z_DEFAULT_COMPRESSION } from 'zlib';

@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.component.html',
  styleUrls: ['./car-rent.component.css']
})
export class CarRentComponent implements OnInit {
  startDate: Date;
  endDate: Date;
  period: number = 0;
  car: CarModel;
  carId: string;

  popoverTitle: string = 'Rent Confirmation';
  popoverMessage: string = 'Are you sure you want to rent this car?';

  constructor(
    private authService: AuthService,
    private carsService: CarsService,
    private rentService: RentService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    this.carId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.spinnerService.show();
    this.carsService.getDetails(this.carId).subscribe(data => {
      this.car = data;
      this.spinnerService.hide();
    });
  }

  changeDays(data): void {
    if (data.length === 1) {
      this.period = 1;
      this.startDate = data[0];
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
    if (!this.startDate) {
      this.toastr.error('To rent must choose a period!', 'Warning!');
    } else {
      if (!this.endDate) {
        this.endDate = this.startDate;
      }
      let userId = localStorage.getItem('id')
      let car = {
        id: this.car._id,
        make: this.car.make,
        model: this.car.model,
        imageUrl: this.car.imageUrl
      }
      this.authService.getUserById(userId).subscribe(userInfo => {
        let user = {
          id: userInfo._id,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email
        }

        let rentModel = new CreateRentModel(car, user, this.startDate, this.endDate, this.totalSum, true, true, false);
        this.rentService.create(rentModel).subscribe(() => {
          this.toastr.success('Car rented successful!', 'Success!');
          this.router.navigate(['/profile']);
        });
      })
    }
  }
}
