(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("galleryController", ['$scope', function ($scope) {

        $scope.gallery = [
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "/img/mansilhouette.jpg", date: "05-Mart-2017", labelColor: "#2BD0AB" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "/img/hik_slide.jpg", date: "05-Mart-2017", labelColor: "#2BD0AB" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "/img/bik_slide.jpg", date: "05-Mart-2017", labelColor: "#02CB9E" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/div_slide.jpg", date: "05-Mart-2017", labelColor: "#00A37F" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/ski_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#007E62" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/bik_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#007E62" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/hik_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#00A37F" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/div_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#02CB9E" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/ski_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#2BD0AB" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/hik_slide.jpg", date: "05-Mart-2017", labelColor: "#2BD0AB" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/bik_slide.jpg", date: "05-Mart-2017", labelColor: "#02CB9E" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/div_slide.jpg", date: "05-Mart-2017", labelColor: "#00A37F" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/ski_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#007E62" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/bik_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#007E62" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/hik_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#00A37F" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/div_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#02CB9E" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/ski_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#2BD0AB" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/hik_slide.jpg", date: "05-Mart-2017", labelColor: "#2BD0AB" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/bik_slide.jpg", date: "05-Mart-2017", labelColor: "#02CB9E" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/div_slide.jpg", date: "05-Mart-2017", labelColor: "#00A37F" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/ski_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#007E62" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/bik_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#007E62" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/hik_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#00A37F" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/div_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#02CB9E" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/ski_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#2BD0AB" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/hik_slide.jpg", date: "05-Mart-2017", labelColor: "#2BD0AB" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/bik_slide.jpg", date: "05-Mart-2017", labelColor: "#02CB9E" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/div_slide.jpg", date: "05-Mart-2017", labelColor: "#00A37F" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/ski_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#007E62" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/bik_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#007E62" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/hik_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#00A37F" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/div_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#02CB9E" },
           { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/ski_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#2BD0AB" }
        ];


        $scope.currentSlide = 0;
        $scope.nextSlide = function () {
            if ($scope.currentSlide != $scope.gallery.length - 1) $scope.currentSlide++;
            else $scope.currentSlide = 0;
        }
        $scope.previousSlide = function () {
            if ($scope.currentSlide != 0) $scope.currentSlide--;
            else $scope.currentSlide = $scope.gallery.length - 1;
        }
        $scope.goToSlide = function (index) {
            $scope.currentSlide = index;
        }
    }]);
}());