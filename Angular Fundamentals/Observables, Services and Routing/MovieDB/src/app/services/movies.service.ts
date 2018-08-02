import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const apiKey = '3f8ad8190fcbce6db71ddd9a6d1dc8e6';

@Injectable()
export class MoviesService {
  path: string = 'https://api.themoviedb.org/3/';
  popular: string = 'discover/movie?sort_by=popularity.desc';
  inTheaters: string = 'discover/movie?primary_release_date.gte=2017-09-15&primary_release_date.lte=2017-10-22';
  forKids: string = 'discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc';
  dramas: string = 'discover/movie?with_genres=18&primary_release_year=2017';
  movie: string = 'movie/';
  search: string = 'search/movie?query=';
  authentication: string = '&api_key=';
  authenticationMovie: string = '?api_key=';

  constructor(private http: HttpClient) { }

  getPopular(): Observable<Object> {
    let url = this.path + this.popular + this.authentication + apiKey;
    return this.http.get<Object>(url);
  }

  getInTheaters(): Observable<Object> {
    let url = this.path + this.inTheaters + this.authentication + apiKey;
    return this.http.get<Object>(url);
  }

  getForKids(): Observable<Object> {
    let url = this.path + this.forKids + this.authentication + apiKey;
    return this.http.get<Object>(url);
  }

  getDramas(): Observable<Object> {
    let url = this.path + this.dramas + this.authentication + apiKey;
    return this.http.get<Object>(url);
  }

  getMovie(id): Observable<Object> {
    let url = this.path + this.movie + id + this.authenticationMovie + apiKey;
    return this.http.get<Object>(url);
  }

  findAMovie(query): Observable<Object> {
    let url = this.path + this.search + query + this.authentication + apiKey;
    return this.http.get<Object>(url);
  }
}
