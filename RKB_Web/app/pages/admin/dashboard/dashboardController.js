(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("dashboardController", ['$scope', '$rootScope', '$location', function ($scope,$rootScope,$location) {

        $rootScope.location = $location;

    }]);
}());