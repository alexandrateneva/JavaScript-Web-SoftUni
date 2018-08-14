import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomFormsModule } from 'ng2-validation'

import { SignupComponent } from '../../components/authentication/signup/signup.component';
import { SigninComponent } from '../../components/authentication/signin/signin.component';
import { AuthService } from '../services/auth.service';

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        HttpClientModule,
        CustomFormsModule
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule { }