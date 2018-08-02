import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  movies: Object;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
  }

  search(query){
    this.moviesService.findAMovie(query.search).subscribe(data => {
      console.log(data);
      this.movies = data;
    })
  }
}
