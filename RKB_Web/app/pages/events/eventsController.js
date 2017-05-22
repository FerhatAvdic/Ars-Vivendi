(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("eventsController", ['$scope','$location', function ($scope, $location) {

        $scope.eventTypes = [
            { "value": undefined, "label": "Sve Kategorije", "color": "black" },
            { "value": "diving", "label": "Ronjenje", "color":"#32ba68"},
            { "value": "rafting", "label": "Rafting", "color": "#f46e42" },
            { "value": "cycling", "label": "Biciklizam", "color": "#2794b2" },
            { "value": "hiking", "label": "Planinarenje", "color": "#b7830b" },
            { "value": "skiing", "label": "Skijanje", "color": "#a81a79" }
        ];
        $scope.newEvent = [
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
                "links": []
            }
        ];
        $scope.links = [{}];
        $scope.avevents = [
            { "active": true, "title": "Rekreativna Tura", "type": "cycling", "typeColor": "#2794b2", "image": "./img/bik_slide.jpg", "location": "Trebević", "date": new Date('01/01/2017') },
            { "active": true, "title": "Eko Akcija", "type": "diving", "typeColor": "#32ba68", "image": "/img/div_slide.jpg", "location": "Ramsko Jezero", "date": new Date('01/02/2017') },
            { "active": true, "title": "Eko Akcija", "type": "hiking", "typeColor": "#b7830b", "image": "/img/hik_slide.jpg", "location": "Igman", "date": new Date('01/03/2017') },
            { "active": true, "title": "Takmičenje Srebrena Lisica", "type": "skiing", "typeColor": "#a81a79", "image": "/img/ski_slide.jpg", "location": "Bjelašnica", "date": new Date('01/03/2017') },
            { "active": true, "title": "Team Building", "type": "rafting", "typeColor": "#f46e42", "image": "http://www.3glav.com/wp-content/uploads/2016/01/soca-rafting-slovenia-bovec.jpg", "location": "Neretva", "date": new Date('02/15/2017') },
            { "active": true, "title": "Eko Akcija", "type": "diving", "typeColor": "#32ba68", "image": "/img/div_slide.jpg", "location": "Ramsko Jezero", "date": new Date('02/16/2017') },
            { "active": false, "title": "Rekreativna Tura", "type": "cycling", "typeColor": "#2794b2", "image": "./img/bik_slide.jpg", "location": "Trebević", "date": new Date('03/09/2017') },
            { "active": false, "title": "Team Building", "type": "rafting", "typeColor": "#f46e42", "image": "http://www.3glav.com/wp-content/uploads/2016/01/soca-rafting-slovenia-bovec.jpg", "location": "Neretva", "date": new Date('10/22/2017') },
            { "active": true, "title": "Takmičenje Srebrena Lisica", "type": "skiing", "typeColor": "#a81a79", "image": "/img/ski_slide.jpg", "location": "Bjelašnica", "date": new Date('11/23/2017') },
            { "active": false, "title": "Eko Akcija", "type": "diving", "typeColor": "#32ba68", "image": "/img/div_slide.jpg", "location": "Ramsko Jezero", "date": new Date('12/12/2017') },
            { "active": true, "title": "Eko Akcija", "type": "hiking", "typeColor": "#b7830b", "image": "/img/hik_slide.jpg", "location": "Igman", "date": new Date('01/01/2017') },
            { "active": true, "title": "Team Building", "type": "rafting", "typeColor": "#f46e42", "image": "http://www.3glav.com/wp-content/uploads/2016/01/soca-rafting-slovenia-bovec.jpg", "location": "Neretva", "date": new Date('12/13/2017') },
            { "active": true, "title": "Rekreativna Tura", "type": "cycling", "typeColor": "#2794b2", "image": "./img/bik_slide.jpg", "location": "Trebević", "date": new Date('03/10/2017') },
            { "active": false, "title": "Eko Akcija", "type": "hiking", "typeColor": "#b7830b", "image": "/img/hik_slide.jpg", "location": "Igman", "date": new Date('07/17/2017') },
            { "active": true, "title": "Takmičenje Srebrena Lisica", "type": "skiing", "typeColor": "#a81a79", "image": "/img/ski_slide.jpg", "location": "Bjelašnica", "date": new Date('03/11/2017') }
        ];
        $scope.activeFilter;
        $scope.typeFilter;
        $scope.titleFilterInput;
        $scope.titleFilter;
        $scope.locationFilterInput;
        $scope.locationFilter;
        $scope.setFilters = function () {
            //Title
            if ($scope.titleFilter === null)
                $scope.titleFilter = undefined;
            else {
                $scope.titleFilter = $scope.titleFilterInput;
            }
            //Location
            if ($scope.locationFilter === null)
                $scope.locationFilter = undefined;
            else {
                $scope.locationFilter = $scope.locationFilterInput;
            }
        };
        $scope.resetFilters = function () {
            $scope.titleFilter = undefined;
            $scope.locationFilter = undefined;
            $scope.typeFilter = undefined;
            $scope.activeFilter = undefined;
        };
        $scope.convertDate = function (eventDate) {
            var date = new Date(eventDate);
            return date;
        };

        $scope.addLink = function () {
            $scope.links.push({"page":null,"url":null});
        };
        $scope.deleteLink = function () {
            var index = $scope.links.length-1;
            $scope.links.splice(index, 1);
        };

        $scope.goToEvent = function () {
            $location.path('/singleEvent');
            console.log("went to single evnet");
        };

        /*CALENDAR*/
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            //dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        /*function disabled(data) {
            var date = data.date,
              mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }*/

        $scope.toggleMin = function () {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function (year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
          {
              date: tomorrow,
              status: 'full'
          },
          {
              date: afterTomorrow,
              status: 'partially'
          }
        ];

        function getDayClass(data) {
            var date = data.date,
              mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
        
    }]);
}());