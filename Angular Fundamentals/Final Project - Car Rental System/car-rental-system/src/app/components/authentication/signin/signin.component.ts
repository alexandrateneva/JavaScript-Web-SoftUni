import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SigninModel } from '../../../core/models/authentication/signin.model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  model: SigninModel;
  errorMsg: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    this.model = new SigninModel('', '');
  }

  ngOnInit() {
  }

  signin() {
    this.spinnerService.show();
    this.authService
      .login(this.model)
      .subscribe(data => {
        this.spinnerService.hide();
      });
  }
}
