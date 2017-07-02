

(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("singleEventFinancesController", ['$scope', '$routeParams', 'dataService', function ($scope, $routeParams, dataService) {

        $scope.initNewPayment = function () {
            $scope.newPayment = {
                "id": 0,
                "amountPayed": null,
                "userEventId": null,
                "note": ""
            };
        };
        $scope.initNewPayment();
        //TABLE HEADINGS AND SORTING ALGORITHM
        $scope.headings = [
            { "name": "ime","value": "firstName" },
            { "name": "prezime", "value": "lastNamee" },
            { "name": "telefon", "value": "phoneNumber" },
            { "name": "email", "value": "email" },
            { "name": "cijena", "value": "eventPrice" },
            { "name": "isplaćeno", "value": "totalAmountPayed" },
            { "name": "dug", "value": "totalAmountOwe" }
        ];
        $scope.propertyName = { "name": "ime", "value": "firstName" };
        $scope.reverse = false;
        $scope.sortApplicationsBy = function (propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
            propertyName.toggled = !propertyName.toggled;
        };

        var eventID = $routeParams.id;
        $scope.listEventApplications = function () {
            dataService.list("userevents/acceptedapplications/" + $routeParams.id, function (response) {
                if (response.status === 200) {
                    $scope.eventApplications = response.data;
                    console.log($scope.eventApplications);
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom pribavljanja prijava");
                }
            });
        };
        $scope.listEventApplications();
        
        $scope.setPayment = function (application) {
            $scope.newPayment.userEventId = application.id;
            $scope.currentApplication = angular.copy(application);
        };
        $scope.addPayment = function () {
            dataService.create("usereventpayments", $scope.newPayment, function (response) {
                if (response.status === 200) {
                    toastr.success("Uplata izvršena!");
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom pribavljanja prijava");
                }
                $scope.initNewPayment();
                $scope.listEventApplications();
            });
        };

        $scope.listPayments = function (application) {
            $scope.currentApplication = angular.copy(application);
            dataService.list("usereventpayments/" + application.id, function (response) {
                if (response.status === 200) {
                    $scope.paymentsByUser = response.data;
                    console.log($scope.paymentsByUser);
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom pribavljanja rata");
                }
            });
        };

        $scope.deletePayment = function (paymentID) {
            dataService.remove("usereventPayments", paymentID, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno obrisana rata");
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom brisanja rate");
                }
                $scope.listPayments($scope.currentApplication);
                $scope.listEventApplications();
            });
        };
    }]);
}());