(function () {
    
    var avApp = angular.module('avApp', ['ngRoute', 'ngAnimate', 'LocalStorageModule']);

    avApp.config(function ($routeProvider) {
        $routeProvider
        .when('/', { templateUrl: 'app/pages/home/home.html', controller: 'homeController' })
        .when('/login', { templateUrl: 'app/pages/login/login.html', controller: 'loginController' })
        .when('/blog', { templateUrl: 'app/pages/blog/blog.html', controller: 'blogController' })
        .when('/events', { templateUrl: 'app/pages/events/events.html', controller: 'eventsController' })
        .when('/newevent', { templateUrl: 'app/pages/newEvent/newEvent.html', controller: 'newEventController' })
        .otherwise({ redirectTo: "/" });


    });

    avApp.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authenticationInterceptorService');
    });

    avApp.run(['authenticationService', function (authenticationService) {
        authenticationService.fillAuthData();
    }]);
}());