import { Component, OnInit } from '@angular/core';
import { SignupModel } from '../../../core/models/authentication/signup.model';
import { AuthService } from '../../../core/services/auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: SignupModel;
  errorMsg: string;

  constructor(
    private authService: AuthService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    this.model = new SignupModel('', '', '', '', '', '', 0);
  }

  signup() {
    this.spinnerService.show();
    delete this.model['confirmPassword'];

    this.authService
      .register(this.model)
      .subscribe(data => {
        this.spinnerService.hide();
      });
  }

  ngOnInit() {
  }
}
