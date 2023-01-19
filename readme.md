
<!-- ABOUT THE PROJECT -->
## About The Project

This project was created by Ethan Powell and is hosted with firebase.

This is an agile workflow management application with a grid view and kanban board which are both sortable and searchable with full drag and drop capabilities. A user can register and create projects then add more users to the projects once the users create an account.


For my database, I have created models which are classes that define a noSQL document object.

Then I created a service based off that model which allows you to manage functions to and from the database including CRUD functions. Next, I used the angularfire library to interact with the firebase firestore database through means of a firestore service that uses templatized classes to manage all interactions to and from firebase. This makes heavy use of rxjs which is a reactive extensions library for javascript that provides real time asynchronous connection to the database back-end.

For the front-end, I used Angular with Ionic and Syncfusion components. The kanban board was made using the extremely powerful syncfusion kanban component which allowed me to basically provide it the data, set up templates for the cards, and have a fully functioning kanban board. The dashboard view was done using the syncfusion ejs grid component which was, just like the kanban board, virtually plug and play. 

The split view with the sidebar menu on the left was done by routing components as children of a component that had the ioinic split pane view component. This allowed me to make a single page application with one side menu overlay that keeps a consistent UI throughout the application.

### Built With

<!-- This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples. -->

* [Angular 14.2.10](https://angular.io/)
* [Ionic 6.20.5](https://ionicframework.com/)
* [Firebase](firebase.google.com)
* [angularfire](https://github.com/angular/angularfire)
* [TypeScript](https://www.typescriptlang.org/)
* [rxjs 6.6.7](https://rxjs.dev/)
* [capacitor](https://capacitorjs.com/solution/angular)
* [syncfusion angular components](https://ej2.syncfusion.com/angular/documentation/introduction)
* [Date fns](https://date-fns.org/)



<!-- ROADMAP -->
## Roadmap

### M.V.P.
### Provide the following:
 - Drag and drop, sorting, and search for project items
 - Ability to make posts on project items and add images to those posts
 - Assigning all the project item properties from the syncfusion kanban component
 - Adding additional projects and managing user permissions
 - Ability to edit users, projects, project items, and project item posts

### Stretch Goals
### Provide the following:
 - Inviting users to sign up through an email link
 - track the development hours for project items to track developer productivity



<!-- LICENSE -->
 ## License

Distributed under the MIT License. See `LICENSE` for more information.


<!-- CONTACT -->
## Contact
<!-- list contributors with their linked-in profile -->
[Ethan Powell](https://www.linkedin.com/in/ethan-t-powell/) 

[Ethan Powell](https://github.com/EthanTPowell) 

<!-- ACKNOWLEDGEMENTS -->
<!-- ## Acknowledgements -->

