"use strict";

angular.module("BusyIndicator", ["Notification"]);

angular.module("BusyIndicator").factory("BusyIndicatorHandler", [
    "NotificationHandler", "$timeout",
    function (NotificationHandler, $timeout) {
        var handler = {};
        handler.visible = false;
        handler.timer = null;
        handler.show = function () {
            handler.visible = true;
            if (handler.timer == null || handler.timer.$$state.status != 0) {
                handler.timer = $timeout(function () {
                    NotificationHandler.notify("info", "Still in progress, please wait.");
                }, 5000);
            }
        };
        handler.hide = function () {
            handler.visible = false;
            if (handler.timer.$$state.status == 1) {
                NotificationHandler.notify("success", "Done.");
            }
            var cancelResult = $timeout.cancel(handler.timer);
        };
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
