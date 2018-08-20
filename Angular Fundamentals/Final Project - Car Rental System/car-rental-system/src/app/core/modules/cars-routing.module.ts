import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarCreateComponent } from '../../components/cars/car-create/car-create.component';
import { ListAllCarsComponent } from '../../components/cars/list-all-cars/list-all-cars.component';
import { CarDetailsComponent } from '../../components/cars/car-details/car-details.component';
import { CarEditComponent } from '../../components/cars/car-edit/car-edit.component';
import { CarRentComponent } from '../../components/cars/car-rent/car-rent.component';
import { ListAllRentedCarsComponent } from '../../components/cars/list-all-rented-cars/list-all-rented-cars.component';

const carsRoutes: Routes = [
    { path: 'create', component: CarCreateComponent },
    { path: 'all', component: ListAllCarsComponent },
    { path: 'details/:id', component: CarDetailsComponent },
    { path: 'edit/:id', component: CarEditComponent },
    { path: 'rent/:id', component: CarRentComponent },
    { path: 'rented', component: ListAllRentedCarsComponent }
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