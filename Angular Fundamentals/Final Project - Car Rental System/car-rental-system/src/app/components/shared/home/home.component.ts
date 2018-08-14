import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hasTitle: boolean = false;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.hasTitle = true;
    }, 3500)
  }
}
