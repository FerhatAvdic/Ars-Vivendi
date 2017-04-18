(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("homeController", ['$scope', function ($scope) {

        $scope.slides = [
            { image: "/img/bik_slide.jpg", title: "Biciklizam", description: "Driving over the hills up to the mountains" },
            { image: "/img/hik_slide.jpg", title: "Planinarenje", description: "Exploring the forests and fields of mountains" },
            { image: "/img/ski_slide.jpg", title: "Skijanje", description: "Speeding down the lanes" },
            { image: "/img/div_slide.jpg", title: "Ronjenje", description: "Go down into the depths of the seas" }
        ];
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

        $scope.activityShowcase = [{
            icon: "fa-tint",
            backgroundColor: "EEEEEE",
            title: "Ronjenje",
            description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
        },
        {
            icon: "fa-bicycle",
            backgroundColor: "EEEEEE",
            title: "Biciklizam",
            description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
        },
        {
            icon: "fa-life-ring",
            backgroundColor: "EEEEEE",
            title: "Rafting",
            description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
        }//,
        //{
        //    icon: "fa-snowflake-o",
        //    backgroundColor: "3A7AD2",
        //    title: "Skijanje",
        //    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
        //},
        //{
        //    icon: "fa-tree",
        //    backgroundColor: "007E62",
        //    title: "Planinarenje",
        //    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
        //},
        //{
        //    icon: "fa-star",
        //    backgroundColor: "00A37F",
        //    title: "Rekreacija",
        //    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
        //}
        ];

        $scope.upcoming = [
            { image: "/img/bik_slide.jpg", title: "Slide Title 1", description: "Driving over the hills up to the mountains", link: "" },
            { image: "/img/hik_slide.jpg", title: "Slide Title 2", description: "Exploring the forests and fields of mountains", link:"" },
            { image: "/img/ski_slide.jpg", title: "Slide Title 3", description: "Speeding down the lanes", link: "" },
            { image: "/img/div_slide.jpg", title: "Slide Title 4", description: "Go down into the depths of the seas", link: "" }
        ];
        $scope.currentSlideUpcoming = 0;
        $scope.nextSlideUpcoming = function () {
            if ($scope.currentSlideUpcoming != $scope.upcoming.length - 1) $scope.currentSlideUpcoming++;
            else $scope.currentSlideUpcoming = 0;
        }
        $scope.previousSlideUpcoming = function () {
            if ($scope.currentSlideUpcoming != 0) $scope.currentSlideUpcoming--;
            else $scope.currentSlideUpcoming = $scope.upcoming.length - 1;
        }
        $scope.goToSlideUpcoming = function (index) {
            $scope.currentSlideUpcoming = index;
        }

        var deadline = '2017-04-23';
        function getTimeRemaining(endtime) {
            var t = Date.parse(endtime) - Date.parse(new Date());
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        };
        $scope.timeRemaining = getTimeRemaining(deadline);
        $scope.partners = [
            'http://logosolusa.com/wp-content/uploads/2016/08/Banri-Compras-Logo-1.png',
            'https://s-media-cache-ak0.pinimg.com/originals/9e/0d/0d/9e0d0d29921036c2ff5e78d891573f45.png',
            'http://deepaelectronics.co.in/images/00205-3D-art-logo-design-free-logos-online-011.png',
            'https://upload.wikimedia.org/wikipedia/commons/4/48/EBay_logo.png',
            'https://multiplicateporcero.wikispaces.com/file/view/Logo_2.png/236890406/726x387/Logo_2.png'
        ];

        $scope.gallery = [{
            eventName: "Lorem Ipsum is simply dummy text",
            eventImg: "./img/hik_slide.jpg",
            date: "05-Mart-2017"
        },
        {
            eventName: "Lorem Ipsum is simply dummy text",
            eventImg: "./img/bik_slide.jpg",
            date: "05-Mart-2017"
        },
        {
            eventName: "Lorem Ipsum is simply dummy text",
            eventImg: "./img/div_slide.jpg",
            date: "05-Mart-2017"
        },
        {
            eventName: "Lorem Ipsum is simply dummy text",
            eventImg: "./img/ski_slide.jpg",
            date: "05-Mart-2017",
            location: "location"
        },
        {
            eventName: "Lorem Ipsum is simply dummy text",
            eventImg: "./img/bik_slide.jpg",
            date: "05-Mart-2017",
            location: "location"
        },
        {
            eventName: "Lorem Ipsum is simply dummy text",
            eventImg: "./img/hik_slide.jpg",
            date: "05-Mart-2017",
            location: "location"
        },
        {
            eventName: "Lorem Ipsum is simply dummy text",
            eventImg: "./img/div_slide.jpg",
            date: "05-Mart-2017",
            location: "location"
        },
        {
            eventName: "Lorem Ipsum is simply dummy text",
            eventImg: "./img/ski_slide.jpg",
            date: "05-Mart-2017",
            location: "location"
        }//,
        //{
        //    eventName: "Lorem Ipsum is simply dummy text",
        //    eventImg: "./img/bik_slide.jpg",
        //    date: "05-Mart-2017",
        //    location: "location"
        //}
        ];

        $("#upcoming-link").click(function () {
            $('html, body').animate({
                scrollTop: $("#upcoming").offset().top
            }, 2000);
        });
        $("#contact-link").click(function () {
            $('html, body').animate({
                scrollTop: $("#contact").offset().top
            }, 2000);
        });

    }]);
}());