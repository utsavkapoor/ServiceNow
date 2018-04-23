Service Now Application

by - Utsav Kapoor (utsav.kapoor@asu.edu)

dependencies:

1.  Install npm (https://www.npmjs.com/package/npm-install-prompt/tutorial)

Instructions

1.  Unzip ServiceNowApplication.zip
2.  Install dependencies using npm install
3.  Run all tests using npm test
4.  Start your server using npm start
5.  Navigate to app in browser (localhost:3000).
6.  Enjoy !

Discussion
I used the following technologies: HTML, CSS, Angularjs 1.6, Google Charts, Node, Bootstrap for Development of the Application. I used Karma and Jasmine for Testing

Requirements.

1. Create a Movie Application to show all the Movies store in the JSON on the app. Also, show a column chart with number of movies on the x-axis and ratings on y-axis.

    I divided the application into 2 parts. The first part was the Map and Second part for display of Movies. I loaded the JSON directly and since it has to loaded only once, we did not need a server to store and persist the data. The column charts are made using Google Charts. The application is made responsive using twitter bootstrap.

2.  Provide a Star Widget to rate or update the rating of a movie.
    I created a directive for the same and made the star widget using li elements. As soon as a rating is changed, the change is propagated back to the data and data is updated.

3.  Provide Sorting and Filtering Methods
    I created a drop down where movies can be sorted by Name and Date. Also, when clicked on any bars on the chart, the movies are filtered based on the rating of the bar.

4.  Write Unit tests
    A total of 7 Unit Test were written mostly to check if all the functions are being called properly using jasmine. Karma was used to run the tests.

Future Work.

1.  Expanding the UI with more functionalities.
2.  Improving and polishing the UI
3.  Adding more data and writing Express Backend and MongoDB Database to store all the data. Also, a S3 bucket for storing images.
