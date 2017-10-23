(function () {

    var avApp = angular.module("avApp");

    avApp.directive('compareTo', function () {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function (scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function (modelValue) {
                    console.log('ngModel.$validators.compareTo');
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function () {
                    console.log('scope.$watch');
                    ngModel.$validate();
                });
            }
        };
    });


}());
