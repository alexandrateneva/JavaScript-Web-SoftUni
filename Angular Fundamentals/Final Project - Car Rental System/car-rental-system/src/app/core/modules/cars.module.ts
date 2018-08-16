import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsService } from '../services/cars.service';
import { CarCreateComponent } from '../../components/cars/car-create/car-create.component';
import { ListAllCarsComponent } from '../../components/cars/list-all-cars/list-all-cars.component';
import { CarDetailsComponent } from '../../components/cars/car-details/car-details.component';
import { CarEditComponent } from '../../components/cars/car-edit/car-edit.component';
import { CarRentComponent } from '../../components/cars/car-rent/car-rent.component';
import { NgbdDatepickerRange } from '../../components/cars/datepicker-range/datepicker-range.component';

@NgModule({
    declarations: [
        CarCreateComponent,
        ListAllCarsComponent,
        CarDetailsComponent,
        CarEditComponent,
        CarRentComponent,
        NgbdDatepickerRange
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule.forRoot(),
        ConfirmationPopoverModule.forRoot(),
        CustomFormsModule,
        CarsRoutingModule
    ],
    providers: [
        CarsService
    ]
})
export class CarsModule { }