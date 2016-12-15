// script.js

// create the module and name it scotchApp
var app = angular.module('app', ['ngRoute', 'smoothScroll']);

//app.config(function($routeProvider, $locationProvider) {
app.config(function($routeProvider) {
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
//        $locationProvider.html5Mode(true);

});

// create the controller and inject Angular's $scope
app.controller('mainController', function($scope, $location, $anchorScroll, $http) {
    $scope.scrollTo = function(id) {
        $location.hash(id);
        console.log($location.hash());
        $anchorScroll();
    };
    $scope.test = function() {
        $scope.name = "Your Itinerary Day in Cape Town";

        $scope.newItinerary = [{"Events":"Maria's","Tag":"breakfast","StartTime":9,"EndTime":10.5,"Price":2,"Popularity":2,"Latitude":-33.9249,"Longitude":18.4241,"OpeningHours":8.5,"ClosingHours":22,"EventLength":1.5,"Description":"Greek"},{"Events":"Bay Harbour Market Hout Bay","Tag":"shopping","StartTime":10.5,"EndTime":12.5,"Popularity":188,"Latitude":18.3471,"Longitude":-34.0549,"EventLength":2,"Description":""},{"Events":"Ritzis","Tag":"outdoor","StartTime":12.5,"EndTime":13.5,"Popularity":164,"Latitude":18.4543,"Longitude":-33.7193,"EventLength":1,"Description":""},{"Events":"The Potluck Club","Tag":"lunch","StartTime":13.5,"EndTime":15.5,"Price":3,"Popularity":3,"Latitude":-33.9249,"Longitude":18.4241,"OpeningHours":24,"EventLength":2,"Description":"European"},{"Events":"NV-80","Tag":"shopping","StartTime":15.5,"EndTime":19.5,"Popularity":535,"Latitude":18.3832,"Longitude":-33.9209,"EventLength":4,"Description":"Interstate 80 traverses the northern portion of the U.S. state of Nevada. The freeway serves the Reno<96>Sparks metropolitan area and also goes through the towns of Fernley, Lovelock, Winnemucca, Battle Mountain, Elko, Wells and West Wendover on its way through the state."},{"Events":"The Odyssey","Tag":"dinner","StartTime":19.5,"EndTime":21,"Price":2,"Popularity":2,"Latitude":-33.9214,"Longitude":18.4183,"OpeningHours":11,"ClosingHours":24,"EventLength":1.5,"Description":"Burger"},{"Events":"Southern Sun The Cullinan","Tag":"bars","StartTime":21,"EndTime":25,"Popularity":1275,"Latitude":18.4248,"Longitude":-33.9162,"EventLength":4,"Description":""}];
    };
    $scope.generate = function() {
        $scope.name = "Your Itinerary Day in Cape Town";
        $http({
            url: "http://ec2-52-33-4-120.us-west-2.compute.amazonaws.com:8000/itinerary",
            method:"POST",
            params: {
                subtypes: "shopping, dining, nightlife, sightseeing, museum", 
                lat:18.41, 
                long:-33.910,
            }
        }).then(function(response){
            console.log(response.data);
            $scope.newItinerary = response.data;
        }).catch(function(response) {
            $scope.error = response.data.message;
        });
    }
});
app.controller('aboutController', function($scope) {
    $scope.message ="about";
});

app.controller('contactController', function($scope) {
    $scope.message ="contact";
});

app.directive('scrollOnClick', function() {
  return {
    restrict: 'A',
    link: function(scope, $elm, attrs) {
      var idToScroll = attrs.href;
      $elm.on('click', function() {
        var $target;
        if (idToScroll) {
          $target = $(idToScroll);
        } else {
          $target = $elm;
        }
        $("body").animate({scrollTop: $target.offset().top}, "slow");
      });
    }
  }
});

