(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("galleryController", ['$scope', '$location', 'dataService', function ($scope, $location,dataService) {

        $scope.listEventCategories = function () {
            $scope.categoriesLoading = true;
            dataService.list("eventcategories", function (response) {
                if (response.status === 200) {
                    $scope.eventCategories = response.data
                    $scope.categoriesLoading = false;
                    console.log("EVENT CATEGORIES: ", $scope.eventCategories);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja kategorija");
                    console.log("ERROR: ", response);
                }
            });
        };
        $scope.listEventCategories();

        $scope.currentSlide = 0;
        $scope.nextSlide = function () {
            if ($scope.currentSlide != $scope.eventGallery.length - 1) $scope.currentSlide++;
            else $scope.currentSlide = 0;
        };
        $scope.previousSlide = function () {
            if ($scope.currentSlide != 0) $scope.currentSlide--;
            else $scope.currentSlide = $scope.eventGallery.length - 1;
        };
        $scope.goToSlide = function (index) {
            $scope.currentSlide = index;
        };

        $scope.getGallery = function () {
            $scope.galleryLoading = true;
            dataService.list("events/gallery", function (response) {
                if (response.status === 200) {
                    $scope.gallery = response.data;
                    $scope.galleryLoading = false;
                    console.log($scope.gallery);
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom pribavljanja slika");
                }
            });
        };
        $scope.getGallery();

        $scope.getEventGallery = function (eventID) {
            $scope.eventGalleryLoading = true;
            dataService.list("usereventphotos/photosbyevent/" + eventID, function (response) {
                if (response.status === 200) {
                    $scope.eventGallery = response.data;
                    console.log($scope.eventGallery);
                    $scope.eventGalleryLoading = false;
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom pribavljanja slika događaja");
                }
            });
            dataService.read("events", eventID, function (response) {
                if (response.status === 200) {
                    $scope.eventInfo = response.data;
                    console.log($scope.eventInfo);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja događaja");
                    console.log("ERROR: ", response);
                }
            });

            $scope.goToEvent = function (eventID) {
                $location.path('/events/' + eventID);
            };
        };
    }]);
}());