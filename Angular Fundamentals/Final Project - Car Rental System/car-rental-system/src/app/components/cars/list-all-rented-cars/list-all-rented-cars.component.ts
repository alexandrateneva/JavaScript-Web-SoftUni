import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RentService } from '../../../core/services/rent.service';
import { AuthService } from '../../../core/services/auth.service';
import { CarsService } from '../../../core/services/cars.service';
import { deteleAnimation } from '../delete-car.animation';
import { RentModel } from '../../../core/models/cars/rent.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-all-rented-cars',
  templateUrl: './list-all-rented-cars.component.html',
  styleUrls: ['./list-all-rented-cars.component.css'],
  animations: deteleAnimation
})
export class ListAllRentedCarsComponent implements OnInit {
  rents: Array<RentModel>;

  constructor(
    private rentService: RentService,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.rentService.getAll().subscribe(data => {
      this.rents = data;
    });
  }

  deleteItem(id) {
    this.rentService.delete(id).subscribe(() => {
      this.rents = this.rents.filter(f => f._id !== id);
      this.toastr.success('Rent deleted!', 'Warning!');
    })
  }
}
