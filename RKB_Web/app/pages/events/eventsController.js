(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("eventsController", ['$rootScope', '$scope', '$location', 'dataService','$routeParams', function ($rootScope, $scope, $location, dataService,$routeParams) {

        
        //MODELS
        $scope.hexColorRegex = /^#[0-9A-Fa-f]{6}\b/;
        var linkModel = { "Id": 0, "Name": "", "Link": "", "index": 0 };
        var linkIndex = 0;
        $scope.newCategory = {
            "Id":0,
            "Name":null,
            "Description":null,
            "CategoryColor": null,
            "ImageUrl":Image
        };
        $scope.newEvent = {
                "id": 0,
                "name": "",
                "description": "",
                "startDate": new Date(),
                "endDate": new Date(),
                "registrationDeadline": new Date(),
                "membersPrice": null,
                "nonMembersPrice": null,
                "eventCategoryId": null,
                "imageBaseString": null,
                "applyCriteria": null,
                "eventLinks": [{ "Id": 0, "name": "", "link": "", "index": linkIndex }]
        };
        $scope.links = [{}];

        //HIDE HTML ON LOAD
        $scope.isloading = function () {
            if ($scope.eventsLoading === true ||
                $scope.categoriesLoading === true)
                return true;
            else
                return false;
        };
        
        $scope.getModalResources = function () {
            dataService.list("eventcategories", function (response) {
                if (response.status === 200) {
                    $scope.eventCategories = response.data
                }
                else {
                    toastr.error("Greška prilikom pribavljanja kategorija");
                    console.log("ERROR: ", response);
                }
            });
            $scope.listCurrencies();
        };

        //LIST CURRENCIES
        $scope.listCurrencies = function () {
            dataService.list("currencies", function (response) {
                if (response.status === 200) {
                    $scope.currencies = response.data
                    console.log($scope.currencies);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja valuta");
                    console.log("ERROR: ", response);
                }
            });
        };

        /************************************ CATEGORIES *************************************/
        //LIST EVENT CATEGORIES
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
        //CREATE CATEGORY
        $scope.createNewCategory = function (form) {
            if (form.$invalid) {
                toastr.error('Greška pri unosu');
                return;
            }
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
                form.$setPristine();
                form.$setUntouched();
                $('#newCategoryModal').modal('hide');
            });
        };
        $scope.cancelNewCategory = function (form) {
            $scope.resetNewCategory();
            $scope.resetForm(form);
        };
        $scope.resetNewCategory = function () {
            $scope.newCategory = {
                "Id": 0,
                "Name": null,
                "Description": null,
                "CategoryColor": null,
                "ImageUrl":Image
            };
        };
        $scope.resetForm = function (form) {
            form.$setPristine();
            form.$setUntouched();
        };
        //EDIT CATEGORY
        $scope.editingCategory;
        $scope.setEditCategory = function (category) {
            $scope.editingCategory = angular.copy(category);
        };
        $scope.cancelEditCategory = function (form) {
            $scope.editingCategory = null;
            $scope.resetForm(form);
        };
        //UPDATE CATEGORY
<<<<<<< HEAD
        $scope.updateCategory = function (form) {
            if (form.$invalid) {
                toastr.error('Greška pri unosu');
                return;
            }
=======
        $scope.updateCategory = function () {
            console.log("what", $scope.editingCategory);
>>>>>>> a66e69d74a5cae1280acd096698bf6d511574bbd
            dataService.update("eventcategories", $scope.editingCategory.id, $scope.editingCategory, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno izmijenjena kategorija!");
                    //console.log("CATEGORY UPDATED");
                    $scope.listEventCategories();
                    $scope.listEvents();
                }
                else {
                    toastr.error("Greška prilikom izmejne kategorije");
                    console.log("ERROR: ", response);
                }
                $scope.resetForm(form);
                $('#editingCategoryModal').modal('hide');
            });
        };
        //DELETE CATEGORY
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
                    $scope.listEvents();
                }
                else {
                    toastr.error("Greška prilikom brisanja kategorije");
                    console.log("ERROR: ", response);
                }
            });
        };


        /************************************ EVENTS *************************************/

        //LIST EVENTS
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
        //CREATE EVENT
        $scope.createEvent = function (form) {
            if (form.$invalid) {
                console.log('forma', form);
                toastr.error("Imate grešku pri unosu");
                return;
            }
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
                $scope.listEventCategories();
                $('#newEventModal').modal('hide');
            });
        };
        function removeEmptyLinks(link, index, array) {
            if (link.name === "" || link.link === "")
                array.splice(index, 1);
        };
        //EDIT EVENT
        $scope.editingEvent;
        $scope.setEditEvent = function (eventID) {
            $scope.getModalResources();
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
        $scope.cancelUpdate = function () {
            $scope.editingEvent = null;
        };
        //UPDATE EVENT
        $scope.updateEvent = function (form) {
            if (form.$invalid) {
                console.log('forma', form);
                toastr.error("Imate grešku pri unosu");
                return;
            }
            //ADD NEW LINKS
            for (var i = 0; i < $scope.editingEvent.eventLinks.length; i++) {
                if ($scope.editingEvent.eventLinks[i].hasOwnProperty('index')) {
                    $scope.editingEvent.eventLinks[i].eventId = $scope.editingEvent.id;
                    $scope.createEventLink($scope.editingEvent.eventLinks[i]);
                }
            }
            //REMOVE NEW LINKS FOR UPDATE TO SUCCEED
            for (var i = 0; i < $scope.editingEvent.eventLinks.length; i++) {
                if ($scope.editingEvent.eventLinks[i].hasOwnProperty('index')) {
                    $scope.editingEvent.eventLinks.splice(i, 1);
                }
            }
            //GET IMAGE BASE64 STRING
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
                $scope.listEventCategories();
                $('#editEventModal').modal('hide');
            });
        };

        /************************************ EVENT LINKS *************************************/
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
        //CREATE LINK
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
        //DELETE LINK
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
        
        //SET DELETE EVENT
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
        $scope.cancelDelete = function () {
            $scope.deletingEvent = null;
        };
        //DELETE EVENT
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
                $scope.listEventCategories();
            });
        };
        
        /************************************ FILTERS *************************************/

        $scope.activeFilter;
        $scope.typeFilter;
        if ($routeParams.filter) $scope.typeFilter = $routeParams.filter;
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

        

        $scope.goToEvent = function (eventID) {
            $location.path('/events/' + eventID);
        };

        /************************************ SIGNUPS *************************************/
        var signupUpdateModel = {
            id: 0,
            applicationStatus: null,
            eventPrice: null
        };
        $scope.listSignups = function (eventID) {
            $scope.signupsLoading = true;
            dataService.list("userevents/"+eventID, function (response) {
                if (response.status === 200) {
                    $scope.signups = response.data
                    $scope.signupsEdit = angular.copy($scope.signups);
                    $scope.signupsLoading = false;
                    console.log($scope.signups);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja prijava");
                    console.log("ERROR: ", response);
                }
            });
        };
        $scope.updateSignups = function () {
            $scope.signupsEdit.forEach(function (item, index) {
                if (!angular.equals(item, $scope.signups[index]))
                    dataService.update("userevents", item.id,item, function (response) {
                        if (response.status === 200) {
                            toastr.success("Uspješno ažuriranje prijave za " +item.firstName +" "+ item.lastName);
                        }
                        else {
                            var updateSuccessful = false;
                            toastr.error("Greška prilikom izmjene događaja");
                            console.log("ERROR: ", response);
                        }
                    });
            });
        };
        $scope.cancelSignupChanges = function () {
            $scope.signupsEdit = null;
            $scope.signups = null;
        };

        /*CALENDAR*/
        {
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

        }
        var path = $location.absUrl();
        console.log(path);

        var splitString = function (string) {
            var array = string.split('tx=');
            return array[1];
        };

        var transactionId = splitString(path);

        console.log(transactionId);

        $scope.listEventCategories();
        $scope.listEvents();

    }]);
}());