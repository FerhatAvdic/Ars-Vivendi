(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("eventsController", ['$scope', function ($scope) {

        $scope.events = [
            {
                "name": "Event",
                "type": "Sport",
                "description": "text",
                "image": "path",
                "video": "embedded",
                "start_date": "date",
                "end_date": "date",
                "organizator": "org_name",
                "location": "place",
                "departure_time": "time",
                "departure_place": "place",
                "max_people": "number",
                "for_age": "range",
                "necessary_equipment": "list",
                "contact_info": "info",
                "website": "link"
            }
        ]

    }]);
}());