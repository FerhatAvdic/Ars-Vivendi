﻿(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("singleEventController", ['$scope','$sce','$routeParams','dataService','authenticationService', function ($scope,$sce, $routeParams, dataService,authenticationService) {

        var eventID = $routeParams.id;
        $scope.getEvent = function (eventID) {
            dataService.read("events", eventID, function (response) {
                if (response.status === 200) {
                    $scope.event = response.data;
                    $scope.event.trustedVideoLink = $sce.trustAsResourceUrl($scope.event.videoLink);
                    console.log($scope.event);
                }
                else {
                    console.log("ERROR: ", response);
                }
            });
        };

        $scope.gallery = { eventName: "Lorem Ipsum is simply dummy text", eventImg: "/img/mansilhouette.jpg", date: "05-Mart-2017", labelColor: "#2BD0AB" };
        

        $scope.currentSlide = 0;
        $scope.nextSlide = function () {
            if ($scope.currentSlide != $scope.eventPhotos.length - 1) $scope.currentSlide++;
            else $scope.currentSlide = 0;
        };
        $scope.previousSlide = function () {
            if ($scope.currentSlide != 0) $scope.currentSlide--;
            else $scope.currentSlide = $scope.eventPhotos.length - 1;
        };
        $scope.goToSlide = function (index) {
            $scope.currentSlide = index;
        };
        $scope.newCommentActive = false;

        $scope.headings = [
            { "name": "ime", "value": "name" },
            { "name": "prezime", "value": "surname" },
            { "name": "telefon", "value": "phone" },
            { "name": "email", "value": "email" },
            { "name": "status prijave", "value": "status" },
            { "name": "cijena", "value": "price" },
            { "name": "isplata", "value": "payment" },
            { "name": "dug", "value": "due" }
        ];

       

        $scope.initNewComment = function () {
            $scope.newComment = {
                "id": 0,
                "comment": null,
                "eventId": eventID,
                "userId": authenticationService.authentication.userName
            };
        };

        $scope.initPhotos = function () {
            $scope.photos = {
                "id": 0,
                "eventId": eventID,
                "imageBaseStrings": new Array()
            };
        };
        $scope.initPhotos();

        $scope.initNewComment();
        $scope.listComments = function () {
            dataService.list("usercomments/commentsbyevent/"+eventID, function (response) {
                if (response.status === 200) {
                    $scope.comments = response.data;
                    console.log($scope.comments);
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom pribavljanja komentara");
                }
            });
        };
        $scope.postComment = function () {
            dataService.create("usercomments", $scope.newComment, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno postavljen komentar!");
                    $scope.initNewComment();
                    $scope.newCommentActive = false;
                }
                else {
                    toastr.error("Greška prilikom postavljanja komentara");
                    console.log("ERROR: ", response);
                }
                $scope.listComments();
            });
        };
        $scope.setEditComment = function (comment) {
            $scope.editingComment = null;
            $scope.editingComment = angular.copy(comment);
            $scope.editCommentActive = true;
        };
        $scope.cancelEditComment = function () {
            $scope.editingComment = null;
            $scope.editCommentActive = false;
        }
        $scope.updateUserComment = function () {
            dataService.update("usercomments", $scope.editingComment.id, $scope.editingComment, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno izmijenjen komentar!");
                }
                else {
                    toastr.error("Greška prilikom izmjene komentara");
                    console.log("ERROR: ", response);
                }
                $scope.listComments();
                $scope.editingComment = null;
                $scope.editCommentActive = false;
            });
        };
        $scope.setDeleteComment = function (comment) {
            $scope.deletingComment = angular.copy(comment);
        };
        $scope.cancelDeleteComment = function () {
            $scope.deletingComment = null;
        };
        $scope.deleteUserComment = function () {
            dataService.remove("usercomments", $scope.deletingComment.id, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno obrisan komentar!");
                }
                else {
                    toastr.error("Greška prilikom brisanja komentara");
                    console.log("ERROR: ", response);
                }
                $scope.listComments();
                $scope.deletingComment = null;
            });
        }

        $scope.listPhotos = function () {
            dataService.list("usereventphotos/photosbyevent/" + eventID, function (response) {
                if (response.status === 200) {
                    $scope.eventPhotos = response.data;
                    console.log($scope.eventPhotos);
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom pribavljanja slika događaja");
                }
            });
        };
        $scope.uploadPhotos = function () {
            console.log($scope.photos.images);
            $scope.photos.images.forEach(function (item) {
                $scope.photos.imageBaseStrings.push(item.base64);
            });
            console.log($scope.photos);
            dataService.create("usereventphotos", $scope.photos, function (response) {
                if (response.status === 200) {
                    toastr.success("Upoload uspješan!");
                }
                else {
                    toastr.error("Greška prilikom uploada");
                    console.log("ERROR: ", response);
                }
                $scope.listPhotos();
                $scope.initPhotos();
            });
        };

        $scope.eventSignUpCard = {
            "id": 0,
            "eventID": eventID
        };
        $scope.eventSignUp = function () {
            dataService.create("userevents", $scope.eventSignUpCard, function (response) {
                if (response.status === 200) {
                    toastr.success("Prijava na događaj uspješna!");
                }
                else {
                    toastr.error("Greška prilikom prijave na događaj");
                    console.log("ERROR: ", response);
                }
            });
        };

        $scope.getEvent(eventID);
        $scope.listComments();
        $scope.listPhotos();
    }]);
}());