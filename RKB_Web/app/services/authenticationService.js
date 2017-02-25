(function () {
    'use strict'

    var avApp = angular.module("avApp");

    avApp.factory('authenticationService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

        var apiSource = 'http://localhost:57792/';
        var authenticationServiceFactory = {};

        var authentication = {
            isAuth: false,
            userName: ''
        };

        var saveRegistration = function (registrationData) {
            console.log(registrationData);
            logout();

            return $http.post(apiSource + 'api/account/register', registrationData)
                .then(function (response) {
                    return response;
                });
        };

        var login = function (loginData) {

            localStorage.clear();
            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

            var deferred = $q.defer();

            $http.post(apiSource + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

                authentication.isAuth = true;
                authentication.userName = loginData.userName;

                deferred.resolve(response);
            });
                //.error(function (err, status) {
                //logOut();
                //deferred.rejected(err);
            //});

            return deferred.promise;
        };

        var logout = function () {
            localStorageService.remove('authorizationData');

            authentication.isAuth = false;
            authentication.userName = "";
        };

        var fillAuthData = function () {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                authentication.isAuth = true;
                authentication.userName = authData.userName;
            }
        };

        authenticationServiceFactory.saveRegistration = saveRegistration;
        authenticationServiceFactory.login = login;
        authenticationServiceFactory.logout = logout;
        authenticationServiceFactory.fillAuthData = fillAuthData;
        authenticationServiceFactory.authentication = authentication;

        return authenticationServiceFactory;

    }]);
}());
