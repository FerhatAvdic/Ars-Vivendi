

(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("singleEventFinancesController", ['$scope', '$sce', '$routeParams', 'dataService', function ($scope, $sce,$routeParams, dataService) {
        $scope.emailContent = "";
        var eventID = $routeParams.id;
        $scope.initNewPayment = function () {
            $scope.newPayment = {
                "id": 0,
                "amountPayed": null,
                "userEventId": null,
                "note": ""
            };
        };
        $scope.initNewPayment();
        $scope.initNewGroup = function () {
            $scope.newGroup = {
                "id": 0,
                "groupName": null,
                "eventId": $routeParams.id
            };
        };
        $scope.initNewUserList = function () {
            $scope.newUserList = {
                "id": 0,
                "userIds": null,
                "groupId": null
            };
            $scope.userArray = [];
            $scope.eventApplications.forEach(function (application,index,array) {
                application.checked = undefined;
            });
        };
        $scope.fillGroup = function () {
            $scope.showCheckboxes = true;
            $scope.initNewUserList();
            $scope.listGroups();
        };
        $scope.cancelFillGroup = function () {
            $scope.showCheckboxes = false;
            $scope.initNewUserList();
        }
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
        $scope.checkedProperty = { 'name': 'checkbox', 'value': 'checked' };
        $scope.checkModel = false;
        $scope.propertyName = { "name": "ime", "value": "firstName" };
        $scope.reverse = false;
        $scope.sortApplicationsBy = function (propertyName) {
            if (propertyName.name === 'checkbox') $scope.checkModel = !$scope.checkModel;
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
            propertyName.toggled = !propertyName.toggled;
            console.log($scope.propertyName);
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

        $scope.createGroup = function () {
            dataService.create("usereventgroups", $scope.newGroup, function (response) {
                if (response.status === 200) {
                    toastr.success("Grupa napravljena!");
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom pravljenja grupe");
                }
                $scope.initNewGroup();
            });
        };
        $scope.listGroups = function () {
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
        $scope.updateGroup = function () {
            if ($scope.newUserList.groupId === null) {
                toastr.error("Odaberite grupu");
                return;
            } 
            var exists = false;
            for (var i = 0; i < $scope.eventApplications.length; i++) {
                exists = false;
                for (var j = 0; j < $scope.newUserList.userIds.length; j++) {
                    if ($scope.eventApplications[i].userId === $scope.newUserList.userIds[j].userId) {
                        if ($scope.eventApplications[i].checked === false) {
                            removeMember($scope.newUserList.userIds[j].id);
                            break;
                        } else {
                            exists = true;
                            break;
                        }
                    }
                }
                if ($scope.eventApplications[i].checked === true && exists === false) {
                    addMember($scope.eventApplications[i].userId);
                }
            }
            if ($scope.errorAddingMember)
                toastr.error("Greška prilikom dodavanja člana");
            if ($scope.errorRemovingMember)
                toastr.error("Greška prilikom brisanja člana");
            if (!$scope.errorAddingMember || !$scope.errorRemovingMember)
                toastr.success("Uspješno ažurirani članovi!");
        };
        $scope.listGroupUsers = function (groupId) {
            dataService.read("usergroups", groupId, function (response) {
                if (response.status === 200) {
                    $scope.newUserList.userIds = response.data;
                    console.log($scope.newUserList.userIds);

                    $scope.eventApplications.forEach(function (interest) {
                        interest.checked = false;
                    });
                    $scope.eventApplications.forEach(function (application) {
                        $scope.newUserList.userIds.forEach(function (selectedUser) {
                            if (application.firstName === selectedUser.firstName && application.lastName === selectedUser.lastName)
                                application.checked = true;
                        });
                    });
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom pribavljanja članova grupe");
                }
            });
        };

        var removeMember = function (userID) {
            dataService.remove("usergroups", userID, function (response) {
                if (response.status === 200) {
                    console.log("Deleted");
                }
                else {
                    $scope.errorRemovingMember = true;
                    toastr.error("Greška prilikom brisanja člana");
                    console.log("ERROR: ", response);
                }
            });
        };
        var addMember = function (userID) {
            var model = {
                "id": 0,
                "userIds": [userID],
                "groupId": $scope.newUserList.groupId
            };
            dataService.create("usergroups", model, function (response) {
                if (response.status === 200) {
                    console.log("Created");
                }
                else {
                    $scope.errorAddingMember = true;
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom dodavanja člana");
                }
            });
        };

        $scope.changeGroupNames = function () {
            dataService.update("usereventgroups", $scope.eventGroups, function (response) {
                if (response.status === 200) {
                    toastr.error("Uspješno ažuriranje grupa!");
                }
                else {
                    toastr.error("Greška prilikom ažuriranja grupa");
                    console.log("ERROR: ", response);
                }
            });
        };

        $scope.deleteGroup = function (groupID) {
            dataService.remove("usereventgroups", groupID, function (response) {
                if (response.status === 200) {
                    toastr.error("Uspješno obrisana grupa!");
                }
                else {
                    toastr.error("Greška prilikom brisanja grupe");
                    console.log("ERROR: ", response);
                }
                $scope.listGroups();
            });
        };

        $scope.getCurrentEvent = function () {
            dataService.read("events", eventID, function (response) {
                if (response.status === 200) {
                    $scope.currentEvent = response.data;
                    $scope.currentEvent.trustedVideoLink = $sce.trustAsResourceUrl($scope.currentEvent.videoLink);
                    console.log($scope.currentEvent);
                    $scope.emailContent =
                        $scope.emailContent +
                        "<p><b>Naziv Događaja:</b> " + $scope.currentEvent.name + "</p>" +
                        "<p><b>Lokacija:</b> " + $scope.currentEvent.location + "</p>" +
                        "<p><b>Kategorija:</b> " + $scope.currentEvent.eventCategoryName + "</p>" +
                        "<p><b>Registracije do:</b> " + $scope.currentEvent.registrationDeadline.toString().substring(0, 10) + "</p>" +
                        "<p><b>Početak:</b> " + $scope.currentEvent.startDate.toString().substring(0, 10) + "</p>" +
                        "<p><b>Kraj:</b> " + $scope.currentEvent.endDate.toString().substring(0, 10) + "</p>" +
                        "<p><b>Valuta:</b> " + $scope.currentEvent.eventCurrency + "</p>" +
                        "<p><b>Cijena za članove:</b> " + $scope.currentEvent.membersPrice + "</p>" +
                        "<p><b>Cijena za goste:</b> " + $scope.currentEvent.nonMembersPrice + "</p>" +
                        "<p><b>Nivo fizičke spreme:</b> " + $scope.currentEvent.applyCriteria + "</p>" +
                        "<p><b>Link slike:</b> " + $scope.currentEvent.imagePath + "</p>" +
                        "<p><b>Link videa:</b> " + $scope.currentEvent.videoLink + "</p>" +
                        "<p><b>Opis događaja:</b> " + $scope.currentEvent.description + "</p>";
                }
                else {
                    toastr.error("greška prilikom pribavljanja događaja");

                   console.log("ERROR: ", response);
                }
            });
        };

    }]);
}());