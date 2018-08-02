import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-box',
  templateUrl: './movie-box.component.html',
  styleUrls: ['./movie-box.component.css']
})
export class MovieBoxComponent implements OnInit {
  @Input('movie') movie: Object;  
  constructor() { }

  ngOnInit() {
  }

}
