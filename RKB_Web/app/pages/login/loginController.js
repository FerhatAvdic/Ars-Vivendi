(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("loginController", ['$scope', '$rootScope', '$location', '$timeout', 'authenticationService', 'arsVivAuthSettings', 'dataService', '$http', function ($scope, $rootScope, $location, $timeout, authenticationService, arsVivAuthSettings, dataService, $http) {

        $scope.loadSubCategories = function () {
            $http({
                method: 'get', url: "http://localhost:57792/api/subcategories"
            }).then(function successCallback(response) {
                $scope.subCategories = response.data;
            }, function errorCallback(response) {
                console.log("Something went wrong");
            });                
        };

        $scope.selected = [];

        $scope.toggleSelection = function (subCategory) {
            var idx = $scope.selected.indexOf(subCategory);

            if (idx > -1) {
                $scope.selected.splice(idx, 1);
            }
            else {
                $scope.selected.push(subCategory);
            }
            console.log("Selected:", $scope.selected);
        };

        $scope.message = "";

        $scope.registrationData = {
            userName: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            email: "",
            dateOfBirth: "",
            address: "",
            phoneNumber: "",
            gender: 1,
            employment: "Employed",
            subCategoriesList: $scope.selected
        };

        $scope.loginData = {
            userName: "",
            password: ""
        };
        /*DELETE this ASAP*/
        //$scope.loginMOCKUP = function () {
        //    $rootScope.changeMenuAdmin();
        //    $location.path('/home');
        //    currentUser.id = 1;
        //}

        $scope.registerData = {
            userName: authenticationService.externalAuthData.userName,
            provider: authenticationService.externalAuthData.provider,
            externalAccessToken: authenticationService.externalAuthData.externalAccessToken
        };

        $scope.signUp = function () {

            authenticationService.saveRegistration($scope.registrationData).then(function (response) {
                console.log("User registered successfully");
                startTimer();
            },
            function (response) {
                var errors = [];
                for (var key in response.data.modelState) {
                    for (var i = 0; i < response.data.modelState[key].length; i++) {
                        errors.push(response.data.modelState[key][i]);
                    }
                }
                $scope.message = "Failed to register user due to: " + errors.join(' ');
                console.log($scope.message);
            });
        };

        $scope.login = function () {

            authenticationService.login($scope.loginData).then(function (data) {
                console.log(data);
                $location.path('/members');
            },
            function (err) {
                $scope.message = err.error_description;
            });
        };

        $scope.authExternalProvider = function (provider) {
            console.log("external auth provider");
            var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

            var externalProviderUrl = arsVivAuthSettings.apiServiceBase + "api/Account/ExternalLogin?provider=" + provider
                                                                        + "&response_type=token&client_id=" + arsVivAuthSettings.clientId
                                                                        + "&redirect_uri=" + redirectUri;
            window.$windowScope = $scope;

            var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
        };

        $scope.authCompletedCB = function (fragment) {

            console.log("fragment", fragment);
            $timeout(function () {
                console.log("apply function");
                if (fragment.haslocalaccount == 'False') {
                    authenticationService.logout();

                    authenticationService.externalAuthData = {
                        provider: fragment.provider,
                        userName: fragment.external_user_name,
                        externalAccessToken: fragment.external_access_token,
                        email: fragment.external_email
                    };
                    console.log(authenticationService.externalAuthData);
                    $location.path('/associate');

                }
                else {
                    //Obtain access token and redirect to orders
                    var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                    authenticationService.obtainAccessToken(externalData).then(function (response) {
                        console.log('bude li ovdje');
                        $location.path('/home');

                    },
                 function (err) {
                     $scope.message = err.error_description;
                     console.log($scope.message);
                 });
                }

            });
        };

        $scope.registerExternal = function () {

            authenticationService.registerExternal($scope.registerData).then(function (response) {
                $scope.message = "User has been registered successfully";
            },
            function (response) {
                var errors = [];
                for (var key in response.modelState) {
                    errors.push(response.modelState[key]);
                }
                $scope.message = "Failed to register user due to:" + errors.join(' ');
            });
            console.log($scope.message);
        };

        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/login');
            }, 2000);
        };

        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            //dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        /*function disabled(data) {
            var date = data.date,
              mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }*/

        $scope.toggleMin = function () {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function (year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
          {
              date: tomorrow,
              status: 'full'
          },
          {
              date: afterTomorrow,
              status: 'partially'
          }
        ];

        function getDayClass(data) {
            var date = data.date,
              mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
    }]);
}());