(function () {
    'use strict'

    var avApp = angular.module("avApp");

    avApp.controller('indexController', ['$rootScope','$scope', '$location', 'authenticationService', function ($rootScope, $scope, $location, authenticationService) {

        $scope.greenMenu = {};
        $scope.greenMenu.login = 'prijava';
        $scope.greenMenu.register = 'postani-clan';
        if (authenticationService.authentication)
            $rootScope.authentication = authenticationService.authentication;

        $scope.logOut = function () {
            authenticationService.logout();
            toastr.info("Odjavljeni ste");
            $rootScope.changeMenu();
            $location.path('/home');
        };

        window.onunload = function () {
            authenticationService.logout();
            toastr.info("Odjavljeni ste");
        }

        window.onload = function () {
            $rootScope.changeMenu();
        };

        console.log('authentication.indexctrl:', $scope.authentication);
    }]);
}());