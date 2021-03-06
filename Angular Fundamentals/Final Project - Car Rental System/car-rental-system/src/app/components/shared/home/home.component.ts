import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hasTitle: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    setTimeout(() => {
      this.hasTitle = true;
    }, 3500)
  }
}
