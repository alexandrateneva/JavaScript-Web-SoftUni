import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './components/authentication/signin/signin.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { HomeComponent } from './components/shared/home/home.component';
import { AboutComponent } from './components/shared/about/about.component';
import { ContactsComponent } from './components/shared/contacts/contacts.component';
import { ProfileComponent } from './components/authentication/profile/profile.component';
import { CarsModule } from './core/modules/cars.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },  
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },  
  { path: 'profile', component: ProfileComponent },
  {
    path: 'car', loadChildren: () => CarsModule
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }