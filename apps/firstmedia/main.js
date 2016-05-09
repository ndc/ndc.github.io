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
    function () {
    }
]);

angular.module("MyApp").config([
    "$stateProvider", "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/r");

        $stateProvider.state("root", {
            url: "/r",
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
            controller: "root.listByTime_Controller as vm"
        });

        $stateProvider.state("root.listByChannel", {
            url: "/listbychannel",
            templateUrl: "root.listByChannel_Template.html",
            controller: "root.listByTime_Controller as vm"
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

        $stateProvider.state("root.newspaper.detail", {
            url: "/{showid}",
            views: {
                "@root": {
                    templateUrl: "root.showDetail_Template.html",
                    controller: "root.showDetail_Controller as vm"
                }
            }
        });

    }
]);
