(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.factory("dataService", ['$http', '$rootScope', '$q', 'localStorageService', function ($http, $rootScope, $q, localStorageService) {

        //var source = config.source;
        var source = "http://localhost:57792/api/";
        //var source = "http://arsvivendi.azurewebsites.net/api/";
        //$http.defaults.headers.common['Token'] = currentUser.token;
        //$http.defaults.headers.common['ApiKey'] = config.apiKey;

        function download(url, defaultFileName) {
            var deferred = $q.defer();
            $http.get(url, { responseType: "arraybuffer" }).success(
                function (data, status, headers) {
                    var type = headers('Content-Type');
                    var disposition = headers('Content-Disposition');
                    if (disposition) {
                        var match = disposition.match(/.*filename=\"?([^;\"]+)\"?.*/);
                        if (match[1])
                            defaultFileName = match[1];
                    }
                    defaultFileName = defaultFileName.replace(/[<>:"\/\\|?*]+/g, '_');
                    var blob = new Blob([data], { type: type });
                    saveAs(blob, defaultFileName);
                    deferred.resolve(defaultFileName);
                }).error(function () {
                    deferred.reject();
                });
            return deferred.promise;
        }

        return {

            //CRUD
            list: function (dataSet, callback) {
                $http.get(source + dataSet)
                .then(function (result) {
                    return callback(result);
                }, function (result) {
                    callback(result);
                });
            },

            read: function (dataSet, id, callback) {
                $http.get(source + dataSet + "/" + id)
                     .then(function (result) {
                         return callback(result);
                     }, function (result) {
                         callback(result);
                     });
            },

            create: function (dataSet, data, callback) {
                $http({ method: "post", url: source + dataSet, data: data })
                   .then(function (result) {
                       return callback(result);
                   }, function (result) {
                       callback(result);
                   });
            },

            update: function (dataSet, id, data, callback) {
                $http({ method: "put", url: source + dataSet + "/" + id, data: data })
                   .then(function (result) {
                       return callback(result);
                   }, function (result) {
                       callback(result);
                   });
            },

            remove: function (dataSet, id, callback) {
                $http({ method: "delete", url: source + dataSet + "/" + id })
                     .then(function (result) {
                         return callback(result);
                     }, function (result) {
                         callback(result);
                     });
            },

            createRetrospective: function (dataSet, id, callback) {
                $http({ method: "post", url: source + dataSet + "/" + id })
                    .success(function () {
                        callback(true);
                    })
                    .error(function (error) {
                        $rootScope.message = error.message;
                        callback(false);
                    })
            },

            //PHR OVERVIEW
            phrOverview: function (dataSet, callback) {
                $http.get(source + dataSet)
                     .success(function (data, status, headers) {
                         $rootScope.header = JSON.parse(headers('navigation'));
                         return callback(data);
                     })
                     .error(function (error) {
                         $rootScope.message = error.message;
                         callback(false);
                     })
            },

            //TEAM MEMBER ROLES
            getEmpRolesByEmployeeTeam: function (employee, team, callback) {
                $http.get(source + "emproles?employeeId=" + employee + "&teamId=" + team)
                    .success(function (data) {
                        callback(data);
                    }).error(function (error) {
                        $rootScope.message = error.message;
                        callback(false);
                    })
            },

            //CANCEL REQUEST
            cancelRequest: function (dataSet, id, callback) {
                $http({ method: "put", url: source + dataSet + "/" + id })
                    .success(function () {
                        callback(true);
                    })
                    .error(function (error) {
                        $rootScope.message = error.message;
                        callback(false);
                    })
            },

            //APPROVE REQUEST
            approveRequest: function (dataSet, directAccessKey, istrue, callback) {
                $http({ method: "get", url: source + dataSet + "?directKey=" + directAccessKey + "&isTrue=" + istrue })
                    .success(function () {
                        callback(true);
                    })
                    .error(function (error) {
                        $rootScope.message = error.message;
                        callback(false);
                    })
            },

            //SLACK USERS
            setSlackUsers: function (users) {
                localStorageService.set('slackUsers', users);
            },

            getSlackUsers: function () {
                return localStorageService.get('slackUsers');
            },

            //SEND GROUP EMAIL
            sendGroupMessage: function (dataSet, data, callback) {
                $http({ method: "post", url: source + dataSet, data: data })
                    .success(function () {
                        callback(true);
                    })
                    .error(function () {
                        callback(false);
                    })
            },

            //DOWNLOAD XLS REPORT
            getReport: function (type, item) {
                return download(source + "hrabsencesdashboard?xlstype=" + type +
                            "&employeeId=" + item.employeeId +
                            "&teamId=" + item.teamId +
                            "&type=" + item.type +
                            "&fromDate=" + item.fromDate +
                            "&toDate=" + item.toDate +
                            "&status=" + item.status +
                            "&onlyActive=" + item.onlyActive);
            }
        };
    }]);
}());