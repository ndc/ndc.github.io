"use strict";

angular.module("BusyIndicator", []);

angular.module("BusyIndicator").factory("BusyIndicatorHandler", [
    function () {
        var handler = {};
        handler.visible = false;
        handler.show = function () { handler.visible = true; };
        handler.hide = function () { handler.visible = false; };
        return handler;
    }
]);

angular.module("BusyIndicator").directive("busyIndicator", [
    function () {
        var drctve = {
            restrict: "E",
            template: '' +
            '<nav ng-show="status.visible"' +
            ' class="navbar navbar-default navbar-fixed-bottom" role="navigation">' +
            '<div class="container">' +
            '<div class="navbar-header">' +
            '<a class="navbar-brand">' +
            '<i class="fa fa-refresh fa-spin"></i>' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</nav>' +
            '',
            controller: [
                "$scope", "BusyIndicatorHandler",
                function ($scope, BusyIndicatorHandler) {
                    $scope.status = BusyIndicatorHandler;
                }
            ]
        };
        return drctve;
    }
]);
