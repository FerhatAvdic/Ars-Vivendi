(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("staticInfoController", ['$scope', '$location', 'dataService', function ($scope, $location, dataService) {

        $scope.resetForm = function (form) {
            form.$setPristine();
            form.$setUntouched();
        };
        $scope.itemListLoading = false;

        var staticInfo = {
            "id": null,
            "title": null,
            "body": null
        };

        $scope.listItems = function () {
            $scope.itemListLoading = true;
            dataService.list("missions", function (res) {
                if (res.status === 200) {
                    $scope.list = res.data
                    
                    $scope.list.find(function (item) {
                        if (item.title === 'Naziv Stranice') {
                            $scope.pageTitle = item;
                        }
                        if (item.title === 'Stranica O Nama') {
                            $scope.pageAbout = item;
                        }
                    });
                    var pageTitleIndex = $scope.list.findIndex(function (item) { return item.title === 'Naziv Stranice' });
                    $scope.list.splice(pageTitleIndex, 1);
                    var pageAboutIndex = $scope.list.findIndex(function (item) { return item.title === 'Stranica O Nama' });
                    $scope.list.splice(pageAboutIndex,1);
                    $scope.itemListLoading = false;
                }
                else {
                    toastr.error("Greška prilikom pribavljanja statičnih informacija");
                    console.log("ERROR: ", res);
                }
            });
        };

        $scope.updateItem = function (item, form) {
            if (form.$invalid) {
                console.log('forma', form);
                toastr.error("Imate grešku pri unosu");
                return;
            }
            dataService.update("missions", item.id, item, function (res) {
                if (res.status === 200) {
                    $scope.listItems();
                    toastr.success("Uspješna izmjena");
                    //console.log(res.data);
                }
                else {
                    toastr.error("Greška prilikom izmjene");
                    console.log('Error: ' + res.status);
                }
            });
        };

        $scope.listItems();
    }]);
}());