(function () {
    'use strict';

    var avApp = angular.module("avApp");
    avApp.controller("membersController", ['$scope', function ($scope) {



        $scope.members = [
            {
                "username": "AB",
                "password": "123",
                "email": "abc@gmail.com",
                "name": "ab",
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
                 "gender": "male",
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
                 "gender": "male",
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
                 "gender": "male",
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
                 "gender": "male",
                 "employed": true,
                 "membershipDueDate": "15/06/2018",
             }

        ];
        $scope.headings = [
            {"value": "username",},
            {"value": "password" },
            {"value": "email" },
            { "value": "name" },
            { "value": "surname" },
            { "value": "address" },
            { "value": "phone" },
            { "value": "gender" },
            { "value": "employed" },
            { "value": "membershipDueDate" },
        ]
        $scope.propertyName = {"value": "name"};
        $scope.reverse = false;
        $scope.sortMembersBy = function (propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
            propertyName.toggled = !propertyName.toggled;
        }


        
        $scope.currentPage = 1;
        $scope.paginationSize = 3;

        $scope.pageSizeOptions = [
            { "value": 5, "name": "5 Članova" },
            { "value": 15, "name": "15 Članova" },
            { "value": 20, "name": "20 Članova" },
            { "value": 25, "name": "25 Članova" },
            { "value": 50, "name": "50 Članova" },
            { "value": 100, "name": "100 Članova" }
        ];
        $scope.pageSize = $scope.pageSizeOptions[0].value;

        $scope.isCollapsed = [
        { "panel1": true },
        { "panel2": true },
        { "panel3": true },
        { "panel4": true },
        { "panel5": true },
        { "panel6": true }
        ];

        $scope.checkedInterests = {
            "skiing": null,
            "hiking": null,
            "cycling": null,
            "diving": null,
            "rafting": null
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