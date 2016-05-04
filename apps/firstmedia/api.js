"use strict";

angular.module("MyApp").factory("API", [
    "$http",
    function ($http) {
        var endpoints = {};

        endpoints.Schedules = Schedules;
        endpoints.Channels = Channels;

        var rootUrl = "https://uspcahharhjy5eb4.apphb.com";
        //var rootUrl = "http://localhost:55429";

        return endpoints;

        function Schedules(params) {
            var cmd = $http({
                method: "POST",
                url: rootUrl + "/firstmedia/schedules",
                data: params
            });
            return cmd;
        };

        function Channels(params) {
            var cmd = $http({
                method: "GET",
                url: rootUrl + "/firstmedia/channels",
                params: params
            });
            return cmd;
        };
    }
]);
