# CAR RENTAL SYSTEM

The goal of the project is to represent a car rental system with added functionality for rating cars. Тhe client side is implemented through Angular (version 6.0.8) and a Kinvey service was used for a back-end.

---

## Dependencies

- "@angular/animations": "^6.0.3",
- "@angular/common": "^6.0.3",
- "@angular/compiler": "^6.0.3",
- "@angular/core": "^6.0.3",
- "@angular/forms": "^6.0.3",
- "@angular/http": "^6.0.3",
- "@angular/platform-browser": "^6.0.3",
- "@angular/platform-browser-dynamic": "^6.0.3",
- "@angular/router": "^6.0.3",
- "@ng-bootstrap/ng-bootstrap": "^3.0.0",
- "angular-confirmation-popover": "^4.2.0",
- "angular-star-rating": "^2.0.4",
- "core-js": "^2.5.4",
- "ng2-validation": "^4.2.0",
- "ng4-loading-spinner": "^1.2.3",
- "ngx-pagination": "^3.2.0",
- "ngx-toastr": "^8.10.1",
- "rxjs": "^6.0.0",
- "zone.js": "^0.8.26"

## Start 

	### Development server - navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

	$ ng serve

	### Build - the build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

	$ ng build
	
---

The application has:

- public part (accessible without authentication)
- private part (available for registered users) and
- administrative part (available for administrators only)

### Public part
The public part inludes home, about and contacts pages, also sign in and sign up pages.
 
### Private part
The private part inludes the catalog where all cars are listed and search box. From there, a detailed page for each car can be accessed. Besides the specifications of the car, 
there are options for renting and rating. User profile is also private part. On this page the user can see all their activity - future and past rents, 
also he has the ability to delete past reservations. 

### Аdministrative part
The administrative part inludes all CRUD operations - create, read, update and delete cars. Also the administrator can see all rents, change their status from approved to rejected 
and delete them.

---

## Structure

For the app structure was used grouping by file type. 

In the root directory (/src/app) there are 2 subdirectories:

- 	components (all components divided into other subfolders)
- 	core (guards, modules, models, services and interceptors)

In components directory there are 3 folders and 18 other subdirectories:

- 	authentication - Signin, Signup and Profile
- 	cars - CarCreate, CarEdit, CarDetails, CarRent, ListAllCars, ListAllRentedCars, StarRating and DatePicker
- 	shared - About, Contacts, Navigation, Home, Footer, NotFound and CarAnimation
  
In core directory there are 5 folders:

- guards - admin and auth guards
- modules - auth, shared, cars and cars-routing modules
- models - there are 2 subdirectories - authentication and cars
- services - auth, cars and rent services
- interceptors - token and error interceptors

There is also app.routing.ts file, where all the paths and their corresponding components are described. In app.component.html is where the static frame 
of the application stands and the dynamic content changes.

---

## Author

Alexandra Teneva

---

## License

This project is licensed under the MIT License

