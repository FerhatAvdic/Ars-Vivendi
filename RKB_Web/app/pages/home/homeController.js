(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("homeController", ['$scope','$interval','$location','dataService','$sce', function ($scope, $interval,$location, dataService, $sce) {
        
        //COVER 
        //$scope.slides = [
        //    { image: "http://www.3glav.com/wp-content/uploads/2016/01/soca-rafting-slovenia-bovec.jpg", title: "Rafting", description: "Slide down the rivers with us", labelColor: "#54D9BB" },
        //    { image: "/img/hik_slide.jpg", title: "Planinarenje", description: "Exploring the forests and fields of mountains", labelColor: "#2BD0AB" },
        //    { image: "/img/ski_slide.jpg", title: "Skijanje", description: "Speeding down the lanes", labelColor: "#02CB9E" },
        //    { image: "/img/div_slide.jpg", title: "Ronjenje", description: "Go down into the depths of the seas", labelColor: "#00A37F" },
        //    { image: "/img/bik_slide.jpg", title: "Biciklizam", description: "Driving over the hills up to the mountains", labelColor: "#007E62" }
        //];

        //$scope.slides = [
        //   { image: "http://www.3glav.com/wp-content/uploads/2016/01/soca-rafting-slovenia-bovec.jpg", title: "Rafting", description: "Slide down the rivers with us", labelColor: "rgb(152, 74, 198)", categoryId: 4 },
        //   { image: "/img/hik_slide.jpg", title: "Planinarenje", description: "Exploring the forests and fields of mountains", labelColor: "rgb(227, 147, 86)", categoryId: 2 },
        //   { image: "/img/ski_slide.jpg", title: "Skijanje", description: "Speeding down the lanes", labelColor: "rgb(95, 197, 217)", categoryId: 3 },
        //   { image: "/img/div_slide.jpg", title: "Ronjenje", description: "Go down into the depths of the seas", labelColor: "rgb(100, 117, 208)", categoryId: 1 },
        //   { image: "/img/bik_slide.jpg", title: "Biciklizam", description: "Driving over the hills up to the mountains", labelColor: 'rgb(198, 199, 84)', categoryId: 5 }
        //];
        var slideObj = {
            "id": null,
            "categoryColor":null,
            "name": null,
            "description": null,
            "imageUrl": null
        };
        //LIST EVENT CATEGORIES
        $scope.listEventCategories = function () {
            $scope.categoriesLoading = true;
            dataService.list("eventcategories", function (response) {
                if (response.status === 200) {
                    $scope.slides = response.data
                    $scope.intervalOfSlide(5000);
                    $scope.categoriesLoading = false;
                    console.log("EVENT CATEGORIES: ", $scope.slides);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja kategorija");
                    console.log("ERROR: ", response);
                }
            });
        };
        $scope.listEventCategories();

        //WHY ARS VIVENDI
        //$scope.activityShowcase = [
        //    { icon: "fa-tint", backgroundColor: "EEEEEE", title: "Ronjenje", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. " },
        //    { icon: "fa-bicycle", backgroundColor: "EEEEEE", title: "Biciklizam", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. " },
        //    { icon: "fa-life-ring", backgroundColor: "EEEEEE", title: "Rafting", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. " }
        //, {icon: "fa-snowflake-o",backgroundColor: "3A7AD2",title: "Skijanje",description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "},
        //  {icon: "fa-tree",backgroundColor: "007E62",title: "Planinarenje",description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "},
        //  {icon: "fa-star",backgroundColor: "00A37F",title: "Rekreacija",description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "}
        //];
        var serviceObj = {
            "id": null,
            "title": null,
            "body": null,
            "imageUrl": null
        }
        $scope.listServices = function () {
            $scope.servicesLoading = true;
            dataService.list("services", function (res) {
                if (res.status === 200) {
                    $scope.services = res.data
                    $scope.servicesLoading = false;
                    console.log("services: ", res.data);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja partnera");
                    console.log("ERROR: ", res);
                }
            });
        };
        $scope.listServices();

        //UPCOMING EVENTS SLIDER
        /*$scope.upcoming = [
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
        ];*/

        //PARTNERS
        //$scope.partners = [
        //    '/img/partners/cocacola.png',
        //    '/img/partners/crown.png',
        //    '/img/partners/ebay.png',
        //    '/img/partners/google.png',
        //    '/img/partners/mastercard.png'
        //];
        var partnerObj = {
            "id": null,
            "title": null,
            "body": null,
            "imageUrl": null
        }
        $scope.listPartners = function () {
            $scope.partnersLoading = true;
            dataService.list("partners", function (res) {
                if (res.status === 200) {
                    $scope.partners = res.data
                    $scope.partnersLoading = false;
                    console.log("partners: ", res.data);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja boniteta");
                    console.log("ERROR: ", res);
                }
            });
        };
        $scope.listPartners();

        //SPONSORS
        //$scope.sponsors = [
        //     '/img/partners/cocacola.png',
        //    '/img/partners/crown.png',
        //    '/img/partners/ebay.png',
        //    '/img/partners/google.png',
        //    '/img/partners/mastercard.png'
        //];
        var sponsorObj = {
            "id": null,
            "title": null,
            "body": null,
            "imageUrl":null
        }
        $scope.listSponsors = function () {
            $scope.sponsorsLoading = true;
            dataService.list("sponsors", function (res) {
                if (res.status === 200) {
                    $scope.sponsors = res.data
                    $scope.sponsorsLoading = false;
                    console.log("sponsors: ", res.data);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja sponzora");
                    console.log("ERROR: ", res);
                }
            });
        };
        $scope.listSponsors();

        //PAST EVENTS GALLERY
        /*$scope.gallery = [
            { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/hik_slide.jpg", date: "05-Mart-2017", labelColor: "#2BD0AB" },
            { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/bik_slide.jpg", date: "05-Mart-2017", labelColor: "#02CB9E" },
            { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/div_slide.jpg", date: "05-Mart-2017", labelColor: "#00A37F" },
            { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/ski_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#007E62" },
            { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/bik_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#007E62" },
            { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/hik_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#00A37F" },
            { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/div_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#02CB9E" },
            { eventName: "Lorem Ipsum is simply dummy text", eventImg: "./img/ski_slide.jpg", date: "05-Mart-2017", location: "location", labelColor: "#2BD0AB" }
        ];*/
        $scope.gallery = [];

        //DISCOUNT SLIDES
        //$scope.discounts = [
        //    { "image": "/img/discounts/discount1.jpg" },
        //    { "image": "/img/discounts/discount2.jpg" },
        //    { "image": "/img/discounts/discount3.jpg" },
        //    { "image": "/img/discounts/discount4.png" },
        //    { "image": "/img/discounts/discount5.jpg" },
        //    { "image": "/img/discounts/discount6.jpg" },
        //    { "image": "/img/discounts/discount7.png" },
        //    { "image": "/img/discounts/discount8.jpg" },
        //];
        var discountObj = {
            "id": null,
            "title": null,
            "link": null,
            "imageUrl": null
        }
        $scope.listDiscounts = function () {
            $scope.discountsLoading = true;
            dataService.list("discounts", function (res) {
                if (res.status === 200) {
                    $scope.discounts = res.data
                    if ($scope.discounts.length===0) return;
                    $scope.chunkedDiscounts = chunk($scope.discounts, 3);
                    $scope.intervalOfDiscountSlide(0, 8000);
                    $scope.intervalOfDiscountSlide(1, 7500);
                    $scope.intervalOfDiscountSlide(2, 8500);
                    $scope.discountsLoading = false;
                    console.log("discounts: ", res.data);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja partnera");
                    console.log("ERROR: ", res);
                }
            });
        };
        $scope.listDiscounts();

        // COMMENT SECTION
        $scope.recentComments = [
            {"eventName": "Event Name With Location","eventLink": "link","eventCommentsNumber": 1,"author": "author","profilePicture": "/img/womansilhouette.jpg","dateTime": "date time"},
            {"eventName": "Event Name With Location","eventLink": "link","eventCommentsNumber": 1,"author": "author","profilePicture": "/img/mansilhouette.jpg","dateTime": "date time"},
            {"eventName": "Event Name With Location","eventLink": "link","eventCommentsNumber": 1,"author": "author","profilePicture": "/img/womansilhouette.jpg","dateTime": "date time"},
            {"eventName": "Event Name With Location","eventLink": "link","eventCommentsNumber": 1,"author": "author","profilePicture": "/img/womansilhouette.jpg","dateTime": "date time"},
            {"eventName": "Event Name With Location", "eventLink": "link", "eventCommentsNumber": 1, "author": "author", "profilePicture": "/img/mansilhouette.jpg", "dateTime": "date time" }
        ];

        $scope.listComments = function () {
            $scope.commentsLoading = true;
            dataService.list("usercomments/commentsbyevent/recent", function (res) {
                if (res.status === 200) {
                    $scope.recentComments = res.data
                    $scope.commentsLoading = false;
                    console.log("recentComments: ", res.data);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja komentara");
                    console.log("ERROR: ", res);
                }
            });
        };
        $scope.listComments();

        /////////////

        function getTimeRemaining(event, index, array) {

            var date1 = event.startDate;
            event.startDate = moment(event.startDate).format('DD/MM/YYYY');
            
            var t = Date.parse(date1) - Date.parse(new Date());
                var seconds = Math.floor((t / 1000) % 60);
                var minutes = Math.floor((t / 1000 / 60) % 60);
                var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                var days = Math.floor(t / (1000 * 60 * 60 * 24));
                event.timeRemaining = {
                    'total': t,
                    'days': days,
                    'hours': hours,
                    'minutes': minutes,
                    'seconds': seconds
                };
        };
        

        $scope.getUpcoming = function () {
            dataService.list("events/future", function (response) {
                if (response.status === 200) {
                    $scope.upcoming = response.data
                    $scope.upcoming.forEach(getTimeRemaining);
                    //Function used to sort in controller, orderby in ng repeat doesnt work as expected
                    $scope.upcoming.sort(function (a, b) {
                        var aDate = a.startDate.substring(3, 5) + "/" + a.startDate.substring(0, 2) + "/" + a.startDate.substring(6);
                        var bDate = b.startDate.substring(3, 5) + "/" + b.startDate.substring(0, 2) + "/" + b.startDate.substring(6);
                        a.date = new Date(aDate);
                        b.date = new Date(bDate);
                        return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
                    });
                    console.log("Upcoming:", $scope.upcoming);
                    $scope.startIntervalSlideUpcoming(6000);
                    //$scope.intervalOfUpcomingDeadline(1000);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja budućih događaja");
                    console.log("ERROR: ", response);
                }
            });
        };
        $scope.getUpcoming();

        $scope.getPast = function () {
            dataService.list("events/past", function (response) {
                if (response.status === 200) {
                    $scope.gallery = response.data
                    console.log($scope.gallery);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja prošlih događaja");
                    console.log("ERROR: ", response);
                }
            });
        };
        $scope.getPast();

        $scope.goToEvent = function (eventID) {
            $location.path('/events/' + eventID);
        };

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
        //function getTimeRemaining(endtime) {
        //    var t = Date.parse(endtime) - Date.parse(new Date());
        //    var seconds = Math.floor((t / 1000) % 60);
        //    var minutes = Math.floor((t / 1000 / 60) % 60);
        //    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        //    var days = Math.floor(t / (1000 * 60 * 60 * 24));
        //    return {
        //        'total': t,
        //        'days': days,
        //        'hours': hours,
        //        'minutes': minutes,
        //        'seconds': seconds
        //    };
        //};
        //$scope.timeRemaining = getTimeRemaining(deadline);
        

        //DISCOUNT SLIDES
        //Slices the discounts into array of arrays for col-md in html
        function chunk(arr, size) {
            var newArr = [];
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i + size));
            }
            return newArr;
        }
        
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
                for (var eventIndex = 0; eventIndex < $scope.upcoming.length; eventIndex++) {
                    var d = $scope.upcoming[eventIndex].timeRemaining.days;
                    var h = $scope.upcoming[eventIndex].timeRemaining.hours;
                    var m = $scope.upcoming[eventIndex].timeRemaining.minutes;
                    var s = $scope.upcoming[eventIndex].timeRemaining.seconds;
                    if (s > 1) s--;
                    else if (s === 1) {
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
                    $scope.upcoming[eventIndex].timeRemaining.days = d;
                    $scope.upcoming[eventIndex].timeRemaining.hours = h;
                    $scope.upcoming[eventIndex].timeRemaining.minutes = m;
                    $scope.upcoming[eventIndex].timeRemaining.seconds = s;
                }
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
        //$scope.intervalOfDiscountSlide(0, 8000);
        //$scope.intervalOfDiscountSlide(1, 7500);
        //$scope.intervalOfDiscountSlide(2, 8500);
        //$scope.intervalOfSlideUpcoming(6000);
        //$scope.intervalOfSlide(5000);

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
        
        //Ferha je meni kralj 
        // <3

        $scope.contactEmail = {
            Name: null,
            Email: null,
            Phone: null,
            Body: null
        };
        $scope.sendContactEmail = function (form) {
            if (form.$invalid) {
                toastr.error('Greška pri unosu');
                return;
            }
            dataService.create("contactemail", $scope.contactEmail, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno slanje emaila!");
                    $scope.contactEmail = {};
                }
                else {
                    toastr.error("Greška prilikom slanja emaila");
                    console.log("ERROR: ", response);
                }
                form.$setPristine();
                form.$setUntouched();
            });
        }
        

        $scope.listStatic = function () {
            $scope.staticLoading = true;
            dataService.list("missions", function (res) {
                if (res.status === 200) {
                    $scope.staticInfo = res.data;
                    $scope.staticInfo.forEach(function (el, index, array) {
                        if (el.title === "Zašto Ars Vivendi") {
                            $scope.mission = el;
                            $scope.mission.body = $sce.trustAsHtml($scope.mission.body);
                        }
                        if (el.title === "Ars Vivendi") {
                            $scope.pageTitle = el;
                        }
                        if (el.title === "O Nama") {
                            $scope.aboutUs = el;
                            $scope.aboutUs.body = $sce.trustAsHtml($scope.aboutUs.body);
                        }
                        if (el.title === "Kontakt Info") {
                            $scope.contactInfo = el;
                            $scope.contactInfo.body = $sce.trustAsHtml($scope.contactInfo.body);
                        }
                    });
                    $scope.staticLoading = false;
                }
                else {
                    toastr.error("Greška prilikom pribavljanja statičnih informacija");
                    console.log("ERROR: ", res);
                }
            });
        };
        $scope.listStatic();

    }]);
}());