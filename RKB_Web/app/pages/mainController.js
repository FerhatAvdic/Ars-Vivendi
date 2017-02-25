(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("mainController", ['$scope', function ($scope) {

        $scope.isAdmin = true;

    }]);
}());