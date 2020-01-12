"use strict";

angular.module("MyApp").factory("Schedule", [
    "UserData", "API", "$q",
    function (UserData, API, $q) {
        var svc = {};
        svc.Schedules = [];

        svc.Refresh = Refresh;
        svc.FilterPastShows = FilterPastShows;

        return svc;

        function Refresh(ShowDate, Channels, FakeData) {
            var channelsChunked = _(Channels).
                map(function (ch) { return ch.Code; }).
                chunk(20).
                value();

            var promise = _.reduce(
                channelsChunked,
                function (chain, chunk) {
                    var request = {};
                    request.ShowDate = ShowDate;
                    request.Channels = chunk;
                    request.FakeData = FakeData;

                    return chain.then(function (schedules) {
                        return API.Schedules(request).then(function (response) {
                            _.each(response.data.Shows, function (show) {
                                show.Channel = _.find(response.data.Channels, function (ch) {
                                    return ch.Code == show.ChannelCode;
                                });
                            });
                            return schedules.concat(response.data.Shows);
                        });
                    });
                },
                $q.when([])).
                then(function (schedules) {
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
