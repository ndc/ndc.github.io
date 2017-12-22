"use strict";

angular.module("MyApp").factory("API", [
    "UserData", "$http",
    function (UserData, $http) {
        var endpoints = {};

        endpoints.Schedules = Schedules;
        endpoints.Channels = Channels;
        endpoints.ClearCache = ClearCache;

        var rootUrl = "https://uspcahharhjy5eb4.apphb.com";
        // var rootUrl = "http://localhost:55429";

        return endpoints;

        function Schedules(params) {
            var url = "";
            switch (UserData.UseAPIVersion) {
                case 3:
                    url = rootUrl + "/firstmedia/v3/schedule";
                    break;
                default:
                    url = rootUrl + "/firstmedia/schedule";
                    break;
            }
            var cmd = $http({
                method: "POST",
                url: url,
                data: params
            });
            return cmd;
        };

        function Channels(params) {
            var url = ""
            switch (UserData.UseAPIVersion) {
                case 3:
                    url = rootUrl + "/firstmedia/v3/channel";
                    break;
                default:
                    url = rootUrl + "/firstmedia/channel";
                    break;
            }
            var cmd = $http({
                method: "GET",
                url: url,
                params: params
            });
            return cmd;
        };

        function ClearCache(params) {
            var cmd = $http({
                method: "DELETE",
                url: rootUrl + "/firstmedia/schedule/cache",
                params: params
            });
            return cmd;
        };

    }
]);
