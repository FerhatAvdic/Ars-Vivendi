(function () {
    'use strict';

    var avApp = angular.module("avApp");
    avApp.controller("membersController", ['$rootScope','$scope','$sce', '$filter','$location', 'dataService', 'authenticationService', function ($rootScope, $scope,$sce, $filter,$location, dataService, authenticationService) {
        $scope.dateOfBirth = dataService.dates;
        $scope.countries = dataService.countries;
        $scope.selected = [];
        $scope.phoneRegex = /\+(385|386|387|381)\d{8,}/;
        $scope.filterModel = {
            "properties": [{ name: "group", value: null }, {name:"event",value:null}],
            "firstName": null,
            "lastName": null,
            "address": null,
            "email": null,
            "phone": null,
            "byDebt":null
        };

        $scope.resetFilters = function () {
            $scope.filterModel.properties = [];
            $scope.selected = [];
            $scope.filterByUpcomingEvent = {
                "name": "event",
                "value": null
            };
            $scope.filterByPastEvent = {
                "name": "event",
                "value": null
            };
            $scope.subCategories.forEach(function (c) {
                c.checked = false;
            });
            $scope.filterModel = {
                "properties": [{ name: "group", value: null }, { name: "event", value: null }],
                "firstName": null,
                "lastName": null,
                "address": null,
                "email": null,
                "phone": null,
                "byDebt": null
            };
        };

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
        var dayError = false;
        var validateDate = function () {
            var day = parseInt($scope.dateOfBirth.day);
            var month = parseInt($scope.dateOfBirth.month);
            var year = parseInt($scope.dateOfBirth.year);

            if (month === 4 || month === 6 || month === 9 || month === 11)
                if (day > 30) dayError = true;
            if (month === 2 && year % 4 === 0)
                if (day > 29) dayError = true;
            if (month === 2 && year % 4 > 0)
                if (day > 28) dayError = true;
        };
        $scope.filterActive = false;
        $scope.toggleFilterBar = function () {
            $scope.filterActive = !$scope.filterActive;
        };
        var authenticateAdmin = function (){
            if ($rootScope.userRole === "Admin") return;
            else {
                console.log("No permission");
                $location.path('/home');
            }
        };
        $scope.selectedEventID = null;
        $scope.emailContent = "";
        $scope.emailSubject = "";
        $scope.newMember = {
            "firstName": "",
            "lastName": "",
            "address": "",
            "dateOfBirth": "",
            "gender": "",
            "employment": "",
            "email": "",
            "phoneNumber": "",
            "userName": "",
            "roleName":"applicationUser"
        };

        $scope.initNewUserList = function () {
            $scope.newUserList = {
                "id": 0,
                "userIds": [],
                "groupId": null
            };
            $scope.members.forEach(function (member, index, array) {
                member.checked = undefined;
            });
        };

        $scope.initNewGroup = function () {
            $scope.newGroup = {
                "id": 0,
                "groupName": null,
                "eventId": null
            };
        };
        $scope.startNewGroup = function () {
            $scope.initNewGroup();
            $scope.newGroupActive = true;
            $scope.showCheckboxes = true;
            $scope.initNewUserList();
            $scope.selectedUsers = [];
            $scope.toggleListCheckboxes.checked = false;
        };
        $scope.cancelNewGroup = function () {
            $scope.initNewGroup();
            $scope.newGroupActive = false;
            $scope.showCheckboxes = false;
            $scope.selectedUsers = [];
            $scope.toggleListCheckboxes.checked = false;
        };
        
        $scope.selectedUsers = [];
        $scope.updateSelected = function (user) {
            if (user.checked) {
                $scope.selectedUsers.push(user);
            } else {
                if ($scope.newGroupActive) {
                    var toDel = $scope.selectedUsers.indexOf(user);
                }
                if ($scope.groupManagementActive) {
                    var toDel = $scope.selectedUsers.findIndex(function (member) { return (member.firstName === user.firstName && member.lastName === user.lastName) });
                }
                $scope.selectedUsers.splice(toDel, 1);
            }
            console.log("list of selected", $scope.selectedUsers);
        };
        $scope.removeFromSelectedUsers = function (user) {
            var toDel = $scope.selectedUsers.indexOf(user);
            $scope.selectedUsers.splice(toDel, 1);
            if($scope.newGroupActive)
                var toUncheck = $scope.members.findIndex(function (member) { return member.id === user.id });
            if ($scope.groupManagementActive)
                var toUncheck = $scope.members.findIndex(function (member) { return (member.firstName === user.firstName && member.lastName === user.lastName) });
            if(toUncheck!==-1)
                $scope.members[toUncheck].checked = false;
        };
        $scope.toggleListCheckboxes = { checked: false };
        $scope.toggleAllFromList = function (c) {
            console.log(c.checked);
            if (c.checked) {
                $scope.members.forEach(function (m) {
                    if ($scope.newGroupActive)
                        var toAdd = $scope.selectedUsers.findIndex(function (u) { return m.id === u.id });
                    if ($scope.groupManagementActive)
                        var toAdd = $scope.selectedUsers.findIndex(function (u) { return (m.firstName === u.firstName && m.lastName === u.lastName) });
                    if (toAdd === -1)
                    {
                        $scope.selectedUsers.push(m);
                        m.checked = true;
                    }
                        
                });
            } else {
                $scope.members.forEach(function (m) {
                    if ($scope.newGroupActive)
                        var toRemove = $scope.selectedUsers.findIndex(function (u) { return m.id === u.id });
                    if ($scope.groupManagementActive)
                        var toRemove = $scope.selectedUsers.findIndex(function (u) { return (m.firstName === u.firstName && m.lastName === u.lastName) });
                    if (toRemove !== -1)
                    {
                        $scope.selectedUsers.splice(toRemove, 1);
                        m.checked = false;
                    }
                        
                });
            }
        };


        $scope.createGroup = function (form) {
            if (form.$invalid) {
                console.log('forma', form);
                toastr.error("Imate grešku pri unosu");
                return;
            }
            dataService.create("usereventgroups", $scope.newGroup, function (response) {
                if (response.status === 200) {
                    toastr.success("Grupa napravljena!");
                    var selectedUsers = $scope.selectedUsers;
                    var newGroupName = $scope.newGroup.groupName;
                    //Backend doesnt return group id so we need to get it from list
                    dataService.list("usereventgroups", function (response) {
                        if (response.status === 200) {
                            $scope.allGroups = response.data;
                            console.log("kreirana grupa unutar allgroups", newGroupName);
                            var newlyCreatedGroup = $scope.allGroups.find(function (group) {return group.groupName === newGroupName });
                            $scope.newUserList.groupId = newlyCreatedGroup.id;
                            selectedUsers.forEach(function (selected) {
                                addMember(selected.userName);
                            });
                            if ($scope.errorAddingMember)
                                toastr.error("Greška prilikom dodavanja člana");
                            if (!$scope.errorAddingMember || !$scope.errorRemovingMember) {
                                toastr.success("Uspješno ažurirani članovi!");
                            }
                        }
                        else {
                            console.log("ERROR: ", response);
                            toastr.error("Greška prilikom pribavljanja grupa");
                        }
                    });
                    //toastr.success("Grupa napravljena!");
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom pravljenja grupe");
                }
                form.$setPristine();
                form.$setUntouched();
                $scope.cancelNewGroup();
            });
        };
        

        var removeMember = function (userID) {
            dataService.remove("usergroups", userID, function (response) {
                if (response.status === 200) {
                    console.log("Deleted");
                }
                else {
                    $scope.errorRemovingMember = true;
                    toastr.error("Greška prilikom brisanja člana");
                    console.log("ERROR: ", response);
                }
            });
        };
        var addMember = function (userID) {
            var model = {
                "id": 0,
                "userIds": [userID],
                "groupId": $scope.newUserList.groupId
            };
            dataService.create("usergroups", model, function (response) {
                if (response.status === 200) {
                    console.log("Created");
                }
                else {
                    $scope.errorAddingMember = true;
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom dodavanja člana");
                }
            });
        };

        $scope.fillCreatedGroup = function () {
            if ($scope.newUserList.groupId === null) {
                toastr.error("Odaberite grupu");
                return;
            }
            $scope.selectedUsers.forEach(function (selected) {
                addMember(selected.userName);
            });
            if ($scope.errorAddingMember)
                toastr.error("Greška prilikom dodavanja člana");
            if (!$scope.errorAddingMember || !$scope.errorRemovingMember) {
                toastr.success("Uspješno ažurirani članovi!");
            }
        };

        $scope.updateEditingGroup = function (form) {
            //if (form.$invalid) {
            //    console.log('forma', form);
            //    toastr.error("Imate grešku pri unosu");
            //    return;
            //}
            if ($scope.newUserList.groupId === null) {
                toastr.error("Odaberite grupu");
                return;
            }
            //Remove all users from group that are not in selectedUsers list
            $scope.newUserList.userIds.forEach(function (groupUser) {
                var index = $scope.selectedUsers.findIndex(function (selectedUser) {
                    return selectedUser.firstName === groupUser.firstName &&
                            selectedUser.lastName === groupUser.lastName
                });
                if (index === -1) removeMember(groupUser.id);
            });
            //Add all users to group that are newely selected
            $scope.selectedUsers.forEach(function (selectedUser) {
                var index = $scope.newUserList.userIds.findIndex(function (groupUser) {
                    return selectedUser.firstName === groupUser.firstName &&
                            selectedUser.lastName === groupUser.lastName
                });
                if (index === -1) addMember(selectedUser.userName);
            });
            if ($scope.errorAddingMember)
                toastr.error("Greška prilikom dodavanja člana");
            if ($scope.errorRemovingMember)
                toastr.error("Greška prilikom brisanja člana");
            if (!$scope.errorAddingMember || !$scope.errorRemovingMember) {
                toastr.success("Uspješno ažurirani članovi!");
            }
            $scope.initNewUserList();
            $scope.toggleListCheckboxes.checked = false;
        };

        $scope.listGroups = function () {
            dataService.list("usereventgroups", function (response) {
                if (response.status === 200) {
                    $scope.allGroups = response.data;
                    console.log("grupe", $scope.allGroups);
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom pribavljanja grupa");
                }
            });
        };
        $scope.listGroups();

        $scope.listGroupUsers = function (groupId) {
            if (groupId)
                dataService.read("usergroups", groupId, function (response) {
                    if (response.status === 200) {
                        $scope.newUserList.userIds = response.data;
                        console.log("Group users", $scope.newUserList);

                        $scope.members.forEach(function (member) {
                            member.checked = false;
                        });
                        $scope.members.forEach(function (member) {
                            $scope.newUserList.userIds.forEach(function (selectedUser) {
                                if (member.firstName === selectedUser.firstName && member.lastName === selectedUser.lastName)
                                    member.checked = true;
                            });
                        });
                        $scope.selectedUsers = [];
                        $scope.newUserList.userIds.forEach(function (user) {
                            $scope.selectedUsers.push(user);
                        });
                    }
                    else {
                        console.log("ERROR: ", response);
                        toastr.error("Greška prilikom pribavljanja članova grupe");
                    }
                });
            else
            {
                $scope.selectedUsers = [];
                $scope.initNewUserList();
                $scope.toggleListCheckboxes.checked = false;
            }
        };

        $scope.groupManagementActive = false;
        $scope.startGroupManagement = function () {
            $scope.groupManagementActive = true;
            $scope.showCheckboxes = true;
            $scope.initNewUserList();
            $scope.selectedUsers = [];
            $scope.toggleListCheckboxes.checked = false;
        };
        $scope.cancelGroupManagement = function () {
            $scope.groupManagementActive = false;
            $scope.showCheckboxes = false;
            $scope.initNewUserList();
            $scope.selectedUsers = [];
            $scope.toggleListCheckboxes.checked = false;
        };

        $scope.setDeletingGroup = function (groupId) {
            $scope.deletingGroupId = groupId;
        }
        $scope.cancelDeleteGroup = function () {
            $scope.deletingGroupId = null;
        };

        $scope.deleteGroup = function () {
            dataService.remove("usereventgroups", $scope.deletingGroupId, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno obrisana grupa!");
                }
                else {
                    toastr.error("Greška prilikom brisanja grupe");
                    console.log("ERROR: ", response);
                }
                $scope.listGroups();
                $scope.initNewUserList();
            });
            $scope.toggleListCheckboxes.checked = false;
        };

        /*SET FOR HTTP*/
        $scope.editingMember = null;
        $scope.setEditMember = function (userName) {
            console.log(userName);
            //dataService.read("users", "?username=" + userName, function (response) {
            dataService.read("users",  userName, function (response) {
                if (response.status === 200) {
                    $scope.editingMember = response.data;
                }
                else {
                    console.log("ERROR: ", response);
                }
            });
        };
        $scope.cancelEdit = function (form) {
            $scope.editingMember = null;
            form.$setPristine();
            form.$setUntouched();
        };
        $scope.deletingMember = null;
        $scope.setDeleteMember = function (userName) {
            dataService.read("users", "?username=" + userName, function (response) {
                if (response.status === 200) {
                    $scope.deletingMember = response.data;
                }
                else {
                    console.log("ERROR: ", response);
                }
            });
        }
        $scope.cancelDelete = function () {
            $scope.deletingMember = null;
        }

        /*HTTP*/
        $scope.listMembers = function () {
            $scope.membersLoading = true;
            dataService.list("users", function (response) {
                if (response.status===200) {
                    $scope.members = response.data;
                    $scope.membersTotal = response.data.length;
                    $scope.membersLoading = false;
                    console.log("Members;");
                    console.log($scope.members);
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom pribavljanja korisnika");
                }
            });
        };
        $scope.createMember = function () {
            //begin validation
            var exitFunction = false;
            //date validation
            dayError = false;
            validateDate();
            if (dayError) {
                toastr.warning("Unesen je pogrešan datum");
                exitFunction = true;
            }
            else {
                var selectedDate = $scope.dateOfBirth.day + "-" + $scope.dateOfBirth.month + "-" + $scope.dateOfBirth.year;
                $scope.newMember.dateOfBirth = new Date(selectedDate);
            }
            //phone validation
            if (!/^[0-9]+$/.test($scope.newMember.phoneNumber)) {
                toastr.warning("Broj telefona smije imati samo cifre");
                exitFunction = true;
            }
            else {
                $scope.newMember.phoneNumber = $scope.selectedCountry.number + $scope.newMember.phoneNumber;
            }
            //empty space validation
            if ($scope.newMember.userName.trim() === "" ||
                $scope.newMember.password.trim() === "" ||
                $scope.newMember.confirmPassword.trim() === "" ||
                $scope.newMember.firstName.trim() === "" ||
                $scope.newMember.lastName.trim() === "" ||
                $scope.newMember.email.trim() === "" ||
                $scope.newMember.address.trim() === "" ||
                $scope.newMember.city.trim() === "" ||
                $scope.newMember.phoneNumber.trim() === "" ||
                $scope.newMember.gender.trim() === "" ||
                $scope.newMember.employment.trim() === "" ||
                $scope.newMember.healthStatus.trim() === "") {
                toastr.warning("Jedno ili više polja je prazno");
                exitFunction = true;
            }
            //characteristics validation
            if ($scope.selected === [] || $scope.selected.length < $scope.interestCategories.length) {
                toastr.warning("Unesite sve karakteristike");
                exitFunction = true;
            }
            if (exitFunction) return;
            //end of validation
            $scope.newMember.subCategoriesList = $scope.selected;
            dataService.create("users", $scope.newMember, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno napravljen novi korisnik!");
                    //console.log("MEMBER ADDED");
                }
                else {
                    toastr.error("Greška prilikom pravljenja korisnika");
                    console.log("ERROR: ", response);
                }
                $scope.listMembers();
            });
        };
        $scope.updateMember = function (form) {
            if (form.$invalid) {
                toastr.error('Greška pri unosu');
                return;
            }
            //dataService.update("users", "?username=" + $scope.editingMember.userName, $scope.editingMember, function (response) {
            dataService.update("users", $scope.editingMember.userName, $scope.editingMember, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno izmijenjen korisnik!");
                    //console.log("UPDATED"); 
                    $scope.listMembers();
                }
                else {
                    toastr.error("Greška prilikom izmjene korisnika");
                    console.log("ERROR: ", response);
                    $scope.listMembers();
                }
            });
            
            $scope.cancelEdit(form);
            $('#editMemberModal').modal('hide');
        };
        $scope.deleteMember = function () {
            dataService.remove("users", "?username=" + $scope.deletingMember.userName, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno obrisan korisnik!");
                    //console.log("Deleted");
                }
                else {
                    toastr.error("Greška prilikom brisanja korisnika");
                    console.log("ERROR: ", response);
                }
                $scope.listMembers();
            });
        }


        //TABLE PROPERTIES
        $scope.headings = [
            //{ "name": "korisničko ime","value": "username",},
            //{ "name": "šifra","value": "password" },
            { "name": "ime","value": "name" },
            { "name": "prezime", "value": "surname" },
            { "name": "telefon", "value": "phone" },
            { "name": "email", "value": "email" },
            { "name": "grad","value": "city" }
            //{ "name": "spol", "value": "gender" },
            //{ "name": "zaposlenost", "value": "employed" },
            //{ "name": "rok članarine", "value": "membershipDueDate" },
        ]
        $scope.propertyName = {"name": "ime", "value": "name"};
        $scope.reverse = false;
        $scope.sortMembersBy = function (propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
            propertyName.toggled = !propertyName.toggled;
        };



        //PAGINATION
        $scope.currentPage = 1;
        $scope.paginationSize = 3;
       // $scope.totalItems = $scope.members.length - 1;

        $scope.pageSizeOptions = [
            { "value": $scope.membersTotal, "name": "Svi Članovi"},
            { "value": 5, "name": "5 Članova" },
            { "value": 15, "name": "15 Članova" },
            { "value": 20, "name": "20 Članova" },
            { "value": 25, "name": "25 Članova" },
            { "value": 50, "name": "50 Članova" },
            { "value": 100, "name": "100 Članova" }
        ];
        $scope.pageSize = $scope.pageSizeOptions[0].value;

        //SEND EMAIL
        $scope.applyEventDetails = function () {
            dataService.read("events", $scope.eventEmail.id, function (response) {
                if (response.status === 200) {
                    $scope.currentEvent = response.data;
                    $scope.currentEvent.trustedVideoLink = $sce.trustAsResourceUrl($scope.currentEvent.videoLink);
                    console.log($scope.currentEvent);
                    $scope.emailContent =
                        $scope.emailContent +
                        "<p><b>Naziv Događaja:</b> " + $scope.currentEvent.name + "</p>" +
                        "<p><b>Lokacija:</b> " + $scope.currentEvent.location + "</p>" +
                        "<p><b>Kategorija:</b> " + $scope.currentEvent.eventCategoryName + "</p>" +
                        "<p><b>Registracije do:</b> " + $scope.currentEvent.registrationDeadline.toString().substring(0, 10) + "</p>" +
                        "<p><b>Početak:</b> " + $scope.currentEvent.startDate.toString().substring(0, 10) + "</p>" +
                        "<p><b>Kraj:</b> " + $scope.currentEvent.endDate.toString().substring(0, 10) + "</p>" +
                        "<p><b>Valuta:</b> " + $scope.currentEvent.eventCurrency + "</p>" +
                        "<p><b>Cijena za članove:</b> " + $scope.currentEvent.membersPrice + "</p>" +
                        "<p><b>Cijena za goste:</b> " + $scope.currentEvent.nonMembersPrice + "</p>" +
                        "<p><b>Nivo fizičke spreme:</b> " + $scope.currentEvent.applyCriteria + "</p>" +
                        "<p><b>Link slike:</b> " + $scope.currentEvent.imagePath + "</p>" +
                        "<p><b>Link videa:</b> " + $scope.currentEvent.videoLink + "</p>" +
                        "<p><b>Opis događaja:</b> " + $scope.currentEvent.description + "</p>";
                }
                else {
                    toastr.error("greška prilikom pribavljanja događaja");

                    console.log("ERROR: ", response);
                }
            });
        };

        //FILTERS
        $scope.isCollapsed = [];
        $scope.checkedInterests ={
            "skiing": false,
            "hiking": false,
            "cycling": false,
            "diving": false,
            "rafting": false
        }
        $scope.togglePanel=function(index){
            if (!$scope.isCollapsed.index || $scope.isCollapsed.index === false) $scope.isCollapsed.index = true;
            else $scope.isCollapsed.index = false;
        };
        $scope.filterByGroup = {
            "name": "group",
            "value": null
        };
        $scope.filterByUpcomingEvent = {
            "name": "event",
            "value": null
        };
        $scope.filterByPastEvent = {
            "name": "event",
            "value": null
        };
        $scope.logme = function () {
            console.log("filterByupcomingEvent", $scope.filterByUpcomingEvent);
            $scope.filterByPastEvent = {
                "name": "event",
                "value": null
            };
        };
        $scope.logme2 = function () {
            $scope.filterByUpcomingEvent = {
                "name": "event",
                "value": null
            };
            console.log("filterBypastEvent", $scope.filterByPastEvent);
        };
        $scope.getUpcoming = function () {
            dataService.list("events/future", function (response) {
                if (response.status === 200) {
                    $scope.upcoming = response.data
                    //Function used to sort in controller, orderby in ng repeat doesnt work as expected
                    $scope.upcoming.sort(function (a, b) {
                        return a.startDate > b.startDate ? 1 : a.startDate < b.startDate ? -1 : 0;
                    });
                    console.log("Upcoming:", $scope.upcoming);
                }
                else {
                    toastr.error("Greška prilikom pribavljanja budućih događaja");
                    console.log("ERROR: ", response);
                }
            });
        };
        $scope.getUpcoming();

        $scope.columnFilters = {};
        $scope.updateInterests = function (propertyName) {
            if ("undefined" === typeof $scope.columnFilters.interests)
                $scope.columnFilters.interests = {};
            if ("undefined" === typeof $scope.columnFilters.interests[propertyName])
                $scope.columnFilters.interests[propertyName] = true;
            else
                delete $scope.columnFilters.interests[propertyName];
                if (angular.equals($scope.columnFilters.interests, {}))
                    delete $scope.columnFilters.interests;
        }

        $scope.selectedChars = [];
        $scope.toggleCharacteristic = function (c) {
            var index = $scope.filterModel.properties.findIndex(function (item) { return item.value === c; });
            //console.log("c", c, "i", index);
            if (index<0) {
                $scope.filterModel.properties.push({ "name": "characteristic", "value": c });
            }
            else {
                $scope.filterModel.properties.splice(index, 1);
            }
            console.log("selChars", $scope.filterModel.properties);
        };

        $scope.applyFilters = function () {
            $scope.filteringMembers = true;
            var filteredByEvent = false;
            if ($scope.filterByGroup.value)
                $scope.filterModel.properties[0].value = $scope.filterByGroup.value;

            if ($scope.filterByUpcomingEvent.value) $scope.filterModel.properties[1].value = $scope.filterByUpcomingEvent.value;
            if ($scope.filterByPastEvent.value) $scope.filterModel.properties[1].value = $scope.filterByPastEvent.value;
            if (!$scope.filterByUpcomingEvent.value && !$scope.filterByPastEvent.value)
                $scope.filterModel.properties[1].value = null;
            //Apply filters
            console.log("applied filter:", $scope.filterModel);
            dataService.create("users/filter", $scope.filterModel, function (response) {
                if (response.status === 200) {
                    $scope.filteringMembers = false;
                    $scope.members = response.data;
                    $scope.membersTotal = response.data.length;
                    if ($scope.newGroupActive || $scope.groupManagementActive) {
                        $scope.members.forEach(function (member) {
                            member.checked = false;
                        });
                        $scope.members.forEach(function (member) {
                            $scope.selectedUsers.forEach(function (selectedUser) {
                                if($scope.newGroupActive)
                                    if (member.id === selectedUser.id)
                                        member.checked = true;
                                if($scope.groupManagementActive)
                                    if (member.firstName === selectedUser.firstName && member.lastName === selectedUser.lastName)
                                        member.checked = true;
                            });
                        });
                    }
                    console.log("Members;");
                    console.log($scope.members);
                }
                else {
                    $scope.filteringMembers = false;
                    console.log("ERROR: ", response);
                    toastr.error("Greška prilikom filtriranja korisnika");
                }
                $scope.toggleListCheckboxes.checked = false;
            });
        };

        //EVENTS

        $scope.listEvents = function () {
            $scope.eventsLoading = true;
            dataService.list("events", function (response) {
                if (response.status === 200) {
                    $scope.avevents = response.data
                    $scope.eventsLoading = false;
                }
                else {
                    toastr.error("Greška prilikom pribavljanja događaja");
                    console.log("ERROR: ", response);
                }
            });
        };
        $scope.listEvents();

        $scope.prepareEmailActive = false;
        $scope.prepareEmail = function () {
            $scope.showCheckboxes = true;
            $scope.prepareEmailActive = true;
            $scope.listGroups();
            $scope.toggleListCheckboxes.checked = false;
        };
        $scope.cancelPrepareEmail = function () {
            $scope.initNewUserList();
            $scope.selectedUsers = [];
            $scope.showCheckboxes = false;
            $scope.prepareEmailActive = false;
            $scope.toggleListCheckboxes.checked = false;
        };

        //$scope.listGroups = function (eventID) {
        //    dataService.read("usereventgroups", eventID, function (response) {
        //        if (response.status === 200) {
        //            $scope.eventGroups = response.data;
        //            console.log($scope.eventGroups);
        //        }
        //        else {
        //            console.log("ERROR: ", response);
        //            toastr.error("Greška prilikom pribavljanja grupa");
        //        }
        //    });
        //};

        

        $scope.getCurrentEvent = function () {
            dataService.read("events", $scope.selectedEventID, function (response) {
                if (response.status === 200) {
                    $scope.copyEvent = response.data;
                    $scope.copyEvent.trustedVideoLink = $sce.trustAsResourceUrl($scope.copyEvent.videoLink);
                    console.log($scope.copyEvent);
                    $scope.emailContent =
                        $scope.emailContent +
                        "<p><b>Naziv Događaja:</b> " + $scope.copyEvent.name + "</p>" +
                        "<p><b>Lokacija:</b> " + $scope.copyEvent.location + "</p>" +
                        "<p><b>Kategorija:</b> " + $scope.copyEvent.eventCategoryName + "</p>" +
                        "<p><b>Registracije do:</b> " + $scope.copyEvent.registrationDeadline.toString().substring(0, 10) + "</p>" +
                        "<p><b>Početak:</b> " + $scope.copyEvent.startDate.toString().substring(0, 10) + "</p>" +
                        "<p><b>Kraj:</b> " + $scope.copyEvent.endDate.toString().substring(0, 10) + "</p>" +
                        "<p><b>Valuta:</b> " + $scope.copyEvent.eventCurrency + "</p>" +
                        "<p><b>Cijena za članove:</b> " + $scope.copyEvent.membersPrice + "</p>" +
                        "<p><b>Cijena za goste:</b> " + $scope.copyEvent.nonMembersPrice + "</p>" +
                        "<p><b>Nivo fizičke spreme:</b> " + $scope.copyEvent.applyCriteria + "</p>" +
                        "<p><b>Link slike:</b> " + $scope.copyEvent.imagePath + "</p>" +
                        "<p><b>Link videa:</b> " + $scope.copyEvent.videoLink + "</p>" +
                        "<p><b>Opis događaja:</b> " + $scope.copyEvent.description + "</p>";
                }
                else {
                    console.log("ERROR: ", response);
                    toastr.error("greška prilikom pribavljanja događaja");
                }
            });
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
        $scope.getCategories();

        $scope.getAllInterests = function () {
            $scope.subCategoriesLoading = true;
            dataService.list("Characteristicsubcategories", function (response) {
                if (response.status === 200) {
                    $scope.subCategories = response.data;
                    $scope.subCategoriesLoading = false;
                    console.log("ALL INTERESTS");
                    
                }
                else {
                    console.log("ERROR: ", response);
                }
            });
        };
        $scope.getAllInterests();


        $scope.sendEmail = function () {
            var email = {
                "emailSubject": $scope.emailSubject,
                "emailContent": $scope.emailContent,
                "usernames": []
            };
            $scope.selectedUsers.forEach(function (member, index, array) {
                if (member.checked===true) email.usernames.push(member.userName);
            });
            console.log(email);

            dataService.create("groupemail", email, function (response) {
                if (response.status === 200) {
                    toastr.success("Uspješno slanje emaila!");
                }
                else {
                    toastr.error("Greška prilikom slanja emaila");
                    console.log("ERROR: ", response);
                }
            });
        };

        //DATEPICKER
        $scope.today = function () {
            $scope.newMember.dateOfBirth = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.newMember.dateOfBirth = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
              mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

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
            $scope.newMember.dateOfBirth = new Date(year, month, day);
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

        authenticateAdmin();
        $scope.listMembers();
    }])
    .filter('start', function () {
        return function (input, start) {
            if (!input || !input.length) { return; }

            start = +start;
            return input.slice(start);
        };
    });

}());