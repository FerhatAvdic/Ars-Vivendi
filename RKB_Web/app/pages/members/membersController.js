(function () {
    'use strict';

    var avApp = angular.module("avApp");
    avApp.controller("membersController", ['$rootScope','$scope', '$filter','$location', 'membersService', 'dataService', 'authenticationService', function ($rootScope, $scope, $filter,$location, membersService, dataService, authenticationService) {

        var authenticateAdmin = function (){
            if ($rootScope.userRole === "Admin") return;
            else {
                console.log("No permission");
                $location.path('/home');
            }
        };
        
        $scope.newMember = {
            "firstName": "MMMM",
            "lastName": "aaaic",
            "address": "ddddffa 76",
            "dateOfBirth": "02.05.1992.",
            "gender": "musko",
            "employment": "Zaposlen",
            "email": "asdas@gmail.com",
            "phoneNumber": "062/422-313",
            "userName": "user",
            "role": "CustomUser"
        };
        /*SET FOR HTTP*/
        $scope.editingMember = null;
        $scope.setEditMember = function (userName) {
            console.log(userName);
            dataService.read("users", userName, function (response) {
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
            dataService.read("users", userName, function (response) {
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
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom pribavljanja korisnika");
                }
            });
        };
        $scope.createMember = function () {
            console.log($scope.newMember);
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
            dataService.update("users", $scope.editingMember.userName, $scope.editingMember, function (response) {
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
            dataService.remove("users", $scope.deletingMember.userName, function (response) {
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
        $scope.isCollapsed = [
        { "panel1": true },
        { "panel2": true },
        { "panel3": true },
        { "panel4": true },
        { "panel5": true },
        { "panel6": true }
        ];
        $scope.checkedInterests ={
            "skiing": false,
            "hiking": false,
            "cycling": false,
            "diving": false,
            "rafting": false
        }

        $scope.columnFilters = {
        };
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