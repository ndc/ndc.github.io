"use strict";

angular.module("MyApp", [
    "ui.router",
    "ui.bootstrap",
    "Notification",
    "ErrorHandler",
    "BusyIndicator",
    "LocalStorage",
    "WindowUtility"
]);

angular.module("MyApp").run([
    function () {
    }
]);

angular.module("MyApp").config([
    "$stateProvider", "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise(function ($injector, $location) {
            var UserData = $injector.get("UserData");
            return "/r/" + UserData.SelectedView;
        });

        $stateProvider.state("root", {
            abstract: true,
            url: "/r",
            templateUrl: "root_Template.html",
            controller: "root_Controller as vm"
        });

        $stateProvider.state("favoriteEdit", {
            url: "/favorite/{favoriteid}/edit",
            templateUrl: "favoriteEdit_Template.html",
            controller: "FavoriteEdit_Controller as vm"
        });

        $stateProvider.state("toolBox", {
            url: "/toolbox",
            templateUrl: "toolBox_Template.html",
            controller: "toolBox_Controller as vm"
        });

        $stateProvider.state("root.grid", {
            url: "/grid",
            templateUrl: "root.grid_Template.html",
            controller: "root.grid_Controller as vm"
        });

        $stateProvider.state("root.newspaper", {
            url: "/newspaper",
            templateUrl: "root.newspaper_Template.html",
            controller: "root.grid_Controller as vm"
        });

        $stateProvider.state("root.masterDetail", {
            url: "/masterdetail",
            templateUrl: "root.masterDetail_Template.html",
            controller: "root.masterDetail_Controller as vm"
        });

    }
]);
