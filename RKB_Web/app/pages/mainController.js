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
                        $rootScope.menuItems.push({ link: "/home", text: "Početna" });
                        $rootScope.menuItems.push({ link: "/home#upcoming", text: "Aktuelno" });
                        //$rootScope.menuItems.push({ link: "/blog", text: "Blog" });
                        $rootScope.menuItems.push({ link: "/events", text: "Događaji" });
                        $rootScope.menuItems.push({ link: "/home#contact", text: "Kontakt" });
                    }
                };

                $rootScope.changeMenuAdmin = function() {
                    $rootScope.menuItems = [];
                    $rootScope.menuItems.push({ link: "/home", text: "Početna" });
                    $rootScope.menuItems.push({ link: "/home", text: "Aktuelno" });
                    //$rootScope.menuItems.push({ link: "/blog", text: "Blog" });
                    $rootScope.menuItems.push({ link: "/events", text: "Događaji" });
                    $rootScope.menuItems.push({ link: "/members", text: "Članovi" });
                    $rootScope.menuItems.push({ link: "/profile", text: "Profil" });

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