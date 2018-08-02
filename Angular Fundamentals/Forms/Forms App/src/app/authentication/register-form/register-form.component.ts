import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { RegisterModel } from '../../models/register.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  model: RegisterModel;
  errorMsg: string;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.model = new RegisterModel('', '', '', '', 18);
  }

  register() {
    delete this.model['confirmPassword'];

    this.authService.register(this.model)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        err => {
          this.errorMsg = err.error.description;
        }
      )
  }

  ngOnInit() {
  }
}
