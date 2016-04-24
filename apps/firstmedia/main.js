"use strict";

angular.module("MyApp", [
    "ui.router",
    "ui.bootstrap",
    "Notification",
    "ErrorHandler",
    "BusyIndicator",
    "LocalStorage"
]);

angular.module("MyApp").run([
    "UserData",
    function (UserData) {
        UserData.LoadFromStorage();
    }
]);

angular.module("MyApp").config([
    "$stateProvider", "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/root");

        $urlRouterProvider.when("/", "/root");

        $stateProvider.state("root", {
            url: "/root",
            templateUrl: "root_Template.html",
            controller: "root_Controller as vm"
        });

        $stateProvider.state("favoriteEdit", {
            url: "/favorite/{favoriteid}/edit",
            templateUrl: "favoriteEdit_Template.html",
            controller: "FavoriteEdit_Controller as vm"
        });

        $stateProvider.state("root.listByTime", {
            url: "/listbytime",
            templateUrl: "root.listByTime_Template.html",
            controller: "root.listByTime_Controller as vmv"
        });

        $stateProvider.state("root.listByChannel", {
            url: "/listbychannel",
            templateUrl: "root.listByChannel_Template.html",
            controller: "root.listByChannel_Controller as vmv"
        });

    }
]);
