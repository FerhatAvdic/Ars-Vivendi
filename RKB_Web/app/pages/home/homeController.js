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
            backgroundColor: "073A80",
            title: "Ronjenje",
            description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
        },
        {
            icon: "fa-bicycle",
            backgroundColor: "02CB9E",
            title: "Biciklizam",
            description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
        },
        {
            icon: "fa-life-ring",
            backgroundColor: "1462CD",
            title: "Rafting",
            description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
        },
        {
            icon: "fa-snowflake-o",
            backgroundColor: "3A7AD2",
            title: "Skijanje",
            description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
        },
        {
            icon: "fa-tree",
            backgroundColor: "007E62",
            title: "Planinarenje",
            description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
        },
        {
            icon: "fa-star",
            backgroundColor: "00A37F",
            title: "Rekreacija",
            description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
        }];

        var deadline = '2017-04-11';
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
            eventImg: "https://s-media-cache-ak0.pinimg.com/originals/45/5f/d0/455fd055178fdf66ca077d017cf7a923.jpg"
        },
        {
            eventName: "Lorem Ipsum is simply dummy text",
            eventImg: "https://ksqphotography.files.wordpress.com/2011/05/sample-with-dx-crop-factor.jpg"
        },
        {
            eventName: "Lorem Ipsum is simply dummy text",
            eventImg: "https://www.pentaxforums.com/forums/attachments/12-post-your-photos/47585d1258486914-nature-sample-shots-smc-135-600mm-chipmunkhickorymouth.jpeg"
        },
        {
            eventName: "Lorem Ipsum is simply dummy text",
            eventImg: "http://pre02.deviantart.net/f34e/th/pre/f/2015/182/4/f/croatia_nature_pack___sample__2___proref_org_by_proref-d8zgrc2.jpg"
        },
        {
            eventName: "Lorem Ipsum is simply dummy text",
            eventImg: "https://c1.staticflickr.com/4/3171/2763595208_2427d97192_b.jpg"
        },
        {
            eventName: "Lorem Ipsum is simply dummy text",
            eventImg: "https://www.slrlounge.com/wp-content/uploads/2013/11/Nikon-D5300-Sample-HDR-Image.jpg"
        },
        {
            eventName: "Lorem Ipsum is simply dummy text",
            eventImg: "https://www.slrlounge.com/wp-content/uploads/2013/11/Nikon-D5300-Sample-HDR-Image.jpg"
        },
        {
            eventName: "Lorem Ipsum is simply dummy text",
            eventImg: "https://www.slrlounge.com/wp-content/uploads/2013/11/Nikon-D5300-Sample-HDR-Image.jpg"
        },
        {
            eventName: "Lorem Ipsum is simply dummy text",
            eventImg: "https://www.slrlounge.com/wp-content/uploads/2013/11/Nikon-D5300-Sample-HDR-Image.jpg"
        }];

    }]);
}());