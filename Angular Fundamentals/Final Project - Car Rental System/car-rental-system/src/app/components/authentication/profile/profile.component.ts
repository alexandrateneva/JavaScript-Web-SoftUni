import { Component, OnInit } from '@angular/core';
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
  rents: Array<RentModel>;

  constructor(
    private rentService: RentService,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
    let userId = localStorage.getItem('id');
    this.rentService.getByUserId(userId).subscribe(data => {
      this.rents = data;
    });
  }

  deleteItem(id) {
    this.rentService.delete(id).subscribe(() => {
      this.rents = this.rents.filter(f => f._id !== id);
      this.toastr.success('Rent deleted!', 'Warning!');
    })
  }

  isPast(date) {
    return new Date(date) < new Date();
  }
}
