import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  get username(): string {
    return localStorage.getItem('user');
  }
}
