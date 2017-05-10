(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("homeController", ['$scope','$interval', function ($scope, $interval) {
        
        //COVER 
        $scope.slides = [
            { image: "http://www.3glav.com/wp-content/uploads/2016/01/soca-rafting-slovenia-bovec.jpg", title: "Rafting", description: "Slide down the rivers with us", labelColor: "#54D9BB" },
            { image: "/img/hik_slide.jpg", title: "Planinarenje", description: "Exploring the forests and fields of mountains", labelColor: "#2BD0AB" },
            { image: "/img/ski_slide.jpg", title: "Skijanje", description: "Speeding down the lanes", labelColor: "#02CB9E" },
            { image: "/img/div_slide.jpg", title: "Ronjenje", description: "Go down into the depths of the seas", labelColor: "#00A37F" },
            { image: "/img/bik_slide.jpg", title: "Biciklizam", description: "Driving over the hills up to the mountains", labelColor: "#007E62" }
        ];

        //WHY ARS VIVENDI
        $scope.activityShowcase = [
            { icon: "fa-tint", backgroundColor: "EEEEEE", title: "Ronjenje", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. " },
            { icon: "fa-bicycle", backgroundColor: "EEEEEE", title: "Biciklizam", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. " },
            { icon: "fa-life-ring", backgroundColor: "EEEEEE", title: "Rafting", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. " }
        //, {icon: "fa-snowflake-o",backgroundColor: "3A7AD2",title: "Skijanje",description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "},
        //  {icon: "fa-tree",backgroundColor: "007E62",title: "Planinarenje",description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "},
        //  {icon: "fa-star",backgroundColor: "00A37F",title: "Rekreacija",description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "}
        ];

        //UPCOMING EVENTS SLIDER
        $scope.upcoming = [
            { image: "/img/bik_slide.jpg", title: "Slide Title 1", date: "24-08-2017", location: "Sarajevo", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", link: "" },
            { image: "/img/hik_slide.jpg", title: "Slide Title 2", date: "24-08-2017", location: "Sarajevo", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", link: "" },
            { image: "/img/ski_slide.jpg", title: "Slide Title 3", date: "24-08-2017", location: "Sarajevo", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", link: "" },
            { image: "/img/div_slide.jpg", title: "Slide Title 4", date: "24-08-2017", location: "Sarajevo", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", link: "" },
            { image: "/img/div_slide.jpg", title: "Slide Title 4", date: "24-08-2017", location: "Sarajevo", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", link: "" },
            { image: "/img/bik_slide.jpg", title: "Slide Title 1", date: "24-08-2017", location: "Sarajevo", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", link: "" },
            { image: "/img/hik_slide.jpg", title: "Slide Title 2", date: "24-08-2017", location: "Sarajevo", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", link: "" },
            { image: "/img/ski_slide.jpg", title: "Slide Title 3", date: "24-08-2017", location: "Sarajevo", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", link: "" },
            { image: "/img/div_slide.jpg", title: "Slide Title 4", date: "24-08-2017", location: "Sarajevo", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", link: "" },
            { image: "/img/div_slide.jpg", title: "Slide Title 4", date: "24-08-2017", location: "Sarajevo", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", link: "" }
        ];

        //PARTNERS
        $scope.partners = [
            'http://logosolusa.com/wp-content/uploads/2016/08/Banri-Compras-Logo-1.png',
            'https://s-media-cache-ak0.pinimg.com/originals/9e/0d/0d/9e0d0d29921036c2ff5e78d891573f45.png',
            'http://zdnet3.cbsistatic.com/hub/i/2015/09/01/cb834e24-18e7-4f0a-a9bf-4c2917187d3f/83bb139aac01023dbf3e55a3d1789ad8/google-new-logo.png',
            'https://upload.wikimedia.org/wikipedia/commons/4/48/EBay_logo.png',
            'https://multiplicateporcero.wikispaces.com/file/view/Logo_2.png/236890406/726x387/Logo_2.png'
        ];

        //SPONSORS
        $scope.sponsors = [
            'http://logosolusa.com/wp-content/uploads/2016/08/Banri-Compras-Logo-1.png',
            'https://s-media-cache-ak0.pinimg.com/originals/9e/0d/0d/9e0d0d29921036c2ff5e78d891573f45.png',
            'http://zdnet3.cbsistatic.com/hub/i/2015/09/01/cb834e24-18e7-4f0a-a9bf-4c2917187d3f/83bb139aac01023dbf3e55a3d1789ad8/google-new-logo.png',
            'https://upload.wikimedia.org/wikipedia/commons/4/48/EBay_logo.png',
            'https://multiplicateporcero.wikispaces.com/file/view/Logo_2.png/236890406/726x387/Logo_2.png'
        ];

        //PAST EVENTS GALLERY
        $scope.gallery = [
            { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/hik_slide.jpg", date: "05-Mart-2017", labelColor: "#2BD0AB" },
            { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/bik_slide.jpg", date: "05-Mart-2017", labelColor: "#02CB9E" },
            { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/div_slide.jpg", date: "05-Mart-2017", labelColor: "#00A37F" },
            { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/ski_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#007E62" },
            { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/bik_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#007E62" },
            { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/hik_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#00A37F" },
            { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/div_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#02CB9E" },
            { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/ski_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#2BD0AB" }
        ];

        //DISCOUNT SLIDES
        $scope.discounts = [
            { "image": "https://image.freepik.com/free-vector/purple-yellow-and-red-discount-banner_1017-7235.jpg" },
            { "image": "https://image.shutterstock.com/z/stock-vector-super-sale-shining-banner-on-colorful-background-vector-illustration-346063709.jpg" },
            { "image": "https://image.freepik.com/free-vector/glossy-discount-banner_1017-7231.jpg" },
            { "image": "http://vinylbannersprinting.co.uk/wp-content/uploads/2016/04/sb41-RA-preview.png" },
            { "image": "https://t3.ftcdn.net/jpg/01/06/19/42/500_F_106194224_72nlej2A0vX6wpS07XblfyBezdabIGwF.jpg" },
            { "image": "https://thumb7.shutterstock.com/display_pic_with_logo/2909389/557107411/stock-vector-winter-sale-banner-vector-illustration-557107411.jpg" },
            { "image": "https://s-media-cache-ak0.pinimg.com/originals/3c/1c/b6/3c1cb6774bc4f1bb09491d225b038aae.png" },
            { "image": "http://www.freepsdfile.com/wp-content/uploads/2013/09/Free-Sale-Discount-Banner-PSD.jpg" }
        ];

        // COMMENT SECTION
        $scope.recentComments = [
            {"eventName": "Event Name With Location","eventLink": "link","eventCommentsNumber": 1,"author": "author","profilePicture": "/img/womansilhouette.jpg","dateTime": "date time"},
            {"eventName": "Event Name With Location","eventLink": "link","eventCommentsNumber": 1,"author": "author","profilePicture": "/img/mansilhouette.jpg","dateTime": "date time"},
            {"eventName": "Event Name With Location","eventLink": "link","eventCommentsNumber": 1,"author": "author","profilePicture": "/img/womansilhouette.jpg","dateTime": "date time"},
            {"eventName": "Event Name With Location","eventLink": "link","eventCommentsNumber": 1,"author": "author","profilePicture": "/img/womansilhouette.jpg","dateTime": "date time"},
            {"eventName": "Event Name With Location", "eventLink": "link", "eventCommentsNumber": 1, "author": "author", "profilePicture": "/img/mansilhouette.jpg", "dateTime": "date time" }
        ];

        // COVER SLIDER
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

        

        // UPCOMING EVENTS SLIDER
        $scope.currentSlideUpcoming = 0;
        $scope.nextSlideUpcomingBreakInterval = function () {
            $scope.stopIntervalSlideUpcoming();
            if ($scope.currentSlideUpcoming != $scope.upcoming.length - 1) $scope.currentSlideUpcoming++;
            else $scope.currentSlideUpcoming = 0;
            $scope.startIntervalSlideUpcoming(6000);
        };
        $scope.nextSlideUpcoming = function () {
            if ($scope.currentSlideUpcoming != $scope.upcoming.length - 1) $scope.currentSlideUpcoming++;
            else $scope.currentSlideUpcoming = 0;
        };
        $scope.previousSlideUpcoming = function () {
            $scope.stopIntervalSlideUpcoming();
            if ($scope.currentSlideUpcoming != 0) $scope.currentSlideUpcoming--;
            else $scope.currentSlideUpcoming = $scope.upcoming.length - 1;
            $scope.startIntervalSlideUpcoming(6000);
        };
        $scope.goToSlideUpcoming = function (index) {
            $scope.currentSlideUpcoming = index;
            $scope.stopIntervalSlideUpcoming();
            $scope.startIntervalSlideUpcoming(6000);
        };
        $scope.upcomingLabelSelected = function (index) {
            return $scope.currentSlideUpcoming === index;
        };

        // TO BE UPDATED -> TIME FOR EACH EVENT
        var deadline = '2017-05-26';
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
        

        //DISCOUNT SLIDES
        //Slices the discounts into array of arrays for col-md in html
        function chunk(arr, size) {
            var newArr = [];
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i + size));
            }
            return newArr;
        }
        $scope.chunkedDiscounts = chunk($scope.discounts, 3);
        //DISCOUNT SLIDE OPTIONS
        $scope.currentSlideDiscounts = [0,0,0];
        $scope.nextSlideDiscounts = function (index) {
            if ($scope.currentSlideDiscounts[index] != $scope.chunkedDiscounts[index].length - 1) $scope.currentSlideDiscounts[index]++;
            else $scope.currentSlideDiscounts[index] = 0;
        }
        $scope.previousSlideDiscounts = function (index) {
            if ($scope.currentSlideDiscounts[index] != 0) $scope.currentSlideDiscounts[index]--;
            else $scope.currentSlideDiscounts[index] = $scope.chunkedDiscounts[index].length - 1;
        }
        $scope.goToSlideDiscounts = function (columnIndex, discountIndex) {
            $scope.currentSlideDiscounts[columnIndex] = discountIndex;
        }
        $scope.checkCurrentSlides = function (columnIndex, discountIndex) {
            for (var i = 0; i < $scope.currentSlideDiscounts.length; i++) {
                if (i === columnIndex)
                    if ($scope.currentSlideDiscounts[i] === discountIndex) {
                        return true;
                    } 
            }
        };

        //INTERVAL FUNCTIONS FOR AUTO SLIDING
        $scope.intervalOfDiscountSlide = function (index, interval) {
            $interval(function () {
                $scope.nextSlideDiscounts(index);
            }, interval);
        };
        $scope.intervalOfSlide = function (interval) {
            $interval(function () {
                $scope.nextSlide();
            }, interval);
        };
        $scope.intervalOfSlideUpcoming = function (interval) {
            $interval(function () {
                $scope.nextSlideUpcoming();
            }, interval);
        };
        $scope.intervalOfUpcomingDeadline = function (interval) {
            $interval(function () {
                var d = $scope.timeRemaining.days;
                var h = $scope.timeRemaining.hours;
                var m = $scope.timeRemaining.minutes;
                var s = $scope.timeRemaining.seconds;
                if (s > 1) s--;
                else if (s === 1){
                    s = 59;
                    if (m > 1) m--;
                    else if (m === 1) {
                        m = 59;
                        if (h > 1) h--;
                        else if (h === 1) {
                            h = 59;
                            if (d > 0) d--;
                            else if (d === 0) {
                                d = 0;
                            }
                                
                        }
                    }
                }
                $scope.timeRemaining.days = d;
                $scope.timeRemaining.hours = h;
                $scope.timeRemaining.minutes = m;
                $scope.timeRemaining.seconds = s;
            }, interval);
        };

        
        //SMOOTH SCROLL JQUERY
        $(document).ready(function () {
            $("#upcoming-link").click(function () {
                $('html, body').stop(true, false).animate({
                    scrollTop: $("#pre-upcoming").offset().top
                }, 2000);
            });
            $("#contact-link").click(function () {
                $('html, body').stop(true, false).animate({
                    scrollTop: $("#contact").offset().top
                }, 2000);
            });
        });
        $(window).bind("mousewheel", function () {
            $("html, body").stop();
        });

        //START INTERVALS
        $scope.intervalOfDiscountSlide(0, 8000);
        $scope.intervalOfDiscountSlide(1, 7500);
        $scope.intervalOfDiscountSlide(2, 8500);
        //$scope.intervalOfSlideUpcoming(6000);
        $scope.intervalOfSlide(5000);
        $scope.intervalOfUpcomingDeadline(1000);

        var startSlideUpcoming;
        $scope.startIntervalSlideUpcoming = function (interval) {
            // Don't start a new fight if we are already fighting
            if (angular.isDefined(startSlideUpcoming)) return;

            startSlideUpcoming = $interval(function () {
                    $scope.nextSlideUpcoming();
                }, interval);
        }

        $scope.stopIntervalSlideUpcoming = function () {
            if (angular.isDefined(startSlideUpcoming)) {
                $interval.cancel(startSlideUpcoming);
                startSlideUpcoming = undefined;
            }
        };
        $scope.startIntervalSlideUpcoming(6000);

    }]);
}());