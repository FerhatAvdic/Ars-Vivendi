(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("newEventController", ['$scope', function ($scope) {


        $scope.newEvent = {
            "name": "Event",
            "type": "Sport",
            "description": "text",
            "image": "path",
            "video": "embedded",
            "startDate": "",
            "endDate": "",
            "organizator": "org_name",
            "location": "place",
            "departureTime": "",
            "departurePlace": "place",
            "maxPeople": 0,
            "forAge": 0,
            "necessaryEquipment": "list",
            "contactInfo": "info",
            "website": "link"
        };
        $scope.mytime = new Date();

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.ismeridian = true;
        $scope.toggleMode = function () {
            $scope.ismeridian = !$scope.ismeridian;
        };

        $scope.update = function () {
            var d = new Date();
            d.setHours(14);
            d.setMinutes(0);
            $scope.mytime = d;
        };

        $scope.changed = function () {
            $log.log('Time changed to: ' + $scope.mytime);
        };

        $scope.clear = function () {
            $scope.mytime = null;
        };
    }]);
}());