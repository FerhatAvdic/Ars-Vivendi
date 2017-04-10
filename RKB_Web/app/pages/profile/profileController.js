(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("profileController", ['$scope', function ($scope) {

        $scope.health = false;
        $scope.interests = [{
            "categoryName": "Sport",
            "interestList": [{
                "label": "Skijanje",
                "img": "http://img6.onthesnow.com/image/la/74/early_season_skiing_grand_targhee_1_74093.jpg",
                "value": false
            },
            {
                "label": "Planinarenje",
                "img": "http://www.parcoappennino.it/blogs/appenninogastronomico/wp-content/uploads/sites/3/2015/03/trekking-in-the-mountains.jpg",
                "value": false
            },
            {
                "label": "Biciklizam",
                "img": "http://www.gocyclingmaui.com/img/tour-1.jpg",
                "value": false
            },
            {
                "label": "Rafting",
                "img": "https://media-cdn.tripadvisor.com/media/photo-s/02/d4/6b/7f/88-www-neretva-rafting.jpg",
                "value": false
            },
            {
                "label": "Ronjenje",
                "img": "http://divekingdom.com/upload/hizmet/20160409-161930-1460207970-1701942487.jpg",
                "value": false
            }]
        },
        {
            "categoryName": "Muzika",
            "interestList": [{
                "label": "Narodna",
                "img": "http://media.guitarcenter.com/is/image/MMGS7/72-Bass-Entry-Level-Piano-Accordion-Red/J02738000001000-00-500x500.jpg",
                "value": false
            },
            {
                "label": "Rock",
                "img": "http://www.mveducation.com/assets/products/83102_l.jpg",
                "value": false
            }]
        }];


        $scope.equipment = [{
            "categoryName": "Skijanje",
            "equipmentList": [{
                "label": "Kaciga",
                "img": "http://www.allsportprotection.com/v/vspfiles/assets/images/bern0009-2.jpg",
                "value": false
            },
            {
                "label": "Skije",
                "img": "http://s7d5.scene7.com/is/image/SummitSports/439191_439191_1?$600$",
                "value": false
            },
            {
                "label": "Štapovi",
                "img": "http://i.stpost.com/komperdell-bc-trail-power-lock-ski-poles-adjustable-in-blue~p~8761j_01~440~40.2.jpg",
                "value": false
            },
            {
                "label": "Skijaško odijelo",
                "img": "https://ae01.alicdn.com/kf/HTB1K9i3MVXXXXX1apXXq6xXFXXX4/Wild-snow-2016-Snowboard-Men-Skiing-Suit-Sets-Waterproof-Windproof-30-Warm-Ski-Sets-Jackets-pants.jpg_640x640.jpg",
                "value": false
            }]
        },
        {
            "categoryName": "Planinarenje",
            "equipmentList": [{
                "label": "Jakna",
                "value": false
            },
            {
                "label": "Pantalone",
                "value": false
            }]
        },
         {
             "categoryName": "Biciklizam",
             "equipmentList": [{
                 "label": "Ručna pumpa",
                 "value": false
             },
             {
                 "label": "Svjetlo",
                 "value": false
             }]
         }];

        $scope.stats = {
            "attendedEvents": [{
                "id": "eventID",
                "name": "eventName 1",
                "type": 1,
                "price": "eventPrice 1",
                "paymentStatus": "paid"
            },
            {
                "id": "eventID",
                "name": "eventName 2",
                "type": 2,
                "price": "eventPrice 2",
                "paymentStatus": "paid"
            },
            {
                "id": "eventID",
                "name": "eventName 3",
                "type": 1,
                "price": "eventPrice 3",
                "paymentStatus": "paid"
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
        }]
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

    }]);
}());