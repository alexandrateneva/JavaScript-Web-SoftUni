import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SigninModel } from '../../../core/models/authentication/signin.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  model: SigninModel;
  errorMsg: string;

  constructor(private authService: AuthService, private router: Router) {
    this.model = new SigninModel('', '');
  }

  ngOnInit() {
  }

  signin() {
    this.authService
      .login(this.model)
      .subscribe();
  }
}
