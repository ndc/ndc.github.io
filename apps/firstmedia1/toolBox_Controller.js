"use strict";

angular.module("MyApp").controller("toolBox_Controller", [
    "API", "BusyIndicatorHandler", "ErrorHandler", "UserData", "$stateParams", "$state", "NotificationHandler",
    function (API, BusyIndicatorHandler, ErrorHandler, UserData, $stateParams, $state, NotificationHandler) {

        var vm = this;

        vm.ClearCache = ClearCache;

        Initialize();

        function Initialize() {
        };

        function ClearCache() {
            var request = {};

            BusyIndicatorHandler.show();

            API.ClearCache(request).then(function (response) {
            }).catch(ErrorHandler.HttpNotify()).finally(function () {
                BusyIndicatorHandler.hide();
            });
        };

    }
]);
