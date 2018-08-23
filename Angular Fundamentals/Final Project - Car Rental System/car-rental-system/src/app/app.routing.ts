import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarsModule } from './core/modules/cars.module';
import { AuthGuard } from './core/guards/auth.guard';
import { SigninComponent } from './components/authentication/signin/signin.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { HomeComponent } from './components/shared/home/home.component';
import { AboutComponent } from './components/shared/about/about.component';
import { ContactsComponent } from './components/shared/contacts/contacts.component';
import { ProfileComponent } from './components/authentication/profile/profile.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  {
    path: 'car', loadChildren: () => CarsModule
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }