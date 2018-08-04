import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FurnitureRoutingModule } from './furniture-routing.module';
import { CustomFormsModule } from 'ng2-validation';
import { FurnitureService } from './furniture.service';
import { furnitureComponents } from './index';

@NgModule({
    declarations: [
        ...furnitureComponents,
    ],
    imports: [
        CommonModule,
        FurnitureRoutingModule,
        FormsModule,
        CustomFormsModule,
        NgxPaginationModule
    ],
    providers: [
        FurnitureService
    ]
})
export class FurnitureModule { }