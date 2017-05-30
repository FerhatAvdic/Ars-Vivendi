(function () {
    'use strict'

    var avApp = angular.module("avApp");

    avApp.controller('indexController', ['$rootScope','$scope', '$location', 'authenticationService', function ($rootScope, $scope, $location, authenticationService) {

        $scope.greenMenu = {};
        $scope.greenMenu.login = 'prijava';
        $scope.greenMenu.register = 'postani-clan';

        $scope.logOut = function () {
            authenticationService.logout();
            $rootScope.changeMenu();
            $location.path('/home');
        };

        window.onunload = function () {
            authenticationService.logout();
        }

        $scope.authentication = authenticationService.authentication;
        console.log($scope.authentication);
    }]);
}());