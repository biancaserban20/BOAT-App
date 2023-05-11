BOAT - Booking website
============


The system consists of a `RESTful CRUD application`, which is developed using the `Reacts.js` framework, the database will be stored using `MongoDB`, and the backend is implemented using `Java SpringBoot`.
The server requests are made using the `Axios API`.

The project was developed as a team project for a 3rd year university course.

App description and functionalities
------------
BOAT is a web application used for booking hotel rooms. There are 3 types of users that can access the app and each one of them has different privileges 

### Functionalities for administrators ###

- Authentication
- Accept or reject requests to create hotel administrator accounts (owners) 
- Delete owner or client accounts
- View all the tables in the database

### Functionalities for owners ###

- Account creation
- Authentication
- Add, edit and delete rooms or properties
- Modify the prices for rooms
- Accept reservations
- Chat with clients
- Read reviews

### Functionalities for clients ###
- Account creation
- Authentication
- Book rooms
- Cancel reservations 
- Chat with owners
- Read and write reviews
- Search and filter hotels

User Interface Design in Figma
------------

In order to have a cohesive style for the user interface, we used `Figma`, a collaborative web application for interface design.
It includes 3 flows, corresponding to the way each type of user ( client, owner and administrator ) will interact with the website.

**The design can be viewed and interacted with [here](https://www.figma.com/file/8LHJJqZZ3FOxOdNMGxmnxJ/BOAT?type=design&node-id=303%3A140&t=oXM2Fj1QsbRU4zHa-1).**

Using the app
------------

### Starting the web server on port 8080 (HTTP) ###
To start the web server, the main of the `com.proiectip.boat.BoatApplication` class needs to be executed.
### Running the app ###

To run the app in the development mode, execute the following command in the **project directory**:
~~~
.../BOAT-App/boatfrontend> npm start
~~~
Open http://localhost:3000 to view it in your browser.
The page will reload when you make changes.
You may also see any lint errors in the console.

References
------------

1. Documentation
    * [Spring Boot Integration with MongoDB](https://www.mongodb.com/compatibility/spring-boot)
    * [CSS Documentation and Tutorials](https://developer.mozilla.org/en-US/docs/Web/CSS)
    * [Axios API](https://axios-http.com/docs/api_intro)
2. Resources
    * [README Formatting Example](https://gist.github.com/rt2zz/e0a1d6ab2682d2c47746950b84c0b6ee)
    * [Full Stack Web Application using Spring Boot and React](https://www.youtube.com/watch?v=O_XL9oQ1_To&t)