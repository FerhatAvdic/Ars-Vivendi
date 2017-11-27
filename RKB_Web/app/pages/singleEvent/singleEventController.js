(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("singleEventController", ['$scope','$sce','$routeParams','dataService','authenticationService', function ($scope,$sce, $routeParams, dataService,authenticationService) {

        $scope.currentUser = authenticationService.authentication;
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
        $scope.resetForm = function (form) {
            form.$setPristine();
            form.$setUntouched();
        };
        //$scope.checkIfApplied = function () {
        //    $scope.userApplications.forEach(function (app, index, array) {
        //        console.log("app.eventid:", app.eventID, "eventID", eventID);
        //        if (app.eventID === eventID) return $scope.applied = true;;
        //    });
        //    return $scope.applied = false;
        //};
        //$scope.listApplications = function () {
        //    $scope.statsLoading = true;
        //    console.log("currentuser:", currentUser.userName);
        //    dataService.list("/userevents/applicationbyuser/" + currentUser.userName + "/", function (response) {
        //        if (response.status === 200) {
        //            $scope.userApplications = response.data;
        //            $scope.statsLoading = false;
        //            console.log("userapps:",$scope.userApplications);
        //            $scope.checkIfApplied();
        //            console.log("applied:",$scope.applied);
        //        }
        //        else {
        //            console.log("ERROR: ", response);
        //            toastr.error("Greška prilikom pribavljanja prijava");
        //        }
        //    });
        //};
        //$scope.listApplications();
        

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
        $scope.startNewComment = function () {
            $scope.newCommentActive = true;
        };
        $scope.newCommentActive = false;
        $scope.cancelNewComment = function (form) {
            $scope.newCommentActive = false;
            $scope.newComment.comment = null;
            $scope.resetForm(form);
            console.log($scope.newCommentActive);
        };
        $scope.postComment = function (form) {
            if (form.$invalid) {
                console.log('forma', form);
                toastr.error("Imate grešku pri unosu");
                return;
            }
            dataService.create("usercomments", $scope.newComment, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno postavljen komentar!");
                    $scope.newCommentActive = false;
                }
                else {
                    toastr.error("Greška prilikom postavljanja komentara");
                    console.log("ERROR: ", response);
                }
                $scope.initNewComment();
                $scope.resetForm(form);
                $scope.listComments();
            });
        };
        $scope.setEditComment = function (comment) {
            $scope.editingComment = null;
            $scope.editingComment = angular.copy(comment);
            $scope.editCommentActive = true;
        };
        $scope.cancelEditComment = function (form) {
            $scope.editingComment = null;
            $scope.editCommentActive = false;
            $scope.resetForm(form);
        }
        $scope.updateUserComment = function (form) {
            if (form.$invalid) {
                console.log('forma', form);
                toastr.error("Imate grešku pri unosu");
                return;
            }
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
                $scope.resetForm(form);
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
        $scope.uploadPhotos = function (form) {
            if (form.$invalid) {
                console.log('forma', form);
                toastr.error("Imate grešku pri unosu");
                return;
            }
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
                $scope.resetForm(form);
                $scope.listPhotos();
                $scope.initPhotos();
                $('#singleEventUploadModal').modal('hide');
            });
        };
        $scope.deletingPhotoId = null;
        $scope.setDeletePhoto = function (id) {
            $scope.deletingPhotoId = id;
        };
        $scope.cancelDeletePhoto = function () {
            $scope.deletingPhotoId = null;
        };
        $scope.deletePhoto = function () {
            dataService.remove("usereventphotos", $scope.deletingPhotoId, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno obrisana slika!");
                    $scope.listPhotos();
                }
                else {
                    toastr.error("Greška prilikom brisanja slike");
                    console.log("ERROR: ", response);
                }
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
                else if(response.status===400){
                    toastr.info("Već ste prijavljeni na događaj");
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