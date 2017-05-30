(function () {
    'use strict';

    var avApp = angular.module("avApp");

    avApp.controller("mainController", ['$rootScope', 'authenticationService', function ($rootScope, authenticationService) {

                buildMenu();

                function buildMenu() {
                    $rootScope.menuItems = []; // WHOLE MENU TO ALL
                    $rootScope.noUserItems = [];
                    $rootScope.adminItems = []; // ADMIN SUBECTION
                    $rootScope.userItems = []; //PROFILE SUBSECTION

                        $rootScope.menuItems.push({ link: "#!/about", text: "O Nama", id: null});
                        $rootScope.menuItems.push({ link: "", text: "Aktuelno", id: "upcoming-link" });
                        $rootScope.menuItems.push({ link: "#!/events", text: "Događaji", id: null });
                        $rootScope.menuItems.push({ link: "#!/gallery", text: "Galerija", id: null });
                        $rootScope.menuItems.push({ link: "", text: "Kontakt", id: "contact-link" });

                        $rootScope.noUserItems.push({ link: "#!/about", text: "O Nama", id: null});
                        $rootScope.noUserItems.push({ link: "", text: "Aktuelno", id: "upcoming-link" });
                        $rootScope.noUserItems.push({ link: "#!/events", text: "Događaji", id: null });
                        $rootScope.noUserItems.push({ link: "#!/gallery", text: "Galerija", id: null });
                        $rootScope.noUserItems.push({ link: "", text: "Kontakt", id: "contact-link" });

                        $rootScope.adminItems.push({ link: "#!/about", text: "O Nama" });
                        $rootScope.adminItems.push({ link: "#!/events", text: "Događaji" });
                        $rootScope.adminItems.push({ link: "#!/gallery", text: "Galerija", id: null });
                        $rootScope.adminItems.push({ link: "#!/members", text: "Članovi" });
                        $rootScope.adminItems.push({ link: "#!/profile", text: "Profil" });
                    
                        $rootScope.userItems.push({ link: "#!/about", text: "O Nama" });
                        $rootScope.userItems.push({ link: "", text: "Aktuelno", id: "upcoming-link" });
                        $rootScope.userItems.push({ link: "#!/events", text: "Događaji" });
                        $rootScope.userItems.push({ link: "#!/gallery", text: "Galerija", id: null });
                        $rootScope.userItems.push({ link: "", text: "Kontakt", id: "contact-link" });
                };


                $rootScope.changeMenu = function () {
                    $rootScope.menuItems = [];
                    if ($rootScope.userRole === "CustomUser")
                    {
                        $rootScope.menuItems = $rootScope.userItems;
                        $rootScope.menuItems.push({ link: "#!/profile/"+authenticationService.authentication.userName, text: "Profil" });
                    }
                    else if ($rootScope.userRole === "Admin")
                        $rootScope.menuItems = $rootScope.adminItems;
                    else
                        $rootScope.menuItems = $rootScope.noUserItems;
                };

    }]);
}());