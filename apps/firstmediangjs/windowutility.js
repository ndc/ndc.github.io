"use strict";

angular.module("WindowUtility", []).factory("FocusHelper", [
    "$timeout", "$window",
    function ($timeout, $window) {
        var svc = {};
        svc.setFocusById = setFocusById;
        svc.scrollIntoId = scrollIntoId;

        function setFocusById(id) {
            $timeout(function () {
                var element = $window.document.getElementById(id);
                if (element) {
                    element.focus();
                };
            }, 1);
        };

        function scrollIntoId(id) {
            $timeout(function () {
                var element = $window.document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                };
            }, 1);
        };

        return svc;
    }
]);
