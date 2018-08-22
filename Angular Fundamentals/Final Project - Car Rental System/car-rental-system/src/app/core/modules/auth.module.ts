import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomFormsModule } from 'ng2-validation'
import { NgxPaginationModule } from 'ngx-pagination';

import { SignupComponent } from '../../components/authentication/signup/signup.component';
import { SigninComponent } from '../../components/authentication/signin/signin.component';
import { ProfileComponent } from '../../components/authentication/profile/profile.component';
import { AuthService } from '../services/auth.service';

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent,
        ProfileComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        HttpClientModule,
        CustomFormsModule,
        NgxPaginationModule
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule { }