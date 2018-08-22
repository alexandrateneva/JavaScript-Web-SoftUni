import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarCreateComponent } from '../../components/cars/car-create/car-create.component';
import { ListAllCarsComponent } from '../../components/cars/list-all-cars/list-all-cars.component';
import { CarDetailsComponent } from '../../components/cars/car-details/car-details.component';
import { CarEditComponent } from '../../components/cars/car-edit/car-edit.component';
import { CarRentComponent } from '../../components/cars/car-rent/car-rent.component';
import { ListAllRentedCarsComponent } from '../../components/cars/list-all-rented-cars/list-all-rented-cars.component';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';

const carsRoutes: Routes = [
    { path: 'create', canActivate: [AdminGuard], component: CarCreateComponent },
    { path: 'all', canActivate: [AuthGuard], component: ListAllCarsComponent },
    { path: 'details/:id', canActivate: [AuthGuard], component: CarDetailsComponent },
    { path: 'edit/:id', canActivate: [AdminGuard], component: CarEditComponent },
    { path: 'rent/:id', canActivate: [AuthGuard], component: CarRentComponent },
    { path: 'rented', canActivate: [AdminGuard], component: ListAllRentedCarsComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(carsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CarsRoutingModule { }