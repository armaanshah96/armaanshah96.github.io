// script.js

// create the module and name it scotchApp
var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        //route for the home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainController'
        })

        // route for the about page

        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'aboutController'
        })

        // route for contact page 
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'contactController'
        });
        $locationProvider.html5Mode(true);

});

// create the controller and inject Angular's $scope
app.controller('mainController', function($scope, $location, $anchorScroll) {
    $scope.scrollTo = function(id) {
        $location.hash(id);
        console.log($location.hash());
        $anchorScroll();
    };
});

app.controller('aboutController', function($scope) {
    $scope.message ="about";
});

app.controller('contactController', function($scope) {
    $scope.message ="contact";
});

