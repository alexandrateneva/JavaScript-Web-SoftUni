import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { RentModel } from '../../../core/models/cars/rent.model';
import { RentService } from '../../../core/services/rent.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { deteleAnimation } from '../../cars/delete-car.animation';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: deteleAnimation
})
export class ProfileComponent implements OnInit {
  time: string = 'future';
  rents: Array<RentModel>;
  pageSize: number = 4;
  currentPage: number = 1;
  private futureRents: Array<RentModel>;
  private pastRents: Array<RentModel>;

  constructor(
    private rentService: RentService,
    private authService: AuthService,
    private toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
    let userId = localStorage.getItem('id');
    this.rentService.getByUserId(userId).subscribe(data => {
      this.futureRents = data.filter(r => !this.isPast(r.endDate));
      this.pastRents = data.filter(r => this.isPast(r.endDate));
      this.rents = this.futureRents;
      this.spinnerService.hide();
    });
  }

  deleteItem(id) {
    this.rentService.delete(id).subscribe(() => {
      this.rents = this.rents.filter(f => f._id !== id);
      this.pastRents = this.pastRents.filter(f => f._id !== id);
      this.toastr.success('Rent deleted!', 'Warning!');
    })
  }

  isPast(date) {
    return new Date(date) < new Date();
  }

  getFutureRents() {
    this.time = 'future';
    this.rents = this.futureRents;
  }

  getPastRents() {
    this.time = 'past';
    this.rents = this.pastRents;
  }

  changePage(page) {
    this.currentPage = page;
  }
}
