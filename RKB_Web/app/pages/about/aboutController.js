(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("aboutController", ['$scope', '$sce','dataService', function ($scope, $sce, dataService) {

        $scope.listStatic = function () {
            $scope.staticLoading = true;
            dataService.list("missions", function (res) {
                if (res.status === 200) {
                    $scope.staticInfo = res.data;
                    $scope.staticInfo.forEach(function (el, index, array) {
                        if (el.title === "Stranica O Nama") {
                            $scope.about = el;
                            $scope.about.body = $sce.trustAsHtml($scope.about.body);
                        }
                        $scope.staticLoading = false;
                    });
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