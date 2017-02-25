(function () {
    'use strict'

    var avApp = angular.module("avApp");

    avApp.factory('authenticationInterceptorService', ['$q', '$injector', '$location', 'localStorageService', function ($q, $injector, $location, localStorageService) {

        var authenticationInterceptorServiceFactory = {};

        var request = function (config) {
            config.headers = config.headers || {};

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            };

            return config;
        }

        var responseError = function (rejection) {
            if (rejection.status === 401) {
                $location.path('/login');
            }
            return $q.reject(rejection);
        };

        authenticationInterceptorServiceFactory.request = request;
        authenticationInterceptorServiceFactory.responseError = responseError;

        return authenticationInterceptorServiceFactory;
    }]);
}());