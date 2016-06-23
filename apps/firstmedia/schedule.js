"use strict";

angular.module("MyApp").factory("Schedule", [
    "API", "$q",
    function (API, $q) {
        var svc = {};
        svc.Schedules = [];

        svc.Refresh = Refresh;
        svc.FilterPastShows = FilterPastShows;

        return svc;

        function Refresh(ShowDate, Channels, FakeData) {
            var channelsChunked = _(Channels).
                chunk(10).
                map(function (batch) {
                    var request = {};
                    request.ShowDate = ShowDate;
                    request.Channels = batch;
                    request.FakeData = FakeData;

                    return API.Schedules(request);
                }).
                value();

            var promise = $q.all(channelsChunked).then(function (responses) {
                svc.Schedules = _(responses).
                    map(function (response) { return response.data.Schedules; }).
                    flatten().
                    value();

                var idx = 1;
                _.each(svc.Schedules, function (schedule) {
                    schedule.ID = idx++;
                });
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
