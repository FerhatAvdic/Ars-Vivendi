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
                "startDate": "date",
                "endDate": "date",
                "organizator": "org_name",
                "location": "place",
                "departureTime": "time",
                "departurePlace": "place",
                "maxPeople": "number",
                "forAge": "range",
                "necessaryEquipment": "list",
                "contactInfo": "info",
                "website": "link"
        }


    }]);
}());