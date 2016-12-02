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

