import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarModel } from '../../../core/models/cars/car.model';
import { CarsService } from '../../../core/services/cars.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
  bindingModel: CarModel;

  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.carsService.getDetails(
      this.route.snapshot.params['id']
    ).subscribe(data => {
      this.bindingModel = data;
    })
  }

  edit() {
    this.carsService
      .edit(this.bindingModel._id, this.bindingModel)
      .subscribe(() => {
        this.toastr.success('Car edited successful!', 'Success!');
        this.router.navigate(['/car/all']);
      });
  }
}
