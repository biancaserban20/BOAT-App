BOAT - Booking website
============


The system consists of a `RESTful CRUD application`, which is developed using the `Reacts.js` framework, the database will be stored using `MongoDB`, and the backend is implemented using `Java SpringBoot`.
The server requests are made using the `Axios API`.

The project was developed as a team project for a 3rd year university course.

User Interface Design in Figma
------------

In order to have a cohesive style for the user interface, we used `Figma`, collaborative web application for interface design.
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
    * [Axios API](https://axios-http.com/docs/api_intro)
2. Resources
    * [README Formatting Example](https://gist.github.com/rt2zz/e0a1d6ab2682d2c47746950b84c0b6ee)
    * [Full Stack Web Application using Spring Boot and React](https://www.youtube.com/watch?v=O_XL9oQ1_To&t=902s)