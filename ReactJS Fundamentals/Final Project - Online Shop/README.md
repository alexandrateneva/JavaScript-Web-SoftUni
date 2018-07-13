# ONLINE SHOP

The goal of the project is to represent an online store with added functionality for liking and commenting on products. Тhe client side is implemented through 
ReactJS and a Kinvey service was used for a back-end.

---

## Dependencies

- react: ^16.4.1,
- react-dom: ^16.4.1,
- react-loader-spinner: ^2.1.0,
- react-materialize: ^2.3.3,
- react-router: ^4.3.1,
- react-router-dom: ^4.3.1,
- react-scripts: 1.1.4

## Start 

    $ npm start
	
---

The application has:

- public part (accessible without authentication)
- private part (available for registered users) and
- administrative part (available for administrators only)
=======
- 	public part (accessible without authentication)
- 	private part (available for registered users) and
- 	administrative part (available for administrators only)

### Public part
The public part inludes the application home page, where all products are listed, category page,
 where all categories are listed, the user login and user registration forms, also cart page and order form, where the user can place an order.
 
### Private part
The private part inludes the user profile page, where the user can see all their activity - likes and comments. 
Registration is required to enable the users to like and comment on products. Only the author of a comment and the administrator can delete it.

### Аdministrative part
The administrative part inludes add, edit and delete products and categories. Also only the administrator can see the orders and delete them, 
when they are done.

---

## Structure

For the app structure was used grouping by file type. 

In the root directory (/src) there are 3 subdirectories:

- components (all components divided into other subfolders)
- style (css and images for site design) and
- utils (some helper functions)

In the directory components there are 9 other subdirectories:

- auth - Register, Login, Logout and Profile
- cart - Cart
- category - AddCategory, EditCategory, DeleteCategory, Categories and CategoriesAdmin
- comments - AddComment and Comments
- common - Header, Navigation, Footer, Notification, Loader, NotFound and ViewComponent

In ViewComponent are listed all routes that will be matched by React Router. NotFound is the component that will be rendered if none of other routes match. 

- home - Home
- orders - OrderForm and Orders
- partials - Category, Order, Comment, Product, CartProduct, ShortProduct, ProfileProduct and ProfileComment
- product - Product, AddProduct, EditProduct, DeleteProduct and ProductDetails
=======
- 	components (all components divided into other subfolders)
- 	style (css and images for site design) and
- 	utils (some helper functions)

In the directory components there are 9 other subdirectories:

- 	auth - Register, Login, Logout and Profile
- 	cart - Cart
- 	category - AddCategory, EditCategory, DeleteCategory, Categories and CategoriesAdmin
- 	comments - AddComment and Comments
- 	common - Header, Navigation, Footer, Notification, Loader, NotFound and ViewComponent
  
In ViewComponent are listed all routes that will be matched by React Router. NotFound is the component that will be rendered if none of other routes match. 
- 	home - Home
- 	orders - OrderForm and Orders
- 	partials - Category, Order, Comment, Product, CartProduct, ShortProduct, ProfileProduct and ProfileComment
- 	product - Product, AddProduct, EditProduct, DeleteProduct and ProductDetails
>>>>>>> d324a173e611ec47f88035544501b0751d3ec57a

---

## Author

Alexandra Teneva

---

## License

This project is licensed under the MIT License
