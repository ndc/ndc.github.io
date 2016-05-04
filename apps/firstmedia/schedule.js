"use strict";

angular.module("MyApp").factory("Schedule", [
    "API",
    function (API) {
        var svc = {};
        svc.Channels = [];
        svc.Schedules = [];

        svc.Refresh = Refresh;
        svc.FilterPastShows = FilterPastShows;

        return svc;

        function Refresh(ShowDate, Channels, FakeData) {
            var request = {};
            request.ShowDate = ShowDate;
            request.Channels = Channels;
            request.FakeData = FakeData;

            var promise = API.Schedules(request).then(function (response) {
                svc.Channels = response.data.Channels;
                svc.Schedules = response.data.Schedules;
            });

            return promise;
        };

        function FilterPastShows() {
            var currentTime = moment();

            var filtered = _.filter(svc.Schedules, function (schedule) {
                return moment(schedule.Until) > currentTime;
            });

            return filtered;
        };
    }
]);
