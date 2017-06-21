﻿(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("profileController", ['$rootScope','$scope', '$routeParams', '$location','$timeout','dataService', 'authenticationService', function ($rootScope, $scope, $routeParams, $location,$timeout, dataService, authenticationService) {
        
        $scope.dateOfBirth = dataService.dates;
        $scope.countries = dataService.countries;
        var currentUser = authenticationService.authentication;

        var authenticateUser = function () {
            if ($rootScope.userRole === "Admin" || currentUser.userName === $routeParams.id) return;
            else {
                toastr.error("Nemate pristup ovom profilu");
                $location.path('/home');
            }
        };
        var profileID = authenticationService.authentication.userName;
        var profilePicture = {
            "userName": null,
            "baseImage": null
        };

        var paypalInfo = {
            userName: '',
            transactionId: ''
        };



        
        var addNewPayment = function (paymentData) {
            dataService.create("paypal", paymentData, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno izvrsena uplata!");
                }
                else {
                    toastr.error("Greška prilikom izvrsavanja uplate.");
                    console.log("ERROR: ", response);
                }
            });
        };
        var checkPath = function () {
            var urlPath = $location.absUrl();
            if (urlPath != 'http://localhost:49753/index.html#!/profile/' + profileID) {
                //$location.path('profile/' + authenticationService.authentication.userName);
                console.log('drugaciji', urlPath);
                var array = urlPath.split('tx=');
                paypalInfo.transactionId = array[1];
                paypalInfo.userName = authenticationService.authentication.userName;                
                addNewPayment(paypalInfo);               
            }
            else {
                console.log('nije drugaciji', urlPath);
            }
        };
        //checkPath(urlPath);
        $scope.health = false;
        
        $scope.stats = {
            "attendedEvents": [{
                "id": "eventID",
                "name": "eventName 1",
                "type": 1,
                "price": 200,
                "paymentStatus": 150
            },
            {
                "id": "eventID",
                "name": "eventName 2",
                "type": 2,
                "price": 80,
                "paymentStatus": 80
            },
            {
                "id": "eventID",
                "name": "eventName 3",
                "type": 1,
                "price": 120,
                "paymentStatus": 100
            }],
            "comments": [{
                "id": "",
                "eventID": "",
                "eventName": "Makarska",
                "dateTime": "06-Mart-2016 09:37 PM",
                "content":"@TRIZU lajhdljk ashldjkas hjlkdhasljd gashj gdaslčdkaćs ldjhasj khd lasjhd asjk čjdč askjd čklashl jdka skjćdl jasčl dhsačl khdsa čjkl dj"
            },
            {
                "id": "",
                "eventID": "",
                "eventName": "Makarska",
                "dateTime": "06-Mart-2016 08:48 PM",
                "content": "@KKSH lajhdljk ashldjkas hjlkdhasljd gashj gdaslčdkaćs ldjhasj khd lasjhd asjk čjdč askjd čklashl jdka skjćdl jasčl dhsačl khdsa čjkl dj"
            }]
        };
        $scope.statsSummary = [{
            "type": 1,
            "value": 0
        },
        {
            "type": 2,
            "value": 0
        },
        {
            "type": 3,
            "value": 0
        }];

        $scope.changePassword = {
            "currentPassword": "",
            "newPassword": "",
            "confirmNewPassword": ""
        };
        $scope.newInterest = {
            "id": 0,
            "name": null,
            "categoryId": null
        };
        $scope.newInterestCategory = {
            "id": 0,
            "CategoryName": null
        };
        $scope.initCategory = function (category) {
            $scope.newInterest.categoryId = angular.copy(category.id);
        };
        $scope.createInterest = function () {
            dataService.create("characteristicsubcategories", $scope.newInterest, function (response) {
                if (response.status === 200) {
                    $scope.getInterestInfo();
                    toastr.success("Uspješno napravljena karakteristika");
                }
                else {
                    toastr.error("Greška prilikom pravljenja karakteristike");
                    console.log(response.data.modelState);
                }
            });
        };
        $scope.createInterestCategory = function () {
            dataService.create("characteristiccategories", $scope.newInterestCategory, function (response) {
                if (response.status === 200) {
                    $scope.getInterestInfo();
                    toastr.success("Uspješno napravljena kategorija");
                }
                else {
                    toastr.error("Greška prilikom pravljenja kategorije");
                    console.log(response.data.modelState);
                }
            });
        };
        $scope.cancelInterest= function(){
            $scope.newInterest = {
                "id": 0,
                "name": null,
                "categoryId": null
            };
        }
        $scope.cancelInterestCategory = function () {
            $scope.newInterestCategory = {
                "id": 0,
                "categoryName": null
            };
        };
        $scope.setEditingCategory = function (category) {
            $scope.editingInterestCategory = angular.copy(category);
        };
        $scope.cancelEditingCategory = function () {
            $scope.editingInterestCategory = null;
        };
        $scope.setDeletingCategory = function (category) {
            $scope.deletingInterestCategory = angular.copy(category);
        };
        $scope.cancelDeletingCategory = function () {
            $scope.deletingInterestCategory = null;
        };
        $scope.updateInterestCategory = function () {
            dataService.update("characteristiccategories", $scope.editingInterestCategory.id, $scope.editingInterestCategory,function (response) {
                if (response.status === 200) {
                    $scope.getInterestInfo();
                    toastr.success("Uspješno izmijenjena kategorija");
                }
                else {
                    toastr.error("Greška prilikom izmjene kategorije");
                    console.log(response.data.modelState);
                }
            });
        };
        $scope.deleteInterestCategory = function () {
            dataService.remove("characteristiccategories", $scope.deletingInterestCategory.id, function (response) {
                if (response.status === 200) {
                    $scope.getInterestInfo();
                    toastr.success("Uspješno obrisana kategorija");
                }
                else {
                    toastr.error("Greška prilikom brisanja kategorije");
                    console.log(response.data.modelState);
                }
            });
        };

        $scope.getMembershipInfo = function() {
            dataService.read("memberships", "?username=" + profileID, function (response){
                if (response.status === 200) {
                    $scope.membershipInfo = response.data;
                    console.log($scope.membershipInfo);
                }
                else {
                    toastr.error("Greska prilikom dobavljanja podataka o clanstvu.");
                };
            });
        };

        $scope.setEditingInterest = function (Interest) {
            $scope.editingInterest = angular.copy(Interest);
        };
        $scope.cancelEditingInterest = function () {
            $scope.editingInterest = null;
        };
        $scope.setDeletingInterest = function (Interest) {
            $scope.deletingInterest = angular.copy(Interest);
        };
        $scope.cancelDeletingInterest = function () {
            $scope.deletingInterest = null;
        };

        $scope.updateInterest = function () {
            dataService.update("characteristicsubcategories", $scope.editingInterest.id, $scope.editingInterest, function (response) {
                if (response.status === 200) {
                    $scope.getInterestInfo();
                    toastr.success("Uspješno izmijenjena kategorija");
                }
                else {
                    toastr.error("Greška prilikom izmjene kategorije");
                    console.log(response.data.modelState);
                }
            });
        };
        $scope.deleteInterest = function () {
            dataService.remove("characteristicsubcategories", $scope.deletingInterest.id, function (response) {
                if (response.status === 200) {
                    $scope.getInterestInfo();
                    toastr.success("Uspješno obrisana kategorija");
                }
                else {
                    toastr.error("Greška prilikom brisanja kategorije");
                    console.log(response.data.modelState);
                }
            });
        };
        
        $scope.updatePassword = function () {
            dataService.create("updatepassword", $scope.changePassword, function (response) {
                if (response.status === 200) {
                    toastr.success(response.data);
                }
                else {
                    toastr.error(response.data.message);
                    console.log(response.data.modelState);
                }                    
            });
        };
        $scope.summarizeStats = function () {
            angular.forEach($scope.stats.attendedEvents, function (event) {
                switch (event.type) {
                    case 1:
                        $scope.statsSummary[0].value += 1;
                        break;
                    case 2:
                        $scope.statsSummary[1].value += 1;
                        break;
                    case 3:
                        $scope.statsSummary[2].value += 1;
                    default:
                        break;
                }
            });
        };
        $scope.applyTypeColor = function (type) {
            switch (type) {
                case 1:
                    return "#FFA003";
                    break;
                case 2:
                    return "#3A7AD2";
                    break;
                case 3:
                    return "#02CB9E";
                default:
                    break;
            }
        };
        $scope.summarizeStats();

        var convertDateOfBirth = function () {
            $scope.userInfo.dateOfBirth = new Date($scope.userInfo.dateOfBirth);
            //get day
            $scope.userInfo.day = $scope.userInfo.dateOfBirth.getDate();
            if ($scope.userInfo.day < 10)
                $scope.userInfo.day = "0" + $scope.userInfo.day;
            else
                $scope.userInfo.day = "" +$scope.userInfo.day;
            // get month
            $scope.userInfo.month = $scope.userInfo.dateOfBirth.getMonth()+1;
            if ($scope.userInfo.month < 10)
                $scope.userInfo.month = "0" + $scope.userInfo.month;
            else
                $scope.userInfo.month=""+$scope.userInfo.month;
            //get year
            $scope.userInfo.year = "" + $scope.userInfo.dateOfBirth.getFullYear();
        };


        function findCountry(country) {
            return country.number === $scope.userInfo.phoneNumber.substring(0, 4);
        };

        $scope.showDates = function () {

        };


        $scope.getPersonalInfo = function () {
            $scope.personalInfoLoading = true;
            dataService.read("users", "?username=" + profileID, function (response) {
                if (response.status === 200) {
                    $scope.personalInfoLoading = false;
                    $scope.userInfo = response.data;
                    console.log("PERSONAL INFO:", $scope.userInfo);
                    convertDateOfBirth();
                    $scope.selectedCountry = $scope.countries.find(findCountry);
                    $scope.userInfo.partPhoneNumber = $scope.userInfo.phoneNumber.substring(4);
                    if (response.data.imagePath === null) {
                        $scope.userInfo.imagePath = 'img/profilemock.png';
                    }
                }
                else {
                    toastr.error("Greška prilikom pribavljanja ličnih podataka.");
                    console.log("ERROR: ", response);
                }
            });
        };

        $scope.updatePersonalInfo = function () {
            $scope.userInfo.phoneNumber = $scope.selectedCountry.number + $scope.userInfo.phoneNumber;
            var dateString = $scope.userInfo.year + "/" + $scope.userInfo.month + "/" + $scope.userInfo.day;
            $scope.userInfo.dateOfBirth = new Date(dateString);
            dataService.update("users", "?username=" + $scope.userInfo.userName, $scope.userInfo, function (response) {
                if (response.status === 200) {
                    toastr.success("Profil uspješno izmijenjen");
                    //console.log("UPDATED");
                }
                else {
                    toastr.error("Greška prilikom izmjene profila");
                    console.log("ERROR: ", response);
                }
                $scope.getPersonalInfo();
            });
        };

        $scope.userInterests = null;
        $scope.allInterests = null;
        $scope.getInterestInfo = function () {
            $scope.getCategories();
            $scope.getAllInterests();
        };


        var prepareCheckboxes = function () {

            dataService.read("usercharacteristics", "?username=" + profileID, function (response) {
                if (response.status === 200) {
                    $scope.userInterests = response.data;
                    console.log("User interests");
                    console.log($scope.userInterests, response);

                    $scope.allInterests.forEach(function (interest) {
                        interest.checked = false;
                    });
                    $scope.allInterests.forEach(function (interest) {
                        $scope.userInterests.forEach(function (userInterest) {
                            if (interest.id === userInterest.charSubCategoryId)
                                interest.checked = true;
                        });
                    });
                    $scope.interestsLoading = false;
                }
                else {
                    toastr.error("Greška prilikom pribavljanja korisnikovih karakteristika");
                    //console.log("unable to fetch user interests");
                    console.log("ERROR: ", response);
                }
            });
           
        };


        $scope.getCategories = function () {
            $scope.categoriesLoading = true;
            dataService.list("characteristiccategories",function (response) {
                if (response.status===200) {
                    $scope.interestCategories = response.data;
                    $scope.categoriesLoading = false;
                    console.log($scope.interestCategories);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja kategorija");
                    console.log("ERROR: ", response);
                }
            });
        };

        $scope.getAllInterests = function () {
            $scope.interestsLoading = true;
            dataService.list("Characteristicsubcategories", function (response) {
                if (response.status === 200) {
                    $scope.allInterests = response.data;
                    prepareCheckboxes();
                    console.log("ALL INTERESTS");
                    console.log($scope.allInterests);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja kategorija");
                    console.log("ERROR: ", response);
                }
            });
        };

        $scope.getUserInterests = function () {
            dataService.read("usercharacteristics", "?username=" + profileID, function (response) {
                if (response.status === 200) {
                    $scope.userInterests = response.data;
                    console.log("User interests");
                    console.log($scope.userInterests);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja korisnikovih karakteristika");
                    //console.log("unable to fetch user interests");
                    console.log("ERROR: ", response);
                }
            });
        };

        var removeInterest = function (interestID) {
            dataService.remove("usercharacteristics", interestID, function (response) {
                if (response.status === 200) {
                    console.log("Deleted");
                }
                else {
                    $scope.errorRemovingInterest = true;
                    toastr.error("Greška prilikom brisanja karakteristike");
                    console.log("ERROR: ", response);
                }
            });
        };
        var addInterest = function (interestID) {
            var model = {
                "Id": 0,
                "CharSubCategoryId": interestID,
                "UserId": $routeParams.id
            };
            dataService.create("usercharacteristics", model, function (response) {
                if (response.status === 200) {
                    console.log("Created");
                }
                else {
                    $scope.errorAddingInterest = true;
                    toastr.error("Greška prilikom dodavanja karakteristike");
                    console.log("ERROR: ", response);
                }
            });
        };

        $scope.updateInterests = function () {
            var exists = false;
            for (var i = 0; i < $scope.allInterests.length; i++) {
                exists = false;
                for (var j = 0; j < $scope.userInterests.length; j++) {
                    if ($scope.allInterests[i].id === $scope.userInterests[j].charSubCategoryId) {
                        if ($scope.allInterests[i].checked === false) {
                            removeInterest($scope.userInterests[j].id);
                            break;
                        } else {
                            exists = true;
                            break;
                        }
                    }
                }
                if ($scope.allInterests[i].checked === true && exists===false) {
                    addInterest($scope.allInterests[i].id);
                }
            }
            if ($scope.errorAddingInterest)
                toastr.error("Greška prilikom dodavanja karakteristike");
            if ($scope.errorRemovingInterest)
                toastr.error("Greška prilikom brisanja karakteristike");
            if (!$scope.errorAddingInterest || !$scope.errorRemovingInterest)
                toastr.success("Uspješno izmijenjene karakteristike!");
            $scope.getInterestInfo();
        };
       

        $scope.saveProfilePicture = function () {
            profilePicture.userName = $scope.userInfo.userName;
            console.log($scope.userInfo.image);
            profilePicture.baseImage = $scope.userInfo.image.base64;
            dataService.create("uploadprofileimage", profilePicture, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno postavljena slika profila!");
                }
                else {
                    toastr.error("Greška prilikom postavljanja slike profila");
                    console.log("ERROR: ", response);
                }
                $scope.getPersonalInfo();
            });
        };

        $scope.getPersonalInfo();
        checkPath();
        //authenticateUser();

    }]);
}());