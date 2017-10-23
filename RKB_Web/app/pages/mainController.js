(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("mainController", ['$rootScope', '$scope','authenticationService','$location', function ($rootScope, $scope, authenticationService, $location) {

        buildMenu();

        $scope.greenMenu = {};
        $scope.greenMenu.login = 'prijava';
        $scope.greenMenu.register = 'postani-clan';

                function buildMenu() {
                    $rootScope.menuItems = [
                        { link: "#!/about", text: "O Nama", id: null },
                        { link: "", text: "Aktuelno", id: "upcoming-link" },
                        { link: "#!/events", text: "Događaji", id: null },
                        { link: "#!/gallery", text: "Galerija", id: null },
                        { link: "", text: "Kontakt", id: "contact-link" }
                    ]; 
                    $rootScope.noUserItems = [
                        { link: "#!/about", text: "O Nama", id: null },
                        { link: "", text: "Aktuelno", id: "upcoming-link" },
                        { link: "#!/events", text: "Događaji", id: null },
                        { link: "#!/gallery", text: "Galerija", id: null },
                        { link: "", text: "Kontakt", id: "contact-link" }
                    ];
                    $rootScope.adminItems = [
                        { link: "#!/about", text: "O Nama" },
                        { link: "#!/events", text: "Događaji" },
                        { link: "#!/gallery", text: "Galerija", id: null },
                        { link: "#!/members", text: "Članovi" },
                        { link: "#!/adminPanel", text: "Admin Panel" }
                    ];
                    $rootScope.userItems = [
                        { link: "#!/about", text: "O Nama" },
                        { link: "", text: "Aktuelno", id: "upcoming-link" },
                        { link: "#!/events", text: "Događaji" },
                        { link: "#!/gallery", text: "Galerija", id: null },
                        { link: "", text: "Kontakt", id: "contact-link" }
                    ];
                };


                $rootScope.changeMenu = function () {
                    buildMenu();
                    if ($rootScope.userRole === "CustomUser")
                    {
                        $rootScope.menuItems = $rootScope.userItems;
                        $rootScope.menuItems.push({ link: "#!/profile/"+authenticationService.authentication.userName, text: "Profil" });
                    }
                    else if ($rootScope.userRole === "Admin")
                    {
                        $rootScope.menuItems = $rootScope.adminItems;
                        $rootScope.menuItems.push({ link: "#!/profile/"+authenticationService.authentication.userName, text: "Profil" });
                    }
                    else
                        $rootScope.menuItems = $rootScope.noUserItems;
                };


                if (authenticationService.authentication)
                    $rootScope.authentication = authenticationService.authentication;

                $scope.logOut = function () {
                    authenticationService.logout();
                    toastr.info("Odjavljeni ste");
                    $rootScope.changeMenu();
                    $location.path('/home');
                };

                //window.onunload = function () {
                //    authenticationService.logout();
                //    toastr.info("Odjavljeni ste");
                //}

                window.onload = function () {
                    $rootScope.changeMenu();
                };

                console.log('authentication.mainctrl:', $rootScope.authentication);
    }]);
}());