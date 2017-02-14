(function () {
    
    var avApp = angular.module('avApp', ['ngRoute', 'ngAnimate']);

    avApp.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/pages/home/home.html',
                controller: 'homeController'
            })

    });
}());