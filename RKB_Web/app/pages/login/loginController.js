(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("loginController", [
                 '$scope', '$rootScope', '$location', '$timeout', 'authenticationService', 'arsVivAuthSettings', 'dataService', '$http', '$routeParams', '$route','localStorageService',
        function ($scope,   $rootScope,   $location,   $timeout,   authenticationService,   arsVivAuthSettings,   dataService,   $http,   $routeParams,   $route,  localStorageService) {

        $scope.loadSubCategories = function () {
            $http({
                method: 'get', url: "http://localhost:57792/api/subcategories/2"
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

        $scope.initRegistrationData = function () {
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
                gender: "Zensko",
                employment: "Zaposlen",
                subCategoriesList: $scope.selected
            };
        };
        $scope.initRegistrationData();

        $scope.loginData = {
            userName: "",
            password: ""
        };
        var userRole = "";
        /*DELETE this ASAP*/
        //$scope.loginMOCKUP = function () {
        //    $rootScope.changeMenuAdmin();
        //    $location.path('/home');
        //    currentUser.id = 1;
        //}

        $scope.initRegistrationExternalData = function () {
            $scope.registerExternalData = {
                userName: "",
                firstName: "",
                lastName: "",
                email: "",
                dateOfBirth: "",
                address: "",
                phoneNumber: "",
                gender: "Musko",
                employment: "Zaposlen",
                subCategoriesList: $scope.selected,
                provider: authenticationService.externalAuthData.provider,
                externalAccessToken: authenticationService.externalAuthData.externalAccessToken
            };
        };
        $scope.initRegistrationExternalData();

        $scope.resetRegistration=function(){
            $scope.initRegistrationData();
            if ($location.path() === '/login/postani-clan')
                $route.reload();
            else
                $location.path('/login/postani-clan')
        };
        $scope.resetExternalRegistration = function () {
            $scope.initRegistrationExternalData();
            if ($location.path() === '/externalLogin/postani-clan')
                $route.reload();
            else
                $location.path('/externalLogin/postani-clan')
        };

        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/login/prijava');
            }, 2000);
        };
        $scope.signUp = function () {
            $scope.registrationData.subCategoriesList = $scope.selected;
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

        var getUserRole = function () {
            var authData = localStorageService.get('authorizationData');
            $http({
                method: 'get', url: "http://localhost:57792/api/userroles", headers: {'Authorization': 'Bearer ' + authData.token}
            }).then(function successCallback(response) {
                userRole = response.data;
            }, function errorCallback(response) {
                console.log("Something went wrong");
            });
        };
        

        $scope.login = function () {

            authenticationService.login($scope.loginData).then(function (data) {
                console.log(data);
                $rootScope.changeMenuUser();
                $location.path('/home');
                getUserRole();
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
                    $location.path('/externalLogin/postani-clan-1');

                }
                else {
                    //Obtain access token and redirect to orders
                    var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                    authenticationService.obtainAccessToken(externalData).then(function (response) {
                        console.log('bude li ovdje');
                        $rootScope.changeMenuUser();
                        getUserRole();
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
            $scope.registerExternalData.subCategoriesList = $scope.selected;
            authenticationService.registerExternal($scope.registerExternalData).then(function (response) {
                $scope.message = "User has been registered successfully";
                $rootScope.changeMenuUser();
                getUserRole();
                $location.path('/home');
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


            
        
            /*CALENDAR*/
        $scope.today = function () {
            $scope.registrationData.dateOfBirth = new Date();
            $scope.registerExternalData.dateOfBirth = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.registrationData.dateOfBirth = null;
            $scope.registerExternalData.dateOfBirth = null;
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
        };

        $scope.goToLogin = function () {
            $location.path('/login/prijava')
        };
        $scope.goToReg = function () {
            $location.path('/login/postani-clan')
        };
        $scope.goToExtReg = function () {
            $location.path('/externalLogin/postani-clan')
        };
        /*JQUERY FOR TABS*/
        var activeTab = $routeParams.tab;
        $(document).ready(function () {
            if (activeTab === 'prijava') {
                $(".nav-tabs li:first").removeClass("active");
                $(".nav-tabs li:last").addClass("active");
            }

            if (activeTab === 'prijava' || activeTab === 'postani-clan' || activeTab === 'postani-clan-1') {
                $(".tab-pane").removeClass("active in");
                $("#" + activeTab).addClass("active in");
            }
        });


    }]);
}());