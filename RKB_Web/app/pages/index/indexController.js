(function () {
    'use strict'

    var avApp = angular.module("avApp");

    avApp.controller('indexController', ['$scope', '$location', 'authenticationService', function ($scope, $location, authenticationService) {

        $scope.logOut = function () {
            authenticationService.logout();
            $location.path('/home');
        };

        $scope.authentication = authenticationService.authentication;
    }]);
}());