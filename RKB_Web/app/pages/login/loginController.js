(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("loginController", ['$scope', '$location', '$timeout', 'authenticationService', function ($scope, $location, $timeout, authenticationService) {

        $scope.message = "";

        $scope.registrationData = {
            userName: "",
            password: "",
            confirmPassword: ""
        };

        $scope.loginData = {
            userName: "",
            password: ""
        };

        $scope.signUp = function () {

            authenticationService.saveRegistration($scope.registrationData).then(function (response) {
                console.log("User registered successfully");
                startTimer();
            },
            function (response) {
                var errors = [];
                for (var key in response.data.modelState) {
                    for (var i = 0; i < response.data.modelState[key].length; i++) {
                        errors.push(response.data.modelState[key][i]);
                    }
                }
                $scope.message = "Failed to register user due to: " + errors.join(' ');
                console.log($scope.message);
            });
        };

        $scope.login = function () {

            authenticationService.login($scope.loginData).then(function (data) {
                console.log(data);
                $location.path('/home');
            },
            function (err) {
                $scope.message = err.error_description;
            });
        };

        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/login');
            }, 2000);
        };
    }]);
}());