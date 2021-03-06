import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { CustomFormsModule } from 'ng2-validation'

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './authentication/auth.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AllFurnitureComponent } from './furniture/all-furniture/all-furniture.component';
import { FurnitureDetailsComponent } from './furniture/furniture-details/furniture-details.component';
import { MyFurnitureComponent } from './furniture/my-furniture/my-furniture.component';
import { CreateFurnitureComponent } from './furniture/create-furniture/create-furniture.component';
import { FurnitureService } from './furniture/furniture.service';


@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        SigninComponent,
        SignupComponent,
        HomeComponent,
        AllFurnitureComponent,
        FurnitureDetailsComponent,
        MyFurnitureComponent,
        CreateFurnitureComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        CustomFormsModule
    ],
    providers: [
        AuthService,
        FurnitureService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        }


    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
