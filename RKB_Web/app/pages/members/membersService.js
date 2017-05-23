
(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.factory("membersService", ['$resource', function ($resource) {

        return $resource('/api/users/', { id: 'userName' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        });
    }]);

}());