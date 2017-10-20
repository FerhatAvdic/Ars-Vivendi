(function () {
    'use strict'

    var avApp = angular.module("avApp");

    avApp.controller('adminPanelController', ['$rootScope', '$scope', '$location', 'dataService', function ($rootScope, $scope, $location, dataService) {

        var dataLoading = true;
        $scope.gridOptions = {
            data: [],
            itemsPerPage: 10
        };
        $scope.listMembers = function () {
            $scope.membersLoading = true;
            dataService.list("users", function (response) {
                if (response.status === 200) {
                    $scope.gridOptions.data = response.data;
                    $scope.dataLoading = false;
                    console.log("Grid Data;");
                    console.log($scope.gridOptions.data);
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom pribavljanja korisnika");
                }
            });
        };
        $scope.listMembers();
        
    }]);
}());