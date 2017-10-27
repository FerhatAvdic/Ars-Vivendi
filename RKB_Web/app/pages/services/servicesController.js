(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("servicesController", ['$scope', '$location', 'dataService', function ($scope, $location, dataService) {

        $scope.resetForm = function (form) {
            form.$setPristine();
            form.$setUntouched();
        };
        $scope.itemListLoading = false;

        //TABLE PROPERTIES
        $scope.headings = [
            { "name": "Naziv", "value": "title" },
            { "name": "Tekst", "value": "body" },
            { "name": "Slika", "value": "imageUrl" }
        ]
        $scope.propertyName = { "name": "Naziv", "value": "title" };
        $scope.reverse = false;
        $scope.sortItemsBy = function (propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
            propertyName.toggled = !propertyName.toggled;
        };


        var crud = {
            newActive: false,
            editActive: false,
            listActive: true,
            deleteActive: false,
            object: null,
            apiTarget: null,
            listToActive: function () {
                crud.listActive = true;
                crud.newActive = false;
                crud.editActive = false;
                crud.deleteActive = false;
            },
            startNew: function () {
                crud.newActive = true;
                crud.editActive = false;
                crud.listActive = false;
                crud.deleteActive = false;
                $scope.newItem = crud.object
            },
            cancelNew: function () {
                crud.listToActive();
                $scope.newItem = null;
            },
            startEdit: function (item) {
                crud.newActive = false;
                crud.editActive = true;
                crud.listActive = false;
                crud.deleteActive = false;
                $scope.editingItem = angular.copy(item);
                console.log($scope.editingItem);
            },
            cancelEdit: function () {
                crud.listToActive();
                $scope.editingItem = null;
            },
            startDelete: function (item) {
                crud.newActive = false;
                crud.editActive = false;
                crud.listActive = false;
                crud.deleteActive = true;
                $scope.deletingItem = angular.copy(item);
            },
            cancelDelete: function (item) {
                crud.listToActive();
                $scope.deletingItem = null;
            },
            listItems: function () {
                $scope.itemListLoading = true;
                dataService.list(crud.apiTarget, function (res) {
                    if (res.status === 200) {
                        console.log(crud.apiTarget, res.data);
                        $scope.list = res.data
                        $scope.itemListLoading = false;
                    }
                    else {
                        toastr.error("Greška prilikom pribavljanja ponuda");
                        console.log("ERROR: ", res);
                    }
                });
            },
            createItem: function (form) {
                if (form.$invalid) {
                    console.log('forma', form);
                    toastr.error("Imate grešku pri unosu");
                    return;
                }
                $scope.newItem.imageUrl = $scope.newItem.image.base64;
                dataService.create(crud.apiTarget, $scope.newItem, function (res) {
                    if (res.status === 200) {
                        crud.cancelNew();
                        $scope.resetForm(form);
                        crud.listItems();
                        toastr.success("Uspješno dodan ponuda!");
                        //console.log(res.data);
                    }
                    else {
                        toastr.error("Greška prilikom dodavanja ponude");
                        console.log('Error: ' + res.data);
                    }
                    $('#newServiceModal').modal('hide');
                });
            },
            updateItem: function (form) {
                if (form.$invalid) {
                    console.log('forma', form);
                    toastr.error("Imate grešku pri unosu");
                    return;
                }
                dataService.update(crud.apiTarget, $scope.editingItem.id, $scope.editingItem, function (res) {
                    if (res.status === 200) {
                        crud.cancelEdit();
                        $scope.resetForm(form);
                        crud.listItems();
                        toastr.success("Uspješna izmjena ponude");
                        //console.log(res.data);
                    }
                    else {
                        toastr.error("Greška prilikom izmjene ponude");
                        console.log('Error: ' + res.status);
                    }
                    $('#editServiceModal').modal('hide');
                });
            },
            deleteItem: function (id) {
                dataService.remove(crud.apiTarget, id, function (res) {
                    if (res.status === 200) {
                        crud.listItems();
                        console.log(res.data);
                        toastr.success("Uspješno brisanje ponude");
                    }
                    else {
                        toastr.error("Greška prilikom brisanja ponude");
                        console.log('Error: ' + res.data);
                    }
                });
            }
        }
        var serviceObj = {
            "id": null,
            "title": null,
            "body": null,
            "image": null,
            "imageUrl": null
        };
        crud.object = serviceObj;
        crud.apiTarget = "services";
        $scope.crud = crud;
        $scope.crud.listItems();


    }]);
}());