import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { MovieComponent } from './movie/movie.component';
import { MoviesComponent } from './movies/movies.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    { path: '', component: MoviesComponent },
    { path: 'home', component: MoviesComponent },
    { path: 'movie/:id', component: MovieComponent },
    { path: 'about', component: AboutComponent }
]

let Router: ModuleWithProviders = RouterModule.forRoot(routes);

export default Router;