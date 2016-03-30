/// <reference path="../Scripts/angular-1.1.4.js" />

/*#######################################################################

  Dan Wahlin
  http://twitter.com/DanWahlin
  http://weblogs.asp.net/dwahlin
  http://pluralsight.com/training/Authors/Details/dan-wahlin

  Normally like to break AngularJS apps into the following folder structure
  at a minimum:
  /app
      /controllers
      /directives
      /services
      /partials
      /views

  #######################################################################*/

var app = angular.module('laundry', [
  'ngRoute',
  'firebase',
  'ngMessages',
  ]);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider, $locationProvider) {
    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    $routeProvider

        .when('/',
            {
                controller:'authCtrl',
                templateUrl: '/app/partials/signIn.html'
            })
        .when('/welcome',
            {
                controller:'authCtrl',
                templateUrl: '/app/partials/welcome.html'
            })

        .otherwise({ redirectTo: '/' });




});
