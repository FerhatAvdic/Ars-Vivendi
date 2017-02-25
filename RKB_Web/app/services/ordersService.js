(function () {
    'use strict'
    var avApp = angular.module("avApp");

    avApp.factory('ordersService', ['$http', function ($http) {

        var serviceBase = 'http://localhost:57792/';
        var ordersServiceFactory = {};

        var _getOrders = function () {

            return $http.get(serviceBase + 'api/orders').then(function (results) {
                return results;
            });
        };

        ordersServiceFactory.getOrders = _getOrders;

        return ordersServiceFactory;

    }]);
}());