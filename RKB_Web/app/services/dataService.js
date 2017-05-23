(function () {
    'use strict'

    var avApp = angular.module("avApp");

    avApp.factory("dataService", ['$http','$q', '$rootScope', 'arsVivAuthSettings', function ($http, $q, $rootScope, arsVivAuthSettings) {
        var source = arsVivAuthSettings.apiServiceBase;

        return {
            list: function (dataSet, callback) {
                let deferred = $q.defer();
                $http.get(source + dataSet)
                     .then(function(response) {
                         deferred.resolve(response);
                     }).error(function (err) {
                         deferred.reject(err);
                     });
                return deferred.promise;
            }
        };
    }]);
}());