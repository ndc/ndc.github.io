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
            var channelsChunked = _.chunk(Channels, 20);

            var promise = _.reduce(channelsChunked, function (chain, chunk) {
                var request = {};
                request.ShowDate = ShowDate;
                request.Channels = chunk;
                request.FakeData = FakeData;

                return chain.then(function (schedules) {
                    return API.Schedules(request).then(function (response) {
                        return schedules.concat(response.data.Schedules);
                    });
                });
            }, $q.when([])).then(function (schedules) {
                svc.Schedules = schedules;

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
