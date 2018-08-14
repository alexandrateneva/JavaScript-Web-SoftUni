import { Component, OnInit } from '@angular/core';
import { SignupModel } from '../../../core/models/authentication/signup.model';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: SignupModel;
  errorMsg: string;

  constructor(private authService: AuthService) {
    this.model = new SignupModel('', '', '', '', 0);
  }

  signup() {
    delete this.model['confirmPassword'];

    this.authService
      .register(this.model)
      .subscribe();
  }

  ngOnInit() {
  }
}
