(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("loginController", [
                 '$rootScope', '$scope', '$location', '$timeout', 'authenticationService', 'arsVivAuthSettings', 'dataService', '$http', '$routeParams', '$route','localStorageService',
        function ($rootScope,   $scope, $location, $timeout, authenticationService, arsVivAuthSettings, dataService, $http, $routeParams, $route, localStorageService) {

            $scope.isLoading = function () {
                if ($scope.categoriesLoading === true ||
                    $scope.subCategoriesLoading === true)
                    return true;
                else
                    return false;
            };

            $scope.getCategories = function () {
                $scope.categoriesLoading = true;
                dataService.list("characteristiccategories", function (response) {
                    if (response.status === 200) {
                        $scope.interestCategories = response.data;
                        $scope.categoriesLoading = false;
                        console.log("get categories");
                    }
                    else {
                        console.log("ERROR: ", response);
                    }
                });
            };

            $scope.getAllInterests = function () {
                $scope.subCategoriesLoading = true;
                dataService.list("Characteristicsubcategories", function (response) {
                    if (response.status === 200) {
                        $scope.subCategories = response.data;
                        $scope.subCategoriesLoading = false;
                        console.log("ALL INTERESTS");
                        console.log($scope.allInterests);
                    }
                    else {
                        console.log("ERROR: ", response);
                    }
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
                gender: "",
                employment: "",
                subCategoriesList: $scope.selected
            };
        };
        $scope.initRegistrationData();

        $scope.loginData = {
            userName: "",
            password: ""
        };
        $rootScope.userRole = "";
        /*DELETE this ASAP*/
        //$scope.loginMOCKUP = function () {
        //    $rootScope.changeMenuAdmin();
        //    $location.path('/home');
        //    currentUser.id = 1;
        //}

        $scope.initRegistrationExternalData = function () {
            $scope.registerExternalData = {
                userName: authenticationService.externalAuthData.email,
                firstName: authenticationService.externalAuthData.userName.substr(0, authenticationService.externalAuthData.userName.indexOf(' ')),
                lastName: authenticationService.externalAuthData.userName.substr(authenticationService.externalAuthData.userName.indexOf(' ')+1),
                email: authenticationService.externalAuthData.email,
                dateOfBirth: "",
                address: "",
                phoneNumber: "",
                gender: "",
                employment: "",
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
            var exitFunction = false;
            if ($scope.registrationData.userName.trim() === "" ||
                $scope.registrationData.password.trim() === "" ||
                $scope.registrationData.confirmPassword.trim() === "" ||
                $scope.registrationData.firstName.trim() ==="" ||
                $scope.registrationData.lastName.trim() ==="" ||
                $scope.registrationData.email.trim() ==="" ||
                $scope.registrationData.address.trim() ==="" ||
                $scope.registrationData.phoneNumber.trim() === "" ||
                $scope.registrationData.gender.trim() ==="" ||
                $scope.registrationData.employment.trim() ==="")
            {
                toastr.warning("Jedno ili više polja je prazno");
                exitFunction = true;
            }
            if ($scope.selected === [] || $scope.selected.length < $scope.interestCategories.length) {
                toastr.warning("Unesite sve karakteristike");
                exitFunction = true;
            }
            if (exitFunction) return;
            $scope.registrationData.subCategoriesList = $scope.selected;
            authenticationService.saveRegistration($scope.registrationData).then(function (response) {
                toastr.success("Registracija uspješna!");
                //console.log("User registered successfully");
                startTimer();
            },
            function (response) {
                var errors = [];
                for (var key in response.data.modelState) {
                    for (var i = 0; i < response.data.modelState[key].length; i++) {
                        errors.push(response.data.modelState[key][i]);
                    }
                }
                toastr.error("Registracija neuspješna");
                $scope.message = "Failed to register user due to: " + errors.join(' ');
                console.log($scope.message);
            });
        };

        var getUserRole = function () {
            var authData = localStorageService.get('authorizationData');
            $http({
                method: 'get', url: 'http://localhost:57792/' + 'api/userroles', headers: { 'Authorization': 'Bearer ' + authData.token }
            }).then(function successCallback(response) {
                $rootScope.userRole = response.data.userRole;
                authenticationService.authentication.userFirstName = response.data.userFirstName;
                toastr.success("Prijava uspješna!");
                $rootScope.changeMenu();
            }, function errorCallback(response) {
                toastr.error("Prijava neuspješna");
                console.log("Something went wrong");
            });
        };
        

        $scope.login = function () {

            authenticationService.login($scope.loginData).then(function (data) {
                console.log("login ctrl data", data);
                getUserRole();
                $location.path('/home');
            },
            function (data) {
                toastr.error("Prijava neuspješna");
                $scope.message = data.error_description;
                console.log($scope.message);
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

            //console.log("fragment", fragment);
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
                    console.log('fragment', fragment.external_email);
                    $location.path('/externalLogin/postani-clan-1');
                    //$scope.registerExternalData.userName = authenticationService.externalAuthData.email;
                    $scope.initRegistrationExternalData();

                }
                else {
                    //Obtain access token and redirect to orders
                    var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                    authenticationService.obtainAccessToken(externalData).then(function (response) {
                        console.log('bude li ovdje');
                        $rootScope.changeMenu();
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
            var exitFunction = false;
            if ($scope.registrationData.firstName.trim() === "" ||
                $scope.registrationData.lastName.trim() === "" ||
                $scope.registrationData.email.trim() === "" ||
                $scope.registrationData.address.trim() === "" ||
                $scope.registrationData.phoneNumber.trim() === "" ||
                $scope.registrationData.gender.trim() === "" ||
                $scope.registrationData.employment.trim() === "") {
                toastr.warning("Jedno ili više polja je prazno");
                exitFunction = true;
            }
            if ($scope.selected.length < $scope.interestCategories.length) {
                toastr.warning("Unesite sve karakteristike");
                exitFunction = true;
            }
            if (exitFunction) return;

            $scope.registerExternalData.subCategoriesList = $scope.selected;
            authenticationService.registerExternal($scope.registerExternalData).then(function (response) {
                toastr.success("Registracija uspješna!");
                //$scope.message = "User has been registered successfully";
                getUserRole();
                $rootScope.changeMenu();
                $location.path('/home');
            },
            function (response) {
                var errors = [];
                for (var key in response.modelState) {
                    errors.push(response.modelState[key]);
                }
                toastr.error("Registracija neuspješna");
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

        $scope.getCategories();
        $scope.getAllInterests();
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