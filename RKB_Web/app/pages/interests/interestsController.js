(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("interestsController", ['$scope', '$location', 'dataService', function ($scope, $location, dataService) {

        $scope.resetForm = function (form) {
            form.$setPristine();
            form.$setUntouched();
        };
        $scope.itemListLoading = false;

        $scope.newInterest = {
            "id": 0,
            "name": null,
            "categoryId": null
        };

        $scope.newInterestCategory = {
            "id": 0,
            "CategoryName": null
        };

        $scope.cancelInterest = function () {
            $scope.newInterest = {
                "id": 0,
                "name": null,
                "categoryId": null
            };
        };
        $scope.cancelInterestCategory = function () {
            $scope.newInterestCategory = {
                "id": 0,
                "categoryName": null
            };
        };
        
        $scope.initCategory = function (category) {
            $scope.newInterest.categoryId = angular.copy(category.id);
        };
        $scope.createInterest = function (form) {
            if (form.$invalid) {
                toastr.error('Greška pri unosu');
                return;
            }
            dataService.create("characteristicsubcategories", $scope.newInterest, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno napravljena karakteristika");
                }
                else {
                    toastr.error("Greška prilikom pravljenja karakteristike");
                    console.log(response.data.modelState);
                }
                $scope.getAllInterests();
                $scope.cancelInterest();
                $scope.resetForm(form);
                $('#newInterestModal').modal('hide');
            });
        };
        $scope.createInterestCategory = function (form) {
            if (form.$invalid) {
                toastr.error('Greška pri unosu');
                return;
            }
            dataService.create("characteristiccategories", $scope.newInterestCategory, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno napravljena kategorija");
                }
                else {
                    toastr.error("Greška prilikom pravljenja kategorije");
                    console.log(response.data.modelState);
                }
                $scope.getCategories();
                $scope.cancelInterestCategory();
                $scope.resetForm(form);
                $('#newInterestCategoryModal').modal('hide');
            });
        };

        $scope.cancelInterestForm = function (form) {
            $scope.resetForm(form);
            $scope.cancelInterest();
        }
        $scope.cancelInterestCategoryForm = function (form) {
            $scope.cancelInterestCategory();
            $scope.resetForm(form);
        };

        $scope.setEditingCategory = function (category) {
            $scope.editingInterestCategory = angular.copy(category);
        };
        $scope.cancelEditingCategory = function () {
            $scope.editingInterestCategory = null;
        };
        $scope.cancelEditingCategoryForm = function (form) {
            $scope.editingInterestCategory = null;
            $scope.resetForm(form);
        };
        $scope.setDeletingCategory = function (category) {
            $scope.deletingInterestCategory = angular.copy(category);
        };
        $scope.cancelDeletingCategory = function () {
            $scope.deletingInterestCategory = null;
        };
        $scope.updateInterestCategory = function (form) {
            console.log($scope.editingInterestCategory);
            if (form.$invalid) {
                toastr.error('Greška pri unosu');
                return;
            }
            dataService.update("characteristiccategories", $scope.editingInterestCategory.id, $scope.editingInterestCategory, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno izmijenjena kategorija");
                }
                else {
                    toastr.error("Greška prilikom izmjene kategorije");
                    console.log(response.data.modelState);
                }
                $scope.getCategories();
                $scope.cancelEditingCategory();
                $scope.resetForm(form);
                $('#editingInterestCategoryModal').modal('hide');
            });
        };
        $scope.deleteInterestCategory = function () {
            dataService.remove("characteristiccategories", $scope.deletingInterestCategory.id, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno obrisana kategorija");
                }
                else {
                    toastr.error("Greška prilikom brisanja kategorije");
                    console.log(response.data.modelState);
                }
                $scope.getCategories();
            });
        };

        $scope.setEditingInterest = function (Interest) {
            $scope.editingInterest = angular.copy(Interest);
        };
        $scope.cancelEditingInterest = function () {
            $scope.editingInterest = null;
        };
        $scope.cancelEditingInterestForm = function (form) {
            $scope.editingInterest = null;
            $scope.resetForm(form);
        };
        $scope.setDeletingInterest = function (Interest) {
            $scope.deletingInterest = angular.copy(Interest);
        };
        $scope.cancelDeletingInterest = function () {
            $scope.deletingInterest = null;
        };

        $scope.updateInterest = function (form) {
            if (form.$invalid) {
                toastr.error('Greška pri unosu');
                return;
            }
            dataService.update("characteristicsubcategories", $scope.editingInterest.id, $scope.editingInterest, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno izmijenjena kategorija");
                }
                else {
                    toastr.error("Greška prilikom izmjene kategorije");
                    console.log(response.data.modelState);
                }
                $scope.getAllInterests();
                $scope.cancelEditingInterest();
                $scope.resetForm(form);
                $('#editingInterestModal').modal('hide');
            });
        };
        $scope.deleteInterest = function () {
            dataService.remove("characteristicsubcategories", $scope.deletingInterest.id, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno obrisana kategorija");
                }
                else {
                    toastr.error("Greška prilikom brisanja kategorije");
                    console.log(response.data.modelState);
                }
                $scope.getAllInterests();
            });
        };

        $scope.getCategories = function () {
            $scope.categoriesLoading = true;
            dataService.list("characteristiccategories", function (response) {
                if (response.status === 200) {
                    $scope.interestCategories = response.data;
                    $scope.categoriesLoading = false;
                    console.log($scope.interestCategories);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja kategorija");
                    console.log("ERROR: ", response);
                }
            });
        };

        $scope.getAllInterests = function () {
            $scope.interestsLoading = true;
            dataService.list("Characteristicsubcategories", function (response) {
                if (response.status === 200) {
                    $scope.allInterests = response.data;
                    $scope.interestsLoading = false;
                    console.log("ALL INTERESTS");
                    console.log($scope.allInterests);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja kategorija");
                    console.log("ERROR: ", response);
                }
            });
        };

        $scope.getCategories();
        $scope.getAllInterests();


    }]);
}());