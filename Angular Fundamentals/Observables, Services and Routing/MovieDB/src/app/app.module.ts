//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MoviesComponent } from './movies/movies.component';
import { SearchComponent } from './search/search.component';
import { MovieComponent } from './movie/movie.component';

//Services
import { MoviesService } from './services/movies.service';

import Router from './app.routing';
import { AboutComponent } from './about/about.component';
import { MovieBoxComponent } from './movie-box/movie-box.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MoviesComponent,
    SearchComponent,
    MovieComponent,
    AboutComponent,
    MovieBoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    Router
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
