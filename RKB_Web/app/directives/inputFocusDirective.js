(function () {

    var avApp = angular.module("avApp");

    
    avApp.directive('focusById', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, ctrl) {
                element.bind('click', function () {
                    $timeout(function () { $('#' + attrs.focusById).focus(); }, 0);
                });
            }
        };
    }]);


}());
