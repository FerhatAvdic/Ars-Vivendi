(function () {
    'use strict';

    var avApp = angular.module("avApp");
    avApp.controller("membersController", ['$rootScope','$scope','$sce', '$filter','$location', 'dataService', 'authenticationService', function ($rootScope, $scope,$sce, $filter,$location, dataService, authenticationService) {
        $scope.dateOfBirth = dataService.dates;
        $scope.countries = dataService.countries;
        $scope.selected = [];

        $scope.toggleSelection = function (subCategory) {
            var idx = $scope.selected.indexOf(subCategory);

            if (idx > -1) {
                $scope.selected.splice(idx, 1);
            }
            else {
                $scope.selected.push(subCategory);
            }
            console.log("Selected:", $scope.selected);
        };
        var dayError = false;
        var validateDate = function () {
            var day = parseInt($scope.dateOfBirth.day);
            var month = parseInt($scope.dateOfBirth.month);
            var year = parseInt($scope.dateOfBirth.year);

            if (month === 4 || month === 6 || month === 9 || month === 11)
                if (day > 30) dayError = true;
            if (month === 2 && year % 4 === 0)
                if (day > 29) dayError = true;
            if (month === 2 && year % 4 > 0)
                if (day > 28) dayError = true;
        };
        $scope.filterActive = false;
        var authenticateAdmin = function (){
            if ($rootScope.userRole === "Admin") return;
            else {
                console.log("No permission");
                $location.path('/home');
            }
        };
        $scope.selectedEventID = null;
        $scope.emailContent = "";
        $scope.emailSubject = "";
        $scope.newMember = {
            "firstName": "",
            "lastName": "",
            "address": "",
            "dateOfBirth": "",
            "gender": "",
            "employment": "",
            "email": "",
            "phoneNumber": "",
            "userName": "",
            "roleName":"applicationUser"
        };

        $scope.initNewUserList = function () {
            $scope.newUserList = {
                "id": 0,
                "userIds": null,
                "groupId": null
            };
            $scope.members.forEach(function (member, index, array) {
                member.checked = undefined;
            });
        };
        /*SET FOR HTTP*/
        $scope.editingMember = null;
        $scope.setEditMember = function (userName) {
            console.log(userName);
            dataService.read("users", "?username=" + userName, function (response) {
                if (response.status === 200) {
                    $scope.editingMember = response.data;
                }
                else {
                    console.log("ERROR: ", response);
                }
            });
        };
        $scope.cancelEdit = function () {
            $scope.editingMember = null;
        };
        $scope.deletingMember = null;
        $scope.setDeleteMember = function (userName) {
            dataService.read("users", "?username=" + userName, function (response) {
                if (response.status === 200) {
                    $scope.deletingMember = response.data;
                }
                else {
                    console.log("ERROR: ", response);
                }
            });
        }
        $scope.cancelDelete = function () {
            $scope.deletingMember = null;
        }

        /*HTTP*/
        $scope.listMembers = function () {
            $scope.membersLoading = true;
            dataService.list("users", function (response) {
                if (response.status===200) {
                    $scope.members = response.data;
                    $scope.membersTotal = response.data.length;
                    $scope.membersLoading = false;
                    console.log("Members;");
                    console.log($scope.members);
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom pribavljanja korisnika");
                }
            });
        };
        $scope.createMember = function () {
            //begin validation
            var exitFunction = false;
            //date validation
            dayError = false;
            validateDate();
            if (dayError) {
                toastr.warning("Unesen je pogrešan datum");
                exitFunction = true;
            }
            else {
                var selectedDate = $scope.dateOfBirth.day + "-" + $scope.dateOfBirth.month + "-" + $scope.dateOfBirth.year;
                $scope.newMember.dateOfBirth = new Date(selectedDate);
            }
            //phone validation
            if (!/^[0-9]+$/.test($scope.newMember.phoneNumber)) {
                toastr.warning("Broj telefona smije imati samo cifre");
                exitFunction = true;
            }
            else {
                $scope.newMember.phoneNumber = $scope.selectedCountry.number + $scope.newMember.phoneNumber;
            }
            //empty space validation
            if ($scope.newMember.userName.trim() === "" ||
                $scope.newMember.password.trim() === "" ||
                $scope.newMember.confirmPassword.trim() === "" ||
                $scope.newMember.firstName.trim() === "" ||
                $scope.newMember.lastName.trim() === "" ||
                $scope.newMember.email.trim() === "" ||
                $scope.newMember.address.trim() === "" ||
                $scope.newMember.city.trim() === "" ||
                $scope.newMember.phoneNumber.trim() === "" ||
                $scope.newMember.gender.trim() === "" ||
                $scope.newMember.employment.trim() === "" ||
                $scope.newMember.healthStatus.trim() === "") {
                toastr.warning("Jedno ili više polja je prazno");
                exitFunction = true;
            }
            //characteristics validation
            if ($scope.selected === [] || $scope.selected.length < $scope.interestCategories.length) {
                toastr.warning("Unesite sve karakteristike");
                exitFunction = true;
            }
            if (exitFunction) return;
            //end of validation
            $scope.newMember.subCategoriesList = $scope.selected;
            dataService.create("users", $scope.newMember, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno napravljen novi korisnik!");
                    //console.log("MEMBER ADDED");
                }
                else {
                    toastr.error("Greška prilikom pravljenja korisnika");
                    console.log("ERROR: ", response);
                }
                $scope.listMembers();
            });
        };
        $scope.updateMember = function () {
            dataService.update("users", "?username=" + $scope.editingMember.userName, $scope.editingMember, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno izmijenjen korisnik!");
                    //console.log("UPDATED");
                }
                else {
                    toastr.error("Greška prilikom izmjene korisnika");
                    console.log("ERROR: ", response);
                }
                $scope.listMembers();
            });
        };
        $scope.deleteMember = function () {
            dataService.remove("users", "?username=" + $scope.deletingMember.userName, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno obrisan korisnik!");
                    //console.log("Deleted");
                }
                else {
                    toastr.error("Greška prilikom brisanja korisnika");
                    console.log("ERROR: ", response);
                }
                $scope.listMembers();
            });
        }


        //TABLE PROPERTIES
        $scope.headings = [
            //{ "name": "korisničko ime","value": "username",},
            //{ "name": "šifra","value": "password" },
            { "name": "ime","value": "name" },
            { "name": "prezime", "value": "surname" },
            { "name": "telefon", "value": "phone" },
            { "name": "email", "value": "email" },
            { "name": "grad","value": "city" }
            //{ "name": "spol", "value": "gender" },
            //{ "name": "zaposlenost", "value": "employed" },
            //{ "name": "rok članarine", "value": "membershipDueDate" },
        ]
        $scope.propertyName = {"name": "ime", "value": "name"};
        $scope.reverse = false;
        $scope.sortMembersBy = function (propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
            propertyName.toggled = !propertyName.toggled;
        };



        //PAGINATION
        $scope.currentPage = 1;
        $scope.paginationSize = 3;
       // $scope.totalItems = $scope.members.length - 1;

        $scope.pageSizeOptions = [
            { "value": $scope.membersTotal, "name": "Svi Članovi"},
            { "value": 5, "name": "5 Članova" },
            { "value": 15, "name": "15 Članova" },
            { "value": 20, "name": "20 Članova" },
            { "value": 25, "name": "25 Članova" },
            { "value": 50, "name": "50 Članova" },
            { "value": 100, "name": "100 Članova" }
        ];
        $scope.pageSize = $scope.pageSizeOptions[0].value;

        //FILTERS
        $scope.isCollapsed = [];
        $scope.checkedInterests ={
            "skiing": false,
            "hiking": false,
            "cycling": false,
            "diving": false,
            "rafting": false
        }
        $scope.togglePanel=function(index){
            if (!$scope.isCollapsed.index || $scope.isCollapsed.index === false) $scope.isCollapsed.index = true;
            else $scope.isCollapsed.index = false;
        };

        $scope.columnFilters = {};
        $scope.updateInterests = function (propertyName) {
            if ("undefined" === typeof $scope.columnFilters.interests)
                $scope.columnFilters.interests = {};
            if ("undefined" === typeof $scope.columnFilters.interests[propertyName])
                $scope.columnFilters.interests[propertyName] = true;
            else
                delete $scope.columnFilters.interests[propertyName];
                if (angular.equals($scope.columnFilters.interests, {}))
                    delete $scope.columnFilters.interests;
        }

        //EVENTS

        $scope.listEvents = function () {
            $scope.eventsLoading = true;
            dataService.list("events", function (response) {
                if (response.status === 200) {
                    $scope.avevents = response.data
                    $scope.eventsLoading = false;
                }
                else {
                    toastr.error("Greška prilikom pribavljanja događaja");
                    console.log("ERROR: ", response);
                }
            });
        };

        $scope.prepareEmail = function () {
            $scope.showCheckboxes = true;
            $scope.listEvents();
            $scope.members.forEach(function (member) {
                member.checked = false;
            });
        };
        $scope.cancelPrepareEmail = function () {
            $scope.initNewUserList();
            $scope.selectedEventID = null;
            $scope.showCheckboxes = false;
        };

        $scope.listGroups = function (eventID) {
            dataService.read("usereventgroups", eventID, function (response) {
                if (response.status === 200) {
                    $scope.eventGroups = response.data;
                    console.log($scope.eventGroups);
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom pribavljanja grupa");
                }
            });
        };

        $scope.listGroupUsers = function (groupId) {
            dataService.read("usergroups", groupId, function (response) {
                if (response.status === 200) {
                    $scope.newUserList.userIds = response.data;
                    console.log($scope.newUserList.userIds);

                    $scope.members.forEach(function (member) {
                        member.checked = false;
                    });
                    $scope.members.forEach(function (member) {
                        $scope.newUserList.userIds.forEach(function (selectedUser) {
                            if (member.firstName === selectedUser.firstName && member.lastName === selectedUser.lastName)
                                member.checked = true;
                        });
                    });
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom pribavljanja članova grupe");
                }
            });
        };

        $scope.getCurrentEvent = function () {
            dataService.read("events", $scope.selectedEventID, function (response) {
                if (response.status === 200) {
                    $scope.copyEvent = response.data;
                    $scope.copyEvent.trustedVideoLink = $sce.trustAsResourceUrl($scope.copyEvent.videoLink);
                    console.log($scope.copyEvent);
                    $scope.emailContent =
                        $scope.emailContent +
                        "<p><b>Naziv Događaja:</b> " + $scope.copyEvent.name + "</p>" +
                        "<p><b>Lokacija:</b> " + $scope.copyEvent.location + "</p>" +
                        "<p><b>Kategorija:</b> " + $scope.copyEvent.eventCategoryName + "</p>" +
                        "<p><b>Registracije do:</b> " + $scope.copyEvent.registrationDeadline.toString().substring(0, 10) + "</p>" +
                        "<p><b>Početak:</b> " + $scope.copyEvent.startDate.toString().substring(0, 10) + "</p>" +
                        "<p><b>Kraj:</b> " + $scope.copyEvent.endDate.toString().substring(0, 10) + "</p>" +
                        "<p><b>Valuta:</b> " + $scope.copyEvent.eventCurrency + "</p>" +
                        "<p><b>Cijena za članove:</b> " + $scope.copyEvent.membersPrice + "</p>" +
                        "<p><b>Cijena za goste:</b> " + $scope.copyEvent.nonMembersPrice + "</p>" +
                        "<p><b>Nivo fizičke spreme:</b> " + $scope.copyEvent.applyCriteria + "</p>" +
                        "<p><b>Link slike:</b> " + $scope.copyEvent.imagePath + "</p>" +
                        "<p><b>Link videa:</b> " + $scope.copyEvent.videoLink + "</p>" +
                        "<p><b>Opis događaja:</b> " + $scope.copyEvent.description + "</p>";
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("greška prilikom pribavljanja događaja");
                }
            });
        };


        $scope.getCategories = function () {
            $scope.categoriesLoading = true;
            dataService.list("characteristiccategories", function (response) {
                if (response.status === 200) {
                    $scope.interestCategories = response.data;
                    $scope.categoriesLoading = false;
                    console.log("get categories");
                }
                else {
                    console.log("ERROR: ", response);
                }
            });
        };
        $scope.getCategories();

        $scope.getAllInterests = function () {
            $scope.subCategoriesLoading = true;
            dataService.list("Characteristicsubcategories", function (response) {
                if (response.status === 200) {
                    $scope.subCategories = response.data;
                    $scope.subCategoriesLoading = false;
                    console.log("ALL INTERESTS");
                    console.log($scope.allInterests);
                }
                else {
                    console.log("ERROR: ", response);
                }
            });
        };
        $scope.getAllInterests();


        $scope.sendEmail = function () {
            var email = {
                "emailSubject": $scope.emailSubject,
                "emailContent": $scope.emailContent,
                "usernames": []
            };
            $scope.members.forEach(function (member, index, array) {
                if (member.checked===true) email.usernames.push(member.userName);
            });
            console.log(email);

            dataService.create("groupemail", email, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno slanje emaila!");
                }
                else {
                    toastr.error("Greška prilikom slanja emaila");
                    console.log("ERROR: ", response);
                }
            });
        };

        //DATEPICKER
        $scope.today = function () {
            $scope.newMember.dateOfBirth = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.newMember.dateOfBirth = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
              mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

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
            $scope.newMember.dateOfBirth = new Date(year, month, day);
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

        authenticateAdmin();
        $scope.listMembers();
    }])
    .filter('start', function () {
        return function (input, start) {
            if (!input || !input.length) { return; }

            start = +start;
            return input.slice(start);
        };
    });

}());