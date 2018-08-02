import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/login.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  model: LoginModel;
  errorMsg: string;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.model = new LoginModel('', '');
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model)
      .subscribe(
        data => {
          this.succesfulLogin(data);
        },
        err => {
          this.errorMsg = err.error.description;
        }
      )
  }

  succesfulLogin(data) {
    this.authService.authtoken = data['_kmd']['authtoken'];
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
    this.router.navigate(['/home']);
  }
}
