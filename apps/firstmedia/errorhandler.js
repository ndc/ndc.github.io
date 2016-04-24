"use strict";

angular.module("ErrorHandler", ["Notification"]);

angular.module("ErrorHandler").factory("ErrorHandler", [
    "NotificationHandler",
    function (NotificationHandler) {
        var sendHttpBodyToNotifier = function (err) {
            var msg;
            if ('data' in err && err.data.length > 0 && err.data.length <= 512) {
                msg = err.data;
            } else if ('statusText' in err && err.statusText.length > 0) {
                msg = err.statusText;
            } else {
                msg = err;
            };
            NotificationHandler.notify("danger", msg);
        };
        var handler = {
            HttpNotify: function () { return sendHttpBodyToNotifier; }
        };
        return handler;
    }
]);
