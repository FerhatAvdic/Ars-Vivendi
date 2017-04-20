(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("mainController", ['$rootScope', function ($rootScope) {

                buildMenu();

                function buildMenu() {
                    $rootScope.menuItems = []; // WHOLE MENU TO ALL
                    $rootScope.adminItems = []; // ADMIN SUBECTION
                    $rootScope.profileItems = []; //PROFILE SUBSECTION
                    //USER MENU
                    if (currentUser.id == 0)
                    {
                        $rootScope.menuItems.push({ link: "#!/about", text: "O Nama", id: null});
                        $rootScope.menuItems.push({ link: "", text: "Aktuelno", id: "upcoming-link" });
                        //$rootScope.menuItems.push({ link: "/blog", text: "Blog" });
                        $rootScope.menuItems.push({ link: "#!/events", text: "Događaji", id: null});
                        $rootScope.menuItems.push({ link: "", text: "Kontakt", id: "contact-link" });
                    }
                };

                $rootScope.changeMenuAdmin = function() {
                    $rootScope.menuItems = [];
                    $rootScope.menuItems.push({ link: "#!/about", text: "O Nama" });
                    //$rootScope.menuItems.push({ link: "", text: "Aktuelno", id: "upcoming-link" });
                    //$rootScope.menuItems.push({ link: "/blog", text: "Blog" });
                    $rootScope.menuItems.push({ link: "#!/events", text: "Događaji" });
                    $rootScope.menuItems.push({ link: "#!/members", text: "Članovi" });
                    $rootScope.menuItems.push({ link: "#!/profile", text: "Profil" });

                }

                /*$rootScope.$on('userLoggedIn', function () {
                    buildMenu();
                    $rootScope.permissions = {
                        showAdmin: currentUser.systemRoles.indexOf("Admin") > -1,
                        showHR: currentUser.systemRoles.indexOf("HR Manager") > -1 ||
                            currentUser.systemRoles.indexOf("HR Generalist") > -1
                    };
                });*/
    }]);
}());