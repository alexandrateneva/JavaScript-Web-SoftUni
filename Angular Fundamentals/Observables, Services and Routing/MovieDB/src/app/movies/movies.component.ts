import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  popular: Object;
  theaters: Object;
  forKids: Object;
  dramas: Object;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesService.getPopular().subscribe(data => {
      this.popular = data;
    })

    this.moviesService.getInTheaters().subscribe(data => {
      this.theaters = data;
    })

    this.moviesService.getForKids().subscribe(data => {
      this.forKids = data;
    })

    this.moviesService.getDramas().subscribe(data => {
      this.dramas = data;
    })
  }

}
