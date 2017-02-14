(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("homeController", ['$scope', function ($scope) {

        $scope.slides = [
            { image: "/img/bik_slide.jpg", title: "Biciklizam", description: "Driving over the hills up to the mountains" },
            { image: "/img/hik_slide.jpg", title: "Planinarenje", description: "Exploring the forests and fields of mountains" },
            { image: "/img/ski_slide.jpg", title: "Skijanje", description: "Speeding down the lanes" },
            { image: "/img/div_slide.jpg", title: "Ronjenje", description: "Go down into the depths of the seas" }
        ]
        $scope.currentSlide = 0;
        $scope.nextSlide = function () {
            if ($scope.currentSlide != $scope.slides.length-1) $scope.currentSlide++;
            else $scope.currentSlide = 0;
        }
        $scope.previousSlide = function () {
            if ($scope.currentSlide != 0) $scope.currentSlide--;
            else $scope.currentSlide = $scope.slides.length - 1;
        }
        $scope.goToSlide = function (index) {
            $scope.currentSlide = index;
        }
        $scope.dotSelected = function(index){
            return $scope.currentSlide === index;
        }

    }]);
}());