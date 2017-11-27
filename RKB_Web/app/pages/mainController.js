(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("mainController", ['$rootScope', '$scope', 'authenticationService','dataService', '$location','$sce', 'jwtHelper', function ($rootScope, $scope, authenticationService,dataService, $location,$sce, jwtHelper) {

        buildMenu();
        //authenticationService.refreshToken();

        $scope.greenMenu = {};
        $scope.greenMenu.login = 'prijava';
        $scope.greenMenu.register = 'postani-clan';

        //PAGE TITLE
        $scope.listStatic = function () {
            $scope.staticLoading = true;
            dataService.list("missions", function (res) {
                if (res.status === 200) {
                    $scope.staticInfo = res.data;
                    $scope.staticInfo.forEach(function (el, index, array) {
                        if (el.title === "Naziv Stranice") {
                            $scope.pageTitle = el;
                            $scope.pageTitle.body = $sce.trustAsHtml($scope.pageTitle.body);
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
                { link: "#!/gallery", text: "Galerija", id: null }
                //{ link: "#!/members", text: "Članovi" }
                //{ link: "#!/adminPanel", text: "Admin Panel" }
            ];
            $rootScope.userItems = [
                { link: "#!/about", text: "O Nama" },
                { link: "", text: "Aktuelno", id: "upcoming-link" },
                { link: "#!/events", text: "Događaji" },
                { link: "#!/gallery", text: "Galerija", id: null },
                { link: "", text: "Kontakt", id: "contact-link" }
            ];
            $rootScope.adminSpecific = [
                { link: "#!/interests", text: "Interesi" },
                { link: "#!/members", text: "Korisnici" },
                { link: "#!/sponsors", text: "Sponzori" },
                { link: "#!/partners", text: "Partneri" },
                { link: "#!/services", text: "Usluge" },
                { link: "#!/discounts", text: "Boniteti" },
                { link: "#!/static", text: "Statično" }
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
            //authenticationService.refreshToken();
            $rootScope.changeMenu();
        };
        var personalAuthData = authenticationService.getAuthData();
        console.log("personalAuthData", personalAuthData);
        //var tokenExpired = jwtHelper.isTokenExpired(personalAuthData.token);
        //if (tokenExpired) {
        //    $scope.logOut();
        //}


        console.log('authentication.mainctrl:', $rootScope.authentication);
    }]);
}());