(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("eventsController", ['$rootScope', '$scope', '$location', 'dataService', function ($rootScope, $scope, $location, dataService) {

        

        var linkModel = { "Id": 0, "Name": "", "Link": "", "index": 0 };
        var linkIndex = 0;
        $scope.newCategory = {
            "Id":0,
            "Name":null,
            "Description":null,
            "CategoryColor":null
        };
        $scope.eventTypes = [
            { "value": undefined, "label": "Sve Kategorije", "color": "black" },
            { "value": "diving", "label": "Ronjenje", "color":"#32ba68"},
            { "value": "rafting", "label": "Rafting", "color": "#f46e42" },
            { "value": "cycling", "label": "Biciklizam", "color": "#2794b2" },
            { "value": "hiking", "label": "Planinarenje", "color": "#b7830b" },
            { "value": "skiing", "label": "Skijanje", "color": "#a81a79" }
        ];
        $scope.newEvent = {
                "id": 0,
                "name": "",
                "description": "",
                "startDate": new Date(),
                "endDate": new Date(),
                "registrationDeadline": new Date(),
                "membersPrice": 0,
                "nonMembersPrice": 0,
                "eventCategoryId": 1,
                "imageBaseString": null,
                "applyCriteria": null,
                "eventLinks": [{ "Id": 0, "name": "", "link": "", "index": linkIndex }]
        };
        $scope.links = [{}];
        //$scope.avevents = [
        //    { "active": true, "title": "Rekreativna Tura", "type": "cycling", "typeColor": "#2794b2", "image": "./img/bik_slide.jpg", "location": "Trebević", "date": new Date('01/01/2017') },
        //    { "active": true, "title": "Eko Akcija", "type": "diving", "typeColor": "#32ba68", "image": "/img/div_slide.jpg", "location": "Ramsko Jezero", "date": new Date('01/02/2017') },
        //    { "active": true, "title": "Eko Akcija", "type": "hiking", "typeColor": "#b7830b", "image": "/img/hik_slide.jpg", "location": "Igman", "date": new Date('01/03/2017') },
        //    { "active": true, "title": "Takmičenje Srebrena Lisica", "type": "skiing", "typeColor": "#a81a79", "image": "/img/ski_slide.jpg", "location": "Bjelašnica", "date": new Date('01/03/2017') },
        //    { "active": true, "title": "Team Building", "type": "rafting", "typeColor": "#f46e42", "image": "http://www.3glav.com/wp-content/uploads/2016/01/soca-rafting-slovenia-bovec.jpg", "location": "Neretva", "date": new Date('02/15/2017') },
        //    { "active": true, "title": "Eko Akcija", "type": "diving", "typeColor": "#32ba68", "image": "/img/div_slide.jpg", "location": "Ramsko Jezero", "date": new Date('02/16/2017') },
        //    { "active": false, "title": "Rekreativna Tura", "type": "cycling", "typeColor": "#2794b2", "image": "./img/bik_slide.jpg", "location": "Trebević", "date": new Date('03/09/2017') },
        //    { "active": false, "title": "Team Building", "type": "rafting", "typeColor": "#f46e42", "image": "http://www.3glav.com/wp-content/uploads/2016/01/soca-rafting-slovenia-bovec.jpg", "location": "Neretva", "date": new Date('10/22/2017') },
        //    { "active": true, "title": "Takmičenje Srebrena Lisica", "type": "skiing", "typeColor": "#a81a79", "image": "/img/ski_slide.jpg", "location": "Bjelašnica", "date": new Date('11/23/2017') },
        //    { "active": false, "title": "Eko Akcija", "type": "diving", "typeColor": "#32ba68", "image": "/img/div_slide.jpg", "location": "Ramsko Jezero", "date": new Date('12/12/2017') },
        //    { "active": true, "title": "Eko Akcija", "type": "hiking", "typeColor": "#b7830b", "image": "/img/hik_slide.jpg", "location": "Igman", "date": new Date('01/01/2017') },
        //    { "active": true, "title": "Team Building", "type": "rafting", "typeColor": "#f46e42", "image": "http://www.3glav.com/wp-content/uploads/2016/01/soca-rafting-slovenia-bovec.jpg", "location": "Neretva", "date": new Date('12/13/2017') },
        //    { "active": true, "title": "Rekreativna Tura", "type": "cycling", "typeColor": "#2794b2", "image": "./img/bik_slide.jpg", "location": "Trebević", "date": new Date('03/10/2017') },
        //    { "active": false, "title": "Eko Akcija", "type": "hiking", "typeColor": "#b7830b", "image": "/img/hik_slide.jpg", "location": "Igman", "date": new Date('07/17/2017') },
        //    { "active": true, "title": "Takmičenje Srebrena Lisica", "type": "skiing", "typeColor": "#a81a79", "image": "/img/ski_slide.jpg", "location": "Bjelašnica", "date": new Date('03/11/2017') }
        //];
        //

        $scope.isloading = function () {
            if ($scope.eventsLoading === true ||
                $scope.categoriesLoading === true)
                return true;
            else
                return false;
        };
        
        $scope.getModalResources = function () {
            $scope.listEventCategories();
        };
        /*HTTP*/
        
        $scope.listEventCategories = function () {
            $scope.categoriesLoading = true;
            dataService.list("eventcategories", function (response) {
                if (response.status === 200) {
                    $scope.eventCategories = response.data
                    $scope.categoriesLoading = false;
                    $scope.eventCategories.push({ "name": undefined, "categoryColor": "black" });
                    console.log("EVENT CATEGORIES: ", $scope.eventCategories);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja kategorija");
                    console.log("ERROR: ", response);
                } 
            });
        };
        $scope.editingCategory;
        $scope.setEditCategory = function (category) {
            $scope.editingCategory = category;
        };
        $scope.cancelEditCategory = function () {
            $scope.editingCategory = null;
        };
        $scope.updateCategory = function () {
            dataService.update("eventcategories", $scope.editingCategory.id, $scope.editingCategory, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno izmijenjena kategorija!");
                    //console.log("CATEGORY UPDATED");
                    $scope.listEventCategories();
                }
                else {
                    toastr.error("Greška prilikom izmejne kategorije");
                    console.log("ERROR: ", response);
                }
            });
        };
        $scope.deletingCategory;
        $scope.setDeleteCategory = function (category) {
            $scope.deletingCategory = category;
        };
        $scope.cancelDeleteCategory = function () {
            $scope.deletingCategory = null;
        };
        $scope.deleteCategory = function () {
            dataService.remove("eventcategories", $scope.deletingCategory.id, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno obrisana kategorija!");
                    //console.log("CATEGORY DELETED");
                    $scope.listEventCategories();
                }
                else {
                    toastr.error("Greška prilikom brisanja kategorije");
                    console.log("ERROR: ", response);
                }
            });
        };
        $scope.setDeleteEvent = function (eventID) {
            dataService.read("events", eventID, function (response) {
                if (response.status === 200) {
                    $scope.deletingEvent = response.data;
                    console.log($scope.deletingEvent);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja događaja");
                    console.log("ERROR: ", response);
                }
            });
        };

        $scope.listEvents = function () {
            $scope.eventsLoading = true;
            dataService.list("events", function (response) {
                if (response.status === 200) {
                    $scope.avevents = response.data
                    $scope.eventsLoading = false;
                    console.log($scope.avevents);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja događaja");
                    console.log("ERROR: ", response);
                }
            });
        };
        $scope.editingEvent;
        $scope.setEditEvent = function (eventID) {
            $scope.listEventCategories();
            dataService.read("events", eventID, function (response) {
                if (response.status === 200) {
                    $scope.editingEvent = response.data;
                    console.log($scope.editingEvent.startDate, $scope.editingEvent.endDate, $scope.editingEvent.registrationDeadline)
                    $scope.editingEvent.startDate = new Date($scope.editingEvent.startDate);
                    $scope.editingEvent.endDate = new Date($scope.editingEvent.endDate);
                    $scope.editingEvent.registrationDeadline = new Date($scope.editingEvent.registrationDeadline);
                    console.log($scope.editingEvent);
                }
                else {

                    console.log("ERROR: ", response);
                }
            });
        };
        $scope.setDeleteEvent = function (eventID) {
            dataService.read("events", eventID, function (response) {
                if (response.status === 200) {
                    $scope.deletingEvent = response.data;
                    console.log($scope.deletingEvent);
                }
                else {
                    console.log("ERROR: ", response);
                }
            });
        };

        function removeEmptyLinks(link, index, array) {
            if (link.name === "" || link.link === "")
                array.splice(index, 1);
        };
        $scope.createEvent = function () {
            $scope.newEvent.eventLinks.forEach(removeEmptyLinks);
            $scope.newEvent.imageBaseString = $scope.newEvent.image.base64;
            dataService.create("events", $scope.newEvent, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno napravljen događaj!");
                    //console.log("EVENT CREATED", response);
                }
                else {
                    toastr.error("Greška prilikom pravljenja događaja");
                    console.log("ERROR: ", response);
                }
                $scope.listEvents();
            });
        };

        $scope.createEventLink = function (link) {
            dataService.create("eventlinks", link, function (response) {
                if (response.status === 200) {
                    console.log("Link CREATED", response);
                }
                else {
                    toastr.error("Greška prilikom dodavanja linka");
                    console.log("ERROR: ", response);
                }
            });
        };

        $scope.updateEvent = function () {
            for (var i = 0; i < $scope.editingEvent.eventLinks.length; i++) {
                if ($scope.editingEvent.eventLinks[i].hasOwnProperty('index')) {
                    $scope.editingEvent.eventLinks[i].eventId = $scope.editingEvent.id;
                    $scope.createEventLink($scope.editingEvent.eventLinks[i]);
                }
            }
            for (var i = 0; i < $scope.editingEvent.eventLinks.length; i++) {
                if ($scope.editingEvent.eventLinks[i].hasOwnProperty('index')) {
                    $scope.editingEvent.eventLinks.splice(i, 1);
                }
            }
            if (typeof $scope.editingEvent.image === 'undefined') {
                $scope.editingEvent.imageBaseString = "";
            }
            else {
                $scope.editingEvent.imageBaseString = $scope.editingEvent.image.base64;
            }      
            dataService.update("events", $scope.editingEvent.id, $scope.editingEvent, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno izmijenjen događaj");
                    //console.log("UPDATED");
                }
                else {
                    toastr.error("Greška prilikom izmjene događaja");
                    console.log("ERROR: ", response);
                }
                $scope.listEvents();
            });
        };
        $scope.deleteEvent = function () {
            dataService.remove("events", $scope.deletingEvent.id, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno obrisan događaj");
                    //console.log("EVENT DELETED");
                }
                else {
                    toastr.error("Greška prilikom brisanja događaja");
                    console.log("ERROR: ", response);
                }
                $scope.listEvents();
            });
        };
        $scope.cancelUpdate = function () {
            $scope.editingEvent = null;
        };
        $scope.cancelDelete = function () {
            $scope.deletingEvent = null;
        };

        $scope.createNewCategory = function () {
            dataService.create("eventcategories", $scope.newCategory, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno napravljena kategorija");
                    //console.log("Category CREATED", response);
                    $scope.resetNewCategory();
                    $scope.listEventCategories();
                }
                else {
                    toastr.error("Greška prilikom pravljenja kategorije");
                    console.log("ERROR: ", response);
                }
            });
        };
        $scope.resetNewCategory = function () {
            $scope.newCategory = {
                "Id": 0,
                "Name": null,
                "Description": null,
                "CategoryColor": null
            };
        };

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

        $scope.addLinkNewEvent = function () {
            linkIndex++;
            console.log(linkModel);
            $scope.newEvent.eventLinks.push({ "Id": 0, "name": "", "link": "", "index": linkIndex });
        };
        $scope.addLinkEditingEvent = function () {
            linkIndex++;
            $scope.editingEvent.eventLinks.push({ "Id": 0, "name": "", "link": "", "index": linkIndex });
        };

        
        $scope.removeLink = function (index) {
            $scope.newEvent.eventLinks.splice(index, 1);
        };
        $scope.deleteLink = function (link, index) {
            if (!link.hasOwnProperty('index'))
                dataService.remove("eventLinks", link.id, function (response) {
                    if (response.status === 200) {
                        $scope.editingEvent.eventLinks.splice(index, 1);
                        console.log("Link DELETED");
                    }
                    else {
                        toastr.error("Greška prilikom brisanja linka");
                        console.log("ERROR: ", response);
                    }
                });
            else
                $scope.editingEvent.eventLinks.splice(index, 1);
        };

        $scope.goToEvent = function (eventID) {
            $location.path('/events/' + eventID);
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
        $scope.open3 = function () {
            $scope.popup3.opened = true;
        };
        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };
        $scope.popup3 = {
            opened: false
        };

        $scope.setDate = function (year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd MMMM yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];


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

        $scope.listEventCategories();
        $scope.listEvents();

    }]);
}());