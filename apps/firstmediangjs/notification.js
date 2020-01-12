"use strict";

angular.module("Notification", []);

angular.module("Notification").factory("NotificationHandler", [
    "$timeout",
    function ($timeout) {
        var handler = {};

        handler.notifications = [];
        handler.removeNotification = removeNotification;
        handler.notify = notify;

        function removeNotification(notification) {
            var idx = handler.notifications.indexOf(notification);
            if (idx != -1) {
                handler.notifications.splice(idx, 1);
            };
        };

        function notify(type, message) {
            // success info warning danger
            var msg = {
                type: type,
                msg: message,
                opacity: 1.0
            };
            handler.notifications.unshift(msg);
            $timeout(function () { fadeMessage(msg); }, 3000);
        };

        function fadeMessage(msg) {
            msg.opacity -= 0.1;
            if (msg.opacity > 0.1) {
                $timeout(function () { fadeMessage(msg); }, 3000);
            } else {
                removeNotification(msg);
            };
        };

        return handler;
    }
]);

angular.module("Notification").directive("notification", [
    "NotificationHandler",
    function (NotificationHandler) {
        var drctve = {
            restrict: "A",
            template: '<uib-alert' +
            ' ng-repeat="message in messages"' +
            ' ng-style="{\'opacity\': message.opacity}"' +
            ' type="{{message.type}}"' +
            ' close="closeAlert(message)"' +
            '>' +
            '{{message.msg}}' +
            '</uib-alert>',
            link: function (scope, element, attributes) {
                scope.messages = NotificationHandler.notifications;
                scope.closeAlert = closeAlert;

                function closeAlert(notification) {
                    return NotificationHandler.removeNotification(notification);
                };
            }
        };
        return drctve;
    }
]);
