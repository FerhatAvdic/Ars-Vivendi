(function () {
    
    var avApp = angular.module('avApp', ['ngRoute', 'ngAnimate', 'LocalStorageModule', 'ui.bootstrap']);

    currentUser = {
        id: 0,
        name: " ",
        systemRoles: [],
        token: " ",
        expiration: null
    };


    avApp.config(function ($routeProvider) {
        $routeProvider
        .when('/', { templateUrl: 'app/pages/home/home.html', controller: 'homeController' })
        .when('/login', { templateUrl: 'app/pages/login/login.html', controller: 'loginController' })
        .when('/blog', { templateUrl: 'app/pages/blog/blog.html', controller: 'blogController' })
        .when('/events', { templateUrl: 'app/pages/events/events.html', controller: 'eventsController' })
        .when('/members', { templateUrl: 'app/pages/members/members.html', controller: 'membersController' })
        .when('/newevent', { templateUrl: 'app/pages/newEvent/newEvent.html', controller: 'newEventController' })
        .when('/profile', { templateUrl: 'app/pages/profile/profile.html', controller: 'profileController' })
        .when('/about', { templateUrl: 'app/pages/about/about.html', controller: 'aboutController' })
        .otherwise({ redirectTo: "/" });


    });

    avApp.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authenticationInterceptorService');
    });

    avApp.run(['authenticationService', function (authenticationService) {
        authenticationService.fillAuthData();
    }]);
}());