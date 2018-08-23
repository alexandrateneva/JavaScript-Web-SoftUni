import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../../app.routing';
import { AboutComponent } from '../../components/shared/about/about.component';
import { CarAnimationComponent } from '../../components/shared/car-animation/car-animation.component';
import { ContactsComponent } from '../../components/shared/contacts/contacts.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { NavigationComponent } from '../../components/shared/navigation/navigation.component';
import { HomeComponent } from '../../components/shared/home/home.component';
import { NotFoundComponent } from '../../components/shared/not-found/not-found.component';

@NgModule({
    declarations: [
        AboutComponent,
        CarAnimationComponent,
        ContactsComponent,
        FooterComponent,
        HomeComponent,
        NavigationComponent,
        NotFoundComponent
    ],
    imports: [
        AppRoutingModule,
        CommonModule
    ],
    providers: [],
    exports: [
        NavigationComponent,
        FooterComponent
    ]
})
export class SharedModule { }