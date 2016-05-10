"use strict";

angular.module("MyApp").controller("root.grid_Controller", [
    "$state", "UserData", "Schedule", "$uibModal",
    function ($state, UserData, Schedule, $uibModal) {

        var vm = this;

        vm.UserData = UserData;
        vm.Schedule = Schedule;
        vm.ChannelShows = [];
        vm.Milestones = [];
        vm.Matrix = [];

        vm.ChangeFilterPast = ChangeFilterPast;
        vm.ShowDetail = ShowDetail;

        Initialize();

        function Initialize() {
            populateSchedules();
        };

        function ChangeFilterPast() {
            UserData.SaveToStorage();
            populateSchedules();
        };

        function populateSchedules() {
            var schedules = UserData.FilterPast ? Schedule.FilterPastShows() : Schedule.Schedules;

            var currentTime = moment();
            _.each(schedules, function (schedule) {
                schedule.isPast = moment(schedule.Until) < currentTime;
            });

            vm.Milestones = _(schedules).
                map(function (schedule) {
                    return schedule.ShowTime;
                }).
                uniq().
                value();

            vm.ChannelShows = _.map(Schedule.Channels, function (channel) {
                var cs = {};
                cs.Channel = channel;
                cs.Shows = _(schedules).
                    filter(function (sched) {
                        return sched.ChannelCode == channel.Code;
                    }).
                    sortBy(function (sched) {
                        return sched.ShowTime;
                    }).
                    map(function (sched) {
                        var start = vm.Milestones.indexOf(sched.ShowTime);
                        start = start < 0 ? 0 : start;
                        var end = vm.Milestones.indexOf(sched.Until);
                        end = end < 0 ? vm.Milestones.length : end;

                        sched.ColSpan = end - start;
                        sched.StartFrom = moment(sched.ShowTime).format("HH:mm");
                        return sched;
                    }).
                    value();

                var earliestShowTime = _(cs.Shows).map(function (show) {
                    return show.ShowTime;
                }).min();
                cs.LeftPad = vm.Milestones.indexOf(earliestShowTime);

                return cs;
            });

            vm.Matrix = [];
            for (var timeIdx = 0; timeIdx < vm.Milestones.length; timeIdx++) {
                var row = [];
                vm.Matrix.push(row);
                for (var channelIdx = 0; channelIdx < vm.ChannelShows.length; channelIdx++) {
                    var col = {};
                    row.push(col);
                    var showtime = vm.Milestones[timeIdx];
                    col.Channel = vm.ChannelShows[channelIdx].Channel;
                    col.Show = _.find(vm.ChannelShows[channelIdx].Shows, function (show) {
                        return show.ShowTime <= showtime && (show.Until > showtime || show.Until == null);
                    });
                    col.Generate = !col.Show || showtime == col.Show.ShowTime;
                };
            };

        };

        function ShowDetail(show) {
            var modalOptions = {
                templateUrl: "showDetail_Template.html",
                controller: "showDetail_Controller as vm",
                resolve: {
                    Show: [
                        function () {
                            return show;
                        }
                    ]
                }
            };

            var modalPromise = $uibModal.open(modalOptions).
                result.
                then(function (response) {
                });

            return modalPromise;
        };

    }
]);
