(function () {
    'use strict';

    var avApp = angular.module("avApp");
    avApp.controller("membersController", ['$scope','$filter', function ($scope, $filter) {



        $scope.members = [
            {
                "username": "AB",
                "password": "123",
                "email": "abc@gmail.com",
                "name": "abaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                "surname": "abb",
                "address": "abcs 123",
                "phone": "000/999-999",
                "gender": "male",
                "employed": true,
                "membershipDueDate": "15/06/2018",
                "interests": {
                    "skiing": true,
                    "hiking": true,
                    "cycling": true,
                    "diving": false,
                    "rafting": false
                },
                "equipment": {
                    "skiing": [{
                        "skis": true,
                        "poles": true,
                        "boots": true,
                        "helmet": true,
                        "gogles": true,
                        "jacket": true,
                        "pants": true,
                        "gloves": true
                    }],
                    "hiking": [{

                    }],
                    "cycling": [{
                        "bycicle": true,
                        "bagpack": true,
                        "lights": true,
                        "navigationDevice": true,
                        "bycicleComputer": true,
                        "shorts": true,
                        "tights": true,
                        "trousers": true,
                        "shortSleeveJersey": true,
                        "longSleeveJersey": true,
                        "windJacket": true,
                        "glasses": true,
                        "longFingerGloves": true,
                        "shortFingerGloves": true,
                        "overshoes": true,
                    }],
                    "diving": false,
                    "rafting": false
                },
                "goodHealthCondition": true,
                "healthCondDesc": ""
            },
            {
                "username": "CD",
                "password": "123",
                "email": "cdc@gmail.com",
                "name": "cd",
                "surname": "cdb",
                "address": "cdcs 123",
                "phone": "000/999-999",
                "gender": "male",
                "employed": true,
                "membershipDueDate": "15/06/2018",
                "interests": {
                    "skiing": false,
                    "hiking": true,
                    "cycling": false,
                    "diving": false,
                    "rafting": false
                }
            },
            {
                "username": "ef",
                "password": "123",
                "email": "efc@gmail.com",
                "name": "ef",
                "surname": "efb",
                "address": "efcs 123",
                "phone": "000/999-999",
                "gender": "male",
                "employed": true,
                "membershipDueDate": "15/06/2018",
                "interests": {
                    "skiing": true,
                    "hiking": true,
                    "cycling": true,
                    "diving": true,
                    "rafting": false
                }
            },
             {
                 "username": "gh",
                 "password": "123",
                 "email": "ghc@gmail.com",
                 "name": "gh",
                 "surname": "ghb",
                 "address": "ghcs 123",
                 "phone": "000/999-999",
                 "gender": "male",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
                 "interests": {
                     "skiing": false,
                     "hiking": true,
                     "cycling": true,
                     "diving": true,
                     "rafting": true
                 }
             },
             {
                 "username": "ij",
                 "password": "123",
                 "email": "ijc@gmail.com",
                 "name": "ij",
                 "surname": "ijb",
                 "address": "ijcs 123",
                 "phone": "000/999-999",
                 "gender": "male",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "kl",
                 "password": "123",
                 "email": "klc@gmail.com",
                 "name": "kl",
                 "surname": "klb",
                 "address": "klcs 123",
                 "phone": "000/999-999",
                 "gender": "male",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "mn",
                 "password": "123",
                 "email": "mnc@gmail.com",
                 "name": "mn",
                 "surname": "mnb",
                 "address": "mncs 123",
                 "phone": "000/999-999",
                 "gender": "male",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "op",
                 "password": "123",
                 "email": "opc@gmail.com",
                 "name": "op",
                 "surname": "opb",
                 "address": "opcs 123",
                 "phone": "000/999-999",
                 "gender": "male",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "rs",
                 "password": "123",
                 "email": "rsc@gmail.com",
                 "name": "rs",
                 "surname": "rsb",
                 "address": "rscs 123",
                 "phone": "000/999-999",
                 "gender": "male",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "tu",
                 "password": "123",
                 "email": "tuc@gmail.com",
                 "name": "tu",
                 "surname": "tub",
                 "address": "tucs 123",
                 "phone": "000/999-999",
                 "gender": "male",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "vz",
                 "password": "123",
                 "email": "vzc@gmail.com",
                 "name": "vz",
                 "surname": "vzb",
                 "address": "vzcs 123",
                 "phone": "000/999-999",
                 "gender": "female",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "az",
                 "password": "123",
                 "email": "azc@gmail.com",
                 "name": "az",
                 "surname": "azb",
                 "address": "azcs 123",
                 "phone": "000/999-999",
                 "gender": "male",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "av",
                 "password": "123",
                 "email": "avc@gmail.com",
                 "name": "av",
                 "surname": "avb",
                 "address": "avcs 123",
                 "phone": "000/999-999",
                 "gender": "female",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "ah",
                 "password": "123",
                 "email": "ahc@gmail.com",
                 "name": "ah",
                 "surname": "ahb",
                 "address": "ahcs 123",
                 "phone": "000/999-999",
                 "gender": "female",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "au",
                 "password": "123",
                 "email": "auc@gmail.com",
                 "name": "au",
                 "surname": "aub",
                 "address": "aucs 123",
                 "phone": "000/999-999",
                 "gender": "male",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
            {
                "username": "ef",
                "password": "123",
                "email": "efc@gmail.com",
                "name": "ef",
                "surname": "efb",
                "address": "efcs 123",
                "phone": "000/999-999",
                "gender": "male",
                "employed": true,
                "membershipDueDate": "15/06/2018",
            },
             {
                 "username": "gh",
                 "password": "123",
                 "email": "ghc@gmail.com",
                 "name": "gh",
                 "surname": "ghb",
                 "address": "ghcs 123",
                 "phone": "000/999-999",
                 "gender": "female",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "ij",
                 "password": "123",
                 "email": "ijc@gmail.com",
                 "name": "ij",
                 "surname": "ijb",
                 "address": "ijcs 123",
                 "phone": "000/999-999",
                 "gender": "female",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "kl",
                 "password": "123",
                 "email": "klc@gmail.com",
                 "name": "kl",
                 "surname": "klb",
                 "address": "klcs 123",
                 "phone": "000/999-999",
                 "gender": "female",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "mn",
                 "password": "123",
                 "email": "mnc@gmail.com",
                 "name": "mn",
                 "surname": "mnb",
                 "address": "mncs 123",
                 "phone": "000/999-999",
                 "gender": "female",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "op",
                 "password": "123",
                 "email": "opc@gmail.com",
                 "name": "op",
                 "surname": "opb",
                 "address": "opcs 123",
                 "phone": "000/999-999",
                 "gender": "male",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "rs",
                 "password": "123",
                 "email": "rsc@gmail.com",
                 "name": "rs",
                 "surname": "rsb",
                 "address": "rscs 123",
                 "phone": "000/999-999",
                 "gender": "male",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "tu",
                 "password": "123",
                 "email": "tuc@gmail.com",
                 "name": "tu",
                 "surname": "tub",
                 "address": "tucs 123",
                 "phone": "000/999-999",
                 "gender": "female",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "vz",
                 "password": "123",
                 "email": "vzc@gmail.com",
                 "name": "vz",
                 "surname": "vzb",
                 "address": "vzcs 123",
                 "phone": "000/999-999",
                 "gender": "male",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "az",
                 "password": "123",
                 "email": "azc@gmail.com",
                 "name": "az",
                 "surname": "azb",
                 "address": "azcs 123",
                 "phone": "000/999-999",
                 "gender": "male",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "av",
                 "password": "123",
                 "email": "avc@gmail.com",
                 "name": "av",
                 "surname": "avb",
                 "address": "avcs 123",
                 "phone": "000/999-999",
                 "gender": "female",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "ah",
                 "password": "123",
                 "email": "ahc@gmail.com",
                 "name": "ah",
                 "surname": "ahb",
                 "address": "ahcs 123",
                 "phone": "000/999-999",
                 "gender": "male",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             },
             {
                 "username": "au",
                 "password": "123",
                 "email": "auc@gmail.com",
                 "name": "au",
                 "surname": "aub",
                 "address": "aucs 123",
                 "phone": "000/999-999",
                 "gender": "female",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             }

        ];

        //TABLE PROPERTIES
        $scope.headings = [
            //{ "name": "korisničko ime","value": "username",},
            //{ "name": "šifra","value": "password" },
            { "name": "ime","value": "name" },
            { "name": "prezime", "value": "surname" },
            { "name": "telefon", "value": "phone" },
            { "name": "email", "value": "email" },
            { "name": "adresa","value": "address" }
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
        }

        $scope.editingMemberId = null;
        $scope.setForEdit = function (memberID) {
            $scope.editingMemberId = memberID;
        }
        $scope.cancelEdit = function () {
            $scope.editingMemberId = null;
            $scope.editingMember = null;
        }
        $scope.editingMember = null;
        $scope.editMember = function(member){
            $scope.editingMember = member;
        }
        $scope.deletingMember = null;
        $scope.deleteMember = function (member) {
            $scope.deletingMember = member;
        }
        $scope.cancelDelete = function () {
            $scope.deletingMember = null;
        }

        //PAGINATION
        $scope.currentPage = 1;
        $scope.paginationSize = 3;
       // $scope.totalItems = $scope.members.length - 1;

        $scope.pageSizeOptions = [
            { "value": $scope.members.length, "name": "Svi Članovi"},
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

    }])
    .filter('start', function () {
        return function (input, start) {
            if (!input || !input.length) { return; }

            start = +start;
            return input.slice(start);
        };
    });

}());