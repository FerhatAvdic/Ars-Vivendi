﻿(function () {
    
    var avApp = angular.module('avApp', ['dataGrid', 'pagination', 'ngRoute', 'ngAnimate', 'ngResource', 'LocalStorageModule', 'ui.bootstrap', 'naif.base64', 'colorpicker.module', 'textAngular', 'angular-jwt']);


    //var serviceBase = 'http://localhost:57792/';
    var serviceBase = 'http://api-dive.ntg.ba/';
    //var serviceBase = 'http://arsvivendi.azurewebsites.net/';

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
            .when('/login/:tab', { templateUrl: 'app/pages/login/login.html', controller: 'loginController' })
            .when('/externalLogin/:tab', { templateUrl: 'app/pages/login/externalLogin.html', controller: 'loginController' })
            .when('/members', { templateUrl: 'app/pages/members/members.html', controller: 'membersController' })
            .when('/events', { templateUrl: 'app/pages/events/events.html', controller: 'eventsController' })
            .when('/events/category/:filter', { templateUrl: 'app/pages/events/events.html', controller: 'eventsController' })
            .when('/events/:id', { templateUrl: 'app/pages/singleEvent/singleEvent.html', controller: 'singleEventController' })
            .when('/events/:id/finances', { templateUrl: 'app/pages/singleEvent/singleEventFinances.html', controller: 'singleEventFinancesController' })
            .when('/profile/:id', { templateUrl: 'app/pages/profile/profile.html', controller: 'profileController' })
            .when('/profile', { templateUrl: 'app/pages/profile/profile.html', controller: 'profileController' })
            .when('/about', { templateUrl: 'app/pages/about/about.html', controller: 'aboutController' })
            .when('/gallery', { templateUrl: 'app/pages/gallery/gallery.html', controller: 'galleryController' })
            .when('/adminPanel', { templateUrl: 'app/pages/adminPanel/adminPanel.html', controller: 'adminPanelController' })
            .when('/sponsors', { templateUrl: 'app/pages/sponsors/spons.html', controller: 'sponsorsController' })
            .when('/partners', { templateUrl: 'app/pages/partners/partners.html', controller: 'partnersController' })
            .when('/interests', { templateUrl: 'app/pages/interests/interests.html', controller: 'interestsController' })
            .when('/services', { templateUrl: 'app/pages/services/services.html', controller: 'servicesController' })
            .when('/discounts', { templateUrl: 'app/pages/discounts/discounts.html', controller: 'discountsController' })
            .when('/static', { templateUrl: 'app/pages/staticInfo/staticInfo.html', controller: 'staticInfoController' })

            .otherwise({ redirectTo: "/" });

    });

    avApp.constant('arsVivAuthSettings', {
        apiServiceBase: serviceBase,
        clientId: 'arsvAuthApp'
    });

    avApp.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authenticationInterceptorService');
    });

    avApp.run(['authenticationService', function (authenticationService) {
        authenticationService.fillAuthData();
    }]);

}());