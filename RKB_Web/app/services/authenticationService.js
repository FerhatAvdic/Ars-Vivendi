(function () {
    'use strict'

    var avApp = angular.module("avApp");

    avApp.factory('authenticationService', ['$rootScope','$http', '$q', 'localStorageService', 'arsVivAuthSettings', function ($rootScope, $http, $q, localStorageService, arsVivAuthSettings) {

        var apiSource = arsVivAuthSettings.apiServiceBase;
        var authenticationServiceFactory = {};

        var authentication = {
            isAuth: false,
            userName: '',
            useRefreshToken: true,
            userRole: '',
            userFirstName: ''
        };

        var externalAuthData = {
            provider: "",
            userName: "",
            externalAccessToken: "",
            email: ""
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

            //localStorage.clear();
            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password + "&client_id=" + arsVivAuthSettings.clientId;

            var deferred = $q.defer();

            $http.post(apiSource + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
                localStorageService.set('authorizationData', { token: response.data.access_token, userName: loginData.userName, refreshToken: response.refresh_token, useRefreshToken: true });

                console.log("login response", response.data);
                authentication.isAuth = true;
                authentication.userName = loginData.userName;
                authentication.useRefreshToken = true;

                deferred.resolve(response);
                $scope.$apply();
            });
            return deferred.promise;
        };

        var logout = function () {
            localStorageService.remove('authorizationData');

            authentication.isAuth = false;
            authentication.userName = "";
            authentication.useRefreshToken = false;
            $rootScope.userRole = "";
        };

        var fillAuthData = function () {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                authentication.isAuth = true;
                authentication.userName = authData.userName;
                authentication.useRefreshToken = authData.useRefreshToken;
            }
        };

        var refreshToken = function () {
            var deferred = $q.defer();

            var authData = localStorageService.get('authorizationData');

            if (authData) {
                var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + arsVivAuthSettings.clientId;

                localStorageService.remove('authorizationData');

                $http.post(apiSource + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {

                    localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });

                    deferred.resolve(response);

                });
            }
            return deferred.promise;
        };

        var obtainAccessToken = function (externalData) {
            var deferred = $q.defer();

            $http.get(apiSource + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).then(function (response) {

                localStorageService.set('authorizationData', { token: response.data.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

                console.log(response.data);
                authentication.isAuth = true;
                authentication.userName = response.data.userName;
                authentication.useRefreshTokens = false;

                deferred.resolve(response);
                console.log('Pada ovdje');
            });

            return deferred.promise;
        };

        var registerExternal = function (registerExternalData) {
            var deferred = $q.defer();

            $http.post(apiSource + 'api/account/registerexternal', registerExternalData).then(function (response) {

                localStorageService.set('authorizationData', { token: response.data.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

                authentication.isAuth = true;
                authentication.userName = response.data.userName;
                authentication.useRefreshTokens = false;

                deferred.resolve(response);

            });

            return deferred.promise;
        };

        authenticationServiceFactory.saveRegistration = saveRegistration;
        authenticationServiceFactory.login = login;
        authenticationServiceFactory.logout = logout;
        authenticationServiceFactory.fillAuthData = fillAuthData;
        authenticationServiceFactory.authentication = authentication;
        authenticationServiceFactory.refreshToken = refreshToken;

        authenticationServiceFactory.obtainAccessToken = obtainAccessToken;
        authenticationServiceFactory.externalAuthData = externalAuthData;
        authenticationServiceFactory.registerExternal = registerExternal;

        return authenticationServiceFactory;

    }]);
}());
